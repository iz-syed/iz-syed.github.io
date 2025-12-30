/**
 * Vocabulary Panel Module
 * Handles vocabulary list rendering and filtering
 */

const VocabPanel = {
    /**
     * Render the vocabulary panel with optional filter
     */
    render(filter = 'all') {
        const vocabList = document.getElementById('vocabList');
        if (!vocabList) return;

        let words = [];
        const usedVocab = ConversationGenerator.usedVocabulary;
        const details = ConversationGenerator.vocabularyDetails;

        const addWords = (set) => {
            set.forEach(word => {
                if (details[word]) {
                    words.push({ word, ...details[word] });
                }
            });
        };

        if (filter === 'all' || filter === 'nouns') addWords(usedVocab.nouns);
        if (filter === 'all' || filter === 'verbs') addWords(usedVocab.verbs);
        if (filter === 'all' || filter === 'adjectives') addWords(usedVocab.adjectives);
        if (filter === 'all' || filter === 'adverbs') addWords(usedVocab.adverbs);
        if (filter === 'all' || filter === 'idioms') {
            addWords(usedVocab.idioms);
            addWords(usedVocab.collocations);
        }

        if (words.length === 0) {
            vocabList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem; grid-column: 1/-1;">No vocabulary words in this category.</p>';
            return;
        }

        vocabList.innerHTML = words.map(item => `
            <div class="vocab-card">
                <div class="vocab-card-header">
                    <span class="vocab-card-word">${item.word}</span>
                    <span class="vocab-card-type ${item.type}">${item.type}</span>
                    ${item.phonetic ? `<span class="vocab-card-phonetic">${item.phonetic}</span>` : ''}
                </div>
                <div class="vocab-card-definition">${item.definition}</div>
            </div>
        `).join('');
    },

    /**
     * Reset the panel to empty state
     */
    reset() {
        const vocabList = document.getElementById('vocabList');
        if (vocabList) {
            vocabList.innerHTML = `
                <div class="vocab-empty">
                    <p>Generate a conversation to see vocabulary here</p>
                </div>
            `;
        }
    },

    /**
     * Initialize tab filtering
     */
    initTabs() {
        const tabsContainer = document.getElementById('vocabTabs');
        if (!tabsContainer) return;

        tabsContainer.addEventListener('click', (e) => {
            const tab = e.target.closest('.vocab-tab');
            if (!tab) return;

            document.querySelectorAll('.vocab-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            this.render(tab.dataset.tab);
        });
    }
};
