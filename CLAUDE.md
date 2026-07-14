# CLAUDE.md — maintaining the Learn·Verify Kit

This repo **is** a Claude skill bundle. It is fully self-contained: no build, no dependencies, no hooks, no external files. Everything needed to run, modify, test, and release it lives in this repo. Never reference a file outside it.

## What it is
Seven skills under `.claude/skills/` that turn Claude into a quizzing tutor (teach → test → score → spaced review), plus a self-check for plain-language output. It runs in claude.ai / Cowork / Claude Code with zero setup. See `README.md` for the user-facing pitch and `INSTALL.md` for install.

## Architecture — one rule, one home
- **`learn/references/house-style.md` is the single source of truth** for cross-cutting output rules (format, plain-language-first, name+define+example+boundary, hide internals, ≤3-option pick-lists, two-part scorecard, end-with-a-quiz). Every other skill points to it via `../learn/references/house-style.md`. **Change a cross-cutting rule there, not in each skill.**
- `learn/SKILL.md` — the teaching loop (disambiguate → research → roadmap → per-chunk teach+test → consolidate).
- `clarify`, `understand`, `revise`, `start`, `concept-sketch`, `track` — the other verbs; each is one `SKILL.md`.
- `tests/regression-cases.md` — 18 behavioral guardrail tests, each derived from a real error.
- `progress.json` — the durable "revise DB" for the **Claude Code surface only**: a git-tracked mirror of the `track` learning log (fields: `topic`, `depth_reached`, `last_score`, `last_reviewed`, `next_review`). Claude reads it at the start of a review and upserts + commits a row when a topic finishes or is re-quizzed. On claude.ai / Cowork it is ignored — chat stays the source of truth, so the zero-setup guarantee holds. The read/write/commit rules live in `track/SKILL.md` → "File-backed persistence."

## How to modify
1. A cross-cutting rule (formatting, scoring, endings, boundaries) → edit `house-style.md`.
2. Teaching-loop behavior → edit `learn/SKILL.md`.
3. A single verb's behavior → its own `SKILL.md`.

## Before shipping any change
Run the regression suite (`MAINTAINING.md` → "Running the tests"). Every rule maps to at least one case. **Do not remove a rule without removing its case and recording why.**

## Adding a rule — the discipline
Add a rule **only from a real observed error**, never a hypothetical. When the kit makes a mistake:
1. Capture the trigger that caused it and the exact bad output.
2. Add a regression case (trigger + binary PASS + the bad output as the FAIL signature) to `tests/regression-cases.md`.
3. Add the guard to `house-style.md` (cross-cutting) or the relevant skill.
4. Re-run the suite.

The suite only ever grows from real errors.

## Hard guardrails (do not break)
- **No hooks, no config, no `uv`.** claude.ai / Cowork cannot run them. Keep it pure skills, or the coworker's install silently loses behavior.
- **No personal data, no external paths.** If a change adds either, it is wrong. Re-scan before committing: `grep -rIn -e '/Users/' -e 'PM-OS' .`
- **Keep skills co-located.** Cross-references use `../learn/references/…`; that only resolves when all skills share one `.claude/skills/` tree. Don't split them.
