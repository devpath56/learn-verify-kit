---
topic: agent-harness-l2-runtime
at: 2026-08-24
hit: 1
of: 4
miss_codes: [boundary, mechanism]
mode: online
assigned_by: claude
declared: false
---

# 2026-08-24 — L2 runtime: framework is not the harness

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).
Split out of the `agent-harness-five-layers` session record on 2026-08-27; Q1 of the same session
is `2026-08-24-agent-harness-l1-inference.md`. Self-graded in-session (handoff §8).

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
