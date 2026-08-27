# Closed source list — practitioner only

A source qualifies if a working engineer wrote it for other working engineers: a trade book, a
personal engineering blog, or a conference talk. **Rejected by rule:** journal papers, standards
bodies (ISO, IEEE, ACM proceedings), and vendor marketing pages.

## ICP1 authorities — principal IC inside a large engineering org

| Source | Author | What it grounds |
|---|---|---|
| *Release It!* 2nd ed., 2018 | Michael Nygard | Circuit Breaker, Bulkhead, Timeouts, Blocked Threads, Unbounded Result Sets — the whole of "who terminates a loop" |
| *Site Reliability Engineering*, 2016 | Betsy Beyer et al. (Google SRE) | SLOs, error budgets, sizing a limit from healthy percentiles |
| *Observability Engineering*, 2022 | Charity Majors, Liz Fong-Jones, George Miranda | high-cardinality fields, unknown unknowns, monitoring vs observability |
| *Software Engineering at Google*, 2020 | Titus Winters, Tom Manshreck, Hyrum Wright | the Beyoncé Rule, API surface area, large-scale change |
| Hyrum's Law — https://www.hyrumslaw.com | Hyrum Wright | every observable behaviour gets depended on; why static import counts are a floor |
| *Tidy First?*, 2024 | Kent Beck | coupling defined as: changing one element forces changing another |
| *A Philosophy of Software Design* 2nd ed., 2021 | John Ousterhout | deep vs shallow modules, information leakage, pull complexity downwards |
| *Staff Engineer*, 2021 | Will Larson | how technical work becomes visible; scope and sponsorship |
| *The Staff Engineer's Path*, 2022 | Tanya Reilly | writing that travels; the three pillars (big picture, execution, levelling up) |

## ICP2 authorities — YC founder, frontier-lab product engineer

| Source | Author | What it grounds |
|---|---|---|
| "Building effective agents", Dec 2024 — https://www.anthropic.com/engineering/building-effective-agents | Anthropic Engineering | start with direct API calls; frameworks add abstraction that hides prompts and responses |
| "Effective context engineering for AI agents", 2025 — anthropic.com/engineering | Anthropic Engineering | context as a budgeted resource, not a container |
| "Simple Made Easy", Strange Loop 2011 | Rich Hickey | complecting: one concept braided across several names |
| "The Wrong Abstraction", 2016 — sandimetz.com | Sandi Metz | duplication is cheaper than the wrong shared name |
| The platforms rant, 2011 | Steve Yegge | the Amazon API mandate: every team talks only over an interface |

## Method frame, declared as such

| Source | Author | Status |
|---|---|---|
| *Sources of Power* (1998), *The Power of Intuition* (2003) | Gary Klein | **Method frame only.** RPD structures the 201 cases. It is not practitioner material about agents, and it is not taught as content. |

## Rule for adding a source

Add one only when a real question could not be answered from the list above. Record which question
forced it. A list that grows without a forcing question is a reading list, not a source list.
