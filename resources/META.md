# Core competency set — meta

**The single place provenance and method live.** The booklets themselves carry none of it: no
source lines, no method citations, no construction commentary, no per-fact confidence tags. That
rule is only safe because this file exists — the information isn't dropped, it's centralised.

If you find provenance or method rationale inside a booklet, that's a defect; move it here.

---

## The set

Thirteen core competencies, one booklet each. Every booklet is built from the scaffold in
`booklet-template/` and registers its question bank into `competency-progress.json`.

| # | Competency | Booklet | Source | Status |
|---|---|---|---|---|
| 1 | Stability Antipatterns & Stability Patterns | `release-it-ch4-5/` | Michael T. Nygard, *Release It! Design and Deploy Production-Ready Software*, 2nd ed. — Ch. 4 "Stability Antipatterns" (pp. 31–90), Ch. 5 "Stability Patterns" (pp. 91–125). The Pragmatic Bookshelf. | Built · 18 questions registered |
| 2 | Design for Deployment & Chaos Engineering | `release-it-ch13-17/` | Michael T. Nygard, *Release It! Design and Deploy Production-Ready Software*, 2nd ed. — Ch. 13 "Design for Deployment" (pp. 241–262), Ch. 17 "Chaos Engineering" (pp. 325–336). The Pragmatic Bookshelf. | Built · 18 questions registered |
| 3 | *unassigned* | — | — | Awaiting source |
| 4 | *unassigned* | — | — | Awaiting source |
| 5 | *unassigned* | — | — | Awaiting source |
| 6 | *unassigned* | — | — | Awaiting source |
| 7 | *unassigned* | — | — | Awaiting source |
| 8 | *unassigned* | — | — | Awaiting source |
| 9 | *unassigned* | — | — | Awaiting source |
| 10 | *unassigned* | — | — | Awaiting source |
| 11 | *unassigned* | — | — | Awaiting source |
| 12 | *unassigned* | — | — | Awaiting source |
| 13 | *unassigned* | — | — | Awaiting source |

### Works referenced inside competency 2

Cited within the source chapters and named in the booklet's teaching: Sidney Dekker, *Drift into
Failure* (the safety / economy / capacity boundaries); Gerald Weinberg, *General Principles of
Systems Design* (the fundamental regulator paradox); Nassim Taleb, *Antifragile*; the principles of
chaos engineering (principlesofchaos.org); Netflix's Simian Army and Chaos Automation Platform;
Peter Alvaro's work on inferring fault-injection targets from traces; Nora Jones's account of a
first chaos rollout; Charity Majors on green dashboards.

### Works referenced inside competency 1

Cited within the source chapters and named in the booklet's teaching: James R. Chiles,
*Inviting Disaster*; Brian Goetz, *Java Concurrency in Practice*; Martin Fowler, *Patterns of
Enterprise Application Architecture*; Vlissides, Coplien & Kerth, *Pattern Languages of Program
Design 2* (Leaky Bucket, caching proxy); Liskov & Wing, *Family Values: A Behavioral Notion of
Subtyping*; Charles Perrow's work on normal accidents (via the coupling × complexity frame).

---

## Method

The booklets are testing instruments, not summaries. Two study techniques are rated high-utility
in Dunlosky et al., "Improving Students' Learning With Effective Learning Techniques" (2013):
**retrieval practice** and **distributed (spaced) practice**. Rereading, highlighting and
summarising are low-utility. Retrieval beats concept mapping even when the final test *is* a
concept map (Karpicke & Blunt, *Science*, 2011).

Everything in the format follows from that:

- Questions are built on cases **not** in the source, because recognising a source example is not retrieval.
- Answers live in a separate section, so failing is possible before checking.
- Write-lines appear under every question, because on paper nobody writes where there's nowhere to write.
- Concept sketches exist only because every node carries a question; a sketch you merely look at is closer to rereading.
- The review schedule expands — day 1, 3, 7, 16, 35 — and resets to 1 day on a fail.

---

## Grading — the maker–checker split

The learner is the **maker**; Claude is the **checker**. The learner never grades their own answer
and never classifies their own miss.

Two properties make this a real check rather than theatre, and both are worth defending:

1. **Pre-registration.** Every ideal answer is written and frozen *before* any attempt exists, and
   stored inline in `competency-progress.json` rather than referenced from the booklet — so
   re-rendering or editing a booklet cannot move the goalposts after the fact.
2. **Auditability.** Every attempt is stored **verbatim and uncorrected** in `../attempts/`, next
   to the frozen ideal and the hit/miss checklist. A log of verdicts alone would be the checker
   marking its own marking.

The residual weakness, stated plainly: the checker also wrote the answer key. Pre-registration and
verbatim evidence bound that, they don't eliminate it. The standing guard is that if scores rise
across attempts while miss counts don't fall, the checker says so — grade inflation is the
predictable failure of anyone grading a test they built.

### Miss codes

A score says *that* something was missed; it never says *what*. Every grade therefore carries at
least one code, and each code points at the exact artefact to reread.

| Code | The miss | Go back to |
|---|---|---|
| `name` | Didn't produce the term | the term table |
| `mechanism` | Named it, got the causality or direction wrong | the anchor sketch |
| `boundary` | Confused it with its look-alike | the boundary column |
| `price` | Prescribed without naming the cost | the trade-offs table |
| `phrasing` | Had it, couldn't say it in expert terms | the plain/expert table |

---

## Files

| Path | What it holds |
|---|---|
| `META.md` | This file. Provenance and method for the whole set. |
| `competency-progress.json` | One file for all 13 banks: every tracked question, its frozen ideal, status, streak, miss codes, attempt history. |
| `booklet-template/` | `DECISIONS.md` (the transferable build decisions) and `skeleton.html` (the grayscale scaffold). |
| `<competency>/` | One folder per booklet: `booklet.html`, the rendered PDF, a README. |
| `../attempts/` | Graded attempt records — the verbatim evidence behind the counts. |
| `../progress.json` | Separate log, for concepts taught in conversation rather than from a booklet. |

---

## Known gaps

- **Competency 1's printed final quiz has no answers in the booklet.** The ten quiz questions were
  written with only the eight applied cases keyed in section 9. Their ideal answers now exist,
  frozen in `competency-progress.json`, so the questions are gradeable — but they are deliberately
  *not* printed in the booklet, which keeps the offline quiz honest. If a future booklet prints
  quiz answers, note the change here.
- **Competency 2's printed final quiz also has no answers in the booklet**, by the same deliberate
  choice as competency 1: the ten ideals are frozen in `competency-progress.json` so the questions
  are gradeable, but they are not printed, which keeps the offline quiz honest.
- Competencies 3–13 are unassigned pending sources.
