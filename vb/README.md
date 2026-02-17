# Vocabulary Bot - Project Guide

## Project Overview

Vocabulary Bot is a professional single-page web application that generates random conversation-style text to help users improve their English vocabulary. The app creates natural dialogues between two speakers (A and B) with proper conversation flow, using vocabulary appropriate to the selected difficulty level and topic.

## Project Structure

```
vocabulary-bot/
├── index.html                    # Three-panel layout with controls, output, and vocabulary
├── css/
│   └── style.css                 # Professional styling with dark/light themes
├── js/
│   ├── data/
│   │   ├── vocabulary.js         # Vocabulary database (words, definitions, examples)
│   │   ├── conversation-flow.js  # Conversation patterns and tone modifiers
│   │   └── dialogues.js          # Pre-written dialogue templates
│   ├── modules/
│   │   ├── utils.js              # Utility functions (random, capitalize, toast)
│   │   ├── theme.js              # Theme management (dark/light toggle)
│   │   ├── llm-service.js        # LLM API integration (Groq, MLVoca)
│   │   ├── conversation.js       # Conversation generator
│   │   ├── output-renderer.js    # Output display and formatting
│   │   ├── vocab-panel.js        # Vocabulary panel rendering
│   │   ├── tooltip.js            # Hover tooltips for vocabulary words
│   │   ├── speech.js             # Speech synthesis controls
│   │   ├── export.js             # Export functionality (TXT, clipboard)
│   │   ├── form-handler.js       # Form validation
│   │   ├── history-manager.js    # LocalStorage history CRUD operations
│   │   ├── history-panel.js      # History panel UI
│   │   └── topic-selector.js     # Searchable topic dropdown
│   └── app.js                    # Main application initialization
└── CLAUDE.md                     # This documentation file
```

## Version 4.0 Features

### AI-Powered Generation
- **Groq API Integration**: Fast, high-quality AI conversation generation
- **MLVoca Fallback**: Free alternative API (no key required)
- **Template Fallback**: Works offline with pre-written dialogues
- **Dynamic Token Limits**: Automatically adjusts based on word limit

### Conversation History (Offline Support)
- **Auto-save**: Every generated conversation saved to localStorage
- **Offline Access**: Load past conversations without API calls (saves tokens)
- **50 Entry Limit**: Automatic cleanup of old entries (30+ days)
- **Full State Restore**: Vocabulary details, settings, and stats preserved

### Searchable Topic Selector
- **70+ Topics** organized in 8 categories
- **Search/Filter**: Type to find topics instantly
- **Keyboard Navigation**: Enter to select, Escape to close
- **Category Icons**: Visual organization with emoji headers

### Modular Architecture
- **Separation of Concerns**: Each module handles a specific functionality
- **Loose Coupling**: Modules communicate through well-defined interfaces
- **Easy Maintenance**: Changes to one module don't affect others
- **Better Testing**: Individual modules can be tested in isolation

### Natural Conversation Flow
- **Phase-based generation**: Conversations follow natural progression
- **Context-aware responses**: Each line builds on previous context
- **Tone modifiers**: Formal, informal, and neutral speech patterns
- **Idioms and collocations**: Naturally integrated into conversation

### Professional Three-Panel Layout
- **Left Panel**: Controls (difficulty, topic, settings, word limit, display options)
- **Center Panel**: Generated conversation display with speech controls
- **Right Panel**: Vocabulary reference with filtering tabs
- **Sticky Action Buttons**: Generate and Reset always visible

### Speech Controls (Play/Pause/Resume/Stop)
- Full playback control with progress indicator
- Speed adjustment (0.5x to 1.5x)
- Line-by-line progress tracking
- Browser Speech Synthesis API integration

### Dark/Light Mode
- System-aware theme detection
- Manual toggle with persistence
- Smooth transitions between themes
- Consistent color palette across modes

## Topic Categories

### Workplace & Career (43 topics)
office, meeting, interview, presentation, negotiation, promotion, resignation, onboarding, performance_review, teamwork, leadership, remote_work, workplace_conflict, salary_discussion, job_hunting, career_change, workplace_culture, email_etiquette, deadline_pressure, overtime, coworker_issues, boss_relationship, workplace_harassment, diversity_inclusion, employee_benefits, company_policy, layoffs_downsizing, professional_development, mentorship, internship, freelancing, workplace_safety, employee_motivation, delegation, micromanagement, feedback_criticism, workplace_gossip, office_romance, dress_code, conference_calls, business_travel, expense_reports, time_management

### Business & Professional (22 topics)
finance, marketing, sales, project_management, entrepreneurship, startup, investment, networking, client_relations, business_ethics, contracts, budgeting, quarterly_reports, market_analysis, competitor_analysis, product_launch, brand_management, customer_feedback, supply_chain, business_strategy, mergers_acquisitions, corporate_culture

### Social & Relationships (10 topics)
gossip, office_politics, small_talk, compliments, apologies, conflicts, friendships, dating, family_relations, neighbors

### Daily Life (10 topics)
home, shopping, restaurant, travel, health, weather, hobbies, pets, cooking, errands

### Education & Learning (9 topics)
education, university, exams, studying, academic_discussion, language_learning, online_courses, graduation, tutoring

### Technology & Media (9 topics)
technology, socialMedia, entertainment, gaming, cybersecurity, artificial_intelligence, gadgets, tech_support, streaming

### Lifestyle & Wellness (9 topics)
sports, fitness, mental_health, work_life_balance, self_improvement, meditation, nutrition, sleep, stress_management

### Current Events & Opinions (8 topics)
politics, economy, environment, social_issues, news_discussion, debates, cultural_events, global_affairs

## Module Reference

### Data Modules

#### `js/data/vocabulary.js`
Contains the vocabulary database and topic names:
```javascript
const VocabularyDatabase = {
    office: { easy: {...}, medium: {...}, hard: {...} },
    home: { easy: {...}, medium: {...}, hard: {...} }
};

const TopicNames = {
    office: "Office & Workplace",
    gossip: "Office Gossip & Rumors",
    // ... 70+ topics
};
```

#### `js/data/conversation-flow.js`
Defines conversation patterns:
```javascript
const ConversationFlow = {
    contexts: {
        greeting: { easy: [...], medium: [...], hard: [...] },
        // ...
    },
    toneModifiers: {
        formal: { prefix: [...], suffix: [...] },
        // ...
    }
};
```

### Core Modules

#### `js/modules/llm-service.js`
```javascript
const LLMService = {
    config: { provider, apiKey, model },
    providers: { groq, mlvoca },

    init()                              // Load config from localStorage
    configure(provider, apiKey)         // Set API configuration
    isReady()                           // Check if API is configured
    generateConversation(topic, diff, wordLimit, tone)  // Generate via API
    callGroq(prompt, maxTokens)         // Call Groq API
    callMlvoca(prompt)                  // Call MLVoca API
};
```

#### `js/modules/history-manager.js`
```javascript
const HistoryManager = {
    STORAGE_KEY: 'vocabbot-history',
    MAX_ENTRIES: 50,

    init()                  // Initialize and cleanup old entries
    getAll()                // Get all history entries
    getById(id)             // Get single entry
    save(entry)             // Save new conversation
    delete(id)              // Delete entry
    clearAll()              // Clear all history
    createEntry(...)        // Create entry from current state
};
```

#### `js/modules/history-panel.js`
```javascript
const HistoryPanel = {
    isOpen: false,

    init()              // Initialize panel and bind events
    toggle()            // Toggle panel visibility
    open() / close()    // Open/close panel
    render()            // Render history items
    loadEntry(id)       // Load entry into main view
    deleteEntry(id)     // Delete with animation
    updateBadge()       // Update count badge
};
```

#### `js/modules/topic-selector.js`
```javascript
const TopicSelector = {
    categories: {...},      // 8 categories with topics
    isOpen: false,
    selectedValue: '',

    init()                  // Create dropdown and bind events
    buildTopicsList()       // Build categorized list
    filterTopics(query)     // Search/filter topics
    selectTopic(value)      // Select a topic
    getValue()              // Get selected value
    reset()                 // Reset selection
    validate()              // Validate selection
};
```

#### `js/modules/conversation.js`
```javascript
const ConversationGenerator = {
    currentConversation: [],
    usedVocabulary: {...},
    vocabularyDetails: {},

    resetTracking()                              // Reset vocabulary tracking
    generate(topic, difficulty, wordLimit, tone) // Generate conversation
    generateFromDialogues(...)                   // Use pre-written dialogues
    generateFromTemplates(...)                   // Template-based fallback
    extractVocabulary(lines, topic, difficulty)  // Extract vocab from text
    getPlainText()                               // Get plain text version
};
```

#### `js/modules/output-renderer.js`
```javascript
const OutputRenderer = {
    render(lines, highlight, showDefs)  // Render conversation
    highlightVocabulary(text, showDefs) // Highlight vocab words
    updateMeta(topic, difficulty, tone) // Update metadata display
    updateStats(lines)                  // Update statistics
    showOutput()                        // Show output panel
    hideOutput()                        // Hide output panel
};
```

#### `js/modules/vocab-panel.js`
```javascript
const VocabPanel = {
    render(filter)  // Render vocabulary cards
    reset()         // Reset to empty state
    initTabs()      // Initialize filter tabs
};
```

#### `js/modules/speech.js`
```javascript
const SpeechController = {
    init()    // Initialize speech controls
    play()    // Start playback
    pause()   // Pause playback
    resume()  // Resume playback
    stop()    // Stop playback
    cancel()  // Cancel speech synthesis
};
```

#### `js/modules/export.js`
```javascript
const ExportManager = {
    exportConversation()  // Export to TXT file
    copyConversation()    // Copy to clipboard
    downloadFile(...)     // Download file helper
};
```

#### `js/modules/form-handler.js`
```javascript
const FormHandler = {
    validate()    // Validate form inputs (uses TopicSelector)
    getValues()   // Get all form values
    reset()       // Reset form and TopicSelector
};
```

### Main Application

#### `js/app.js`
```javascript
const App = {
    init()                    // Initialize all modules
    initAPISettings()         // Setup API modal
    updateAPIStatus()         // Update status indicator
    bindFormEvents()          // Bind form handlers
    bindActionEvents()        // Bind action buttons
    bindDisplayOptionEvents() // Bind display toggles
    handleGenerate()          // Handle form submit (saves to history)
    handleReset()             // Handle reset
};
```

## Development Guidelines

### Adding New Topics
1. Add topic key to appropriate category in `TopicSelector.categories` (`js/modules/topic-selector.js`)
2. Add display name to `TopicNames` in `js/data/vocabulary.js`
3. Optionally create vocabulary structure in `VocabularyDatabase` (LLM will generate without it)

### Modifying Conversation Flow
Edit `ConversationFlow.contexts` in `js/data/conversation-flow.js`:
```javascript
contexts: {
    greeting: {
        easy: ["Hi!", ...],
        medium: ["How's it going?", ...],
        hard: ["I trust you're well.", ...]
    },
    // ... other contexts
}
```

### Adding New Modules
1. Create file in `js/modules/` directory
2. Follow the object literal pattern:
   ```javascript
   const ModuleName = {
       property: value,
       method() { ... }
   };
   ```
3. Add script tag to `index.html` before `app.js`
4. Initialize in `App.init()` if needed

### Theme Customization
Modify CSS variables in `[data-theme="light"]` and `[data-theme="dark"]` selectors in `style.css`.

## LocalStorage Keys

| Key | Purpose |
|-----|---------|
| `vocabbot-theme` | Current theme ('light' or 'dark') |
| `vocabbot-llm-config` | LLM API configuration (provider, apiKey, model) |
| `vocabbot-history` | Conversation history array (max 50 entries) |

## Color Scheme

### Word Type Colors
| Type | Color | CSS Variable |
|------|-------|--------------|
| Noun | Blue (#3b82f6) | `--color-noun` |
| Verb | Red (#ef4444) | `--color-verb` |
| Adjective | Purple (#a855f7) | `--color-adjective` |
| Adverb | Orange (#f59e0b) | `--color-adverb` |
| Idiom | Teal (#14b8a6) | `--color-idiom` |
| Collocation | Orange (#f97316) | `--color-collocation` |

### Theme Colors
- Primary: Blue gradient (#3b82f6 → #1d4ed8)
- Speaker A: Blue tint
- Speaker B: Green tint
- Success: Green (#10b981)
- Error: Red (#ef4444)

## Browser Compatibility

- Modern browsers with ES6+ support
- Speech Synthesis API (Chrome, Edge, Firefox, Safari)
- Clipboard API for copy functionality
- CSS `:has()` selector for radio card styling
- LocalStorage for persistence

## Script Loading Order

Scripts must be loaded in this order (dependencies first):
1. Data files (`vocabulary.js`, `conversation-flow.js`, `dialogues.js`)
2. Utilities (`utils.js`, `theme.js`)
3. Core modules (`llm-service.js`, `conversation.js`, `output-renderer.js`, etc.)
4. Feature modules (`history-manager.js`, `history-panel.js`, `topic-selector.js`)
5. Main application (`app.js`)

## Performance Considerations

- Vocabulary database loaded once on page load
- Conversation lines rendered with staggered animations
- Speech synthesis uses line-by-line approach for better control
- Theme changes use CSS transitions for smooth experience
- History auto-cleanup prevents localStorage bloat
- Dynamic max_tokens calculation for efficient API usage
- Modular loading allows for future lazy-loading optimization
