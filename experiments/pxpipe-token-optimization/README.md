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

## Headline finding (offline, `claude-fable-5`)
Static-prefix blocks above pxpipe's ~2 000-char floor image at a stable
**~87 % block-token reduction**; below the floor the estimator declines and
leaves the block as text. Byte-exact content (IDs/hashes) images just as well
but is **lossy to read back** — quantify that with `fidelity.mjs` before trusting
any saving on it. Full numbers and the important "block savings ≠ whole-request
savings" caveat are in `EXPERIMENT.md`.

## Safety notes
- This harness **never reroutes** the live session; it does not set
  `ANTHROPIC_BASE_URL` to the proxy. It reads pxpipe's gate estimate directly and,
  optionally, the real `/v1/messages/count_tokens` endpoint.
- pxpipe images for Fable 5 by default and is **off by default for Opus 4.7/4.8**
  (higher image-misread rate) — keep that in mind when interpreting results for a
  given model.
