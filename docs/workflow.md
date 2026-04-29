# Workflow: AusomeWords

How work actually happens on this project. If a future doc contradicts
this file, this file wins.

## Operating Constraints

- **Editor:** any — Claude Code, GitHub web editor, or a local IDE all work. The repo is a single HTML file plus a tiny Netlify Function, so any editor that can save text is enough.
- **Build:** none. Saves go straight to disk; deploy is just `git push`.
- **Free tier only.** No paid services (databases, APIs, hosting).

## Branching

- **Default: push directly to `main`.** Auto-deploy is the feedback loop.
- **Branch only for destructive or high-risk changes.** Examples:
  - schema rewrites
  - mass renames or moves
  - large deletions
  - anything where a `git revert` wouldn't be a clean rollback
- Branch name format: `claude/<short-description>-<random>`.
- Delete the branch after merge.

## Deploy

- Auto-triggered on push to `main`.
- Target: Netlify (see `.ai/context.md` → Entry Points and ADR-0002).
- Treat the deploy preview as the production-equivalent environment.
- Rollback path: `git revert` the bad commit; auto-deploy re-runs.

## Verification

Verification options, in order of fidelity:

1. **Deploy preview** — push, check the live URL on Netlify. Production-equivalent; primary verification surface.
2. **Local static server** — fine for cards / sentence / speech / storage paths. The Gemini Function only runs on the deploy preview, so the L2/L3 banner content can't be verified locally — stub the fetch or accept the local-rule fallback.
3. **CI** — whatever the repo wires up (lint, type-check, tests).

If a change is impossible to verify any of those ways, say so explicitly instead of claiming it works.

## Multi-Chat Workflow

The user maintains separate Claude chats per concern. Concerns vary by
project but commonly include things like:

- App Dev — code changes, features, bugs
- Prompt Refinement — prompt engineering, `.ai/prompts.md` updates
- Docs — README, workflow, architecture
- Ops — deploy config, CI, env vars

When a chat starts, the user names the concern. **Stay in that lane.**
If a task drifts into another concern, surface the drift and ask whether
to switch chats.

## Editing Etiquette (for Claude)

- **Be frugal with comments on GitHub.** Only comment when genuinely
  necessary.
- **Don't open PRs unsolicited.** Push to `main` per the branching rule;
  open a PR only when explicitly asked or when the branch policy required
  a branch.
- **Trim aggressively.** This setup is token-sensitive — short, accurate
  prose beats long, hedged prose.
