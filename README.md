# AusomeWords

> An AAC (Augmentative and Alternative Communication) app for autistic children to build and speak sentences using emoji picture cards.

## Status

- **Phase:** alpha
- **Version:** 0.1.0 (see [CHANGELOG.md](./CHANGELOG.md))
- **Last updated:** 2026-04-23
- **Deployed?** No.

## How Work Happens Here

- Edits via Claude Code (GitHub integration) or the GitHub web editor on Safari.
- No local dev, no terminal, no package managers — never assume them.
- Push directly to `main` by default. Branch only for destructive or high-risk changes.
- Deploy is auto-triggered on push to `main` (GitHub Pages).
- Verification happens on the deployed preview, not on a localhost.

See [docs/workflow.md](./docs/workflow.md) for the full working model.

## What Works

- Sentence builder: I want / I need / Say → categories → items → speak.
- Vocabulary matched to the child's known words (burger, chicken and rice, cupcakes, run, jump, slides, tickle time, hide and seek, bubu, yes/no/please/borrow).
- Social words ("Say" starter) speak immediately on tap.
- Colors category with colored-object cards (red car, blue ball, yellow sun, etc.).
- Gentle correction mode — parent toggle (off by default) showing "Try saying: …" with article + "please" suggestions.
- Level indicator (★ L1 / L2 / L3) and settings bottom sheet, parent-controlled.
- Web Speech API sentence builder with word-by-word audio preview.
- Web Audio API celebration chime on sentence completion.
- iOS/Safari optimised layout (safe-area insets, 44 pt touch targets).
- AI-first docs in [`.ai/`](./.ai/).

## What's Next

- [ ] Wire up GitHub Pages deploy and verify on device.
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
