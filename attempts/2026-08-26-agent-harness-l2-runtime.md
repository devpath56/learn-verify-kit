---
topic: agent-harness-l2-runtime
at: 2026-08-26
hit: 1
of: 8
miss_codes: [mechanism, price, price, boundary]
mode: online
assigned_by: claude
declared: false
---

# 2026-08-26 — L2 runtime: who stops the loop, and how the cap is sized (re-teach)

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).
Context: second pass. First pass 2026-08-24 scored 1/4 and 2/4, weakest `mechanism`.
Split out of the `inference-and-runtime` session record on 2026-08-27, one file per graded
attempt. The L1 half is `2026-08-26-agent-harness-l1-inference.md`. Rolled up here: Q1 0/6,
Q2 1/2 → 1/8. Self-graded in-session (handoff §8), so it cannot count as observed.

## L2 Q1 — verbatim
> Meridian's `dispatch-bot` on LangGraph. 12 May, `get_technician_availability` returns `[]` for every query. The model asks again, and again — 214 model calls over 9 minutes before a wall-clock timeout. $47 per run, 3,100 times that day. Separately the team wants to move to Semantic Kernel and has budgeted two quarters "to rebuild the harness." (a) What control is missing, which layer owns it, why did no error fire? (b) What is wrong with "two quarters to rebuild the harness"?

**Frozen ideal (6 elements)**
1. Missing: a stop control — max turns, max spend, or a no-progress detector.
2. Owner: the agent runtime; it owns the loop, so it owns termination.
3. The model cannot stop itself — no memory of having asked; each turn it re-derives the same next action.
4. No error fired: `[]` is a valid response, all 214 calls returned 200; the run simply never converged.
5. LangGraph is the authoring framework, not the harness.
6. A framework move shouldn't touch identity, traces, evals, quotas or the shared tool layer; if it does, the harness was built inside the framework — that is the finding.

**Attempt (verbatim, uncorrected)**
> dont know

**Checklist:** all 6 miss → 0/6, fail
**Miss codes:** mechanism, price
**Note:** honest "don't know" — a usable signal, unlike the three prior pastes.

## L2 Q2 — verbatim
> That day cost $145,700. You can add one control to the runtime. Name it and give it an actual number.

**Frozen ideal (2 elements)**
1. A turn budget (~12 turns) or spend ceiling (~$1.50/run).
2. The number comes from the healthy distribution — a small multiple of the p99 of normal runs (4–6 turns) — never from the incident.

**Attempt (verbatim, uncorrected)**
> eval + stop call, dont know the number

**Checklist:** 1 partial (named the stop control; "eval" is the wrong layer and cannot stop a run in flight) · 2 miss → 1/2, partial
**Miss codes:** price, boundary
**Improvement note:** L2 Q1 0/6 → L2 Q2 1/2. First upward move of the session; came after question length was cut.
**Reread:** the trade-offs table; how to size a cap.
