# Building a booklet set for a role — the generalised playbook

`DECISIONS.md` governs **one booklet**. This file governs **a set of them**: how to pick the
competencies for a role, build each booklet the same way, record provenance in one place, and
register the questions so answers can actually be graded and stored.

It was calibrated on a 13-competency set for an **individual-contributor principal engineer**.
Nothing below is specific to that role or that subject matter. Wherever the text says *domain*,
substitute yours — clinical medicine, litigation, monetary policy, aircraft maintenance, product
management. The three things that make the method work are domain-independent:

1. **Retrieval, not rereading.** Questions on unseen cases, answers at the back, ruled write-lines.
2. **Spacing.** A review tracker in every booklet, and a durable log outside them.
3. **Pre-registered grading.** The ideal answer is frozen *before* an attempt exists.

---

## Part 0 · Define the set before you build anything

### 0.1 Pick the role, then decompose it

A set is the competencies of **one role at one level**. Not a syllabus, not a reading list, not a
library. The test: could a competent practitioner at that level be handed the set and recognise it as
a description of their job?

Decompose into competencies that each have a **natural end** — a question that stops being open. A
competency is not a topic; it is a body of judgement you either have or don't.

| Good competency | Bad competency | Why |
|---|---|---|
| "Diagnosing failure that spreads between components" | "Reliability" | The first ends; the second is a department |
| "Deciding what a contract term will do under stress" | "Contract law" | The first is a skill; the second is a shelf |
| "Reading a trial's stopping rules" | "Statistics" | The first has a boundary; the second has none |

**Size the set at 8–15.** Below 8 it isn't a role, it's a project. Above 15 nobody finishes, and the
last few are always the weakest — you will be padding.

### 0.2 One source per competency, chosen before writing

Every competency binds to a **specific, closed source**: chapters of one book, a standard, a set of
guidelines, a body of case law. Not "the literature."

- **Closed** — you can state its page range. An open-ended source produces an open-ended booklet.
- **Load-bearing** — a practitioner would accept it as authoritative in an argument.
- **Sized** — roughly 60–120 pages of source per booklet. Under 60 and you will pad; over 120 and
  you will abridge without admitting it.

Two to four chapters mapping onto four parts is the comfortable shape. One chapter stretched into
four parts is a warning sign that the competency is really a sub-topic of a larger one.

### 0.3 Fix the set-level conventions once

Before booklet one, decide and write down: the page size, the greyscale rule, the de-vendoring
policy (§2.3), the question count per booklet, and where provenance lives. Changing any of these at
booklet seven means re-rendering one through six or shipping an inconsistent set.

---

## Part 1 · Build one booklet

The pipeline below is the one that survived thirteen builds. Steps are ordered because each one is
cheaper than fixing what skipping it costs.

### 1.1 Extract and read the source **in full**

Extract to plain text, note where each chapter starts, and read all of it before writing a line.
Skimming produces the two defects that reviewers catch most often: **hedge drift** (§4.3) and
**example reuse in questions** (§4.2). Both come from writing while holding a summary in your head
instead of the text.

### 1.2 Chunk to exactly four parts on a causal spine

Four is a hard cap — working memory takes about four. The parts must form a story where part N+1
answers part N, and the ordering rationale goes in a table on the roadmap page so the reader can
predict what comes next.

**Never group by the source's own chapter order unless the causal spine happens to match it.** When
it does match, say so in the set's meta file so a later reader knows it was chosen, not inherited.

Leftovers go to back matter, never to a fifth part.

### 1.3 Write the body

Every part carries the same eleven elements in the same order (`DECISIONS.md` §C). The reader should
learn the rhythm by part two and navigate blind. Five are non-negotiable:

- **Tenth-grader box** — 2–4 jargon-free bullets. No expert term appears before this box closes.
- **Term table** — `name | plain definition | concrete example | boundary vs its look-alike`. The
  boundary column is the one that does the work: a term isn't learned until it's told apart from
  what it's confused with.
- **Anchor sketch** — monospace tree, exactly one inverted focus node, retrieval cues beneath.
- **Two retrieval questions** on cases that do **not** appear in the source, with write-lines.
- **One 2×2** whose axes are questions you can answer while the problem is in front of you, with
  exactly one focus cell and a `Move:` line in every cell.

The others — everyday analogy, one deep-dive story, trade-offs table, concept-boundary box,
plain→expert phrasing table — may be merged or trimmed when the material is thin.

### 1.4 Write the back matter

A fixed set, in this order: symptom → diagnosis → move; reverse mapping (practice → what it
counters); numbers worth remembering; glossary; **answer key**; spaced-review tracker; final quiz.

- Only glossary terms that **have a confusable neighbour** — the definition must draw the line.
- Every number states **why it wins an argument**, not just what it is.
- The answer key is a **separate section**, never on the same page or spread as a question. Say on
  the cover which section it starts at so the reader can cover it.
- The tracker is a day 1 / 3 / 7 / 16 / 35 grid, one row per independently testable idea.
- The final quiz is ~10 questions across all four parts, no notes, timed, with write-lines. **Its
  answers are not printed** — they live in the progress file (§3), which keeps the offline quiz
  honest while still gradeable.

### 1.5 Assemble and render

One self-contained HTML file — no external CSS, fonts, images or scripts. A booklet that fetches
anything is a booklet that breaks on a plane.

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=<Title>-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

Page setup: A4 portrait, 16mm/15mm margins, ~10.4pt serif body with sans headings. Cover carries the
print instruction: **100% scale, no "fit to page"**, duplex short-edge.

**Copy the head block from the template, not from a sibling booklet.** Copying from a sibling is how
a shipped booklet ended up with another booklet's `<title>` in its PDF metadata — see §4.6.

### 1.6 Verify (the gates in §4)

Nothing ships until every gate passes. Fix orphan pages by **tightening the copy upstream**, never
by inserting filler.

### 1.7 Register, record, document

- Register 18 questions into the progress file (§3).
- Add the provenance row and the works-referenced section to the set's meta file (§2).
- Write the folder README: contents table, parts list, spine paragraph, a note on scope, a note on
  styling, printing instructions, the regeneration command, and how to get quizzed.

**A booklet whose bank isn't registered is not finished** — it cannot be quizzed, so it is a
document rather than a study instrument.

---

## Part 2 · Meta details — one home, and it is never the booklet

### 2.1 The rule

> **No provenance, no method rationale, no construction commentary, no per-fact confidence tags —
> anywhere in any booklet.** All of it lives once, in the set's meta file.

This is not tidiness. It is the reader's print budget: repeating the same page of provenance in
thirteen booklets costs thirteen pages of paper to say one thing once. And a per-fact confidence tag
("published / extrapolated / estimated") offloads your editorial job onto the reader — if a number
isn't trustworthy enough to print unqualified, don't print it.

Also barred from booklets: **kit-internal vocabulary** (no step labels, no tool names, no word for
the unit of a booklet), **trailing offers** (end on a quiz, not on "want me to…"), and **numbers
with no use**.

### 2.2 What the meta file holds

`META.md` at the set root. Four things, and nothing that belongs in a booklet:

**(a) The set spine** — one row per competency:

| # | Competency title | Folder | Source: author(s), work, edition, chapters *with their individual authors and editors* | Status |
|---|---|---|---|---|

Name chapter authors individually where the source is an edited collection. "Chapter 12 of X" loses
who wrote it, and that is exactly the information a citation exists to preserve.

**(b) Works referenced inside competency N** — one section per booklet, listing everything the
source names that the booklet deliberately does **not**. Written as descriptions rather than names:
"the continuous-build systems that preceded and replaced one another", "the annual disaster-recovery
war game". This is the audit trail for the de-vendoring decision; without it, "we left things out"
is unfalsifiable.

**(c) The de-vendoring line for competency N** — the explicit statement of what this booklet names
and what it doesn't, plus every declared exception and its grounds.

**(d) Known gaps** — every deliberate deviation from the rules, every defect found after shipping,
and what was done about it. This section is the set's memory. It should grow.

### 2.3 De-vendoring — decide the line, then declare it

Sources are thick with employers, products, internal tools, people, and brand names. Almost none of
it is the transferable unit. The default is: **name the concept, describe everything else by what it
does** — "a mocking framework", "the annual war game", "a static-analysis annotation".

Keep a name only when **the name is the transferable unit** — vocabulary a practitioner will meet
again, elsewhere, under that name. Eponymous laws, named typologies, standard command structures,
canonical model names.

Every kept name is a **declared exception**, recorded in the meta file with its grounds. Thirteen
booklets produced seven distinct de-vendoring lines, from "named nothing at all" to "named the
concepts plus one eponymous law". The line may move between competencies; what may not move is
declaring it.

### 2.4 Scanning before commit

Grep for the leaks that matter in your setup — absolute paths, personal identifiers, machine names,
internal project codenames — every time, before every commit. It costs one command.

---

## Part 3 · The progress file — answering and storing

### 3.1 Two logs, kept separate

| File | Scope | Questions come from |
|---|---|---|
| `progress.json` (repo root) | concepts taught in conversation | invented fresh each time, on a new case |
| `resources/competency-progress.json` | the printed booklets | **only** the registered bank |

Conflating them destroys the second one's guarantee. The booklet log's whole value is that every
question has a **pre-registered** ideal; a log that also accepts improvised questions cannot claim
that any more.

### 3.2 Schema

```
{
  "version": 2,
  "what_this_is":  "...",              // one line, so a stranger can read the file cold
  "set":        { "size": N, "registered": n, "remaining": N-n },
  "bank_scope": "applied + quiz only — 8 applied + 10 final-quiz per booklet (18)",
  "conventions":  { "question_id": ..., "frozen_ideal": ..., "attempt_mode": ... },
  "how_it_runs":  [ ... ],             // the pick order and grading procedure, in the file
  "status_rules": { "untested": ..., "shaky": ..., "comfortable": ..., "stale": ... },
  "miss_codes":   { "name": ..., "mechanism": ..., "boundary": ..., "price": ..., "phrasing": ... },
  "set_rollup":   { ... },
  "competencies": [
    {
      "id": "<slug>", "index": N, "title": "...", "booklet": "resources/<slug>/",
      "registered": "<ISO date>", "parts": ["...", "...", "...", "..."],
      "rollup": { "untested": 18, "shaky": 0, "comfortable": 0,
                  "gaps": {...}, "weakest": null },
      "questions": [
        { "id": "<slug>.p1q1", "type": "applied", "where": "Part 1 · Question 1",
          "prompt": "<verbatim from the booklet>",
          "ideal":  "<verbatim from the answer key, or written at registration for quiz items>",
          "status": "untested", "streak": 0, "last_verdict": null,
          "last_attempted": null, "miss_codes": [], "attempts": [] }
      ],
      "retired": [ /* same shape, plus "retired" date and "retired_reason" */ ]
    }
  ]
}
```

**The rules embedded in the file matter as much as the data.** `how_it_runs`, `status_rules` and
`miss_codes` live *in* the JSON so that grading is mechanical and auditable rather than a matter of
whoever is holding the file that day.

### 3.3 Registration — done once, before any attempt exists

Extract the 18 questions programmatically from the booklet HTML (strip tags, unescape entities,
collapse whitespace) rather than retyping them. Retyping introduces drift that the sync check in
§4.4 will then flag forever.

- **Stable ids**: `<competency-id>.<local-id>`, **never reused**.
- **A frozen ideal for every question, inline.** For the applied cases this is the printed answer
  key. For the final quiz — whose answers are deliberately not printed — **write the ideals at
  registration**, before any attempt exists, in deliberately different prose from the booklet's.
- Update `set.registered` and `set.remaining`.

**Changing a question after registration:** a materially changed question gets a **new id** (`p1q2`
→ `p1q2b`) and the old one moves to `retired` with a `retired_reason`. Never overwrite. Across
thirteen booklets, eleven questions were retired this way — every one because it reused a source
example (§4.2) or asked for something the booklet never named. The retired array is the honest
record that the bar was enforced.

### 3.4 Answering — the maker–checker loop

The learner is the **maker**; the grader is the **checker**. The learner never grades their own
answer and never classifies their own miss. Handing either job back collapses the split.

1. **Take the attempt in any form** — typed, photographed handwriting, dictated. Absorb the friction
   at capture; friction here is what kills the loop.
2. **Grade mechanically.** Checklist each element of the frozen ideal hit/miss, *then* derive the
   verdict and the miss codes. Verdict first is how grading becomes a vibe.
3. **Never grade by re-reading the booklet.** Grade against the stored `ideal`. Otherwise editing or
   re-rendering a booklet silently moves the goalposts.
4. **Miss codes** — five, each pointing at the exact page to reread:

   | Code | Meaning | Send them back to |
   |---|---|---|
   | `name` | didn't produce the term | the term table |
   | `mechanism` | named it, got causality or direction wrong | the anchor sketch |
   | `boundary` | confused it with its look-alike | the boundary column |
   | `price` | prescribed without naming the cost | the trade-offs table |
   | `phrasing` | had it, couldn't say it in expert terms | the plain→expert table |

   Miss codes are the growth signal. Scores rising while miss counts don't fall means the checker is
   drifting — **say so plainly** rather than reporting the improvement.
5. **Record the mode** — `online` (typed in chat) or `offline` (written cold in the booklet).
   Writing with no screen is the harder test; keep the two visible rather than averaged.
6. **Batch intake.** Offline answers arrive a part or a booklet at a time. Grade the batch in one
   pass, file each attempt verbatim, then give **one consolidated miss profile** — the batch shows
   patterns a single answer cannot. Never treat an incomplete batch as full coverage.

### 3.5 Storing

**Evidence** → `attempts/<YYYY-MM-DD>-<slug>.md`, containing: the question verbatim; **their attempt
verbatim and uncorrected** — never tidied, never paraphrased; the frozen ideal; the hit/miss
checklist; the miss codes; one line on what to reread.

The uncorrected attempt is what lets a third party audit the grading. A log of only verdicts is the
checker marking their own marking.

**Rollup** → the question row (`status`, `streak`, `last_verdict`, `last_attempted`, `miss_codes`,
`attempts`), the competency `rollup`, and `set_rollup`. Status is derived from `status_rules`, never
assigned by feel:

- `untested` — no attempts
- `shaky` — attempted, and either the last verdict wasn't a pass or the streak is under 2
- `comfortable` — 2+ consecutive passes
- `stale` — **derived at read time, never stored**: comfortable but last attempted >35 days ago

**Say "stale", not "shaky".** A comfortable item past its window is *unverified*, not failed.
Conflating them inflates the deficit list and makes the log less trustworthy, not more.

**Commit scoped to the log and the attempts** — never folded in with content or template edits.
The commit is what makes the record survive to another day.

### 3.6 Asking — on demand, never on a schedule

There is no timer and no scheduler. The learner asks; you read the file and pick.

1. **Report the standing in two lines**: how many untested / shaky / comfortable, and which miss code
   is heaviest. They should never have to ask how they're doing.
2. **Pick, don't invent.** Order: `untested` → `shaky` → `comfortable` whose `last_attempted` is over
   35 days old. Never two in a row from the same part.
3. **Ask one, verbatim** from `prompt`. Withhold `ideal`.
4. If they want a genuinely new case, say plainly that you are **stepping outside the bank and that
   the grading is weaker for it**.

Never nag, never open a session by launching into a quiz uninvited.

---

## Part 4 · Verification gates

Every gate has a number so a review can cite one. None is optional, and each exists because
something shipped without it.

### 4.1 Ink-based orphan check

Rasterise every page and flag any whose ink stops above **45% of page height**. Character counting
is not sufficient: a page carrying only ruled write-lines extracts as *zero* characters, and a
heading stranded at the foot of a page extracts as fine.

**Known blind spot:** the check cannot see a page ending in a lone table header row, because a header
sits below the 45% floor. Guard it in CSS instead — `table tr:first-child { break-after: avoid }`
alongside `h3 { break-after: avoid }`.

Fix flagged pages by tightening copy upstream. Two traps: an "edit" that reflows text without
deleting lines saves nothing, and in a CSS grid, **rows equalise to the tallest cell** — trimming a
short cell changes no height at all.

### 4.2 Unseen-case check on every question

Every applied question must present a situation the reader has **not** seen worked through in the
source. Recognition of a source example is not retrieval — it tests whether they read.

This is the single most-violated rule in the set, and it is violated *invisibly*: the question reads
beautifully, because the source's own examples are the best-crafted ones available. Check each
question against the source text specifically, not from memory of having written it.

The source's examples belong in the **teaching**, where they are the right tool. The constraint is
on questions only.

### 4.3 Hedge diff against the source

For every prescriptive or quantitative claim, compare the booklet's certainty against the source's.
Anything the source qualifies — "probably", "almost certainly", "often", "we recommend", "our
experience suggests", "mostly", "one way to think about this" — **stays qualified**.

The hardest defect to notice, because the sentence still reads well and reads *better* without the
hedge. Also flag in the same pass: any number that differs from the source, and any stated personal
practice or single team's habit that has been generalised into a rule.

### 4.4 Answer-key ⇄ bank sync

Re-extract the printed answers and question text from the HTML and assert they are **byte-identical**
to the stored `prompt` and `ideal`. Run it **after every re-render**, not once at registration — the
learner is graded against the JSON copy, so a booklet edit that doesn't reach the bank silently moves
the goalposts.

In the same pass: assert **no quiz ideal appears anywhere in the booklet**. Slide an 80-character
window across each ideal and check none of them occurs in the rendered text. This is what keeps the
unprinted final quiz genuinely unprinted.

### 4.5 Legend ⇄ artwork

Every sketch legend must describe what is actually rendered. **Exactly one inverted token per
sketch, exactly one focus cell per 2×2.** Count them mechanically — a second inverted token is
signal inflation, and it appears easily when a sketch is edited late.

### 4.6 The metadata gate

Check the document title, and anything else living **above `<body>`**.

This exists because a booklet shipped with another booklet's `<title>` in its PDF metadata: its head
block had been copied from a sibling rather than from the template. Every other gate passed. The
reason is worth internalising — **the head is the one region of the file that neither the page check
nor any structural count ever reads.** Whatever your gates measure, ask what region of the artifact
they never touch.

### 4.7 Structural counts and scans

Mechanical, cheap, run every build: section counts against the expected anatomy; question boxes
against answer-key entries; write-lines present; **zero** emoji, colour hue, kit-internal vocabulary,
personal data, or filesystem paths.

### 4.8 Independent review before shipping

Have a **different reader** review the built PDF against the source, briefed with the gate numbers
above and given the source file. Brief them to be adversarial and to report nothing that is already
correct.

This is where the expensive defects were caught — every hedge-drift and unseen-case violation in the
set was found by an independent pass, not by the builder. **Then verify each finding yourself against
the source before acting.** Reviews contain false positives, and accepting one costs you a correct
passage.

---

## Part 5 · Sizing, calibrated across thirteen builds

| Input | Output |
|---|---|
| ~95 source pages | ~50 booklet pages (≈1 booklet page per 2 source pages) |
| 4 parts | ~6 pages each |
| Back matter | ~14 pages |
| Retrieval load | 8 applied + ~14 sketch-node cues + 10 quiz questions |
| Tracker rows | 32–36 for a 45–50 page booklet; ~40 once past 55 pages |

If a part runs past **8 pages**, the grouping axis is wrong — you have two parts pretending to be
one. If a part is under **4 pages**, it is a section of another part.

Deviate where the material demands it, and **record the deviation in the meta file**. An unrecorded
deviation is indistinguishable from an error six months later.

---

## Part 6 · What thirteen builds actually taught

Findings that cost something to learn, in the order they'd bite a new set.

1. **Read the whole source before writing.** Every hedge-drift and example-reuse defect traced back
   to writing from a summary.
2. **The best-written questions are the most suspect.** A question that flows unusually well is
   often the source's own example wearing new nouns.
3. **Fix orphans upstream, never with filler.** Filler is visible on paper and teaches nothing.
4. **Verify the gates cover the whole artifact.** §4.6 shipped because every check read `<body>` and
   nothing read above it.
5. **Sync the template back.** Fixes made in a booklet must return to the scaffold, or the scaffold
   becomes a museum piece. Diff the template's head against a real booklet's head periodically.
6. **Use absolute paths in build scripts.** Working-directory assumptions between steps silently
   produce no-op edits — an entire edit round can "succeed" and change nothing.
7. **Write a tolerant string-replacement helper** that tries both the entity and the literal form of
   typographic characters and *collects misses* rather than aborting. Em-dashes and curly quotes will
   otherwise consume an afternoon.
8. **Record every deviation as you make it**, not at the end. The ones you don't write down are the
   ones you'll later mistake for bugs.
9. **The retired array is a feature.** Eleven retirements across thirteen booklets is not sloppiness
   — it is the visible trace of a bar being enforced. A set with an empty retired array either had
   perfect questions or wasn't checking.

---

## Appendix · Build checklist

Copy per booklet.

```
[ ] Source extracted, chapter offsets noted, READ IN FULL
[ ] Four parts fixed on a causal spine; ordering rationale written
[ ] Body: 11 elements per part, 5 non-negotiable ones present in all four
[ ] Back matter: 7 sections
[ ] Applied questions checked against source — no reused examples (4.2)
[ ] Final-quiz ideals written (not printed in the booklet)
[ ] Assembled from the TEMPLATE head, not a sibling booklet
[ ] Rendered; title and metadata correct (4.6)
[ ] Ink-based page check: 0 flagged (4.1)
[ ] Hedge diff against source (4.3)
[ ] Legend ⇄ artwork: one inverted token per sketch, one focus cell per 2×2 (4.5)
[ ] Structural counts + emoji/hue/vocabulary/path scans (4.7)
[ ] 18 questions registered, ids stable, ideals frozen inline
[ ] Answer-key ⇄ bank sync + quiz-ideal leak check: 0 problems (4.4)
[ ] Meta: spine row, works-referenced, de-vendoring line, known gaps
[ ] Folder README written; set-level index updated
[ ] Personal-data / path scan clean
[ ] Independent review; findings verified against source before acting (4.8)
[ ] Re-render, re-run 4.1 and 4.4, commit
```
