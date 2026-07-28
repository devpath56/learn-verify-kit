# LVK booklet template

Reusable scaffold for building a printable Learn·Verify booklet for any core competency.

| File | What it is |
|---|---|
| `DECISIONS.md` | The decision skeleton — every choice that shapes a booklet, with the rule that resolves it and the failure mode if you resolve it wrong. Read this first. |
| `skeleton.html` | The grayscale print scaffold with those decisions already encoded as empty structure. Copy, fill the `{{placeholders}}`, render. |

## Building one

1. Work through `DECISIONS.md` sections A–C and settle scope, the four parts, and the grouping axis
   **before** writing any teaching copy. Getting B2 wrong costs a rewrite, not an edit.
2. Copy `skeleton.html` to `resources/<competency>/booklet.html` and fill it.
   The Part block is written once — duplicate it four times.
3. Render:

   ```sh
   chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
     --print-to-pdf=<Competency>-Study-Booklet.pdf \
     file://$PWD/booklet.html
   ```

4. Register the question bank into `../competency-progress.json` (decision I6) — 18 questions with
   stable ids and a frozen ideal inline for each — and add the competency's provenance row to
   `../META.md` (decision I7). The booklet isn't finished until both are done.
5. Verify per decision I4/I5: rasterise a part opener, a matrix page, a sketch page and the cover
   and look at them; then flag any page under ~800 characters and fix the orphan upstream.

## Non-negotiables

- **Grayscale only.** No hue anywhere; inversion means focus and nothing else; no emoji.
- **No meta.** No provenance, no method rationale, no construction commentary, no per-fact
  confidence tags. All of that lives once, in the SSOT meta section for the competency set.
- **Every part carries** a tenth-grader box, a term table with a boundary column, an anchor sketch,
  two retrieval questions on unseen cases, and one 2×2.
- **Answers live at the back**, never on the question page.
- **The question bank is registered** in `../competency-progress.json` — 18 questions, stable ids,
  ideal answers frozen inline before anyone attempts them.
- **Provenance is recorded** in `../META.md`, and nowhere else.

## Reference build

`../release-it-ch4-5/` — the first booklet produced from this template.
