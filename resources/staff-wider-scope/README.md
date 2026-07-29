# Working at Wider Scope — printable study booklet

- `Staff-Wider-Scope-Study-Booklet.pdf` — 62 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-subject concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move (getting oriented, moving an idea or a project, leading and being watched) · reverse mapping: practice → what it counters |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** what you cannot see from here · **2** the terrain and the destination ·
**3** making a huge project tractable · **4** the influence you did not ask for.

The spine runs from a single change of constraint. Past a single team the thing that fails first is not
your skill but your view: depth in a domain is bought with time inside it, and time inside it is paid for
in perspective — your own concerns inflate, other people's flatten, the defects you live beside stop
registering, and the reason for the work quietly detaches from the work. Getting that view back is the
first part. A position is not enough to navigate by, so the second part supplies the two things that are:
the terrain — how the organisation actually behaves, where the gaps and gatekeepers and unwinnable fights
are, where decisions really get made — and the destination, because a group that cannot say where it is
going cannot be trusted to choose its own route. Those two together are what turn an overwhelming project
into a tractable one, which is the third part: the overwhelm at the start of a big project is an
information problem, answered by gathering context, building structure, and then driving rather than
letting things happen. And the fourth part is the sting: at this scope your work is checked less and
copied more, which makes how you work part of what you produce.

## A note on scope

The source chapters are dense with named people, companies, products, books, conferences and publications.
The booklet names **one eponymous typology, one dated law, one vendor-neutral emergency framework, one
standard acronym, and the coined concept vocabulary** — and nothing else. The typology of organisational
cultures keeps its author's name on the same grounds as the eponymous law in competency 10: an eponymous
model is durable vocabulary. Coined terms that have entered general use — glue work, radiating intent,
innovation tokens, the watermelon project, the shadow org chart, paved roads and goat tracks — are named
because the name is the transferable part. Everything else is described by what it does: no companies, no
products, no internal tools, no individuals beyond the one eponym, no books, no conferences. Everything
left unnamed is recorded in `../META.md`.

## A note on styling

Like competencies 5–10, this booklet carries one scoped `<style>` block inside `body.html`: it reduces the
monospace sketch size, tightens the tracker and final quiz, suppresses the page break after the last
section, and stops an `h3` from ever being the last thing on a page. It goes further than its predecessors
in one respect — **every** anchor sketch is allowed to break across pages, not only the one or two taller
than a page. Five large sketches kept atomic stranded a following block on three separate pages; letting
them flow removed all of it and saved two pages. Competencies 1–4 take all their styling from the shared
block.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=Staff-Wider-Scope-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

Then check the pages: `python3 ../booklet-template/check-pages.py Staff-Wider-Scope-Study-Booklet.pdf`

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on working at wider scope" whenever you want them; there is no schedule. Offline answers can be
handed over a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
