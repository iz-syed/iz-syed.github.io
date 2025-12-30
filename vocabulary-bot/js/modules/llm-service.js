/**
 * LLM Service Module
 * Handles AI-powered conversation generation using free LLM APIs
 */

const LLMService = {
    // Configuration
    config: {
        provider: 'groq', // 'groq', 'mlvoca', or 'custom'
        apiKey: '',
        model: 'llama-3.1-8b-instant',
        baseUrl: ''
    },

    // Available providers
    providers: {
        groq: {
            name: 'Groq',
            baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
            requiresKey: true,
            models: ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'mixtral-8x7b-32768']
        },
        mlvoca: {
            name: 'MLVoca (Free)',
            baseUrl: 'https://mlvoca.com/api/generate',
            requiresKey: false,
            models: ['tinyllama', 'deepseek-r1:1.5b']
        }
    },

    /**
     * Initialize from localStorage
     */
    init() {
        const saved = localStorage.getItem('vocabbot-llm-config');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.config = { ...this.config, ...parsed };
            } catch (e) {
                console.warn('Failed to load LLM config:', e);
            }
        }
    },

    /**
     * Save configuration
     */
    saveConfig() {
        localStorage.setItem('vocabbot-llm-config', JSON.stringify(this.config));
    },

    /**
     * Set API configuration
     */
    configure(provider, apiKey = '', model = '') {
        this.config.provider = provider;
        this.config.apiKey = apiKey;
        if (model) this.config.model = model;
        this.saveConfig();
    },

    /**
     * Check if service is configured and ready
     */
    isReady() {
        const provider = this.providers[this.config.provider];
        if (!provider) return false;
        if (provider.requiresKey && !this.config.apiKey) return false;
        return true;
    },

    /**
     * Generate conversation using LLM
     */
    async generateConversation(topic, difficulty, wordLimit, tone) {
        const topicName = TopicNames[topic] || topic;
        const difficultyDesc = {
            easy: 'simple vocabulary, short sentences, common words',
            medium: 'intermediate vocabulary, varied sentence structures',
            hard: 'advanced vocabulary, complex sentences, professional language'
        };
        const toneDesc = {
            formal: 'formal and professional',
            informal: 'casual and friendly',
            neutral: 'neutral and balanced'
        };

        // Get vocabulary words to include in the conversation
        const vocabWords = this.getVocabularyWordsForPrompt(topic, difficulty);

        // Estimate exchanges: average ~10-15 words per exchange
        const estimatedExchanges = Math.max(4, Math.floor(wordLimit / 12));

        const prompt = `Generate a natural English conversation between two people (Speaker A and Speaker B) about "${topicName}".

Requirements:
- Difficulty: ${difficulty} (${difficultyDesc[difficulty]})
- Tone: ${toneDesc[tone] || 'neutral'}
- Length: approximately ${estimatedExchanges} exchanges (about ${wordLimit} words total)
- Make it sound like a real human conversation with natural flow
- Include greetings, topic discussion, questions, responses, and a natural ending
- Each speaker should respond meaningfully to what the other person said
- IMPORTANT: Naturally incorporate these vocabulary words/phrases in the conversation: ${vocabWords}

Format each line exactly like this:
A: [Speaker A's dialogue]
B: [Speaker B's dialogue]

Start the conversation now:`;

        try {
            const response = await this.callAPI(prompt);
            return this.parseConversation(response);
        } catch (error) {
            console.error('LLM API Error:', error);
            throw error;
        }
    },

    /**
     * Call the appropriate API based on provider
     */
    async callAPI(prompt) {
        const provider = this.config.provider;

        if (provider === 'groq') {
            return await this.callGroq(prompt);
        } else if (provider === 'mlvoca') {
            return await this.callMlvoca(prompt);
        } else {
            throw new Error('Unknown provider: ' + provider);
        }
    },

    /**
     * Call Groq API
     */
    async callGroq(prompt) {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.config.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.config.model || 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that generates natural English conversations for language learning. Always format conversations with "A:" and "B:" prefixes for each speaker.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.error?.message || `Groq API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || '';
    },

    /**
     * Call MLVoca API (free, no key required)
     */
    async callMlvoca(prompt) {
        const response = await fetch('https://mlvoca.com/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.config.model || 'deepseek-r1:1.5b',
                prompt: `You are a helpful assistant that generates natural English conversations for language learning. Always format conversations with "A:" and "B:" prefixes for each speaker.\n\nUser: ${prompt}\n\nAssistant:`,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`MLVoca API error: ${response.status}`);
        }

        const data = await response.json();
        return data.response || '';
    },

    /**
     * Parse LLM response into conversation format
     */
    parseConversation(text) {
        const lines = [];
        const regex = /^([AB]):\s*(.+)$/gm;
        let match;

        while ((match = regex.exec(text)) !== null) {
            const speaker = match[1];
            const dialogue = match[2].trim();
            if (dialogue) {
                lines.push({ speaker, text: dialogue });
            }
        }

        // If parsing failed, try alternative formats
        if (lines.length === 0) {
            // Try "Speaker A:" format
            const altRegex = /^(?:Speaker\s+)?([AB]):\s*(.+)$/gm;
            while ((match = altRegex.exec(text)) !== null) {
                const speaker = match[1];
                const dialogue = match[2].trim();
                if (dialogue) {
                    lines.push({ speaker, text: dialogue });
                }
            }
        }

        // If still no lines, try to extract any dialogue-like content
        if (lines.length === 0) {
            const fallbackLines = text.split('\n').filter(line => line.trim());
            let currentSpeaker = 'A';
            for (const line of fallbackLines) {
                const cleanLine = line.replace(/^[-*•]\s*/, '').trim();
                if (cleanLine && cleanLine.length > 5) {
                    lines.push({ speaker: currentSpeaker, text: cleanLine });
                    currentSpeaker = currentSpeaker === 'A' ? 'B' : 'A';
                }
            }
        }

        return lines;
    },

    /**
     * Get vocabulary words from database for LLM prompt
     */
    getVocabularyWordsForPrompt(topic, difficulty) {
        try {
            const vocab = Utils.getVocabularyData(topic, difficulty);
            const words = [];

            // Collect words from each category
            const categories = ['nouns', 'verbs', 'adjectives', 'adverbs'];
            categories.forEach(cat => {
                if (vocab[cat]) {
                    const catWords = Object.keys(vocab[cat]);
                    // Take random subset (5-8 words per category)
                    const shuffled = catWords.sort(() => Math.random() - 0.5);
                    words.push(...shuffled.slice(0, Math.min(6, catWords.length)));
                }
            });

            // Add idioms and collocations
            if (vocab.idioms) {
                const idioms = Object.keys(vocab.idioms);
                words.push(...idioms.slice(0, 2));
            }
            if (vocab.collocations) {
                const collocations = Object.keys(vocab.collocations);
                words.push(...collocations.slice(0, 2));
            }

            // Shuffle and return as comma-separated string
            return words.sort(() => Math.random() - 0.5).join(', ');
        } catch (e) {
            console.warn('Failed to get vocabulary words:', e);
            return '';
        }
    },

    /**
     * Get available models for current provider
     */
    getAvailableModels() {
        const provider = this.providers[this.config.provider];
        return provider ? provider.models : [];
    },

    /**
     * Check if current provider requires API key
     */
    requiresApiKey() {
        const provider = this.providers[this.config.provider];
        return provider ? provider.requiresKey : true;
    }
};

// Initialize on load
LLMService.init();
