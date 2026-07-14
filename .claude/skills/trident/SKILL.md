---
name: trident
description: Spin up a two-subagent pre-build harness — Simba (Sonnet, user-intent drift detector) and the Auditor (Fable model) — and run a dependency-ordered, parallelized loop that spends 40% of the budget on problem discovery, 40% on writing a done/acceptance spec, and 20% on candidate proposals. The Auditor runs riskiest-assumption-tests first, drives a MECE unknown-unknown spec, and stewards context just-in-time; Simba continuously re-reads the user's messages to keep everything anchored to true intent. Trigger on "trident", "/trident", "spin up trident", "run trident on X", or when a fuzzy problem needs hardening into a precise spec before any code is written. Trident deliberately stops before implementation — its output is a battle-tested spec plus ranked proposals, not code.
---

# Trident — a pre-build spec-hardening harness

Trident is a three-pronged setup: **you (main Claude) are the handle**, and you drive two persistent subagents — **Simba** and the **Auditor** — through a tightly-scoped, dependency-ordered, parallelized loop. Its whole job is to convert a fuzzy request into a **precise, falsifiable spec** and a **short ranked set of proposals**, cheaply, before a single line of implementation.

**Trident does NOT implement.** It has no build phase. If the user wants code written, Trident hands off the spec and stops. The budget sums to 100% across discovery/spec/candidates precisely because building is out of scope.

## The three prongs

| Prong | Who | Model | One-line job |
|---|---|---|---|
| Handle | You (main Claude) | — | Orchestrate the loop, hold the budget ledger, integrate outputs. |
| Prong 1 | **Simba** | `sonnet` | User-intent drift detector. Re-reads every user message, keeps a live intent model, flags drift, feeds intent signal to the Auditor. Loyal to the user. |
| Prong 2 | **Auditor** | `fable` | RAT-lord (riskiest-assumption-test, always first), Edging-lord (MECE first-principles spec toward a razor-precise "done"), and context steward (JIT prune/loan). |

Full agent briefs — spawn each subagent with the corresponding file as its charter:
- Simba → `references/simba.md`
- Auditor → `references/auditor.md` (+ its evaluation toolkit: `references/auditor-evals.md`, `references/deterministic_evaluators.py`, and the vendored `references/hamel-evals-skills/`)

## How to spawn and keep them alive

1. **Spawn once, at the start.** Launch Simba and the Auditor in a single message (two `Agent` tool calls, so they start concurrently). Give each its brief from `references/` plus the raw problem statement and every user message so far.
   - Simba: `Agent(subagent_type: "general-purpose", model: "sonnet", prompt: <simba.md brief> + full user transcript)`
   - Auditor: `Agent(subagent_type: "general-purpose", model: "fable", prompt: <auditor.md brief> + problem statement)`
2. **Iterate with `SendMessage`, do not re-spawn.** A fresh `Agent` call starts cold and loses context; `SendMessage` to the existing agent keeps its working memory intact. This continuity IS the Auditor's context-stewardship capability — carry state forward, prune what's stale, loan a slice of context to the other agent when it asks.
3. **Simba runs continuously.** After every new user message, `SendMessage` it to Simba first ("re-read; has intent drifted?") before advancing the loop.

If the runtime has no Agent tool (rare), degrade gracefully: run Simba's and the Auditor's checklists inline as two explicit passes, clearly labeled, rather than skipping them.

## The budget — 40 / 40 / 20

Allocate the session's time-or-token budget across three phases. You cannot meter tokens exactly in-chat, so enforce the split with **checkpoint gates**, not a stopwatch. Keep a running ledger (see `references/budget-ledger.md`) and show it at each phase boundary.

| Phase | Share | Exit gate (advance only when BOTH true) |
|---|---|---|
| **1. Problem discovery** | 40% | Simba's intent model is stable (last two re-reads agree) **and** the Auditor's RAT has named the single riskiest assumption and its cheap test. |
| **2. Write the spec** | 40% | A written **definition of done / acceptance criteria** exists that is MECE (Auditor-verified) **and** Simba confirms zero drift from intent. |
| **3. Generate candidates** | 20% | ≥2 proposals ranked, each with its riskiest assumption RAT-tested and a Simba drift-check. |

**Gate discipline:** do not leave a phase early because it feels done — leave when the exit gate is met or the share is spent, whichever comes first. If a share is spent and the gate is unmet, say so explicitly and either request more budget or ship the phase's partial output flagged as incomplete. Never silently overspend one phase into another.

## The loop — dependency-ordered, parallelized, RAT-first

Within every phase run tightly-scoped loops. Two standing rules:

- **RAT always first.** Before any proposal or criterion is elaborated, the Auditor smells out its riskiest assumption and designs the tightest, lowest-cost test for it. No effort is spent building on an untested smelly assumption.
- **Simba always monitoring.** Simba's re-read of intent runs in parallel with everything and gates each phase exit.

Order work by dependency; parallelize siblings. The dependency graph:

```
              ┌─────────────────────────────────────────────┐
 Simba  ──►   │ continuous intent model (parallel, all phases)│ ──► gates every exit
              └─────────────────────────────────────────────┘
                       │ feeds intent to Auditor
                       ▼
 Phase 1  Auditor:RAT (riskiest assumption) ∥ Auditor:Edging (map unknown-unknowns, MECE)
   (40%)          └──────────────┬───────────────┘
                                 ▼  (both depend on stable intent)
 Phase 2  Auditor:Edging drafts done/acceptance ─► Auditor:RAT tests each criterion ∥ Simba drift-check
   (40%)                                  └──────────► converge to razor-precise spec
                                 ▼  (candidates depend on a locked spec)
 Phase 3  generate N proposals in parallel ─► RAT-first on each ∥ Simba drift-check ─► rank
   (20%)
```

Per-phase choreography:

**Phase 1 — Problem discovery (40%).** In parallel: Auditor(RAT) hunts the smelliest assumption in the request itself and drafts one cheap test; Auditor(Edging) maps the unknown-unknown space from first principles (MECE, no overlaps, no gaps). Simba builds the intent model and reconciles both against what the user actually wants. Loop until the Phase-1 gate.

**Phase 2 — Write the spec (40%).** Auditor(Edging) drives a written **definition of done + acceptance criteria**; each criterion is RAT-tested for its riskiest assumption; Simba confirms every criterion traces to real intent (no scope creep, no drift). The spec is the primary deliverable — make it MECE and testable. Loop until the Phase-2 gate.

**Phase 3 — Generate candidates (20%).** Produce ≥2 distinct proposals that satisfy the spec, in parallel. RAT-first on each (kill the dominated ones cheaply). Simba drift-checks each against intent. Rank by (intent-fit × assumptions-survived ÷ cost). Loop until the Phase-3 gate.

## Orchestrator rules (the handle)

- Show the **budget ledger** and current phase at every boundary.
- Route new user input to **Simba first**, then act.
- Never advance past a gate on vibes; state which gate condition is met.
- Keep each subagent's working set minimal — ask the Auditor to prune stale context and loan context between agents just-in-time.
- Trident's final output is a **spec + ranked proposals**, never code. Offer handoff, don't cross the line.

## Output contract

End a Trident run with exactly these, in order:
1. **Intent model** (Simba) — 3–5 bullets of what the user actually wants, plus any drift caught.
2. **Riskiest assumptions + their tests** (Auditor RAT) — ranked, each with a cheap test and its result/verdict.
3. **Definition of done / acceptance criteria** (Auditor Edging) — MECE, numbered, each testable.
4. **Ranked proposals** — ≥2, each with its surviving assumptions and rough cost.
5. **Budget ledger** — where the 40/40/20 actually went.

## Anti-patterns (refuse these)

- Writing implementation code. Trident stops at the spec.
- Elaborating a proposal before its riskiest assumption is RAT-tested.
- Advancing a phase because it "feels done" instead of meeting its gate.
- Re-spawning Simba/Auditor fresh each round (throws away their context — use `SendMessage`).
- Letting the spec drift from intent without Simba flagging it.
- A non-MECE spec (overlapping or gappy acceptance criteria).
- Silently overspending one phase's share into another.

## Is Trident actually worth it?

Trident is a hypothesis, not a doctrine. Before trusting it as your default, run the **keep-or-swap A/B test** in `references/keep-or-swap-test.md` — it pits Trident against a single spec-first generalist agent and measures time/tokens to a correct solution, with a null hypothesis you can actually reject. Keep Trident only if it beats the null.

To test the **Auditor specifically** against an authoritative code-checking auditor (Anthropic's `/security-review` / `/code-review`), use `references/auditor-battle.md` — a labeled-benchmark + McNemar protocol whose honest expected result is "no global winner, compose both": the deterministic oracle gates known defects, the generative auditor sweeps for unknown-unknowns.
