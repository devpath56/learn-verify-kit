# LVK booklet — decision skeleton

The transferable decisions behind a Learn·Verify core-competency booklet. Each entry is a
decision *point*, not a description: the question, the options, the rule that resolves it, and
the failure mode if you resolve it wrong. Work top to bottom; A–C fix the shape, D–G fix the
craft, H–J fix production.

Companion file: `skeleton.html` — the grayscale print scaffold with these decisions already
encoded as empty structure. Copy it, fill it, render it.

---

## A · Scope

| # | Decision | Rule | Fails as |
|---|---|---|---|
| A1 | What counts as one booklet? | **One competency that has a natural end.** A source that covers a whole failure-model end-to-end is one booklet; a topic slice is not. If you can't write a one-sentence learning goal, the scope is wrong. | A booklet that is a reading list |
| A2 | How faithful to the source? | Every example, number, story and quotation in the **teaching** is traceable to the source. Invented material is confined to the **retrieval questions**, where being unseen is the point. | Teaching that quietly drifts into your own opinions |
| A3 | What is the learning goal? | Write it as **four things the reader can do**, phrased as verbs against a realistic prompt ("given an outage description, you can name / locate / prescribe / price"). Put it on the first content page. | A goal like "understand X", which nothing can test |

---

## B · Chunking

| # | Decision | Rule | Fails as |
|---|---|---|---|
| B1 | How many parts? | **Four, hard cap.** Working memory takes about four. A source with twenty-three named items still gets four parts. | Twenty-three sections, none retained |
| B2 | What is the grouping axis? | Group by **mechanism or lifecycle position**, never by the source's own chapter order and never alphabetically. Pick the axis that lets part N+1 answer part N. | Parts that are bins, so nothing connects |
| B3 | What order? | The parts must form a **causal story**. Here: where it starts → how it spreads → what triggers it → what stops it. Say the ordering rationale in one table on the roadmap page. | An arbitrary order the reader can't predict |
| B4 | Where do the leftovers go? | Anything that doesn't fit the four parts goes to **back matter** (lookup table, glossary, numbers), not into a fifth part. | Scope creep back to a reading list |

---

## C · Part anatomy — identical in every part

The reader should learn the rhythm by part two and be able to navigate blind. Fixed sequence:

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
10. **Two retrieval questions** with write-lines (see E).
11. **One 2×2** (see D) and a one-paragraph carry-out rule.

> Rule: if a part is missing any of 2, 4, 8, 10, 11, it isn't finished. Items 3, 5, 6, 7, 9 may be
> merged or trimmed when the material is thin, but never items 2, 4, 8, 10, 11.

---

## D · The 2×2 — the highest-leverage decision in the booklet

| # | Decision | Rule | Fails as |
|---|---|---|---|
| D1 | What are the axes? | Both axes must be **questions you can answer while the incident is happening** ("how fast did it fail?", "which way did it travel?", "did the surge come from inside or outside?"). Not taxonomy labels. | A classification chart nobody consults |
| D2 | Are the axes clean? | Binary, orthogonal, and **every item from the part lands in exactly one cell**. If an item straddles, the axis is wrong. | Cells that overlap, so the matrix decides nothing |
| D3 | Which cell is the focus? | **Exactly one**, and it should be the most dangerous or most consequential — not the most common. Mark it by inversion, nothing else. | Four equal cells, no signal |
| D4 | What goes in a cell? | Three things, in order: a **name**, 2–4 **concrete instances**, and a **`Move:` line** saying what to do. A cell without a move is a label. | A matrix that describes instead of directs |
| D5 | What sits under the grid? | One **"read it as"** line naming the gradient — where danger rises, which column is an engineering problem and which is a coordination problem. | A grid the reader has to interpret alone |
| D6 | The master 2×2 | The consolidating matrix must be **transferable outside the domain**. If it only works for this subject it's a summary, not a decision card. Pair it with a one-sentence thumb rule and three non-software examples. | A "key takeaways" slide |

---

## E · Retrieval questions

| # | Decision | Rule | Fails as |
|---|---|---|---|
| E1 | How many, and about what? | **Two per part**, on cases that do not appear in the source. Recognition of source examples is not retrieval. | Testing whether they read, not whether they know |
| E2 | Question shape | Three parts every time: **(a) name it · (b) explain the mechanism or direction · (c) prescribe, and say why you rejected the near-miss alternative.** Part (c) is what separates knowing from listing. | Questions answerable by keyword match |
| E3 | Where do answers live? | A **separate section at the back**, never on the same page or spread. Say on the cover which section it starts at, so the reader can cover it. | Eyes slide to the answer; no retrieval happens |
| E4 | Write-lines | Ruled blank lines under every question. On paper, if there is nowhere to write, nobody writes. | A booklet that gets read, not worked |
| E5 | Answer length and content | Written at the length of a good design-review answer. Each answer must **also name the rejected alternative** and why it fails. | Answers that confirm rather than teach |

---

## F · Visual system — grayscale print

| # | Decision | Rule | Fails as |
|---|---|---|---|
| F1 | Colour | **None.** Distinctions are carried by fill level, border weight, border style, type weight, and inversion. | A booklet that only works on a screen |
| F2 | Inversion | Reserved for **one role: focus**. One inverted element per sketch, one per matrix. Never decorative. | Signal inflation; nothing stands out |
| F3 | Emoji | **Never.** They render as colour glyphs and print as grey blobs, and double-width ones destroy monospace alignment. Use words. | Smudges where the signal was |
| F4 | Monospace art | Inside a tree, style with **weight and inversion only** — no padding, no borders, no wide glyphs. Anything that changes advance width breaks the alignment. | Diagrams that shear on render |
| F5 | Box vocabulary | Small and fixed: **plain-version** (heavy left rule) · **boundary** (mid-grey left rule) · **quotation** (double left rule, italic) · **action / carry-out** (full black border) · **question** (full black border). Five, no more. | A page of undifferentiated grey panels |
| F6 | Photocopier test | No distinction may rest on **fill alone**. Every fill difference is backed by a border or a label. | Third-generation photocopies that read as one tone |

---

## G · What must not be in the booklet

| # | Rule | Why |
|---|---|---|
| G1 | **No provenance, no method rationale, no construction commentary.** No "built from", no citations for the study method, no explanation of why the booklet is shaped this way. | This lives **once**, in the SSOT meta section for the whole competency set. Repeating it in every booklet is noise the reader pays for on every print. |
| G2 | **No per-fact confidence tagging** — nothing like "each number is tagged published / extrapolated / invented". | If a number isn't trustworthy enough to print unqualified, don't print it. Tagging offloads your editorial job onto the reader. |
| G3 | **No kit-internal vocabulary** — no "chunk", no skill names, no step labels. The reader sees the subject, never the machinery. | Internal vocabulary makes the reader decode the tool instead of the topic. |
| G4 | **No trailing offers.** End on a quiz, not on "want me to…". | An offer at the end converts a study session into a conversation. |
| G5 | **No numbers without a use.** A number earns its place only if it wins an argument in a design review. | Trivia crowds out the numbers that matter. |

---

## H · Back matter — fixed set

| Section | Purpose | Rule |
|---|---|---|
| Symptom → diagnosis → prescription | The on-call page | One row per observable symptom, phrased as **what you see**, not what it is |
| Reverse mapping | Prescription → what it counters | Lets the reader audit a system rather than diagnose an incident |
| Numbers worth remembering | Argument ammunition | Each row states **why it matters in an argument**, not just what it is |
| Glossary | Cold definitions | Only include terms that **have a confusable neighbour**; the definition must draw the line |
| Answer key | Retrieval, honestly | Separate section, worked answers, rejected alternatives named |
| Spaced-review tracker | Spacing is half the method | Day 1 / 3 / 7 / 16 / 35 grid; one row per testable item; a fails column |
| Final quiz | Whole-competency retrieval | No notes, timed, ~10 questions, drawn across all four parts |

---

## I · Production

| # | Decision | Rule |
|---|---|---|
| I1 | Format | **One self-contained HTML file** — no external CSS, fonts, images or scripts. Render with `chrome --headless --no-pdf-header-footer --print-to-pdf`. |
| I2 | Page setup | A4 portrait, 16mm/15mm margins, ~10.4pt serif body with sans headings. Print instruction on the cover: **100% scale, no "fit to page"**, duplex short-edge. |
| I3 | Pagination | `break-inside: avoid` on every box, question, sketch, matrix and table row. Structure the file as explicit `.page` sections so section starts are predictable. |
| I4 | Verification | **Rasterise and look at the pages.** Never trust the HTML. Check at minimum: a part opener, a matrix page, a sketch page, the cover. |
| I5 | Orphan check | Extract per-page text and flag any page under ~800 characters. Fix by tightening upstream copy, not by inserting filler. |
| I6 | Register the question bank | Extract **every** question — part questions, quiz questions, concept-sketch node questions — into `resources/competency-progress.json` as a new competency entry, with the answer-key location recorded. A booklet whose bank is not registered cannot be quizzed, so the booklet is not finished until this is done. |

---

## J · Sizing heuristics — calibrated on the first build

| Input | Output |
|---|---|
| ~95 source pages | ~50 booklet pages (roughly **1 booklet page per 2 source pages**) |
| 4 parts | ~6 pages each |
| Back matter | ~14 pages |
| Retrieval load | 8 primary questions + ~14 sketch-node questions + 10 quiz questions |
| Tracker rows | ~18 (one per independently testable idea, not one per term) |

If a part runs past 8 pages, the grouping axis in B2 is wrong — you have two parts pretending to
be one. If a part is under 4 pages, it is a section of another part.
