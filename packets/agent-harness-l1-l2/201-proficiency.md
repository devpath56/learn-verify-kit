# 201 — Proficiency · recognition, not comparison

## What changes between 101 and 201

| | 101 competency | 201 proficiency |
|---|---|---|
| The question asks for | the heuristic and why it holds | the **cue** that told you which situation this is |
| A good answer | states the mechanism chain | states one action, and the observation that would kill it |
| Failure mode | recites the term, skips the causality | compares four options politely and commits to none |
| Time budget | as long as it takes | the answer arrives before the analysis does |

**The frame is Recognition-Primed Decision (RPD).** Experienced operators do not compare options.
They read the situation as *typical*, which hands them one course of action, and they then run a
mental simulation to find where that action breaks. If it survives, they act. If it breaks, they take
the next typical action, not a scored shortlist.

- Source: Gary Klein, *Sources of Power* (1998) and *The Power of Intuition* (2003).
- **Stated honestly:** RPD is the *method frame* for these cases, not practitioner material about
  agents. The agent content itself stays practitioner-sourced. No transcript context on 201 was found
  on this machine; if you have a different 201 definition in mind, this section is the one to replace.

## The five slots every 201 answer must fill

| Slot | The question it answers |
|---|---|
| **Cues** | what in the report told you which situation this is |
| **Expectancies** | what must also be true if you are right |
| **Plausible goal** | what you are actually trying to protect right now |
| **Typical action** | the one thing you do, not a shortlist |
| **Killer simulation** | the observation that would prove you wrong in under ten minutes |

A 201 answer missing **killer simulation** is a 101 answer with confidence added.

---

## Case 201-A · The spend spike with no deploy (L2)

**Situation.** 03:00. Agent spend is 40× the hourly baseline. Latency is normal. No deploy in 6 days.
Success rate unchanged.

| Slot | Worked answer |
|---|---|
| Cues | spend moved, latency did not; no deploy; success rate flat |
| Expectancies | if this is a runaway loop, turns-per-run is up and tokens-per-turn is flat |
| Plausible goal | stop the bleeding without killing a working feature |
| Typical action | check whether the cap is denominated in **turns** while the model got chattier |
| Killer simulation | a retry storm would also move latency. Latency is flat, so it is not retries |

**Why the cue matters:** normal latency with abnormal spend is the signature of work that is
*succeeding* too much. That combination points at C1's boundary — a cap, not a timeout.

---

## Case 201-B · The 8% quality drop with no release (L1)

**Situation.** Quality on your nightly rubric falls from 84% to 76% over nine days. No release. No
prompt change. One model family only.

| Slot | Worked answer |
|---|---|
| Cues | gradual not stepwise; scoped to one model family; no change on your side |
| Expectancies | if this is a snapshot rotation, resolved model ids in the window are not all identical |
| Plausible goal | name the day it changed before arguing about the rubric |
| Typical action | pull the **resolved model id** distribution for the window and diff it against the prior month |
| Killer simulation | if the id distribution is flat, this is input drift and the model is innocent |

**Why the cue matters:** "gradual, not stepwise" is what separates a rolling snapshot rotation from a
single-day cutover. Both look like C3; only one has a step in the trace.

---

## Case 201-C · The framework migration PR (L2)

**Situation.** A PR swaps LangGraph for CrewAI. 4,000 lines. Tests pass. Two engineers have approved.

| Slot | Worked answer |
|---|---|
| Cues | tests pass on a swap of the orchestration layer; nothing in the diff mentions identity or traces |
| Expectancies | if governance really is outside the framework, no control lives under the framework directory |
| Plausible goal | keep every control that exists today, and know which ones were on loan |
| Typical action | list the controls (principal, spend cap, trace fields, eval gate) and name the file each lives in |
| Killer simulation | if every control is already outside the framework directory, the swap is cheap and the objection is theatre |

**Why the cue matters:** passing tests on a governance-adjacent swap is weak evidence, because the
controls that vanish are the ones no test asserts. This is the Beyoncé Rule read backwards.

---

## How a 201 answer is scored

| Slots filled | Verdict |
|---|---|
| 5 of 5 | **proficient** |
| 4 of 5, killer simulation present | **pass** |
| killer simulation missing | **partial**, whatever else is right |
| typical action is a shortlist of options | **fail** — that is deliberation, not recognition |
