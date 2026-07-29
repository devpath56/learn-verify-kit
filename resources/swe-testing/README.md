# Tests That Earn Their Keep — printable study booklet

- `SWE-Testing-Study-Booklet.pdf` — 60 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-subject concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move (designing and running a suite; writing and maintaining a test; substituting a dependency, and going larger) · reverse mapping: practice → what it counters |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** what a suite is for · **2** tests that never need changing ·
**3** standing in for the real thing · **4** what small tests cannot tell you.

The spine starts from the observation that a test suite is not automatically an asset. Tests derive their
value from the trust engineers place in them, and a suite that becomes a productivity sink is worse than
no suite at all — so every practice downstream is an answer to "what protects that trust?" Part 1 supplies
the standard: two purposes, two *distinct* axes (**size**, the resources a test may consume; **scope**, how
much code it validates), the constraints that keep small tests fast and deterministic, and the mix those
constraints imply. Part 2 is where a suite's cost is actually incurred, because a test is written once and
paid for every time somebody changes the code near it: test through public interfaces, assert on resulting
state rather than on the sequence of calls that produced it, and a test should then never need touching
unless the requirements change. Part 3 is forced by Part 1's size constraints and decided by Part 2's
brittleness rules — where the real dependency will not fit you substitute something, and every substitution
trades away **fidelity**, which is what makes a stand-in able to pass while the system is broken. Part 4 is
defined by the limits of all three: a unit test is ensconced in a vacuum, which is exactly what makes it
fast and exactly why it can say nothing about configuration, load, emergent behaviour or the
unanticipated — and fidelity, the price Part 3 was paying without naming it, is the quantity larger tests
buy back.

## A note on scope

The source is four chapters of a book, thick with named employers, internal tools, products, teams and
individuals. The booklet names **the concepts and one eponymous law, and nothing else** — no companies, no
products, no internal frameworks, no books, no people. What it keeps are the terms where the name is the
transferable unit: size and scope, small/medium/large, the pyramid and its two antipatterns, flakiness,
brittleness, the public-interface rule, state versus interaction testing, seams and dependency injection,
faking, stubbing, interaction testing, fidelity, the phases of a larger test, and the catalogue of larger
test types. One declared exception — the law about every observable behaviour of an interface being
depended on by somebody keeps its eponym, because it is cited by name everywhere the idea travels and is
not separable from it. Everything left unnamed, and the reasoning for that exception, is recorded in
`../META.md`.

## A note on styling

Like competencies 5–12, this booklet carries one scoped `<style>` block inside `body.html`: it reduces the
monospace sketch size, tightens the tracker and final quiz, suppresses the page break after the last
section, and stops an `h3` from ever being the last thing on a page. It keeps competency 11's change of
letting every anchor sketch break across pages, and competency 12's rule that a table's header row never
sits alone at the foot of a page. Its own addition is a second, smaller size for the whole-subject sketch
in Section 6 — 7.15pt against the 8.05pt used for the four part sketches — because that one diagram carries
the entire subject and will not fit a page at the part-sketch size. Competencies 1–4 take all their styling
from the shared block.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=SWE-Testing-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

Then check the pages: `python3 ../booklet-template/check-pages.py SWE-Testing-Study-Booklet.pdf`

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on testing" whenever you want them; there is no schedule. Offline answers can be handed over a
whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
