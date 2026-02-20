/**
 * History Panel
 * Handles the UI for displaying and interacting with conversation history
 */

const HistoryPanel = {
    isOpen: false,
    state: {
        filter: 'all', // 'all', 'favorites'
        sort: 'newest', // 'newest', 'oldest', 'words'
        search: ''
    },

    /**
     * Initialize history panel
     */
    init() {
        this.bindEvents();
        this.initListDelegation();
        this.updateBadge();
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Toggle button
        const toggleBtn = document.getElementById('historyToggleBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }

        // Close button
        const closeBtn = document.getElementById('historyCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Clear all button
        const clearBtn = document.getElementById('historyClearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.handleClearAll());
        }

        // Click outside to close on mobile
        const overlay = document.getElementById('historyOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.close());
        }

        // Search input
        const searchInput = document.getElementById('historySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.state.search = e.target.value.toLowerCase();
                this.render();
            });
        }

        // Filter chips
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                // Update active state
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                // Update filter state
                this.state.filter = chip.dataset.filter;
                this.render();
            });
        });

        // Sort select
        const sortSelect = document.getElementById('historySort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.state.sort = e.target.value;
                this.render();
            });
        }
    },

    /**
     * Set up delegated click handler for history list items (called once)
     */
    initListDelegation() {
        const listEl = document.getElementById('historyList');
        if (!listEl) return;

        listEl.addEventListener('click', (e) => {
            const item = e.target.closest('.history-item');
            if (!item) return;

            const id = item.dataset.id;

            // Check specific buttons first (they take priority over card click)
            const loadBtn = e.target.closest('.history-load-btn');
            if (loadBtn) { this.loadEntry(id); return; }

            const deleteBtn = e.target.closest('.history-delete-btn');
            if (deleteBtn) { this.deleteEntry(id, item); return; }

            const favBtn = e.target.closest('.history-favorite-btn');
            if (favBtn) { this.toggleFavorite(id, favBtn); return; }

            // Click on card itself loads the entry
            this.loadEntry(id);
        });
    },

    /**
     * Toggle panel visibility
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    /**
     * Open the history panel
     */
    open() {
        const panel = document.getElementById('historyPanel');
        const overlay = document.getElementById('historyOverlay');

        if (panel) {
            panel.classList.add('open');
            this.isOpen = true;
            this.render();
        }

        if (overlay) {
            overlay.classList.add('active');
        }
    },

    /**
     * Close the history panel
     */
    close() {
        const panel = document.getElementById('historyPanel');
        const overlay = document.getElementById('historyOverlay');

        if (panel) {
            panel.classList.remove('open');
            this.isOpen = false;
        }

        if (overlay) {
            overlay.classList.remove('active');
        }
    },

    /**
     * Get filtered and sorted history items
     */
    getFilteredHistory() {
        let history = HistoryManager.getAll();

        // Filter by favorites
        if (this.state.filter === 'favorites') {
            history = history.filter(item => item.isFavorite);
        }

        // Filter by search term
        if (this.state.search) {
            const term = this.state.search;
            history = history.filter(item => {
                const topic = (item.settings.topic || '').toLowerCase();
                const tags = (item.tags || []).join(' ').toLowerCase();
                const preview = (item.conversation[0]?.text || '').toLowerCase();

                return topic.includes(term) || tags.includes(term) || preview.includes(term);
            });
        }

        // Sort
        history.sort((a, b) => {
            if (this.state.sort === 'newest') {
                return new Date(b.timestamp) - new Date(a.timestamp);
            } else if (this.state.sort === 'oldest') {
                return new Date(a.timestamp) - new Date(b.timestamp);
            } else if (this.state.sort === 'words') {
                return b.stats.wordCount - a.stats.wordCount;
            }
            return 0;
        });

        return history;
    },

    /**
     * Render history items
     */
    render() {
        const listEl = document.getElementById('historyList');
        const emptyEl = document.getElementById('historyEmpty');
        const clearBtn = document.getElementById('historyClearBtn');

        if (!listEl) return;

        const history = this.getFilteredHistory();
        const totalHistory = HistoryManager.getAll().length;

        if (history.length === 0) {
            listEl.style.display = 'none';
            if (emptyEl) {
                emptyEl.style.display = 'flex';
                // Update empty message based on filters
                const p = emptyEl.querySelector('p');
                const span = emptyEl.querySelector('span');

                if (totalHistory > 0) {
                    p.textContent = 'No matching conversations';
                    span.textContent = 'Try adjusting your search or filters';
                } else {
                    p.textContent = 'No conversations saved yet';
                    span.textContent = 'Generate a conversation to see it here';
                }
            }
            return;
        }

        listEl.style.display = 'flex';
        if (emptyEl) emptyEl.style.display = 'none';

        // Only show clear button if we have history (regardless of filter)
        if (clearBtn) clearBtn.style.display = totalHistory > 0 ? 'flex' : 'none';

        listEl.innerHTML = history.map((entry, index) => this.renderItem(entry, index)).join('');
    },

    /**
     * Render a single history item
     */
    renderItem(entry, index = 0) {
        const date = new Date(entry.timestamp);
        const timeAgo = this.getTimeAgo(date);
        const topicName = TopicNames[entry.settings.topic] || entry.settings.topic;

        const delay = index * 0.05; // Stagger delay

        // Get first line preview
        const preview = entry.conversation[0]?.text?.substring(0, 80) || 'No preview';

        // AI badge
        const aiBadge = entry.usingAI
            ? `<span class="history-badge ai">${Utils.escapeHtml(entry.aiProvider)}</span>`
            : `<span class="history-badge template">Template</span>`;

        // Tags
        const tagsHtml = (entry.tags || [entry.settings.topic, entry.settings.difficulty])
            .map(tag => `<span class="history-tag">${Utils.escapeHtml(tag)}</span>`)
            .join('');

        return `
            <div class="history-item" data-id="${entry.id}" style="animation-delay: ${delay}s">
                <div class="history-item-header">
                    <div class="history-item-meta">
                        <span class="history-topic">${Utils.escapeHtml(topicName)}</span>
                        <span class="history-difficulty ${entry.settings.difficulty}">${Utils.escapeHtml(entry.settings.difficulty)}</span>
                        ${aiBadge}
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="history-time" title="${date.toLocaleString()}">${timeAgo}</span>
                        <button class="history-favorite-btn ${entry.isFavorite ? 'active' : ''}" title="${entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="${entry.isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="history-item-preview">"${Utils.escapeHtml(preview)}${preview.length >= 80 ? '...' : ''}"</div>
                <div class="history-tags">
                   ${tagsHtml}
                </div>
                <div class="history-item-stats">
                    <span>${entry.stats.wordCount} words</span>
                    <span>${entry.stats.lineCount} lines</span>
                    <span>${this.getTotalVocabCount(entry.stats)} vocab</span>
                </div>
                <div class="history-item-actions">
                    <button class="history-load-btn" title="Load conversation">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="1 4 1 10 7 10"></polyline>
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                        </svg>
                        Load
                    </button>
                    <button class="history-delete-btn" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Load an entry into the main view
     */
    loadEntry(id) {
        const entry = HistoryManager.getById(id);
        if (!entry) {
            Utils.showToast('Could not find history entry', 'error');
            return;
        }

        // Restore conversation generator state
        ConversationGenerator.currentConversation = entry.conversation;
        ConversationGenerator.vocabularyDetails = entry.vocabularyDetails;

        // Restore usedVocabulary (convert arrays back to Sets)
        ConversationGenerator.usedVocabulary = {
            nouns: new Set(entry.usedVocabulary.nouns || []),
            verbs: new Set(entry.usedVocabulary.verbs || []),
            adjectives: new Set(entry.usedVocabulary.adjectives || []),
            adverbs: new Set(entry.usedVocabulary.adverbs || []),
            idioms: new Set(entry.usedVocabulary.idioms || []),
            collocations: new Set(entry.usedVocabulary.collocations || [])
        };

        // Get current display options
        const highlightWords = document.getElementById('highlightWords')?.checked ?? true;
        const showDefinitions = document.getElementById('showDefinitions')?.checked ?? true;

        // Show output
        OutputRenderer.showOutput();

        // Render conversation
        OutputRenderer.render(entry.conversation, highlightWords, showDefinitions);

        // Update meta and stats
        OutputRenderer.updateMeta(entry.settings.topic, entry.settings.difficulty, entry.settings.tone);
        OutputRenderer.updateStats(entry.conversation);

        // Render vocabulary panel
        VocabPanel.render('all');

        // Close history panel
        this.close();

        // Show toast
        Utils.showToast('Loaded from history (offline)');
    },

    /**
     * Delete an entry
     */
    deleteEntry(id, itemEl) {
        if (HistoryManager.delete(id)) {
            // Animate out
            itemEl.style.opacity = '0';
            itemEl.style.transform = 'translateX(100%)';

            setTimeout(() => {
                // Remove element, but re-render if it was the last one or to respect sort
                // Actually easier to just re-render to keep indices correct
                this.render();
                this.updateBadge();
            }, 200);

            Utils.showToast('Entry deleted');
        }
    },

    /**
     * Toggle favorite status
     */
    toggleFavorite(id, btnEl) {
        const isFavorite = HistoryManager.toggleFavorite(id);

        if (isFavorite) {
            btnEl.classList.add('active');
            btnEl.title = 'Remove from favorites';
            const svg = btnEl.querySelector('svg');
            if (svg) svg.setAttribute('fill', 'currentColor');
            Utils.showToast('Added to favorites');
        } else {
            btnEl.classList.remove('active');
            btnEl.title = 'Add to favorites';
            const svg = btnEl.querySelector('svg');
            if (svg) svg.setAttribute('fill', 'none');

            // If viewing favorites filter, remove the item
            if (this.state.filter === 'favorites') {
                this.render();
            }
            Utils.showToast('Removed from favorites');
        }
    },

    /**
     * Handle clear all
     */
    handleClearAll() {
        if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
            if (HistoryManager.clearAll()) {
                this.render();
                this.updateBadge();
                Utils.showToast('History cleared');
            }
        }
    },

    /**
     * Update the badge (dot indicator)
     */
    updateBadge() {
        const badge = document.getElementById('historyBadge');
        const count = HistoryManager.getCount();

        if (badge) {
            badge.style.display = count > 0 ? 'block' : 'none';
            badge.textContent = count > 9 ? '9+' : count;
        }
    },

    /**
     * Get total vocabulary count from stats
     */
    getTotalVocabCount(stats) {
        return (stats.nounCount || 0) +
            (stats.verbCount || 0) +
            (stats.adjectiveCount || 0) +
            (stats.adverbCount || 0) +
            (stats.idiomCount || 0) +
            (stats.collocationCount || 0);
    },

    /**
     * Get human-readable time ago string
     */
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

        return date.toLocaleDateString();
    }
};
