/**
 * Vocabulary Panel Module
 * Handles vocabulary list rendering and filtering with Test Mode support
 */

const VocabPanel = {
    testModeEnabled: false,
    revealedWords: new Set(),
    _lastRenderKey: '',

    /**
     * Initialize the vocabulary panel
     */
    init() {
        this.initTabs();
        this.initTestMode();
        this.initClickDelegation();
    },

    /**
     * Estimate CEFR level based on word complexity
     */
    estimateCEFRLevel(word, type) {
        const wordLength = word.length;
        const commonWords = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I'];

        // Simple heuristic for CEFR levels
        if (commonWords.includes(word.toLowerCase()) || wordLength <= 4) return 'A1';
        if (type === 'idiom' || type === 'collocation') return 'B2';
        if (wordLength <= 6) return 'A2';
        if (wordLength <= 8) return 'B1';
        if (wordLength <= 10) return 'B2';
        if (wordLength <= 12) return 'C1';
        return 'C2';
    },

    /**
     * Render the vocabulary panel with optional filter
     */
    render(filter = 'all') {
        const vocabList = document.getElementById('vocabList');
        if (!vocabList) return;

        // Build a cache key to skip redundant renders
        const detailKeys = Object.keys(ConversationGenerator.vocabularyDetails).length;
        const renderKey = `${filter}:${detailKeys}:${this.testModeEnabled}:${this.revealedWords.size}`;
        if (renderKey === this._lastRenderKey) return;
        this._lastRenderKey = renderKey;

        let words = [];
        const usedVocab = ConversationGenerator.usedVocabulary;
        const details = ConversationGenerator.vocabularyDetails;

        const addWords = (set) => {
            set.forEach(word => {
                if (details[word]) {
                    const cefrLevel = this.estimateCEFRLevel(word, details[word].type);
                    words.push({ word, ...details[word], cefrLevel });
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

        const concealedClass = this.testModeEnabled ? 'concealed' : '';
        const revealedClass = (word) => this.revealedWords.has(word) ? 'revealed' : '';

        vocabList.innerHTML = words.map((item, index) => {
            const delay = index * 0.05;
            const safeWord = Utils.escapeHtml(item.word);
            const safeDef = Utils.escapeHtml(item.definition);
            const safePhonetic = item.phonetic ? Utils.escapeHtml(item.phonetic) : '';
            return `
            <div class="vocab-card vocab-word ${concealedClass} ${revealedClass(item.word)}"
                 data-word="${safeWord}"
                 style="animation-delay: ${delay}s">
                <div class="vocab-card-header">
                    <span class="vocab-card-word">${safeWord}</span>
                    <span class="cefr-badge cefr-${item.cefrLevel.toLowerCase()}">${item.cefrLevel}</span>
                </div>
                <div class="vocab-card-meta">
                    <span class="vocab-card-type ${item.type}">${item.type}</span>
                    ${safePhonetic ? `<span class="vocab-card-phonetic">${safePhonetic}</span>` : ''}
                </div>
                <div class="vocab-card-definition word-definition">${safeDef}</div>
            </div>
        `}).join('');

        // Update progress
        this.updateProgress(words.length);
    },

    /**
     * Set up delegated click handler for Test Mode reveal (called once)
     */
    initClickDelegation() {
        const vocabList = document.getElementById('vocabList');
        if (!vocabList) return;

        vocabList.addEventListener('click', (e) => {
            if (!this.testModeEnabled) return;

            const card = e.target.closest('.vocab-word.concealed:not(.revealed)');
            if (!card) return;

            const word = card.dataset.word;
            if (!word || this.revealedWords.has(word)) return;

            this.createRipple(e, card);
            this.revealedWords.add(word);
            card.classList.add('revealed');

            const totalWords = document.querySelectorAll('.vocab-word').length;
            this.updateProgress(totalWords);
        });
    },

    /**
     * Create ripple animation effect
     */
    createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    },

    /**
     * Update Test Mode progress
     */
    updateProgress(totalWords) {
        let progressDiv = document.querySelector('.test-mode-progress');

        if (!progressDiv && this.testModeEnabled) {
            progressDiv = document.createElement('div');
            progressDiv.className = 'test-mode-progress';
            const vocabHeader = document.querySelector('.vocab-header');
            vocabHeader.after(progressDiv);
        }

        if (progressDiv && this.testModeEnabled) {
            const revealedCount = this.revealedWords.size;
            const percentage = totalWords > 0 ? Math.round((revealedCount / totalWords) * 100) : 0;

            progressDiv.innerHTML = `
                <div class="progress-stats">
                    <span class="progress-label">Progress:</span>
                    <span class="progress-value">${revealedCount} / ${totalWords} revealed (${percentage}%)</span>
                </div>
            `;
        }
    },

    /**
     * Initialize Test Mode toggle
     */
    initTestMode() {
        const testModeToggle = document.getElementById('testModeToggle');
        if (!testModeToggle) return;

        testModeToggle.addEventListener('change', (e) => {
            this.testModeEnabled = e.target.checked;

            if (this.testModeEnabled) {
                document.querySelector('.vocab-panel').classList.add('test-mode-active');
            } else {
                document.querySelector('.vocab-panel').classList.remove('test-mode-active');
                // Clear progress when disabling Test Mode
                const progressDiv = document.querySelector('.test-mode-progress');
                if (progressDiv) progressDiv.remove();
            }

            // Re-render with current filter
            const activeTab = document.querySelector('.vocab-tab.active');
            const filter = activeTab ? activeTab.dataset.tab : 'all';
            this.render(filter);
        });
    },

    /**
     * Reset Test Mode state
     */
    resetTestMode() {
        this.revealedWords.clear();
        const testModeToggle = document.getElementById('testModeToggle');
        if (testModeToggle) {
            testModeToggle.checked = false;
            this.testModeEnabled = false;
        }
        document.querySelector('.vocab-panel')?.classList.remove('test-mode-active');
        const progressDiv = document.querySelector('.test-mode-progress');
        if (progressDiv) progressDiv.remove();
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
        this._lastRenderKey = '';
        this.resetTestMode();
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
