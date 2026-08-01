# LVK booklet template

Reusable scaffold for building a printable Learn·Verify booklet for any core competency.

| File | What it is |
|---|---|
| `BUILDING-A-SET.md` | **The playbook — read this first, and everything is in it.** Defining a set for a role, the full build pipeline, every decision A–J with the rule that resolves it and the failure mode if you resolve it wrong, where meta details live, the progress-file schema and grading loop, and the numbered verification gates. |
| `skeleton.html` | The greyscale print scaffold with those decisions already encoded as empty structure. Copy, fill the `{{placeholders}}`, render. |
| `check-pages.py` | The ink-based orphan check (gate I5). |
| `TRANSFER-KIT.md` | **Generated — do not edit.** The single-file transfer edition: execution protocol for a Claude Code agent + the full playbook + both tools embedded as extractable artifacts. Regenerate with `compile-transfer.py`. |
| `compile-transfer.py` | Builds `TRANSFER-KIT.md` from the three sources above. |

This README is an index, not a second copy of the rules. Every rule lives in `BUILDING-A-SET.md`
and nowhere else — a rule with two homes is a rule that will drift.

## Building one

1. **Part 0 and §1.2** — settle scope, the four parts and the grouping axis **before** writing any
   teaching copy. Getting B2 wrong costs a rewrite, not an edit.
2. Copy `skeleton.html` to `resources/<competency>/booklet.html` and fill it. The Part block is
   written once — duplicate it four times.
3. Render:

   ```sh
   chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
     --print-to-pdf=<Competency>-Study-Booklet.pdf \
     file://$PWD/booklet.html
   ```

4. Run every gate in **Part 4** (I4–I13). Nothing ships until they all pass.
5. Register the bank, record provenance, write the folder README — **§1.9**. A booklet whose bank
   isn't registered cannot be quizzed, so it isn't finished.

## Checking a rendered booklet

```sh
python3 check-pages.py ../<folder>/<Booklet>.pdf
```

Rasterises every page and flags any whose ink stops above 45% of the page height — gate I5. It
catches what counting extracted characters cannot: a page holding only ruled write-lines, and a page
holding only a heading. Its one blind spot, and the CSS that covers it, are recorded under I5.

## Reference builds

`../release-it-ch4-5/` — the first booklet produced from this template.
`../release-it-ch13-17/` — the second.
`../sre-slo-canary/` — the third.
`../ddia-distributed-data/` — the fourth.
`../ddia-transactions/` — the fifth.
`../hpbn-browser-networking/` — the sixth.
`../sysperf-methodology/` — the seventh.
`../sysperf-benchmarking/` — the eighth.
`../sre-incident-postmortem/` — the ninth.
`../swe-lsc-deprecation/` — the tenth.
`../staff-wider-scope/` — the eleventh.
`../staff-influence-at-scale/` — the twelfth.
`../swe-testing/` — the thirteenth.
