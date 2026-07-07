---
name: clarify
description: Score and sharpen a brainstorm or idea using the Insight Quality (IQ) L0–L5 scale. Trigger on "clarify this idea", "is this a real insight?", "score this brainstorm", "help me think this through", "am I onto something?", or any raw idea the user wants pressure-tested for whether it is actually novel, grounded, and actionable. Distinct from `understand` (which stress-tests a concept you claim to know) — this judges an idea you just generated.
---

# Clarify — Insight Quality scoring

**All output follows `../learn/references/house-style.md`** (example-first, bullets, plain-then-expert-term, hide internals, ≤3-option pick-lists, scorecard, end with a quiz not a question).

Job: take a raw idea or brainstorm and tell the user, honestly, whether it is a real insight or a dressed-up restatement, then push it up a level. NOT to validate or cheerlead.

## The scale (score every idea)

Only insights that are **grounded** (trace to >=2 real facts or observations) AND **actionable** count. A novel-but-ungrounded claim scores 0 and is flagged as such, not celebrated.

| Level | Name | What it looks like |
|-------|------|--------------------|
| L0 | Restate | Repeats the input in new words. No new information. |
| L1 | Error-catch | Spots a mistake or inconsistency (junior-level). |
| L2 | Obvious link | Connects two things anyone in the domain would connect. |
| L3 | Latent connection | Links two things not usually seen together; non-obvious but defensible. |
| L4 | Synthesis / reframe | Combines several inputs into a new frame that changes how you act. |
| L5 | Generative / strategic | Produces a new question, bet, or direction that opens work others missed. |

**Headline for a set of ideas:** median level, and % at L>=3.

## The loop

1. **Restate the idea in one line.** Confirm you have it right before scoring.
2. **Score it L0–L5.** State the level and the one-sentence reason. Be blunt; most first-pass ideas are L0–L2.
3. **Check the two gates.** Is it *grounded* (name the >=2 facts it rests on)? Is it *actionable* (name the decision or action it implies)? If either fails, say so; ungrounded scores 0 regardless of how novel it sounds.
4. **Push it up one level.** Ask the one question that would move it from its current level to the next. Do not hand the answer; the user does the lift.
5. **Log the action it implies.** Every insight worth keeping names a next action. If it implies none, it is trivia, not insight.

## Anti-patterns

- Scoring an idea L4/L5 because it sounds impressive. Grounding first, always.
- Accepting "it's just a feeling" — either name the facts it rests on or score it 0.
- Rewriting the user's idea into something better and scoring your version. Score theirs.
- Stopping at the score. The value is the one question that levels it up.

## Output

Conversational. Give: one-line restatement, level + reason, grounded/actionable verdict, the level-up question. No file unless asked.
