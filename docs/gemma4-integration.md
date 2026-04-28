# Gemma 4 Integration Analysis

**Date:** 2026-04-27  
**Status:** Proposed

---

## What Is Gemma 4

Google DeepMind's open-weights model family (April 2025). Relevant variants:

| Variant | Effective params | Quantized size | Best for |
|---------|-----------------|----------------|----------|
| E2B     | ~2.3B           | ~1.4 GB (4-bit) | On-device / browser |
| E4B     | ~4.5B           | ~2.8 GB         | Strong reasoning |

Both support 128 K context, multimodal input (text + images + audio), and run
via Transformers.js v3 in browsers that have WebGPU.

---

## Advantages for AusomeWords

### 1. Richer sentence suggestions (high value)

The current `getSuggestion()` is ~30 lines of hand-coded article-insertion rules.
It handles a fixed vocabulary and breaks on any word it hasn't anticipated.
Gemma 4 E2B could replace it with a single short prompt:

```
Given the words a child tapped: "I want chicken and rice"
Rewrite as the most natural, polite English sentence. Be brief.
```

Output: *"I want some chicken and rice, please."*

This generalises to any vocabulary expansion — no rule maintenance.

### 2. Next-card prediction (high value)

After "I want", Gemma 4 could rank which category or item cards are most
likely next, surfacing them first in the grid. Children with motor challenges
benefit from reduced tapping distance.

### 3. Vocabulary expansion assistant (carer-facing, medium value)

A carer-mode screen could let a parent type a new word or activity, and Gemma 4
suggests an appropriate emoji, word label, and category placement. Removes the
current hard-coded `ITEMS` object as a ceiling.

### 4. Symbol-to-sentence bridging (medium value)

Gemma 4's multimodal capability means it can interpret emoji sequences as
communicative intent — useful for logging or exporting a session transcript in
readable prose for therapists.

### 5. Personalization without a backend (future value)

With `localStorage` for session history and a small on-device model, the app
could weight frequently used cards higher — purely client-side, no data leaving
the device. Aligns with the app's zero-backend principle and AAC privacy norms.

---

## Integration Approaches

### Option A — On-device via Transformers.js (preferred long-term)

Load Transformers.js from a CDN; the model downloads once to the browser cache.

```html
<script type="module">
  import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3/dist/transformers.min.js';
  const generator = await pipeline('text-generation', 'google/gemma-4-e2b-it-GGUF');
</script>
```

**Pros:** no backend, no API key, no data leaves device, fits zero-dependency
spirit philosophically.  
**Cons:** ~1.4 GB first-time model download; WASM fallback on iOS is 1–3 tokens/sec
(too slow for interactive use); adds a CDN dependency.

### Option B — Cloud API with a carer-supplied key

Settings panel adds an "AI features" toggle where a carer pastes their own
Google AI Studio API key (stored in `localStorage`, never shipped in code).
Gemma 4 via API responds in <500 ms.

**Pros:** works on Safari/iOS today; no model download.  
**Cons:** requires carer to obtain and manage a key; breaks the "no secrets"
principle if the key is ever hardcoded; adds a network dependency.

### Option C — Chrome Built-in AI (Gemini Nano, near-term)

Chrome 131+ ships a `window.ai` / `LanguageModel` API backed by Gemini Nano
on-device. Not Gemma 4, but same on-device privacy story and zero download.
Degrades gracefully on Safari (feature-detect and skip).

**Pros:** works right now in Chrome; no download, no key, no backend.  
**Cons:** Chrome-only (excludes the app's primary Safari/iPad target).

---

## Critical Constraints

| Constraint | Impact on Gemma 4 |
|---|---|
| **Target: Safari on iOS** | WebGPU not available on iOS Safari; WASM inference is too slow for interactive use |
| **Single HTML file** | A Transformers.js import is viable; bundling weights is not |
| **No backend** | Cloud API requires exposing an API key client-side |
| **Alpha / 0 users** | Wrong time to add a 1.4 GB dependency; establish vocabulary first |
| **AAC latency requirement** | Children expect <200 ms card response; LLM inference is 500 ms–several seconds |

---

## Recommendation

**Do not integrate Gemma 4 in v0.x.**  
The iOS WebGPU blocker makes on-device inference impractical today, and the
single-file / no-backend constraints rule out the easy cloud-API path without
exposing credentials.

**Defer and revisit when:**

1. WebGPU ships in a stable iOS Safari release (tracked at webkit.org/status).
2. The vocabulary outgrows the hardcoded `ITEMS` object — that's the natural
   trigger for smarter suggestions.
3. The app has real users and a carer-settings flow exists (prerequisite for
   Option B safely).

**Immediate low-cost win:** File an ADR to reserve the `window.ai` Chrome
Built-in AI path for the correction engine — it's a feature-detected
progressive enhancement, costs nothing, and proves the pattern before
committing to Gemma 4.
