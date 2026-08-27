---
topic: agent-harness-l1-inference
at: 2026-08-26
hit: 1
of: 10
miss_codes: [mechanism, price, mechanism, price, price, boundary]
mode: online
assigned_by: claude
declared: false
---

# 2026-08-26 — L1 inference: the undeclared model swap (re-teach)

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).
Context: second pass. First pass 2026-08-24 scored 1/4 and 2/4, weakest `mechanism`.
Split out of the `inference-and-runtime` session record on 2026-08-27, one file per graded
attempt. The L2 half is `2026-08-26-agent-harness-l2-runtime.md`. Rolled up here: Q1 1/4,
Q2 0/4, mini 0/2 → 1/10, with the miss codes concatenated in question order. Self-graded
in-session by the agent that set the questions (handoff §8), so it cannot count as observed.

## L1 Q1 — verbatim
> Meridian's `claims-bot` runs on `gpt-4o`. Two changes ship in the same release on 14 March: routing so short "is this claim complete?" checks go to `gpt-4o-mini`, and a bump of the primary from `gpt-4o` to `gpt-4.1`. On 15 March, completeness checks start passing claims missing the police-report field. No errors, no timeouts, latency better than before. (a) Name the mechanism — the causal chain, not the layer. (b) What should the release have done differently, and what does that cost?

**Frozen ideal (4 elements)**
1. Two variables changed in one release, so the cause is unattributable without a bisect.
2. The completeness prompt was validated against `gpt-4o` only; routing moved it onto `gpt-4o-mini`, never validated against that prompt.
3. Nothing alerted because the answer is well-formed and wrong — 200s, no timeouts; latency *improving* is the tell that traffic moved to a smaller model.
4. Price: ship the two changes separately, each re-evaluated against the completeness rubric pre-promotion — costs a release cycle.

**Attempt (verbatim, uncorrected)**
> a. a model swap forces a harness re-tune, and a re-evaluation
> b. When the primary model returns HTTP 429, the inference layer shall retry twice with exponential backoff and then route the call to the fallback model gpt-4.1.

**Checklist:** 1 miss · 2 partial · 3 miss · 4 miss → 1/4, fail
**Miss codes:** mechanism, price
**Note:** (b) is a verbatim paste of a requirement from an unrelated scenario; no 429 appears in this case.
**Reread:** the anchor sketch, inference position.

## L1 Q2 — verbatim
> Cascade County's `permit-bot`. Primary `gpt-4o`, fallback `gpt-4.1` after two 429s. Nobody deploys anything in April. 3–9 April an upstream incident makes `gpt-4o` return 429 on 31% of calls at peak. Dashboard that week: 100% of runs completed, zero errors, p95 latency up 340ms. 1,200 permits approved; a June audit finds 84 skipped the setback-distance check. (a) No release shipped — what changed? Trace it from the 429 to the 84. (b) The team proposes "remove the fallback so it fails loudly." One thing that costs them, one thing it doesn't fix.

**Frozen ideal (4 elements)**
1. The fallback fired; those runs were served by `gpt-4.1` — an undeclared model swap triggered by infrastructure, not by a release.
2. `permit-bot`'s prompt was validated against `gpt-4o` only; `gpt-4.1` was configured but never evaluated against it.
3. No signal fired: approvals were well-formed, 200s, run completes; +340ms p95 reads as "the incident," not "a different model is answering."
4. Removing the fallback costs ~370 hard failures that week and deletes the availability cushion; it does not fix the validation gap or the missing serving-model attribution.

**Attempt (verbatim, uncorrected)**
> a. When the primary model returns HTTP 429, the inference layer shall retry twice with exponential backoff and then route the call to the fallback model gpt-4.1.
> b. a well-formed wrong answer — every per-run signal is healthy, so this is invisible until an audit

**Checklist:** 1 miss · 2 miss · 3 miss · 4 miss → 0/4, fail
**Miss codes:** mechanism, price
**Note:** third consecutive answer assembled by pasting the most recent salient sentence rather than reading the case. Teaching loop was halted here and question size reduced.

## L1 mini — verbatim
> ~370 runs served by the fallback, 84 of them wrong. Did `gpt-4.1` miss the setback check on every run it served, or only some?

**Frozen ideal (2 elements)**
1. Some — 84/370 ≈ 23%, not 100%.
2. Partial degradation evades sampling: a 23% failure rate survives spot-checks a 100% rate would fail instantly. Total failure is self-reporting; intermittent failure needs an aggregate trended over time.

**Attempt (verbatim, uncorrected)**
> missed setback check on every run , bc eval must have not setup.
> it matters bc whenever a model change happens - the harness needs retune and re-eval

**Checklist:** 1 miss · 2 miss → 0/2, fail
**Miss codes:** price, boundary
**Note:** first answer of the session that was actually reasoned rather than pasted. Arithmetic wrong; "eval was never set up" is a correct adjacent diagnosis.
