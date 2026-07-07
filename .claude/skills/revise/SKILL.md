---
name: revise
description: Revise an explanation, answer, or draft so it passes the Recall Rubric and the plain-language-first rule. Trigger on "revise this", "check this explanation", "is this clear?", "tighten this", and — most importantly — run it silently on yourself before sending any teaching answer. This is the kit's self-check; in chat there is no hook to catch a bad answer, so the model is its own gate.
---

# Revise — Recall Rubric + self-check

**All output follows `../learn/references/house-style.md`.**

Job: take a draft explanation and make it pass, or tell the user exactly which check it fails and why. NOT to polish prose for its own sake.

**This is a self-check, not a hard block.** In chat/Cowork nothing external inspects the output — no hook fires. So the other teaching skills call this pass on themselves *before* answering: draft, run the checks below, fix, then send. The discipline is yours; there is no safety net.

## The plain-language-first rule (check this first, every time)

Every explanation must open in plain language. Jargon and citations may appear only AFTER a plain-language explanation has already landed. An opening that leads with technical terms or citations fails. This is the single most common failure; catch it in yourself before you send.

**Exception — continuation chunks.** A term already taught plainly in an earlier chunk of the same lesson may be reused in later chunks without a fresh plain-language re-intro. Continuation chunks don't restart from zero; only the *first* introduction of a term must be plain-first.

## The Recall Rubric (10 checks — fail any, fix before shipping)

| # | Check | Pass condition | Principle |
|---|-------|----------------|-----------|
| 1 | Plain-language-first | Opening sentences use plain words; jargon/citations come after | Feynman / self-explanation |
| 2 | Chunking | <=3 named groups; <=4 items per group | Cognitive Load Theory; Miller |
| 3 | Retrieval cue | Every key point can be turned into a question, not just a statement | Retrieval practice (Dunlosky 2013; Karpicke & Blunt 2011) |
| 4 | Self-prompting chain | Points run in an order where each answer implies the next question | Self-explanation / generative processing |
| 5 | Coherence | No decorative element (analogy, image, aside) that doesn't lower load | Mayer, Coherence principle |
| 6 | Signaling | Exactly one main idea emphasized; the rest neutral | Mayer, Signaling principle |
| 7 | Contiguity | An explanation sits next to what it explains, not in a distant aside | Mayer, Spatial contiguity |
| 8 | Brevity | No sentence carries more than one idea; detail lives in follow-up, not the headline | Extraneous-load reduction |
| 9 | Mnemonic honesty | Any mnemonic is a real word/phrase and actually recallable, else dropped | No-slop rule |
| 10 | Retrieval pairing | The piece ends with, or enables, a self-test — never a "just read this" summary | Dual coding works only paired with retrieval |

[Source: Dunlosky et al. 2013 — https://journals.sagepub.com/doi/abs/10.1177/1529100612453266]
[Source: Mayer, Multimedia Learning Principles — https://educationaltechnology.net/mayers-principles-of-multimedia-learning/]

## The two-question fast gate

Before shipping any explanation, answer both:
1. Could the learner quiz themselves from this with the answers hidden? (If no -> fails check 3.)
2. Did I add anything that's there to sound good rather than to reduce load? (If yes -> fails check 5, cut it.)

## The loop

1. **Run the draft against all 10 checks.** Name each failure with its number.
2. **Fix, don't just flag.** Rewrite the failing parts; show the revision.
3. **Re-run the fast gate.** If both pass, it ships.
4. **If it is a taught concept,** hand back the self-test questions that check 3 produced.

## Certification

For a concept to be marked "ready," it must clear the weighted bar in `references/certification-gate.md` (>= 4.0 / 5.0 across recall, grill depth, insight, clarity). A draft that passes the Recall Rubric has cleared the *clarity* dimension only; certification needs all four.

## Output

Show the failing check numbers, the fixes, and the pass/fail verdict. No file unless asked.
