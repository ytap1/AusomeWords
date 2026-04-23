# Architecture: AusomeWords

How the pieces fit together. Keep in sync with the code — stale
architecture docs are worse than none.

## Directory Structure

```
AusomeWords/
├── CLAUDE.md                 # Claude Code reads this first
├── index.html                # entire app — HTML + CSS + JS, single file
├── .ai/                      # AI-first context
│   ├── context.md
│   ├── conventions.md
│   ├── decisions.md
│   ├── prompts.md
│   └── metrics.md
├── docs/
│   ├── workflow.md           # how work happens (no terminal)
│   └── architecture.md       # this file
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

None. The app makes no outbound network calls. Browser APIs used:

| API | Purpose |
|-----|---------|
| `speechSynthesis` | Text-to-speech output |
| `AudioContext` | Celebration chime tones |

Both degrade silently if unavailable — `playTone` has a `try/catch`, and the
SPEAK button is disabled until a word is added.

Rules:

- **Every outbound call has a timeout.** No exceptions. (N/A — no outbound calls.)
- **Degrade gracefully** when a non-critical dep is down. (Both audio APIs wrapped.)

## Verification

The user has no terminal. Verification happens in two places:

- **CI** — whatever checks the project wires up (lint, type-check, tests).
- **Deploy preview** — the auto-deployed GitHub Pages site after push to `main`.

Tests that need a localhost don't fit this model. Prefer:

- Unit tests that run in CI.
- Smoke checks against the deployed URL.
- Manual spot-checks the user can do in Safari.
