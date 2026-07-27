# Stability Antipatterns & Stability Patterns — printable study booklet

- `Release-It-Ch4-5-Study-Booklet.pdf` — 50 pages, A4, grayscale, print-ready.
- `booklet.html` — the source. Self-contained: no images, no external CSS, no fonts to fetch.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-competency concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → prescription, and the reverse mapping |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** where cracks start (integration points) · **2** how a crack becomes an outage
(blocked threads, chain reactions, cascading failures, slow responses) · **3** load-shaped failure
(users, scaling effects, unbalanced capacities, self-denial, dogpile, force multiplier, unbounded
result sets) · **4** the twelve stability patterns.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone, so
photocopies and B&W laser output lose nothing.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=Release-It-Ch4-5-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

Any Chromium build works. Page size and margins come from the `@page` rule in the HTML.

Built from the scaffold in `../booklet-template/`.
