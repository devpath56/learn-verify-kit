# Trident — spec-hardening harness for Claude Code

Two subagents harden a fuzzy request into a battle-tested spec *before* any code.

- **Live now** (type `trident`, zero setup):
  - **Simba** guards your intent; **Auditor** finds the riskiest assumption + writes a MECE spec
  - Loop outputs a spec + ranked proposals, then *stops* before building
  - Deterministic code-evaluators + LLM-as-judge (via subagent), no dependencies
- **Proof** (real run, `rs-014`):
  - Caught a feature mislabeled "greenfield" — code had already shipped
  - Found a storage contradiction + blocking schema gap, before any code
