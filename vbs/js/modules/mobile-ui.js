/**
 * Mobile UI Module
 * Handles mobile-specific UI behaviors and interactions
 */

const MobileUI = {
    isMobile: false,
    vocabPanelOpen: false,
    controlPanelVisible: true,

    /**
     * Initialize mobile UI features
     */
    init() {
        this.checkMobile();
        this.createMobileElements();
        this.bindEvents();
        
        // Listen for resize
        window.addEventListener('resize', () => {
            this.checkMobile();
        });
    },

    /**
     * Check if device is mobile
     */
    checkMobile() {
        this.isMobile = window.innerWidth <= 768;
        
        if (this.isMobile) {
            this.enableMobileMode();
        } else {
            this.disableMobileMode();
        }
    },

    /**
     * Create mobile-specific elements
     */
    createMobileElements() {
        // Mobile control panel toggle button
        if (!document.querySelector('.mobile-toggle-btn')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'mobile-toggle-btn mobile-only';
            toggleBtn.setAttribute('aria-label', 'Toggle controls panel');
            toggleBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <span>Show Controls</span>
            `;
            
            const controlPanel = document.querySelector('.control-panel');
            if (controlPanel) {
                controlPanel.parentNode.insertBefore(toggleBtn, controlPanel);
            }
        }

        // Mobile vocabulary toggle button
        if (!document.querySelector('.mobile-vocab-toggle')) {
            const vocabToggle = document.createElement('button');
            vocabToggle.className = 'mobile-vocab-toggle mobile-only';
            vocabToggle.setAttribute('aria-label', 'Toggle vocabulary panel');
            vocabToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            `;
            document.body.appendChild(vocabToggle);
        }

        // Add handle to vocab panel
        const vocabPanel = document.querySelector('.vocab-panel');
        if (vocabPanel && !document.querySelector('.vocab-panel-handle')) {
            const handle = document.createElement('div');
            handle.className = 'vocab-panel-handle mobile-only';
            vocabPanel.insertBefore(handle, vocabPanel.firstChild);
        }
    },

    /**
     * Bind mobile-specific events
     */
    bindEvents() {
        // Control panel toggle
        const toggleBtn = document.querySelector('.mobile-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleControlPanel());
        }

        // Vocabulary panel toggle
        const vocabToggle = document.querySelector('.mobile-vocab-toggle');
        if (vocabToggle) {
            vocabToggle.addEventListener('click', () => this.toggleVocabPanel());
        }

        // Close vocabulary panel when tapping outside
        const vocabPanel = document.querySelector('.vocab-panel');
        if (vocabPanel) {
            document.addEventListener('click', (e) => {
                if (this.isMobile && this.vocabPanelOpen) {
                    if (!vocabPanel.contains(e.target) && 
                        !e.target.closest('.mobile-vocab-toggle')) {
                        this.closeVocabPanel();
                    }
                }
            });
        }

        // Make sections collapsible on mobile
        this.makeCollapsible();
    },

    /**
     * Toggle control panel visibility
     */
    toggleControlPanel() {
        const controlPanel = document.querySelector('.control-panel');
        const toggleBtn = document.querySelector('.mobile-toggle-btn');
        
        if (!controlPanel || !toggleBtn) return;

        this.controlPanelVisible = !this.controlPanelVisible;
        
        if (this.controlPanelVisible) {
            controlPanel.classList.remove('mobile-collapsed');
            toggleBtn.classList.remove('collapsed');
            toggleBtn.querySelector('span').textContent = 'Hide Controls';
        } else {
            controlPanel.classList.add('mobile-collapsed');
            toggleBtn.classList.add('collapsed');
            toggleBtn.querySelector('span').textContent = 'Show Controls';
        }
    },

    /**
     * Hide control panel (after generation)
     */
    hideControlPanel() {
        if (!this.isMobile) return;
        
        const controlPanel = document.querySelector('.control-panel');
        const toggleBtn = document.querySelector('.mobile-toggle-btn');
        
        if (controlPanel && toggleBtn) {
            controlPanel.classList.add('mobile-collapsed');
            toggleBtn.classList.add('collapsed');
            toggleBtn.querySelector('span').textContent = 'Show Controls';
            this.controlPanelVisible = false;
        }
    },

    /**
     * Toggle vocabulary panel
     */
    toggleVocabPanel() {
        if (this.vocabPanelOpen) {
            this.closeVocabPanel();
        } else {
            this.openVocabPanel();
        }
    },

    /**
     * Open vocabulary panel
     */
    openVocabPanel() {
        const vocabPanel = document.querySelector('.vocab-panel');
        if (!vocabPanel) return;

        vocabPanel.classList.add('mobile-open');
        this.vocabPanelOpen = true;
    },

    /**
     * Close vocabulary panel
     */
    closeVocabPanel() {
        const vocabPanel = document.querySelector('.vocab-panel');
        if (!vocabPanel) return;

        vocabPanel.classList.remove('mobile-open');
        this.vocabPanelOpen = false;
    },

    /**
     * Make form sections collapsible on mobile
     */
    makeCollapsible() {
        const sections = document.querySelectorAll('.form-section');
        
        sections.forEach((section, index) => {
            if (this.isMobile && index > 0) { // Keep first section open
                section.classList.add('collapsible');
                
                const title = section.querySelector('.section-title');
                if (title && !title.hasAttribute('data-collapsible')) {
                    title.setAttribute('data-collapsible', 'true');
                    title.addEventListener('click', () => {
                        section.classList.toggle('collapsed');
                    });
                }
            }
        });
    },

    /**
     * Enable mobile mode
     */
    enableMobileMode() {
        document.body.classList.add('mobile-mode');
        
        // Make Generate button sticky after scroll
        this.handleStickyButton();
    },

    /**
     * Disable mobile mode
     */
    disableMobileMode() {
        document.body.classList.remove('mobile-mode');
        
        // Remove collapsible classes
        const sections = document.querySelectorAll('.form-section');
        sections.forEach(section => {
            section.classList.remove('collapsible', 'collapsed');
        });
    },

    /**
     * Handle sticky Generate button on mobile
     */
    handleStickyButton() {
        if (!this.isMobile || this._stickyBound) return;

        const actionButtons = document.querySelector('.action-buttons');
        const formScroll = document.querySelector('.form-scroll');

        if (!actionButtons || !formScroll) return;

        this._stickyBound = true;
        formScroll.addEventListener('scroll', () => {
            if (formScroll.scrollTop > 100) {
                actionButtons.classList.add('mobile-sticky');
            } else {
                actionButtons.classList.remove('mobile-sticky');
            }
        });
    }
};
