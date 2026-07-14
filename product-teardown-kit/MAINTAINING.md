# Maintaining the Product Teardown Kit

Everything you need to evolve this kit lives in this repo. No external context required.

## Repo layout
```
.claude/skills/
  start/            starter screen ("start" / "what can you do")
  teardown/         the four-lens loop   → references/house-style.md  ← HOW output reads
                                          → references/lens-rubric.md ← WHAT + the L0–L5 scale
  scorecard/        fast L0–L5 read per lens
  compare/          head-to-head: find the fork
  extract-patterns/ 🧰 steal-this cards
  revise/           depth + plain-language self-check
  track/            session log + spaced review
tests/regression-cases.md   guardrail tests (Tier A inherited-real, Tier B seed)
CLAUDE.md           how Claude should maintain this repo
README.md / INSTALL.md      user-facing
```

## The two shared laws
- **`house-style.md`** governs *how* every skill's output reads: plain-take-first, concrete-before-abstract, name+define+example+boundary, hide internals, two-part scorecard, steal-this card, end-with-a-quiz.
- **`lens-rubric.md`** governs *what* a teardown examines (the four lenses) and *how deep* it goes (the L0–L5 depth scale, floor ≥ L2, certified ≥ L3).

Change a cross-cutting rule in one of these, never in each skill. Every other skill references them via `../teardown/references/…`.

## Running the tests
The suite in `tests/regression-cases.md` has two levels:

1. **Static (guardrail present?)** — confirm every rule still exists in the kit text:
   ```
   cd .claude/skills
   grep -riq "plain take" . && echo present    # etc. per case
   ```
   Fast; catches accidental deletion of a rule.

2. **Behavioral (does it comply live?)** — feed each case's trigger to the kit in a fresh chat and check the binary PASS. Use an independent judge, not self-assessment. This is the real test; run it before any release.

## Why each rule exists (provenance)
- **Tier A** cases guard rules ported from the Learn·Verify Kit's `house-style`; each traces to a real error caught in that kit's 2026-07-07 live test.
- **Tier B [seed]** cases guard teardown-specific rules (depth ≥ L2, name-the-rejected-alternative, fact-vs-inference, the fork, steal-this cards). They were written at construction from the design — **not yet from an observed live failure** — and are flagged `[seed]`. Promote a seed to real on the first observed failure of that rule: replace its watched-for signature with the one you actually saw, drop the `[seed]` tag.

| Rule | Prevents | Case |
|---|---|---|
| Plain-take-first | Opening a teardown with jargon | T-01 |
| Bullets, no prose walls | Wall-of-text analysis | T-02 |
| Hide internal machinery | Leaking step labels / lens codes | T-03 |
| Two-part scorecard | Verbose feedback; no term-usage read | T-04, T-09 |
| Define jargon inline + boundary | Undefined terms in feedback | T-06 |
| End with a quiz | "Want me to…?" chatter | T-05 |
| Anchor sketch when structural (branched) | Structure taught in prose | T-07, T-10 |
| Two transfer questions, sequential | Only one retrieval per lens | T-08 |
| Depth floor ≥ L2, climb to L3 | Brochure restates / bare mechanics | T-11, T-12 |
| Fact vs inference marking | Guess laundered as fact | T-13 |
| Name + define + example + boundary | Name-dropping a pattern | T-14 |
| Lens preview before lens 1 | Diving in with no map | T-15 |
| Pick only the lenses that matter | Forcing all four onto a simple tool | T-16 |
| Steal-this card, bounded | No portable takeaway / a slogan | T-17, T-18 |
| Compare = the fork | Two stapled summaries; unscoped winner | T-19, T-20 |
| Ambiguity → ≤3 distinct-product pick-list | Tearing down the wrong product | T-21 |
| Contributing-factors + falsifiability (would-be-wrong-if) | Single-cause / hindsight "why it won" | T-22 |
| "What would kill it" pre-mortem pass | No failure-mode analysis | T-23 |
| Road-not-taken carries its cost | Choice named with only upside | T-24 |
| Anti-persona + unit economics in GTM lens | GTM missing the sharp negative + serve cost | T-25 |
| Evolution pass (when the product has moved) | Present-tense snapshot despite a pivot | T-26 |

## Releasing
1. Run the behavioral suite; fix any regression.
2. Re-scan for leaks/external paths: `grep -rIn -e '/Users/' -e '/home/' .`
3. Commit, push. To hand someone a single file: `zip -r product-teardown-kit.zip . -x '.git/*' '*.DS_Store'`.

## Changelog
- **v1.1** — Depth-rigor pass, from a heavily-engineering-blog-weighted research sweep (ADRs, Google SRE postmortems, pre-mortems, Wardley, Stratechery). Added: falsifiability (`would-be-wrong-if`) on every claim; a "what would kill it" pre-mortem; L4/L5 reframed as generality vs contingency with plural contributing factors; road-not-taken must carry its cost; a conditional evolution pass; anti-persona + unit-economics probes on the GTM lens; a survivorship self-check. Five matching regression cases (T-22–T-26), filed `[seed]` since they're method-driven, not yet from an observed live failure.
- **v1.0** — Initial release. Chat/Cowork-native (no hooks). Seven skills + two shared laws (house-style + lens-rubric). Four lenses, L0–L5 depth scale, self-check gate, spaced review. Content discipline ported from the Learn·Verify Kit; regression suite seeded (Tier A inherited-real, Tier B design-seed) and set to grow only from real errors.
