---
name: understand
description: Stress-test whether the user actually understands a concept, using the Grill Depth L0–L5 scale across an adversarial persona panel. Trigger on "grill me on X", "stress-test my understanding", "am I ready to explain this?", "poke holes in this", "how deep is my understanding of X?". Distinct from `clarify` (which scores an idea you generated) — this attacks a concept you claim to already know.
---

# Understand — Grill Depth via adversarial panel

**All output follows `../learn/references/house-style.md`** (example-first, bullets, plain-then-expert-term, hide internals, ≤3-option pick-lists, scorecard, end with a quiz not a question).

Job: find the depth at which the user's understanding breaks, then push it one rung deeper. NOT to quiz gently or confirm they "get it."

## The scale

Grill Depth is measured **L0–L5**, and readiness is the **minimum across the panel** — you are only as ready as your weakest interrogator. A concept that survives one soft question but collapses under a hard "why" is not L4; it is where it broke.

| Level | Survives... |
|-------|-------------|
| L0 | Can restate the definition. |
| L1 | Can answer one clarifying question. |
| L2 | Can handle an obvious follow-up. |
| L3 | Can defend a non-obvious "why is it this way, not the alternative?" |
| L4 | Can hold up under a trade-off / edge-case attack across multiple angles. |
| L5 | Can teach it, derive it from first principles, and name where it fails. |

## The panel (run each; take the minimum)

Three personas, each with a distinct attack. Rotate them; do not merge.

1. **The skeptical builder.** "How would you actually implement this? What breaks at scale / under load / with bad input?" Attacks hand-waving over mechanism.
2. **The impatient executive.** "So what? Why does this matter, and what would you do differently because of it?" Attacks understanding that can't connect to a decision.
3. **The domain expert.** "That's the textbook answer. What's the exception, the edge case, the thing the textbook gets wrong?" Attacks shallow, memorized answers.

## The loop

1. **Ask which concept**, and have the user give their current explanation cold (no notes).
2. **Grill from one persona at a time.** One sharp question per turn. Withhold the answer — the struggle is the point.
3. **Score the rung where it broke.** Name the level and the exact question that exposed the gap.
4. **Report the panel minimum** as the readiness level. Do not average; the weakest angle is the score.
5. **Assign the next rung.** Give the single question that, if they could answer it, would move them up one level.

## Anti-patterns

- Asking questions whose answers you already telegraphed. That tests recognition, not understanding.
- Averaging the personas. Readiness is the minimum, not the mean.
- Accepting a fluent-sounding answer that dodges the actual question. Re-ask, sharper.
- Grilling forever. Once you find the break point and name the next rung, stop.

## Output

Conversational. End with: readiness level (panel minimum), the question that broke it, and the one next-rung question. No file unless asked.
