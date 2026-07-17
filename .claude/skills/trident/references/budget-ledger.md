# Budget ledger — enforcing 40 / 40 / 20

You cannot count tokens exactly from inside a chat, so Trident enforces its split with a **visible ledger + checkpoint gates** instead of a stopwatch. The handle keeps this ledger and prints it at every phase boundary.

## Fixing the unit at the start
At kickoff, pick the budget unit the user gave you, in this order of preference:
1. An explicit token target ("+300k", "spend ~200k") → 40/40/20 of that many output tokens.
2. An explicit time box ("30 minutes", "one hour") → 40/40/20 of the wall-clock.
3. Nothing given → use **rounds** as the unit. Default to 10 loop-rounds total → 4 discovery / 4 spec / 2 candidates. State this assumption out loud so the user can override.

## The ledger (print this each boundary)
```
TRIDENT BUDGET LEDGER            unit: <tokens | minutes | rounds>   total: <N>
─────────────────────────────────────────────────────────────────────────
Phase 1  Problem discovery   40%  │ ████████░░  spent 3/4   gate: MET / UNMET
Phase 2  Write the spec      40%  │ ░░░░░░░░░░  spent 0/4   gate: —
Phase 3  Generate candidates 20%  │ ░░░░░░░░░░  spent 0/2   gate: —
─────────────────────────────────────────────────────────────────────────
now in: Phase 1   ·   overall spent: 3/10
```

## Gate rules
- **Advance only** when the phase's exit gate is met (see SKILL.md) OR its share is fully spent — whichever comes first.
- **Share spent, gate unmet** → stop and say so explicitly. Offer two choices: (a) grant more budget to this phase (and note it's borrowed from a later phase), or (b) ship the phase's partial output flagged `INCOMPLETE — <what's missing>`.
- **Gate met early, share unspent** → advance immediately; do not pad. Roll leftover share forward and note it (later phases may use it).
- **Never** silently drain one phase's share into another. Every reallocation is announced in the ledger.

## Context-steward hook (the Auditor's Hat 3)
Each boundary, ask the Auditor for a one-line context report: what it pruned (stale intermediates dropped), what it's holding live, and what it loaned to Simba/handle. This keeps the working set small so the token unit above stays honest.
