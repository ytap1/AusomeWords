# Changelog

All notable changes to AusomeWords will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning: [SemVer](https://semver.org/spec/v2.0.0.html).

Categories: **Added**, **Changed**, **Deprecated**, **Removed**, **Fixed**, **Security**.

## [Unreleased]

### Added
- Vocabulary in `data/vocabulary.json` (carer-editable), with embedded
  `DEFAULT_VOCAB` fallback baked into `index.html`. Schema versioned;
  currently v2.
- POS-tagged grammar layer (`assembleSpoken`): speech is assembled from
  `pos` + `spoken` metadata at speak time. Items now carry one of
  noun-count, noun-mass, noun-plural, noun-unique, noun-count-color,
  noun-event, noun-proper, place-the, verb-action, play-equipment,
  game, quantifier, state-im, social — plus an optional `spoken`
  literal override.
- Netlify Functions backend (`netlify/functions/suggest.js`) proxying
  Gemini 2.0 Flash for AI-backed "Try saying:" suggestions; 5 s timeout
  via `AbortController`; falls back to the local POS rule engine on any
  failure.
- Vocabulary updated to the child's known words: burger, chicken and rice,
  cupcakes, food, water, bubu, run, jump, slides, tickle time, hide and seek.
- "Say" starter for social words (yes, no, please, borrow) — speaks
  immediately on tap. `borrow` speaks as "Can I borrow that?".
- Colors category: red car, blue ball, yellow sun, green tree, orange ball,
  purple flower. Vowel-sound colors get "an" automatically.
- Gentle correction mode (parent toggle, off by default): shows a soft
  "Try saying: …" banner after each sentence.
- Three levels in settings: L1 silent, L2 baseline grammar, L3 Gemini
  prompt asks for one descriptive detail.
- Settings bottom sheet (⚙) with level + correction toggle, persisted
  across reloads via `localStorage` (`ausomeWords.settings.v1`).
- Cards announce via `aria-label` with the word; emoji span is
  `aria-hidden="true"` so VoiceOver reads "burger" instead of "hamburger
  emoji burger".
- ADR-0002 (Netlify deploy target), ADR-0003 (Gemini 2.0 Flash),
  ADR-0004 (working model — device constraint relaxed).
- `docs/gemma4-integration.md` — historical analysis, superseded by ADR-0003.

### Changed
- Speech is always grammatically assembled now, regardless of the
  correction-mode toggle. Examples: "I want a burger, please.",
  "I want to run, please.", "I want to play hide and seek, please.",
  "I want an orange ball, please.", "I'm finished.", "I need the
  bathroom, please."
- Starters reduced to "I want" and "I need" (plus new "Say"); removed
  "I feel" / "I see".
- Restart button condensed to icon-only (↻) to make room for level
  badge + settings.
- Working model relaxed (ADR-0004): iPad/Safari-only / no-terminal /
  no-localhost framing removed from CLAUDE.md, README.md,
  `.ai/context.md`, `.ai/conventions.md`, `docs/workflow.md`,
  `docs/architecture.md`. Single-file design, push-to-main, and
  free-tier-only choices preserved.
- Vocabulary schema bumped to v2 (items now require `pos`).

### Fixed
- a/an for vowel-sound color words: "I want a orange ball" → "I want
  an orange ball."
- Bare-verb activities get an infinitive: "I want run" → "I want to
  run."
- Games get the verb "play": "I want hide and seek" → "I want to play
  hide and seek."
- Play equipment gets the right scaffold: "I want slides" → "I want to
  go on the slides."
- Place names take "the": "I need bathroom" → "I need the bathroom."
- State words swap the starter: "I need finished, please" → "I'm finished."
- "Please" tap on the finish screen no longer cut off mid-word — per-word
  preview is skipped when a full-sentence speak follows.
- Suggestion banner sanitises Gemini output via `textContent` instead of
  template-literal interpolation into `innerHTML`.
- Architecture / deploy doc references updated from "GitHub Pages" to
  "Netlify".
- CSS `var()` calls used en-dashes instead of `--`; all colours now resolve.
- `index.html` renamed from `Index.html` so the static host serves the
  file correctly.

### Removed
- `NO_ARTICLE` / `THE_ARTICLE` / `COLOR_WORDS` rule sets and the
  article-insertion engine — superseded by the POS schema.

## [0.1.0] — 2026-04-23

Initial scaffold + first app file.

### Added
- `CLAUDE.md` — entry point for Claude Code.
- `.ai/context.md`, `.ai/conventions.md`, `.ai/decisions.md`,
  `.ai/prompts.md`, `.ai/metrics.md`.
- `README.md`, `docs/workflow.md`, `docs/architecture.md`.
- `.gitignore`, `CHANGELOG.md`.
- `index.html` — full AAC app: starters → categories → items → speak,
  Web Speech API sentence builder, Web Audio API celebration chimes,
  iOS/Safari optimised layout.

[Unreleased]: https://github.com/ytap1/AusomeWords/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ytap1/AusomeWords/releases/tag/v0.1.0
