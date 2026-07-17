# Vendored: Hamel Husain's Eval Skills

These skills are **not original to Trident**. They are vendored verbatim so the
Auditor can use them offline, with attribution as the MIT License requires.

- **Author:** Hamel Husain — https://hamel.dev
- **Source:** https://github.com/hamelsmu/evals-skills
- **Plugin version:** 0.2.0
- **Vendored at commit:** `814ebeae0ecef6151a4d3846e19ab123e1832137`
- **License:** MIT (see `LICENSE` in this folder — retained unmodified)
- **Course they complement:** AI Evals for Engineers & PMs (Parlance Labs)

## The seven skills
| Skill | What it does |
|---|---|
| `eval-audit` | Audit an eval pipeline, surface problems (missing error analysis, unvalidated judges, vanity metrics), prioritize fixes. Start here. |
| `error-analysis` | Read traces, build a catalog of how the system fails (open → axial coding). |
| `write-judge-prompt` | Design a binary Pass/Fail LLM-as-Judge for ONE subjective failure mode code can't check. |
| `validate-evaluator` | Calibrate an LLM judge against human labels (TPR/TNR, bias correction) before trusting it. |
| `generate-synthetic-data` | Dimension-based synthetic test inputs to cover the failure space when real data is sparse. |
| `evaluate-rag` | Evaluate retrieval + generation quality of a RAG system. |
| `build-review-interface` | Build a browser annotation tool to collect human Pass/Fail labels on traces. |

## Updating
Re-vendor from upstream when it changes:
```bash
git clone --depth 1 https://github.com/hamelsmu/evals-skills /tmp/evals-skills
cp -r /tmp/evals-skills/skills   ~/.claude/skills/trident/references/hamel-evals-skills/
cp    /tmp/evals-skills/LICENSE  ~/.claude/skills/trident/references/hamel-evals-skills/
# then update the commit SHA + version above
```
Do not edit the vendored `skills/` in place — keep them faithful to upstream so
attribution stays honest. Trident-specific guidance lives in
`../auditor-evals.md`, not inside these files.
