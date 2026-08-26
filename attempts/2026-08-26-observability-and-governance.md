# 2026-08-26 — Harness layer 3: observability & governance

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).
Context: second pass. First pass 2026-08-24 scored 0/2 and 1/4, weakest `mechanism`.

## Q1 — verbatim
> Cascade adds the rubric criterion about setback distance. It runs on live traffic and scores 99% every week for three months. In month four an audit finds permits approved on parcels that don't exist in the parcel system at all — `get_parcel` returned an error and the bot approved anyway. The criterion still reads 99%. Why didn't it drop?

**Frozen ideal (4 elements)**
1. The criterion has a precondition — a retrieved parcel record — that the failing runs never meet.
2. Those runs score N/A or are dropped; they leave the denominator rather than lowering the numerator.
3. So 99% means 99% *of the runs the criterion could evaluate*; the failures are not in the sample.
4. Boundary: this is running on live traffic, so it is in **alert** position, not gate position. A gate blocks pre-promotion.

**Attempt (verbatim, uncorrected)**
> the gate must have not been correctly defined.

**Checklist:** 1 miss · 2 miss · 3 miss · 4 miss (said "gate" for a live-traffic measurement) → 0/4, fail
**Partial credit:** "badly defined criterion" is the correct top-level diagnosis; it stops before the mechanism.
**Miss codes:** mechanism, boundary
**Reread:** the gate/alert row of the boundary column.

## Q2 — verbatim
> Meridian's `claims-bot` dashboard criterion: "Of the claims the agent escalated to a human, what percentage were escalated correctly?" — reads 97%. What failure can this criterion never detect?

**Frozen ideal (1 element)**
1. Claims it should have escalated and didn't — false negatives. The criterion is conditioned on the positive class (the agent's own decision), so the failure population selects itself out of the denominator.

**Attempt (verbatim, uncorrected)**
> claims it should have escalated but didn't

**Checklist:** 1 hit → 1/1, pass
**Miss codes:** none
**Improvement note:** Q1 fail → Q2 pass. Reached by reasoning about the denominator, applied to a new surface ~30 seconds after the pattern was taught — retrieval, not recognition.

## Concept that emerged and generalised: denominator blindness

Recognised across four separate cases in one session, unprompted by the end:
- per-run signals healthy → the drift lives only in the aggregate (Cascade, April)
- 23% partial degradation survives the spot-checks a 100% failure would fail
- groundedness 0.94 measured fidelity to a transcript that was itself the lie
- a rubric scores only the runs it can parse; unparseable runs exit the denominator

Rule retained: **when a number is suspiciously flat, ask what is not in the denominator.**
**Verdict:** pass.
