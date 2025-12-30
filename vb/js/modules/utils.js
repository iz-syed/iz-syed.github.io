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
     * Show a toast notification
     */
    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-message">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};
