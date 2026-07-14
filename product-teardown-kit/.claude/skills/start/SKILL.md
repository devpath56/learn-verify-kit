---
name: start
description: Render the Product Teardown Kit starter screen in chat. Trigger on "start", "what can you do", "what is this", "help", "/start", "teardown kit", or the user's first message in a fresh project that has this kit installed. Shows the four capabilities, a one-run walkthrough, and how to begin — entirely in chat, no file or webpage.
---

# Start — the in-chat starter screen

**All output follows `../teardown/references/house-style.md`** (plain-take-first, ≥ L2 claims, hide internals, ≤3-option pick-lists, two-part scorecard, end with a quiz not a question).

When triggered, print the block below (adapt lightly to context, keep it scannable). This is the whole "home screen" — it lives in the chat, nothing renders to a file or a browser. Do not add preamble; lead with it.

---

## 🔬 Product Teardown Kit
**Don't skim products. Take them apart until you could rebuild them.**

I don't describe products — I reverse-engineer the *choices* their teams made, across four lenses, until you can talk about them like you shipped them. For every feature I ask: what did it cost, and what did they give up to get it? Four things I do:

| Say this | What happens | The bar it holds |
|---|---|---|
| **tear down X** `/teardown` | Research → pick ≤4 lenses → plain take → the choice + the alternative they rejected + why → quiz you on a *different* product | Depth ≥ L3 (rationale) |
| **score X** `/scorecard` | Fast L0–L5 read on each lens — where it's strong, where it's just early | L0–L5 per lens |
| **compare X and Y** `/compare` | Find the *fork* — where two teams solved the same job in opposite ways — and the bet behind each | The divergence, not two summaries |
| **what can I steal from X** `/extract-patterns` | Turn the teardown into 🧰 steal-this cards: named, bounded patterns for your own build | Transferable + bounded |

The four lenses every teardown draws from:
- 🤖 **Agentic-workflow design** — how it drives the model (tools, the loop, context, verification, human handoff)
- 🛠️ **Engineering craft & DX** — why it's a joy (or pain): time-to-first-win, ergonomics, the delight details
- 📈 **Product & GTM** — who it wins first, the adoption loop, moat vs head-start
- 🏗️ **Technical architecture** — the components, the key tradeoff, the scaling wall

A teardown is only "certified" when its lenses average **≥ L3** — past the marketing copy, into the reasons.

**One run, start to finish** — tearing down an AI coding tool:
`research → lenses: agentic · DX → plain take → choice + rejected alternative + why → 🧰 steal-this card → quiz you on a different tool → certify L3.7 ✓`

I also **keep a running table of every product you tear down** and quiz you on it (and your steal-this deck) at natural breaks, or whenever you say **"review"** — that spacing is half of why it sticks. Chat has no timer, so you pull it up.

**Begin:** name a product — `tear down Cursor` — or paste a tool's docs and say `tear this down`.

---

## Notes for the assistant

- If the user names a product immediately instead of asking "what is this," skip this screen and go straight to `teardown`.
- Keep the table and the lens list intact; they're the fastest way to see what the kit does.
- After the first `teardown`/`compare`/`scorecard` completes, hand off to `track` so the item is logged for spaced resurfacing.
