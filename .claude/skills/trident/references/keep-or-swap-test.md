# Keep-or-Swap test — is Trident actually worth it?

Trident is a hypothesis. This is the experiment that tells you whether to **keep** it or **swap** back to its nearest neighbor. Do not trust the harness because it feels rigorous — make it earn its place by beating the null.

## The two arms
- **Arm A — Trident:** the full setup (handle + Simba + Auditor, 40/40/20, RAT-first loops) produces the spec, then that spec is implemented to a correct solution.
- **Arm B — Baseline (nearest neighbor):** a **single spec-first generalist agent** — one model, no drift-detector/auditor split — told to "write a done/acceptance spec first, then solve it." Same model access, same task, no Trident scaffolding.

Arm B is the *nearest* neighbor on purpose: it also does spec-first, so a win for A isolates the value of the **two-agent architecture** (drift detection + RAT-first auditing), not merely the value of "think before coding."

## Primary metric (pre-registered)
**Total cost to a correct solution**, measured two ways, from identical problem statement to an accepted result:
- `tokens_to_correct` — total output tokens across every agent/turn in the arm, summed end-to-end (Trident's discovery+spec+candidates **plus** the downstream implementation cost). This is the headline metric.
- `wallclock_to_correct` — total elapsed time, as a secondary readout.

"Correct" = passes a **pre-written, arm-blind acceptance oracle** (see below). Cost only counts if the arm reaches correct; a non-correct arm is scored as a failure, not a cheap win.

## Hypotheses
- **H0 (null):** Trident does **not** lower the cost to a correct solution. `median(tokens_A) ≥ median(tokens_B)`.
- **H1:** Trident lowers it. `median(tokens_A) < median(tokens_B)`.

You keep Trident only by **rejecting H0**. If you cannot reject it, swap back — the scaffolding isn't paying for itself.

## Protocol (removes the obvious confounds)
1. **Task set.** Pick **N ≥ 8** real tasks representative of your work, each with genuine ambiguity (that's where a drift-detector + RAT should pay off). Trivially-specified tasks won't discriminate the arms — don't pad with them.
2. **Pairing + randomization.** Run **every task through both arms**. Randomize which arm goes first per task (coin flip you record in advance) to cancel learning/order effects. Fresh session per arm — no shared context leakage.
3. **Freeze the oracle before running.** For each task, write the acceptance criteria (the "correct" oracle) **before** either arm runs, and do not edit them afterward. Build it as a concrete evaluator suite — `run_oracle([...], record)` from `deterministic_evaluators.py` for code-checkable criteria, plus validated LLM judges for subjective ones (see `auditor-evals.md`). This is the single most important anti-cheat: if Trident is allowed to define "done" and then be graded against its own definition, the test is rigged. The oracle is the referee, external to both arms, and it grades both arms with the identical `run_oracle` call.
4. **Blind grading.** Whoever/whatever checks "correct" sees only the final solution, not which arm produced it and not the transcript.
5. **Rework counts.** Cost accrues until the oracle passes. If an arm ships something that fails the oracle and needs another pass, that extra cost is part of its total — this is exactly where Trident's front-loaded spec is supposed to win back its cost.
6. **Cap runaway arms.** Set a per-arm ceiling (e.g. 3× the median baseline cost). An arm that hits the cap without passing the oracle is a failure at cap-cost.

## Decision rule (pre-registered — decide this before you look at results)
- Compute the **paired per-task delta** `Δ = tokens_A − tokens_B` for each task.
- **Reject H0 (KEEP Trident)** if the median Δ is negative **and** a Wilcoxon signed-rank test on the paired deltas gives **p < 0.05**, with at least a **15% median cost reduction** (a statistically-real-but-trivial win isn't worth the operational overhead of running two agents).
- **Fail to reject (SWAP back to the single spec-first agent)** otherwise.
- **Tiebreak / secondary:** if tokens are a wash but Trident wins clearly on **correctness rate** (fewer failed-oracle tasks) or on `wallclock_to_correct`, record that — it may justify keeping Trident for high-stakes tasks even at equal token cost. Note it explicitly; don't let it silently override the primary rule.

## Meta note (following the user's own test discipline)
This experiment holds Trident to the same bar Trident holds its proposals to: a **falsifiable claim, a cheap decisive test, and a pre-committed verdict**. If you find yourself wanting to move the oracle or the threshold after seeing results, that itself is the smelliest assumption — RAT it, don't rationalize it.
