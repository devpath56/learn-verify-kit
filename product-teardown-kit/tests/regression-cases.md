# Product Teardown Kit — Regression Test Cases

**Intent: never repeat a failure the kit already made.** Every case pairs an **edge-case trigger** with a **binary PASS condition** and a **FAIL signature**. This is error-analysis-first eval design.

## Honesty about provenance (read this first)

This suite has two tiers, and they are not equally battle-tested:

- **Tier A — Inherited (real, observed).** These guard cross-cutting output rules that live in `house-style.md`, which was ported from the Learn·Verify Kit. Each traces to a *real* failure caught during that kit's 2026-07-07 live test. They transfer verbatim because the output law is shared.
- **Tier B — Teardown-specific (design seed).** These guard rules unique to teardown work (depth ≥ L2, name-the-rejected-alternative, fact-vs-inference, the fork, steal-this cards). They were written at construction from the kit's design, **not yet from an observed live failure.** They are marked **[seed]**. The discipline (below) is: on the first real teardown mistake, replace or augment the matching seed case with the actual trigger + bad output.

**The suite only ever grows from real errors going forward.** Seed cases are scaffolding to be earned into real ones — never invent a Tier-B case from a hypothetical once live testing has begun.

## How to run
Feed each trigger to the kit in a fresh chat, then check PASS/FAIL against the condition. Binary only. An LLM-as-judge can grade most (the FAIL signatures are the negative examples). Run before shipping any change.

## Tier A — inherited from the Learn·Verify Kit live test (real errors)

| ID | Guards against (real error) | Edge-case trigger | PASS (binary) | FAIL signature seen |
|----|------------------------------|-------------------|---------------|---------------------|
| **T-01** | Jargon-first opening | `tear down Cursor` | Lens 1 opens with the 🔎 plain take (jargon-free) before any term/citation | Opened with *"It leverages a speculative-decoding RAG pipeline…"* |
| **T-02** | Prose walls | any `tear down X` | Lenses use bullets/short lines; no paragraph > 3 sentences | Multi-sentence prose block per lens |
| **T-03** | Internal machinery leak | any `tear down X` | No step labels, no lens letter-codes, no metric vocab in reader text | Showed *"Lens A · L3 【probe: tool-design】"* |
| **T-04** | Verbose recall response | reader gives a partial answer to a transfer question | Reply is a brief scorecard (depth line + plain/expert table), not a paragraph | Multi-paragraph confirm + re-explain |
| **T-05** | Trailing question at end | any completed teardown | Ends with a final transfer quiz; no "want me to…?" offer | Ended with *"Want me to tear down a competitor next?"* |
| **T-06** | Undefined jargon in a response | a scorecard/card that introduces a new term | Any jargon used is defined inline with its boundary | Used "idempotent tool" with no definition |
| **T-07** | Structural point, no anchor sketch | `tear down how X's agent loop works` | A 2–4 node text-tree with ≥1 branch appears in the structural lens | Described the loop in prose, no sketch |
| **T-08** | One retrieval question instead of two | reader answers lens 1's transfer question | After scoring Q1, a Q2 on *another* product is asked before the next lens | Asked one question, then advanced |
| **T-09** | Scorecard uses a bare bullet "lingo check" | reader answers a transfer question in casual words | Scoring shows a depth line AND a plain/expert two-column table | Reported a bare bullet "lingo check" |
| **T-10** | Structural sketch has no branch | `tear down X's multi-agent fan-out` | The sketch is a text-tree **with ≥1 branch**, not a flat `A -> B -> C` chain | Drew a flat one-line arrow chain |

## Tier B — teardown-specific design guardrails [seed]

| ID | Guards against | Edge-case trigger | PASS (binary) | FAIL signature to watch for |
|----|----------------|-------------------|---------------|------------------------------|
| **T-11 [seed]** | Brochure restate (L0) | `tear down Linear` | Every load-bearing line names a choice **and the alternative rejected** (≥ L2); no feature-list restate | Listed features verbatim from the marketing page |
| **T-12 [seed]** | Bare mechanic, no why (stuck at L1) | `tear down X's streaming` | At least one claim reaches L3 — the constraint/bet behind the choice | Said "it streams tokens" and stopped |
| **T-13 [seed]** | Guess laundered as fact | `tear down a closed-source product's architecture` | Unverified claims are marked **(inferred)**; verified ones carry `[Source: …]` | Stated an internal detail as fact with no source or hedge |
| **T-14 [seed]** | Name-drop with no example | `tear down X` (introduces "MCP" / "RAG") | Every pattern gets definition + example-from-this-product + boundary | Said "it uses MCP" with no example or boundary |
| **T-15 [seed]** | No roadmap preview | any `tear down X` | A 3–4 bullet preview of the lenses appears **before** lens 1 | Jumped straight into lens 1 |
| **T-16 [seed]** | Forcing all four lenses | `tear down a simple CLI tool` | Covers only the lenses that matter for this product (≤4), not all four by rote | Padded GTM + agentic lenses onto a plain CLI with nothing to say |
| **T-17 [seed]** | No steal-this card | complete any teardown end-to-end | At least one 🧰 steal-this card (transferable + bounded + grounded example) is emitted | Ended with only a quiz, no portable card |
| **T-18 [seed]** | Steal-this card with no boundary | `what can I steal from X` | Each card names when it applies AND when it backfires | Card gave a slogan with no boundary |
| **T-19 [seed]** | Compare = two stapled summaries | `compare Cursor and Copilot` | Leads with the **fork** (opposite choices on a shared job) + the bet behind each, not two isolated descriptions | Described each product back-to-back, no divergence |
| **T-20 [seed]** | Winner crowned with no "for whom" | `which is better designed, X or Y` | Any "better" is scoped to a specific user + constraint | Declared X "just better" with no user named |
| **T-21 [seed]** | Silent wrong-product commit | `tear down Nova` (overloaded name) | Flags ambiguity + offers ≤3 distinct products before tearing down | Silently tore down the wrong "Nova" |
| **T-22 [seed]** | Single-cause / hindsight "why it won" | `why did Cursor win` | Names 2–3 contributing factors AND a would-be-wrong-if falsifier | Gave one tidy cause, no falsifier |
| **T-23 [seed]** | No failure-mode analysis | complete any teardown end-to-end | A "what would kill it" pass with 2–3 past-tense contributing factors is emitted | Ended on a present-tense snapshot, no kill-it pass |
| **T-24 [seed]** | Choice named with only upside | `tear down X's key design choice` | Names choice + rejected alternative **and at least one downside it still carries** | Listed only the benefits of the choice |
| **T-25 [seed]** | GTM lens misses anti-fit + unit economics | `tear down X's go-to-market` | Names who it's NOT for AND marginal cost / who owns the demand relationship | Only "who it's for" + pricing |
| **T-26 [seed]** | Missing evolution pass on a product that pivoted | `tear down Slack` (pivoted from a game) | One line on build-it-yourself → commodity + last pivot + next move; and correctly *skipped* for a brand-new tool with no pivot | Pure present-tense snapshot despite a known pivot |

## Coverage map (case → rule it protects)

- T-01, T-02 → plain-take-first, no prose walls (`house-style`)
- T-03 → hide machinery (`house-style`)
- T-04, T-09 → two-part scorecard / plain-expert table (`house-style`)
- T-05 → end-with-a-quiz (`house-style`)
- T-06, T-14 → define-jargon-inline + name/define/example/boundary (`house-style`)
- T-07, T-10 → anchor sketch, branched, when structural (`house-style`, `teardown`)
- T-08 → two-questions-per-lens, sequential (`teardown`, `house-style`)
- T-11, T-12 → depth floor ≥ L2, climb to L3 (`lens-rubric`, `house-style`, `revise`)
- T-13 → fact-vs-inference marking (`house-style`, `revise`)
- T-15 → lens preview before lens 1 (`teardown`)
- T-16 → pick only the lenses that matter (`teardown`, `lens-rubric`)
- T-17, T-18 → steal-this cards, bounded (`extract-patterns`, `house-style`)
- T-19, T-20 → the fork, scoped winner (`compare`)
- T-21 → ambiguity pick-list (`house-style`, `teardown`)
- T-22 → contributing-factors + falsifiability, not single-cause (`house-style`, `lens-rubric`)
- T-23 → the "what would kill it" pre-mortem pass (`teardown`, `house-style`)
- T-24 → road-not-taken carries its cost / downside (`house-style`, `lens-rubric`)
- T-25 → anti-persona + unit economics in the GTM lens (`lens-rubric`)
- T-26 → the evolution pass (`lens-rubric`, `teardown`)

## Adding a case
When the kit makes a new mistake: capture the trigger and the exact bad output as the FAIL signature, write the binary PASS, add a row. Promote a **[seed]** case to real by replacing its watched-for signature with the one you actually observed, and drop the `[seed]` tag. The suite only ever grows from real errors — never invented ones.
