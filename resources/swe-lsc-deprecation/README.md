# Large-Scale Change & Deprecation — printable study booklet

- `SWE-LSC-Deprecation-Study-Booklet.pdf` — 49 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-competency concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move (planning a large change, running the machine, deprecating something) · reverse mapping: practice → what it counters |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** why one big commit stops working · **2** who pays for the migration ·
**3** the machine that does it · **4** deciding what to remove.

The spine runs from a constraint that works backwards to intuition: as a codebase and its engineering
population grow, the largest change you can commit atomically gets *smaller*. Everything else is a
response. Sweeping changes have to be broken into thousands of small ones, which is only viable if a
machine writes them — and building that machine turns out to be an economic problem rather than a
technical one, because the benefit of a migration is spread thinly across everybody while the cost is
not. Once it exists, technical decisions stop being permanent, which changes what you are willing to
decide in the first place. And that reframes the last question, which is not how to remove an obsolete
system but whether to, since code is a liability and the honest comparison is between the cost of
keeping it and the cost of taking it away.

## A note on scope

Both source chapters are thick with internal tool names, product names and specific symbols. The
booklet names **the concepts, one eponymous law, and programming-language properties** — and nothing
else. Hyrum's Law is named because an eponymous law is durable vocabulary, on the same grounds as the
scalability laws in competency 7. Languages and language features appear only where a teaching point
turns on the property itself, such as static versus dynamic typing. Everything else is described by
what it does: no companies, no products, no internal tool or programme names, no individuals, and no
internal symbol names. Everything left unnamed is recorded in `../META.md`.

## A note on styling

Like competencies 5–9, this booklet carries one scoped `<style>` block inside `body.html`: it reduces
the monospace sketch size, tightens the tracker and final quiz, suppresses the page break after the
last section, and stops an `h3` from ever being the last thing on a page. It adds two rules of its own: the
part 4 anchor sketch is taller than a page and is allowed to break across pages, as the section 6 concept
map is; and the part 3 sketch sets a slightly smaller monospace size so that it fits on a single page.
Competencies 1–4 take all their styling from the shared block.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=SWE-LSC-Deprecation-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

Then check the pages: `python3 ../booklet-template/check-pages.py SWE-LSC-Deprecation-Study-Booklet.pdf`

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on large-scale change" whenever you want them; there is no schedule. Offline answers can be
handed over a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
