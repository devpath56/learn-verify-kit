# Performance Methodology — printable study booklet

- `SysPerf-Methodology-Study-Booklet.pdf` — 48 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-competency concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move (investigating, measuring, believing the numbers) · reverse mapping: technique → what it counters |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** the words decide the measurement · **2** where you stand decides what you see ·
**3** the methods worth running · **4** the numbers will lie to you.

Unlike the other booklets in this set, the subject here is not knowledge about a system but
**procedure for approaching an unfamiliar one**. The spine is that four layers sit between a signal
and a solution: vocabulary that commits you to a measurement, a posture you inherited without
choosing it, a method that answers "where do I start", and a set of statistics that can describe a
system which does not exist. Every method in Part 3 is taught with the question it is the answer to,
because a method you can recite but cannot choose is worth nothing during an incident.

## A note on scope

The source chapter names a great many observability tools, monitoring platforms and cloud products.
The booklet teaches the methodology generically and names none of them — the method is the
transferable part, and the tool list is the fastest-decaying part of the chapter. Every name is
recorded in `../META.md` instead.

## A note on styling

Like competencies 5 and 6, this booklet carries one scoped `<style>` block inside `body.html`,
reducing the monospace sketch size, tightening the tracker and final quiz, and suppressing the page
break after the last section. Competencies 1–4 take all their styling from the shared block.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=SysPerf-Methodology-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on performance methodology" whenever you want them; there is no schedule. Offline answers
can be handed over a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
