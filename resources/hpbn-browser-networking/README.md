# Browser Networking — printable study booklet

- `HPBN-Browser-Networking-Study-Booklet.pdf` — 47 pages, A4, grayscale, print-ready.
- `booklet.html` — the rendered source. Self-contained: no images, no external CSS, no fonts to fetch.
- `body.html` — the content alone; `booklet.html` is this plus the shared style block.

## Contents

| Section | Contents |
|---|---|
| 1 | Learning goal, the core model, four-part roadmap |
| 2–5 | One part each: tenth-grader version → everyday analogy → term table (name · definition · example · boundary vs look-alike) → trade-offs → concept-boundary box → anchor sketch → plain/expert phrasing table → two retrieval questions on unseen cases → a 2×2 |
| 6 | Whole-competency concept sketch, one question per node, plus the master 2×2 decision card |
| 7 | Symptom → diagnosis → move (latency and HTTP/1.x, then streaming transports) · reverse mapping: technique → what it counters |
| 8 | Numbers worth remembering · glossary |
| 9 | Answer key |
| 10 | Spaced-review tracker (day 1/3/7/16/35) · final quiz |

Parts: **1** latency is the ceiling · **2** what HTTP/1.x makes you do · **3** push, cheaply:
Server-Sent Events · **4** the full socket: WebSocket.

The spine is *the floor is the speed of light, and everything above it is an argument about round
trips*. Part 1 sets the floor and separates the delay you can buy your way out of from the one you
cannot. Part 2 shows how one missing protocol feature — multiplexing — generates every workaround in
the HTTP/1.x toolbox. Parts 3 and 4 are the two ways to stop paying a round trip per update: one
cheap, text-only and still ordinary HTTP; one that gives you the whole socket and charges you every
service the browser was providing for free.

## A note on styling

Like competency 5, this booklet carries one scoped `<style>` block inside `body.html`, reducing the
monospace sketch size, tightening the tracker and final quiz, and suppressing the page break after
the last section. Competencies 1–4 take all their styling from the shared block copied in at assembly
time. The scoped rules exist to fit five large sketches onto their pages; if the shared style block
changes, check this booklet's sketch pages first.

## Printing

A4 portrait, **100% scale — do not use "fit to page"**, double-sided, short-edge bind.
Pure grayscale: no distinction depends on colour, and none depends on fill alone.

## Regenerating the PDF

```sh
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=HPBN-Browser-Networking-Study-Booklet.pdf \
  file://$PWD/booklet.html
```

## Being questioned on this

18 questions — the 8 applied cases and the 10 final-quiz questions — are registered in
`../competency-progress.json`, each with its ideal answer frozen inline. Say **"drill me"** or
"quiz me on browser networking" whenever you want them; there is no schedule. Offline answers can be
handed over a whole part at a time.

The printed final quiz has no answers in the booklet by design. Their ideals live in the tracker,
so the quiz is gradeable without being self-checkable on paper.

Built from the scaffold in `../booklet-template/`.
