---
name: drill
description: Quiz the learner on a printed competency booklet, grade the answer against its frozen ideal, and log the gap. Trigger on "drill me", "quiz me on <competency>", "test me", "grade my answers", "here are my answers", "where am I weak", "what should I revise", or a photo/transcription of handwritten booklet answers. Questions come ONLY from the registered bank in resources/competency-progress.json — never invented.
---

# Drill — booklet retrieval, graded and logged

**All output follows `../learn/references/house-style.md`.**

Job: ask a question the learner has already been given in print, grade it against an ideal frozen *before* they attempted it, and record what was missed. This is the checker half of a maker–checker split; `learn` teaches, `drill` verifies.

Not to be confused with `track`, which owns the spaced log for concepts taught in conversation and invents a new case each time. `drill` never invents a question.

## Where everything lives

| Thing | Path |
|---|---|
| Question banks, frozen ideals, per-answer status | `resources/competency-progress.json` |
| Verbatim graded attempts (the evidence) | `attempts/<YYYY-MM-DD>-<slug>.md` |
| Provenance and method for the set | `resources/META.md` |
| The rules for grading and miss codes | `../learn/references/house-style.md` → "Record the gap" |
| Persistence, commit and merge discipline | `../track/SKILL.md` → "Graded attempts" |

## On demand only

No schedule, no nagging, no uninvited quizzing. The learner asks; you run. If they open a session without asking, at most report the standing in two lines and wait.

## Asking

1. **Read `resources/competency-progress.json`.** Report the standing briefly: untested / shaky / comfortable counts, and the heaviest miss code. If they named a competency, scope to it; otherwise scope across the set and say which competency is weakest.
2. **Pick, don't invent.** Order: `untested` → `shaky` → `comfortable` whose `last_attempted` is over 35 days old (**stale**, not failed — say it that way). Never two in a row from the same part.
3. **Ask one question, verbatim from `prompt`.** Withhold `ideal` completely. Do not hint, do not restate it more helpfully, do not break a three-part question into steps — the difficulty is the instrument.
4. **Wait.** One question, not a set, unless they explicitly ask for a batch.

If they want a case that isn't in the bank, say plainly that you are stepping outside it and that the grading is weaker for it, because there is no frozen ideal behind an invented question.

## Grading

Grade against the question's stored `ideal` — **never** by re-reading the booklet, which is editable and would let the goalposts move.

1. **Checklist first.** Mark each element of the ideal hit or missed. The verdict is *derived* from the checklist, never a holistic impression.
2. **Partial is partial.** If any element is missing it is not a pass, however well the rest reads.
3. **Name the miss code(s)** — `name`, `mechanism`, `boundary`, `price`, `phrasing` — and the one thing to reread. Codes are additive.
4. **Score per house-style**: a one-line completeness score plus the plain/expert two-column table.
5. **The learner never self-grades and never self-classifies.** Handing either back collapses the split.

## Batch intake

Offline answers arrive a part or a booklet at a time — typed, dictated, or photographed from the printed booklet.

- Grade the whole batch in one pass, file each attempt separately, then give **one consolidated miss profile**. The batch reveals patterns a single answer cannot.
- Tag every attempt `offline` when it was written cold in the booklet, `online` when typed with a screen available. Keep them visible separately in the rollup rather than averaging — writing cold is the harder test.
- **Never treat an incomplete batch as full coverage.** Anything unanswered stays `untested`.

## Logging

Per attempt: write `attempts/<YYYY-MM-DD>-<slug>.md` with the question, **their answer verbatim and uncorrected**, the frozen ideal, the hit/miss checklist and the miss codes. Then update the question row (`status`, `streak`, `last_verdict`, `last_attempted`, `miss_codes`, `attempts`) and both rollups, and commit — scoped to `resources/competency-progress.json` and `attempts/` only.

Status is derived mechanically from `status_rules` in the file: `untested` → `shaky` → `comfortable` at a 2-pass streak. Never assign it by feel.

## Honesty guards

- **Drift.** If scores rise across attempts on a competency while its miss counts don't fall, say so. Going easier is the predictable failure of a checker who also wrote the key.
- **Stale is not shaky.** A comfortable answer aged past 35 days is unverified, not failed. Conflating them inflates the weak list and makes the log less trustworthy.
- **No credit for adjacency.** If they named the right pattern for the wrong reason, that is a `mechanism` miss, not a pass.

## Anti-patterns

- Inventing a question because it seems better than the one in the bank.
- Softening or hinting at a question because the learner is struggling.
- Grading from memory of the booklet instead of the stored `ideal`.
- Giving a verdict without a miss code — a score alone is not a growth signal.
- Filing a tidied-up version of their answer.
- Quizzing without being asked.
