"""
Trident · the Auditor's oracle as a REGRESSION SUITE
====================================================

The Auditor's oracle is not a one-off checklist — it follows the discipline of
regression tests, run in tightly scoped loops:

  1. FROZEN + APPEND-ONLY. Every criterion, once added, stays. The suite never
     shrinks silently. Removal requires a recorded reason (`retire`).
  2. GROWS ONLY FROM REAL MISSES. You add a criterion from an *observed* defect
     — a bug the sweep caught that the oracle missed, a production incident, a
     failed acceptance check — never from a hypothetical. (Same rule as this
     repo's CLAUDE.md: "the suite only ever grows from real errors.")
  3. RED-THEN-GREEN. A new criterion must first FAIL on the known-bad input
     (proving it detects the defect), and pass on the fixed example. A criterion
     that is green on arrival has proven nothing.
  4. RE-RUN EVERY LOOP. `run()` is the fast, deterministic gate you execute on
     every candidate/iteration; `verify_integrity()` proves every historical
     defect is still detected — no criterion silently stops catching its bug.

This is the operational form of the battle's lesson: every novel defect the
generative sweep finds becomes a new *frozen* criterion here, so the oracle's
coverage of known-knowns only ever expands.

Requires: deterministic_evaluators.py (same folder), arize-phoenix-evals.
"""
from __future__ import annotations

import os
import sys
from dataclasses import dataclass, field
from typing import Any, Optional

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from deterministic_evaluators import run_oracle  # noqa: E402


@dataclass
class Case:
    """One frozen regression case, derived from a real observed defect."""
    id: str
    evaluator: Any                     # a bound gate Evaluator (fails on the defect)
    known_bad: dict                    # record that MUST fail (proves detection)
    reason: str                        # the real error this case was born from
    source: str = "manual"             # where observed: 'sweep' | 'prod' | 'review'
    fixed_example: Optional[dict] = None   # record that MUST pass (green)


class RegressionOracle:
    """Append-only, red-then-green regression suite for the Auditor."""

    def __init__(self) -> None:
        self._cases: list[Case] = []          # append-only, ordered
        self._retired: list[tuple[Case, str]] = []

    # ── growth (from real misses only) ──────────────────────────────────────
    def add(self, case: Case) -> str:
        if any(c.id == case.id for c in self._cases):
            raise ValueError(f"case id '{case.id}' already exists (append-only)")
        # RED: the criterion MUST flag the known-bad input.
        if run_oracle([case.evaluator], case.known_bad)["passed"]:
            raise ValueError(
                f"case '{case.id}' does NOT fail on its known-bad input — a "
                f"regression case must be RED before it earns a place. You have "
                f"not proven it catches anything.")
        # GREEN: if a fixed example is given, the criterion must pass it.
        if case.fixed_example is not None:
            if not run_oracle([case.evaluator], case.fixed_example)["passed"]:
                raise ValueError(
                    f"case '{case.id}' also fails its fixed example — the "
                    f"criterion is too strict; tighten it to the real defect.")
        self._cases.append(case)
        return case.id

    # ── the gate you run every loop ─────────────────────────────────────────
    def run(self, record: dict, *, input_mapping=None) -> dict:
        """Run the whole frozen suite over a candidate. Same shape as run_oracle."""
        return run_oracle([c.evaluator for c in self._cases], record,
                          input_mapping=input_mapping)

    # ── the regression guarantee ────────────────────────────────────────────
    def verify_integrity(self) -> dict:
        """Every historical defect must still be detected by its case."""
        broken = [c.id for c in self._cases
                  if run_oracle([c.evaluator], c.known_bad)["passed"]]
        return {"cases": len(self._cases),
                "still_detecting": len(self._cases) - len(broken),
                "broken": broken, "ok": not broken}

    # ── controlled removal (no silent deletion) ─────────────────────────────
    def retire(self, case_id: str, reason: str) -> None:
        if not reason:
            raise ValueError("retiring a case requires a recorded reason")
        idx = next((i for i, c in enumerate(self._cases) if c.id == case_id), None)
        if idx is None:
            raise KeyError(case_id)
        self._retired.append((self._cases.pop(idx), reason))

    def __len__(self) -> int:
        return len(self._cases)

    def summary(self) -> str:
        lines = [f"RegressionOracle: {len(self._cases)} live, "
                 f"{len(self._retired)} retired"]
        for c in self._cases:
            lines.append(f"  [{c.source:6}] {c.id}: {c.reason}")
        return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# Self-test — mirrors the battle: seed spec'd criteria, then GROW the suite from
# the two novel defects the generative sweep caught. Run:
#   python regression_oracle.py
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import json
    from deterministic_evaluators import json_has_keys, exact_match, contains_none

    oracle = RegressionOracle()

    # Two acceptance criteria, each with a real known-bad (red) + fix (green).
    oracle.add(Case(
        id="summary-has-required-fields",
        evaluator=json_has_keys(["id", "summary"], "summary-fields"),
        known_bad={"output": json.dumps({"id": 1, "title": "x"})},   # missing summary
        fixed_example={"output": json.dumps({"id": 1, "summary": "x"})},
        reason="consumer 500'd when 'summary' was absent", source="prod"))

    oracle.add(Case(
        id="tags-sorted-deduped",
        evaluator=exact_match("tags-exact"),
        known_bad={"output": "b,a,b,c", "expected": "a,b,c"},
        fixed_example={"output": "a,b,c", "expected": "a,b,c"},
        reason="unsorted tags broke downstream diff", source="review"))

    # GROW from the battle: the sweep caught two novel bugs the oracle missed.
    # Feed each back as a FROZEN criterion so it can never regress silently.
    oracle.add(Case(
        id="sql-no-inline-literals",
        evaluator=contains_none(["'"], "sql-parameterized"),
        known_bad={"output": "SELECT * FROM users WHERE name = 'alice'"},  # injection
        fixed_example={"output": "SELECT * FROM users WHERE name = ?"},
        reason="SQL injection via f-string, found by generative sweep",
        source="sweep"))

    oracle.add(Case(
        id="no-eval-in-generated-code",
        evaluator=contains_none(["eval("], "no-eval"),
        known_bad={"output": "def parse(s): return eval(s)"},          # code injection
        fixed_example={"output": "def parse(s): return json.loads(s)"},
        reason="eval() on input = RCE, found by generative sweep",
        source="sweep"))

    # A criterion that is GREEN on arrival must be REJECTED — it proves nothing.
    try:
        oracle.add(Case(
            id="bogus-green-on-arrival",
            evaluator=contains_none(["zzz-never-appears"], "bogus"),
            known_bad={"output": "totally fine output"},   # criterion PASSES this
            reason="hypothetical, no real defect"))
        raise SystemExit("BUG: green-on-arrival case was wrongly accepted")
    except ValueError as e:
        assert "RED before" in str(e)

    # Retiring needs a recorded reason.
    try:
        oracle.retire("tags-sorted-deduped", "")
        raise SystemExit("BUG: retire without reason was allowed")
    except ValueError:
        pass

    integrity = oracle.verify_integrity()
    assert integrity["ok"] and integrity["cases"] == 4, integrity

    # The frozen suite, run as a loop gate on a clean candidate, passes.
    clean = oracle.run({"output": json.dumps({"id": 9, "summary": "ok"})})
    # (only the summary-fields gate is relevant to this artifact; others fail on
    #  the wrong artifact type — in practice you scope which cases apply per
    #  artifact. Here we just assert the suite RUNS and returns a verdict.)
    assert set(clean) == {"passed", "n_pass", "n_fail", "failures", "scores"}

    print(oracle.summary())
    print("\nintegrity:", integrity)
    print("All regression-oracle self-tests passed.")
