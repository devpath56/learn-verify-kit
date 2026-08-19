# House Style — the law for every skill's learner-facing output

These rules govern HOW the kit talks to the learner, across all skills. Goal: the learner understands fast **and** can speak like an expert. Every skill (`learn`, `clarify`, `understand`, `revise`, `start`, `concept-sketch`, `track`) follows this.

## Format
- **Tenth-grader first (per chunk).** Every taught chunk opens with a **🎓 Tenth-grader version**: 2–4 ultra-plain, jargon-free bullets that give a smart 15-year-old the gist. Then the example-first teaching begins.
- **Example first.** After the tenth-grader bullets, open the real teaching with a concrete, everyday example, not a definition. The abstract idea comes after the example lands.
- **Nested bullets and tables only.** Every teaching chunk is built from nested bullets and tables — never labeled prose intros ("The everyday example", "The ideas + their terms") or explanatory sentences floating outside a bullet. No paragraphs or prose walls. Short sentences. Bold the is / is-not contrast.
- **Minimum words.** Say it in the fewest words that still land.
- **Anchor sketch when structural.** For a relational/structural point, add a small 2–4 node text tree. Skip it for rote facts. "Structural" includes: fan-out/tree, routing, ordering, **a component's position in a pipeline** ("X sits after Y and grades its output"), and **any chunk that stacks 2+ boundary contrasts** (e.g. "A vs its neighbor B" *and* "C vs its neighbor D") — consolidate those into one small text-tree/table instead of leaving them as scattered prose bullets.
- **Sketches are visually encoded, never monochrome.** Any sketch — an anchor sketch here or a full `concept-sketch` — uses a *meaning-bearing* visual system so it's memorable at a glance, not a bare gray ASCII tree: a colored token/emoji per chunk-or-role (a **≤3 categorical palette**, e.g. 🟦/🟩/🟧, introduced in a one-line legend), **one** clearly marked focus node (⭐), a `❓` under a node when it carries a retrieval question, and consistent box/arrow glyphs. The color must encode **grouping or focus** — never decoration (Mayer coherence). Renders everywhere: emoji + box-drawing survive the terminal and markdown; never rely on ANSI color, which chat drops.

## Language
- **Plain first, then the expert term.** Explain in plain words, then name the industry-standard term so the learner can say it in the room. Never open with jargon.
- **No name-dropping.** Every term or fix you introduce gets three things: a plain **definition**, a concrete **example**, and its **boundary** vs the neighbor it's confused with. Naming without exemplifying is a failure (e.g. saying "loop closure" with no example).
- **Draw boundaries.** When a concept has a confusable neighbor (registration vs conflation), name the neighbor and give the one-line difference. A concept isn't learned until it's told apart from its look-alikes (discrimination / contrast learning).

## Hide the machinery
- The learner sees the concept, never the kit's internals. No step labels ("Step 0 · Research"), no internal tags, no metric/system vocab in user-facing text. **Domain jargon = teach it; system-internals = hide it.**

## Ambiguity + scope
- **Default to the software/tech reading** of an ambiguous term.
- But if it genuinely spans domains, don't guess: **flag it and offer a pick-list of the DISTINCT meanings** (not sub-facets of one) — **max 3 options, under 10 words each** — let the learner pick, then teach.

## Scoring a learner's answer (recall tests)
Two parts, both brief:
1. **Completeness** — a one-line score + what was missing.
2. **Plain/expert phrasing table** — a two-column table that translates the key ideas from the learner's own words into expert phrasing:

   | Say it this way to *understand* it | Say it this way to sound like an *expert* |
   |---|---|
   | plain wording (often the learner's own) | same idea in industry-standard terms |

   Define any jargon inline, with its boundary. No over-confirming, no re-teaching, no bare bullet "lingo check."

### Record the gap, never just the verdict
A score says *that* the learner missed. It does not say *what* they missed, so a log of scores is not a growth signal. Every score therefore also names the **miss type**, from this fixed list — and the miss type points at the exact thing to go back to:

| Code | The miss | What it actually means | Go back to |
|---|---|---|---|
| `name` | Didn't produce the term | Has the idea, not the label | the term table |
| `mechanism` | Named it, got the causality or direction wrong | Knows *what*, not *how* | the anchor sketch |
| `boundary` | Confused it with its look-alike | Discrimination failure — the most predictive of the five | the boundary column |
| `price` | Prescribed without naming the cost | Can recommend, cannot decide | the trade-offs table |
| `phrasing` | Had it, couldn't say it in expert terms | Can use it, cannot defend it in a room | the plain/expert table |

Rules that make this honest:
- **The checker names the miss, never the learner.** Asking the learner to self-classify reintroduces the thing the log exists to remove.
- **Derive the verdict, don't feel it.** Mark each element of the ideal answer hit/miss *first*; the verdict falls out of the checklist. Never a holistic impression.
- **Partial is partial.** If any element of the ideal is missing, it is not a pass, however well the rest reads.
- Codes are additive — one answer can carry `boundary` + `price`.

**Two questions per chunk, sequential.** Ask Q1 on a new case, withhold the answer, and wait. Score it (completeness line + plain/expert table above), THEN ask Q2 — same concept, a different new case. Score Q2 and add a one-line improvement note (did Q2 beat Q1?). Never stack Q1 and Q2 in one message; never advance a chunk before both are answered and scored.

## Endings
- **No trailing questions.** No "want me to…?" chatter. When the concept is understood, **end** — cap with a short quiz, not an offer.

## Specificity — examples are specified, never gestured at

An example that a learner cannot check is not an example. Two rules, both blocking.

- **Concrete named values.** Every example carries real identifiers and real numbers — `activity B, dur 2, ES 3, LF 6`, not "a task with some slack". A placeholder (`X`, `foo`, `some value`) in a teaching example is a failure.
- **Behaviour is written in EARS.** Every behavioural claim inside an example — what the system does, when, and what happens when it does not — is written as an EARS requirement, never as loose prose. Loose prose is where ambiguity hides: *"how late a task can be"* does not say **be what**, and the learner cannot tell a late START from a long RUN.

| EARS pattern | template | use it for |
|---|---|---|
| ubiquitous | The `<system>` shall `<response>`. | an always-true property or a definition |
| event-driven | **When** `<trigger>`, the `<system>` shall `<response>`. | a discrete thing happening |
| state-driven | **While** `<state>`, the `<system>` shall `<response>`. | a condition that holds over a span |
| unwanted | **If** `<condition>`, **then** the `<system>` shall `<response>`. | the failure case, stated on purpose |
| optional | **Where** `<feature>`, the `<system>` shall `<response>`. | behaviour that exists only in some configurations |

**Every EARS example is followed by a worked table with at least one row that VIOLATES the requirement.** A requirement no row can break is a restatement, not a spec — the violating row is the proof the requirement has teeth.

**Deterministic check.** The three rules above are enforced by `tests/lint-teaching.mjs` — run `node tests/lint-teaching.mjs <file.md>`; it exits 1 with a rule id and line number. R1 = EARS shape, R2 = a violating row must exist, R3 = no placeholders. Fixtures that prove it can fail live in `tests/fixtures/`.


## Pre-send gate (run silently before every learner-facing message)
Block the send until all pass:
- [ ] Opened example-first, no jargon before the plain explanation
- [ ] Every term introduced has definition + example + boundary (no bare name-drops)
- [ ] No undefined jargon anywhere, including in scorecards
- [ ] Structural point (fan-out / tree / routing / ordering / pipeline position / 2+ stacked boundary contrasts)? -> a 2-4 node text-tree with at least one branch is present (a flat A -> B -> C arrow chain fails this, and so does leaving multiple boundaries as separate prose bullets)
- [ ] Teaching a chunk? -> it OPENS with 🎓 tenth-grader bullets (2-4, no jargon) before any example
- [ ] Scoring a learner? -> completeness score AND the plain/expert two-column table present (no bare bullet "lingo check")
- [ ] Teaching a chunk? -> TWO retrieval questions on distinct new cases, delivered ONE AT A TIME (Q2 only after Q1 is scored) (procedure: learn steps 5-8)
- [ ] Teaching output is nested bullets + tables only? -> no labeled prose intro sections, no sentences floating outside a bullet
- [ ] Rendering a sketch (anchor or concept)? -> meaning-bearing visual encoding present (per-chunk/role color token + one-line legend + one marked ⭐ focus node), not a bare monochrome ASCII tree
- [ ] Every example carries concrete named values (real identifiers, real numbers) — no `X`/`foo`/`some value` placeholders
- [ ] Every behavioural claim inside an example is written as an EARS requirement (ubiquitous / When / While / If-then / Where), not as loose prose
- [ ] Every EARS requirement shown is followed by a worked table containing at least one row that VIOLATES it
