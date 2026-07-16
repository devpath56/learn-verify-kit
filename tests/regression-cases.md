# Learn-Verify Kit — Regression Test Cases

**Intent: never repeat an error the user already caught.** Every case below is a *real* failure the kit made during its 2026-07-07 live test. Each one pairs an **edge-case trigger** (an input designed to provoke the failure) with a **binary PASS condition** and the **actual FAIL signature** we saw. This is error-analysis-first eval design — no synthetic cases, only observed ones.

## How to run
Feed each trigger to the kit in a fresh chat, then check PASS/FAIL against the condition. Binary only — a case passes or it doesn't. An LLM-as-judge can grade most (the FAIL signatures are the negative examples). Run before shipping any kit change.

## Cases

| ID | Guards against (real error) | Edge-case trigger | PASS (binary) | FAIL signature seen |
|----|------------------------------|-------------------|---------------|---------------------|
| **R-01** | Jargon-first opening | `teach me eventual consistency` | First 1–2 sentences are a plain everyday example; no term/citation before a plain explanation lands | Opened *"Retrieval practice confers high-utility encoding gains (Dunlosky 2013)…"* |
| **R-02** | Prose walls | `teach me idempotency` | Chunks use bullets/short lines; no paragraph > 3 sentences | Multi-sentence prose block per chunk |
| **R-03** | No concrete example | `teach me a race condition` | Chunk 1 opens with a concrete everyday example before any definition | Opened with the definition, no example |
| **R-04** | No roadmap preview | any `teach me X` | A 3-bullet preview of the 3 chunks appears **before** chunk 1 | Jumped straight into chunk 1 |
| **R-05** | Internal machinery leak | any `teach me X` | No `【J..】` tags, no "Step 0 · Research" labels, no metric/system vocab in learner text | Showed `Chunk 1 【J1 · J4 plain-first】` and `Step 0 · Research 【J2】` |
| **R-06** | Verbose recall response | learner gives a partial answer to a recall test | Reply is a brief scorecard (score + sharper line), not a paragraph | Multi-paragraph confirm + re-teach |
| **R-07** | Scorecard missing lingo check | learner answers in casual (non-expert) words | Scorecard reports BOTH completeness AND a lingo check | Only a score; no "did you use the terms right" |
| **R-08** | Expert term never named | `teach me when a cache serves old data` | The industry term (**stale read** / cache staleness) is named after the plain explanation | Taught plainly, never named the term |
| **R-09** | Silent wrong-domain commit | `teach me L0 conflation` | Flags ambiguity + offers ≤3 distinct-meaning options **before** chunks | Silently taught the streaming meaning; user meant lidar |
| **R-10** | Pick-list too long / wordy | any ambiguous term | ≤ 3 options, each under 10 words | Offered 5 options, long bullets |
| **R-11** | Sub-facets, not distinct meanings | `teach me normalization` | Options are distinct concepts/domains (DB vs ML vs text), not sub-angles of one | Offered 3 sub-angles within one meaning |
| **R-12** | No boundary vs neighbor | `teach me conflation` (neighbor: registration); `teach me authentication` (neighbor: authorization) | Names the confusable neighbor + gives a one-line boundary | Taught conflation, never distinguished registration |
| **R-13** | Name-drop with no example | `teach me lidar drift` (introduces "loop closure") | Every introduced term/fix has definition + concrete example + boundary | Said "the fix is loop closure" with no example |
| **R-14** | Trailing question at end | any completed concept | Ends with a final quiz; no "want me to…?" offer | Ended with *"Want me to cover X next?"* |
| **R-15** | Continuation over-correction | a 3-chunk lesson where chunk 3 reuses a term from chunk 1 | Reuses the term freely; no forced plain re-intro; self-check does not flag it | Self-check demanded "conflation" be re-explained in chunk 3 |
| **R-16** | Undefined jargon in a response | a scorecard/boundary that introduces a new term | Any jargon used is defined inline with its boundary | Used "underdetermined" with no definition |
| **R-17** | Structural chunk with no anchor sketch | `teach me how a load balancer routes requests` | A small 2–4 node text-tree anchor sketch appears in the structural chunk | Taught the structure in prose, no sketch |
| **R-18** | No transferable decision card | complete any concept end-to-end | After the last chunk, a decision card (thumb rule / 2×2) that transfers to other domains is produced + logged to the revision deck | Ended with only a recall quiz, no portable card |
| **R-19** | One recall question instead of two | any `teach me X`, learner answers chunk 1's question | After scoring Q1, a **second** question (Q2) on a *new* case for the same concept is asked BEFORE the next chunk | Asked one question, then advanced to the next chunk |
| **R-20** | Scorecard uses a bare bullet "lingo check" | learner answers a recall test in casual words | Scoring shows a completeness line AND a **plain/expert two-column table** (understand-it \| sound-like-an-expert) | Reported a plain bullet "lingo check," no phrasing table |
| **R-21** | Structural chunk sketch has no branch | `teach me how one seed spawns N independent streams` | The anchor sketch is a text-tree **with at least one branch** (fan-out shown), not a flat `A -> B -> C` chain | Drew a flat one-line arrow chain for a fan-out |
| **R-22** | Pipeline-position / stacked-boundary chunk taught with no anchor sketch | `teach me RAGAs` (chunk 1: RAGAs' position relative to the RAG pipeline it grades, plus two boundary contrasts — reference-free vs reference-based eval, RAGAs vs the pipeline itself) | A 2–4 node anchor sketch/boundary map renders the pipeline position + stacked boundaries together, not left as scattered prose bullets | Explained "RAGAs sits after your pipeline runs" and two separate boundary contrasts entirely in prose/bullets, no sketch at all |
| **R-23** | Shallow research hides an asymmetric/exclusion clause, producing a wrong scoring verdict | `teach me RAGAs` (Answer Relevancy chunk: score a case where an answer adds true-but-unrequested extra content) | Taught definition states Answer Relevancy penalizes redundant/unnecessary/incomplete information, not just off-topic content; scoring reflects that | First research pass only surfaced "measures if the answer addresses the query," missed the official "penalizes redundant information" clause, and a case with true-but-unrequested extra content was scored as "Answer Relevancy unaffected" |
| **R-24** | Consolidation does not auto-persist to the revise-DB (needs a manual "track") | complete any concept end-to-end on the Claude Code surface (file tools + git available) | At consolidation, `track` runs automatically — `progress.json` is upserted, committed, and merged to the default branch (log-only) — with **no** manual "track"/"review" trigger from the user | Produced a `concept-sketch` recall scaffold + an in-chat revision deck, but never wrote/committed `progress.json`; persistence happened only after the user manually typed "track" |
| **R-25** | Chunk taught with labeled prose intros instead of nested bullets/tables | `learn Cisco SD-WAN` | Every chunk is rendered as nested bullets + tables; no labeled prose intro sections and no explanatory sentence floating outside a bullet | Opened chunks with labeled prose sections ("The everyday example", "The ideas + their terms") and standalone sentences instead of nested bullets/tables |
| **R-26** | Sketch rendered as a bare monochrome ASCII tree (low retention) | any concept reaching consolidation, or any structural `learn` chunk with an anchor sketch (e.g. `teach me how a load balancer routes requests`) | The sketch uses a meaning-bearing visual encoding: a ≤3 categorical color-token per chunk/role named in a one-line legend, one marked ⭐ focus node, and `❓` on retrieval questions — while color still encodes only grouping/focus (no decoration) | Rendered a plain gray ASCII tree (`A ──► B ──►`) with no chunk color-tokens, no legend, and no marked focus node |

## Coverage map (case → rule it protects)

- R-01, R-15 → plain-language-first + continuation exemption (`revise`)
- R-02, R-03 → example-first, no prose walls (`house-style`)
- R-04 → roadmap preview (`learn`)
- R-05, R-16 → hide machinery + define-jargon-inline (`house-style`)
- R-06, R-07 → two-part scorecard (`house-style`)
- R-08, R-13 → name + define + example + boundary (`house-style`, `learn`)
- R-09, R-10, R-11 → ambiguity pick-list (`house-style`, `learn`)
- R-12 → boundary rule (`house-style`, `learn`)
- R-14 → end-with-a-quiz (`house-style`, `learn`)
- R-17 → anchor sketch when structural (`learn`, `concept-sketch`)
- R-18 → decision card + revision deck (`concept-sketch`, `track`)
- R-19 → two-questions-per-chunk, sequential (`learn`, `house-style`)
- R-20 → plain/expert phrasing table replaces bullet lingo check (`house-style`)
- R-21 → branched anchor sketch for fan-out/structural chunks (`house-style`, `learn`, `concept-sketch`)
- R-22 → anchor sketch also required for pipeline-position + stacked boundary-contrast chunks (`house-style`, `learn`)
- R-23 → research step must dig past a generic summary for asymmetric/exclusion clauses (`learn`)
- R-24 → consolidation auto-persists the revise-DB — write + commit + log-only merge to the default branch, no manual trigger (`learn`, `concept-sketch`, `track`)
- R-25 → nested bullets + tables only as the chunk structure; no labeled prose intros (`house-style`)
- R-26 → sketches use a meaning-bearing visual encoding (per-chunk color-token + legend + marked focus node), never a bare monochrome tree (`house-style`, `concept-sketch`)

## Adding a case
When the kit makes a new mistake: capture the trigger that caused it and the exact bad output as the FAIL signature, write the binary PASS, add a row. The suite only ever grows from real errors — never invented ones.
