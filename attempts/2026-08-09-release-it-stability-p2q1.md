# release-it-stability.p2q1 — graded attempt

- **Date:** 2026-08-09
- **Competency:** 1 — Stability Antipatterns & Stability Patterns (Release It! Ch 4–5)
- **Where:** Part 2 · Question 1 — twelve instances in seven minutes
- **Type:** applied
- **Mode:** online (typed in chat, screen available)
- **Exposure:** taught-adjacent — the Part 2 blocked-threads story was taught in chat immediately before this question was asked. Not a cold attempt.
- **Verdict:** partial — 7 of 12 elements
- **Miss codes:** `mechanism`, `price`

## Question (verbatim from the bank)

Your recommendations service runs twelve instances behind a load balancer. At 14:02 one instance stops responding. By 14:09 all twelve are gone, and the gaps between failures got noticeably shorter each time. Upstream, the product-page service is also down — its own CPU and memory look normal, but its thread count is pinned at maximum. (a) Name the two distinct antipatterns at work. (b) Say which one travelled sideways and which travelled upward, and what carried each. (c) Give the one pattern that would have stopped each, and say why swapping the two patterns would not have worked.

## Attempt (verbatim, uncorrected)

> 1.  chain reaction makes all the twelve instance stop and cascading failure, makes it go upstream across layers to amke the page service go down.
>
> 2. chain ~ sideways + cascading ~ upwards.
> 3. chain ~ fix the root -cause/ autoscaling cascading ~ circuit breakers/ timeouts.

## Frozen ideal (from the bank, registered 2026-07-27)

(a) A Chain Reaction in the recommendations layer and a Cascading Failure into the product-page service. (b) The chain reaction moved sideways , carried by redistributed load : each death handed its share to identical peers running the same defective code, so every survivor got closer to the same cliff. The shrinking gaps between failures are the signature — that acceleration is exactly what the search-farm story charted. The cascade moved upward , carried by blocked threads : the product-page service's threads were parked waiting on a service that had stopped answering, which is why its CPU and memory looked fine while its thread count pinned. (c) Against the chain reaction: fix the underlying load-related defect — a leak or a race. Structurally, Bulkheads split the layer into pools so one chain reaction becomes two slower ones; health-checked autoscaling helps if the scaler reacts faster than the reaction propagates. Against the cascade: Circuit Breaker plus Timeouts on the calling side. Why swapping them fails: a circuit breaker in the recommendations layer wouldn't have saved it — the peers weren't calling each other, they were absorbing traffic. And bulkheads in the recommendations layer do nothing for its callers; bulkheads explicitly won't help the callers of whichever partition does go down — Circuit Breaker on the calling side is what covers them.

## Hit / miss checklist

| # | Element of the ideal | Result | Note |
|---|---|---|---|
| 1 | (a) Chain Reaction in the recommendations layer | ✅ hit | |
| 2 | (a) Cascading Failure into the product-page service | ✅ hit | |
| 3 | (b) The chain reaction travelled **sideways** | ✅ hit | |
| 4 | (b) Carried by **redistributed load** onto identical peers running the same defective code | ❌ miss | The question asked what carried each; no carrier given |
| 5 | (b) The **shrinking gaps** between failures are the signature of that acceleration | ❌ miss | The one detail in the scenario that proves it's a chain reaction went unused |
| 6 | (b) The cascade travelled **upward** | ✅ hit | |
| 7 | (b) Carried by **blocked threads** — which is why CPU and memory look fine while thread count pins | ❌ miss | Taught in chat minutes earlier; still not produced |
| 8 | (c) Against the chain reaction: fix the underlying load-related defect (leak or race) | ✅ hit | |
| 9 | (c) Structural mitigation for the layer — bulkheads to split it, health-checked autoscaling if the scaler outruns the reaction | ✅ hit | Autoscaling named; bulkheads omitted, and the omission costs element 12 |
| 10 | (c) Against the cascade: Circuit Breaker plus Timeouts on the calling side | ✅ hit | |
| 11 | (c) Why swapping fails, one way: a circuit breaker inside the recommendations layer saves nothing — the peers weren't calling each other, they were absorbing traffic | ❌ miss | Not attempted |
| 12 | (c) Why swapping fails, the other way: bulkheads in the recommendations layer do nothing for its callers — Circuit Breaker on the calling side is what covers them | ❌ miss | Not attempted |

**Score: 7 / 12. Partial — not a pass.**

## Miss codes

- **`mechanism`** — every carrier was skipped. The question asked *what carried each* and got direction only. Redistributed load is what makes the chain reaction inevitable (identical code, same defect, rising share); blocked threads are what let the crack jump the layer boundary, and they are the only reading that explains flat CPU beside a pinned thread count. The shrinking gaps went unused as evidence.
- **`price`** — the swap question is a limits question, and both directions were left blank. A circuit breaker protects a *caller* from a *provider*; peers absorbing redistributed traffic are neither, so it has nothing to interrupt. Bulkheads bound a blast radius *inside* a layer and explicitly do nothing for that layer's callers. Naming the right pattern without knowing where it stops working is prescription without price.

## Repeated pattern across three attempts

The final sub-part has now gone unanswered three times running:

| Attempt | What was dropped |
|---|---|
| p1q1 | "say which one you'd bet on" |
| p1q2 | "say why the two obvious fixes both fail" |
| p2q1 | "what carried each" **and** "why swapping them would not have worked" |

Recognition and naming are consistently landing. The justification half of each question is consistently not being attempted. That is the finding, and it is a process gap rather than a knowledge gap.

## Drift check

Scores across the three attempts: 4/8 (50%), 5/10 (50%), 7/12 (58%). The rise is small and this attempt was **taught-adjacent**, so it is not evidence of cold improvement. Notably, element 7 — blocked threads as the carrier — was taught in chat minutes before and still was not produced, which argues against reading the 58% as recall gain.

Improving: `boundary` has not recurred since p1q1 — sideways vs upward was drawn cleanly here without prompting.

## What to reread

Part 2's concept-boundary box, the "Direction · Carried by · Defence" table — specifically the **Carried by** column, which is the column being skipped — and the trade-off note that bulkheads do not protect a layer's callers.
