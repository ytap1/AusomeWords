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

- Full app structure in `Index.html`: starters → categories → items → speak.
- Web Speech API sentence builder with word-by-word preview.
- Web Audio API celebration chime on sentence completion.
- iOS/Safari optimised layout (safe-area insets, touch targets).
- AI-first docs in [`.ai/`](./.ai/).

## What's Next

- [ ] Fix CSS variable en-dash bug in `Index.html` (colours not resolving).
- [ ] Wire up GitHub Pages deploy.
- [ ] First end-to-end verification on a real device.

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
