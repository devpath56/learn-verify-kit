#!/usr/bin/env python3
"""Compile the single-file transfer edition: TRANSFER-KIT.md.

Concatenates the agent execution protocol (defined here), the playbook
(BUILDING-A-SET.md), and the two tool artifacts (skeleton.html,
check-pages.py) into one .md a Claude Code session can execute directly.

TRANSFER-KIT.md is GENERATED. Never edit it by hand — edit the sources
and rerun:  python3 compile-transfer.py
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))


def read(name):
    with open(os.path.join(HERE, name), encoding='utf-8') as f:
        return f.read()


PROTOCOL = """\
# LVK booklet kit — single-file edition

**To the human:** give this file to a Claude Code session together with your source material
(the chapters for one competency, as PDF or text) and say "build my booklet from this". Everything
else — the scaffold, the page checker, the method — is embedded below.

**To the agent (Claude Code):** this file is your runbook. The human supplies a source and
decisions; you do the construction. The **Playbook** section below is the rulebook — every decision
id (A1–J) and gate (I4–I13) it defines is binding. This protocol is the order of operations.

## Execution protocol

**Step 0 — extract the tools.** Two `## Artifact:` sections sit at the end of this file. Write each
fenced block to disk **verbatim** under `resources/booklet-template/` (create it if absent):
`skeleton.html` and `check-pages.py`. Verify: `skeleton.html` renders to a valid multi-page PDF
untouched, and `check-pages.py --help` runs. Environment needed: a headless Chromium/Chrome,
`python3`, `pdftoppm` (poppler-utils). Find the browser binary before you need it.

**Step 1 — ingest the source, completely.** Extract to plain text, note where each chapter starts,
and read all of it before writing anything. Not a skim: the two defects that survive to review —
hedge drift (I9) and reused examples in questions (E1) — both come from writing against a mental
summary instead of the text.

**Step 2 — propose the shape, then wait.** Give the human: a one-sentence learning goal (A3), four
parts on a causal spine with the ordering rationale (B1–B3), and the de-vendoring line you intend
(§2.3). Get agreement before writing teaching copy — B2 wrong costs a rewrite.

**Step 3 — write the body.** `resources/<slug>/body.html`, following the Part anatomy (C) for all
four parts and the back-matter set (H). Work in a scratch directory with **absolute paths** —
relative paths across tool calls silently no-op. Teaching content is traceable to the source (A2);
invented material appears only in the retrieval questions, which must be cases the source never
worked through (E1). Write the 10 final-quiz ideals now, in prose deliberately unlike the
booklet's — they are registered in Step 6, never printed (H).

**Step 4 — assemble and render.** `booklet.html` = the head of `skeleton.html` (never a sibling
booklet's head — that is how gate I11 earned its existence) + your body. Set the `<title>`. Render
per §1.8, then loop `check-pages.py` (I5) until 0 pages flagged — fixing by tightening copy
upstream, never by filler. Two traps: an edit that reflows without deleting lines saves nothing,
and CSS grid rows equalise to the tallest cell.

**Step 5 — run the mechanical gates.** I4 (rasterise and look), I10 (count inverted tokens and
focus cells — exactly one each per sketch/matrix), I11 (title and everything above `<body>`),
I12 (structural counts; zero emoji, hue, kit vocabulary, personal data, paths). Then the judgement
gate I9: diff every prescriptive and quantitative claim against the source — every hedge stays.

**Step 6 — register the bank.** 18 questions into `resources/competency-progress.json` (create
from the §3.2 schema if absent) — extracted **programmatically** from the HTML, stable ids, frozen
ideals inline. Run gate I8: booklet⇄bank byte-identical, and no quiz ideal reproduced in the
booklet (80-character window).

**Step 7 — record.** `META.md` (create from §2.2 if absent): spine row, works-referenced section,
de-vendoring line, known-gaps entries for every deviation. Folder README. No meta in the booklet
itself (G1–G5).

**Step 8 — independent review (I13).** Spawn a subagent with fresh context. Give it the rendered
PDF or body, the full source text, and the gate numbers; brief it to be adversarial and report
nothing that is already correct. **Verify each finding against the source yourself before acting**
— reviews contain false positives, and accepting one deletes a correct passage. Fix, re-render,
re-run I5 and I8, and retire-and-reissue (new id, `retired_reason`) any question a finding kills.

**Step 9 — deliver.** Commit (scoped sensibly), hand the human the PDF, and report what the review
found and what you did about it. The booklet is finished when the bank is registered and the gates
pass — not before.

Throughout: when replacing text in HTML, use a tolerant helper that tries both entity and literal
forms of typographic characters (`&mdash;` vs `—`) and collects misses instead of aborting.

---

"""

MANIFEST_OLD_HEAD = "**Transferring this playbook.**"
MANIFEST_NEW = """\
**About this edition.** This is the compiled single-file transfer of the three-file bundle
(`BUILDING-A-SET.md` + `skeleton.html` + `check-pages.py`). The tools are embedded as
`## Artifact:` sections at the end; the execution protocol above tells the agent to extract them
first. Generated by `compile-transfer.py` — edit the sources, never this file.
"""


def main():
    playbook = read('BUILDING-A-SET.md')
    # Replace the three-file manifest paragraph with the single-file note.
    m = re.search(re.escape(MANIFEST_OLD_HEAD) + r'.*?\n\n(?=---)', playbook, re.S)
    if not m:
        sys.exit("manifest section not found in BUILDING-A-SET.md — compile aborted")
    playbook = playbook[:m.start()] + MANIFEST_NEW + '\n' + playbook[m.end():]
    # Demote the playbook's title so the compiled file has one H1.
    playbook = playbook.replace('# Building a booklet set — the complete playbook',
                                '# Playbook — building a booklet set', 1)

    skeleton = read('skeleton.html')
    checker = read('check-pages.py')
    for name, body in (('skeleton.html', skeleton), ('check-pages.py', checker)):
        if '````' in body:
            sys.exit(f"{name} contains a 4-backtick run; fences would break — compile aborted")

    out = (PROTOCOL + playbook.rstrip() + '\n\n---\n\n'
           '# Embedded artifacts\n\n'
           'Extract these verbatim (Step 0). Fence lines are delimiters, not content.\n\n'
           '## Artifact: skeleton.html\n\n````html\n' + skeleton.rstrip('\n') + '\n````\n\n'
           '## Artifact: check-pages.py\n\n````python\n' + checker.rstrip('\n') + '\n````\n')

    with open(os.path.join(HERE, 'TRANSFER-KIT.md'), 'w', encoding='utf-8') as f:
        f.write(out)
    print(f"TRANSFER-KIT.md written: {len(out)} bytes")


if __name__ == '__main__':
    main()
