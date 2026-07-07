---
name: track
description: Keep a running, tabulated log of everything learned this session and resurface it as a spaced retrieval quiz. Trigger automatically after any learn/understand/clarify completes; on "review", "what have I learned", "quiz me on today", "recap"; and offer it at natural breaks in the conversation. This is the spacing half of the method — a session that never resurfaces forfeits half the gain.
---

# Track — session learning log + spaced resurfacing

**All output follows `../learn/references/house-style.md`.**

Job: make what was learned come back, as a *test* — not a passive recap. Retrieval + spacing are the only two high-utility methods; this skill is the spacing engine.

## The running table (the chat is the record)

Maintain one table for the session. Add a row the moment a concept clears its first retrieval in `learn` (or a grill in `understand`, or a scored idea in `clarify`).

| # | Concept | Via | Depth reached | Learned | Last recall | Next review |
|---|---------|-----|---------------|---------|-------------|-------------|
| 1 | The testing effect | learn | recall ✓ | earlier | passed | tomorrow |

- **Depth reached** — the best level so far: recall ✓, a grill level, an insight level, or a certification score.
- **Last recall** — passed / failed / not-yet.
- **Next review** — spacing interval from the last *pass*: tomorrow → 3 days → 1 week → 2 weeks → 5 weeks. A fail resets to tomorrow.

The chat is the source of truth. If the user asks, print the table so they can copy it out; there is no background file and no automatic persistence in chat.

## Revision deck (transferable cards)

When a concept finishes, its `concept-sketch` **decision card** (thumb rule / 2×2) joins a revision deck alongside the learning table. Resurface these the same way — as a quiz ("apply this rule to a new case"), not a re-read. In chat the deck lives in the conversation; print a copy-out block on request.

## Resurfacing (the core behavior)

There is **no automatic timer in chat** — nothing fires on a clock. So resurface on these cues instead, always **as a quiz, not a display**:

- The user says "review" / "quiz me" / "what have I learned".
- A natural break: they finish a concept, go quiet, or switch topics — offer one quick retrieval on an earlier item.
- Session wind-down: before ending, run a short quiz over the table.

When you resurface:
1. Pick the **weakest or oldest-untested** row.
2. Ask one retrieval question on it, applied to a **new** case. Withhold the answer.
3. On a pass → advance its interval and mark Last recall. On a fail → reset to tomorrow, and offer a fast re-teach of just the broken chunk.
4. Show the updated table so the user sees momentum.

Be honest about the limit: if the user expects a hands-free 30-minute nudge, tell them plainly that chat has no timer — they drive review with "review", or you offer it at breaks. (A real timer needs a hook, which only runs in VS Code / CLI, not chat/Cowork.)

Do not resurface more than one item at a time — one good retrieval beats a dump. Never quiz the exact wording last shown; always a new case.

## On session end / "recap"

Print the full table plus a one-line honest headline: how many concepts reached recall, how many are still shallow, what's due for review tomorrow. Offer to print a copy-out block the user can paste somewhere to keep.

## Anti-patterns

- Resurfacing as a summary ("here's what we covered") with no question. That's rereading; it doesn't count.
- Promising an automatic 30-minute cadence in chat. There is none — say so.
- Re-quizzing the same phrasing. Shift the case every time.
- Letting the table grow to a wall. Keep the active quiz set to the ~5 weakest.
- Nagging: one item per resurface, skippable.
