#!/usr/bin/env node
/**
 * test-progress-store — proves the learning-curve metric can actually move, and refuses to move
 * when it should not.
 *
 * WHY THE NEGATIVE HALF MATTERS MORE. A slope that always returns a number is worse than none: it
 * reads as measurement while reporting an artefact. The cases below pin the three ways it must
 * REFUSE — one point, two points sharing a moment, and a rise that no fall in mechanism share
 * justifies — before they pin the one way it may report.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { slope, verdict, series, rate, mechanismShare, validateAttempt, parseFrontmatter, MISS_CODES, selfGraded, observed, CANNOT_GRADE } from '../progress-store.mjs';

let pass = 0; const fails = [];
const ok = (name, cond, detail = '') => (cond ? (pass++, console.log(`  ok    ${name}`))
  : (fails.push(name), console.log(`  FAIL  ${name}${detail ? '  -> ' + detail : ''}`)));

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'progress-'));
const write = (name, fm, body = 'the attempt, verbatim.') => {
  fm = { assigned_by: 'isha', ...fm };   /* a grade needs a grader; tests that omit it test nothing */
  const lines = Object.entries(fm).map(([k, v]) => `${k}: ${Array.isArray(v) ? `[${v.join(', ')}]` : v}`);
  fs.writeFileSync(path.join(dir, `${name}.md`), `---\n${lines.join('\n')}\n---\n\n${body}\n`);
};
const O = { dir };

/* ---- 1. FRONTMATTER, AND WHY NOT A SIDECAR ---- */
ok('frontmatter parses scalars and a list',
   JSON.stringify(parseFrontmatter('---\ntopic: t\nhit: 3\nmiss_codes: [mechanism, price]\n---\nbody'))
   === JSON.stringify({ topic: 't', hit: 3, miss_codes: ['mechanism', 'price'] }));
ok('a file with no frontmatter is not an attempt', parseFrontmatter('just prose') === null);

/* ---- 2. WHAT A POINT MUST CARRY ---- */
ok('a rate needs a denominator', validateAttempt({ topic: 't', at: '2026-01-01', hit: 1, of: 0 }).length > 0);
ok('hit cannot exceed of', validateAttempt({ topic: 't', at: '2026-01-01', hit: 5, of: 3 }).length > 0);
ok('a point with no moment cannot be ordered', validateAttempt({ topic: 't', hit: 1, of: 3 }).length > 0);
ok('an unknown miss code is refused',
   validateAttempt({ topic: 't', at: '2026-01-01', hit: 1, of: 3, miss_codes: ['vibes'] }).length > 0);
ok('every real miss code is accepted',
   MISS_CODES.every((c) => validateAttempt({ topic: 't', at: '2026-01-01', hit: 1, of: 3, miss_codes: [c], assigned_by: 'isha' }).length === 0));

/* ---- 3. THE REFUSALS — three points where a number would be a lie ---- */
write('a1', { topic: 'solo', at: '2026-08-24T09:00:00Z', hit: 1, of: 8, miss_codes: ['mechanism'] });
/* ASSERTS THE REASON, NOT JUST THE STATE. The first version checked only that one point came back
   UNEVALUABLE, and a mutation widening the two-point rule to `s.length < 0` SURVIVED it: one point
   fell through to the shared-moment branch and returned UNEVALUABLE anyway. The test passed for the
   wrong reason, which is a test that cannot tell the two refusal paths apart. */
ok('one point is UNEVALUABLE, never a slope of zero', slope('solo', O).state === 'UNEVALUABLE');
ok('and the reason is the two-point rule, not the shared-moment one',
   /needs two points/.test(slope('solo', O).why ?? ''), slope('solo', O).why);
ok('and it says how many points it had', slope('solo', O).points === 1);

write('b1', { topic: 'same', at: '2026-08-24T09:00:00Z', hit: 1, of: 8, miss_codes: ['mechanism'] });
write('b2', { topic: 'same', at: '2026-08-24T09:00:00Z', hit: 6, of: 8, miss_codes: ['price'] });
ok('two points sharing a moment is UNEVALUABLE — a slope needs elapsed time',
   slope('same', O).state === 'UNEVALUABLE');
ok('and that reason is distinct from the two-point one',
   /share a moment/.test(slope('same', O).why ?? ''), slope('same', O).why);

/* ---- 4. THE METRIC MOVES ---- */
write('c1', { topic: 'l2-runtime', at: '2026-08-24T09:00:00Z', hit: 1, of: 8, miss_codes: ['mechanism', 'mechanism', 'price'], mode: 'online' });
write('c2', { topic: 'l2-runtime', at: '2026-08-28T09:00:00Z', hit: 6, of: 8, miss_codes: ['price'], mode: 'online' });
const s = slope('l2-runtime', O);
ok('two points four days apart produce a measured slope', s.state === 'measured', JSON.stringify(s));
ok('the slope is positive when the learner improved', s.value > 0);
ok('and it is in hit-rate points per day',
   Math.abs(s.value - ((6 / 8 - 1 / 8) / 4)) < 1e-9, String(s.value));
ok('mechanism share fell as the mechanism misses cleared',
   mechanismShare(series('l2-runtime', O)[0]) > mechanismShare(series('l2-runtime', O)[1]));
ok('so the verdict is measured, not suspect', verdict('l2-runtime', O).state === 'measured');

/* ---- 5. THE HONESTY RULE — a rise nobody earned ---- */
write('d1', { topic: 'gamed', at: '2026-08-24T09:00:00Z', hit: 1, of: 8, miss_codes: ['mechanism'] });
write('d2', { topic: 'gamed', at: '2026-08-28T09:00:00Z', hit: 7, of: 8, miss_codes: ['mechanism'] });
const g = verdict('gamed', O);
ok('a rise with no fall in mechanism share is SUSPECT', g.state === 'suspect', JSON.stringify(g));
ok('and the verdict says why in the operator\'s own terms', /mechanism share did not fall/.test(g.why));
ok('the slope is still reported — suspect is not a refusal to measure', g.slope.state === 'measured');

/* ---- 6. A DECLARED POINT IS COUNTED AND LABELLED ---- */
write('e1', { topic: 'seeded', at: '2026-08-26T09:00:00Z', hit: 1, of: 8, miss_codes: ['mechanism'], declared: 'true' });
write('e2', { topic: 'seeded', at: '2026-08-30T09:00:00Z', hit: 5, of: 8, miss_codes: ['price'] });
ok('a declared baseline still yields a slope', slope('seeded', O).state === 'measured');
ok('and the slope says how many of its points were declared, not measured',
   slope('seeded', O).declared_points === 1, String(slope('seeded', O).declared_points));

/* ---- 7. THE SELF-GRADING LOOP ----
   An advisor pass on the first version returned one verdict: it measures the author, not the
   learner. Both baselines were transcribed by the packet author, the end-to-end "proof" used an
   attempt the author wrote, and the suspect rule read miss codes the author also wrote. Nothing in
   the loop came from a learner. The analogue is the goal-classifier arm: the oracle believed what
   it was shown and scored 1.0 for an arm that never moved the object. */
{
  ok('a grade with no grader is refused',
     validateAttempt({ topic: 't', at: '2026-01-01', hit: 1, of: 3 }).some((x) => /assigned_by/.test(x)));
  ok('the packet author cannot grade', CANNOT_GRADE.every((who) => selfGraded({ assigned_by: who })));
  ok('and the check is case-insensitive, so `Claude` does not slip through',
     selfGraded({ assigned_by: 'Claude' }));
  ok('the learner can grade', !selfGraded({ assigned_by: 'isha' }));
  ok('a declared point is not an observation', !observed({ declared: true, assigned_by: 'isha' }));
  ok('a self-graded point is not an observation', !observed({ assigned_by: 'claude' }));

  write('f1', { topic: 'authored', at: '2026-08-24T09:00:00Z', hit: 1, of: 8, miss_codes: ['mechanism'], declared: true, assigned_by: 'checker' });
  write('f2', { topic: 'authored', at: '2026-08-28T09:00:00Z', hit: 6, of: 8, miss_codes: ['price'], assigned_by: 'claude' });
  const a = slope('authored', O);
  ok('two points with none observed is UNEVALUABLE, not a 17.6 pts/day slope', a.state === 'UNEVALUABLE', JSON.stringify(a));
  ok('and it says why in terms of who produced the points',
     /none observed/.test(a.why ?? ''), a.why);

  write('f3', { topic: 'authored', at: '2026-08-29T09:00:00Z', hit: 6, of: 8, miss_codes: ['price'], assigned_by: 'isha' });
  const b = slope('authored', O);
  ok('one observed point among declared ones makes it measurable again', b.state === 'measured', JSON.stringify(b));
  ok('and the slope reports how many of its points were observed', b.observed === 1, String(b.observed));
  ok('and how many were self-graded', b.self_graded_points === 1, String(b.self_graded_points));
}

console.log(`\n${pass} passed · ${fails.length} failed`);
if (fails.length) { console.log(`  failing: ${fails.join(', ')}`); process.exit(1); }
process.exit(0);
