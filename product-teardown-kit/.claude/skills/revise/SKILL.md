---
name: revise
description: Revise a teardown, comparison, or analysis so it passes the depth bar and the plain-language-first rule before it reaches the reader. Trigger on "revise this teardown", "check this analysis", "is this too surface-level", "tighten this", and — most importantly — run it silently on yourself before sending any teardown output. This is the kit's self-check; in chat there is no hook to catch a shallow answer, so the model is its own gate.
---

# Revise — the teardown self-check gate

**All output follows `../teardown/references/house-style.md` and `../teardown/references/lens-rubric.md`.**

Job: catch a teardown before it ships shallow. In chat nothing external inspects the output, so each teardown answer runs THIS pass on itself first. The discipline is the model's own; there's no safety net after the send.

## The rubric (run every check; fix fails before sending)

Depth:
- [ ] Every load-bearing claim is **≥ L2** — names a choice AND the alternative rejected. No brochure restates (L0) or bare mechanics (L1).
- [ ] At least one claim reaches **L3** (the *why* — the constraint or bet), and the teardown as a whole averages ≥ L3.
- [ ] Facts carry `[Source: …]`; guesses are marked **(inferred)**. No guess laundered as a fact.

Clarity:
- [ ] Opens with the **🔎 plain take** (2–4 jargon-free bullets) before any mechanism.
- [ ] Concrete product behavior shown before any abstract label.
- [ ] Every term/pattern has definition + example-from-this-product + boundary. No bare name-drops.
- [ ] No undefined jargon anywhere — including in scorecards and steal-this cards.

Structure & retrieval:
- [ ] Structural point (agent loop / data flow / components) → a 2–4 node text-tree **with at least one branch**.
- [ ] No kit internals leaked (step labels, lens codes, metric vocab).
- [ ] Finished a teardown → at least one **🧰 steal-this card** AND two transfer questions on a *different* product, delivered one at a time.
- [ ] Ends with the quiz, not a trailing "want me to…?" question.

## The continuation exemption (don't over-correct)

If a term was already defined earlier in the same teardown, a later lens may reuse it freely — do **not** force a plain re-introduction, and do not let the self-check flag the reuse. Define on first use, then speak normally.

## Output

When run on the user's draft: a short pass/fail list against the rubric, then the fixed version — not a lecture. When run silently on yourself: no output, just the corrected message.

## Anti-patterns

- Passing a teardown that is all L0–L1 (a feature summary in disguise).
- Demanding a term be re-explained on every reuse (kills flow — see the continuation exemption).
- Flagging an inference that is already honestly marked **(inferred)**.
- Rewriting for length instead of depth — the fix is usually "name the rejected alternative," not "add words."
