"""
Trident · deterministic evaluators for the Auditor
==================================================

The Auditor's Edging-lord turns a spec into MECE, binary, *testable* acceptance
criteria. This module is the executable form of those criteria: a toolbox of
**deterministic** (no-LLM) evaluators built on `arize-phoenix-evals`, plus an
oracle runner that composes them into a single pass/fail verdict.

Why factories, not bare functions
----------------------------------
`create_evaluator` binds a function's *argument names* to keys in the work
record you pass to `.evaluate({...})`. The criterion's own configuration
(expected value, forbidden terms, budget, schema) is NOT part of the work
record — it belongs to the criterion. So each public callable below is a
**factory**: you parameterize it once (freezing the criterion), and it returns
an `Evaluator` whose bound arguments read ONLY from the work record
(`output`, `expected`, `tokens`, `exit_code`, ...). Freeze the list once and
you have an acceptance oracle that grades every candidate identically — exactly
what the keep-or-swap test and the Auditor both need.

Record schema (canonical keys the factories bind to)
----------------------------------------------------
    {
      "output":    str,          # the work product under test
      "expected":  str,          # gold answer, when the criterion needs one
      "tokens":    int,          # cost signal, for budget gates
      "exit_code": int,          # for command/tool results
      "input":     str,          # original task input, if a criterion needs it
    }
If your data uses different keys, pass `input_mapping=` to `run_oracle` /
`.evaluate` (a dict of arg-name -> record-path or callable); the SDK remaps.

Dependencies:  none required. If `arize-phoenix-evals` is installed we use it;
otherwise we fall back to a tiny stdlib-only shim (below) that provides the same
`Score` / `create_evaluator` / `.evaluate(record)` contract. These evaluators are
deterministic (no LLM), so the shim is faithful — phoenix's model machinery was
never needed here. Install phoenix only if you want its dashboards/experiments:
    pip install arize-phoenix-evals
"""

from __future__ import annotations

import difflib
import json
import re
from typing import Any, Iterable, Sequence

try:  # real phoenix when present …
    from phoenix.evals import Score, create_evaluator  # type: ignore
except ModuleNotFoundError:  # … else a stdlib-only, no-LLM compatible shim.
    import inspect

    class Score:  # noqa: D401 - minimal compatible stand-in
        """A single evaluation result. Extra phoenix-only kwargs are ignored."""

        def __init__(self, name: str = "", score: Any = None, label: Any = None,
                     explanation: str | None = None, direction: str = "maximize",
                     **_ignored: Any) -> None:
            self.name = name
            self.score = score
            self.label = label
            self.explanation = explanation
            self.direction = direction

        def __repr__(self) -> str:  # pragma: no cover - debug aid
            return (f"Score(name={self.name!r}, score={self.score!r}, "
                    f"label={self.label!r}, explanation={self.explanation!r})")

    class _Evaluator:
        """Binds a function's argument names to keys in the work record."""

        def __init__(self, fn, name: str, direction: str = "maximize",
                     **_ignored: Any) -> None:
            self._fn = fn
            self.name = name
            self.direction = direction
            self._params = list(inspect.signature(fn).parameters)

        def _bind(self, record: dict, input_mapping) -> list:
            args = []
            for p in self._params:
                if input_mapping and p in input_mapping:
                    m = input_mapping[p]
                    args.append(m(record) if callable(m) else record[m])
                else:
                    args.append(record[p])  # KeyError -> caught by run_oracle as FAIL
            return args

        def evaluate(self, record: dict, input_mapping=None) -> list:
            out = self._fn(*self._bind(record, input_mapping))
            if isinstance(out, Score):
                if not out.name:
                    out.name = self.name
                return [out]
            ok = bool(out)
            return [Score(name=self.name, score=int(ok), label=str(ok))]

    def create_evaluator(name: str, direction: str = "maximize", **_ignored: Any):
        def _decorate(fn):
            return _Evaluator(fn, name=name, direction=direction)
        return _decorate

# `kind="code"` is the documented flag; the SDK also accepts `source="code"`.
_CODE = dict(kind="code")


# ─────────────────────────────────────────────────────────────────────────────
# GATE evaluators — predicates. score ∈ {1,0}, label True/False, maximize.
# These compose the pass/fail oracle (all must pass).
# ─────────────────────────────────────────────────────────────────────────────

def exact_match(name: str = "exact-match", *, normalize: bool = False):
    """output equals expected (optionally case/whitespace-normalized)."""
    def _norm(s: str) -> str:
        return re.sub(r"\s+", " ", s.strip().lower()) if normalize else s

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str, expected: str) -> bool:
        return _norm(output) == _norm(expected)

    return _eval


def contains_all(substrings: Sequence[str], name: str = "contains-all",
                 *, case_sensitive: bool = True):
    """output contains every required substring."""
    needles = list(substrings)

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> Score:
        hay = output if case_sensitive else output.lower()
        missing = [s for s in needles
                   if (s if case_sensitive else s.lower()) not in hay]
        ok = not missing
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=None if ok else f"missing: {missing}")

    return _eval


def contains_none(forbidden: Sequence[str], name: str = "no-forbidden-terms",
                  *, case_sensitive: bool = False):
    """output contains NONE of the forbidden terms (leak/PII/secret guard)."""
    bad = list(forbidden)

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> Score:
        hay = output if case_sensitive else output.lower()
        hits = [s for s in bad
                if (s if case_sensitive else s.lower()) in hay]
        ok = not hits
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=None if ok else f"found forbidden: {hits}")

    return _eval


def matches_regex(pattern: str, name: str = "matches-regex", *, flags: int = 0,
                  fullmatch: bool = False):
    """output matches (or fully matches) a regex."""
    rx = re.compile(pattern, flags)

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> bool:
        return bool(rx.fullmatch(output) if fullmatch else rx.search(output))

    return _eval


def nonempty(name: str = "nonempty", *, field: str = "output"):
    """the bound field is present and not whitespace-only."""
    if field == "output":
        @create_evaluator(name=name, direction="maximize", **_CODE)
        def _eval(output: str) -> bool:
            return bool(output and str(output).strip())
        return _eval

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(expected: str) -> bool:  # pragma: no cover - alt field
        return bool(expected and str(expected).strip())
    return _eval


def word_count_between(min_words: int, max_words: int,
                       name: str = "word-count"):
    """min_words <= len(output.split()) <= max_words."""
    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> Score:
        n = len(output.split())
        ok = min_words <= n <= max_words
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=f"{n} words (want {min_words}-{max_words})")

    return _eval


def valid_json(name: str = "valid-json"):
    """output parses as JSON."""
    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> bool:
        try:
            json.loads(output)
            return True
        except Exception:
            return False

    return _eval


def json_has_keys(keys: Sequence[str], name: str = "json-has-keys"):
    """output parses as a JSON object containing every required top-level key."""
    required = list(keys)

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> Score:
        try:
            obj = json.loads(output)
        except Exception as e:
            return Score(name=name, score=0, label="False", **_CODE,
                         explanation=f"invalid JSON: {e}")
        if not isinstance(obj, dict):
            return Score(name=name, score=0, label="False", **_CODE,
                         explanation="JSON is not an object")
        missing = [k for k in required if k not in obj]
        ok = not missing
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=None if ok else f"missing keys: {missing}")

    return _eval


def json_schema(schema: dict, name: str = "json-schema"):
    """output validates against a JSON Schema. Requires `jsonschema`."""
    try:
        import jsonschema  # type: ignore
    except ImportError as e:  # pragma: no cover
        raise ImportError(
            "json_schema() needs the `jsonschema` package: pip install jsonschema"
        ) from e

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> Score:
        try:
            obj = json.loads(output)
        except Exception as ex:
            return Score(name=name, score=0, label="False", **_CODE,
                         explanation=f"invalid JSON: {ex}")
        try:
            jsonschema.validate(obj, schema)
            return Score(name=name, score=1, label="True", **_CODE)
        except jsonschema.ValidationError as ve:
            return Score(name=name, score=0, label="False", **_CODE,
                         explanation=f"schema: {ve.message}")

    return _eval


def numeric_in_range(low: float, high: float, name: str = "numeric-in-range",
                     *, field: str = "output"):
    """the numeric value of a field is within [low, high]."""
    def _pull(rec_value: Any) -> float:
        return float(rec_value)

    if field == "tokens":
        @create_evaluator(name=name, direction="maximize", **_CODE)
        def _eval(tokens: Any) -> Score:
            v = _pull(tokens); ok = low <= v <= high
            return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                         explanation=f"{v} in [{low},{high}]")
        return _eval

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: Any) -> Score:
        v = _pull(output); ok = low <= v <= high
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=f"{v} in [{low},{high}]")
    return _eval


def within_budget(max_tokens: int, name: str = "within-budget"):
    """tokens <= max_tokens (cost gate; pairs with the 40/40/20 ledger)."""
    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(tokens: Any) -> Score:
        n = int(tokens); ok = n <= max_tokens
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=f"{n} tokens (cap {max_tokens})")

    return _eval


def exit_code_is(expected: int = 0, name: str = "exit-code"):
    """exit_code equals expected (command/tool success gate)."""
    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(exit_code: Any) -> bool:
        return int(exit_code) == expected

    return _eval


def set_equals(expected: Iterable[str], name: str = "set-equals",
               *, splitter: str = ","):
    """output, split into a set, equals the expected set (order-free)."""
    want = {x.strip() for x in expected}

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> Score:
        got = {x.strip() for x in output.split(splitter) if x.strip()}
        ok = got == want
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=None if ok
                     else f"missing={want-got} extra={got-want}")

    return _eval


def covers(required_items: Iterable[str], name: str = "covers",
           *, splitter: str = ","):
    """output's set is a SUPERSET of required_items (collectively exhaustive)."""
    need = {x.strip() for x in required_items}

    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str) -> Score:
        got = {x.strip() for x in output.split(splitter) if x.strip()}
        missing = need - got
        ok = not missing
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=None if ok else f"uncovered: {missing}")

    return _eval


def max_levenshtein(max_distance: int, name: str = "max-levenshtein"):
    """Levenshtein(output, expected) <= max_distance (fuzzy exact-match gate)."""
    @create_evaluator(name=name, direction="maximize", **_CODE)
    def _eval(output: str, expected: str) -> Score:
        d = _levenshtein(output, expected)
        ok = d <= max_distance
        return Score(name=name, score=int(ok), label=str(ok), **_CODE,
                     explanation=f"distance {d} (max {max_distance})")

    return _eval


# ─────────────────────────────────────────────────────────────────────────────
# MEASURE evaluators — continuous signal, not pass/fail. Non-gating by default.
# ─────────────────────────────────────────────────────────────────────────────

def levenshtein_distance(name: str = "levenshtein-distance"):
    """Raw edit distance between output and expected (minimize)."""
    @create_evaluator(name=name, direction="minimize", **_CODE)
    def _eval(output: str, expected: str) -> Score:
        return Score(name=name, score=_levenshtein(output, expected),
                     direction="minimize", **_CODE,
                     explanation="Levenshtein(output, expected)")

    return _eval


def token_count(name: str = "token-count"):
    """Report token count as a signal (minimize)."""
    @create_evaluator(name=name, direction="minimize", **_CODE)
    def _eval(tokens: Any) -> Score:
        return Score(name=name, score=int(tokens), direction="minimize", **_CODE)

    return _eval


def _levenshtein(a: str, b: str) -> int:
    """Edit distance via difflib opcodes (stdlib only, no extra deps)."""
    sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
    dist = 0
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "replace":
            dist += max(i2 - i1, j2 - j1)
        elif tag == "delete":
            dist += i2 - i1
        elif tag == "insert":
            dist += j2 - j1
    return dist


# ─────────────────────────────────────────────────────────────────────────────
# THE ORACLE — compose gate evaluators into one frozen pass/fail verdict.
# This is what the Auditor runs to "check work", and what the keep-or-swap
# test freezes as its arm-blind referee.
# ─────────────────────────────────────────────────────────────────────────────

def run_oracle(evaluators, record: dict, *, input_mapping=None) -> dict:
    """
    Run every gate evaluator over one work record and AND the results.

    Returns:
        {
          "passed":   bool,          # all gates passed
          "n_pass":   int,
          "n_fail":   int,
          "failures": [ {name, explanation}, ... ],
          "scores":   [ Score, ... ],  # every score, in evaluator order
        }

    A criterion that raises (e.g. a missing record key) is counted as a FAIL,
    not a crash — an oracle must be robust to malformed candidates.
    """
    scores: list[Score] = []
    failures: list[dict] = []
    n_pass = 0

    for ev in evaluators:
        try:
            for sc in ev.evaluate(record, input_mapping=input_mapping):
                scores.append(sc)
                if _is_pass(sc):
                    n_pass += 1
                else:
                    failures.append({"name": sc.name,
                                     "explanation": sc.explanation})
        except Exception as e:  # missing field, bad type, etc.
            nm = getattr(ev, "name", repr(ev))
            failures.append({"name": nm, "explanation": f"error: {e}"})
            scores.append(Score(name=nm, score=0, label="Error",
                                explanation=str(e), **_CODE))

    return {
        "passed": len(failures) == 0,
        "n_pass": n_pass,
        "n_fail": len(failures),
        "failures": failures,
        "scores": scores,
    }


def _is_pass(sc: Score) -> bool:
    """A gate score passes iff score==1 (or label truthy when score is None)."""
    if sc.score is not None:
        return float(sc.score) == 1.0
    return str(sc.label).lower() in {"true", "pass", "yes", "1"}


# ─────────────────────────────────────────────────────────────────────────────
# Self-test — run `python deterministic_evaluators.py` to validate everything.
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # Example: an Auditor freezes this oracle for a "return JSON with an id and
    # a non-empty summary under 40 words, no secret leakage, under budget" spec.
    oracle = [
        valid_json("valid-json"),
        json_has_keys(["id", "summary"], "has-id-and-summary"),
        contains_none(["sk-", "password"], "no-secret-leak"),
        within_budget(5000, "under-budget"),
    ]

    good = {"output": '{"id": 7, "summary": "concise result"}', "tokens": 1200}
    bad = {"output": '{"summary": "leaked sk-abc"}', "tokens": 9000}

    r_good = run_oracle(oracle, good)
    r_bad = run_oracle(oracle, bad)

    assert r_good["passed"] is True, r_good
    assert r_bad["passed"] is False
    assert {f["name"] for f in r_bad["failures"]} == {
        "has-id-and-summary", "no-secret-leak", "under-budget"}

    # spot-check individual factories
    assert exact_match(normalize=True).evaluate(
        {"output": " Hello ", "expected": "hello"})[0].score == 1
    assert max_levenshtein(1).evaluate(
        {"output": "cat", "expected": "car"})[0].score == 1
    assert covers(["a", "b"]).evaluate(
        {"output": "a,b,c"})[0].score == 1
    assert set_equals(["a", "b"]).evaluate(
        {"output": "b,a"})[0].score == 1
    assert matches_regex(r"^\d{3}-\d{4}$", fullmatch=True).evaluate(
        {"output": "555-1234"})[0].score == 1
    assert levenshtein_distance().evaluate(
        {"output": "cat", "expected": "cart"})[0].score == 1

    print("PASS: oracle good ->", r_good["passed"],
          "| oracle bad failures ->",
          sorted(f["name"] for f in r_bad["failures"]))
    print("All deterministic-evaluator self-tests passed.")
