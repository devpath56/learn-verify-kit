# CLAUDE.md — maintaining the Product Teardown Kit

This repo **is** a Claude skill bundle. It is fully self-contained: no build, no dependencies, no hooks, no external files. Everything needed to run, modify, test, and release it lives in this repo. Never reference a file outside it.

## What it is
Seven skills under `.claude/skills/` that turn Claude into a product-teardown analyst: it reverse-engineers the *choices* a product's team made across four lenses — agentic-workflow design, engineering craft & DX, product & GTM, technical architecture — until you could rebuild the thing, then quizzes you on a different product so it sticks. It runs in claude.ai / Cowork / Claude Code with zero setup. See `README.md` for the user-facing pitch and `INSTALL.md` for install.

## Architecture — one law, one home
- **`teardown/references/house-style.md` + `teardown/references/lens-rubric.md` are the single source of truth** for cross-cutting rules. `house-style.md` governs *how* output reads (plain-take-first, name+define+example+boundary, hide internals, two-part scorecard, steal-this card, end-with-a-quiz). `lens-rubric.md` governs *what* a teardown examines (the four lenses) and *how deep* (the L0–L5 scale). Every other skill points to them via `../teardown/references/…`. **Change a cross-cutting rule there, not in each skill.**
- `teardown/SKILL.md` — the flagship loop (disambiguate → research → pick ≤4 lenses → per-lens plain-take + choice/rejected-alternative/why + quiz → steal-this cards).
- `scorecard`, `compare`, `extract-patterns`, `revise`, `start`, `track` — the other verbs; each is one `SKILL.md`.
- `tests/regression-cases.md` — behavioral guardrail tests (Tier A inherited-real, Tier B seed).

## How to modify
1. A cross-cutting output rule (formatting, scoring, endings, boundaries) → edit `house-style.md`.
2. A lens or the depth scale → edit `lens-rubric.md`.
3. The teardown loop → edit `teardown/SKILL.md`.
4. A single verb's behavior → its own `SKILL.md`.

## Before shipping any change
Run the regression suite (`MAINTAINING.md` → "Running the tests"). Every rule maps to at least one case. **Do not remove a rule without removing its case and recording why.**

## Adding a rule — the discipline
Add a rule **only from a real observed error**, never a hypothetical. When the kit makes a mistake:
1. Capture the trigger that caused it and the exact bad output.
2. Add a regression case (trigger + binary PASS + the bad output as the FAIL signature) to `tests/regression-cases.md`.
3. Add the guard to `house-style.md`/`lens-rubric.md` (cross-cutting) or the relevant skill.
4. Re-run the suite.

The suite's **[seed]** cases are the one exception: they were written at construction from the design, not an observed error, and are flagged as such. Promote a seed to real by replacing its watched-for signature with one you actually observed. The suite only ever grows from real errors otherwise.

## Hard guardrails (do not break)
- **No hooks, no config, no `uv`.** claude.ai / Cowork cannot run them. Keep it pure skills, or the coworker's install silently loses behavior.
- **No personal data, no external paths.** If a change adds either, it is wrong. Re-scan before committing: `grep -rIn -e '/Users/' -e '/home/' .`
- **Keep skills co-located.** Cross-references use `../teardown/references/…`; that only resolves when all skills share one `.claude/skills/` tree. Don't split them.
- **Depth is the product.** The kit's whole value is climbing past L1 (brochure/mechanic) to L3+ (the why). A change that makes output easier to read but shallower is a regression.
