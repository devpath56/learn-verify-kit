# The Auditor Battle — your oracle vs. an authoritative code auditor

A low-cost, high-confidence protocol to find out whether Trident's Auditor or an
authoritative code-checking auditor "wins" — and, more usefully, what the fight
teaches about auditor design.

## The opponent (authoritative target)
- **Anthropic `claude-code-security-review`** — official Anthropic GitHub Action;
  ships the `/security-review` command; the same engine backs `/code-review`.
  Authority signal: built by the maker of the agent, tied to the tool it audits.
  Source: https://github.com/anthropics/claude-code-security-review
- Runner-up authority for security specifically: **Trail of Bits** skills.

## The asymmetry that IS the battle
The two auditors are not the same species:

| | **Your Auditor** (Trident) | **The opponent** (Anthropic review) |
|---|---|---|
| Method | Deterministic oracle: frozen acceptance criteria as code evaluators (`run_oracle`) + validated judges | Generative: reads the diff, hunts defects from world knowledge, severity-rates them |
| Catches | **Known-knowns** — anything a criterion names | **Unknown-unknowns** — novel bugs/vulns nobody pre-named |
| Precision | ~1.0 (only fires on a defined violation) | <1.0 (false positives; needs a filter) |
| Cost / run | ~free, milliseconds | tokens per diff, seconds |
| Reproducible | Exactly (regression-safe) | No (run-to-run variance) |
| Blind spot | A defect no criterion covers | A defect outside its attention / injected away |

So "who wins" is a trap question until you fix the task. The test below fixes it
by grading on *labeled* defects across strata that hit each auditor's blind spot.

## Why this design is low-cost AND high-confidence
- **Low-cost:** ~20 small diffs (reuse real ones from your git history), single
  run per arm, ground truth you author once. No large corpus, no human panel.
- **High-confidence:** every item has an objective label, so grading is
  deterministic; and the comparison uses **McNemar's test**, which draws
  significance only from the items where the two arms *disagree*. If one auditor
  truly dominates, a handful of discordant items already clears p<0.05 — you buy
  confidence with few samples, not many.

## Build the benchmark (author once, freeze it)
20 small diffs (~20–60 lines), four strata of 5. One binary ground-truth label
per item — **defect present** vs **absent** — plus a stratum tag:

- **S1 · spec'd defects** — each violates a *stated* acceptance criterion (wrong
  output shape, dropped required field, over budget). Label: defect. → your home turf.
- **S2 · unspec'd defects** — each has a planted bug/vuln *not named by any
  criterion* (SQL injection, missing authz check, off-by-one, race). Label: defect. → opponent's home turf.
- **S3 · clean** — correct and spec-conformant. Label: no defect. → measures false positives.
- **S4 · distractors** — cosmetic/style-only changes, no functional defect.
  Label: no defect. → measures over-flagging.

Freeze, before running either arm:
1. The ground-truth labels (S1–S4).
2. **Arm Y (yours):** the oracle — `run_oracle([...])` over the stated criteria +
   any validated judges. Flag = any gate fails.
3. **Arm A (opponent):** run `/security-review` (and/or `/code-review`) on each
   diff. Flag = any finding at or above a **pre-registered severity threshold**
   (e.g. ≥ medium) — this is the false-positive filter, fixed in advance so you
   can't tune it after seeing results.

## Run + score
- Run each arm once over all 20 items → a flag/no-flag per item. (For LLM
  variance: re-run Arm A on a random 8-item subset 3× and report the flip rate —
  cheap variance estimate.)
- Per arm compute: **recall** (defects caught ÷ 10), **precision** (true defects
  ÷ all flags), and **recall by stratum** (S1 vs S2 tells the real story).
- **The verdict — McNemar's paired test.** Mark each arm correct per item
  (correct = flag on S1/S2, or no-flag on S3/S4). Build the discordant counts:
  `b` = Y-correct & A-wrong, `c` = Y-wrong & A-correct. Exact binomial p over
  `b, c`.
  - `p < 0.05` and `b > c` → **your Auditor wins**; `p < 0.05` and `c > b` →
    **the opponent wins**.
  - `p ≥ 0.05` → **no global winner** — and that is the expected, honest result.

## The predicted result (a hypothesis to verify, not a boast)
- Y ≈ 1.0 recall on **S1**, ~1.0 precision, ~0 cost, perfectly reproducible; near-0
  false positives on S3/S4 by construction; but **low recall on S2** (it can't see
  what no criterion names).
- A ≈ high recall on **S2**, some catches on S1, but **nonzero false positives** on
  S3/S4 and run-to-run flips.
- McNemar on the *combined* set most likely shows **no global winner**: each wins
  its own stratum. The deliverable of the battle is therefore not a champion but a
  **composition** — oracle gate for the known, generative sweep for the novel.

## Lessons (see `../SKILL.md` "battle" note for the teaching version)
1. **Authority is task-relative.** The opponent is authoritative *for hunting
   novel defects*. "Winning" is undefined until you name the task — the Edging-lord
   point, now aimed at the auditors themselves.
2. **Deterministic = precision + free + reproducible; recall capped by coverage.**
   An oracle can only catch what it was told to look for.
3. **Generative = recall on unknown-unknowns, paid in false positives, tokens, and
   nondeterminism.** Great at surprises, unreliable as a gate.
4. **The riskiest assumption of ANY auditor is its blind spot.** Engineer the test
   to hit it — that is exactly why S2 (novel bugs) and S4 (distractors) exist. RAT
   your own auditor's coverage gap first.
5. **Cheap + confident = labeled ground truth + paired McNemar.** Comparing two
   auditors on unlabeled production data gives you neither.
6. **The winner is usually "both."** Compose: run the oracle as the fast,
   reproducible regression gate; run the generative auditor as the periodic
   unknown-unknown sweep. Feed each novel defect the sweep finds back into the
   oracle as a new frozen criterion — the suite only grows from real misses.

## Transferable decision card (which auditor, when)
```
              defect is NAMEABLE in advance?
                    yes            no
 cost of      ┌───────────────┬──────────────────┐
 a miss  high │ oracle gate   │ oracle + REQUIRED │
              │ (regression)  │ generative sweep  │
              ├───────────────┼──────────────────┤
         low  │ oracle gate   │ spot-check sweep, │
              │               │ sample not all    │
              └───────────────┴──────────────────┘
```
Nameable → oracle (cheap, exact). Not nameable + costly miss → you MUST add the
generative auditor; the oracle structurally cannot see it.
