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

## File-backed persistence (Claude Code surface only)

In **Claude Code** (where Claude can read/write files and run git), the in-chat table is mirrored to `progress.json` at the repo root, so the log survives across sessions and days. On claude.ai / Cowork there is no file — chat stays the source of truth and this section does not apply.

When file tools and a repo are available, run this **automatically at the consolidation step** of `learn` / `understand` / `clarify` — do **not** wait for the user to type "track" or "review". A manual trigger still works, but the durable write must never depend on the learner remembering:

1. **At the start of any review or session** ("review", "quiz me", "what have I learned", or the first message of a session): **read `progress.json`** and load its `topics` into the running table. What's *due* = any row whose `next_review` date is today or earlier.
2. **When a topic clears its first retrieval** (in `learn`), a grill (`understand`), or is **re-quizzed** in a resurface: **upsert its row** and write the file. One row per topic (match on `topic`); update in place, don't duplicate.
3. **Field mapping** (schema lives in `progress.json`): `topic`, `depth_reached` (best level so far), `last_score` (most recent result), `last_reviewed` (today's ISO date), `next_review` (advance from the last *pass* along `1 day -> 3 days -> 1 week -> 2 weeks -> 5 weeks`; a fail resets to 1 day).
4. **Commit after each write** — commit *only* `progress.json`: `git add progress.json && git commit -m "track: <topic> -> <result>"`. Never fold code or skill edits into this commit. This is the durable "revise DB" — the commit is what makes it survive to another day.
5. **Merge the log to the default branch, automatically.** The revise-DB is only useful if it lives on the branch a fresh session reads first. After committing, bring **just `progress.json`** to the repo's default branch and push — without waiting for the user to ask:
   ```
   git checkout <default> && git pull --ff-only origin <default>
   git checkout <work-branch> -- progress.json
   git add progress.json && git commit -m "track: <topic> -> <result>" && git push origin <default>
   git checkout <work-branch>
   ```
   **Scope hard to `progress.json`** — this auto-merge carries the learning log and nothing else; code and skill edits stay on their own branch and follow normal review. If the default branch rejects a direct push (branch protection), open a one-file PR for `progress.json` and report it; do not block the session waiting on it.

Keep the file the *mirror*, not a second brain: the live table and `progress.json` must always agree after a write. Never invent rows for topics not actually taught or reviewed this session.

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
