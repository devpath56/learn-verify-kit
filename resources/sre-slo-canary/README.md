# Service Level Objectives & Canarying Releases — printable study booklet

- `SRE-SLO-Canary-Study-Booklet.pdf` — 46 pages, A4, grayscale, print-ready.
- `booklet.html` — the source. Self-contained: no images, no external CSS, no fonts to fetch.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-competency concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move, split into objectives and canarying halves |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** why 100% is the wrong target · **2** what to measure, and how to get a first number ·
**3** making it bite: agreement, policy, decisions · **4** spending the budget to buy information.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=SRE-SLO-Canary-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on SLOs" whenever you want them; there is no schedule. Offline answers can be handed over
a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
