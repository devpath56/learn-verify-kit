# Benchmarking — printable study booklet

- `SysPerf-Benchmarking-Study-Booklet.pdf` — 48 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-competency concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move (running one yourself, reading someone else's, believing the number) · reverse mapping: technique → what it counters |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** what the number actually is · **2** the sixteen ways it lies ·
**3** choosing the kind · **4** analyse it while it runs.

The spine is a single sentence taken seriously: a benchmark tells you only how fast the system ran the
benchmark, and everything that makes a result useful or worthless lives in the gap between that and a
claim about your system. Part 1 sets the standard a good result meets, so the failures in Part 2 have
something to be measured against. Part 3 exists because several of those failures are really the wrong
*kind* of benchmark chosen for the question. Part 4 is the cure, and it is one habit — analyse the
system while the benchmark is still running — because three of the four questions you must answer about
any result stop being answerable the moment the load stops.

## A note on scope

The source chapter names a great many tools: the benchmark suite dissected in its case study, the
observability tools used to dissect it, micro-benchmark tools by resource type, and load generators.
The booklet names none of them and describes each by what it does. It does name the two industry-standard
**organisations** and their suites, because standard benchmarks are the subject of a whole section and
those names are durable. Everything left unnamed is recorded in `../META.md`.

## A note on styling

Like competencies 5, 6 and 7, this booklet carries one scoped `<style>` block inside `body.html`,
reducing the monospace sketch size, tightening the tracker and final quiz, and suppressing the page
break after the last section. It adds three rules of its own: the section 6 concept sketch is allowed
to break across pages, because it is taller than a page and the shared no-break rule would otherwise
strand its heading; `h3` never breaks away from what follows it, so a sub-heading can no longer be the
last thing on a page; and the part 3 sketch sets its own slightly smaller monospace size so it fits on
the page below the concept-boundary box. Competencies 1–4 take all their styling from the shared block.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=SysPerf-Benchmarking-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Two more sit in `retired`:
they were replaced in review, before any attempt existed, and the reasons are in `../META.md`. Say **"drill me"** or
"quiz me on benchmarking" whenever you want them; there is no schedule. Offline answers can be handed
over a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
