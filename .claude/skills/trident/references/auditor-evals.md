# Auditor · the evaluation toolkit

The Auditor doesn't judge work by vibes. It builds **evaluators** — deterministic
where possible, LLM-as-Judge only where a failure mode genuinely needs
interpretation — and runs them to check work against the frozen spec. Two
resources back this up:

1. **`deterministic_evaluators.py`** — Trident's own code-evaluator toolbox
   (Arize Phoenix `create_evaluator`, `kind="code"`). Factories that turn each
   MECE acceptance criterion into a bound `Evaluator`, plus `run_oracle()` to
   compose them into one pass/fail verdict.
2. **`hamel-evals-skills/`** — Hamel Husain's seven eval skills (MIT, vendored;
   see `hamel-evals-skills/SOURCE.md`). The methodology layer: how to find the
   failure modes worth writing evaluators for, and how to trust the evaluators
   you write.

## The core discipline (from Hamel's skills — internalize this)
- **Error analysis before metrics.** Do not invent evaluators from a checklist.
  Read real traces, catalog how the system actually fails, THEN write an
  evaluator per real failure mode. Vanity metrics measured before error analysis
  are the smelliest assumption of all — RAT them.
- **Code-first, judge-only-when-forced.** If a failure mode can be checked with
  regex / schema / execution / set logic → write a **deterministic** evaluator
  (`deterministic_evaluators.py`). Reach for an LLM judge ONLY for genuinely
  subjective criteria (tone, faithfulness, relevance, completeness).
- **One evaluator, one thing.** Each evaluator checks exactly one failure mode.
  Binary Pass/Fail. This is what makes the suite MECE.
- **An unvalidated judge is not evidence.** An LLM judge you haven't calibrated
  against human labels is itself an untested assumption. Validate before trust.

## Which skill for which Auditor hat

**Hat 1 — RAT lord (riskiest assumption, always first)**
- `hamel-evals-skills/skills/error-analysis` → read traces, surface the failure
  modes; the highest-impact one seeds the RAT.
- `hamel-evals-skills/skills/generate-synthetic-data` → when real traces are
  sparse, generate targeted inputs to *stress the specific risky assumption*
  cheaply. This is exactly a low-cost RAT probe.
- Deterministic probe → encode the RAT as one `deterministic_evaluators.py`
  gate and run it; cheapest possible decisive test.

**Hat 2 — Edging lord (MECE spec → precise "done")**
- Each acceptance criterion becomes an evaluator:
  - code-checkable → a factory in `deterministic_evaluators.py`
  - subjective → `hamel-evals-skills/skills/write-judge-prompt` (one judge, one
    failure mode, binary), then MUST pass through
    `hamel-evals-skills/skills/validate-evaluator` before it counts.
- `hamel-evals-skills/skills/eval-audit` → run over the *assembled* criteria set
  to catch gaps/overlaps/vanity metrics — a MECE check on the spec itself.
- Freeze the resulting evaluator list as the **oracle** (`run_oracle`). This is
  the arm-blind referee the keep-or-swap test requires — write it BEFORE
  candidates are generated so it can't be gamed.

**Hat 3 — Context steward**
- `hamel-evals-skills/skills/build-review-interface` → when human labels are
  needed, stand up a minimal annotation tool instead of dragging raw traces
  through everyone's context window. Collect labels out-of-band; loan only the
  verdicts back into the loop.

**RAG work specifically** → `hamel-evals-skills/skills/evaluate-rag` (separate
retrieval vs generation failures before writing either evaluator).

## How the Auditor invokes these
When spawned, the Auditor is a subagent with its charter (`auditor.md`) plus
this file. To use a Hamel skill it reads the corresponding
`hamel-evals-skills/skills/<name>/SKILL.md` and follows it. To build a
deterministic check it imports `deterministic_evaluators.py`
(`pip install arize-phoenix-evals` once) and composes factories into an oracle.

## Minimal end-to-end shape
```python
from deterministic_evaluators import (
    valid_json, json_has_keys, contains_none, within_budget, run_oracle,
)

# Edging-lord froze these acceptance criteria from the spec:
ORACLE = [
    valid_json("valid-json"),
    json_has_keys(["id", "summary"], "has-required-fields"),
    contains_none(["sk-", "password"], "no-secret-leak"),
    within_budget(5000, "within-budget"),
]

# Auditor checks a candidate's work product:
verdict = run_oracle(ORACLE, {"output": candidate_text, "tokens": used_tokens})
if not verdict["passed"]:
    # hand these back to the loop; RAT the top failure
    print(verdict["failures"])
```
Subjective criteria are added as validated LLM judges alongside the code gates;
together they are the full acceptance oracle.
