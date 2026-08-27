# NotebookLM source pack — agent harness, L2 runtime — who stops the loop, and what a harness even is

**You are holding the INPUT to a podcast, not a podcast.** Nothing here is a script. These are
the sources; NotebookLM generates the debate from them. The brief at the bottom is what to paste
in to aim it.

Rendered from `authority-map.json`, which passes advisor-builder's `authority_map.py --check`.
Do not hand-edit this file — edit the map and re-render, or `--check` will fail.

## Provenance, stated up front

- Sources: **5**, of which **5** were opened and read on a named date.
- **Every source below was opened and read.** None is cited from memory.
- Ratified by the operator: **NOT YET**.

> Why this section exists: the first version of this packet cited four authorities from recall and
> attached a source field to none of its 18 questions. A citation you did not open is a guess wearing
> a proper noun, and the cost lands on whoever repeats it in a review.

## What to load into NotebookLM

Add these as sources. NotebookLM fetches URLs directly.

### Six Agent Harness Capabilities for Higher Model Performance (NVIDIA Labs Object-Oriented Agents, NOOA)

- **Who** — Ricardo Silveira Cabral and Paul Furgale, distinguished research scientists, NVIDIA · published 2026-07-27
- **Load** — https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance/
- **Why this one** — it runs the controlled experiment: the model is held fixed and the harness is varied, and the swing is reported in both score and token cost. Every other source here asserts that the harness matters; this one measures how much.
- **Who it is for** — ICP1 and ICP2 both — it is the only source that prices harness design in benchmark points AND in tokens, which is the pair of currencies the two readers each care about separately
- **Numbers on the page** — SWE-bench Verified, GPT-5.5: NOOA 82.2% at 29 LLM calls / ~1.1M tokens per task; comparison harnesses 78.2% at 66 calls / 2.2M tokens, and 78.6% at 29 calls / 1.3M tokens. Median session peaks 22-72k prompt tokens against a 200-400k window, so no compaction pass is needed.
- **⚠ Read with this in mind** — NVIDIA's own engineering blog reporting NVIDIA's framework. The benchmark numbers are self-reported and the comparison harnesses are unnamed in the post. Read the technical report before quoting the delta as settled.
- **Verified on the page (2026-08-26)**:
  - "The harness is the architecture surrounding the model. How it renders context, executes actions, manages state, and decides when a task is done shapes outcomes just as much as the model itself."
  - "Harness design alone can account for double-digit swings in benchmark results and significant differences in token cost, with the same underlying model."
  - "Programmable loop engineering: Orchestration loops are ordinary Python, writable by developers and by the model itself."
  - "A standard Python method whose body is an ellipsis is completed at runtime by an LLM-driven loop. Method with a normal body run as ordinary, deterministic Python."

### DeepSeek Harness (dsh) — developer preview site and developer documentation

- **Who** — DeepSeek · published 2026-08-13
- **Load** — https://deepseek.com/harness/en/
  - also: https://deepseek-harness.github.io/deepseek-harness/en/guide/quickstart
  - also: https://github.com/deepseek-ai/deepseek-harness
- **Why this one** — it is the only source that ENUMERATES the harness rather than describing it: models, tools, skills, sessions, sandboxes, storage, loops, scheduling and the UI are named as separately swappable plugins, so 'what is the runtime' has a checkable answer instead of a metaphor
- **Who it is for** — ICP2 first — a founder can read the plugin list and know exactly which pieces are hers to own; ICP1 second, as the vocabulary for arguing about a build-versus-adopt boundary in review
- **Numbers on the page** — v0.1 developer preview, MIT licence. Four runtime modes: Standard, Code, Minimal (persistent bash + str_replace_editor only), Creator.
- **⚠ Read with this in mind** — DEVELOPER PREVIEW, and the project says so in capitals: compatibility-breaking changes are expected and the core plugins and APIs are still moving. Teach the ARCHITECTURE, which is the durable part; do not teach the API surface, which will not survive.
- **Verified on the page (2026-08-26)**:
  - "AGENT = MODEL + HARNESS"
  - "The model is the soul of an agent. A harness lets an agent understand its environment, use tools, and keep working in real-world settings."
  - "Plugins provide every agent capability, including models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and the UI."
  - "Everything the model sees is recorded in an append-only session log: system prompts, reasoning, tool calls and results, subagent scheduling, and every context injection."

### Effective harnesses for long-running agents

- **Who** — Justin Young, Engineering at Anthropic · published 2025-11-26
- **Load** — https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- **Why this one** — it reports the failure that runs OPPOSITE to the one everyone expects. The agent does not run away; it looks around, sees progress, and declares the job done. A source that inverts the reader's prior earns its place ahead of one that confirms it.
- **Who it is for** — ICP2 — it is a field report on getting an agent to keep working across many context windows, which is the founder's actual problem; ICP1 will recognise the fix as a checklist the implementer may not edit
- **Numbers on the page** — the claude.ai clone example expands one prompt into over 200 end-to-end features in a JSON file, all initially marked failing; coding agents may only flip the `passes` field.
- **Verified on the page (2026-08-26)**:
  - "a later agent instance would look around, see that progress had been made, and declare the job done"
  - "It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality."
  - "Claude marks features as done prematurely."

### Building effective agents

- **Who** — Engineering at Anthropic · published 2024-12-19
- **Load** — https://www.anthropic.com/engineering/building-effective-agents
- **Why this one** — it draws the boundary that the whole L1/L2 distinction rests on — predefined code paths versus the model directing its own process — and it is the boundary the other three sources each redraw differently
- **Who it is for** — both — it is the shared vocabulary. The workflow-versus-agent split is the phrasing ICP1 and ICP2 are both most likely to have already met, which makes it the cheapest common ground to argue from.
- **⚠ Read with this in mind** — STALE BY THE PUBLISHER'S OWN ADMISSION. The post carries a banner: much of the tooling landscape described has changed since December 2024. The DEFINITIONS are what is being cited here; the tooling list is not.
- **Verified on the page (2026-08-26)**:
  - "Workflows are systems where LLMs and tools are orchestrated through predefined code paths."
  - "Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks."
  - "The task often terminates upon completion, but it's also common to include stopping conditions (such as a maximum number of iterations) to maintain control."
  - "they often create extra layers of abstraction that can obscure the underlying prompts and responses, making them harder to debug"

## Bring your own copy

Not linkable — either copyrighted or local. Load your own copy if you have one; the packet
travels with the citation, never the text.

### Release It! — Stability Antipatterns and Stability Patterns (Timeouts, Circuit Breaker, Bulkheads, Fail Fast)

- **Who** — Michael T. Nygard
- **Why this one** — it is the only source here that treats termination as a PROPERTY OF THE CALLER, arrived at from production incidents rather than from agent design, which is what lets the packet ask whether an agent loop is a new problem or an old one wearing new words
- **Who it is for** — ICP1 — this is the vocabulary a principal IC's reviewers already argue in. A founder can skip it; a principal IC who calls a retry storm anything other than a cascading failure will be corrected in review.
- **Where to look** — book.index.jsonl, 785 indexed pages. Densest content pages for the termination question: c01 pages 104-110 (Timeouts, then Circuit Breaker). Term counts across the corpus: timeout 108, circuit breaker 68, blocked thread 42, fail fast 32, bulkhead 26, unbounded/runaway 21. c02 pages 345-358 also match on these terms but are the BACK-OF-BOOK INDEX, not content, and are excluded.
- **⚠** — COPYRIGHTED BOOK TEXT. The extracted corpus stays local and is never committed to the public packet repo and never uploaded. What travels is the citation and the page range; the reader brings their own copy.

## The brief — paste this into NotebookLM

```
Generate a roughly 30-minute debate between two experienced practitioners who disagree.
Do not let them converge politely. The sources genuinely conflict; hold the conflict open.

THE TWO QUESTIONS, and they are not the same question:
  A. In an agent that runs a model in a loop, who terminates the loop — and what SIZES the number?
  B. Is the framework you build on the same thing as the harness you own?

FAULT LINE A — termination. These sources point in opposite directions:

  * Nygard, writing from production outages, assumes the thing you called will NEVER stop.
    So the CALLER imposes the ending: a timeout, and a circuit breaker when timeouts repeat.

  * Anthropic's long-running-agents report finds the OPPOSITE failure. The agent stops too
    EARLY: "a later agent instance would look around, see that progress had been made, and
    declare the job done." A timeout would not have caught that. Their fix is a completion
    predicate the agent does not own — a feature list it may only mark passing, never delete from.

  * Anthropic's earlier post offers the plain fallback: stopping conditions "such as a maximum
    number of iterations", to maintain control.

  * DeepSeek Harness makes the loop a PLUGIN, swappable in configuration next to models and
    tools — so termination stops being a property of the model and becomes a thing you choose.

  * NVIDIA NOOA names "decides when a task is done" as a harness responsibility outright.

THE HOLE IN FAULT LINE A, and I want it named on air: NONE of these sources tells you how to
SIZE the cap. They tell you to have one. Anthropic says "a maximum number of iterations" and
stops. So:

  1. Where does the number come from? Have one speaker argue it can only come from the
     distribution of HEALTHY runs — a small multiple of their p99 — and the other argue that any
     number you can defend that way is a number you did not need, because you already had the
     telemetry to detect the runaway directly.

  2. A team times out at 190 turns and sets the cap to 200. Attack that number. Is a cap derived
     from the incident a control at all, or a rename of the failure?

  3. A timeout ends a run that is STUCK. What ends a run that is WORKING, and will not stop, and
     is quietly spending money? Are those the same control with two names, or two controls?

  4. Is a max-iteration cap a stop condition, or an admission that nobody has a completion
     predicate? One speaker defends it as honest engineering; the other calls it a fig leaf.

FAULT LINE B — framework versus harness. This is the boundary, and the sources redraw it three ways:

  * Anthropic argues DOWN from abstraction: frameworks "often create extra layers of abstraction
    that can obscure the underlying prompts and responses, making them harder to debug."

  * DeepSeek states an identity — "AGENT = MODEL + HARNESS" — and then enumerates the harness:
    "models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and the UI", every one
    a swappable plugin.

  * NVIDIA collapses the boundary into SYNTAX: a Python method whose body is an ellipsis is
    completed at runtime by an LLM-driven loop; a normal body runs as deterministic Python.

PRESS ON THESE:

  5. A team says "our framework IS our harness, so changing frameworks means two quarters to
     rebuild." Is that a statement about the framework, or a confession about where they put
     their identity, traces, evals and quotas? What would you ask to tell the difference?

  6. Run DeepSeek's enumeration as a checklist against a framework you know. Which items does the
     framework own, and which were yours the whole time?

  7. If the harness owns termination, and NVIDIA says the model can write its own orchestration
     loop in ordinary Python — has the model just taken back the decision the harness was
     supposed to hold?

  8. When a run fails, how would you actually tell which side failed? What experiment separates
     them? (NOOA holds the model fixed; DeepSeek ships a two-tool Minimal mode — persistent bash
     and str_replace_editor only. Are those the same experiment?)

GROUND RULES:
  - Cite the sources by name as you go. If something is not in them, SAY SO OUT LOUD — especially
    on cap sizing, where the silence is the finding.
  - The DeepSeek docs are a v0.1 developer preview with breaking changes expected — argue the
    architecture, not the API.
  - The Anthropic 2024 post is stale by its own banner; its definitions stand, its tooling list
    does not.
  - The NVIDIA benchmark numbers are self-reported by NVIDIA about NVIDIA. Let one speaker say so.
```

## Then, to check it worked

- Play it and see whether the two speakers actually disagree, or whether they agreed by minute six. If they agreed, the brief was too soft — sharpen fault line 1 and regenerate.
- Listen for whether "who terminates the loop" gets FOUR answers or one. Four means the sources came through. One means it flattened them.
- Then run `learn agent-harness-l2-runtime` in this repo, and see whether the podcast made the recall questions easier. That is the only test of it that matters.

