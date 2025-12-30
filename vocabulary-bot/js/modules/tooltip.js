/**
 * Tooltip Module
 * Handles vocabulary word tooltips on hover
 */

const TooltipManager = {
    tooltip: null,

    /**
     * Initialize tooltip functionality
     */
    init() {
        this.tooltip = document.getElementById('tooltip');
        if (!this.tooltip) return;

        document.addEventListener('mouseover', (e) => this.handleMouseOver(e));
        document.addEventListener('mouseout', (e) => this.handleMouseOut(e));
    },

    /**
     * Handle mouseover on vocabulary words
     */
    handleMouseOver(e) {
        const target = e.target.closest('.vocab-word[data-word]');
        if (!target) return;

        const word = target.dataset.word;
        // Try both original case and lowercase for matching
        const details = ConversationGenerator.vocabularyDetails[word] ||
                       ConversationGenerator.vocabularyDetails[word.toLowerCase()];
        if (!details) return;

        // Display the actual word from the text (capitalize first letter for display)
        const displayWord = word.charAt(0).toUpperCase() + word.slice(1);

        this.tooltip.innerHTML = `
            <div class="tooltip-word">${displayWord}${details.phonetic ? `<span class="tooltip-phonetic">${details.phonetic}</span>` : ''}</div>
            <div class="tooltip-definition">${details.definition}</div>
            ${details.examples && details.examples[0] ? `<div class="tooltip-example">"${details.examples[0]}"</div>` : ''}
        `;

        const rect = target.getBoundingClientRect();
        this.tooltip.style.left = `${rect.left}px`;
        this.tooltip.style.top = `${rect.bottom + 8}px`;
        this.tooltip.classList.add('visible');
    },

    /**
     * Handle mouseout from vocabulary words
     */
    handleMouseOut(e) {
        if (!e.target.closest('.vocab-word[data-word]')) return;
        this.tooltip.classList.remove('visible');
    },

    /**
     * Hide tooltip
     */
    hide() {
        if (this.tooltip) {
            this.tooltip.classList.remove('visible');
        }
    }
};
