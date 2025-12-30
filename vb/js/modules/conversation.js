/**
 * Conversation Generator Module
 * Generates natural conversations using LLM API or fallback methods
 */

const ConversationGenerator = {
    // State
    currentConversation: [],
    usedVocabulary: {
        nouns: new Set(),
        verbs: new Set(),
        adjectives: new Set(),
        adverbs: new Set(),
        idioms: new Set(),
        collocations: new Set()
    },
    vocabularyDetails: {},
    isGenerating: false,

    /**
     * Reset vocabulary tracking
     */
    resetTracking() {
        this.usedVocabulary = {
            nouns: new Set(),
            verbs: new Set(),
            adjectives: new Set(),
            adverbs: new Set(),
            idioms: new Set(),
            collocations: new Set()
        };
        this.vocabularyDetails = {};
    },

    /**
     * Count words in an array of lines
     */
    countWords(lines) {
        return lines.reduce((total, line) => {
            return total + line.text.split(/\s+/).filter(w => w.length > 0).length;
        }, 0);
    },

    /**
     * Generate a natural conversation
     * Uses LLM API if configured, otherwise falls back to static dialogues
     */
    async generate(topic, difficulty, wordLimit, tone) {
        this.resetTracking();
        this.isGenerating = true;

        let lines = [];

        try {
            // Try LLM-based generation first if configured
            if (typeof LLMService !== 'undefined' && LLMService.isReady()) {
                lines = await LLMService.generateConversation(topic, difficulty, wordLimit, tone);
            }

            // Fallback to static dialogues if LLM failed or not configured
            if (lines.length === 0) {
                lines = this.generateFromDialogues(topic, difficulty, wordLimit, tone);
            }

            // Final fallback to templates
            if (lines.length === 0) {
                lines = this.generateFromTemplates(topic, difficulty, wordLimit, tone);
            }

            // Extract vocabulary from the conversation
            this.extractVocabulary(lines, topic, difficulty);

            this.currentConversation = lines;
            return lines;

        } catch (error) {
            console.error('Conversation generation error:', error);

            // Fallback on error
            lines = this.generateFromDialogues(topic, difficulty, wordLimit, tone);
            if (lines.length === 0) {
                lines = this.generateFromTemplates(topic, difficulty, wordLimit, tone);
            }

            this.extractVocabulary(lines, topic, difficulty);
            this.currentConversation = lines;
            return lines;

        } finally {
            this.isGenerating = false;
        }
    },

    /**
     * Generate from pre-written dialogues
     */
    generateFromDialogues(topic, difficulty, wordLimit, tone) {
        if (typeof DialogueDatabase === 'undefined') return [];

        const dialogues = DialogueDatabase[topic];
        if (!dialogues) return [];

        const diffDialogues = dialogues[difficulty] || dialogues.easy;
        if (!diffDialogues) return [];

        const lines = [];
        let currentWords = 0;
        const usedDiscussions = new Set();

        // Add opening
        if (diffDialogues.openings?.length > 0) {
            const opening = diffDialogues.openings[Math.floor(Math.random() * diffDialogues.openings.length)];
            for (const line of opening) {
                const lineWords = line.text.split(/\s+/).filter(w => w.length > 0).length;
                if (currentWords + lineWords > wordLimit) break;
                lines.push({ speaker: line.speaker, text: line.text });
                currentWords += lineWords;
            }
        }

        // Add discussions
        if (diffDialogues.discussions?.length > 0) {
            let attempts = 0;
            while (currentWords < wordLimit * 0.75 && attempts < diffDialogues.discussions.length * 2) {
                let idx;
                let tries = 0;
                do {
                    idx = Math.floor(Math.random() * diffDialogues.discussions.length);
                    tries++;
                } while (usedDiscussions.has(idx) && tries < diffDialogues.discussions.length);

                if (usedDiscussions.has(idx)) usedDiscussions.clear();
                usedDiscussions.add(idx);

                const discussion = diffDialogues.discussions[idx];
                const exchangeWords = discussion.reduce((sum, line) => {
                    return sum + line.text.split(/\s+/).filter(w => w.length > 0).length;
                }, 0);

                if (currentWords + exchangeWords > wordLimit) {
                    attempts++;
                    continue;
                }

                const lastSpeaker = lines.length > 0 ? lines[lines.length - 1].speaker : 'B';
                const needSwap = lastSpeaker === discussion[0].speaker;

                for (const line of discussion) {
                    const speaker = needSwap ? (line.speaker === 'A' ? 'B' : 'A') : line.speaker;
                    lines.push({ speaker, text: line.text });
                    currentWords += line.text.split(/\s+/).filter(w => w.length > 0).length;
                }
                attempts++;
            }
        }

        // Add closing
        if (diffDialogues.closings?.length > 0) {
            const closing = diffDialogues.closings[Math.floor(Math.random() * diffDialogues.closings.length)];
            const closingWords = closing.reduce((sum, line) => {
                return sum + line.text.split(/\s+/).filter(w => w.length > 0).length;
            }, 0);

            if (currentWords + closingWords <= wordLimit) {
                const lastSpeaker = lines.length > 0 ? lines[lines.length - 1].speaker : 'B';
                const needSwap = lastSpeaker === closing[0].speaker;

                for (const line of closing) {
                    const speaker = needSwap ? (line.speaker === 'A' ? 'B' : 'A') : line.speaker;
                    lines.push({ speaker, text: line.text });
                }
            }
        }

        return lines;
    },

    /**
     * Generate from templates (final fallback)
     */
    generateFromTemplates(topic, difficulty, wordLimit, tone) {
        const vocab = Utils.getVocabularyData(topic, difficulty);
        const flow = ConversationFlow;
        const lines = [];
        let currentWords = 0;
        let speaker = 'A';
        let turnCount = 0;

        const getWord = (type) => {
            const words = vocab[type] || {};
            const keys = Object.keys(words);
            if (keys.length === 0) {
                return type === 'nouns' ? 'thing' : type === 'verbs' ? 'do' : type === 'adjectives' ? 'good' : 'well';
            }
            const word = Utils.getRandomItem(keys);
            if (words[word]) {
                this.usedVocabulary[type].add(word);
                this.vocabularyDetails[word] = { ...words[word], type: type.slice(0, -1) };
            }
            return word;
        };

        const fillTemplate = (template) => {
            return template
                .replace(/{noun}/g, () => getWord('nouns'))
                .replace(/{verb}/g, () => getWord('verbs'))
                .replace(/{adjective}/g, () => getWord('adjectives'))
                .replace(/{adverb}/g, () => getWord('adverbs'));
        };

        const applyTone = (text) => {
            const mod = flow.toneModifiers[tone] || flow.toneModifiers.neutral;
            if (Math.random() < 0.3) {
                text = Utils.getRandomItem(mod.prefix) + ' ' + text.toLowerCase();
            }
            return text;
        };

        const phases = ['greeting', 'response', 'topic', 'discuss', 'elaborate', 'question', 'answer'];
        const cyclingPhases = ['discuss', 'elaborate', 'question', 'answer', 'agree', 'transition'];
        const usedLines = new Set();

        while (currentWords < wordLimit && turnCount < 50) {
            let text = '';
            let phase = turnCount < phases.length
                ? phases[turnCount]
                : cyclingPhases[(turnCount - phases.length) % cyclingPhases.length];

            switch (phase) {
                case 'greeting':
                    text = Utils.getRandomItem(flow.contexts.greeting[difficulty] || flow.contexts.greeting.easy);
                    break;
                case 'response':
                    text = Utils.getRandomItem(flow.contexts.response_greeting[difficulty] || flow.contexts.response_greeting.easy);
                    break;
                case 'topic':
                    text = fillTemplate(Utils.getRandomItem(flow.contexts.topic_intro[difficulty] || flow.contexts.topic_intro.easy));
                    break;
                case 'discuss':
                case 'elaborate':
                    text = applyTone(fillTemplate(Utils.getRandomItem(flow.contexts.elaboration[difficulty] || flow.contexts.elaboration.easy)));
                    break;
                case 'question':
                    text = Utils.getRandomItem(flow.contexts.question[difficulty] || flow.contexts.question.easy);
                    break;
                case 'answer':
                    text = fillTemplate(Utils.getRandomItem(flow.contexts.answer[difficulty] || flow.contexts.answer.easy));
                    break;
                case 'agree':
                    text = Utils.getRandomItem(flow.contexts.agreement[difficulty] || flow.contexts.agreement.easy);
                    break;
                case 'transition':
                    const prefix = Utils.getRandomItem(flow.contexts.transition[difficulty] || flow.contexts.transition.easy);
                    text = prefix + ' ' + fillTemplate(Utils.getRandomItem(flow.contexts.topic_intro[difficulty] || flow.contexts.topic_intro.easy)).toLowerCase();
                    break;
            }

            text = Utils.capitalizeFirst(text);

            let attempts = 0;
            while (usedLines.has(text) && attempts < 3) {
                text = Utils.capitalizeFirst(applyTone(fillTemplate(Utils.getRandomItem(flow.contexts.elaboration[difficulty] || flow.contexts.elaboration.easy))));
                attempts++;
            }

            usedLines.add(text);
            const lineWords = text.split(/\s+/).filter(w => w.length > 0).length;

            if (currentWords + lineWords > wordLimit && turnCount > 4) {
                const closing = Utils.getRandomItem(flow.contexts.closing[difficulty] || flow.contexts.closing.easy);
                const closingWords = closing.split(/\s+/).filter(w => w.length > 0).length;
                if (currentWords + closingWords <= wordLimit) {
                    lines.push({ speaker, text: closing });
                }
                break;
            }

            lines.push({ speaker, text });
            currentWords += lineWords;
            speaker = speaker === 'A' ? 'B' : 'A';
            turnCount++;
        }

        return lines;
    },

    /**
     * Extract vocabulary from conversation
     */
    extractVocabulary(lines, topic, difficulty) {
        const vocab = Utils.getVocabularyData(topic, difficulty);
        const conversationText = lines.map(l => l.text.toLowerCase()).join(' ');

        const wordTypes = ['nouns', 'verbs', 'adjectives', 'adverbs'];

        for (const type of wordTypes) {
            const words = vocab[type] || {};
            for (const word of Object.keys(words)) {
                // Create regex that also matches common word variations
                const baseWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // Match base word and common inflections (e.g., work, works, working, worked)
                const variations = [
                    baseWord,
                    baseWord + 's',
                    baseWord + 'es',
                    baseWord + 'ed',
                    baseWord + 'ing',
                    baseWord + 'ly',
                    baseWord + 'er',
                    baseWord + 'est'
                ].join('|');
                const regex = new RegExp(`\\b(${variations})\\b`, 'i');

                if (regex.test(conversationText)) {
                    this.usedVocabulary[type].add(word);
                    this.vocabularyDetails[word] = { ...words[word], type: type.slice(0, -1) };

                    // Also add the lowercase version for case-insensitive tooltip matching
                    this.vocabularyDetails[word.toLowerCase()] = { ...words[word], type: type.slice(0, -1) };
                }
            }
        }

        if (vocab.idioms) {
            for (const idiom of Object.keys(vocab.idioms)) {
                if (conversationText.includes(idiom.toLowerCase())) {
                    this.usedVocabulary.idioms.add(idiom);
                    this.vocabularyDetails[idiom] = { ...vocab.idioms[idiom], type: 'idiom' };
                    this.vocabularyDetails[idiom.toLowerCase()] = { ...vocab.idioms[idiom], type: 'idiom' };
                }
            }
        }

        if (vocab.collocations) {
            for (const collocation of Object.keys(vocab.collocations)) {
                if (conversationText.includes(collocation.toLowerCase())) {
                    this.usedVocabulary.collocations.add(collocation);
                    this.vocabularyDetails[collocation] = { ...vocab.collocations[collocation], type: 'collocation' };
                    this.vocabularyDetails[collocation.toLowerCase()] = { ...vocab.collocations[collocation], type: 'collocation' };
                }
            }
        }
    },

    /**
     * Get plain text version
     */
    getPlainText() {
        return this.currentConversation.map(line => `${line.speaker}: ${line.text}`).join('\n');
    }
};
