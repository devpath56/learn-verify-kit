# 2026-08-26 — Harness layer 5: context + retrieval as a subagent

Source: ByteByteGo, "How Microsoft Ships AI Agents at Scale". Mode: online (typed in chat).
Context: second pass. First pass 2026-08-24 scored partial, weakest `mechanism`.

## Q1 — verbatim
> Cascade fixes it: the retriever now loops until it finds the rule the query names. Three weeks later, `permit-bot`'s p95 latency has tripled and one run in forty costs $31. What did they forget to bring across from layer 2?

**Frozen ideal (2 elements)**
1. The loop controls — a turn budget and a spend ceiling — plus its own traces.
2. A retrieval subagent is an agent runtime in miniature; without them they moved the 214-call runaway down a layer instead of eliminating it.

**Attempt (verbatim, uncorrected)**
> they must have put  budget and cost ceiling on the retrieval loop

**Checklist:** 1 hit · 2 hit (implied by naming both controls on the retrieval loop specifically) → 2/2, pass
**Miss codes:** none
**Note:** a layer-2 control transferred to a layer-5 structure unprompted. This is the transfer the chunking was built to produce.

## Q2 — verbatim
> Retrieval now loops correctly and stays inside budget. In 2024 the zoning code is amended: R2 setback goes from 25 ft to 30 ft. The vector index was built in January and has not been rebuilt. The retriever loops, finds the 1987 amendment table, confirms it, returns 25 ft. It did everything right. What failed, and why can no amount of better retrieval fix it?

**Frozen ideal (2 elements)**
1. The grounding data is stale — the index predates the amendment.
2. Retrieval optimises *finding what is in the corpus*; it cannot surface what was never indexed. Retrieval correctness and grounding freshness are independent properties.

**Attempt (verbatim, uncorrected)**
> this index is stale, bc retrieval cant fix old data

**Checklist:** 1 hit · 2 hit → 2/2, pass
**Miss codes:** none
**Improvement note:** Q1 pass → Q2 pass. Layer 5 is the only chunk of the session clean on both questions.
