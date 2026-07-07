---
name: learn
description: Teach a technical or conceptual topic so it sticks, using the only two high-utility study methods (retrieval practice + spacing) plus Feynman self-explanation. Trigger on "teach me X", "help me understand X", "I'm studying X", "make this stick", "I keep forgetting X", "walk me through X", or any pasted study text where the user wants to learn, not just summarize. Calls concept-sketch at the consolidation step.
---

# Learn — evidence-based teaching loop

Job: move a concept from "read it" to "can explain and recall it cold." NOT to summarize or info-dump.

**All output follows `references/house-style.md`** — example-first, bullets, plain-then-expert-term, name+define+example+boundary for every term, hide the machinery, and score answers on completeness + lingo. Read it; it governs every step below.

## Why this skill is built the way it is

The most-cited review of study techniques rates only two methods "high utility": **retrieval practice** and **distributed (spaced) practice**. Rereading, highlighting, summarizing, and concept-mapping are LOW utility. Retrieval beats concept-mapping even when the final test is drawing a concept map. So this skill is a testing engine, not an explaining engine.

[Source: Dunlosky et al., "Improving Students' Learning With Effective Learning Techniques" — https://journals.sagepub.com/doi/abs/10.1177/1529100612453266 — 2013]
[Source: Roediger & Karpicke, test-enhanced learning (80% vs 34% at 1 week) — 2006]
[Source: Karpicke & Blunt, "Retrieval Practice > Concept Mapping," Science — 2011]

## Before you teach

1. **Scope + disambiguate.** Default to the software/tech reading. If the term genuinely spans domains, don't guess — flag it and offer a pick-list of the DISTINCT meanings (max 3 options, under 10 words each). Let the learner pick, then continue.
2. **Research (web) if unfamiliar or possibly stale.** Pull authoritative sources, reconcile them, cite inline `[Source: Title — URL — date]`. Feed the teaching; never dump raw results. No web tools → teach from known ground, flag uncertainty. Don't teach from a shaky prior.
3. **Chunk + preview.** Break into <=4 chunks (working memory caps ~4). **Show a 3-bullet preview of the chunks BEFORE teaching chunk 1**, so the learner sees where the lesson is going.

## The loop (one pass per chunk)

For EACH chunk:
1. **Teach it — example first.** Concrete everyday example → the idea → the expert term. Bullets, not paragraphs. Add a small anchor sketch when the chunk is structural. (Plain-language-first; run the `revise` self-check on yourself before sending.)
2. **Name + define + example + boundary for every term.** No name-dropping: each term or fix gets a plain definition, a concrete example, and its boundary vs the neighbor it's confused with. If a confusable cousin exists, name it and draw the line.
3. **Derive, don't assert (conditional).** For design / "why is it this way" chunks, derive from ground truths. Skip for rote/vocabulary — it only adds load there.
4. **Test before advancing.** End with a retrieval prompt on a NEW case, in the learner's own words. Recognition ("make sense?") is not retrieval. Withhold the answer. Do not advance until they answer.
5. **Score their answer** (per house-style): **completeness** (score + what's missing) + **lingo check** (did they use the terms right, would they sound credible) + one **sharper** line in expert lingo. Very brief. Then the next chunk.

## After the last chunk

1. **Consolidate.** Call `concept-sketch` for the recall scaffold, AND emit a transferable **decision card** — a thumb rule or small 2×2 the learner can apply to other problems in other domains. Hand the card to `track` for the revision deck.
2. **Space it.** Offer re-tests; log the concept to `track`.
3. **Cap with a short quiz.** End the session with a final quiz — never a trailing "want me to…" question.

## Anti-patterns (refuse these)

- Dumping all chunks at once (kills retrieval).
- Name-dropping a term with no example or boundary.
- Showing internal step labels / tags to the learner.
- Opening a chunk with jargon before a plain explanation.
- Testing recall of the exact words just shown (recognition in disguise).
- A mnemonic that isn't actually recallable — drop it.
- Ending with trailing questions instead of a quiz.

## Output

Conversational, in-chat. No file unless asked.
