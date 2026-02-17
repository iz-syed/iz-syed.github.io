/**
 * History Manager
 * Handles storing and retrieving conversation history in localStorage
 */

const HistoryManager = {
    STORAGE_KEY: 'vocabbot-history',
    MAX_ENTRIES: AppConstants.HISTORY_MAX_ENTRIES,

    /**
     * Initialize history manager
     */
    init() {
        // Clean up old entries on init
        this.cleanup();
    },

    /**
     * Get all history entries
     */
    getAll() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            Logger.error('Error reading history:', e);
            return [];
        }
    },

    /**
     * Get a single entry by ID
     */
    getById(id) {
        const history = this.getAll();
        return history.find(entry => entry.id === id);
    },

    /**
     * Save a new conversation to history
     */
    save(entry) {
        try {
            const history = this.getAll();

            // Create history entry with ID
            const historyEntry = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                isFavorite: false,
                tags: [entry.settings.topic, entry.settings.difficulty],
                ...entry
            };

            // Add to beginning (newest first)
            history.unshift(historyEntry);

            // Limit to max entries
            if (history.length > this.MAX_ENTRIES) {
                history.splice(this.MAX_ENTRIES);
            }

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
            return historyEntry;
        } catch (e) {
            Logger.error('Error saving to history:', e);
            return null;
        }
    },

    /**
     * Delete a single entry
     */
    delete(id) {
        try {
            const history = this.getAll();
            const filtered = history.filter(entry => entry.id !== id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
            return true;
        } catch (e) {
            Logger.error('Error deleting history entry:', e);
            return false;
        }
    },

    /**
     * Toggle favorite status for an entry
     */
    toggleFavorite(id) {
        try {
            const history = this.getAll();
            const entry = history.find(e => e.id === id);
            if (entry) {
                entry.isFavorite = !entry.isFavorite;
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
                return entry.isFavorite;
            }
            return false;
        } catch (e) {
            Logger.error('Error toggling favorite:', e);
            return false;
        }
    },

    /**
     * Update tags for an entry
     */
    updateTags(id, tags) {
        try {
            const history = this.getAll();
            const entry = history.find(e => e.id === id);
            if (entry) {
                entry.tags = tags;
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
                return true;
            }
            return false;
        } catch (e) {
            Logger.error('Error updating tags:', e);
            return false;
        }
    },

    /**
     * Clear all history
     */
    clearAll() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (e) {
            Logger.error('Error clearing history:', e);
            return false;
        }
    },

    /**
     * Cleanup old entries (older than 30 days)
     */
    cleanup() {
        try {
            const history = this.getAll();
            const thirtyDaysAgo = Date.now() - (AppConstants.HISTORY_MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

            const filtered = history.filter(entry => {
                const entryTime = new Date(entry.timestamp).getTime();
                return entryTime > thirtyDaysAgo;
            });

            if (filtered.length !== history.length) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
            }
        } catch (e) {
            Logger.error('Error cleaning up history:', e);
        }
    },

    /**
     * Get history count
     */
    getCount() {
        return this.getAll().length;
    },

    /**
     * Check if history has entries
     */
    hasEntries() {
        return this.getCount() > 0;
    },

    /**
     * Create entry from current conversation state
     */
    createEntry(settings, conversation, vocabularyDetails, usedVocabulary, usingAI) {
        // Convert Sets to Arrays for JSON serialization
        const vocabArrays = {};
        for (const [type, set] of Object.entries(usedVocabulary)) {
            vocabArrays[type] = Array.from(set);
        }

        // Calculate stats
        const stats = {
            wordCount: conversation.reduce((acc, line) => acc + line.text.split(/\s+/).length, 0),
            lineCount: conversation.length,
            nounCount: vocabArrays.nouns?.length || 0,
            verbCount: vocabArrays.verbs?.length || 0,
            adjectiveCount: vocabArrays.adjectives?.length || 0,
            adverbCount: vocabArrays.adverbs?.length || 0,
            idiomCount: vocabArrays.idioms?.length || 0,
            collocationCount: vocabArrays.collocations?.length || 0
        };

        return {
            settings: {
                topic: settings.topic,
                difficulty: settings.difficulty,
                tone: settings.tone,
                wordLimit: settings.wordLimit,
                variant: settings.variant
            },
            conversation: conversation,
            vocabularyDetails: vocabularyDetails,
            usedVocabulary: vocabArrays,
            stats: stats,
            usingAI: usingAI,
            aiProvider: usingAI ? (LLMService?.config?.provider || 'unknown') : 'template'
        };
    }
};
