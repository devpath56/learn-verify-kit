# LVK booklet kit — single-file edition

**To the human:** give this file to a Claude Code session together with your source material
(the chapters for one competency, as PDF or text) and say "build my booklet from this". Everything
else — the scaffold, the page checker, the method — is embedded below.

**To the agent (Claude Code):** this file is your runbook. The human supplies a source and
decisions; you do the construction. The **Playbook** section below is the rulebook — every decision
id (A1–J) and gate (I4–I13) it defines is binding. This protocol is the order of operations.

## Execution protocol

**Step 0 — extract the tools.** Two `## Artifact:` sections sit at the end of this file. Write each
fenced block to disk **verbatim** under `resources/booklet-template/` (create it if absent):
`skeleton.html` and `check-pages.py`. Verify: `skeleton.html` renders to a valid multi-page PDF
untouched, and `check-pages.py --help` runs. Environment needed: a headless Chromium/Chrome,
`python3`, `pdftoppm` (poppler-utils). Find the browser binary before you need it.

**Step 1 — ingest the source, completely.** Extract to plain text, note where each chapter starts,
and read all of it before writing anything. Not a skim: the two defects that survive to review —
hedge drift (I9) and reused examples in questions (E1) — both come from writing against a mental
summary instead of the text.

**Step 2 — propose the shape, then wait.** Give the human: a one-sentence learning goal (A3), four
parts on a causal spine with the ordering rationale (B1–B3), and the de-vendoring line you intend
(§2.3). Get agreement before writing teaching copy — B2 wrong costs a rewrite.

**Step 3 — write the body.** `resources/<slug>/body.html`, following the Part anatomy (C) for all
four parts and the back-matter set (H). Work in a scratch directory with **absolute paths** —
relative paths across tool calls silently no-op. Teaching content is traceable to the source (A2);
invented material appears only in the retrieval questions, which must be cases the source never
worked through (E1). Write the 10 final-quiz ideals now, in prose deliberately unlike the
booklet's — they are registered in Step 6, never printed (H).

**Step 4 — assemble and render.** `booklet.html` = the head of `skeleton.html` (never a sibling
booklet's head — that is how gate I11 earned its existence) + your body. Set the `<title>`. Render
per §1.8, then loop `check-pages.py` (I5) until 0 pages flagged — fixing by tightening copy
upstream, never by filler. Two traps: an edit that reflows without deleting lines saves nothing,
and CSS grid rows equalise to the tallest cell.

**Step 5 — run the mechanical gates.** I4 (rasterise and look), I10 (count inverted tokens and
focus cells — exactly one each per sketch/matrix), I11 (title and everything above `<body>`),
I12 (structural counts; zero emoji, hue, kit vocabulary, personal data, paths). Then the judgement
gate I9: diff every prescriptive and quantitative claim against the source — every hedge stays.

**Step 6 — register the bank.** 18 questions into `resources/competency-progress.json` (create
from the §3.2 schema if absent) — extracted **programmatically** from the HTML, stable ids, frozen
ideals inline. Run gate I8: booklet⇄bank byte-identical, and no quiz ideal reproduced in the
booklet (80-character window).

**Step 7 — record.** `META.md` (create from §2.2 if absent): spine row, works-referenced section,
de-vendoring line, known-gaps entries for every deviation. Folder README. No meta in the booklet
itself (G1–G5).

**Step 8 — independent review (I13).** Spawn a subagent with fresh context. Give it the rendered
PDF or body, the full source text, and the gate numbers; brief it to be adversarial and report
nothing that is already correct. **Verify each finding against the source yourself before acting**
— reviews contain false positives, and accepting one deletes a correct passage. Fix, re-render,
re-run I5 and I8, and retire-and-reissue (new id, `retired_reason`) any question a finding kills.

**Step 9 — deliver.** Commit (scoped sensibly), hand the human the PDF, and report what the review
found and what you did about it. The booklet is finished when the bank is registered and the gates
pass — not before.

Throughout: when replacing text in HTML, use a tolerant helper that tries both entity and literal
forms of typographic characters (`&mdash;` vs `—`) and collects misses instead of aborting.

---

# Playbook — building a booklet set

Everything needed to take a role, decompose it into competencies, and ship a printable study
booklet for each one with a durable, gradeable progress log behind it. Front to back, one file.

Calibrated on a 13-competency set for an **individual-contributor principal engineer**. Nothing
below is specific to that role or that subject matter — wherever the text says *domain*, substitute
yours: clinical medicine, litigation, monetary policy, aircraft maintenance, product management.
Three things make the method work, and none of them are domain-dependent:

1. **Retrieval, not rereading.** Questions on unseen cases, answers at the back, ruled write-lines.
2. **Spacing.** A review tracker in every booklet, and a durable log outside them.
3. **Pre-registered grading.** The ideal answer is frozen *before* an attempt exists.

**On the decision ids.** Entries labelled `A1`–`J` are stable anchors. They are cited from
`META.md` and from this folder's README — a note recording a deliberate deviation says "against
decision J" or "which decision E1 forbids". Renumber them and those citations dangle, and **changing
a rule's text without changing its id is worse than renumbering**: the citation still resolves, but
to a rule that no longer says what the citing note assumed. New decisions extend a series; they
never renumber it, and an existing decision's substance is amended only deliberately and with the
citing notes updated in the same change.

Companion file: `skeleton.html`, the greyscale print scaffold with these decisions already encoded
as empty structure. Copy it, fill the `{{placeholders}}`, render.

**About this edition.** This is the compiled single-file transfer of the three-file bundle
(`BUILDING-A-SET.md` + `skeleton.html` + `check-pages.py`). The tools are embedded as
`## Artifact:` sections at the end; the execution protocol above tells the agent to extract them
first. Generated by `compile-transfer.py` — edit the sources, never this file.

---

# Part 0 · Define the set

## 0.1 Pick the role, then decompose it

A set is the competencies of **one role at one level**. Not a syllabus, not a reading list, not a
library. The test: could a competent practitioner at that level be handed the set and recognise it
as a description of their job?

Decompose into competencies that each have a **natural end** — a question that stops being open. A
competency is not a topic; it is a body of judgement you either have or don't.

| Good competency | Bad competency | Why |
|---|---|---|
| "Diagnosing failure that spreads between components" | "Reliability" | The first ends; the second is a department |
| "Deciding what a contract term will do under stress" | "Contract law" | The first is a skill; the second is a shelf |
| "Reading a trial's stopping rules" | "Statistics" | The first has a boundary; the second has none |

**Size the set at 8–15.** Below 8 it isn't a role, it's a project. Above 15 nobody finishes, and the
last few are always the weakest — you will be padding.

## 0.2 A · Scope

| # | Decision | Rule | Fails as |
|---|---|---|---|
| A1 | What counts as one booklet? | **One competency that has a natural end.** A source covering a whole mechanism end-to-end is one booklet; a topic slice is not. If you can't write a one-sentence learning goal, the scope is wrong. | A booklet that is a reading list |
| A2 | How faithful to the source? | Every example, number, story and quotation in the **teaching** is traceable to the source. Invented material is confined to the **retrieval questions**, where being unseen is the point. | Teaching that quietly drifts into your own opinions |
| A3 | What is the learning goal? | Write it as **four things the reader can do**, phrased as verbs against a realistic prompt ("given a description of the situation, you can name / locate / prescribe / price"). Put it on the first content page. | A goal like "understand X", which nothing can test |

## 0.3 One source per competency, chosen before writing

Every competency binds to a **specific, closed source**: chapters of one book, a standard, a set of
guidelines, a body of case law. Not "the literature."

- **Closed** — you can state its page range. An open-ended source produces an open-ended booklet.
- **Load-bearing** — a practitioner would accept it as authoritative in an argument.
- **Sized** — roughly 60–120 pages per booklet. Under 60 and you will pad; over 120 and you will
  abridge without admitting it.

Two to four chapters mapping onto four parts is the comfortable shape. One chapter stretched into
four parts is a warning sign that the competency is really a sub-topic of a larger one.

## 0.4 Fix the set-level conventions once

Before booklet one, decide and write down: page size, the greyscale rule, the de-vendoring policy
(§2.3), the question count per booklet, and where provenance lives. Changing any of these at booklet
seven means re-rendering one through six or shipping an inconsistent set.

---

# Part 1 · Build one booklet

The pipeline below survived thirteen builds. Each step is cheaper than fixing what skipping it
costs.

## 1.1 Extract and read the source **in full**

Extract to plain text, note where each chapter starts, and read all of it before writing a line.
Skimming produces the two defects reviewers catch most often — **hedge drift** (I9) and **example
reuse in questions** (E1). Both come from writing while holding a summary in your head instead of
the text.

## 1.2 B · Chunking

| # | Decision | Rule | Fails as |
|---|---|---|---|
| B1 | How many parts? | **Four, hard cap.** Working memory takes about four. A source with twenty-three named items still gets four parts. | Twenty-three sections, none retained |
| B2 | What is the grouping axis? | Group by **mechanism or lifecycle position**, never by the source's own chapter order and never alphabetically. Pick the axis that lets part N+1 answer part N. | Parts that are bins, so nothing connects |
| B3 | What order? | The parts must form a **causal story** — e.g. where it starts → how it spreads → what triggers it → what stops it. Say the ordering rationale in one table on the roadmap page. | An arbitrary order the reader can't predict |
| B4 | Where do the leftovers go? | Anything that doesn't fit the four parts goes to **back matter** (lookup table, glossary, numbers), not into a fifth part. | Scope creep back to a reading list |

Getting B2 wrong costs a rewrite, not an edit. Settle it before writing any teaching copy.

Where the causal spine *does* happen to match the source's own chapter division, that is fine — but
say so in the meta file, so a later reader knows it was chosen rather than inherited.

## 1.3 C · Part anatomy — identical in every part

The reader should learn the rhythm by part two and navigate blind. Fixed sequence:

1. **Part header** — big numeral, title, one-line scope.
2. **Tenth-grader version** — 2–4 jargon-free bullets. No expert term may appear before this box closes.
3. **One everyday analogy** — a phone call, a bridge, a supermarket, a house. Concrete before abstract, always.
4. **Term table** — `name | plain definition | concrete example | boundary vs its look-alike`.
   The **boundary column is non-negotiable**: a term isn't learned until it's told apart from what it's confused with.
5. **One deep-dive story per part, maximum** — the case that makes the mechanism unforgettable.
6. **Trade-offs table** — `decision | buys you | costs you | choose it when`. Every technique costs something; say what.
7. **Concept-boundary box** — states what the thing **is not**, in the reader's likely wrong words.
8. **Anchor sketch** — monospace tree, one reversed focus node, retrieval cues beneath.
9. **Plain → expert phrasing table** — "say it this way to understand it" / "say it this way to sound like an expert".
10. **Two retrieval questions** with write-lines (§1.5).
11. **One 2×2** (§1.4) and a one-paragraph carry-out rule.

> **Rule:** if a part is missing any of 2, 4, 8, 10, 11, it isn't finished. Items 3, 5, 6, 7, 9 may
> be merged or trimmed when the material is thin, but never items 2, 4, 8, 10, 11.

## 1.4 D · The 2×2 — the highest-leverage decision in the booklet

| # | Decision | Rule | Fails as |
|---|---|---|---|
| D1 | What are the axes? | Both axes must be **questions you can answer while the situation is in front of you** ("how fast did it fail?", "which way did it travel?", "did the pressure come from inside or outside?"). Not taxonomy labels. | A classification chart nobody consults |
| D2 | Are the axes clean? | Binary, orthogonal, and **every item from the part lands in exactly one cell**. If an item straddles, the axis is wrong. | Cells that overlap, so the matrix decides nothing |
| D3 | Which cell is the focus? | **Exactly one**, and it should be the most dangerous or most consequential — not the most common. Mark it by inversion, nothing else. | Four equal cells, no signal |
| D4 | What goes in a cell? | Three things, in order: a **name**, 2–4 **concrete instances**, and a **`Move:` line** saying what to do. A cell without a move is a label. | A matrix that describes instead of directs |
| D5 | What sits under the grid? | One **"read it as"** line naming the gradient — where danger rises, which column is a technical problem and which is a coordination problem. | A grid the reader has to interpret alone |
| D6 | The master 2×2 | The consolidating matrix must be **transferable outside the domain**. If it only works for this subject it's a summary, not a decision card. Pair it with a one-sentence thumb rule and three examples from outside the domain. | A "key takeaways" slide |

## 1.5 E · Retrieval questions

| # | Decision | Rule | Fails as |
|---|---|---|---|
| E1 | How many, and about what? | **Two per part**, on cases that do not appear in the source. Recognition of source examples is not retrieval. | Testing whether they read, not whether they know |
| E2 | Question shape | Three parts every time: **(a) name it · (b) explain the mechanism or direction · (c) prescribe, and say why you rejected the near-miss alternative.** Part (c) is what separates knowing from listing. | Questions answerable by keyword match |
| E3 | Where do answers live? | A **separate section at the back**, never on the same page or spread. Say on the cover which section it starts at, so the reader can cover it. | Eyes slide to the answer; no retrieval happens |
| E4 | Write-lines | Ruled blank lines under every question — **the applied cases and the final quiz alike**. On paper, if there is nowhere to write, nobody writes. | A booklet that gets read, not worked |
| E5 | Answer length and content | Written at the length of a good design-review answer. Each answer must **also name the rejected alternative** and why it fails. | Answers that confirm rather than teach |

**On E2 — a recorded deviation.** Competencies 9–13 of the calibrating set added a **(d)**: rule on
a proposal or plan stated in the scenario. It is deliberate — a stated bad plan is the hardest thing
to assess by keyword — and it is worth inheriting, but E2 is left as written so the deviation stays
visible rather than being quietly absorbed. Whichever shape you choose, choose it before booklet
one and record it.

## 1.6 H · Back matter — fixed set

| Section | Purpose | Rule |
|---|---|---|
| Symptom → diagnosis → prescription | The working reference | One row per observable symptom, phrased as **what you see**, not what it is |
| Reverse mapping | Prescription → what it counters | Lets the reader audit a system rather than diagnose one incident |
| Numbers worth remembering | Argument ammunition | Each row states **why it matters in an argument**, not just what it is |
| Glossary | Cold definitions | Only terms that **have a confusable neighbour**; the definition must draw the line |
| Answer key | Retrieval, honestly | Separate section, worked answers, rejected alternatives named |
| Spaced-review tracker | Spacing is half the method | Day 1 / 3 / 7 / 16 / 35 grid; one row per testable item; a fails column |
| Final quiz | Whole-competency retrieval | No notes, timed, ~10 questions, drawn across all four parts |

**The final quiz's answers are not printed.** They are written at registration into the progress
file (§3.3). This keeps the offline quiz honest — gradeable, but not self-checkable on paper.

## 1.7 F · Visual system — greyscale print

| # | Decision | Rule | Fails as |
|---|---|---|---|
| F1 | Colour | **None.** Distinctions are carried by fill level, border weight, border style, type weight, and inversion. | A booklet that only works on a screen |
| F2 | Inversion | Reserved for **one role: focus**. One inverted element per sketch, one per matrix. Never decorative. | Signal inflation; nothing stands out |
| F3 | Emoji | **Never.** They render as colour glyphs and print as grey blobs, and double-width ones destroy monospace alignment. Use words. | Smudges where the signal was |
| F4 | Monospace art | Inside a tree, style with **weight and inversion only** — no padding, no borders, no wide glyphs. Anything that changes advance width breaks the alignment. | Diagrams that shear on render |
| F5 | Box vocabulary | Small and fixed: **plain-version** (heavy left rule) · **boundary** (mid-grey left rule) · **quotation** (double left rule, italic) · **action / carry-out** (full black border) · **question** (full black border). Five, no more. | A page of undifferentiated grey panels |
| F6 | Photocopier test | No distinction may rest on **fill alone**. Every fill difference is backed by a border or a label. | Third-generation photocopies that read as one tone |

## 1.8 I1–I3 · Assemble and render

| # | Decision | Rule |
|---|---|---|
| I1 | Format | **One self-contained HTML file** — no external CSS, fonts, images or scripts. A booklet that fetches anything is a booklet that breaks on a plane. |
| I2 | Page setup | A4 portrait, 16mm/15mm margins, ~10.4pt serif body with sans headings. Print instruction on the cover: **100% scale, no "fit to page"**, duplex short-edge. |
| I3 | Pagination | `break-inside: avoid` on every box, question, sketch, matrix and table row. Use **one `.page` section per part**, not one per sub-topic — every forced break is a chance for the preceding page to end early, and a long table spilling one row into a section of its own is the usual cause of an orphan. Set **`h3 { break-after: avoid }`** so a sub-heading can never end a page, and **`table tr:first-child { break-after: avoid }`** so a header row can never end one either. **Break at part boundaries and let the rest flow.** When a rule pushes a tall sketch to the next page and leaves the preceding one short, shorten the sketch — do not remove the rule. |

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=<Title>-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

**Copy the head block from `skeleton.html`, never from a sibling booklet.** Copying from a sibling
is how a shipped booklet ended up carrying another booklet's `<title>` in its PDF metadata — see I11.

Then run every gate in Part 4. Nothing ships until they all pass. Fix orphan pages by **tightening
the copy upstream**, never by inserting filler.

## 1.9 I6–I7 · Register and record

| # | Decision | Rule |
|---|---|---|
| I6 | Register the question bank | Extract the **8 applied cases + 10 quiz questions** into the progress file as a new competency entry, with stable ids (`<competency-id>.<local-id>`) and a **frozen ideal stored inline for every one** (§3.3). Concept-sketch node questions stay in the booklet as cues and are not tracked. If the printed answer key doesn't cover the final quiz, write those ideals here, before any attempt exists. **A booklet whose bank isn't registered cannot be quizzed, so it isn't finished.** |
| I7 | Record provenance in the set spine | Add the competency's row to `META.md` — source, edition, chapters and page range, plus the works it cites. This is the only place provenance is allowed to exist (G1), so skipping it loses the information rather than tidying it. |

Then write the folder README: contents table, parts list, spine paragraph, a note on scope, a note
on styling, printing instructions, the regeneration command, and how to get quizzed.

---

# Part 2 · Meta details — one home, and it is never the booklet

## 2.1 G · What must not be in a booklet

| # | Rule | Why |
|---|---|---|
| G1 | **No provenance, no method rationale, no construction commentary.** No "built from", no citations for the study method, no explanation of why the booklet is shaped this way. | This lives **once**, in the meta file for the whole set. Repeating it in every booklet costs the reader paper on every print to say one thing once. |
| G2 | **No per-fact confidence tagging** — nothing like "each number is tagged published / extrapolated / invented". | If a number isn't trustworthy enough to print unqualified, don't print it. Tagging offloads your editorial job onto the reader. |
| G3 | **No kit-internal vocabulary** — no step labels, no tool or skill names, no word for the unit of a booklet (in the calibrating set the banned words were "chunk" and "competency"). The reader sees the subject, never the machinery. | Internal vocabulary makes the reader decode the tool instead of the topic. |
| G4 | **No trailing offers.** End on a quiz, not on "want me to…". | An offer at the end converts a study session into a conversation. |
| G5 | **No numbers without a use.** A number earns its place only if it wins an argument. | Trivia crowds out the numbers that matter. |

## 2.2 What the meta file holds

`META.md` at the set root. Four things, and nothing that belongs in a booklet:

**(a) The set spine** — one row per competency:

| # | Competency title | Folder | Source: author(s), work, edition, chapters *with their individual authors and editors* | Status |
|---|---|---|---|---|

Name chapter authors individually where the source is an edited collection. "Chapter 12 of X" loses
who wrote it, and that is exactly what a citation exists to preserve.

**(b) Works referenced inside competency N** — one section per booklet, listing everything the
source names that the booklet deliberately does **not**. Written as descriptions rather than names:
"the continuous-build systems that preceded and replaced one another", "the annual disaster-recovery
war game". This is the audit trail for the de-vendoring decision; without it, "we left things out"
is unfalsifiable.

**(c) The de-vendoring line for competency N** — what this booklet names and what it doesn't, plus
every declared exception and its grounds.

**(d) Known gaps** — every deliberate deviation from these rules, every defect found after shipping,
and what was done about it. This section is the set's memory. It should grow.

## 2.3 De-vendoring — decide the line, then declare it

Sources are thick with employers, products, internal tools, people and brand names. Almost none of
it is the transferable unit. The default: **name the concept, describe everything else by what it
does** — "a mocking framework", "the annual war game", "a static-analysis annotation".

Keep a name only when **the name is the transferable unit** — vocabulary a practitioner will meet
again, elsewhere, under that name. Eponymous laws, named typologies, standard command structures,
canonical model names.

Every kept name is a **declared exception**, recorded in the meta file with its grounds. Thirteen
booklets produced seven distinct de-vendoring lines, from "named nothing at all" to "named the
concepts plus one eponymous law". The line may move between competencies; what may not move is
declaring it.

## 2.4 Scanning before commit

Grep for the leaks that matter in your setup — absolute paths, personal identifiers, machine names,
internal project codenames — every time, before every commit. It costs one command.

---

# Part 3 · The progress file — answering and storing

## 3.1 Two logs, kept separate

| File | Scope | Questions come from |
|---|---|---|
| `progress.json` (repo root) | concepts taught in conversation | invented fresh each time, on a new case |
| `resources/competency-progress.json` | the printed booklets | **only** the registered bank |

Conflating them destroys the second one's guarantee. The booklet log's whole value is that every
question has a **pre-registered** ideal; a log that also accepts improvised questions cannot claim
that any more.

## 3.2 Schema

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
`miss_codes` live *in* the JSON so grading is mechanical and auditable rather than a matter of
whoever is holding the file that day.

## 3.3 Registration — done once, before any attempt exists

Extract the 18 questions **programmatically** from the booklet HTML (strip tags, unescape entities,
collapse whitespace) rather than retyping them. Retyping introduces drift that the sync check (I8)
will then flag forever.

- **Stable ids**: `<competency-id>.<local-id>`, **never reused**.
- **A frozen ideal for every question, inline.** For the applied cases this is the printed answer
  key. For the final quiz — whose answers are deliberately not printed — **write the ideals at
  registration**, before any attempt exists, in deliberately different prose from the booklet's.
- Update `set.registered` and `set.remaining`.

**Changing a question after registration:** a materially changed question gets a **new id** (`p1q2`
→ `p1q2b`) and the old one moves to `retired` with a `retired_reason`. Never overwrite. Across
thirteen booklets, eleven questions were retired this way — every one because it reused a source
example (E1) or asked for something the booklet never named. The retired array is the honest record
that the bar was enforced.

## 3.4 Answering — the maker–checker loop

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

## 3.5 Storing

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

**Commit scoped to the log and the attempts** — never folded in with content or template edits. The
commit is what makes the record survive to another day.

## 3.6 Asking — on demand, never on a schedule

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

# Part 4 · I4–I13 · Verification gates

None is optional. Each exists because something shipped without it.

| # | Gate | Rule |
|---|---|---|
| I4 | Rasterise and look | **Never trust the HTML.** Check at minimum a part opener, a matrix page, a sketch page and the cover, as images. |
| I5 | Ink-based orphan check | Run **`check-pages.py BOOKLET.pdf`** (in this folder): it rasterises every page and flags any whose ink stops above **45% of page height**. Fix upstream, never with filler. |
| I8 | Answer-key ⇄ bank sync | Re-extracted prompts and ideals must be **byte-identical** to the stored copies, and **no quiz ideal may appear anywhere in the booklet**. |
| I9 | Hedge diff against the source | Every hedge the source uses stays. Every number matches. No personal habit generalised into a rule. |
| I10 | Legend ⇄ artwork | A legend describes the styles actually rendered: if the trees use bold for named nodes the legend may not say "boxed", and if it says one node is reversed then exactly one must be. **Exactly one** inverted token per sketch, **exactly one** focus cell per 2×2. **Check on the rasterised page**, and count mechanically. |
| I11 | Metadata gate | Check the document title and everything else living **above `<body>`**. |
| I12 | Structural counts and scans | Section counts, question boxes vs answer-key entries, write-lines present; **zero** emoji, colour hue, kit-internal vocabulary, personal data or filesystem paths. |
| I13 | Independent review | A different reader, given **the rendered PDF** and the source, briefed adversarially — before shipping. |

The five that need more than a line:

**I5 — the ink check.** Character counting is not sufficient, and was the check until competency 8:
a page carrying only ruled write-lines extracts as *zero* characters, and a heading stranded at the
foot of a page extracts as fine. Both slipped through. Keep a text pass as a second signal —
**flag any page under ~800 extracted characters** — and separately assert no page's last line is a
heading.

*Known blind spot:* the check cannot see a page ending in a lone table header row, because a header
sits below the 45% floor. Guard it in CSS instead (I3). *Two trimming traps:* an "edit" that reflows
text without deleting lines saves nothing, and in a CSS grid **rows equalise to the tallest cell** —
trimming a short cell changes no height at all.

**I8 — the sync check.** Run it **after every re-render**, not once at registration. The learner is
graded against the JSON copy, so a booklet edit that doesn't reach the bank silently moves the
goalposts. For the leak half, slide an 80-character window across each quiz ideal and assert none
occurs in the rendered text — this is what keeps the unprinted final quiz genuinely unprinted.

**I9 — the hedge diff.** For every prescriptive or quantitative claim, compare the booklet's
certainty against the source's. Anything the source qualifies — "probably", "almost certainly",
"often", "we recommend", "our experience suggests", "mostly", "one way to think about this" —
**stays qualified**. The **easiest defect to introduce and the hardest to notice**, because the
sentence still reads well and reads *better* without the hedge.

**I11 — the metadata gate.** This exists because a booklet shipped with another booklet's `<title>`
in its PDF metadata: its head block had been copied from a sibling rather than from the template.
Every other gate passed. The reason is worth internalising — **the head is the one region of the
file that neither the page check nor any structural count ever reads.** Whatever your gates measure,
ask what region of the artifact they never touch.

**I13 — independent review.** Brief the reviewer with these gate numbers, give them the source file,
and tell them to be adversarial and to report nothing already correct. This is where the expensive
defects were caught — every hedge-drift and unseen-case violation in the set was found by an
independent pass, not by the builder. **Then verify each finding yourself against the source before
acting.** Reviews contain false positives, and accepting one costs you a correct passage.

**And the gate that lives in E1, not here:** every applied question must present a situation the
reader has **not** seen worked through in the source. This is the single most-violated rule in the
set, and it is violated *invisibly* — the question reads beautifully, because the source's own
examples are the best-crafted ones available. Check each question against the source text
specifically, not from memory of having written it. The source's examples belong in the **teaching**,
where they are the right tool; the constraint is on questions only.

---

# Part 5 · J · Sizing, calibrated across thirteen builds

| Input | Output |
|---|---|
| ~95 source pages | ~50 booklet pages (≈1 booklet page per 2 source pages) |
| 4 parts | ~6 pages each |
| Back matter | ~14 pages |
| Retrieval load | 8 applied + ~14 sketch-node cues + 10 quiz questions |
| Tracker rows | One per independently testable idea, not one per term. The first build calibrated this at ~18 for a ~30-page booklet; the 45–50 page builds since have settled at **32–36**, which is the figure to use for a four-part booklet of that length. |

If a part runs past **8 pages**, the grouping axis (B2) is wrong — you have two parts pretending to
be one. If a part is under **4 pages**, it is a section of another part.

Deviate where the material demands it, and **record the deviation in the meta file**. An unrecorded
deviation is indistinguishable from an error six months later.

**What the calibrating set actually did, which is not the rule.** Competencies 11, 12 and 13 ran to
59–62 pages and used **40** tracker rows, above what J predicts. All three are recorded in `META.md`
as deviations, and they are deliberate — the heuristic is a guide to coverage, not a cap. Left here
as an observation rather than folded into J, because promoting observed practice into the rule it
deviates from would quietly retire three recorded deviations and make the notes citing J read as
though they documented compliance. **When practice and rule diverge, change one of them on purpose
and update the citations — never let the rule drift toward the practice.**

---

# Part 6 · What thirteen builds actually taught

Findings that cost something to learn, in the order they'd bite a new set.

1. **Read the whole source before writing.** Every hedge-drift and example-reuse defect traced back
   to writing from a summary.
2. **The best-written questions are the most suspect.** A question that flows unusually well is
   often the source's own example wearing new nouns.
3. **Fix orphans upstream, never with filler.** Filler is visible on paper and teaches nothing.
4. **Verify the gates cover the whole artifact.** I11 shipped because every check read `<body>` and
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

# Appendix · Build checklist

Copy per booklet.

```
[ ] Source extracted, chapter offsets noted, READ IN FULL
[ ] A1-A3 settled: one competency, one closed source, four verb-phrased goals
[ ] B1-B4 settled: four parts on a causal spine; ordering rationale written
[ ] C: 11 elements per part; items 2, 4, 8, 10, 11 present in all four
[ ] D1-D6: axes answerable in the moment, one focus cell, a Move: line in every cell
[ ] E1: every applied question checked against the source — no reused examples
[ ] E3-E4: answers at the back only; write-lines under every question and quiz item
[ ] H: seven back-matter sections; final-quiz ideals written but NOT printed
[ ] F1-F6: greyscale, one inversion role, no emoji, photocopier test
[ ] Assembled from skeleton.html's head, not a sibling booklet
[ ] I1-I3 render; I4 rasterise and look
[ ] I5 ink check: 0 flagged
[ ] I9 hedge diff against source
[ ] I10 legend ⇄ artwork counts
[ ] I11 title and metadata correct
[ ] I12 structural counts + emoji/hue/vocabulary/path scans
[ ] I6: 18 questions registered, ids stable, ideals frozen inline
[ ] I8 sync + quiz-ideal leak check: 0 problems
[ ] I7 + G1: META spine row, works-referenced, de-vendoring line, known gaps
[ ] Folder README written; set-level index updated
[ ] Personal-data / path scan clean
[ ] I13 independent review; findings verified against source before acting
[ ] Re-render, re-run I5 and I8, commit
```

---

# Embedded artifacts

Extract these verbatim (Step 0). Fence lines are delimiters, not content.

## Artifact: skeleton.html

````html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{{COMPETENCY TITLE}} — Study Booklet</title>
<style>
:root{
  --ink:#111111; --soft:#555555; --rule:#b4b4b4; --hair:#d9d9d9;
  --fill:#f2f2f2; --fill2:#e6e6e6; --fill3:#dadada; --mid:#8c8c8c;
}
@page{ size:A4; margin:16mm 15mm 16mm 15mm; }
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact; print-color-adjust:exact}
body{
  font-family:"Charter","Georgia","Times New Roman",serif;
  color:var(--ink); font-size:10.4pt; line-height:1.44; margin:0;
}
h1,h2,h3,h4,.ui{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}
h1{font-size:23pt; line-height:1.12; margin:0 0 6pt; letter-spacing:-.4pt}
h2{font-size:15pt; margin:0 0 4pt; letter-spacing:-.2pt}
h3{font-size:11.6pt; margin:14pt 0 5pt; letter-spacing:-.1pt}
h4{font-size:9.6pt; margin:10pt 0 4pt; text-transform:uppercase; letter-spacing:.9pt; color:var(--soft)}
p{margin:0 0 6pt}
ul,ol{margin:0 0 7pt; padding-left:17px}
li{margin:0 0 3pt}
li > ul{margin-top:3pt}
code,.mono{font-family:"SF Mono",Menlo,Consolas,monospace; font-size:9pt; background:var(--fill); padding:.5pt 3pt}
small{font-size:8.6pt; color:var(--soft)}
.page{page-break-after:always}
.page:last-child{page-break-after:auto}
.nobreak,.box,.qbox,.sketch,.matrix{break-inside:avoid; page-break-inside:avoid}

/* ---------- cover ---------- */
.cover{padding-top:24mm}
.kicker{font-size:9pt; letter-spacing:2.4pt; text-transform:uppercase; color:var(--soft); margin-bottom:10pt}
.cover .sub{font-size:13pt; color:var(--soft); margin:8pt 0 20pt; line-height:1.35}
.cover .rule{height:3px; background:var(--ink); width:64px; margin:16pt 0}
.meta{font-size:9.4pt; color:var(--soft); line-height:1.7}
.chunkstrip{display:flex; gap:6px; margin:22pt 0 0}
.chunkstrip div{flex:1; padding:8pt 9pt; background:var(--fill); border-left:3px solid var(--ink);
  font-family:Helvetica,Arial,sans-serif; font-size:8.4pt; line-height:1.35}
.chunkstrip b{display:block; font-size:9.6pt; margin-bottom:2pt}
.chunkstrip .num{display:block; font-size:15pt; font-weight:700; line-height:1; margin-bottom:4pt}

/* ---------- part headers ---------- */
.chunkhead{padding:11pt 13pt; margin:0 0 12pt; color:#fff; background:var(--ink);
  display:flex; align-items:flex-start; gap:12pt}
.chunkhead .big{font-family:Helvetica,Arial,sans-serif; font-size:30pt; font-weight:700; line-height:.92;
  border:2px solid #fff; padding:2pt 8pt; flex:0 0 auto}
.chunkhead .n{font-family:Helvetica,Arial,sans-serif; font-size:8.4pt; letter-spacing:2pt; text-transform:uppercase}
.chunkhead h2{color:#fff; margin:3pt 0 0}
.chunkhead p{margin:5pt 0 0; font-size:9.4pt}

/* ---------- boxes ---------- */
.box{border:1px solid var(--rule); padding:9pt 11pt; margin:0 0 9pt}
.tenth{background:var(--fill); border:1px solid var(--rule); border-left:5px solid var(--ink)}
.tenth h4{color:var(--ink)}
.bound{background:#fafafa; border:1px solid var(--hair); border-left:5px solid var(--mid)}
.quote{background:var(--fill); border:none; border-left:6px double var(--ink); font-style:italic; padding:8pt 11pt}
.tip{background:#fff; border:1.5px solid var(--ink)}
.qbox{border:1.5px solid var(--ink); padding:10pt 12pt; margin:0 0 8pt; background:#fff}
.qbox .lab{font-family:Helvetica,Arial,sans-serif; font-size:8pt; letter-spacing:1.6pt; text-transform:uppercase; color:var(--ink); font-weight:700}
.qbox p{margin:4pt 0 0}
.writeline{border-bottom:1px dotted var(--mid); height:15pt}
.writelines{margin-top:8pt}

/* ---------- tables ---------- */
table{width:100%; border-collapse:collapse; margin:0 0 9pt; font-size:9.1pt}
th,td{border:1px solid var(--hair); padding:4.5pt 6pt; text-align:left; vertical-align:top}
th{background:var(--fill2); font-family:Helvetica,Arial,sans-serif; font-size:8.2pt; text-transform:uppercase; letter-spacing:.7pt; color:var(--ink); font-weight:700}
td b{font-weight:700}
tr{break-inside:avoid}
.tight td,.tight th{padding:3.5pt 5pt; font-size:8.8pt}

/* ---------- 2x2 ---------- */
.matrix{margin:6pt 0 10pt}
.matrix .ylab{font-family:Helvetica,Arial,sans-serif; font-size:8pt; letter-spacing:1.2pt; text-transform:uppercase; color:var(--soft); margin-bottom:3pt}
.grid2{display:grid; grid-template-columns:26mm 1fr 1fr; grid-template-rows:auto auto auto; gap:4px}
.grid2 .corner{}
.grid2 .colh,.grid2 .rowh{
  font-family:Helvetica,Arial,sans-serif; font-size:8.4pt; font-weight:700; line-height:1.35;
  background:var(--fill2); padding:6pt 7pt;
}
.grid2 .colh small,.grid2 .rowh small{display:block; margin-top:1.5pt; font-weight:400}
.grid2 .cell{border:1px solid var(--rule); padding:7pt 8pt; font-size:8.9pt; line-height:1.36}
.grid2 .cell > b:first-child{display:block; font-family:Helvetica,Arial,sans-serif; font-size:9.2pt; margin-bottom:2.5pt}
.cell.focus{border:2.5px solid var(--ink); background:var(--fill2)}
.cell.focus > b:first-child{background:var(--ink); color:#fff; display:block; padding:2pt 5pt; margin:-2pt -3pt 5pt}
.cell.good{background:#f8f8f8; border-left:4px solid var(--mid)}
.legend{font-size:8.3pt; color:var(--soft); margin-top:2pt}

/* ---------- sketch ---------- */
.sketch{border:1px solid var(--rule); padding:11pt 12pt; background:#fcfcfc; margin:0 0 9pt}
.node{display:inline-block; padding:3pt 6pt; font-family:Helvetica,Arial,sans-serif; font-size:8.6pt;
  line-height:1.3; margin:2pt 0; border:1px solid var(--ink); background:var(--fill)}
.n1,.n2,.n3,.n4{background:var(--fill)}
.nstar{background:var(--ink); color:#fff; border:1px solid var(--ink); font-weight:700}
.tree{font-family:"SF Mono",Menlo,Consolas,monospace; font-size:8.6pt; line-height:1.7; white-space:pre}
/* tokens used INSIDE .tree — weight and inversion only, so monospace alignment survives */
.tree .tk1,.tree .tk2,.tree .tk3,.tree .tk4{font-weight:700}
.tree .tks{font-weight:700; background:var(--ink); color:#fff}
.q{color:var(--ink); font-family:Helvetica,Arial,sans-serif; font-size:8.2pt; font-weight:700}

/* ---------- misc ---------- */
.pill{display:inline-block; font-family:Helvetica,Arial,sans-serif; font-size:7.8pt; letter-spacing:.8pt;
  text-transform:uppercase; padding:2pt 6pt; background:var(--ink); color:#fff; margin-right:4pt; font-weight:700}
.p1,.p2,.p3,.p4{background:var(--ink); color:#fff}
.toc td{border:none; border-bottom:1px dotted var(--hair); padding:5pt 4pt}
.toc td:last-child{text-align:right; color:var(--soft); font-family:Helvetica,Arial,sans-serif; font-size:8.6pt}
.ans{font-size:9.2pt}
.ans h4{margin-top:11pt}
</style>
</head>

<body>

<!-- ══════════ COVER ══════════ -->
<section class="page cover">
  <div class="kicker">Learn · Verify — offline study booklet</div>
  <h1>{{COMPETENCY TITLE}}</h1>
  <div class="rule"></div>
  <div class="sub">{{One line: the through-question this booklet answers.}}</div>

  <div class="chunkstrip">
    <div><span class="num">1</span><b>{{Part 1 title}}</b>{{one line}}</div>
    <div><span class="num">2</span><b>{{Part 2 title}}</b>{{one line}}</div>
    <div><span class="num">3</span><b>{{Part 3 title}}</b>{{one line}}</div>
    <div><span class="num">4</span><b>{{Part 4 title}}</b>{{one line}}</div>
  </div>

  <div class="meta" style="margin-top:26pt">
    Print double-sided, short-edge bind, A4 · 100% scale (no &ldquo;fit to page&rdquo;).<br>
    Answer key starts at Section 9 — keep a sheet of paper over it.
  </div>
  <!-- D-G1: no provenance, no method note, no construction commentary anywhere in this file. -->
</section>

<!-- ══════════ HOW TO USE ══════════ -->
<section class="page">
  <h2>How to use this booklet</h2>
  <h3>The loop, per section</h3>
  <ol>
    <li>Read the plain-version box first.</li>
    <li>Read the teaching. Say each boundary out loud: &ldquo;X is <i>this</i>, its look-alike Y is <i>that</i>.&rdquo;</li>
    <li>Cover the page. Write Q1 in the blank lines, in full sentences. <b>Then</b> check the key.</li>
    <li>Score completeness. Do Q2. Note whether it beat Q1.</li>
    <li>Only then move on.</li>
  </ol>
  <div class="box tip">
    <h4>The rule that does most of the work</h4>
    <p>Thinking &ldquo;yes, I know this&rdquo; is <i>recognition</i>, not learning. The only evidence that counts is a written answer produced with the page covered.</p>
  </div>
  <h3>The spacing schedule</h3>
  <p>Review at <b>day 1, day 3, day 7, day 16, day 35</b>. Pass &rarr; next interval. Fail &rarr; reset that item to 1 day.</p>
  <h3>What&rsquo;s in here</h3>
  <table class="toc">
    <tr><td><b>1</b> — Learning goal and roadmap</td><td>orientation</td></tr>
    <tr><td><b>2</b> — {{Part 1 title}}</td><td>teaching · questions · matrix</td></tr>
    <tr><td><b>3</b> — {{Part 2 title}}</td><td>teaching · questions · matrix</td></tr>
    <tr><td><b>4</b> — {{Part 3 title}}</td><td>teaching · questions · matrix</td></tr>
    <tr><td><b>5</b> — {{Part 4 title}}</td><td>teaching · questions · matrix</td></tr>
    <tr><td><b>6</b> — Concept sketch + master matrix</td><td>consolidation</td></tr>
    <tr><td><b>7</b> — Symptom &rarr; diagnosis &rarr; prescription</td><td>working reference</td></tr>
    <tr><td><b>8</b> — Numbers worth remembering · Glossary</td><td>reference</td></tr>
    <tr><td><b>9</b> — Answer key</td><td>keep covered</td></tr>
    <tr><td><b>10</b> — Spaced-review tracker · final quiz</td><td>workbook</td></tr>
  </table>
</section>

<!-- ══════════ 1 · GOAL + ROADMAP ══════════ -->
<section class="page">
  <div class="kicker">Section 1</div>
  <h2>Learning goal &amp; roadmap</h2>
  <div class="box">
    <h4>Learning goal — what you should be able to do when you close this</h4>
    <p>Given {{a realistic prompt in the reader&rsquo;s working life}}, you can:</p>
    <ol>
      <li><b>Name</b> {{&hellip; in the field&rsquo;s vocabulary, not in adjectives}}.</li>
      <li><b>Locate</b> {{&hellip; which way it moved / where it sits}}.</li>
      <li><b>Prescribe</b> {{&hellip; and name the near-miss you rejected}}.</li>
      <li><b>Price it</b> — {{every technique costs something}}.</li>
    </ol>
  </div>
  <h3>The core model in one paragraph</h3>
  <p>{{The single mental model the whole competency hangs on. If you cannot write this, stop and re-chunk.}}</p>
  <div class="box tenth nobreak">
    <h4>The whole thing for a smart 15-year-old</h4>
    <ul><li>{{&hellip;}}</li><li>{{&hellip;}}</li><li>{{&hellip;}}</li><li>{{&hellip;}}</li></ul>
  </div>
  <h3>The four parts, and why they&rsquo;re in this order</h3>
  <table>
    <tr><th style="width:24mm">Part</th><th>What it covers</th><th style="width:52mm">Why here</th></tr>
    <tr><td><span class="pill p1">1</span><b>{{title}}</b></td><td>{{&hellip;}}</td><td>{{causal reason this part precedes the next}}</td></tr>
    <tr><td><span class="pill p2">2</span><b>{{title}}</b></td><td>{{&hellip;}}</td><td>{{&hellip;}}</td></tr>
    <tr><td><span class="pill p3">3</span><b>{{title}}</b></td><td>{{&hellip;}}</td><td>{{&hellip;}}</td></tr>
    <tr><td><span class="pill p4">4</span><b>{{title}}</b></td><td>{{&hellip;}}</td><td>{{&hellip;}}</td></tr>
  </table>
</section>

<!-- ══════════ PART N — repeat this block four times ══════════ -->
<section class="page">
  <div class="chunkhead">
    <div class="big">N</div>
    <div>
    <div class="n">Part N of 4</div>
    <h2>{{Part title}}</h2>
    <p>{{One line naming what is inside.}}</p>
    </div>
  </div>

  <!-- C2 · required -->
  <div class="box tenth nobreak">
    <h4>Tenth-grader version</h4>
    <ul><li>{{plain}}</li><li>{{plain}}</li><li>{{plain}}</li><li>{{plain}}</li></ul>
  </div>

  <!-- C3 · concrete before abstract -->
  <h3>Start with {{the everyday analogy}}</h3>
  <ul><li>{{&hellip;}}</li></ul>

  <!-- C4 · required. The boundary column is the point of the table. -->
  <h3>The terms, each with its look-alike</h3>
  <table class="tight">
    <tr><th style="width:30mm">Term</th><th style="width:46mm">Plain definition</th><th style="width:50mm">Concrete example</th><th>Boundary — what it gets confused with</th></tr>
    <tr><td><b>{{term}}</b></td><td>{{&hellip;}}</td><td>{{&hellip;}}</td><td>vs <b>{{look-alike}}</b>: {{the one-line difference}}</td></tr>
  </table>

  <!-- C5 · at most one per part -->
  <div class="box quote">{{The one story that makes the mechanism unforgettable.}}</div>

  <!-- C6 -->
  <h3>Trade-offs</h3>
  <table class="tight">
    <tr><th style="width:38mm">Decision</th><th>Buys you</th><th>Costs you</th><th style="width:38mm">Choose it when</th></tr>
    <tr><td>{{&hellip;}}</td><td>{{&hellip;}}</td><td>{{&hellip;}}</td><td>{{&hellip;}}</td></tr>
  </table>

  <!-- C7 -->
  <div class="box bound nobreak">
    <h4>Concept boundary — what this <i>is not</i></h4>
    <p><b>It is not</b> {{the reader&rsquo;s likely wrong belief}}.<br><b>It is</b> {{the correct one}}.</p>
  </div>

  <!-- C8 · required. F4: weight and inversion only inside .tree -->
  <h3>Anchor sketch</h3>
  <div class="sketch nobreak">
    <div class="legend" style="margin-bottom:6pt"><b>Legend:</b>
      <span class="node">boxed = a named node</span>
      <span class="node nstar">reversed = focus node</span>
      <span class="q">Q = self-test cue</span></div>
<div class="tree">                  <span class="tk1">{{ROOT}}</span>
                        |
        +---------------+---------------+
   <span class="tk1">{{BRANCH A}}</span>                   <span class="tks">{{FOCUS BRANCH}}</span>
</div>
    <div style="margin-top:8pt; font-size:8.9pt; line-height:1.6">
      <span class="q">Q</span> {{question whose answer hands you the next question}}<br>
      <span class="q">Q</span> {{&hellip;}}<br>
      <span class="q">Q</span> {{&hellip;}}
    </div>
  </div>

  <!-- C9 -->
  <h3>Say it so you understand it &rarr; say it like an expert</h3>
  <table class="tight">
    <tr><th style="width:50%">Say it this way to <i>understand</i> it</th><th>Say it this way to sound like an <i>expert</i></th></tr>
    <tr><td>&ldquo;{{the reader&rsquo;s own words}}&rdquo;</td><td>&ldquo;{{the same idea in field-standard terms}}&rdquo;</td></tr>
  </table>

  <!-- C10 · required. E2 three-part shape, E4 write-lines. -->
  <h3>Retrieval — cover the page first</h3>
  <div class="qbox nobreak">
    <div class="lab">Part N · Question 1</div>
    <p>{{An unseen case, described concretely.}}</p>
    <p><b>(a)</b> Name it. <b>(b)</b> Explain the mechanism. <b>(c)</b> Prescribe, and say why you rejected {{the near-miss}}.</p>
    <div class="writelines">
      <div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>
      <div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>
    </div>
  </div>
  <div class="qbox nobreak">
    <div class="lab">Part N · Question 2</div>
    <p>{{A second unseen case, same concept, different shape.}}</p>
    <p><b>(a)</b> &hellip; <b>(b)</b> &hellip; <b>(c)</b> &hellip;</p>
    <div class="writelines">
      <div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>
      <div class="writeline"></div><div class="writeline"></div><div class="writeline"></div>
    </div>
  </div>

  <!-- C11 · required. D1-D5. -->
  <h3>2&times;2 — {{the decision this matrix makes}}</h3>
  <div class="matrix nobreak">
    <div class="ylab">Columns: {{axis-2 question, answerable during the event}} &rarr;</div>
    <div class="grid2">
      <div class="corner"></div>
      <div class="colh">{{Col A}}<br><small>{{gloss}}</small></div>
      <div class="colh">{{Col B}}<br><small>{{gloss}}</small></div>

      <div class="rowh">{{ROW 1}}<br><small>{{gloss}}</small></div>
      <div class="cell good"><b>{{name}}</b>{{2-4 concrete instances}}<br><i>Move:</i> {{what to do}}</div>
      <div class="cell"><b>{{name}}</b>{{&hellip;}}<br><i>Move:</i> {{&hellip;}}</div>

      <div class="rowh">{{ROW 2}}<br><small>{{gloss}}</small></div>
      <div class="cell"><b>{{name}}</b>{{&hellip;}}<br><i>Move:</i> {{&hellip;}}</div>
      <div class="cell focus"><b>{{the dangerous cell}}</b>{{&hellip;}}<br><i>Move:</i> {{&hellip;}}</div>
    </div>
    <div class="legend"><b>Read it as:</b> {{the gradient — where danger rises, which column is which kind of problem}}</div>
  </div>

  <div class="box tip nobreak">
    <h4>Carry-out rule from this part</h4>
    <p>{{One portable sentence the reader keeps after the detail fades.}}</p>
  </div>
</section>

<!-- ══════════ 6 · CONSOLIDATION ══════════ -->
<section class="page">
  <div class="kicker">Section 6</div>
  <h2>Concept sketch — the whole competency on one page</h2>
  <p>Three named groups, in the order the story runs: {{GROUP 1}} &rarr; {{GROUP 2}} &rarr; {{GROUP 3}}. Every node carries a question.</p>
  <div class="sketch nobreak">
    <div class="legend" style="margin-bottom:9pt"><b>Legend:</b>
      <span class="node">{{GROUP 1}}</span><span class="node">{{GROUP 2}}</span><span class="node">{{GROUP 3}}</span>
      <span class="node nstar">reversed = the one node to remember</span><span class="q">Q = retrieval cue</span></div>
<div class="tree">{{three labelled groups, indented, weight-and-inversion styling only}}</div>
  </div>
  <h3>The question per node — cover the right column</h3>
  <table class="tight">
    <tr><th style="width:44mm">Node</th><th style="width:66mm">Question</th><th>Answer in one line</th></tr>
    <tr><td><b>{{node}}</b></td><td>{{question}}</td><td>{{answer}}</td></tr>
  </table>
</section>

<section class="page">
  <div class="kicker">Section 6 continued · the transferable card</div>
  <h2>Master 2&times;2 — the decision card you can carry to other problems</h2>
  <!-- D6: this matrix must work outside the domain, or it is a summary, not a card. -->
  <div class="matrix nobreak">
    <div class="ylab">Columns: {{axis 2}} &rarr;</div>
    <div class="grid2">
      <div class="corner"></div>
      <div class="colh">{{Col A}}<br><small>{{gloss}}</small></div>
      <div class="colh">{{Col B}}<br><small>{{gloss}}</small></div>
      <div class="rowh">{{ROW 1}}</div>
      <div class="cell good"><b>{{aim here}}</b>{{&hellip;}}</div>
      <div class="cell"><b>{{&hellip;}}</b>{{&hellip;}}</div>
      <div class="rowh">{{ROW 2}}</div>
      <div class="cell"><b>{{&hellip;}}</b>{{&hellip;}}</div>
      <div class="cell focus"><b>{{the hard quadrant}}</b>{{&hellip;}}</div>
    </div>
    <div class="legend"><b>The move that matters:</b> {{which axis you can realistically change, and how}}</div>
  </div>
  <div class="box tenth nobreak">
    <h4>The thumb rule, in one sentence</h4>
    <p style="font-size:11.5pt; line-height:1.5"><b>{{The portable rule.}}</b></p>
    <p style="margin-top:6pt">{{Three examples from outside this domain, proving it transfers.}}</p>
  </div>
</section>

<!-- ══════════ 7 · WORKING REFERENCE ══════════ -->
<section class="page">
  <div class="kicker">Section 7</div>
  <h2>Symptom &rarr; diagnosis &rarr; prescription</h2>
  <table class="tight">
    <tr><th style="width:50mm">What you observe</th><th style="width:60mm">Most likely diagnosis</th><th>What to apply</th></tr>
    <tr><td>{{phrased as what you SEE, not what it is}}</td><td>{{&hellip;}}</td><td>{{&hellip;}}</td></tr>
  </table>
  <div class="box bound nobreak">
    <h4>The mapping in the other direction</h4>
    <table class="tight" style="margin:5pt 0 0">
      <tr><th style="width:36mm">Prescription</th><th>Counters</th></tr>
      <tr><td>{{&hellip;}}</td><td>{{&hellip;}}</td></tr>
    </table>
  </div>
</section>

<!-- ══════════ 8 · REFERENCE ══════════ -->
<section class="page">
  <div class="kicker">Section 8</div>
  <h2>Numbers worth remembering</h2>
  <table class="tight">
    <tr><th style="width:34mm">Number</th><th>What it&rsquo;s about</th><th>Why it matters in an argument</th></tr>
    <tr><td><b>{{n}}</b></td><td>{{&hellip;}}</td><td>{{&hellip; — if you cannot fill this cell, cut the row}}</td></tr>
  </table>
  <h3>Glossary — the terms you should be able to define cold</h3>
  <table class="tight">
    <tr><th style="width:44mm">Term</th><th>Definition, and the line that separates it from its neighbour</th></tr>
    <tr><td><b>{{term}}</b></td><td>{{&hellip;}}</td></tr>
  </table>
</section>

<!-- ══════════ 9 · ANSWER KEY ══════════ -->
<section class="page ans">
  <div class="kicker">Section 9 — keep covered until you&rsquo;ve written your own answers</div>
  <h2>Answer key</h2>
  <h4>Part 1 · Q1 — {{short case name}}</h4>
  <p><b>(a)</b> {{&hellip;}}</p>
  <p><b>(b)</b> {{&hellip;}}</p>
  <p><b>(c)</b> {{&hellip; and why the near-miss alternative fails}}</p>
  <div class="box tip nobreak" style="margin-top:14pt">
    <h4>How to score yourself</h4>
    <p><b>Completeness:</b> did you name every element, and get the direction right? <b>Phrasing:</b> could you have said it out loud in a review without hand-waving?</p>
  </div>
</section>

<!-- ══════════ 10 · WORKBOOK ══════════ -->
<section class="page">
  <div class="kicker">Section 10</div>
  <h2>Spaced-review tracker</h2>
  <p>Review at <b>day 1, 3, 7, 16, 35</b>. Date the box on a pass. On a fail, reset that row to 1 day.</p>
  <table class="tight">
    <tr><th style="width:56mm">Item</th><th>Day 1</th><th>Day 3</th><th>Day 7</th><th>Day 16</th><th>Day 35</th><th style="width:26mm">Fails</th></tr>
    <tr><td><b>1 &middot;</b> {{one independently testable idea}}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  </table>
  <h3>Final quiz — no notes, {{n}} minutes, write the answers</h3>
  <ol><li>{{drawn across all four parts}}<div class="writelines"><div class="writeline"></div><div class="writeline"></div></div></li></ol>
</section>

</body>
</html>
````

## Artifact: check-pages.py

````python
#!/usr/bin/env python3
"""Ink-based page check for a rendered booklet.

The text-extraction orphan check (decision I5) counts characters, so a page
carrying only ruled write-lines extracts as empty and a page carrying only a
heading extracts as fine. This renders every page and measures how far down
the page the ink actually reaches, which catches both.

Usage:  python3 check-pages.py BOOKLET.pdf [--dpi 40] [--floor 0.45]

Flags any page whose ink stops above `floor` of the page height, except the
last page of the document and any page listed with --allow (1-indexed).
"""
import argparse
import glob
import os
import subprocess
import sys
import tempfile

from PIL import Image


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('pdf')
    ap.add_argument('--dpi', type=int, default=40)
    ap.add_argument('--floor', type=float, default=0.45)
    ap.add_argument('--allow', default='', help='comma-separated page numbers to skip')
    a = ap.parse_args()
    allow = {int(x) for x in a.allow.split(',') if x.strip()}

    with tempfile.TemporaryDirectory() as td:
        subprocess.run(['pdftoppm', '-r', str(a.dpi), '-gray', '-png', a.pdf,
                        os.path.join(td, 'p')], check=True)
        pages = sorted(glob.glob(os.path.join(td, 'p-*.png')))
        bad = []
        for i, f in enumerate(pages, 1):
            im = Image.open(f).convert('L')
            w, h = im.size
            px = im.load()
            last = 0
            for y in range(h):
                for x in range(w):
                    if px[x, y] < 200:
                        last = y
                        break
            frac = last / h
            if frac < a.floor and i not in allow and i != len(pages):
                bad.append((i, round(frac, 2)))
        for i, frac in bad:
            print('page %d: ink stops at %.0f%% of the page' % (i, frac * 100))
        print('%d page(s) flagged of %d' % (len(bad), len(pages)))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
````
