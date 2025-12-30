/**
 * Output Renderer Module
 * Handles conversation display and formatting
 */

const OutputRenderer = {
    /**
     * Format and display conversation
     */
    render(lines, highlightWords, showDefinitions) {
        const container = document.getElementById('conversationBox');
        container.innerHTML = '';

        lines.forEach((line, index) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = `conversation-line speaker-${line.speaker.toLowerCase()}`;
            lineDiv.style.animationDelay = `${index * 0.05}s`;

            let text = line.text;
            if (highlightWords) {
                text = this.highlightVocabulary(text, showDefinitions);
            }

            lineDiv.innerHTML = `
                <div class="speaker-avatar">${line.speaker}</div>
                <div class="conversation-bubble">${text}</div>
            `;

            container.appendChild(lineDiv);
        });
    },

    /**
     * Highlight vocabulary words in text
     */
    highlightVocabulary(text, showDefinitions) {
        let result = text;
        const details = ConversationGenerator.vocabularyDetails;

        // Get unique base words (avoid duplicates from lowercase versions)
        const uniqueWords = [...new Set(Object.keys(details).map(w => w.toLowerCase()))];
        const allWords = uniqueWords.sort((a, b) => b.length - a.length);

        allWords.forEach(word => {
            const wordDetails = details[word] || details[word.toLowerCase()];
            if (!wordDetails) return;

            // Match the word and common variations
            const baseWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

            const regex = new RegExp(`\\b(${variations})\\b`, 'gi');
            const dataAttr = showDefinitions ? `data-word="${word}"` : '';
            result = result.replace(regex, `<span class="vocab-word ${wordDetails.type}" ${dataAttr}>$1</span>`);
        });

        return result;
    },

    /**
     * Update output metadata
     */
    updateMeta(topic, difficulty, tone) {
        document.getElementById('outputMeta').textContent =
            `${TopicNames[topic]} • ${Utils.capitalizeFirst(difficulty)} • ${Utils.capitalizeFirst(tone)}`;
    },

    /**
     * Update output statistics
     */
    updateStats(lines) {
        const details = ConversationGenerator.vocabularyDetails;
        const totalWords = lines.reduce((sum, l) => {
            return sum + l.text.split(/\s+/).filter(w => w.length > 0).length;
        }, 0);
        const vocabCount = Object.keys(details).length;

        document.getElementById('outputStats').innerHTML = `
            <span class="stat-item">Words: <span class="stat-value">${totalWords}</span></span>
            <span class="stat-item">Lines: <span class="stat-value">${lines.length}</span></span>
            <span class="stat-item">Vocabulary: <span class="stat-value">${vocabCount} unique</span></span>
        `;
    },

    /**
     * Show output content, hide empty state
     */
    showOutput() {
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('outputContent').classList.add('active');
    },

    /**
     * Hide output content, show empty state
     */
    hideOutput() {
        document.getElementById('emptyState').style.display = 'flex';
        document.getElementById('outputContent').classList.remove('active');
    }
};
