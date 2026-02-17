/**
 * Keyboard Navigation Module
 * Handles keyboard shortcuts, focus management, and accessibility
 */

const KeyboardNav = {
    // Track focus for modals
    focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    lastFocusedElement: null,

    /**
     * Initialize keyboard navigation
     */
    init() {
        this.addGlobalKeyboardShortcuts();
        this.improveFocusIndicators();
        this.addSkipToContent();
        this.setupModalFocusTraps();
    },

    /**
     * Add global keyboard shortcuts
     */
    addGlobalKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter: Generate conversation
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                const generateBtn = document.getElementById('generateBtn');
                if (generateBtn && !generateBtn.disabled) {
                    generateBtn.click();
                }
            }

            // Escape: Close modals/panels
            if (e.key === 'Escape') {
                this.handleEscape();
            }

            // Ctrl/Cmd + /: Show help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                const helpBtn = document.getElementById('helpBtn');
                if (helpBtn) {
                    helpBtn.click();
                }
            }

            // Ctrl/Cmd + K: Focus search/topic selector
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const topicSelector = document.querySelector('.custom-select-trigger');
                if (topicSelector) {
                    topicSelector.focus();
                    topicSelector.click();
                }
            }

            // Ctrl/Cmd + H: Toggle history
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                const historyBtn = document.getElementById('historyToggleBtn');
                if (historyBtn) {
                    historyBtn.click();
                }
            }

            // Ctrl/Cmd + Shift + V: Toggle vocabulary panel
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
                e.preventDefault();
                const vocabCheckbox = document.getElementById('showVocabPanel');
                if (vocabCheckbox) {
                    vocabCheckbox.checked = !vocabCheckbox.checked;
                    vocabCheckbox.dispatchEvent(new Event('change'));
                }
            }

            // ? key: Show keyboard shortcuts
            if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                // Only if not in an input/textarea
                if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                    e.preventDefault();
                    this.showShortcutsModal();
                }
            }
        });
    },

    /**
     * Handle Escape key press
     */
    handleEscape() {
        // Close API settings modal
        const apiModal = document.getElementById('apiSettingsModal');
        if (apiModal && apiModal.classList.contains('active')) {
            apiModal.classList.remove('active');
            return;
        }

        // Close onboarding modal
        const onboardingModal = document.getElementById('welcomeModal');
        if (onboardingModal && onboardingModal.classList.contains('active')) {
            onboardingModal.classList.remove('active');
            setTimeout(() => onboardingModal.remove(), 300);
            return;
        }

        // Close history panel
        const historyPanel = document.getElementById('historyPanel');
        if (historyPanel && historyPanel.classList.contains('open')) {
            const closeBtn = document.getElementById('historyCloseBtn');
            if (closeBtn) closeBtn.click();
            return;
        }

        // Close mobile vocabulary panel
        if (typeof MobileUI !== 'undefined' && MobileUI.vocabPanelOpen) {
            MobileUI.closeVocabPanel();
        }
    },

    /**
     * Improve focus indicators with visible outlines
     */
    improveFocusIndicators() {
        // Add CSS for better focus indicators
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Focus Indicators */
            *:focus {
                outline: 2px solid var(--primary-500);
                outline-offset: 2px;
            }

            *:focus:not(:focus-visible) {
                outline: none;
            }

            *:focus-visible {
                outline: 2px solid var(--primary-500);
                outline-offset: 2px;
            }

            button:focus-visible,
            a:focus-visible,
            input:focus-visible,
            select:focus-visible,
            textarea:focus-visible {
                outline: 2px solid var(--primary-500);
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
            }

            .btn:focus-visible {
                box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2),
                            var(--shadow-md);
            }

            .radio-card:focus-within {
                outline: 2px solid var(--primary-500);
                outline-offset: 2px;
            }

            .checkbox-item:focus-within {
                outline: 2px solid var(--primary-500);
                outline-offset: 2px;
                border-radius: var(--radius-sm);
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * Add skip to main content link
     */
    addSkipToContent() {
        // Create skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#outputContent';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.setAttribute('tabindex', '0');

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .skip-to-content {
                position: absolute;
                top: -100px;
                left: 0;
                background-color: var(--primary-600);
                color: white;
                padding: var(--space-3) var(--space-4);
                text-decoration: none;
                font-weight: 500;
                z-index: 9999;
                border-radius: 0 0 var(--radius-md) 0;
                box-shadow: var(--shadow-lg);
                transition: top var(--transition-fast);
            }

            .skip-to-content:focus {
                top: 0;
                outline: 2px solid var(--primary-300);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);

        // Insert at beginning of body
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Handle click
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('outputContent') ||
                document.querySelector('.output-panel');
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    },

    /**
     * Setup focus traps for modals
     */
    setupModalFocusTraps() {
        // Observe for modal additions
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList &&
                        (node.classList.contains('modal-overlay') ||
                            node.id === 'welcomeModal' ||
                            node.id === 'apiSettingsModal')) {
                        setTimeout(() => this.trapFocus(node), 100);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true
        });

        // Handle existing modals
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            this.trapFocus(modal);
        });
    },

    /**
     * Trap focus within modal
     */
    trapFocus(modal) {
        const focusable = modal.querySelectorAll(this.focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];

        // Store last focused element
        this.lastFocusedElement = document.activeElement;

        // Focus first element
        if (firstFocusable) {
            firstFocusable.focus();
        }

        // Handle tab key
        const handleTab = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        };

        modal.addEventListener('keydown', handleTab);

        // Restore focus when modal closes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.removedNodes.forEach((node) => {
                    if (node === modal && this.lastFocusedElement) {
                        this.lastFocusedElement.focus();
                        this.lastFocusedElement = null;
                        observer.disconnect();
                    }
                });
            });
        });

        observer.observe(modal.parentNode, {
            childList: true
        });
    },

    /**
     * Show keyboard shortcuts modal
     */
    showShortcutsModal() {
        // Remove existing modal if present
        const existing = document.getElementById('shortcutsModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay shortcuts-modal';
        modal.id = 'shortcutsModal';

        const isMac = navigator.userAgentData?.platform === 'macOS' || /Mac/.test(navigator.userAgent);
        const modKey = isMac ? '⌘' : 'Ctrl';

        modal.innerHTML = `
            <div class="modal shortcuts-content">
                <div class="modal-header">
                    <h2>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h.01M10 16h.01M14 16h.01M18 16h.01"></path>
                        </svg>
                        Keyboard Shortcuts
                    </h2>
                    <button type="button" class="modal-close" aria-label="Close shortcuts modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="shortcuts-grid">
                        <div class="shortcut-category">
                            <h3>Generation</h3>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Generate conversation</span>
                                <div class="shortcut-keys">
                                    <kbd>${modKey}</kbd> + <kbd>Enter</kbd>
                                </div>
                            </div>
                        </div>

                        <div class="shortcut-category">
                            <h3>Navigation</h3>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Close modals/panels</span>
                                <div class="shortcut-keys">
                                    <kbd>Esc</kbd>
                                </div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Show help</span>
                                <div class="shortcut-keys">
                                    <kbd>${modKey}</kbd> + <kbd>/</kbd>
                                </div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Focus topic selector</span>
                                <div class="shortcut-keys">
                                    <kbd>${modKey}</kbd> + <kbd>K</kbd>
                                </div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Toggle history panel</span>
                                <div class="shortcut-keys">
                                    <kbd>${modKey}</kbd> + <kbd>H</kbd>
                                </div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Toggle vocabulary panel</span>
                                <div class="shortcut-keys">
                                    <kbd>${modKey}</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd>
                                </div>
                            </div>
                        </div>

                        <div class="shortcut-category">
                            <h3>Accessibility</h3>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Navigate forward</span>
                                <div class="shortcut-keys">
                                    <kbd>Tab</kbd>
                                </div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Navigate backward</span>
                                <div class="shortcut-keys">
                                    <kbd>Shift</kbd> + <kbd>Tab</kbd>
                                </div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-action">Skip to main content</span>
                                <div class="shortcut-keys">
                                    <kbd>Tab</kbd> <span style="color: var(--text-tertiary); font-size: 0.875rem;">(on page load)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="shortcuts-tip">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                        <span>Press <kbd>?</kbd> anytime to view this shortcuts reference</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="closeShortcutsModal">Got it!</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Bind close events AFTER modal is in DOM
        setTimeout(() => {
            const closeBtn = modal.querySelector('.modal-close');
            const gotItBtn = modal.querySelector('#closeShortcutsModal');

            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            };

            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }

            if (gotItBtn) {
                gotItBtn.addEventListener('click', closeModal);
            }

            // Close on backdrop click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            // Close on Escape
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);

            // Trap focus
            this.trapFocus(modal);

            // Show modal
            modal.classList.add('active');
        }, 50);
    }
};
