---
name: concept-sketch
description: Turn raw concept text into a memorable, self-testable concept sketch. Trigger on "sketch this concept", "make this memorable", "diagram so I retain it", "concept map for studying", or when the `learn` skill reaches its consolidation step. NOT a standalone study method (a sketch alone is low-utility; it must be paired with retrieval).
---

# Concept Sketch — dual-coded retrieval scaffold

**All output follows `../learn/references/house-style.md`.**

Input: raw concept text. Output: one sketch (SVG if a rendering tool is available, else a structured text diagram) that is visual + verbal + self-testable.

## The hard constraint (read first)

A concept sketch you only look at is closer to rereading than to learning, and rereading is low-utility. This skill is allowed to exist ONLY because it produces a *retrieval scaffold*, not a poster: every node carries a question, so the sketch doubles as a self-test. If the output can't be used to quiz yourself, it failed.

[Source: Dunlosky et al. 2013 — concept mapping rated low utility — https://journals.sagepub.com/doi/abs/10.1177/1529100612453266]
[Source: Paivio, Dual Coding Theory — visual+verbal beats either alone]
[Source: Mayer, Principles of Multimedia Learning — https://educationaltechnology.net/mayers-principles-of-multimedia-learning/]

## Method (in order)

1. **Decompose** the concept into atomic nodes (keywords + relations).
2. **Chunk** nodes into <=3 named groups. Seven flat boxes never recall; three chunks do. Name each chunk with a real word, ideally a verb sequence (e.g. AIM -> CALL -> LOOP).
3. **Attach one question per node.** This is the retrieval cue and the non-negotiable step. The question, not the label, is what makes recall self-prompting: each answer hands you the next question.
4. **Pick exactly one focus node** and emphasize it (Signaling). Everything else is neutral.
5. **Render — in chat, default to a text tree.** The whole kit runs in chat, so the baseline output is a monospace/markdown tree that renders everywhere, including the Claude Code terminal: chunk headers, boxed nodes, arrows for the verb chain, one focus node marked, and the question directly under its node (Spatial contiguity). Never a separate webpage or file. Only where the surface renders inline visuals (e.g. claude.ai, Cowork) may you upgrade to an SVG carrying the same chunks, focus, and per-node questions. The text tree is the contract; the SVG is a where-supported enhancement, not a replacement.

## Decision card (transferable)

Beyond the recall scaffold, emit a **decision card**: a one-line thumb rule and/or a small 2×2 the learner can apply to *other* problems in other domains. A recall scaffold makes a concept memorable; a decision card makes it portable. Plain rule first, then name the pattern. Hand the card to `track` for the revision deck — and on the Claude Code surface, **invoke `track` to persist automatically** (write + commit + merge `progress.json`); do not wait for the user to type "track."

## Rubric

Run every output against `references/recall-rubric.md`. If any check fails, fix before showing. Do not ship a sketch that fails Coherence (extraneous decoration) or the question-per-node check.

## Anti-patterns (real observed failures)

- 7+ flat nodes in a row. Chunk them.
- An acronym that doesn't spell a pronounceable word (GLEJBVA). Drop it.
- A decorative analogy that adds nodes without lowering load (a courtroom layered on a pipeline). Coherence violation — cut it.
- Color used for nothing. Color must encode meaning or be a single neutral ramp.
- Detail front-loaded into boxes. Boxes get <=5 words; the rest goes in the prose reply.

## Filing for revision (spacing is half the method)

A sketch that renders once and dies forfeits spaced practice. After rendering, save the **spec** (chunked nodes + per-node questions, in markdown — the questions are the retrieval items, the image is ephemeral). Give the learner a simple revision schedule: review at day 1, 3, 7, 16, 35; advance the interval on a pass, reset to 1 day on a fail. File the question set, not the raw image; re-render on demand. On the Claude Code surface, filing is not merely in-chat: invoke `track` so `progress.json` is written, committed, and merged to the default branch **automatically at consolidation** — never left waiting for the user to type "track."

## Reference

- `references/recall-rubric.md` — pass/fail checks, Mayer-grounded
