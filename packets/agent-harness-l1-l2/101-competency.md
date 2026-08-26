# 101 — Competency · Agent runtime (L2) and Inference (L1)

Scope is deliberately two layers, chosen from the 2026-08-26 standing: L2 failed twice, L1 has no
trustworthy score. Each competency has the same three parts: **decision situation · heuristic ·
concept depth**, then a boundary and the two reader verdicts.

Sources are practitioner only. No journal papers, no standards bodies, no vendor pages.

---

## C1 · Who terminates the loop (L2)

### 🎓 Tenth-grader version
- A robot doing a job can decide to keep going forever.
- Someone has to be allowed to stop it.
- The number you stop it at should come from a normal day, not from the day it broke.

### Decision situation
- A summarizer loops 6 times on a 3-page document.
- On a 400-page document it runs 190 turns and times out.
- The team sets `max_turns: 200`.

### Heuristic
> **Size the cap from the p99 of healthy runs. Never from the incident.**

200 is the number that just failed. Setting the cap there licenses 199 turns of a runaway and
guarantees the next incident is 1 turn cheaper than this one.

### Concept depth
- A cap is not a performance knob. It is a **circuit breaker**: a control that trips on the resource
  you actually pay for, so a healthy-but-unbounded run cannot spend the budget.
- Turns are a **proxy** for that resource, and the proxy drifts. A chattier model does the same job in
  more turns at the same cost, or in fewer turns at ten times the cost. Denominate the cap in tokens,
  dollars or wall clock, and turns become a diagnostic rather than the control.
- Ownership is the other half. A cap nobody owns is a number in a config file. The owner is whoever
  gets paged when it trips, because they are the only person who learns whether it was right.

### Boundary — the look-alike
| | Timeout | Cap |
|---|---|---|
| Ends | a run that is **stuck** | a run that is **working and will not stop** |
| Fires on | no progress | too much progress |
| Miss it and | requests hang | the bill arrives |

A run can be perfectly healthy and still need to be killed. That is the sentence most people cannot
say, and it is the whole of C1.

### The two readers
| Same fact | ICP1 reads | ICP2 reads |
|---|---|---|
| `max_turns: 200` | an un-budgeted spend authorization with no named owner | the blast radius of one demo; fine if one demo is what it costs |
| "size it from p99" | an SLO decision, and p99 of *healthy* runs excludes the incident by definition | you have no p99 yet; use the cost of one bad run you can absorb |

**Sources:** Michael Nygard, *Release It!* 2nd ed. (Circuit Breaker, Bulkhead, Blocked Threads,
Unbounded Result Sets) · Betsy Beyer et al., *Site Reliability Engineering* (error budgets)

---

## C2 · Framework is not harness (L2)

### 🎓 Tenth-grader version
- The framework is how you write the robot's steps.
- The harness is what is true about the robot no matter who wrote it.
- If you can delete it by switching tools, it was never a rule.

### Decision situation
- The team proposes swapping LangGraph for CrewAI.
- The PR deletes the orchestration layer and rewires the nodes.
- What breaks?

### Heuristic
> **Anything that must survive the swap is harness. Everything else is framework.**

Identity, traces, evals and quotas survive. Node wiring does not.

### Concept depth
- **Framework = the authoring surface.** How the loop is expressed: nodes, edges, tool registration,
  retries-as-syntax.
- **Harness = the enforcement surface.** What is true of every run regardless of how it was authored:
  which principal it runs as, what got recorded, what it was allowed to spend, what graded it.
- The failure is silent, not loud. A control implemented as a framework callback disappears with the
  framework, and nothing fails: the run still succeeds, it is simply no longer governed.
- Anthropic's own guidance is to start with direct API calls and add a framework only when the loop
  itself is the bottleneck, precisely because a framework hides the prompts and responses you need
  to debug.

### Boundary — the look-alike
| | Orchestration | Governance |
|---|---|---|
| Decides | what runs **next** | what is allowed to run **at all**, and what is recorded when it does |
| Lives in | the framework | the harness |
| Survives a framework swap | no | must |

### The two readers
| Same fact | ICP1 reads | ICP2 reads |
|---|---|---|
| "the control is a LangGraph callback" | it was never a control; name the team that owns it after the swap | fine today, and write down that it is on loan |
| "pick a framework" | pick the one your identity and tracing already integrate with | pick it last; direct API calls until the loop is the bottleneck |

**Sources:** Anthropic Engineering, "Building effective agents", Dec 2024 —
https://www.anthropic.com/engineering/building-effective-agents · Winters, Manshreck & Wright,
*Software Engineering at Google* (the Beyoncé Rule: an ungated behaviour is not a guarantee)

---

## C3 · The undeclared model swap (L1)

### 🎓 Tenth-grader version
- You ask for a model by nickname.
- The nickname can quietly point at a different model tomorrow.
- If your logs only saved the nickname, nothing in them ever changed.

### Decision situation
- The provider silently updates `gpt-4o` to a new snapshot.
- No fallback fired. No release shipped. Quality drops 8%.
- Which layer should have made this visible, and what field on the trace?

### Heuristic
> **Log the model that answered, never the model you asked for.**

The alias is a request. The resolved snapshot is a fact.

### Concept depth
- The request carries an alias: `gpt-4o`. The response carries a resolved id: `gpt-4o-2024-11-20`.
- Record the alias and the swap is invisible **by construction**. No alert can exist for it, because
  the field never changes. This is not a missing alert; it is a missing *dimension*.
- The layer that should have caught it is **observability (L3)**, and the field is the resolved model
  id on every span, with an alert on a change in its distribution, not on its value.
- Hyrum's Law is the same shape one level up: with enough users, every observable behaviour of the
  model gets depended on, whatever its name says.

### Boundary — the look-alike
| | Fallback | Silent swap |
|---|---|---|
| Is | a model change you declared | a model change with no event |
| Leaves | a fired-fallback signal on the trace | nothing |
| Both | change the model | change the model |

Only one of them is on the trace. That asymmetry is the answer to the case.

### The two readers
| Same fact | ICP1 reads | ICP2 reads |
|---|---|---|
| an unpinned alias | an un-reviewed dependency upgrade shipping continuously to production | acceptable; pinning costs you the improvements too |
| the fix | pin the snapshot, and gate the bump behind the eval suite | pin nothing, but log the resolved id so you can name the day quality moved |

**Sources:** Hyrum Wright, Hyrum's Law — https://www.hyrumslaw.com · Charity Majors, Liz Fong-Jones &
George Miranda, *Observability Engineering* (high-cardinality fields; unknown unknowns)

---

## The cross-cutting target for this packet

`mechanism` is the heaviest miss on every row of the standing (counts 5, 4, 3, 1). In every case the
correct **term** was produced and the answer stopped before the **causality**.

- This is one habit, not five knowledge gaps.
- More terms will not move it. Only tracing chains will.
- Every question in `questions.jsonl` is therefore scored on the chain, not on the label. A correct
  term with no chain scores 0 on this packet, on purpose.
