# release-it-stability.p1q1 — graded attempt

- **Date:** 2026-08-09
- **Competency:** 1 — Stability Antipatterns & Stability Patterns (Release It! Ch 4–5)
- **Where:** Part 1 · Question 1 — the fraud-scoring API
- **Type:** applied
- **Mode:** online (typed in chat, screen available)
- **Verdict:** partial — 4 of 8 elements
- **Miss codes:** `mechanism`, `boundary`

## Question (verbatim from the bank)

Your payments service calls an external fraud-scoring API. During an incident, monitoring shows CPU at 3%, memory flat, no errors in the application log — and yet every request-handling thread is occupied and the service returns nothing to anyone. (a) Name the failure mode at the integration point. (b) Explain why the absence of errors and the absence of load is the strongest clue you have. (c) Name the two settings you would check first, and say which one you'd bet on.

## Attempt (verbatim, uncorrected)

> a. slow failure producing blocked threads.
> b. bc the no CPU + no memory movement, suggests they are waiting in queue.
> c. to check socket read timeout and connection timeout

## Frozen ideal (from the bank, registered 2026-07-27)

(a) A slow failure at an integration point producing blocked threads . The provider accepted the connection and never responded, or the connection was silently torn down by something in the middle; either way the calling threads are parked inside a socket read. (b) The absences are the evidence. No errors means nothing has thrown yet, which rules out fast failure — a refused connection or a reset would have raised an exception immediately. No CPU and no memory movement rules out a leak, garbage-collection thrash, or an infinite loop; the threads aren't working, they're waiting. A process monitor will call this instance healthy, so you need thread dumps or an external synthetic transaction to see the truth. This is the "dog that didn't bark" pattern from the 5 a.m. story. (c) The socket read timeout and the connect timeout on the HTTP client — and behind them, the checkout timeout on any connection pool. Bet on the read timeout being unset or infinite: that's the common default, and it's the one that produces exactly this symptom. Full marks also for noting that if the client library hides the socket you may not be able to set it, which is itself the finding.

## Hit / miss checklist

| # | Element of the ideal | Result | Note |
|---|---|---|---|
| 1 | (a) Names slow failure at the integration point, blocked threads | ✅ hit | Named exactly |
| 2 | (a) Mechanism: provider accepted and never replied, or connection silently torn down; threads parked **inside a socket read** | ❌ miss | Answer located the wait in "a queue", not in the socket read |
| 3 | (b) No errors ⇒ nothing has thrown ⇒ rules out **fast** failure (refusal/reset raises immediately) | ❌ miss | The no-errors half of the clue was not addressed at all |
| 4 | (b) No CPU / no memory ⇒ threads are waiting, not working | ✅ hit | Correct inference, wrong locus for the wait |
| 5 | (b) A process monitor calls this instance healthy; needs thread dumps or an external synthetic transaction | ❌ miss | Not mentioned |
| 6 | (c) Socket read timeout | ✅ hit | |
| 7 | (c) Connect timeout | ✅ hit | |
| 8 | (c) The bet: read timeout unset/infinite, the common default | ❌ miss | Two settings listed, no pick — the question asked for one |

Bonus elements not required for a pass, both missed: the connection-pool checkout timeout behind the two client timeouts, and the "dog that didn't bark" framing.

**Score: 4 / 8. Partial — not a pass** (any missing element makes it partial, however well the rest reads).

## Miss codes

- **`mechanism`** — the direction of the reasoning. "Waiting in queue" is the wrong parking spot: the threads are blocked inside a socket read on a connection the provider already accepted. The queue reading implies backpressure from demand; the CPU numbers rule that out. Also: no pick in (c), which is the mechanism question restated (which default is commonly wrong).
- **`boundary`** — slow failure vs fast failure. The no-errors half of the clue exists precisely to tell those apart: a refused connection or a reset throws immediately, so silence is what makes this *slow*. Skipping it means the discrimination wasn't made.

## What to reread

The Part 1 boundary column — **fast failure vs slow failure**, and the anchor sketch showing where a blocked thread actually sits (socket read, not queue).
