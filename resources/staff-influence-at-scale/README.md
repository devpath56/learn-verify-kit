# Raising the People Around You — printable study booklet

- `Staff-Influence-At-Scale-Study-Booklet.pdf` — 59 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-subject concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move (helping one person; helping a group, and making it last) · reverse mapping: practice → what it counters |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** telling people things · **2** making it stick ·
**3** making it safe to move fast · **4** handing over the work.

The spine starts from an arithmetic problem: influence begins in individual relationships, and past a
certain scope there are not enough hours in the day to have enough of them. So it has to be described
along two axes rather than one. The first is **what you give** — advice, which explains how you relate to
a topic and can be taken or left; teaching, which aims not at transmission but at the other person
internalising it; guardrails, which do not instruct anybody but make it safe to move quickly and to be
wrong; and opportunity, which is the one that actually develops people, because people learn by doing more
than they learn from being told, shown or coached. The second is **how far it travels**: one person, a
group, or a change that continues after you step away. Two warnings run against instinct and are part of
the spine rather than footnotes to it — do not skip the smaller ranges, and do not chase the widest one,
because too many programmes overwhelm an organisation and joining an existing effort usually beats
founding a new one.

## A note on scope

The source chapter is thick with named people, employers, products, publications and talks. The booklet
names **the coined concept vocabulary and nothing else** — no companies, no products, no internal tools,
no books, no conferences, no individuals. What it keeps are the terms where the name is the transferable
unit: the three tiers and the four mechanisms; shadowing, pairing and reverse shadowing; rubber duck
debugging; change management; paved roads; in-group favouritism; and the four parts of sponsorship, given
as verbs rather than attributed. One deliberate exception — the idiom for handing over responsibility
keeps its original wording, which contains a brand name, because the phrase is not separable from it.
Everything left unnamed, and the reasoning for that exception, is recorded in `../META.md`.

## A note on styling

Like competencies 5–11, this booklet carries one scoped `<style>` block inside `body.html`: it reduces the
monospace sketch size, tightens the tracker and final quiz, suppresses the page break after the last
section, and stops an `h3` from ever being the last thing on a page. It keeps competency 11's change of
letting every anchor sketch break across pages, and adds one of its own — a padding override on the four
carry-out boxes, so that each part's closing rule sits with its 2×2 rather than stranded alone on the next
page. Competencies 1–4 take all their styling from the shared block.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=Staff-Influence-At-Scale-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

Then check the pages: `python3 ../booklet-template/check-pages.py Staff-Influence-At-Scale-Study-Booklet.pdf`

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on raising the people around you" whenever you want them; there is no schedule. Offline answers
can be handed over a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
