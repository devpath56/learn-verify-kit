# Debate source — the agent harness, two readers, one hour of disagreement

**How to use this.** Upload this single file to NotebookLM as a source. Generate an Audio Overview,
then use *Customize* and paste the prompt in the last section. Target length ~30 minutes.

This document is written to be **argued over, not summarized.** Every concept below carries two
stated positions that do not reconcile. A generated conversation that agrees throughout has failed to
read it.

---

## The two speakers

| | **Priya — ICP1** | **Dev — ICP2** |
|---|---|---|
| Role | principal IC, large engineering org | founder / product engineer at a frontier lab |
| Scarce | coordination and review bandwidth | wall clock and runway |
| Abundant | headcount, infra, years of history | model capacity, willingness to throw work away |
| The expensive failure | building the wrong thing **well** | building nothing **complete** |
| Default move when late | re-negotiate scope with stakeholders | cut scope unilaterally, ship the fallback |
| What a spec is for | humans in the future who were not there | an agent, this hour |

Neither is the straight man. Priya is wrong when she prices a coordination cost in an org of one. Dev
is wrong when he calls a control premature and it is the control that would have caught the incident.

---

## Concept 1 — a cap is not a timeout

- **The fact.** A timeout ends a run that is stuck. A cap ends a run that is working and will not stop.
  A run can be perfectly healthy and still need to be killed.
- **Priya.** `max_turns: 200` after a 190-turn incident is an un-budgeted spend authorization. Size it
  from the p99 of healthy runs, which excludes the incident by definition. Name the person who gets
  paged when it trips, because they are the only one who learns whether the number was right.
- **Dev.** There is no p99 yet. Set the cap to the cost of one bad run you can absorb and move on. A
  cap with a named owner in a company of four is a ceremony.
- **Where they invert.** Priya reads a cap as an SLO decision with an owner. Dev reads it as a blast
  radius with a price tag.
- **The unresolved bit.** Turns are a proxy for the thing you pay, and the proxy drifts when the model
  changes. Both of them are arguing about a number denominated in the wrong unit.
- *Source: Michael Nygard, Release It! 2nd ed.; Google SRE Book on error budgets.*

## Concept 2 — the framework is not the harness

- **The fact.** The framework is the authoring surface. The harness is what is true of every run
  regardless of who authored it: identity, traces, evals, quotas. Anything that must survive a
  framework swap is harness.
- **Priya.** A control implemented as a framework callback was never a control. The failure is silent:
  the run still succeeds, it is simply no longer governed, and no test asserts on it.
- **Dev.** Anthropic's own guidance is to start with direct API calls and add a framework only when the
  loop is the bottleneck. Half this argument disappears if you never adopt the framework.
- **Where they invert.** Priya wants the control moved out of the framework. Dev wants the framework
  removed from under the control. Same diagram, opposite arrow.
- *Source: Anthropic Engineering, "Building effective agents", Dec 2024; Winters et al., Software Engineering at Google (the Beyoncé Rule).*

## Concept 3 — log the model that answered

- **The fact.** The request carries an alias, `gpt-4o`. The response carries a resolved id,
  `gpt-4o-2024-11-20`. Record the alias only and a provider snapshot rotation is invisible *by
  construction*, because the field never changes. It is a missing dimension, not a missing alert.
- **Priya.** An unpinned alias is an un-reviewed dependency upgrade shipping continuously to
  production. Pin the snapshot and gate the bump behind the eval suite.
- **Dev.** Pinning costs you the improvements too, and someone has to own the bump forever. Pin
  nothing, log the resolved id, and you can still name the day quality moved.
- **Where they invert.** Priya buys stability with a maintenance obligation. Dev buys optionality with
  a detection obligation. Both are real bills.
- *Source: Hyrum's Law, hyrumslaw.com; Majors, Fong-Jones & Miranda, Observability Engineering.*

## Concept 4 — denominator blindness

- **The fact.** A rubric reading 99% is a number over a denominator. If the gate silently narrows what
  it evaluates, the score rises because the hard cases left the population, not because quality moved.
- **Priya.** Any metric that improved without a change you can name is suspect until you can state the
  denominator out loud.
- **Dev.** Agreed, and this is the one place where the founder should be *more* paranoid, because a
  demo metric has an audience and no history to compare against.
- **Where they invert.** They mostly do not. This is the concept both readers hold the same way, and
  the conversation should say so instead of manufacturing a disagreement.

## Concept 5 — gate versus alert

- **The fact.** A gate blocks. An alert informs. A rubric that runs nightly and pages you at 8am is an
  alert, whatever it is called. The single change that makes it a gate: run it before the artifact
  ships and let it return non-zero.
- **Priya.** Who is allowed to override the gate, and is the override recorded? An un-recorded override
  turns a gate back into an alert within a quarter.
- **Dev.** A gate you override every day is worse than no gate: it teaches the team that red means go.
- **Where they invert.** Priya adds a control and an audit trail. Dev removes a control that is not
  respected. Both are defensible.

## Concept 6 — mechanism beats vocabulary

- **The fact.** Producing the correct term and stopping before the causality is the single most common
  failure in this material. "A model swap forces a harness re-tune" is a rule recited where the
  question asked for the chain that produced the failure.
- **Priya.** In a design review the term buys you thirty seconds. The chain is what survives the
  follow-up question.
- **Dev.** Same in a fundraise. The investor who asks "why" twice is separating people who read the
  blog post from people who ran the system.
- **The transferable rule.** If you cannot say what breaks, when, and what you would see, you have the
  label and not the concept.

---

## Six tricky questions the conversation should actually fight over

1. A summarizer times out at 190 turns. The team sets `max_turns: 200`. Defend that number. Then
   destroy it.
2. Tests pass on a 4,000-line framework swap. Name what can vanish without a single test failing.
3. Quality drops 8% with no release and no prompt change. Where do you look first, and what would
   prove you wrong within ten minutes?
4. Your eval score went from 71% to 99% overnight after a rubric edit. Celebrate or investigate?
5. When is a control genuinely premature, and when is "premature" the word people use for the control
   that would have caught the incident?
6. You did the work. Nobody knows. Is that a communication problem or a scoping problem?

## The promotion thread — how the same work becomes visible

This should run as a spine under the technical argument, not as a separate segment.

- **Priya's version.** Technical work becomes visible when someone other than you can repeat the
  decision. Write the thing that travels: the one-page decision record, the incident review that names
  the mechanism, the interface that other teams build against. Scope grows by sponsorship, and
  sponsorship follows artifacts other people can point at. *(Will Larson, Staff Engineer; Tanya Reilly,
  The Staff Engineer's Path.)*
- **Dev's version.** Visibility is distribution. Ship the thing, then write the post that says what
  broke and what you would do differently. A public failure analysis outperforms a private success.
- **The inversion.** Priya's audience is a promotion committee reading evidence months later. Dev's
  audience is a timeline reading right now. The same artifact serves both only if it names a
  mechanism, because a mechanism survives being retold by someone who was not there.
- **The 10x claim, stated honestly.** Talking about your work does not multiply the work. It
  multiplies the number of people who can act on it. That is the whole mechanism, and any bigger claim
  is marketing.

---

## Paste this into NotebookLM → Audio Overview → Customize

```
Two hosts, roughly 30 minutes, a genuine debate and not a summary.

Host A is Priya, a principal engineer at a large infrastructure company. She is short on
coordination and review bandwidth. Her expensive failure is building the wrong thing well.

Host B is Dev, a founder and product engineer at a frontier AI lab. He is short on wall clock
and runway. His expensive failure is building nothing complete.

Work through the six concepts in order. For each one: state the shared fact plainly first, then
have each host give their reading, then name explicitly where the two readings invert. Do not
resolve the inversions. On Concept 4 they agree, and you should say so rather than invent a
disagreement.

Spend the last eight minutes on the six tricky questions and the promotion thread. Priya argues
that visibility comes from artifacts other people can repeat. Dev argues it comes from
distribution. Neither wins.

Rules: name the mechanism, never just the term. If a host says "a model swap forces a harness
re-tune", the other host must ask for the chain. Cite the practitioner sources by author when
they come up. Do not use academic citations. Do not be polite about disagreement.
```
