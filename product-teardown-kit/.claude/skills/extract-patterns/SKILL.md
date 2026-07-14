---
name: extract-patterns
description: Pull the transferable, reusable patterns out of one or more teardowns as "steal-this" cards you could apply to your own build. Trigger on "what can I steal from X", "extract the patterns", "what's the reusable idea here", "turn this into something I can use", "give me the playbook", or automatically at the consolidation step of a `teardown`. NOT a standalone summary — each card must be transferable and bounded, or it's trivia.
---

# Extract-patterns — turn a teardown into steal-this cards

**All output follows `../teardown/references/house-style.md`.**

Job: take what a teardown surfaced and distill it into **named patterns the reader can reuse elsewhere** — with the boundary that says when NOT to. NOT to recap the product.

## What makes a card real (the gate)

A pattern only earns a card if it is:
- **Transferable** — it would help build a *different* product, not just describe this one.
- **Bounded** — it names when it applies AND when it backfires. A pattern with no boundary is a slogan.
- **Grounded** — it points to the concrete example in the product it came from.

A "card" that fails any gate is trivia. Say so and drop it, rather than pad the deck.

## The card format

For each pattern:

> **🧰 [Pattern name]**
> - **What it is** — one plain line.
> - **When to reach for it** — the situation it solves.
> - **Boundary** — when it backfires / the neighbor pattern to use instead.
> - **Seen in** — the concrete example from the torn-down product `[Source: …]`.
> - **Steal it like this** — one line on applying it to a *different* build.

## The loop

1. **Scan the teardown for choices that generalize.** Prefer the L4–L5 findings (patterns and bets); L2–L3 tradeoffs can become cards too if they transfer.
2. **Write one card per pattern**, in the format above. Aim for 2–4 strong cards, not a long thin list.
3. **Kill the fakes.** Run each card through the gate; drop any that fail. Note what you dropped and why — a short honest deck beats a padded one.
4. **Hand the deck to `track`.** These cards are the spaced-review material; `track` resurfaces them as "apply this to a new case" quizzes, not re-reads.

## Anti-patterns

- A card with no boundary — that's a slogan, not a pattern.
- Recapping the product instead of abstracting a reusable move.
- A deck of ten weak cards. Four strong, bounded, transferable ones win.
- Ending with a display instead of handing the deck to `track` for retrieval.
