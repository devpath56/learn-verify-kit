---
topic: agent-harness-l1-inference
at: 2026-08-24
hit: 2
of: 4
miss_codes: [mechanism, price]
mode: online
assigned_by: claude
declared: false
---

# 2026-08-24 — L1 inference: quality drift is not a model problem

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).
Split out of the `agent-harness-five-layers` session record on 2026-08-27: one file per graded
attempt is what `attempts/README.md` specifies and what `progress-store.mjs` can read. Q2 of the
same session is `2026-08-24-agent-harness-l2-runtime.md`. Graded in-session by the same agent
that set the questions (see the handoff, §8), so it is self-graded and cannot count as observed.

## Q1 — verbatim
> `invoice-bot` was 94% correct last month, 71% this month. Same code, same model, same prompts. Every run completes without error. Lead says: "Opus 4.8 just shipped, let's swap the model in — that should fix it." What is wrong with that reasoning, and which layer of the harness would have caught this before your lead noticed?

**Frozen ideal (4 elements)**
1. Names it as quality drift — degradation with no code change.
2. A model swap targets a variable that isn't the cause; production agents fail for non-model reasons (stale data, broken tool, changed input format).
3. Mechanism: per-run success hides it; detection needs an aggregate health metric trended over time, which is the Control Plane's job.
4. Price: a model change forces harness re-tuning and re-evaluation (GitHub Copilot CLI / Claude Opus 4.8).

**Attempt (verbatim, uncorrected)**
> Swapping the model won't fix drift — observability layer should've flagged it

**Checklist:** 1 hit · 2 hit · 3 miss · 4 miss → 2/4, partial
**Miss codes:** mechanism, price
**Reread:** the anchor sketch (control plane position) and the trade-offs on model swaps.
