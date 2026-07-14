---
name: track
description: Keep a running, tabulated log of every product torn down this session and resurface it — plus the steal-this cards — as a spaced retrieval quiz. Trigger automatically after any teardown/compare/scorecard completes; on "review", "what have I torn down", "quiz me on today", "recap"; and offer it at natural breaks. This is the spacing half — a session that never resurfaces forfeits half the retention.
---

# Track — session teardown log + spaced resurfacing

**All output follows `../teardown/references/house-style.md`.**

Job: make what you tore apart come back, as a *test* — not a passive recap. Retrieval + spacing are what move a pattern from "I saw it once" to "it's mine"; this skill is the spacing engine and the steal-this deck.

## The running table (the chat is the record)

Maintain one table for the session. Add a row the moment a product clears its first retrieval in `teardown` (or a `compare` fork, or a `scorecard`).

| # | Product | Via | Deepest lens | Depth reached | Last recall | Next review |
|---|---------|-----|--------------|---------------|-------------|-------------|
| 1 | Example IDE | teardown | agentic-workflow | L4 (pattern) | passed | tomorrow |

- **Deepest lens** — the lens you got furthest on.
- **Depth reached** — the best L-level so far for that product.
- **Last recall** — passed / failed / not-yet.
- **Next review** — spacing interval from the last *pass*: tomorrow → 3 days → 1 week → 2 weeks → 5 weeks. A fail resets to tomorrow.

The chat is the source of truth. If the user asks, print the table to copy out; there is no background file and no automatic persistence in chat.

## The steal-this deck (transferable cards)

When a teardown finishes, its `extract-patterns` **🧰 steal-this cards** join a deck alongside the table. Resurface these the same way — as a quiz ("apply this pattern to a new product / your own build"), not a re-read. In chat the deck lives in the conversation; print a copy-out block on request.

## Resurfacing (the core behavior)

There is **no automatic timer in chat** — nothing fires on a clock. Resurface on these cues instead, always **as a quiz, not a display**:

- The user says "review" / "quiz me" / "what have I torn down".
- A natural break: they finish a product, go quiet, or switch topics — offer one quick retrieval on an earlier item.
- Session wind-down: before ending, run a short quiz over the table and deck.

When you resurface:
1. Pick the **weakest or oldest-untested** row or card.
2. Ask one retrieval question applied to a **new** product or their own build. Withhold the answer.
3. On a pass → advance its interval and mark Last recall. On a fail → reset to tomorrow, and offer a fast re-teardown of just the broken lens.
4. Show the updated table so the user sees momentum.

Be honest about the limit: if the user expects a hands-free nudge, tell them plainly that chat has no timer — they drive review with "review", or you offer it at breaks. (A real timer needs a hook, which only runs in Claude Code, not chat/Cowork.)

Do not resurface more than one item at a time. Never quiz the exact wording last shown; always a new case.

## On session end / "recap"

Print the full table plus a one-line honest headline: how many products reached L3+, how many are still surface-level, what's due tomorrow. Offer a copy-out block.

## Anti-patterns

- Resurfacing as a summary ("here's what we tore down") with no question. That's rereading; it doesn't count.
- Promising an automatic timed cadence in chat. There is none — say so.
- Re-quizzing the same product/phrasing. Shift to a new case every time.
- Letting the table grow to a wall. Keep the active quiz set to the ~5 weakest.
- Nagging: one item per resurface, skippable.
