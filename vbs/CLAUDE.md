# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Setup

This is a **vanilla HTML/CSS/JS project with no build tools** — no package.json, no bundler, no test framework, no linter. Files are served as-is.

**To run locally:** Open `index.html` with VS Code Live Server (configured on port 5501 in `.vscode/settings.json`), or any static file server.

There are no build, test, or lint commands.

## Architecture

### Module System

All modules are **global singleton objects** using the object literal pattern. There is no module bundler or import/export system — every module is a `<script>` tag in `index.html` and exposes a global `const`.

```javascript
// Every module follows this pattern
const ModuleName = {
    state: value,
    init() { ... },
    method() { ... }
};
```

Modules communicate via **direct method calls** on other globals (e.g., `ConversationGenerator.generate()`). Optional module dependencies are guarded with `typeof Module !== 'undefined'` checks.

### Script Loading Order (Critical)

Scripts in `index.html` must maintain this dependency order — moving a script before its dependency will break the app:

1. **Data files** — `vocabulary.js`, `conversation-flow.js`, `dialogues.js`
2. **Utilities** — `utils.js`, `theme.js`
3. **Core modules** — `llm-service.js`, `conversation.js`, `output-renderer.js`, `vocab-panel.js`, `tooltip.js`, `speech.js`, `export.js`, `form-handler.js`
4. **Feature modules** — `history-manager.js`, `history-panel.js`, `topic-selector.js`, `mobile-ui.js`, `onboarding.js`, `keyboard-nav.js`
5. **Entry point** — `app.js` (initializes everything in `App.init()` on `DOMContentLoaded`)

### Legacy File

`js/script.js` is a **legacy monolithic version** (1016 lines) containing all functionality in one IIFE. It is NOT loaded by `index.html` — the modular system under `js/modules/` + `js/app.js` replaced it. It exists only as a reference.

### Three-Tier Conversation Fallback

Generation cascades through three strategies:
1. **LLM API** (Groq or MLVoca) — if API is configured and reachable
2. **Pre-written dialogues** (`js/data/dialogues.js`) — if API fails
3. **Template-based generation** (`js/data/conversation-flow.js` + `js/data/vocabulary.js`) — final offline fallback

### Data Flow for Generation

```
App.handleGenerate()
  → FormHandler.validate() + getValues()
  → ConversationGenerator.generate(topic, difficulty, wordLimit, tone)
    → LLMService.generateConversation() OR fallback generators
    → extractVocabulary() populates vocabularyDetails
  → OutputRenderer.render(lines)
  → VocabPanel.render()
  → HistoryManager.save() + HistoryPanel.updateBadge()
```

### LocalStorage Keys

| Key | Purpose |
|-----|---------|
| `vocabbot-theme` | Theme preference ('light'/'dark') |
| `vocabbot-llm-config` | API config (provider, apiKey, model) |
| `vocabbot-history` | Conversation history array (max 50, auto-cleans >30 days) |
| `vocabbot-onboarding` | First-time user flag |

### UI Layout

Three-panel responsive layout (collapses on mobile at 768px):
- **Left panel** (340px): Controls — difficulty, topic selector, word limit, display options
- **Center panel** (flex): Conversation output with speech controls
- **Right panel** (320px): Vocabulary reference with filter tabs

## Development Guidelines

### Adding a New Topic

1. Add the topic key to the appropriate category in `TopicSelector.categories` in `js/modules/topic-selector.js`
2. Add a display name to `TopicNames` in `js/data/vocabulary.js`
3. Optionally add vocabulary entries to `VocabularyDatabase` — the LLM will generate vocabulary without them

### Adding a New Module

1. Create a file in `js/modules/` following the object literal pattern
2. Add a `<script>` tag in `index.html` **before** `app.js` but after any modules it depends on
3. If it needs initialization, call it from `App.init()` in `js/app.js`

### Theme Customization

Modify CSS variables under `[data-theme="light"]` and `[data-theme="dark"]` selectors in `css/style.css`.

### LLM Token Calculation

Dynamic max_tokens formula in `llm-service.js`:
```
maxTokens = Math.min(8000, Math.max(2000, Math.ceil(wordLimit * 1.5) + 500))
```
