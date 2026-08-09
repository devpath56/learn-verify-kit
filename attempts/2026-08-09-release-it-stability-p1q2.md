# release-it-stability.p1q2 — graded attempt

- **Date:** 2026-08-09
- **Competency:** 1 — Stability Antipatterns & Stability Patterns (Release It! Ch 4–5)
- **Where:** Part 1 · Question 2 — the Monday-morning hang
- **Type:** applied
- **Mode:** online (typed in chat, screen available)
- **Verdict:** partial — 5 of 10 elements
- **Miss codes:** `mechanism`, `phrasing`

## Question (verbatim from the bank)

A nightly job holds a pooled TCP connection to a partner's service. It runs fine all week. Every Monday at 06:10 it hangs for about thirty minutes, then throws. No code has changed. The partner insists their service was up the whole time — and their logs prove it. (a) State your hypothesis in one sentence. (b) Name the single packet-level observation that would confirm it. (c) Give the cheapest fix and say why the two obvious fixes — validating the connection before use, or closing connections older than an hour — both fail.

## Attempt (verbatim, uncorrected)

> a. this is very much like the 5 am problem we learnt about, where the firewall reaped the entry, pkts dropped  silently, and no ICMP which is why they might think both ends are still connected.
> b. a pcoket capture on both ends, and a silence on this should be the proof.
> c. keep alive/ periodic ping at an interval should be shorted than the middlebox's clock,thru Oracle

## Frozen ideal (from the bank, registered 2026-07-27)

(a) The connection sat idle over the weekend and a firewall or NAT device reaped it from its state table , while both endpoints still believe the connection is valid. This is the 5 a.m. problem with a weekly period instead of a daily one. (b) Take a packet capture on both sides. The confirming observation is your side retransmitting the same segment with no response and no ICMP unreachable , and simultaneously nothing at all arriving at the partner's interface . The silence on the far side is the proof: the packets are being dropped in the middle, not rejected at the end. (This also explains why the partner's logs are honestly clean — their application never saw a thing.) (c) Cheapest fix: a keep-alive / periodic ping on the idle connection, at an interval shorter than the middlebox's idle timeout — the mechanism Oracle's dead connection detection provided. Configuring a read timeout is a necessary companion, so the failure at least becomes fast. Why the obvious fixes fail: a validation query before checkout travels over the same dead connection, so it hangs exactly as the real query would. Closing connections older than an hour requires sending a teardown packet over the same dead connection — which also hangs. Both "fixes" move the hang, they don't remove it.

## Hit / miss checklist

| # | Element of the ideal | Result | Note |
|---|---|---|---|
| 1 | (a) The connection sat **idle over the weekend** — which is what makes it Monday | ❌ miss | Named the mechanism but never accounted for the weekly period |
| 2 | (a) A firewall or NAT device reaped it from its **state table** | ✅ hit | Named directly |
| 3 | (a) Both endpoints still believe the connection is valid; it's the 5 a.m. problem | ✅ hit | Pattern recognised and named |
| 4 | (b) Packet capture on **both** sides | ✅ hit | |
| 5 | (b) Your side **retransmitting the same segment** with no response and no ICMP unreachable | ❌ miss | "No ICMP" delivered (in part a); the retransmission — the actual packet-level observation asked for — was not named |
| 6 | (b) Nothing arriving at the partner's interface; the far-side silence proves dropped-in-the-middle, not rejected-at-the-end | ✅ hit | Delivered, but without saying which side the silence is on |
| 7 | (c) Keep-alive / periodic ping at an interval **shorter than the middlebox idle timeout** | ✅ hit | Plus the Oracle dead-connection-detection reference |
| 8 | (c) A read timeout as the necessary companion, so the failure at least becomes fast | ❌ miss | |
| 9 | (c) Why validation-before-checkout fails: the validation query travels over the same dead connection and hangs identically | ❌ miss | Not attempted |
| 10 | (c) Why closing connections older than an hour fails: the teardown packet goes over the same dead connection and also hangs | ❌ miss | Not attempted |

**Score: 5 / 10. Partial — not a pass.** Sub-part (c)'s second half — the "why both obvious fixes fail" — went unanswered entirely.

## Miss codes

- **`mechanism`** — the unanswered half of (c) is a single mechanism question asked twice: *anything you send to test or tidy the connection goes over the connection*. A validation query hangs for the same reason the real query hangs; a teardown packet hangs for the same reason. Both proposals relocate the hang rather than removing it. Missing the read-timeout companion belongs here too — the keep-alive prevents the dead connection, the read timeout bounds what happens when prevention fails.
- **`phrasing`** — (b) had the right instinct and could not state the observation. "A silence on this" doesn't say which side is silent, and the far side being silent is the entire proof. The named observation is: *retransmits on our capture, nothing at all on theirs.*

## Improvement note vs Q1

Q1 scored 4/8, Q2 5/10 — the same proportion, so no measured gain yet, and I'm saying that rather than rounding it up. What did change: the `boundary` miss from Q1 did not recur — dropped-in-the-middle vs rejected-at-the-end was drawn correctly and unprompted. What repeated: in both answers the last sub-part went unanswered (the bet in Q1, the two refutations here). The pattern so far is recognition landing and the follow-through stopping short, not a knowledge gap about the antipattern itself.

## What to reread

Part 1, the trade-offs table on connection-pool hygiene — why validation queries and age-based eviction are not free — and the keep-alive vs read-timeout pairing.
