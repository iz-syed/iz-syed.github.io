/**
 * Form Handler Module
 * Handles form validation and submission
 */

const FormHandler = {
    STORAGE_KEY: 'vocabbot-form-state',

    /**
     * Validate the generator form
     */
    validate() {
        let isValid = true;

        // Difficulty
        const difficulty = document.querySelector('input[name="difficulty"]:checked');
        const diffError = document.getElementById('difficultyError');
        if (!difficulty) {
            diffError.textContent = 'Please select a difficulty level';
            isValid = false;
        } else {
            diffError.textContent = '';
        }

        // Topic (use TopicSelector if available, otherwise fall back to select)
        let topic = '';
        if (typeof TopicSelector !== 'undefined') {
            if (!TopicSelector.validate()) {
                isValid = false;
            }
            topic = TopicSelector.getValue();
        } else {
            topic = document.getElementById('topic')?.value || '';
            const topicError = document.getElementById('topicError');
            if (!topic) {
                if (topicError) topicError.textContent = 'Please select a topic';
                isValid = false;
            } else {
                if (topicError) topicError.textContent = '';
            }
        }

        // Word limit
        const wordLimit = document.getElementById('wordLimit').value;
        const wordError = document.getElementById('wordLimitError');
        if (!wordLimit || wordLimit < AppConstants.WORD_LIMIT_MIN || wordLimit > AppConstants.WORD_LIMIT_MAX) {
            wordError.textContent = `Please enter a value between ${AppConstants.WORD_LIMIT_MIN} and ${AppConstants.WORD_LIMIT_MAX}`;
            isValid = false;
        } else {
            wordError.textContent = '';
        }

        return isValid;
    },

    /**
     * Get form values
     */
    getValues() {
        // Get topic from TopicSelector or fallback to select element
        let topic = '';
        if (typeof TopicSelector !== 'undefined') {
            topic = TopicSelector.getValue();
        } else {
            topic = document.getElementById('topic')?.value || '';
        }

        return {
            difficulty: document.querySelector('input[name="difficulty"]:checked')?.value,
            topic: topic,
            tone: document.getElementById('tone').value,
            wordLimit: parseInt(document.getElementById('wordLimit').value, 10),
            highlightWords: document.getElementById('highlightWords').checked,
            showDefinitions: document.getElementById('showDefinitions').checked,
            showVocabPanel: document.getElementById('showVocabPanel').checked
        };
    },

    /**
     * Reset form and clear errors
     */
    reset() {
        document.getElementById('generatorForm').reset();
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Reset TopicSelector if available
        if (typeof TopicSelector !== 'undefined') {
            TopicSelector.reset();
        }

        // Clear saved state
        this.clearState();
    },

    /**
     * Save form state to localStorage
     */
    saveState() {
        try {
            const state = {
                difficulty: document.querySelector('input[name="difficulty"]:checked')?.value || null,
                topic: (typeof TopicSelector !== 'undefined') ? TopicSelector.getValue() : '',
                variant: document.getElementById('variant')?.value || 'american',
                tone: document.getElementById('tone')?.value || 'neutral',
                wordLimit: document.getElementById('wordLimit')?.value || '100',
                highlightWords: document.getElementById('highlightWords')?.checked ?? true,
                showDefinitions: document.getElementById('showDefinitions')?.checked ?? true,
                showVocabPanel: document.getElementById('showVocabPanel')?.checked ?? true
            };

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            Logger.error('Failed to save form state:', error);
        }
    },

    /**
     * Restore form state from localStorage
     */
    restoreState() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (!saved) return;

            const state = JSON.parse(saved);

            // Restore difficulty
            if (state.difficulty) {
                const difficultyInput = document.querySelector(`input[name="difficulty"][value="${state.difficulty}"]`);
                if (difficultyInput) difficultyInput.checked = true;
            }

            // Restore topic (TopicSelector.init() runs synchronously before this)
            if (state.topic && typeof TopicSelector !== 'undefined') {
                TopicSelector.selectTopic(state.topic);
            }

            // Restore variant
            const variantSelect = document.getElementById('variant');
            if (variantSelect && state.variant) {
                variantSelect.value = state.variant;
            }

            // Restore tone
            const toneSelect = document.getElementById('tone');
            if (toneSelect && state.tone) {
                toneSelect.value = state.tone;
            }

            // Restore word limit
            const wordLimitInput = document.getElementById('wordLimit');
            if (wordLimitInput && state.wordLimit) {
                wordLimitInput.value = state.wordLimit;
            }

            // Restore display options
            const highlightWordsCheckbox = document.getElementById('highlightWords');
            if (highlightWordsCheckbox) {
                highlightWordsCheckbox.checked = state.highlightWords ?? true;
            }

            const showDefinitionsCheckbox = document.getElementById('showDefinitions');
            if (showDefinitionsCheckbox) {
                showDefinitionsCheckbox.checked = state.showDefinitions ?? true;
            }

            const showVocabPanelCheckbox = document.getElementById('showVocabPanel');
            if (showVocabPanelCheckbox) {
                showVocabPanelCheckbox.checked = state.showVocabPanel ?? true;
            }
        } catch (error) {
            Logger.error('Failed to restore form state:', error);
        }
    },

    /**
     * Clear saved state from localStorage
     */
    clearState() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            Logger.error('Failed to clear form state:', error);
        }
    },

    /**
     * Initialize form state management
     */
    initStateManagement() {
        // Restore state on init
        this.restoreState();

        // Save state on any form change
        const form = document.getElementById('generatorForm');
        if (form) {
            form.addEventListener('change', () => {
                this.saveState();
            });

            // Also save on input for number/text fields
            form.addEventListener('input', () => {
                clearTimeout(this.saveTimeout);
                this.saveTimeout = setTimeout(() => {
                    this.saveState();
                }, AppConstants.DEBOUNCE_DELAY);
            });
        }
    }
};

