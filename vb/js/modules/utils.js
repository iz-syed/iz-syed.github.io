/**
 * Application Constants
 */
const AppConstants = {
    TOAST_DURATION: 3000,
    API_TIMEOUT: 30000,
    ANIMATION_FADE: 300,
    DEBOUNCE_DELAY: 500,
    HISTORY_MAX_ENTRIES: 50,
    HISTORY_MAX_AGE_DAYS: 30,
    WORD_LIMIT_MIN: 20,
    WORD_LIMIT_MAX: 2000,
    TOKENS_PER_WORD: 1.5,
    MAX_TOKENS: 8000,
};

/**
 * Logger - guarded console wrapper for production
 * Set Logger.enabled = false to silence all logging
 */
const Logger = {
    enabled: true,
    error(...args) { if (this.enabled) console.error(...args); },
    warn(...args) { if (this.enabled) console.warn(...args); },
    info(...args) { if (this.enabled) console.info(...args); },
};

/**
 * Utility Functions
 * Common helper functions used across the application
 */

const Utils = {
    /**
     * Get a random item from an array
     */
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Capitalize the first letter of a string
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Get vocabulary data for a specific topic and difficulty
     */
    getVocabularyData(topic, difficulty) {
        const topicData = VocabularyDatabase[topic] || VocabularyDatabase.office;
        return topicData[difficulty] || topicData.easy;
    },

    /**
     * Escape HTML special characters to prevent XSS
     */
    escapeHtml(str) {
        if (!str) return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return String(str).replace(/[&<>"']/g, c => map[c]);
    },

    /**
     * Show a toast notification
     */
    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Icons based on type
        let icon = '';
        if (type === 'success') {
            icon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        } else if (type === 'error') {
            icon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
        } else {
            icon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        }

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <span class="toast-message">${this.escapeHtml(message)}</span>
        `;

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), AppConstants.ANIMATION_FADE);
        }, AppConstants.TOAST_DURATION);
    }
};
