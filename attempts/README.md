# attempts/

Graded attempt records — the evidence behind `../progress.json`.

One file per graded attempt: `<YYYY-MM-DD>-<topic-slug>.md`, containing the question, the
attempt **verbatim and uncorrected**, the frozen ideal answer, the hit/miss checklist, and the
miss codes.

You do not write these. Submit an attempt in any form — pasted text, a photo of a handwritten
booklet page, a dictated paragraph — and the checker files it here, rolls the miss counts into
`progress.json`, and commits both.

Kept verbatim on purpose: the counts in `progress.json` are only trustworthy if the raw answers
behind them can be re-read and the grading disputed.

## What `progress-store.mjs` can read

A file is a point on the curve only if it opens with a frontmatter block — `topic`, `at`, `hit`,
`of`, `miss_codes`, `mode`, `assigned_by`, and `declared` when the numbers were transcribed rather
than observed. **One topic per file**: a session that quizzed two layers is two records, not one, and
the two 2026-08-24 / 2026-08-26 multi-topic session files were split on 2026-08-27 for exactly that
reason.

Five records here — the L3, L4 and L5 layers and continuous eval — have **no frontmatter yet**, so
the store does not see them. Three of their graded questions record misses with no miss-code line
(`2026-08-24-retrieval-as-a-subagent` Q1 and Q2, `2026-08-24-continuous-eval-and-optimizer` Q2).
Filing them as-is would put an unknown mechanism share into the curve, which is why
`mechanismShare` now returns `null` there rather than `0`. Write the missing codes first, then add
the frontmatter.

`assigned_by` is not a formality. The 2026-08-24 and 2026-08-26 attempts were graded in-session by
the same agent that set the questions — the handoff says so in §8 — so they carry
`assigned_by: claude` and are refused as observations. The curve stays `UNEVALUABLE` until a human
grades one, and that is the intended reading, not a bug.
