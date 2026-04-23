# Changelog

All notable changes to AusomeWords will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning: [SemVer](https://semver.org/spec/v2.0.0.html).

Categories: **Added**, **Changed**, **Deprecated**, **Removed**, **Fixed**, **Security**.

## [Unreleased]

### Added
- Vocabulary updated to match the child's known words: burger, chicken and rice,
  cupcakes, food, water, bubu, run, jump, slides, tickle time, hide and seek.
- "Say" starter for social words (yes, no, please, borrow) — speaks immediately
  on tap, no sentence-builder overhead.
- Colors category: red car, blue ball, yellow sun, green tree, orange ball, purple flower.
- Gentle correction mode (parent toggle, off by default): shows a soft
  "Try saying: …" banner after each sentence with article and "please" suggestions.
- Level indicator (★ L1 / ★★ L2 / ★★★ L3) badge in header.
- Settings bottom sheet (⚙): parent controls level and correction toggle.

### Changed
- Starters reduced to "I want" and "I need" (plus new "Say"); removed "I feel" / "I see".
- Restart button condensed to icon-only (↻) to make room for level badge + settings.

### Fixed
- CSS `var()` calls used en-dashes instead of `--`; all colours now resolve.
- `index.html` renamed from `Index.html` so GitHub Pages serves the file correctly.

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
