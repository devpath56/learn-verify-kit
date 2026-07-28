# Incident Response & Postmortems — printable study booklet

- `SRE-Incident-Postmortem-Study-Booklet.pdf` — 47 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-competency concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move (during an incident, preparing between incidents, reading a postmortem) · reverse mapping: practice → what it counters |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** the structure, before you need it · **2** mitigate first, understand later ·
**3** practise before the pager · **4** the write-up that changes something.

The spine is that an outage contains two problems, and only one of them is technical. The second —
coordinating everyone converging on it — is what turns a bad hour into a bad day, and structure is the
answer to it: a single line of command, roles agreed beforehand, one place where everyone talks, a
record kept as you go. Once that exists, the work has an order people reliably invert: stop the
bleeding before you understand the wound, because knowing *where* a cause is arrives long before
knowing *what* it is. None of it can be improvised under stress, so Part 3 is about what must be
decided calmly, and Part 4 about the only artefact that outlives the incident.

## A note on scope

Both source chapters are built from case studies at two named companies, and they name a great many
products, internal tools and programmes. The booklet names **one** thing: the Incident Command System
and the year it was established, because that framework is the origin of the whole practice, is more
than fifty years old, and belongs to no vendor. It names no companies, no products, no internal
programme names and no individuals — the case studies are told in terms of what failed, and the drills
in terms of what they do. Everything left unnamed is recorded in `../META.md`.

This is the second booklet built from this book; competency 3 uses two different chapters of it, and
there is no overlap.

## A note on styling

Like competencies 5–8, this booklet carries one scoped `<style>` block inside `body.html`: it reduces
the monospace sketch size, tightens the tracker and final quiz, suppresses the page break after the
last section, allows the section 6 concept map to break across pages, and stops an `h3` from ever
being the last thing on a page. Competencies 1–4 take all their styling from the shared block.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=SRE-Incident-Postmortem-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

Then check the pages: `python3 ../booklet-template/check-pages.py SRE-Incident-Postmortem-Study-Booklet.pdf`

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on incident response" whenever you want them; there is no schedule. Offline answers can be
handed over a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
