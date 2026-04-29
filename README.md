# AusomeWords

> An AAC (Augmentative and Alternative Communication) app for autistic children to build and speak sentences using emoji picture cards.

## Status

- **Phase:** alpha
- **Version:** 0.1.0 (see [CHANGELOG.md](./CHANGELOG.md))
- **Last updated:** 2026-04-23
- **Deployed?** No.

## How Work Happens Here

- Single HTML file — any editor works (Claude Code, GitHub web editor, or a local IDE).
- No build step, no package manager required to ship.
- Push directly to `main` by default. Branch only for destructive or high-risk changes.
- Deploy is auto-triggered on push to `main` (Netlify; see ADR-0002).
- Primary verification on the deploy preview; local static-serve covers non-Function paths.

See [docs/workflow.md](./docs/workflow.md) for the full working model.

## What Works

- Sentence builder: I want / I need / Say → categories → items → speak.
- Vocabulary in [`data/vocabulary.json`](./data/vocabulary.json) (carer-editable), with embedded fallback. Currently includes burger, chicken and rice, cupcakes, water, bubu, run, jump, slides, tickle time, hide and seek, plus colors and needs.
- Speech is grammatically assembled at speak time via POS-tagged items (e.g. "I want a burger, please.", "I want to run, please.", "I want an orange ball, please.", "I'm finished.").
- Social words ("Say" starter) speak immediately on tap; `borrow` speaks as "Can I borrow that?".
- Colors category with colored-object cards; vowel-sound colors get "an" automatically.
- AI-backed correction (Gemini 2.0 Flash via Netlify Function) with local POS-rule fallback on any failure. Carer toggle for the visible "Try saying: …" banner.
- Three levels in settings: L1 silent, L2 baseline grammar, L3 Gemini-enriched. Settings persist across reloads.
- Web Audio API celebration chime on sentence completion.
- ARIA labels on cards (VoiceOver reads the word, not the emoji glyph).
- Mobile-friendly layout (safe-area insets, 44 pt touch targets) — works in any modern browser.
- AI-first docs in [`.ai/`](./.ai/).

## What's Next

- [ ] Verify Netlify deploy on device (open the live URL in Safari, build a sentence end-to-end).
- [ ] Level 3 navigation: color + noun phrase flow (starter → color → noun).

## Documentation

- [CLAUDE.md](./CLAUDE.md) — read first; how Claude should work in this repo
- [.ai/context.md](./.ai/context.md) — what this is, current state, constraints
- [.ai/conventions.md](./.ai/conventions.md) — coding rules
- [.ai/decisions.md](./.ai/decisions.md) — ADRs
- [.ai/prompts.md](./.ai/prompts.md) — prompt templates
- [.ai/metrics.md](./.ai/metrics.md) — AI-assist log
- [docs/workflow.md](./docs/workflow.md) — working model + deploy
- [docs/architecture.md](./docs/architecture.md) — structure + data flow
- [CHANGELOG.md](./CHANGELOG.md) — release history
