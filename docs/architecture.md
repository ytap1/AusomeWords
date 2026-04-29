# Architecture: AusomeWords

How the pieces fit together. Keep in sync with the code — stale
architecture docs are worse than none.

## Directory Structure

```
AusomeWords/
├── CLAUDE.md                 # Claude Code reads this first
├── index.html                # entire app — HTML + CSS + JS, single file
├── netlify.toml              # Netlify build + functions config
├── netlify/
│   └── functions/
│       └── suggest.js        # Gemini 2.0 Flash proxy (see ADR-0003)
├── .ai/                      # AI-first context
│   ├── context.md
│   ├── conventions.md
│   ├── decisions.md
│   ├── prompts.md
│   └── metrics.md
├── docs/
│   ├── workflow.md           # how work happens (no terminal)
│   ├── architecture.md       # this file
│   └── gemma4-integration.md # historical analysis, superseded by ADR-0003
├── .gitignore
├── CHANGELOG.md
└── README.md
```

When a top-level directory is added, update this tree in the same commit.

## Data Flow

One interaction from tap to sound:

```
User taps card
  → JS click handler
    → addWord(word) → sentence[] mutated
      → renderSentence() → DOM update (sentence-bar)
      → speak(word) → speechSynthesis (single-word preview)

User taps "Speak now" or SPEAK button
  → speakSentence() → speechSynthesis (full sentence)
  → playHappyChime() → AudioContext (celebration tones)
  → clearSentence() + renderHome() → reset to start screen

Navigation (starters → categories → items → finish)
  → renderHome / renderCategories / renderItems / renderFinish
    → talkGrid + talkBreadcrumb DOM replaced in-place
    → no routing, no history — all state is in sentence[] + currentCategory

Suggestion (finish screen, only if correctionMode && currentLevel >= 2)
  → fetchSuggestion(sentence, currentLevel)
    → POST /.netlify/functions/suggest  (5 s timeout, AbortController)
      → Gemini 2.0 Flash via GEMINI_API_KEY (server-side)
    → on failure / timeout / non-OK: localSuggestion(sentence) rule fallback
    → render "Try saying: …" banner above the finish cards
```

## Key Design Principles

1. **Small core, thin edges.** Each layer should be boring.
2. **Explicit over implicit.** No magic; a reader should be able to trace behavior with grep.
3. **Make the right thing easy.** If a convention is constantly being violated, fix the tooling, not the people.
4. **Irreversible decisions get an ADR.** See `.ai/decisions.md`.
5. **Types at the boundaries.** Public functions, handlers, data models.
6. **Tests describe behavior, not implementation.**
7. **Delete aggressively.** Dead code is a tax on every reader.

## External Dependencies

Browser APIs used:

| API | Purpose |
|-----|---------|
| `speechSynthesis` | Text-to-speech output |
| `AudioContext` | Celebration chime tones |
| `localStorage` | Persist parent settings (level + correction toggle) |

Network calls:

| Call | When | Failure mode |
|------|------|--------------|
| `POST /.netlify/functions/suggest` → Gemini 2.0 Flash | Finish screen, only if correction mode is on and level ≥ 2 | 5 s timeout via `AbortController`; falls back to local rule engine (`localSuggestion`) on any non-OK response or timeout |

All three browser APIs degrade silently if unavailable — `playTone` has a
`try/catch`, the SPEAK button is disabled until a word is added, and the
settings load is wrapped in `try/catch` (private-mode browsing keeps defaults).

Rules:

- **Every outbound call has a timeout.** The Gemini proxy fetch uses a 5 s `AbortController`.
- **Degrade gracefully** when a non-critical dep is down. Local rule engine takes over for suggestions; audio APIs are wrapped.

## Verification

The user has no terminal. Verification happens in two places:

- **CI** — whatever checks the project wires up (lint, type-check, tests).
- **Deploy preview** — the auto-deployed Netlify site after push to `main`.

Tests that need a localhost don't fit this model. Prefer:

- Unit tests that run in CI.
- Smoke checks against the deployed URL.
- Manual spot-checks the user can do in Safari.
