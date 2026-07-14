# Lens Rubric — the four lenses and the depth scale

This is the second half of the law (`house-style.md` is the first). It defines **what a teardown looks at** (the four lenses) and **how deep any single finding goes** (the L0–L5 scale). Every skill that rates a product uses this.

## The depth scale (score every finding)

A teardown only counts when it climbs past the marketing copy. Rate each finding L0–L5:

| Level | Name | What it looks like |
|-------|------|--------------------|
| **L0** | Brochure | Restates the product's own marketing or feature list. No new information. |
| **L1** | Mechanic | Names one real mechanism, but not why it's there. ("It streams tokens.") |
| **L2** | Tradeoff | Names a deliberate design choice **and the alternative rejected**. |
| **L3** | Rationale | Explains *why* that tradeoff — the constraint or bet that forced it. |
| **L4** | Pattern | Extracts a transferable pattern you could reuse in a different product. |
| **L5** | Bet | Names the strategic bet, **where it breaks**, and what you'd copy vs avoid. |

- **Floor:** every load-bearing line must be ≥ L2. L0–L1 lines are brochure filler — cut or deepen them.
- **A teardown is "certified" only when its covered lenses average ≥ L3.** Below that, it's a summary, not a teardown.
- **Headline for a product:** the average level, the strongest lens, and the shallowest lens (where you're still guessing).

## The four lenses (pick ≤ 4 — working memory caps around four)

Tear down only the lenses that matter for *this* product; don't force all four. Each lens has a core question and a short probe list.

### 🤖 Agentic-workflow design — *how does it drive the model?*
The lens for AI-native and agentic products. Probes:
- **Tool design** — what tools/functions the agent gets, and their granularity (few fat tools vs many thin ones).
- **The loop** — plan → act → observe → repeat: how it decides it's done, how it recovers from a bad step.
- **Context & memory** — what it keeps in the window, what it summarizes, what it retrieves.
- **Verification** — how it checks its own work before committing (tests, judges, human gate).
- **Human-in-the-loop** — where control is handed back, and how reversible each action is.

### 🛠️ Engineering craft & DX — *why is it a joy (or a pain) to use?*
The "falling in love with the craft" lens. Probes:
- **Time-to-first-win** — install → first real result. The shorter, the more it's loved.
- **Ergonomics** — API/CLI shape, defaults, the "it just did the right thing" moments.
- **Error messages** — do they teach, or do they blame?
- **Escape hatches** — can a power user drop a level when the abstraction leaks?
- **The delight details** — the small touches that signal someone cared.

### 📈 Product & GTM — *why do people adopt it, and why do they stay?*
Probes:
- **Who + wedge** — the specific first user and the narrow job it wins first.
- **Adoption loop** — how one user creates the next (virality, artifacts, teams).
- **Pricing** — the model and what it meters on (seats, usage, value).
- **Moat vs head-start** — is the lead defensible (data, network, switching cost) or just early?
- **Retention** — the reason to open it again next week.

### 🏗️ Technical architecture — *how do the pieces fit, and what did that cost?*
Probes:
- **Core components** — the 3–5 boxes and the data flowing between them.
- **The key tradeoff** — where they spent the budget (latency vs cost vs quality).
- **Build vs buy** — what they wrote themselves vs pulled off the shelf, and why.
- **Scaling limit** — the wall this design hits first.
- **Dependencies** — the load-bearing external pieces and the risk each carries.

## How the lenses and the scale combine
For each lens you cover: make 2–4 findings, each ≥ L2, and note the lens's overall level. The teardown headline rolls those up. A product can be L5 on architecture and L1 on GTM — say so; that contrast *is* the insight.
