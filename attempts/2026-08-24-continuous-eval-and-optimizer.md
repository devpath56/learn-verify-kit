# 2026-08-24 — Continuous eval: rubrics vs generic metrics + Agent Optimizer

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).

## Q1 — verbatim
> `refund-bot` shows groundedness 0.94, coherence 0.91, steady for three months, no errors. It approved £180,000 of refunds that broke the 30-day policy — it never checked the purchase date. (a) Why did groundedness stay high? (b) Write one rubric criterion that would have caught this, in the `resv-bot` style.

**Frozen ideal (2 elements)**
1. Groundedness measures fidelity to the provided context; the customer's claim WAS the context, so 0.94 is an accurate measurement of the wrong property. Generic metrics are transcript-internal; policy compliance needs external ground truth.
2. A criterion asserting a precondition before an irreversible action, e.g. "Does the agent retrieve the order's purchase date from the order system and verify it falls within the 30-day window, before approving a refund?"

**Attempt (verbatim, uncorrected)**
> 1.  bc it was evaluated against the groundedness
> 2. donot know

**Checklist:** 1 miss (restates the question; does not say what groundedness measures) · 2 miss → 0/2, fail
**Miss codes:** mechanism, phrasing
**Reread:** the term table, generic metrics vs rubric row.

## Q2 — verbatim
> `onboarding-bot` criterion C1 ran at 95%, fell to 58% after v12 shipped, unnoticed for nine days. Team plans a Slack alert below 90% and a prompt rewrite next sprint. (a) What mechanism should have stopped v12 reaching live traffic — name it and say how it differs from an alert? (b) What does the Agent Optimizer do instead of one manual rewrite — what does it generate and how does it pick a winner?

**Frozen ideal (4 elements)**
1. Names the gate.
2. Mechanism: the gate runs the same eval against the release candidate pre-promotion and blocks the deploy; an alert is the same signal wired to notify after it is already serving traffic. Same measurement, different position in the pipeline.
3. The Optimizer generates multiple candidates in parallel — prompt rewrites, model swaps, skill adjustments.
4. It scores each against the same rubric and promotes the best scorer as a new agent version — evaluation becomes actionable, not diagnostic.

**Attempt (verbatim, uncorrected)**
> a gate would block the deploy before it ships

**Checklist:** 1 hit · 2 partial (said "before it ships", did not contrast with an alert) · 3 miss · 4 miss → 1/4, fail
**Miss code:** mechanism
**Reread:** the closed-loop sketch; gate vs alert row.
