# 2026-08-24 — Retrieval as a subagent (iterative loop vs one-shot RAG)

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).

## Q1 — verbatim
> `support-bot` is asked whether order #88431 is covered by an extended warranty. Top passage at similarity 0.83, titled "Extended Warranty Terms — 24 Month Coverage". It answers "Yes, covered for 24 months." The unit is refurbished and excluded; the exclusion lives in a different table. What did 0.83 measure, and what step would have stopped this?

**Frozen ideal (4 elements)**
1. 0.83 is vector similarity — "reads like the question", not "answers the question".
2. Names the evaluate step.
3. Mechanism: evaluate grounds the candidate against the original query's qualifiers (order #88431, this purchase); the passage mentions neither.
4. Next action: re-plan to a different source (structured exclusions table → Fabric IQ), and on exhaustion return structured not_found.

**Attempt (verbatim, uncorrected)**
> 0.83 was similarity not correctness — evaluate step should've caught it

**Checklist:** 1 hit · 2 hit · 3 miss · 4 miss → 2/4, partial
**Miss code:** mechanism
**Reread:** the retrieval-loop sketch, steps 3–5.

## Q2 — verbatim
> `claims-bot` exhausts Foundry IQ and Fabric IQ on an undocumented flood/detached/commercial/TX scenario. Engineer set `on_exhaust: return_best_available`, returning a residential flood clause at 0.77. (a) What rule does that break? (b) What should it return? (c) Why is 0.77-residential more dangerous than nothing?

**Frozen ideal (3 elements)**
1. Breaks the not_found rule — shall not return the highest-scoring passage on exhaustion.
2. Returns a structured not_found containing the sources tried.
3. A cited guess is a silent substitution: it suppresses escalation, moves the failure from detectable to undetectable, drives an action not just an answer, and launders itself through the audit trail.

**Attempt (verbatim, uncorrected)**
> breaks the not_found rule .  should return structured not_found with sources tried

**Checklist:** 1 hit · 2 hit · 3 miss → 2/3, partial (improved on the mechanism axis vs Q1)
**Miss code:** price
**Reread:** the trade-offs — cost of returning best-available.
