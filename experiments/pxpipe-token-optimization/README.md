# pxpipe token-optimization experiment

A self-contained research harness that measures how much
[`pxpipe-proxy`](https://github.com/teamchong/pxpipe) (image-context
compression) reduces Claude Code input tokens — and what it costs in fidelity.

> **Not part of the shipped skill.** The Learn·Verify Kit is a pure, dependency-free
> skill bundle (see the repo `CLAUDE.md`). This directory is a research artifact
> only: it lives outside `.claude/skills/`, touches no skill file, and adds no
> dependency to the bundle. Installing the kit does not pull in `pxpipe-proxy`.
> `node_modules/` here is git-ignored.

## Contents
- `EXPERIMENT.md` — the full design: hypotheses, variables, method, results, caveats.
- `corpus.mjs` — representative request bodies across a size × density gradient.
- `harness.mjs` — offline, deterministic savings measurement (+ optional live cross-check).
- `fidelity.mjs` — opt-in live accuracy-loss probe (text vs imaged), per model.

## Quick start
```bash
npm install        # pxpipe-proxy 0.9.0, local to this dir only
npm run bench      # offline savings table
```

## Results (offline, `claude-fable-5`)

| static slab | imaged? | text tok | image tok | block savings |
|---|:--:|--:|--:|--:|
| below ~2k-char floor | **no** | — | — | *stays text* |
| low-density prose (~8k) | yes | 7 169 | 902 | **87.4 %** |
| high-density JSON (~12k) | yes | 10 789 | 1 325 | **87.7 %** |
| system + 15 tool docs | yes | 4 772 | 626 | **86.9 %** |
| hashes / IDs / exact-$ | yes | 4 146 | 552 | **86.7 %** |

### What the numbers mean
- **~87 % is a *block* reduction, not a bill.** The slab pxpipe images (system
  prompt + tool docs) shrinks ~7.7× — because an image's token cost is set by its
  pixel area, not its character count. ~4 900 text tokens of tool docs become
  ~630 image tokens.
- **Density barely moved it** (prose 87.4 % vs JSON 87.7 %). The renderer packs
  glyphs efficiently either way, so the dominant gate is simply *being above the
  ~2 000-char floor*, not how dense the text is.
- **The floor is a feature.** The sub-floor slab was declined and left as text.
  pxpipe's estimator refuses to image blocks where the pixel cost wouldn't pay
  off, so it has **no downside on small blocks** — worst case it does nothing.
- **The render is byte-deterministic** (same text → identical PNG, verified in the
  harness). That matters for the next point: the imaged prefix is itself
  cacheable, so pxpipe doesn't trade a cache hit for re-render churn.

### The implication that actually decides ROI: caching
A block-level 87 % does **not** become an 87 % bill. Two things dilute it:

1. **The dynamic tail stays text.** pxpipe never images the live turn (or unclosed
   history), so the un-imaged part of the request is unaffected. Whole-request
   savings = block savings × the slab's share of the request.
2. **Caching already discounts the slab pxpipe targets.** In Claude Code the
   system prompt + tool docs are the *stable, cached* prefix. On a cache-warm
   request that slab is billed at **0.1×** (cache read) — so pxpipe is optimizing
   a block that's already cheap.

The harness models both (rates: cache-read 0.1×, cache-create 1.25×). Whole-request
savings, slab held at the measured ~87 %:

| dynamic tail (full-price text) | cache-**cold** request | cache-**warm** request |
|---|:--:|:--:|
| 0.25× slab | ~70 % | ~25 % |
| 1× slab | ~44 % | ~8 % |
| 3× slab | ~22 % | ~3 % |

**Bottom line — pxpipe pays off most when the request is cache-cold and slab-heavy**
(fresh session, huge tool-doc overhead, short conversation) and pays off *least*
in the warm steady state (long-running session on a stable system prompt, where
the prefix is already a cheap cache read). pxpipe's published ~59–70 % lands in
the cold / slab-heavy corner of this table.

### The other decider: fidelity (not yet measured)
Byte-exact content (IDs, hashes, exact numbers) images at the same ~87 % but is
**lossy to read back**. pxpipe itself reports ~7 % image-misread on Opus 4.7/4.8
vs near-perfect on Fable 5. Savings on such a block are only real if the model
recovers the values — run `fidelity.mjs` (per model) to get that number before
trusting it. See `EXPERIMENT.md` §5–6 for the full analysis.

## Safety notes
- This harness **never reroutes** the live session; it does not set
  `ANTHROPIC_BASE_URL` to the proxy. It reads pxpipe's gate estimate directly and,
  optionally, the real `/v1/messages/count_tokens` endpoint.
- pxpipe images for Fable 5 by default and is **off by default for Opus 4.7/4.8**
  (higher image-misread rate) — keep that in mind when interpreting results for a
  given model.
