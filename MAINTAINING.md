# Maintaining the Learn·Verify Kit

Everything you need to evolve this kit lives in this repo. No external context required.

## Repo layout
```
.claude/skills/
  start/          starter screen ("start" / "what can you do")
  learn/          teaching loop      → references/house-style.md  ← the shared law
  clarify/        Insight Quality L0–L5
  understand/     Grill Depth L0–L5
  revise/         Recall Rubric + self-check   → references/certification-gate.md
  concept-sketch/ dual-coded sketch + decision card  → references/recall-rubric.md
  track/          session log + spaced review
tests/regression-cases.md   26 guardrail tests, one per real error
CLAUDE.md         how Claude should maintain this repo
README.md / INSTALL.md      user-facing
```

## Running the tests
The suite in `tests/regression-cases.md` has two levels:

1. **Static (guardrail present?)** — confirm every rule still exists in the kit text:
   ```
   cd .claude/skills
   grep -riq "plain language" . && echo present   # etc. per case
   ```
   Fast; catches accidental deletion of a rule.

2. **Behavioral (does it comply live?)** — feed each case's trigger to the kit in a fresh chat and check the binary PASS. Use an independent judge, not self-assessment. This is the real test; run it before any release.

## Why each rule exists (provenance)
Every rule traces to a real failure caught during the kit's hardening. Don't undo one without understanding what it prevents.

| Rule (in house-style / learn) | Prevents | Case |
|---|---|---|
| Plain-language-first | Opening a lesson with jargon/citations | R-01 |
| Example-first, bullets, no prose walls | Abstract, wall-of-text teaching | R-02, R-03 |
| 3-bullet roadmap before chunk 1 | Diving in with no map | R-04 |
| Hide internal machinery | Leaking step labels / internal tags to the learner | R-05 |
| Two-part scorecard (completeness + lingo) | Verbose confirms; no feedback on term usage | R-06, R-07 |
| Always name the expert term | Plain but no industry lingo | R-08 |
| Ambiguity → ≤3 distinct-meaning pick-list | Silently teaching the wrong domain | R-09, R-10, R-11 |
| Boundary rule (name the neighbor) | Confusing look-alike concepts (e.g. registration vs conflation) | R-12 |
| No name-dropping (define + example + boundary) | Naming a term/fix with no example | R-13 |
| End with a quiz, no trailing questions | "Want me to…?" chatter | R-14 |
| Continuation-chunk exemption | Re-explaining a term already taught in chunk 1 | R-15 |
| Define jargon inline with boundary | Using a term in feedback without defining it | R-16 |
| Anchor sketch when structural | Teaching a structure with no visual | R-17 |
| Decision card + revision deck | Ending with no transferable, portable takeaway | R-18 |
| Auto-persist revise-DB at consolidation | Consolidation ends with only an in-chat deck; log never saved to `progress.json` until a manual "track" | R-24 |
| Nested bullets + tables only (no prose intros) | Chunks opened with labeled prose sections / floating sentences | R-25 |
| Sketches visually encoded, not monochrome | Anchor/concept sketch rendered as a bare gray ASCII tree (low retention) | R-26 |

## Releasing
1. Run the behavioral suite; fix any regression.
2. Re-scan for leaks/external paths: `grep -rIn -e '/Users/' -e 'PM-OS' .`
3. Commit, push. To hand someone a single file: `zip -r learn-verify-kit.zip . -x '.git/*' '*.DS_Store'`.

## Changelog
- **v1.0** — Initial release. Chat/Cowork-native (hooks removed after confirming they don't run in chat). Seven skills + shared house-style. Hardened through a live teaching test: 13 output rules added, each with a regression case. 18-case suite. Zero external dependencies.
