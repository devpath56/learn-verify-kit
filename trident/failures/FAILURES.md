<!-- GENERATED FILE — do not hand-edit. Rendered from failures.jsonl. -->
# Failures log (human view)

> This file is **generated** from `failures.jsonl`. Edit the JSONL (or use the `log failure`
> trigger); regenerate this view. Hand-edits are overwritten.

## How to read a row
`CF-###` · title · tags · **status** · one-line guard · detector kind.
Full pattern, PM implication, and trace live in the JSONL record.

## Index (seeded, sanitized sample — full migration pending design approval)
| CF | Title | Tags | Status | Detector | Guard |
|----|-------|------|--------|----------|-------|
| CF-004 | Hallucinated plausible facts | hallucination | guarded | hybrid | source-id every cited entity; pull-then-paraphrase |
| CF-005 | Bulk-refactor boundary breaks | bulk-refactor | guarded | deterministic | build+lint+smoke + boundary check after any bulk op |
| CF-007 | Literal-vs-meta miss | instruction-following | guarded | structural | confirm the goal before building |
| CF-009 | Long-session context decay | context-degradation | guarded | structural | enforce standing rules at the harness, not memory |
| CF-010 | Judge optimism bias | judge-bias | guarded | llm-judge | rubric scores, never free-form self-grade |
| CF-013 | Destructive over-eagerness | permission-model | guarded | deterministic | reversibility tier + approval + blast-radius |
| CF-015 | Name-collision wrong referent | hallucination | guarded | deterministic | rank by primacy; read before assert |
| CF-025 | False done-signal | instruction-following | guarded | structural | done ⇒ acceptance artifact, not handoff |
| CF-026 | No-op on a trigger | self-violation | guarded | deterministic | never no-op a non-empty message (emit-time) |
| CF-028 | No-op recurred post-guard | self-violation | recurred | deterministic | enforce the invariant at the boundary, not by memory |
| CF-034 | Inert (mounted) guard | tool-use | resolved | deterministic | mounted ≠ executing; verify the heartbeat |
| CF-044 | Unverified platform capability | tool-use | guarded | structural | confirm platform support before building |
| CF-046 | Narrated ≠ executed | self-violation | guarded | deterministic | write claim ⇒ tool call, same turn |
| CF-047 | Removal not set-scoped | self-violation | recurred | deterministic | grep entity across all touched files |
| CF-051 | Non-deterministic guard first | judge-bias | guarded | structural | deterministic fix is primary; state the ranking |
| CF-052 | Paraphrase as verbatim quote | hallucination | guarded | hybrid | quotes are verbatim; auditor fidelity pass before push |
