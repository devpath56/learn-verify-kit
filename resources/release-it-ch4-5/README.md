# Release It! Ch. 4–5 — printable study booklet

A Learn·Verify-format study booklet built from *Release It! Design and Deploy
Production-Ready Software* (2nd ed.), Chapter 4 "Stability Antipatterns"
(pp. 31–90) and Chapter 5 "Stability Patterns" (pp. 91–125), by Michael T. Nygard.

- `Release-It-Ch4-5-Study-Booklet.pdf` — 50 pages, A4, print-ready.
- `booklet.html` — the source. Self-contained: no images, no external CSS, no fonts to fetch.

## What's in it

| Section | Contents |
|---|---|
| 1 | Learning goal, the fault → crack → failure model, 4-chunk roadmap |
| 2–5 | One chunk each. Every chunk carries: 🎓 tenth-grader version → example-first teaching → term table (name + definition + example + boundary vs its look-alike) → trade-offs table → concept-boundary box → anchor sketch → plain/expert phrasing table → **2 retrieval questions on cases not in the book** → a 2×2 decision matrix |
| 6 | Whole-chapter concept sketch (3 groups, one question per node) + the master 2×2 decision card: coupling × interactive complexity |
| 7 | Symptom → diagnosis → pattern lookup, plus the reverse mapping (pattern → antipatterns countered) |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key (8 worked answers) |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · 10-question final quiz |

Chunks: **1** where cracks start (integration points) · **2** how a crack becomes an
outage (blocked threads, chain reactions, cascading failures, slow responses) ·
**3** load-shaped failure (users, scaling effects, unbalanced capacities, self-denial,
dogpile, force multiplier, unbounded result sets) · **4** the twelve stability patterns.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Colour is meaning-bearing (one hue per chunk, one highlighted focus node per sketch)
but every distinction is also carried by borders and labels, so greyscale still works.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=Release-It-Ch4-5-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

Any Chromium build works. Page size and margins come from the `@page` rule in the HTML.

## Method

Retrieval practice and distributed practice are the only two study techniques rated
high-utility in Dunlosky et al. (2013); retrieval beats concept mapping even when the
final test *is* a concept map (Karpicke & Blunt, *Science*, 2011). Hence the shape:
the sketches exist only because every node carries a question, and the answers sit in
a separate section so you can genuinely fail before you check.
