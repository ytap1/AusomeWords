# Context: AusomeWords

> Single source of truth Claude reads at the start of every session.
> Keep under ~150 lines. Link out instead of inlining.

Last updated: 2026-04-23

## What This Is

AusomeWords is an AAC (Augmentative and Alternative Communication) app for autistic children to build and speak sentences using emoji picture cards.

- **Problem:** Non-verbal or minimally-verbal autistic children need a fast, tactile way to express needs and feelings without requiring text literacy.
- **User:** Autistic children (and their carers) on an iPad or iPhone.
- **Success:** A child taps starter → category → item → optional "please" and the app speaks the full sentence aloud.

## Current State

- **Phase:** alpha
- **Version:** 0.1.0
- **Deployed?** No
- **Users?** None
- **Known broken:** none

## Stack

- **Language:** HTML + vanilla JS + CSS (single file, no build step)
- **Speech:** Web Speech API (`speechSynthesis`)
- **Audio:** Web Audio API (`AudioContext`) for celebration chimes
- **Storage:** none (stateless between sessions)
- **Deploy:** Netlify (auto on push to `main`; see ADR-0002)
- **Functions:** Netlify Functions (`netlify/functions/suggest.js`) — Gemini proxy
- **AI:** Gemini 2.0 Flash via `GEMINI_API_KEY` env var (see ADR-0003)
- **Target runtime:** Safari on iPad/iPhone

## Working Model

Hard rules about how work happens here. Do not violate without asking.

- **No local execution.** The user works from iPad/iPhone via Safari + Claude Code. There is no terminal, no `make`, no `npm`, no `curl localhost`.
- **No CLI instructions in docs.** If a step needs a command, it has to run in CI or in Claude Code's own sandbox — never on the user's machine.
- **Push directly to `main`** by default. Branch only for destructive or high-risk changes (schema rewrites, mass renames, deletions).
- **Deploy is automatic** on push to `main` (GitHub Pages). Verification happens on the deployed preview, not localhost.
- **Multi-chat workflow.** The user maintains separate Claude chats per concern (e.g. App Dev, Prompt Refinement). Stay in the lane named in the current chat unless told otherwise.

## Key Constraints

- Single HTML file (`index.html`) — no build step, no bundler, no package manager.
- No new top-level dependencies without an ADR.
- App is fully client-side; no secrets, no backend.
- All verification happens on the GitHub Pages deploy preview — not localhost.

## Entry Points

- **Main file:** `index.html`
- **Config:** none (no build config; deploy via GitHub Pages repo settings)
- **Tests:** none yet
- **Deploy config:** GitHub Pages auto-deploy (push to `main`)

## See Also

- `.ai/conventions.md` — coding rules
- `.ai/decisions.md` — ADRs
- `docs/workflow.md` — full working model
- `docs/architecture.md` — structure + data flow
