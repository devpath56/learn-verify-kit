#!/usr/bin/env node
/**
 * test-lint-bank — proves every law in lint-bank can actually fail.
 *
 * WHY IT EXISTS. A validator that passes on the live bank has shown nothing: it may be passing
 * because the bank is clean, or because the law cannot fire at all. `slop-gradient PASSED a fixture
 * that never had the defect` is the failure this repo family already paid for, and a bank validator
 * shipped green with no negative case is the same shape.
 *
 * BREAKS ARE FUNCTIONS OF THE REAL BANK, not fixture files. A fixture drifts from the law the
 * moment either changes and nothing compares them; a mutation of the live artefact cannot.
 */
import { audit, BANK, LAWS, SOURCED } from './lint-bank.mjs';
import fs from 'node:fs';

let pass = 0; const fails = [];
const ok = (name, cond, detail = '') => (cond ? (pass++, console.log(`  ok    ${name}`))
  : (fails.push(name), console.log(`  FAIL  ${name}${detail ? '  -> ' + detail : ''}`)));

const good = JSON.parse(fs.readFileSync(BANK, 'utf8'));
const clone = () => JSON.parse(JSON.stringify(good));
const last = () => good.competencies.length - 1;


/* The sourcing and case laws are scoped to SOURCED competencies, so a break aimed at competencies[0]
   would mutate a bank the law does not govern and prove nothing. Resolve the target by the same set
   the laws use, rather than by position. */
const sourced = (b) => b.competencies.find((c) => SOURCED.has(c.id));

const BREAKS = {
  'question-has-ideal': (b) => { b.competencies[last()].questions[0].ideal = ''; return b; },
  'question-has-prompt': (b) => { delete b.competencies[last()].questions[1].prompt; return b; },
  'question-id-unique': (b) => { b.competencies[last()].questions[2].id = b.competencies[last()].questions[1].id; return b; },
  'question-id-matches-competency': (b) => { b.competencies[last()].questions[3].id = 'some-other-competency.q1'; return b; },
  'rollup-counts-the-questions': (b) => { b.competencies[last()].rollup.untested = 99; return b; },
  /* ADDS a colliding row rather than RENAMING one. Renaming trips two laws, because a competency's
     id is the PREFIX of its question ids — a real coupling in the schema, not a flaw in the laws.
     A break that fires two laws proves neither, so this one isolates: an empty competency whose
     rollup sums to its zero questions, colliding on id alone. */
  /* Marks the competency ATTEMPTED without teaching it. Not `delete taught_at` — that would fire on
     a registered-but-untaught bank, which is the legitimate state registration creates. */
  'taught-before-drilled': (b) => {
    const c = b.competencies[last()];
    c.rollup.untested -= 1; c.rollup.shaky = (c.rollup.shaky ?? 0) + 1;
    delete c.taught_at;
    return b;
  },
  /* ── BREAKS FOR THE CF-026 SOURCING AND CASE LAWS ────────────────────────────────────────────
     These nine were written as a throwaway `node -e` mutation sweep in one session and reported as
     "10/10 caught" in chat. The sweep was real and it passed; it was also PRIVATE, so this file —
     which exists precisely to hold it — stayed red with nine laws unproven, and the report of a
     green result and the state of the repo disagreed for the whole session.
     The lesson is not "run the tests". It is that a measurement worth making has a HOME, and when
     the home already exists, building a second one next to it is how a proof gets thrown away. */
  'question-declares-source': (b) => {
    /* `sourcing` is set to unsourced IN THE SAME BREAK, and that is not incidental. Deleting the
       array alone also trips sourcing-matches-sources, and a break that fires two laws cannot show
       which one caught it — the specificity meta-law below exists to refuse exactly that. */
    const q = sourced(b).questions[0]; delete q.sources; q.sourcing = 'unsourced'; return b; },
  'question-declares-sourcing': (b) => { sourced(b).questions[0].sourcing = 'vibes'; return b; },
  'sourcing-matches-sources': (b) => {
    /* Claims unsourced while still citing: the mislabel that hides a real citation, not the one
       that invents a missing one. Both directions are illegal; this is the quieter of the two. */
    sourced(b).questions[0].sourcing = 'unsourced'; return b; },
  'question-source-resolves': (b) => {
    sourced(b).questions[0].sources = ['nygard-from-memory']; return b; },
  'question-has-case': (b) => { delete sourced(b).questions[0].case.heuristic; return b; },
  'tier-S-case-is-real': (b) => {
    /* Tier S citing a source that is not in the map at all — fiction wearing a citation, which is
       strictly worse than the same case honestly marked A. */
    const q = sourced(b).questions[0];
    q.case.tier = 'S'; q.case.evidence_sources = ['made-up-source']; return b; },
  'rung-ascends-within-chunk': (b) => {
    const q = sourced(b).questions; const a = q.find((x) => x.rung === 1);
    if (a) a.rung = 4; const c = q.find((x) => x.chunk === a?.chunk && x.rung < 4 && x !== a);
    if (c) c.rung = 1; return b; },
  'chunks-are-contiguous': (b) => {
    /* Reopen chunk 1 AFTER it closed, by re-appending its LAST question — the one already carrying
       that chunk's highest rung. A copy with a lower rung would also trip rung-ascends-within-chunk,
       and a copy keeping its id would trip question-id-unique. The break has to violate contiguity
       and nothing else, which is what makes it evidence rather than noise. */
    const q = sourced(b).questions; const first = q[0].chunk;
    const last = [...q].reverse().find((x) => x.chunk === first);
    const dup = JSON.parse(JSON.stringify(last)); dup.id += '.reprise';
    q.push(dup);
    /* The rollup counts questions, so appending one without bumping it also trips
       rollup-counts-the-questions. Keeping the denominator honest is what isolates this break. */
    sourced(b).rollup.untested += 1;
    return b; },
  'chunk-has-a-name': (b) => { sourced(b).parts = sourced(b).parts.slice(0, -1); return b; },

  'competency-id-unique': (b) => {
    b.competencies.push({ id: b.competencies[0].id, title: 'collision probe', questions: [],
                          rollup: { untested: 0, shaky: 0, comfortable: 0 } });
    return b;
  },
};

/* EVERY LAW NEEDS A BREAK. A law nobody wrote a break for is a law nobody has shown can fire, and
   adding a seventh law without a break would slip past this file silently. */
ok('every law has a break', LAWS.every((l) => BREAKS[l.id]),
   LAWS.filter((l) => !BREAKS[l.id]).map((l) => l.id).join(','));

ok('the live bank passes every law', audit(good).every((r) => !r.broken.length),
   audit(good).filter((r) => r.broken.length).map((r) => r.id).join(','));

for (const [law, mutate] of Object.entries(BREAKS)) {
  const r = audit(mutate(clone())).find((x) => x.id === law);
  ok(`${law} is tripped by its own break`, r && r.broken.length > 0);
  /* AND TRIPS ONLY ITSELF. A break that fires three laws proves none of them. */
  const others = audit(mutate(clone())).filter((x) => x.id !== law && x.broken.length).map((x) => x.id);
  ok(`${law} trips nothing else`, others.length === 0, others.join(','));
}

console.log(`\n${pass} passed · ${fails.length} failed`);
if (fails.length) { console.log(`  failing: ${fails.join(', ')}`); process.exit(1); }
process.exit(0);
