# release-it-stability.p2q2 — graded attempt

- **Date:** 2026-08-09
- **Competency:** 1 — Stability Antipatterns & Stability Patterns (Release It! Ch 4–5)
- **Where:** Part 2 · Question 2 — the synchronized cache
- **Type:** applied
- **Mode:** online (typed in chat, screen available)
- **Exposure:** **taught** — this exact story was taught in chat, in full, shortly before the question was asked. Not a cold attempt, and not comparable to one.
- **Verdict:** partial — 5 of 12 elements
- **Miss codes:** `mechanism`, `phrasing`, `price`

## Question (verbatim from the bank)

A team speeds up a slow partner API by subclassing an existing in-memory cache and overriding get() to fetch on a miss. The parent's get() is synchronized . Code review passes, load tests pass. In production, when the partner API stops responding, the entire service hangs — even though only 2% of traffic touches that feature. (a) Explain the mechanism in one sentence. (b) Name the object-oriented principle violated and the one-line reason the compiler didn't stop it. (c) Give one code-level fix and one architectural fix, and say which one you'd ship tonight.

## Attempt (verbatim, uncorrected)

> 1. this is the retailer warehouse failure we studied. what happens is the parent get() is  synchronized, and the overrode get() gets calling to an already slow service, and the get() keeps waiting on the service to answer, holding the entire queue behind it
> 2. Liskov substitution principle - functional behaviour decomposes but concurrency doesn't compose.
> 3. tiemouts on each thread. \

## Frozen ideal (from the bank, registered 2026-07-27)

(a) One thread entered the inherited synchronized get() , called the dead partner API, and blocked there indefinitely while holding the monitor — so every other thread that touched the cache queued behind it, and eventually every request-handling thread on the box was blocked, regardless of which feature it was serving. (b) The Liskov substitution principle . Any property true of a type should hold for its subtypes, but the subclass turned a fast in-memory lookup into a blocking remote call under the same lock. The compiler allows it because Java and C# don't treat synchronisation as part of a method's contract — you can't even declare an interface method synchronized . The underlying reason: functional behaviour composes; concurrency does not. (c) Code-level, ship tonight: put a timeout on the remote call and take the remote call out of the critical section — synchronise only the map read and the map write, never the fetch. (A dedicated bounded thread pool returning a future for the fetch is the fuller version.) Architectural: a bulkhead — give this feature its own bounded thread pool or its own instances — plus a circuit breaker around the partner API so you stop calling it at all when it's sick, with a fallback of "availability unknown". Ship the timeout tonight; the architecture change wants a design conversation and a stakeholder decision about what the page shows when availability is unknown.

## Hit / miss checklist

| # | Element of the ideal | Result | Note |
|---|---|---|---|
| 1 | (a) A thread entered the **inherited** synchronized `get()` and called the dead partner API | ✅ hit | |
| 2 | (a) It blocked there indefinitely **while holding the monitor** | ✅ hit | Stated as "holding the entire queue behind it" — the lock is what is held, the queue is what forms; credited, wording flagged below |
| 3 | (a) Therefore **every request-handling thread on the box** blocked, regardless of which feature it served | ❌ miss | The 2%-vs-100% jump is the point of the scenario and was not made |
| 4 | (b) The **Liskov substitution principle** | ✅ hit | Named directly |
| 5 | (b) Its content: any property true of a type holds for its subtypes — and the subclass turned a fast in-memory lookup into a blocking remote call under the same lock | ❌ miss | Principle named, not stated, and the substitution that broke it not identified |
| 6 | (b) **Why the compiler didn't stop it**: Java and C# don't treat synchronisation as part of a method's contract — you can't even declare an interface method `synchronized` | ❌ miss | The question asked for the compiler's reason; what came back was the deeper reason (element 7) |
| 7 | (b) The underlying reason: functional behaviour composes; concurrency does not | ✅ hit | Delivered as "functional behaviour **decomposes**" — the wrong word, and it inverts the claim; credited on intent, flagged below |
| 8 | (c) Code-level: a **timeout on the remote call** | ✅ hit | Given as "timeouts on each thread" |
| 9 | (c) Code-level: **take the remote call out of the critical section** — synchronise the map read and write, never the fetch | ❌ miss | This is the fix that actually removes the defect; a timeout only bounds it |
| 10 | (c) Architectural: a **bulkhead** — own bounded thread pool or own instances | ❌ miss | No architectural fix offered |
| 11 | (c) Architectural: a **circuit breaker** around the partner API, with an "availability unknown" fallback | ❌ miss | |
| 12 | (c) **Which to ship tonight** — the timeout; the architecture change needs a design conversation and a stakeholder decision about what the page shows when availability is unknown | ❌ miss | |

**Score: 5 / 12. Partial — not a pass.**

## Miss codes

- **`mechanism`** — three mechanism steps went missing, and they are the load-bearing ones. Why a 2% feature takes 100% of the service: threads are a *shared* pool, so once every thread that touches the cache is parked, there is nothing left to serve the other 98% either — the feature's blast radius is the pool, not the feature. Why the timeout alone is not the fix: the defect is the remote call sitting *inside* the critical section; a timeout bounds how long the lock is held, it does not stop the lock being held across a network call. And the compiler's blindness is specific — synchronisation is not part of a method's contract in Java or C#, which is why the signature matched and review had nothing to see.
- **`phrasing`** — three places where the idea was present and the words were not. "Functional behaviour **decomposes**" should be *composes*, and as written it states the opposite of the point. "Holding the entire queue" should be *holding the monitor* — the queue is the symptom, the lock is the thing held. "Timeouts on each thread" should be *a timeout on the remote call* — the timeout belongs to the call, not the thread.
- **`price`** — no architectural option was put on the table, so there was nothing to choose between, and the "ship tonight" decision was not made. The reason that clause exists is that the two fixes have different costs: the timeout is a one-line change with a bounded blast radius, while the bulkhead-plus-breaker needs a product decision about what the page shows when availability is unknown. Naming a fix without naming what it costs or when to ship it is the whole of this code.

## Exposure caveat — this is the important finding

This story had just been taught in chat, in full, including the monitor, the LSP violation, the shared-pool blast radius, the critical-section fix and the bulkhead/breaker pairing. The attempt recognised the story immediately ("this is the retailer warehouse failure we studied") and then reproduced roughly the same fraction as the cold attempts did.

| Attempt | Exposure | Score |
|---|---|---|
| p1q1 | cold | 4/8 — 50% |
| p1q2 | cold | 5/10 — 50% |
| p2q1 | taught-adjacent | 7/12 — 58% |
| p2q2 | **taught, in full** | 5/12 — 42% |

Teaching produced **recognition**, not **recall**. That is a real signal and it argues against reading any of the recent movement as learning. It also means the taught-first route is not paying for itself here; cold attempt followed by targeted reread is the comparison worth running next.

## Repeated pattern — now four for four

| Attempt | The clause that went unanswered |
|---|---|
| p1q1 | "say which one you'd bet on" |
| p1q2 | "say why the two obvious fixes both fail" |
| p2q1 | "what carried each" and "why swapping them would not have worked" |
| p2q2 | "one architectural fix" and "say which one you'd ship tonight" |

Every question in the bank is three-part by construction, and the third part has now been dropped or half-answered four times running. This is the single highest-value thing to change, and it costs no new knowledge — the answers to several of these were available in the material already recalled.

## What to reread

Part 2's design-rules box — specifically *why* the remote call must leave the critical section — and the plain/expert phrasing table for "composes", "monitor" and where a timeout attaches. Then Part 4's trade-offs table for bulkhead and circuit breaker, which is where the ship-tonight decision comes from.
