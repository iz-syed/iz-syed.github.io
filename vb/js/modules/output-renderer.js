/**
 * Output Renderer Module
 * Handles conversation display and formatting
 */

const OutputRenderer = {
    // Cached regex map: word -> RegExp (cleared on each render)
    _regexCache: new Map(),

    /**
     * Format and display conversation
     */
    render(lines, highlightWords, showDefinitions) {
        const container = document.getElementById('conversationBox');
        container.innerHTML = '';
        this._regexCache.clear();

        lines.forEach((line, index) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = `conversation-line speaker-${line.speaker.toLowerCase()}`;
            lineDiv.setAttribute('data-index', index); // Add index for reference
            lineDiv.style.animationDelay = `${index * 0.05}s`;

            let text = Utils.escapeHtml(line.text);
            if (highlightWords) {
                text = this.highlightVocabulary(text, showDefinitions);
            }

            lineDiv.innerHTML = `
                <div class="speaker-avatar">${Utils.escapeHtml(line.speaker)}</div>
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

            // Use cached regex or create and cache it
            let regex = this._regexCache.get(word);
            if (!regex) {
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
                regex = new RegExp(`\\b(${variations})\\b`, 'gi');
                this._regexCache.set(word, regex);
            }
            regex.lastIndex = 0;

            const dataAttr = showDefinitions ? `data-word="${Utils.escapeHtml(word)}"` : '';
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
    },

    /**
     * Highlight a specific line by index
     */
    highlightLine(index) {
        const lines = document.querySelectorAll('.conversation-line');
        lines.forEach(l => l.classList.remove('active-speaking'));

        const activeLine = document.querySelector(`.conversation-line[data-index="${index}"]`);
        if (activeLine) {
            activeLine.classList.add('active-speaking');
            activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    /**
     * Clear all line highlights
     */
    clearHighlights() {
        const lines = document.querySelectorAll('.conversation-line');
        lines.forEach(l => l.classList.remove('active-speaking'));
    },

    /**
     * Show skeleton loader for generating state
     */
    showSkeleton() {
        const container = document.getElementById('conversationBox');
        container.innerHTML = '';

        // Show output container
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('outputContent').classList.add('active');

        // Create skeleton lines
        for (let i = 0; i < 4; i++) {
            const isLeft = i % 2 === 0;
            const width = 60 + Math.random() * 30; // 60-90%

            const skelLine = document.createElement('div');
            skelLine.className = `conversation-line skeleton-container`;
            skelLine.style.flexDirection = isLeft ? 'row' : 'row-reverse';

            skelLine.innerHTML = `
                <div class="skeleton" style="width: 40px; height: 40px; border-radius: 50%;"></div>
                <div class="skeleton-bubble skeleton" style="width: ${width}%; height: 60px; margin: 0 16px;"></div>
            `;
            container.appendChild(skelLine);
        }
    }
};
