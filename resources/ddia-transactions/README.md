# Transactions — printable study booklet

- `DDIA-Transactions-Study-Booklet.pdf` — 44 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-competency concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move, split into an isolation-anomalies half and a serializability/commit half |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** what a transaction promises · **2** the weak levels, and what they stop · **3** what
they don't stop, and the three roads back · **4** when the transaction spans machines.

The spine is *the promise, and every discount you are sold on it*: a transaction is a bargain whose
full form is serializable, almost every default is cheaper than that, and the difference shows up as
anomalies that no test reliably reproduces. Part 3 is the heart — lost updates, write skew and
phantoms all have the same shape, a read that decides and a write that invalidates the decision.

## A note on styling

This booklet carries one scoped `<style>` block inside `body.html`, reducing the monospace sketch
size and tightening the tracker and final quiz. Every other booklet takes all its styling from the
shared block copied in at assembly time. The scoped rules exist to fit five large sketches onto their
pages; if the shared style block changes, check this booklet's sketch pages first.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=DDIA-Transactions-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on transactions" whenever you want them; there is no schedule. Offline answers can be handed
over a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
