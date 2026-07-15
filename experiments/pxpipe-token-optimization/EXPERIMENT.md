# Experiment: does pxpipe's image-context compression actually save tokens — and at what cost to fidelity?

**Tool under test:** [`pxpipe-proxy`](https://github.com/teamchong/pxpipe) v0.9.0 — a local
proxy/library that renders the token-dense, cache-stable parts of a Claude Code
request (system prompt, tool docs, old history) as PNG image blocks, because an
image's token cost is fixed by its pixel dimensions, not by how much text it
contains.

**Status:** offline benchmark implemented and run; live fidelity probe scaffolded (opt-in).

---

## 1. Hypotheses

- **H1 (savings).** For a static prefix above pxpipe's size floor, rendering it
  as an image costs materially fewer input tokens than the equivalent text.
- **H2 (discipline).** Below the floor / for sparse content, pxpipe's estimator
  declines to image, so it never *loses* on small or low-density blocks.
- **H3 (fidelity cost).** On byte-exact content (hashes, IDs, exact numbers) the
  imaged version is read *less* accurately than text, and the gap is
  model-dependent (small on Fable 5, larger on Opus 4.8) — so savings on such
  blocks are not safely usable.

## 2. Variables

| | |
|---|---|
| **Independent** | static-slab **size** (below vs above the ~2 000-char floor) and **density** (natural prose ≈4 chars/token vs dense JSON) |
| **Dependent (savings)** | `text_tokens` avoided vs `image_tokens` paid for the block → savings % |
| **Dependent (fidelity)** | exact-match accuracy recovering known facts from text vs image, per model |
| **Controlled** | same model (`claude-fable-5`), same renderer settings, live user turn always left as text, identical probe set across conditions |

## 3. Method

**Savings (offline, deterministic — `harness.mjs`).** For each scenario in
`corpus.mjs` we build a real Anthropic Messages body and call
`transformAnthropicMessages()`. pxpipe's own gate evaluator returns, per block,
the text-token cost it avoided and the image-token cost it paid; savings =
`1 − image/text`. No model calls, and **this session is never rerouted** — the
proxy's `ANTHROPIC_BASE_URL` swap is deliberately *not* used (see §6).

*Optional live cross-check* (`--verify-api`, needs `ANTHROPIC_API_KEY`): send the
baseline body and the transformed body to `/v1/messages/count_tokens` and compare
real `input_tokens`, to confirm the offline gate estimate against ground truth.

**Fidelity (live, opt-in — `fidelity.mjs`).** Render a byte-exact slab two ways
(plain text vs pxpipe PNG), ask the *same* exact-value questions against each,
score exact-match accuracy, and report the gap. Re-run per model
(`node fidelity.mjs claude-opus-4-8`) to test H3's model dependence.

## 4. How to run

```bash
cd experiments/pxpipe-token-optimization
npm install                 # pulls pxpipe-proxy 0.9.0 locally (NOT into the skill bundle)
npm run bench               # offline savings table (H1, H2)
npm run bench:verify        # + live count_tokens cross-check (needs ANTHROPIC_API_KEY)
ANTHROPIC_API_KEY=... node fidelity.mjs               # H3 on Fable 5
ANTHROPIC_API_KEY=... node fidelity.mjs claude-opus-4-8   # H3 on Opus 4.8
```

## 5. Results so far (offline gate measurement, `claude-fable-5`)

| scenario | applied | text tok | image tok | block savings |
|---|:---:|---:|---:|---:|
| `tiny_slab` (below floor) | **no** | — | — | — *(stays text)* |
| `prose_slab_8k` (low density) | yes | 7 169 | 902 | **87.4 %** |
| `json_slab_12k` (high density) | yes | 10 789 | 1 325 | **87.7 %** |
| `system_plus_tooldocs` (realistic) | yes | 4 772 | 626 | **86.9 %** |
| `secrets_ids_slab` (byte-exact) | yes | 4 146 | 552 | **86.7 %** |
| **aggregate over imaged blocks** | | 26 875 | 3 405 | **87.3 %** |

**Reading the results.**
- **H1 supported.** Every above-floor slab imaged at ~**86.7–87.7 %** block-token
  reduction — a stable ~7–8× density gain, consistent with pxpipe's published
  "~3.1 chars/image-token vs ~1 char/text-token" claim.
- **H2 supported.** `tiny_slab` was declined (`below_min_chars`) and left as text.
  Density was only a *second-order* effect (prose 87.4 % vs JSON 87.7 %); the
  dominant gate is simply clearing the ~2 000-char floor.
- **H3 not yet run** — requires the live probe (§3). The `secrets_ids_slab` block
  images at 86.7 %, but whether that saving is *usable* depends entirely on the
  fidelity gap, which is the whole point of the probe.

## 6. Threats to validity / honest caveats

- **Block savings ≠ whole-request savings.** The table measures the *imaged
  block*. Real end-to-end savings (pxpipe's headline ~59–70 %) depend on what
  fraction of the request is the static slab. Use `--verify-api` for the true
  whole-request number on a given payload.
- **Model dependence is decisive.** pxpipe images for `claude-fable-5` by
  default and is **off by default for Opus 4.7/4.8** — which is the model *this
  session runs on* — because those models misread ~7 % of rendered images. A
  live test against this session would be the worst-case fit and is intentionally
  avoided.
- **Byte-exact content is lossy.** IDs, hashes, secrets, exact numbers must stay
  text; the fidelity probe exists to quantify exactly this before trusting any
  saving on such a block.
- **Not rerouted.** We never set `ANTHROPIC_BASE_URL` to the proxy in this
  managed environment — that would route this agent's own traffic and
  credentials through third-party code behind the environment's own proxy/CA.
  The offline gate + optional `count_tokens` path get the same numbers safely.
- **Synthetic corpus.** Slabs are representative, not captured production
  traffic. To harden the result, replay real (sanitized) request bodies through
  the same harness — the code path is identical.

## 7. Next steps

1. Run `fidelity.mjs` on Fable 5 **and** Opus 4.8 to fill in H3 and produce the
   savings-vs-accuracy trade-off that decides where pxpipe should be enabled.
2. Run `--verify-api` on a real sanitized payload for the true whole-request
   savings figure.
3. Replace synthetic slabs with a small set of captured, sanitized Claude Code
   request bodies for external validity.
