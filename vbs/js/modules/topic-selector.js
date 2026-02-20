/**
 * Topic Selector Module
 * Searchable dropdown with categorized topics
 */

const TopicSelector = {
    isOpen: false,
    selectedValue: '',
    filteredTopics: [],

    // Topic categories with icons
    categories: {
        workplace: {
            name: 'Workplace & Career',
            icon: '💼',
            topics: [
                'office', 'meeting', 'interview', 'presentation', 'negotiation',
                'promotion', 'resignation', 'onboarding', 'performance_review',
                'teamwork', 'leadership', 'remote_work', 'workplace_conflict',
                'salary_discussion', 'job_hunting', 'career_change', 'workplace_culture',
                'email_etiquette', 'deadline_pressure', 'overtime', 'coworker_issues',
                'boss_relationship', 'workplace_harassment', 'diversity_inclusion',
                'employee_benefits', 'company_policy', 'layoffs_downsizing',
                'professional_development', 'mentorship', 'internship', 'freelancing',
                'workplace_safety', 'employee_motivation', 'delegation', 'micromanagement',
                'feedback_criticism', 'workplace_gossip', 'office_romance', 'dress_code',
                'conference_calls', 'business_travel', 'expense_reports', 'time_management'
            ]
        },
        business: {
            name: 'Business & Professional',
            icon: '📊',
            topics: [
                'finance', 'marketing', 'sales', 'project_management', 'entrepreneurship',
                'startup', 'investment', 'networking', 'client_relations', 'business_ethics',
                'contracts', 'budgeting', 'quarterly_reports', 'market_analysis',
                'competitor_analysis', 'product_launch', 'brand_management', 'customer_feedback',
                'supply_chain', 'business_strategy', 'mergers_acquisitions', 'corporate_culture'
            ]
        },
        social: {
            name: 'Social & Relationships',
            icon: '👥',
            topics: [
                'gossip', 'office_politics', 'small_talk', 'compliments', 'apologies',
                'conflicts', 'friendships', 'dating', 'family_relations', 'neighbors'
            ]
        },
        daily: {
            name: 'Daily Life',
            icon: '🏠',
            topics: [
                'home', 'shopping', 'restaurant', 'travel', 'health',
                'weather', 'hobbies', 'pets', 'cooking', 'errands'
            ]
        },
        education: {
            name: 'Education & Learning',
            icon: '📚',
            topics: [
                'education', 'university', 'exams', 'studying', 'academic_discussion',
                'language_learning', 'online_courses', 'graduation', 'tutoring'
            ]
        },
        technology: {
            name: 'Technology & Media',
            icon: '💻',
            topics: [
                'technology', 'socialMedia', 'entertainment', 'gaming', 'cybersecurity',
                'artificial_intelligence', 'gadgets', 'tech_support', 'streaming'
            ]
        },
        lifestyle: {
            name: 'Lifestyle & Wellness',
            icon: '🌟',
            topics: [
                'sports', 'fitness', 'mental_health', 'work_life_balance', 'self_improvement',
                'meditation', 'nutrition', 'sleep', 'stress_management'
            ]
        },
        current: {
            name: 'Current Events & Opinions',
            icon: '🗞️',
            topics: [
                'politics', 'economy', 'environment', 'social_issues', 'news_discussion',
                'debates', 'cultural_events', 'global_affairs'
            ]
        }
    },

    /**
     * Initialize the topic selector
     */
    init() {
        this.createDropdownHTML();
        this.bindEvents();
        this.buildTopicsList();
    },

    /**
     * Create the dropdown HTML structure
     */
    createDropdownHTML() {
        const container = document.getElementById('topicSelectorContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="topic-selector" id="topicSelector">
                <div class="topic-selector-trigger" id="topicTrigger" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-controls="topicList" tabindex="0">
                    <span class="topic-selector-placeholder" id="topicPlaceholder">Select a topic...</span>
                    <span class="topic-selector-value" id="topicValue" style="display: none;"></span>
                    <svg class="topic-selector-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="topic-selector-dropdown" id="topicDropdown">
                    <div class="topic-search-wrapper">
                        <svg class="topic-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" class="topic-search-input" id="topicSearch" placeholder="Search topics..." autocomplete="off" aria-label="Search topics">
                    </div>
                    <div class="topic-list" id="topicList" role="listbox" aria-label="Available topics"></div>
                </div>
                <input type="hidden" id="topic" name="topic" value="">
            </div>
        `;
    },

    /**
     * Build the full topics list
     */
    buildTopicsList() {
        const listEl = document.getElementById('topicList');
        if (!listEl) return;

        let html = '';

        for (const [catKey, category] of Object.entries(this.categories)) {
            html += `<div class="topic-category" data-category="${catKey}">`;
            html += `<div class="topic-category-header">${category.icon} ${category.name}</div>`;
            html += `<div class="topic-category-items">`;

            for (const topicKey of category.topics) {
                const topicName = TopicNames[topicKey] || this.formatTopicName(topicKey);
                html += `
                    <div class="topic-item" data-value="${topicKey}" data-name="${topicName.toLowerCase()}" role="option">
                        <span class="topic-item-name">${topicName}</span>
                    </div>
                `;
            }

            html += `</div></div>`;
        }

        listEl.innerHTML = html;
    },

    /**
     * Format topic key to display name
     */
    formatTopicName(key) {
        return key
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        const trigger = document.getElementById('topicTrigger');
        const dropdown = document.getElementById('topicDropdown');
        const searchInput = document.getElementById('topicSearch');
        const listEl = document.getElementById('topicList');

        // Toggle dropdown
        trigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Search input
        searchInput?.addEventListener('input', (e) => {
            this.filterTopics(e.target.value);
        });

        // Prevent dropdown close when clicking inside
        dropdown?.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Select topic
        listEl?.addEventListener('click', (e) => {
            const item = e.target.closest('.topic-item');
            if (item) {
                this.selectTopic(item.dataset.value);
            }
        });

        // Close on outside click
        document.addEventListener('click', () => {
            if (this.isOpen) this.close();
        });

        // Keyboard navigation
        searchInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'Enter') {
                const firstVisible = document.querySelector('.topic-item:not([style*="display: none"])');
                if (firstVisible) {
                    this.selectTopic(firstVisible.dataset.value);
                }
            }
        });
    },

    /**
     * Toggle dropdown
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    /**
     * Open dropdown
     */
    open() {
        const selector = document.getElementById('topicSelector');
        const searchInput = document.getElementById('topicSearch');
        const trigger = document.getElementById('topicTrigger');

        selector?.classList.add('open');
        trigger?.setAttribute('aria-expanded', 'true');
        this.isOpen = true;

        // Focus search input
        setTimeout(() => searchInput?.focus(), 50);

        // Reset filter
        this.filterTopics('');
        if (searchInput) searchInput.value = '';
    },

    /**
     * Close dropdown
     */
    close() {
        const selector = document.getElementById('topicSelector');
        const trigger = document.getElementById('topicTrigger');
        selector?.classList.remove('open');
        trigger?.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    },

    /**
     * Filter topics by search query
     */
    filterTopics(query) {
        const listEl = document.getElementById('topicList');
        if (!listEl) return;

        const normalizedQuery = query.toLowerCase().trim();
        const items = listEl.querySelectorAll('.topic-item');
        const categories = listEl.querySelectorAll('.topic-category');

        // Show all if no query
        if (!normalizedQuery) {
            items.forEach(item => item.style.display = '');
            categories.forEach(cat => {
                cat.style.display = '';
                cat.querySelector('.topic-category-items').style.display = '';
            });
            return;
        }

        // Filter items
        const categoryVisibility = {};

        items.forEach(item => {
            const name = item.dataset.name;
            const value = item.dataset.value;
            const matches = name.includes(normalizedQuery) || value.includes(normalizedQuery);

            item.style.display = matches ? '' : 'none';

            // Track category visibility
            const category = item.closest('.topic-category');
            if (category) {
                const catKey = category.dataset.category;
                if (matches) {
                    categoryVisibility[catKey] = true;
                }
            }
        });

        // Show/hide categories based on matching items
        categories.forEach(cat => {
            const catKey = cat.dataset.category;
            const hasVisibleItems = categoryVisibility[catKey];
            cat.style.display = hasVisibleItems ? '' : 'none';
        });
    },

    /**
     * Select a topic
     */
    selectTopic(value) {
        const hiddenInput = document.getElementById('topic');
        const placeholder = document.getElementById('topicPlaceholder');
        const valueDisplay = document.getElementById('topicValue');
        const topicName = TopicNames[value] || this.formatTopicName(value);

        this.selectedValue = value;

        // Update hidden input
        if (hiddenInput) hiddenInput.value = value;

        // Update display
        if (placeholder) placeholder.style.display = 'none';
        if (valueDisplay) {
            valueDisplay.textContent = topicName;
            valueDisplay.style.display = '';
        }

        // Mark selected in list
        document.querySelectorAll('.topic-item').forEach(item => {
            const isSelected = item.dataset.value === value;
            item.classList.toggle('selected', isSelected);
            item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });

        // Close dropdown
        this.close();

        // Clear any error
        const errorEl = document.getElementById('topicError');
        if (errorEl) errorEl.textContent = '';
    },

    /**
     * Get selected value
     */
    getValue() {
        return this.selectedValue;
    },

    /**
     * Reset selection
     */
    reset() {
        const hiddenInput = document.getElementById('topic');
        const placeholder = document.getElementById('topicPlaceholder');
        const valueDisplay = document.getElementById('topicValue');

        this.selectedValue = '';

        if (hiddenInput) hiddenInput.value = '';
        if (placeholder) placeholder.style.display = '';
        if (valueDisplay) {
            valueDisplay.textContent = '';
            valueDisplay.style.display = 'none';
        }

        document.querySelectorAll('.topic-item').forEach(item => {
            item.classList.remove('selected');
        });
    },

    /**
     * Validate selection
     */
    validate() {
        const errorEl = document.getElementById('topicError');

        if (!this.selectedValue) {
            if (errorEl) errorEl.textContent = 'Please select a topic';
            return false;
        }

        if (errorEl) errorEl.textContent = '';
        return true;
    }
};
