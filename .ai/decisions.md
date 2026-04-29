# Decisions: AusomeWords

Append-only log of architectural and technical decisions. Each entry
answers: what did we pick, what did we reject, and why?

- **Never rewrite history.** Reversed decisions get a new entry that
  supersedes the old one. Cross-link them.
- **Keep entries short.** Link out if it needs more than a page.
- **Number sequentially** (ADR-0001, ADR-0002, ...).

## Template

```markdown
## ADR-NNNN: <short title>

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by ADR-XXXX | Deprecated

### Context
<problem and forces, 2–5 sentences>

### Decision
<the choice, 1–2 sentences>

### Alternatives Considered
- **Option A:** why rejected.
- **Option B:** why rejected.

### Consequences
- **Positive:** <what gets easier>
- **Negative:** <what gets harder>
- **Follow-ups:** <what this unlocks or requires next>
```

---

## ADR-0001: Push directly to `main`; branch only for destructive changes

- **Date:** 2026-04-23
- **Status:** Accepted

### Context

Solo developer working from iPad/Safari + Claude Code. PR review overhead
adds friction with no second reviewer. Most changes are small and
incremental. Auto-deploy on push to `main` is the desired feedback loop.

### Decision

Push directly to `main` for routine changes. Create a branch only when
the change is destructive or high-risk: schema rewrites, mass renames,
deletions, anything that could break the deployed site without an easy
rollback.

### Alternatives Considered

- **PR-per-change:** standard team practice, but no second reviewer here
  and it slows the iPad/web workflow.
- **Trunk-based with feature flags:** future option once the project has
  enough surface area to need it.

### Consequences

- **Positive:** fastest possible iteration; one source of truth; deploy
  preview = production preview.
- **Negative:** no review gate before deploy. Mitigation: Claude Code
  runs CI checks; `git revert` is the rollback path.
- **Follow-ups:** if a class of bug starts shipping to `main`, add a CI
  check that would have caught it.

---

## ADR-0002: Move deploy target from GitHub Pages to Netlify

- **Date:** 2026-04-27
- **Status:** Accepted

### Context

GitHub Pages serves static files only. Adding a server-side Gemini API
proxy requires a compute layer. Netlify Functions provide this with zero
infrastructure overhead and the same "push to deploy" workflow.

### Decision

Switch deploy target to Netlify. Keep the single-file `index.html`
architecture unchanged. Add `netlify.toml` (publish dir = `.`) and a
`netlify/functions/` directory for serverless functions.

### Alternatives Considered

- **GitHub Pages + client-side key:** API key exposed in public HTML. Rejected.
- **Cloudflare Workers:** viable, but Netlify Functions share the same Node.js
  runtime as the rest of the project and have a simpler free tier.
- **Streamlit:** Python rewrite with server-round-trip-per-tap latency.
  Rejected — UX regression for a tap-heavy AAC app.

### Consequences

- **Positive:** API key stays server-side; same push-to-deploy workflow;
  no build step added; free tier (125k function invocations/month) is ample.
- **Negative:** new deploy dependency; requires one-time Netlify dashboard
  setup (connect repo, add `GEMINI_API_KEY` env var).
- **Follow-ups:** update `context.md`; disable GitHub Pages in repo settings.

---

## ADR-0003: Add Gemini 2.0 Flash for sentence suggestions

- **Date:** 2026-04-27
- **Status:** Accepted

### Context

The rule-based `getSuggestion()` function handles only the hardcoded
vocabulary and breaks on any word it hasn't anticipated. A cloud LLM
generalises to any vocabulary expansion without rule maintenance.

### Decision

Proxy calls to Gemini 2.0 Flash via `netlify/functions/suggest.js`.
The existing rule-based function is renamed `localSuggestion()` and
used as a fallback if the network call fails or times out (5 s).

### Alternatives Considered

- **Gemma 4 on-device:** blocked by absent WebGPU on iOS Safari. Rejected.
- **Client-side Gemini API key:** key exposed in public HTML. Rejected.
- **GPT-4o / Claude:** higher latency and cost for a task Gemini Flash
  handles well. Rejected.

### Consequences

- **Positive:** natural, context-aware suggestions; graceful degradation
  to local rules on failure; API key never in source code.
- **Negative:** suggestion banner appears ~300 ms after cards render
  (acceptable — doesn't block interaction); requires `GEMINI_API_KEY`
  env var set in Netlify dashboard.
- **Follow-ups:** monitor free tier usage once real users arrive.

---

## ADR-0004: Working model — device constraint relaxed

- **Date:** 2026-04-29
- **Status:** Accepted

### Context

The original working model (carried in CLAUDE.md, .ai/context.md,
docs/workflow.md, README.md, and .ai/conventions.md) framed iPad/Safari
+ no-terminal as a hard constraint. That hardware constraint no longer
holds. The architectural choices that came out of it — single HTML file,
no build step, push-to-main, free-tier-only — remain valid as design
choices and should not be enforced via a hardware claim that doesn't
apply.

### Decision

Remove the iPad/Safari/no-terminal/no-localhost framing from the docs.
Keep the design choices that survive on their own merits (single HTML
file, no build step, push-to-main, free-tier-only). Local development
becomes an explicit, supported workflow alongside the deploy preview.

Scope: this repo only. The user's global CLAUDE.md is unchanged.

### Alternatives Considered

- **Keep the constraint as documented.** Misleading; future contributors
  would assume restrictions that don't apply.
- **Rewrite as a "minimalism preference" rather than a hardware constraint.**
  Adopted in part — the surviving rules (single file, no build) are now
  framed as design choices, not hardware-driven absolutes.

### Consequences

- **Positive:** local-development paths (static server, IDE,
  package-manager tooling) are available for verification when the
  deploy preview is too slow or rate-limited (e.g. Netlify build
  minutes). Docs accurately reflect what works.
- **Negative:** loses some of the original "AI-first, no-terminal"
  framing that shaped early Claude Code prompts. Mitigated: multi-chat
  + push-to-main + deploy-preview-first norms remain.
- **Follow-ups:** if a workflow change requires local tooling (e.g.
  tests in a Node runner), record it as its own ADR.
