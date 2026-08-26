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
import { audit, BANK, LAWS } from './lint-bank.mjs';
import fs from 'node:fs';

let pass = 0; const fails = [];
const ok = (name, cond, detail = '') => (cond ? (pass++, console.log(`  ok    ${name}`))
  : (fails.push(name), console.log(`  FAIL  ${name}${detail ? '  -> ' + detail : ''}`)));

const good = JSON.parse(fs.readFileSync(BANK, 'utf8'));
const clone = () => JSON.parse(JSON.stringify(good));
const last = () => good.competencies.length - 1;

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
