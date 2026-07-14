---
name: teardown
description: Tear a software product or agentic system apart across four lenses (agentic-workflow design, engineering craft & DX, product & GTM, technical architecture) until you understand it deeply enough to rebuild or steal from it. Trigger on "tear down X", "analyze this product", "how is X built", "why does X work", "reverse-engineer X's design", "what can I steal from X", or any product/tool the user wants understood at the level of the team that shipped it — not a feature summary.
---

# Teardown — the four-lens product analysis loop

Job: move a product from "I've used it" to "I understand the choices its team made and could rebuild it." NOT to summarize its features or restate its marketing.

**All output follows `references/house-style.md` and `references/lens-rubric.md`** — plain-take-first, concrete-before-abstract, every claim ≥ L2 (choice + alternative rejected), name+define+example+boundary for every term, hide the machinery, end with a transfer quiz, emit a steal-this card. Read both; they govern every step below.

## Why this skill is built the way it is

You remember a product by rebuilding its reasoning, not by reading its landing page. So this skill is a *taking-apart* engine, not a describing engine: for every visible feature it asks "what did that cost, and what did they give up to get it?" — because the choice and its rejected alternative are where the learning (and the delight) live. It ends with retrieval on a *different* product, because a pattern you can only recognize in one place isn't yours yet.

## Before you tear down

1. **Scope + disambiguate.** Default to the software/tech reading. If the name maps to genuinely distinct products, don't guess — flag it and offer a pick-list of the DISTINCT products (max 3, under 10 words each). Let the reader pick, then continue.
2. **Research (web) if unfamiliar or possibly stale.** Pull docs, engineering blogs, changelogs, talks; reconcile them; cite inline `[Source: Title — URL — date]`. Mark reasoned guesses **(inferred)** — never launder a guess as a fact. No web tools → tear down from known ground, flag uncertainty loudly. Don't tear down from a shaky prior.
3. **Pick the lenses + preview.** Choose the **≤ 4 lenses** that matter for THIS product (an AI IDE leans agentic + DX; a database leans architecture). **Show a 3–4 bullet preview of the lenses you'll cover BEFORE lens 1**, so the reader sees the shape of the teardown.

## The loop (one pass per lens)

For EACH chosen lens:
1. **Open with the plain take.** Before any mechanism or term, give a **🔎 Plain take**: 2–4 ultra-plain, jargon-free bullets a smart non-engineer could follow. No expert terms here — those come next.
2. **Show the concrete thing, then name it.** Start from something the product actually does (a specific call, screen, or behavior) → the mechanism → the industry term. Bullets, not prose. Add a small branched anchor sketch when the lens is structural (agent loop, data flow, components).
3. **Every finding climbs to ≥ L2.** State the **choice, the alternative the team rejected, and one downside it still carries**, then push to L3 by naming *why* (2–3 contributing factors, not one tidy cause). Add a **would-be-wrong-if** falsifier to any load-bearing claim. Cut anything that's still a brochure restate.
4. **Name + define + example + boundary for every term.** No name-dropping: each pattern or mechanism gets a plain definition, a concrete example *from this product*, and its boundary vs the neighbor it's confused with.
5. **Test — ask Q1.** Ask **one** retrieval prompt that applies this lens's idea to a DIFFERENT product. Recognition ("make sense?") is not retrieval. Withhold the answer. Wait.
6. **Score Q1, then ask Q2.** Score their answer (depth line + plain/expert table per house-style), *then* ask **Q2 — same idea, another product.** Withhold; wait. Never ask Q2 before Q1 is scored.
7. **Score Q2, then advance.** Score Q2, add a one-line improvement note, then move to the next lens.

## After the last lens

1. **Consolidate into steal-this cards.** Emit at least one **🧰 Steal-this card** — a named, transferable pattern with *when to use it*, its *boundary*, and the concrete example from this product. Hand each card to `track` for the deck.
2. **Run the "what would kill it" pass.** Assume the product has already failed three years out — name 2–3 contributing factors that killed it, in past tense. Plural, not one cause. It doubles as a retrieval prompt.
3. **Place it on the timeline (only if it's moved).** If the product has actually pivoted, one line: where it sits on *build-it-yourself → commodity*, its last pivot (why the old way stopped working), and its likely next move. Skip it for a brand-new product with no pivot yet — don't force a thin trajectory line.
4. **Headline the contrast.** One line: strongest lens, shallowest lens, and the single biggest bet the product is making. The contrast is the insight.
5. **Cap with a short quiz.** End on a final transfer question — never a trailing "want me to…?" question.

## Anti-patterns (refuse these)

- Restating the product's marketing or feature list (L0). Every line names a choice and its rejected alternative.
- Explaining why it won with one tidy cause and no falsifier (hindsight / survivorship bias).
- Ending a teardown with no "what would kill it" pass — a present-tense snapshot only.
- Dumping all lenses at once with no preview.
- Name-dropping a pattern (RAG, MCP, event loop) with no example from this product or no boundary.
- Laundering a guess as a fact — mark inferences **(inferred)**.
- Showing internal step labels, lens letter-codes, or metric vocab to the reader.
- Opening a lens with jargon before the plain take.
- Ending a lens with fewer than two retrieval questions (Q1 + a Q2 on another product).
- Stacking Q1 and Q2 in one message.
- Finishing with no steal-this card, or ending with a trailing question instead of a quiz.

## Output

Conversational, in-chat. No file unless asked.
