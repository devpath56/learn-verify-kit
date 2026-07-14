# House Style — the law for every skill's reader-facing output

These rules govern HOW the kit talks to the reader, across all skills. Goal: the reader understands a product fast **and** can talk about it like someone who has shipped one. Every skill (`teardown`, `compare`, `extract-patterns`, `scorecard`, `revise`, `start`, `track`) follows this.

## Format
- **Plain-take first (per lens).** Every torn-down lens opens with a **🔎 Plain take**: 2–4 ultra-plain, jargon-free bullets a smart non-engineer could follow. Then the real teardown begins.
- **Concrete before abstract.** After the plain take, lead with a concrete thing the product actually does — a specific screen, call, or behavior — not a category label. The abstraction comes after the example lands.
- **Bullets, tables, short sentences.** No paragraphs or prose walls. Bold the **choice vs the alternative they rejected**.
- **Minimum words.** Say it in the fewest words that still land.
- **Anchor sketch when structural.** For a data-flow / agent-loop / component point, add a small 2–4 node text tree **with at least one branch** (a flat `A -> B -> C` chain fails this).

## Language
- **Plain first, then the expert term.** Explain in plain words, then name the industry-standard term so the reader can say it in a design review. Never open with jargon.
- **No name-dropping.** Every term, pattern, or mechanism you introduce gets three things: a plain **definition**, a concrete **example from this product**, and its **boundary** vs the neighbor it's confused with. Naming without exemplifying is a failure (e.g. saying "RAG" with no example).
- **Draw boundaries.** When a concept has a confusable neighbor (agent vs workflow; fine-tuning vs prompting; moat vs head-start), name the neighbor and give the one-line difference. A mechanism isn't understood until it's told apart from its look-alikes.

## Depth — the whole point (no brochure restates)
- **Every claim must reach ≥ L2 (a real tradeoff), never L0 (a marketing restate).** The full L0–L5 depth scale and the four lenses live in `references/lens-rubric.md`. Read it; it is the second half of this law.
- **Name the road not taken — and its cost.** A teardown line is only load-bearing if it says what the team chose, **the alternative they gave up, and at least one downside the choice still carries**. "It uses streaming" is L1. "It streams tokens instead of buffering — faster first word, but a messier final render and harder error handling; a bet that perceived latency beats polish" is L3.
- **Cite what's known, flag what's inferred.** Mark verified facts with an inline `[Source: …]`; mark reasoned guesses as **(inferred)**. Never launder a guess as a fact.
- **Say what would falsify it.** For each load-bearing claim, add a short **would be wrong if ___** — the observation that would disprove it. This is the cheapest guard against explaining a *win* by hindsight or survivorship.
- **Prefer contributing factors; ask who benefits.** When you explain *why*, give 2–3 interacting reasons over one tidy cause, and name *who benefits / what incentive* produced the shape. Single-cause stories are usually wrong.

## Hide the machinery
- The reader sees the analysis, never the kit's internals. No step labels ("Step 0 · Research"), no internal tags, no lens letter-codes or metric vocab in reader-facing text. **Product/domain jargon = teach it; kit-internals = hide it.**

## Ambiguity + scope
- **Default to the software/tech reading** of an ambiguous product name.
- If the name genuinely maps to distinct products (e.g. a tool vs a company vs a protocol), don't guess: **flag it and offer a pick-list of the DISTINCT products** — **max 3 options, under 10 words each** — let the reader pick, then tear down.

## Scoring a teardown (the two-part scorecard)
Whenever you rate a product or a reader's own teardown attempt, two parts, both brief:
1. **Depth line** — a one-line L0–L5 level per lens covered + what's missing to climb one level.
2. **Plain/expert phrasing table** — a two-column table translating the key finding from plain words into the phrasing a practitioner would use:

   | Say it this way to *understand* it | Say it this way to sound like a *builder* |
   |---|---|
   | plain wording | same idea in industry-standard terms |

   Define any jargon inline, with its boundary. No over-confirming, no re-explaining.

**Bias self-check (one line).** If you're explaining a *win*, ask what a product that *lost* but looked similar would also show. If your reason fits both, it isn't the reason (survivorship guard).

## Retrieval — end every teardown with a test
- A teardown that is only read is forgotten. **After the lenses, ask two retrieval questions applied to a DIFFERENT product** (transfer), one at a time: ask Q1, withhold the answer, score it, then ask Q2. Never stack them.

## Steal-this card (the transferable takeaway)
- Every finished teardown emits at least one **🧰 Steal-this card**: a named pattern with *when to use it*, its *boundary*, and the *concrete example* from this product — something the reader could apply to their own build. Hand it to `track` for the deck.

## Endings
- **No trailing questions.** No "want me to…?" chatter. When the teardown lands, **end** — cap with the retrieval quiz, not an offer.

## Pre-send gate (run silently before every reader-facing message)
Block the send until all pass:
- [ ] Opened with the 🔎 plain take (2–4 jargon-free bullets) before any mechanism or term
- [ ] Concrete product behavior shown before any abstract category label
- [ ] Every term/pattern introduced has definition + example-from-this-product + boundary (no bare name-drops)
- [ ] No undefined jargon anywhere, including in scorecards and steal-this cards
- [ ] Every load-bearing claim is ≥ L2 — names the choice AND the alternative rejected (no brochure restates)
- [ ] Facts carry `[Source: …]`; guesses are marked **(inferred)** — no guess laundered as fact
- [ ] Structural point (agent loop / data flow / components)? → a 2–4 node text-tree with at least one branch is present
- [ ] No kit internals leaked (no step labels, lens codes, or metric vocab in reader text)
- [ ] Each load-bearing claim carries a **would-be-wrong-if** falsifier (no hindsight/survivorship laundering)
- [ ] Finished a teardown? → the **what-would-kill-it** pass ran (2–3 contributing factors, past tense); plus the one-line evolution note *if the product has pivoted*
- [ ] Finished a teardown? → at least one 🧰 steal-this card AND two transfer questions, delivered ONE AT A TIME
