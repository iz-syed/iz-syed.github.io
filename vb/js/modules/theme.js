/**
 * Theme Management Module
 * Handles dark/light theme toggling and persistence
 */

const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('vocabbot-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggle();
        });
    },

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('vocabbot-theme', newTheme);
    },

    getTheme() {
        return document.documentElement.getAttribute('data-theme');
    }
};
