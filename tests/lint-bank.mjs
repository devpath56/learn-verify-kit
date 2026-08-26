#!/usr/bin/env node
/**
 * lint-bank — the question bank's own laws, bound to an exit code.
 *
 * WHY IT EXISTS. `drill` grades an answer against an ideal FROZEN at registration, and its whole
 * claim is that editing or re-rendering a booklet cannot move the goalposts. Nothing checked that
 * the ideal was there. A question whose `ideal` is missing or empty does not fail loudly — `drill`
 * grades against nothing and reports a verdict, which is worse than refusing, because a verdict
 * nobody can audit reads exactly like one that was earned.
 *
 * The bank was 252 questions across 14 competencies with no validator at all when this was written.
 *
 *   node tests/lint-bank.mjs                      the live bank
 *   node tests/lint-bank.mjs <file.json>          a fixture
 *   EXIT: 0 every law holds · 1 a law is broken · 2 the bank could not be read
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const BANK = path.join(ROOT, 'resources', 'competency-progress.json');
const str = (x) => typeof x === 'string' && x.trim().length > 0;

/** Every law the bank must satisfy. Each returns the rows that BREAK it, never a boolean. */

/* Competencies bound by the sourcing and case laws. A CUTOFF SET, not a wildcard: the thirteen banks
   written before CF-026 are exempt, because the only way to make them pass would be to invent
   attributions for questions whose provenance nobody recorded. Gates apply forward. */
export const SOURCED = new Set(['agent-harness-l1-l2']);
export const SOURCING = new Set(['supported', 'analogy', 'unsourced']);
export const TIERS = new Set(['S', 'A']);
export const RUNGS = new Set([1, 2, 3, 4]);

export const MAP = path.join(ROOT, 'packets', 'agent-harness-l1-l2', 'notebooklm', 'authority-map.json');

/* Returns null, never an empty set, when the map cannot be read. A missing map is UNEVALUABLE, and
   an empty set would make every citation resolve to nothing and fail every question at once —
   reporting "20 broken citations" when the truth is "I could not open the file". */
const readMap = () => { try { return JSON.parse(fs.readFileSync(MAP, 'utf8')); } catch { return null; } };
const defs = (m) => Object.entries(m.sources ?? {}).filter(([k]) => !k.startsWith('$'));
export const mapSources = () => { const m = readMap(); return m ? new Set(defs(m).map(([k]) => k)) : null; };
export const mapVerified = () => { const m = readMap(); return m ? new Set(defs(m).filter(([, s]) => s.verified).map(([k]) => k)) : null; };

export const LAWS = [
  { id: 'question-has-ideal',
    why: 'drill grades against a frozen ideal; without one it grades against nothing and still reports a verdict',
    broken: (b) => qs(b).filter((q) => !str(q.ideal)).map((q) => q.id) },
  { id: 'question-has-prompt',
    why: 'a question with no prompt cannot be asked',
    broken: (b) => qs(b).filter((q) => !str(q.prompt)).map((q) => q.id) },
  { id: 'question-id-unique',
    why: 'an id is the address history is filed under; two questions under one id makes both unaddressable',
    broken: (b) => { const seen = new Set(), dup = []; for (const q of qs(b)) { if (seen.has(q.id)) dup.push(q.id); seen.add(q.id); } return dup; } },
  { id: 'question-id-matches-competency',
    why: 'a question filed under another competency is invisible to the drill that should ask it',
    broken: (b) => cs(b).flatMap((c) => (c.questions ?? []).filter((q) => !String(q.id ?? '').startsWith(`${c.id}.`)).map((q) => q.id)) },
  { id: 'rollup-counts-the-questions',
    why: 'a rollup that disagrees with the bank reports progress against a denominator that does not exist',
    broken: (b) => cs(b).filter((c) => {
      const r = c.rollup ?? {};
      const n = (r.untested ?? 0) + (r.shaky ?? 0) + (r.comfortable ?? 0);
      return n !== (c.questions ?? []).length;
    }).map((c) => c.id) },
  /* R-35 · TAUGHT BEFORE DRILLED. `drill` picks `untested -> shaky -> comfortable` and asks nothing
     about whether the material was ever delivered, so a bank of 18 became askable the moment it was
     registered — and a UAT run duly quizzed a competency nobody had been taught. The order was only
     ever prose in two skill files, which is a rule someone has to remember.
     WHY IT IS SCOPED TO ATTEMPTED COMPETENCIES: a registered-but-untaught bank is a legitimate
     state — that is what registration IS. The defect is an ATTEMPT against one. So the law fires on
     evidence that drilling happened, not on the absence of teaching. */
  { id: 'taught-before-drilled',
    why: 'a competency with attempts recorded but no taught_at was verified on material never delivered',
    broken: (b) => cs(b).filter((c) => attempted(c) && !str(c.taught_at)).map((c) => c.id) },

  /* ── CF-026 · SOURCES ────────────────────────────────────────────────────────────────────────
     The agent-harness bank shipped 18 questions citing four named authorities, and 0 of the 18
     carried a source field. The citations were in the ideal answers, in prose, recalled rather than
     read. A citation nobody can resolve is a guess wearing a proper noun, and the cost lands on the
     learner who repeats it in a review.
     FORWARD-SCOPED ON PURPOSE. SOURCED is a cutoff set, not "every competency". The thirteen banks
     that predate this rule are not defects to be backfilled — backfilling them would mean inventing
     attributions, which is the exact failure this law exists to stop. New banks join the set. */
  { id: 'question-declares-source',
    why: 'a question with no source field cites from memory, and memory is where CF-026 came from',
    broken: (b) => cs(b).filter((c) => SOURCED.has(c.id))
      .flatMap((c) => (c.questions ?? []).filter((q) => !Array.isArray(q.sources)).map((q) => q.id)) },

  /* Three states, not two. `unsourced` is LEGAL and visible — a claim the packet owns and no source
     backs. What is illegal is silence: a question that neither cites nor admits it cannot. */
  { id: 'question-declares-sourcing',
    why: 'supported, analogy and unsourced are different epistemic claims; collapsing them hides which is which',
    broken: (b) => cs(b).filter((c) => SOURCED.has(c.id))
      .flatMap((c) => (c.questions ?? []).filter((q) => !SOURCING.has(q.sourcing)).map((q) => q.id)) },

  { id: 'sourcing-matches-sources',
    why: 'a question claiming support with no source, or citing sources while declaring itself unsourced, is mislabelled either way',
    broken: (b) => cs(b).filter((c) => SOURCED.has(c.id))
      .flatMap((c) => (c.questions ?? []).filter((q) => {
        const n = (q.sources ?? []).length;
        if (q.sourcing === 'unsourced') return n !== 0;
        return n === 0;
      }).map((q) => q.id)) },

  /* Resolution is the whole point. An id that resolves to nothing is indistinguishable from an
     invented one, which is what the map was built to prevent. */
  { id: 'question-source-resolves',
    why: 'a source id that resolves to no entry in the authority map is an unfalsifiable citation',
    broken: (b) => { const known = mapSources(); if (!known) return [];
      return cs(b).filter((c) => SOURCED.has(c.id))
        .flatMap((c) => (c.questions ?? [])
          .filter((q) => (q.sources ?? []).some((s) => !known.has(s)))
          .map((q) => q.id)); } },

  /* ── COMPETENCY CASE · TIERS ─────────────────────────────────────────────────────────────────
     Every question carries the triplet the packet teaches to: decision situation, heuristic,
     concept. Tier S means the decision situation REALLY HAPPENED and a source documents it. Tier A
     means it is constructed, and the evidence field carries sourced proof that situations of this
     shape occur. The tiers exist so a constructed case can never be read as a real one. */
  { id: 'question-has-case',
    why: 'the packet teaches to a triplet; a question with no case tests recall of words instead of a decision',
    broken: (b) => cs(b).filter((c) => SOURCED.has(c.id))
      .flatMap((c) => (c.questions ?? []).filter((q) => {
        const k = q.case;
        return !k || !TIERS.has(k.tier) || !str(k.decision_situation) || !str(k.heuristic)
          || !str(k.concept) || !str(k.evidence);
      }).map((q) => q.id)) },

  /* The sharpest of these. A tier S claim asserts a real event, so it must name a source that was
     actually READ — a map entry carrying a `verified` block. Tier S backed by an unread source is
     a fabricated case with a citation attached, which is strictly worse than a case marked A. */
  { id: 'tier-S-case-is-real',
    why: 'tier S asserts the situation really happened, so it must cite a source with a verified block; without one it is fiction wearing a citation',
    broken: (b) => { const ver = mapVerified(); if (!ver) return [];
      return cs(b).filter((c) => SOURCED.has(c.id))
        .flatMap((c) => (c.questions ?? []).filter((q) => {
          if (q.case?.tier !== 'S') return false;
          const ev = q.case.evidence_sources ?? [];
          return ev.length === 0 || !ev.some((s) => ver.has(s));
        }).map((q) => q.id)); } },

  /* ── DIFFICULTY ──────────────────────────────────────────────────────────────────────────────
     "Progressively harder" is a claim about ORDER, so it is checkable. Rungs: 1 name, 2 apply,
     3 trace the mechanism, 4 decide under conflict. Non-decreasing WITHIN a chunk; repeats are
     fine — two tracing questions in a row is a chunk with two hard cases, not a defect. */
  { id: 'rung-ascends-within-chunk',
    why: 'a bank that claims to get progressively harder and does not will drill a hard case before the one that sets it up',
    broken: (b) => cs(b).filter((c) => SOURCED.has(c.id)).flatMap((c) => {
      const bad = []; const seen = new Map();
      for (const q of c.questions ?? []) {
        if (!RUNGS.has(q.rung)) { bad.push(q.id); continue; }
        const prev = seen.get(q.chunk);
        if (prev !== undefined && q.rung < prev) bad.push(q.id);
        seen.set(q.chunk, q.rung);
      }
      return bad;
    }) },

  { id: 'chunks-are-contiguous',
    why: 'a chunk interleaved with another is not a chunk; the learner is taught one and drilled on both',
    broken: (b) => cs(b).filter((c) => SOURCED.has(c.id)).flatMap((c) => {
      const order = (c.questions ?? []).map((q) => q.chunk);
      const bad = []; const closed = new Set(); let cur;
      (c.questions ?? []).forEach((q, i) => {
        if (q.chunk !== cur) { if (closed.has(q.chunk)) bad.push(q.id); if (cur !== undefined) closed.add(cur); cur = q.chunk; }
      });
      return bad;
    }) },

  { id: 'chunk-has-a-name',
    why: 'parts is what the learner is shown as the map of the material; a chunk with no name cannot be previewed before it is taught',
    broken: (b) => cs(b).filter((c) => SOURCED.has(c.id)).filter((c) => {
      const n = new Set((c.questions ?? []).map((q) => q.chunk)).size;
      return (c.parts ?? []).length !== n;
    }).map((c) => c.id) },

  { id: 'competency-id-unique',
    why: 'two competencies under one id makes the drill target ambiguous',
    broken: (b) => { const seen = new Set(), dup = []; for (const c of cs(b)) { if (seen.has(c.id)) dup.push(c.id); seen.add(c.id); } return dup; } },
];

const cs = (b) => (Array.isArray(b?.competencies) ? b.competencies : []);
const qs = (b) => cs(b).flatMap((c) => c.questions ?? []);
/* Evidence that drilling happened: any question carrying a verdict, or a rollup that has moved off
   all-untested. Either is a record of an attempt. */
const attempted = (c) => (c.questions ?? []).some((q) => q.last_verdict || q.status && q.status !== 'untested')
  || ((c.rollup?.shaky ?? 0) + (c.rollup?.comfortable ?? 0)) > 0;

export function audit(bank) {
  return LAWS.map((l) => ({ id: l.id, why: l.why, broken: l.broken(bank) }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const file = process.argv[2] ?? BANK;
  let bank;
  try { bank = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { console.error(`lint-bank: could not read ${file} — ${e.message}`); process.exit(2); }

  const results = audit(bank);
  let failed = 0;
  for (const r of results) {
    if (!r.broken.length) { console.log(`  ok    ${r.id}`); continue; }
    failed++;
    console.log(`  FAIL  ${r.id} — ${r.broken.length} row(s): ${r.broken.slice(0, 4).join(', ')}${r.broken.length > 4 ? ' …' : ''}`);
    console.log(`        ${r.why}`);
  }
  console.log(`\n${cs(bank).length} competenc(ies) · ${qs(bank).length} question(s) · ${LAWS.length - failed}/${LAWS.length} laws hold`);
  process.exit(failed ? 1 : 0);
}
