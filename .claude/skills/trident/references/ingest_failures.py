"""
Trident · ingest a REAL failure log into the regression oracle
==============================================================

The regression suite must grow from *real* errors (not hypotheticals). This
turns a failure log you already have — e.g. a Claude/agent failure log exported
from your own machine — into red-then-green regression `Case` scaffolds for
`regression_oracle.RegressionOracle`.

Design rules (deliberate):
- **Path-agnostic.** You pass the log path at runtime (CLI arg or function
  param). No personal path is ever hardcoded here, so nothing about your machine
  leaks into the shared skill.
- **No data baked in.** This module ships only the parser + scaffolder. Your log
  content stays in your file; it is never copied into the skill.
- **Scaffold, don't fabricate.** A good deterministic criterion needs judgment
  (which predicate captures this failure?). This emits a `Case` stub with the
  real `known_bad` filled in and the criterion left as a TODO. `RegressionOracle.add`
  then enforces red-then-green, so a lazy or wrong criterion can't sneak in.

Accepted log formats (auto-detected):
- **JSONL** — one failure per line, any of these key spellings:
    {"input"|"trigger"|"prompt": ..., "bad_output"|"output"|"actual": ...,
     "note"|"reason"|"why": ...}
- **Text blocks** — records separated by a line of `---`; first line is the
  trigger, the rest is the bad output.

Usage:
    python ingest_failures.py /path/to/your/failure_log.jsonl
"""
from __future__ import annotations

import json
import sys
from typing import Any


def _first(d: dict, *keys, default: str = "") -> Any:
    for k in keys:
        if k in d and d[k] not in (None, ""):
            return d[k]
    return default


def parse_jsonl(text: str) -> list[dict]:
    out = []
    for i, line in enumerate(text.splitlines()):
        line = line.strip()
        if not line:
            continue
        rec = json.loads(line)
        out.append({
            "trigger": _first(rec, "input", "trigger", "prompt"),
            "bad_output": _first(rec, "bad_output", "output", "actual"),
            "reason": _first(rec, "note", "reason", "why", default="observed failure"),
        })
    return out


def parse_text_blocks(text: str) -> list[dict]:
    out = []
    for block in text.split("\n---"):
        block = block.strip()
        if not block:
            continue
        lines = block.splitlines()
        out.append({
            "trigger": lines[0].strip(),
            "bad_output": "\n".join(lines[1:]).strip(),
            "reason": "observed failure",
        })
    return out


def ingest(path: str) -> list[dict]:
    """Read a failure log from `path` (given at runtime) → normalized failures."""
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    # sniff: JSONL if the first non-empty line parses as a JSON object
    for line in text.splitlines():
        if line.strip():
            try:
                json.loads(line)
                return parse_jsonl(text)
            except Exception:
                break
    return parse_text_blocks(text)


def scaffold_cases(failures: list[dict]) -> str:
    """Emit red-then-green Case stubs; the Auditor fills each `evaluator=`."""
    lines = [
        "# Auto-scaffolded from a real failure log. For EACH case:",
        "#   1. pick a deterministic gate from deterministic_evaluators.py that",
        "#      FAILS on known_bad (red) and passes the fix (green),",
        "#   2. oracle.add(case)  # enforces red-then-green — proves it catches it.",
        "from regression_oracle import RegressionOracle, Case",
        "# from deterministic_evaluators import contains_none, json_has_keys, ...",
        "",
        "oracle = RegressionOracle()",
        "",
    ]
    for i, fx in enumerate(failures, 1):
        trig = json.dumps(fx["trigger"])[:200]
        bad = json.dumps(fx["bad_output"])[:400]
        reason = json.dumps(fx["reason"])[:200]
        lines += [
            f"# --- failure {i} ---  trigger: {trig}",
            f"oracle.add(Case(",
            f"    id={json.dumps(f'log-{i:03d}')},",
            f"    evaluator=...,  # TODO: gate that FAILS on the known_bad below",
            f"    known_bad={{'output': {bad}}},",
            f"    reason={reason}, source='prod'))",
            "",
        ]
    return "\n".join(lines)


if __name__ == "__main__":
    if len(sys.argv) == 2:
        failures = ingest(sys.argv[1])
        print(f"# ingested {len(failures)} real failures from {sys.argv[1]}\n")
        print(scaffold_cases(failures))
    else:
        # self-test on a SYNTHETIC in-memory sample (never touches real data)
        sample = [
            {"input": "summarize record 7", "output": '{"id": 7}',
             "note": "dropped the summary field again"},
            {"prompt": "build the user query", "actual": "SELECT * ... name = 'x'",
             "reason": "string-interpolated SQL"},
        ]
        text = "\n".join(json.dumps(r) for r in sample)
        got = parse_jsonl(text)
        assert len(got) == 2
        assert got[0]["trigger"] == "summarize record 7"
        assert got[0]["bad_output"] == '{"id": 7}'
        assert got[1]["reason"] == "string-interpolated SQL"
        scaffold = scaffold_cases(got)
        assert "log-001" in scaffold and "TODO" in scaffold
        print("parsed 2 synthetic failures; scaffold preview:\n")
        print(scaffold)
        print("All ingest self-tests passed (no real data used).")
