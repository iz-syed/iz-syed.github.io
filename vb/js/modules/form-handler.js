/**
 * Form Handler Module
 * Handles form validation and submission
 */

const FormHandler = {
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

        // Topic
        const topic = document.getElementById('topic').value;
        const topicError = document.getElementById('topicError');
        if (!topic) {
            topicError.textContent = 'Please select a topic';
            isValid = false;
        } else {
            topicError.textContent = '';
        }

        // Word limit
        const wordLimit = document.getElementById('wordLimit').value;
        const wordError = document.getElementById('wordLimitError');
        if (!wordLimit || wordLimit < 20 || wordLimit > 2000) {
            wordError.textContent = 'Please enter a value between 20 and 2000';
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
        return {
            difficulty: document.querySelector('input[name="difficulty"]:checked')?.value,
            topic: document.getElementById('topic').value,
            tone: document.getElementById('tone').value,
            wordLimit: parseInt(document.getElementById('wordLimit').value),
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
    }
};
