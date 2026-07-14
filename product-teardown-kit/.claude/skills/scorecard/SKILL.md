---
name: scorecard
description: Score a product's design depth across the four lenses on the L0–L5 scale, fast — a rating pass, not a full teardown. Trigger on "score this product", "how well designed is X", "rate X's architecture", "is X's agent loop any good", "grade this product", or when the user wants a quick honest read on where a product is strong and where it's shallow before committing to a full teardown.
---

# Scorecard — rate a product across the four lenses

**All output follows `../teardown/references/house-style.md` and `../teardown/references/lens-rubric.md`** (plain-take-first, ≥ L2 claims, name+define+example+boundary, hide internals, end with a quiz not a question).

Job: give an honest L0–L5 read on how well a product is designed, lens by lens — and say plainly where it's strong and where it's just early. NOT to praise or to write a full teardown.

## The scale (score every lens)

Use the shared L0–L5 depth scale from `lens-rubric.md`. A lens scores high only when its design shows a **deliberate tradeoff with a defensible why** — not just a working feature. A slick feature with no visible thinking behind it scores L1, not L5.

## The loop

1. **Name the product in one line.** Confirm you have the right one before scoring; disambiguate per house-style if the name is overloaded.
2. **Score each of the four lenses L0–L5.** One line each: the level + the single choice (and rejected alternative) that sets it there. Be blunt; most products are L4+ on one lens and L1–L2 on the rest.
3. **Two gates before any high score.** A lens earns L4+ only if the design is (a) *deliberate* — name the constraint it answers — and (b) *load-bearing* — name what breaks without it. Miss either gate and it caps at L2.
4. **Headline the shape.** Strongest lens, shallowest lens, and the one bet the whole product rides on. That contrast is the read.
5. **Point to the full teardown.** Name the single lens most worth a deep `teardown` pass — where the interesting choices are hiding.

## Output

A compact per-lens table (lens → level → the one-line reason), then the headline contrast. Cap with one retrieval question that applies the strongest lens to a different product. No file unless asked.

## Anti-patterns

- Scoring a lens L4/L5 because the feature is impressive. Deliberate + load-bearing first, always.
- Padding all four lenses to look balanced. Real products are lopsided — show the lopsidedness.
- Rewriting the product into something better and scoring your version. Score what shipped.
- Ending with a summary instead of a retrieval question.
