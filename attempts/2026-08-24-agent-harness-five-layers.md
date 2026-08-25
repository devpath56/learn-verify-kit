# 2026-08-24 — Agent harness: five layers + deterministic steps stay in code

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).

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

## Q2 — verbatim
> `dispute-bot` built on CrewAI. Lead: "CrewAI is the harness, so a runtime move means we rebuild everything — two quarters." Also: the agent sends the model `$412.50` and tier `gold` (cap `$500`) and asks whether it is under the cap. (a) What is wrong with the framing? (b) What is wrong with that step, and what rule does it break?

**Frozen ideal (4 elements)**
1. CrewAI is an agent framework (authoring layer), not the harness.
2. Framework neutrality — a runtime move should not require a harness rewrite; the two-quarter budget prices a rewrite that shouldn't be needed.
3. `$412.50 <= $500` is fully determined by its inputs.
4. Breaks the runtime rule: deterministic steps stay in code, no inference call; fails silently, like S3.

**Attempt (verbatim, uncorrected)**
> 1. runtime is loop, tool call and conversation state change in the harness.
> 2. dont know

**Checklist:** 1 miss (recited the runtime definition, did not draw the framework/harness boundary) · 2 miss · 3 miss · 4 miss → 1/4, fail
**Miss codes:** boundary, mechanism
**Reread:** the boundary column, framework vs harness row.
