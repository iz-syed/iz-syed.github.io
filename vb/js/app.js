/**
 * Vocabulary Bot - Main Application
 * Initializes all modules and handles main event binding
 */

const App = {
    /**
     * Initialize the application
     */
    init() {
        // Initialize modules
        ThemeManager.init();
        TooltipManager.init();
        SpeechController.init();
        VocabPanel.initTabs();

        // Initialize LLM Service if available
        if (typeof LLMService !== 'undefined') {
            LLMService.init();
            this.initAPISettings();
        }

        // Bind form events
        this.bindFormEvents();

        // Bind action button events
        this.bindActionEvents();

        // Bind display option events
        this.bindDisplayOptionEvents();
    },

    /**
     * Initialize API settings modal and controls
     */
    initAPISettings() {
        const settingsBtn = document.getElementById('apiSettingsBtn');
        const modal = document.getElementById('apiSettingsModal');
        const closeBtn = document.getElementById('closeApiSettings');
        const saveBtn = document.getElementById('saveApiSettings');
        const providerSelect = document.getElementById('llmProvider');
        const apiKeyInput = document.getElementById('llmApiKey');
        const apiKeyGroup = document.getElementById('apiKeyGroup');

        if (!settingsBtn || !modal) return;

        // Show current config
        this.updateAPISettingsUI();

        // Open modal
        settingsBtn.addEventListener('click', () => {
            modal.classList.add('active');
            this.updateAPISettingsUI();
        });

        // Close modal
        closeBtn?.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close modal (cancel button)
        document.getElementById('closeApiSettings2')?.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Provider change
        providerSelect?.addEventListener('change', () => {
            const provider = providerSelect.value;
            const requiresKey = LLMService.providers[provider]?.requiresKey;
            apiKeyGroup.style.display = requiresKey ? 'block' : 'none';
        });

        // Save settings
        saveBtn?.addEventListener('click', () => {
            const provider = providerSelect.value;
            const apiKey = apiKeyInput.value.trim();

            LLMService.configure(provider, apiKey);
            modal.classList.remove('active');

            // Update status indicator
            this.updateAPIStatus();

            Utils.showToast('API settings saved!');
        });

        // Initial status update
        this.updateAPIStatus();
    },

    /**
     * Update API settings UI with current values
     */
    updateAPISettingsUI() {
        const providerSelect = document.getElementById('llmProvider');
        const apiKeyInput = document.getElementById('llmApiKey');
        const apiKeyGroup = document.getElementById('apiKeyGroup');

        if (providerSelect) {
            providerSelect.value = LLMService.config.provider;
        }

        if (apiKeyInput) {
            apiKeyInput.value = LLMService.config.apiKey || '';
        }

        if (apiKeyGroup) {
            const requiresKey = LLMService.requiresApiKey();
            apiKeyGroup.style.display = requiresKey ? 'block' : 'none';
        }
    },

    /**
     * Update API status indicator
     */
    updateAPIStatus() {
        const statusEl = document.getElementById('apiStatus');
        if (!statusEl) return;

        if (LLMService.isReady()) {
            const providerName = LLMService.providers[LLMService.config.provider]?.name || 'Unknown';
            statusEl.innerHTML = `<span class="status-dot connected"></span> ${providerName} Connected`;
            statusEl.className = 'api-status connected';
        } else {
            statusEl.innerHTML = `<span class="status-dot"></span> Not Configured`;
            statusEl.className = 'api-status';
        }
    },

    /**
     * Bind form submission and reset events
     */
    bindFormEvents() {
        document.getElementById('generatorForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleGenerate();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.handleReset();
        });
    },

    /**
     * Bind action button events
     */
    bindActionEvents() {
        // Copy button
        document.getElementById('copyBtn').addEventListener('click', () => {
            ExportManager.copyConversation();
        });

        // Export conversation button
        document.getElementById('exportVocabBtn').addEventListener('click', () => {
            ExportManager.exportConversation();
        });
    },

    /**
     * Bind display option change events
     */
    bindDisplayOptionEvents() {
        // Highlight and definition toggles - live update
        ['highlightWords', 'showDefinitions'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                if (ConversationGenerator.currentConversation.length > 0) {
                    const values = FormHandler.getValues();
                    OutputRenderer.render(
                        ConversationGenerator.currentConversation,
                        values.highlightWords,
                        values.showDefinitions
                    );
                }
            });
        });

        // Vocabulary panel toggle
        document.getElementById('showVocabPanel').addEventListener('change', (e) => {
            const vocabPanel = document.getElementById('vocabPanel');
            vocabPanel.style.display = e.target.checked ? 'flex' : 'none';
        });
    },

    /**
     * Handle conversation generation
     */
    async handleGenerate() {
        if (!FormHandler.validate()) return;

        const values = FormHandler.getValues();
        const generateBtn = document.getElementById('generateBtn');

        // Show loading state
        generateBtn.disabled = true;
        generateBtn.innerHTML = `
            <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            Generating...
        `;

        try {
            // Generate conversation (async for LLM API)
            const lines = await ConversationGenerator.generate(
                values.topic,
                values.difficulty,
                values.wordLimit,
                values.tone
            );

            if (lines.length === 0) {
                Utils.showToast('Failed to generate conversation. Please try again.', 'error');
                return;
            }

            // Show output
            OutputRenderer.showOutput();

            // Render conversation
            OutputRenderer.render(lines, values.highlightWords, values.showDefinitions);

            // Update meta and stats
            OutputRenderer.updateMeta(values.topic, values.difficulty, values.tone);
            OutputRenderer.updateStats(lines);

            // Render vocabulary panel
            VocabPanel.render('all');

            // Show success message if using AI
            if (LLMService.isReady()) {
                Utils.showToast('AI-generated conversation ready!');
            }

        } catch (error) {
            console.error('Generation error:', error);
            Utils.showToast('Error generating conversation: ' + error.message, 'error');
        } finally {
            // Reset button state
            generateBtn.disabled = false;
            generateBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Generate
            `;
        }
    },

    /**
     * Handle reset
     */
    handleReset() {
        // Reset form
        FormHandler.reset();

        // Hide output
        OutputRenderer.hideOutput();

        // Stop speech
        SpeechController.cancel();

        // Reset vocab panel
        VocabPanel.reset();

        // Reset conversation generator state
        ConversationGenerator.resetTracking();
        ConversationGenerator.currentConversation = [];
    }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
