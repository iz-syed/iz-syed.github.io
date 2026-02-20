/**
 * Onboarding Module
 * Handles first-time user experience and guidance
 */

const Onboarding = {
    STORAGE_KEY: 'vocabbot-onboarding',

    /**
     * Initialize onboarding
     */
    init() {
        // Check if user has seen onboarding
        if (!this.hasSeenOnboarding()) {
            this.showWelcomeModal();
        }

        // Bind help trigger
        this.bindHelpTrigger();
    },

    /**
     * Check if user has completed onboarding
     */
    hasSeenOnboarding() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data === 'completed';
        } catch (error) {
            return false;
        }
    },

    /**
     * Mark onboarding as completed
     */
    markCompleted() {
        try {
            localStorage.setItem(this.STORAGE_KEY, 'completed');
        } catch (error) {
            Logger.error('Failed to save onboarding status:', error);
        }
    },

    /**
     * Show welcome modal
     */
    showWelcomeModal() {
        const modal = this.createWelcomeModal();
        document.body.appendChild(modal);

        // Show modal after brief delay
        setTimeout(() => {
            modal.classList.add('active');
        }, 300);
    },

    /**
     * Create welcome modal HTML
     */
    createWelcomeModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay onboarding-modal';
        modal.id = 'welcomeModal';

        modal.innerHTML = `
            <div class="modal onboarding-content">
                <div class="modal-header">
                    <div class="onboarding-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7v10c0 5 10 8 10 8s10-3 10-8V7z"></path>
                            <path d="M9 12l2 2 4-4"></path>
                        </svg>
                    </div>
                    <h2>Welcome to Vocabulary Bot! 👋</h2>
                </div>
                <div class="modal-body">
                    <div class="onboarding-steps">
                        <div class="onboarding-step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h3>Choose Your Settings</h3>
                                <p>Select difficulty level, topic, and word limit to customize your learning experience.</p>
                            </div>
                        </div>
                        
                        <div class="onboarding-step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h3>Generate Conversations</h3>
                                <p>Click "Generate" to create realistic dialogues with highlighted vocabulary words.</p>
                            </div>
                        </div>
                        
                        <div class="onboarding-step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h3>Learn & Practice</h3>
                                <p>Hover over highlighted words for definitions, use speech controls to listen, and review vocabulary in the side panel.</p>
                            </div>
                        </div>
                        
                        <div class="onboarding-step">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h3>Optional: Connect AI (Powered by Groq)</h3>
                                <p>For more natural conversations, configure an AI API in settings. Otherwise, enjoy pre-written dialogues!</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="onboarding-tip">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <span><strong>Tip:</strong> Press <kbd>?</kbd> anytime to view keyboard shortcuts!</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="skipOnboarding">Skip Tour</button>
                    <button type="button" class="btn btn-secondary" id="viewShortcuts">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="M6 8h.01M10 8h.01M14 8h.01"></path>
                        </svg>
                        Shortcuts
                    </button>
                    <button type="button" class="btn btn-primary" id="startOnboarding">Get Started</button>
                </div>
            </div>
        `;

        // Bind close events
        modal.querySelector('#skipOnboarding').addEventListener('click', () => {
            this.closeWelcomeModal();
        });

        modal.querySelector('#startOnboarding').addEventListener('click', () => {
            this.closeWelcomeModal();
        });

        // Bind shortcuts button
        modal.querySelector('#viewShortcuts').addEventListener('click', () => {
            if (typeof KeyboardNav !== 'undefined') {
                KeyboardNav.showShortcutsModal();
            }
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeWelcomeModal();
            }
        });

        return modal;
    },

    /**
     * Close welcome modal
     */
    closeWelcomeModal() {
        const modal = document.getElementById('welcomeModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
        this.markCompleted();
    },

    /**
     * Bind help trigger button
     */
    bindHelpTrigger() {
        // Add help button to header if it doesn't exist
        const header = document.querySelector('.panel-header .header-actions') ||
            document.querySelector('.api-settings-bar .header-actions');

        if (header && !document.getElementById('helpBtn')) {
            const helpBtn = document.createElement('button');
            helpBtn.type = 'button';
            helpBtn.className = 'api-settings-btn';
            helpBtn.id = 'helpBtn';
            helpBtn.title = 'Help & Guide';
            helpBtn.setAttribute('aria-label', 'Show help and guide');
            helpBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
            `;

            helpBtn.addEventListener('click', () => {
                this.showWelcomeModal();
            });

            header.insertBefore(helpBtn, header.firstChild);
        }
    },

    /**
     * Reset onboarding (for testing)
     */
    reset() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            Logger.error('Failed to reset onboarding:', error);
        }
    }
};
