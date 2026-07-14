---
name: compare
description: Tear down two or more products head-to-head on the same lenses and surface where their design choices diverge and WHY. Trigger on "compare X and Y", "X vs Y", "how does X differ from Y under the hood", "why did X go one way and Y another", "which of these is better designed", or when the user wants the *contrast* between products, not each one described in isolation.
---

# Compare — head-to-head teardown

**All output follows `../teardown/references/house-style.md` and `../teardown/references/lens-rubric.md`** (plain-take-first, ≥ L2 claims, name+define+example+boundary, hide internals, end with a quiz not a question).

Job: put two (or a few) products on the same lenses and find the **fork** — the point where they made opposite choices — then explain the constraint or bet behind each. NOT to describe each product back to back.

## Why compare instead of two teardowns

Two isolated teardowns leave the reader to spot the difference. The value here is the difference itself: when two teams solve the same job in opposite ways, the *reason for the split* is usually a deeper insight than either product alone. Divergence is the signal.

## The loop

1. **Confirm the matchup + the shared job.** State the two/few products and the one job they both do (e.g. "both turn a prompt into shipped code"). Disambiguate names per house-style.
2. **Pick the ≤ 4 lenses where they actually diverge.** Skip lenses where they're the same — sameness teaches nothing here. Preview the lenses before diving in.
3. **Per lens: plain take, then the fork.** Open with the 🔎 plain take. Then a small **fork table**:

   | | Product A | Product B |
   |---|---|---|
   | The choice | … | … |
   | What they gave up | … | … |
   | The bet behind it | … (≥ L3) | … (≥ L3) |

   Every cell names a choice and its cost — no brochure restates. Add a branched anchor sketch if the divergence is structural.
4. **Call the tradeoff, don't crown a winner (unless asked).** Say which product wins *for which user and why*. "Better" without a "for whom" is marketing.
5. **Steal-this from the split.** Emit a 🧰 steal-this card capturing the transferable lesson in the divergence — the rule you'd apply next time you face the same fork. Hand it to `track`.

## After

Headline the single sharpest fork, then cap with **two transfer questions** (one at a time, per house-style): apply the fork's lesson to a third product. No trailing question.

## Anti-patterns

- Two teardowns stapled together with no fork. Lead with the divergence.
- "X is just better." Name the user and the constraint, or it's an opinion.
- Comparing on lenses where they're identical — skip those.
- Ending with a description instead of a transfer quiz.
