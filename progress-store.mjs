#!/usr/bin/env node
/**
 * progress-store — the learning curve, derived from the graded attempts rather than asserted.
 *
 * WHY IT EXISTS, and the measurement that forced it. `tracking slope of learning curve` is the
 * only P&L job in this packet: the one number that says whether the kit is moving the learner or
 * merely producing sessions. MEASURED 2026-08-26, before a line of this was written: 12 topics in
 * progress.json, ZERO carrying any series, ZERO attempt files on disk, and `last_score` holding a
 * WORD — `pass` / `partial` / `fail` — not a number you can difference. A slope over one point is
 * UNDEFINED, and no formula fixes that. The metric could not move, and shipping a slope() that
 * returned undefined for all twelve would have read as working machinery.
 *
 * NO SECOND STORE, and that was the decision. The obvious move was an attempts.jsonl beside the
 * markdown. `attempts/README.md` already declares the home — "one file per graded attempt,
 * containing the question, the attempt verbatim and uncorrected, the frozen ideal, the hit/miss
 * checklist, and the miss codes" — so a sidecar would give one fact two homes, and the two would
 * disagree the first time someone edited only one. The numbers therefore live in FRONTMATTER of the
 * same file: one attempt, one file, a machine reading and a human reading that cannot drift apart.
 * Parsing the prose was the third option and is worse than both — a grader's sentence is not a
 * schema.
 *
 * THREE STATES, because two would lie. A topic with fewer than two attempts has no slope. That is
 * `UNEVALUABLE`, never zero: zero means measured-and-flat, and reporting "no change" for a learner
 * who has been tested once is the same could-not-look-reads-as-nothing-wrong failure the rest of
 * this kit refuses.
 *
 *   node progress-store.mjs                  every topic with a series
 *   node progress-store.mjs --topic <id>     one topic
 *   node progress-store.mjs --record --topic <id> --question <id> --hit 6 --of 8 \
 *                           --miss mechanism,price --by isha
 *                                            file one graded attempt
 *   node progress-store.mjs --taught --topic <competency-id>
 *                                            stamp a competency as delivered
 *   EXIT: 0 every topic with two points has an honest verdict · 1 a rise is suspect · 2 unreadable
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.dirname(fileURLToPath(import.meta.url));
export const ATTEMPTS = path.join(ROOT, 'attempts');
export const BANK = path.join(ROOT, 'resources', 'competency-progress.json');
export const MISS_CODES = ['name', 'mechanism', 'boundary', 'price', 'phrasing'];
export const MODES = ['online', 'offline'];

/* WHO MAY NOT GRADE. An advisor pass on the first version of this file returned one verdict: it
   measures the author, not the learner. Every point in the series had been written by the same
   process that wrote the metric — both baselines transcribed by me, the end-to-end "proof" using an
   attempt file I wrote, and the suspect rule reading miss codes I also wrote.
   The grounded analogue is the goal-classifier arm from the specification-gaming corpus
   (`a_sg_goal_classifier_fooled_by_arm_pose`): with a goal-image classifier's success probability
   used as the reward, "the RL algorithm exploited a goal classifier by moving the robot arm in a
   peculiar way resulting in an erroneous high reward, since the classifier was not trained on this
   specific kind of negative example". The arm scored 1.0 without ever moving the object. The
   oracle believed whatever it was shown, and so did this module.
   So a grader named here cannot produce a point that counts. This does not detect a liar — someone
   may still type another name — it removes the ACCIDENTAL loop, which is the one that was live. */
export const CANNOT_GRADE = ['packet-author', 'self', 'claude', 'assistant'];
export const selfGraded = (a) => CANNOT_GRADE.includes(String(a?.assigned_by ?? '').toLowerCase());

/* A point that was declared or self-graded is not an OBSERVATION. It may sit in the series — the
   baseline has to live somewhere — but it cannot be an endpoint of a measured slope. */
export const observed = (a) => !a?.declared && !selfGraded(a);

/* Frontmatter is a fenced key: value block at the top of the file. Deliberately not YAML: a
   dependency for five scalars and one list is a dependency to keep current forever. */
export function parseFrontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---/.exec(String(text ?? ''));
  if (!m) return null;
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = /^([a-z_]+):\s*(.*)$/.exec(line.trim());
    if (!kv) continue;
    const [, k, raw] = kv;
    /* COERCED, because frontmatter is text and `declared: true` is how a human writes a boolean.
       Without this the value arrives as the STRING "true", validateAttempt refuses it as a
       non-boolean, and `attempts()` drops the record — so a declared baseline vanished silently and
       its topic fell back to one point. A parser that quietly discards what it cannot type is the
       same could-not-look failure as any other, one layer down. */
    out[k] = /^\[.*\]$/.test(raw)
      ? raw.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
      : raw === 'true' ? true
      : raw === 'false' ? false
      : (/^\d+$/.test(raw) ? Number(raw) : raw);
  }
  return out;
}

/** Problems with one attempt record. Empty means it can be counted. */
export function validateAttempt(a) {
  const e = [];
  const str = (x) => typeof x === 'string' && x.trim();
  if (!str(a?.topic)) e.push('topic is required');
  if (!str(a?.at)) e.push('at is required — a point with no moment cannot be ordered');
  if (!Number.isInteger(a?.hit) || a.hit < 0) e.push('hit must be a non-negative integer');
  if (!Number.isInteger(a?.of) || a.of <= 0) e.push('of must be a positive integer — a rate needs a denominator');
  if (Number.isInteger(a?.hit) && Number.isInteger(a?.of) && a.hit > a.of) e.push('hit exceeds of');
  if (a?.mode && !MODES.includes(a.mode)) e.push(`mode must be one of ${MODES.join('|')}`);
  for (const c of (a?.miss_codes ?? [])) if (!MISS_CODES.includes(c)) e.push(`unknown miss code '${c}'`);
  /* A DECLARED POINT IS NOT A MEASURED ONE. Seeding a baseline from a handoff document is
     legitimate — without it the first real drill has nothing to be a slope against — but it must
     say so, or the first slope is fiction wearing a number. */
  if (a?.declared !== undefined && typeof a.declared !== 'boolean') e.push('declared is a boolean');
  if (!str(a?.assigned_by)) e.push('assigned_by is required — a grade with no grader cannot be audited');
  return e;
}

/* WHICH FILES ARE EVEN CANDIDATES. One named exception, and it is the directory's own prose:
   `attempts/README.md` is not a malformed record, it is not a record. Everything else that ends in
   `.md` is a candidate, so an omission cannot hide behind a filename that misses a convention.
   The first cut of this filtered on the documented `<YYYY-MM-DD>-<slug>.md` shape instead, which
   put the record's identity in the FILENAME as well as in its `topic`/`at` frontmatter — two homes
   for one fact, and the store would have started disagreeing with itself the first time a file was
   renamed. */
export const isAttemptFile = (f) => f.endsWith('.md') && f !== 'README.md';

export function attempts({ dir = ATTEMPTS } = {}) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(isAttemptFile)
    .map((f) => ({ file: f, fm: parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf8')) }))
    .filter((x) => x.fm && validateAttempt(x.fm).length === 0)
    .map((x) => ({ ...x.fm, file: x.file }))
    .sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
}

/* WHAT `attempts()` THREW AWAY, and why silence here is the same defect twice. `attempts()` drops
   any file it cannot parse or validate, and reported nothing about it — so nine graded records sat
   in `attempts/` and the store said `no attempt records`, which reads as "there is no evidence"
   rather than "I could not read the evidence". A reader cannot tell a clean directory from an
   unreadable one, and that is the failure this whole file exists to refuse. */
export function skipped({ dir = ATTEMPTS } = {}) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(isAttemptFile)
    .map((f) => ({ file: f, fm: parseFrontmatter(fs.readFileSync(path.join(dir, f), 'utf8')) }))
    .filter((x) => !x.fm || validateAttempt(x.fm).length > 0)
    .map((x) => ({ file: x.file, why: x.fm ? validateAttempt(x.fm).join('; ') : 'no frontmatter block' }));
}

const str = (x) => typeof x === 'string' && x.trim().length > 0;
export const rate = (a) => a.hit / a.of;
/* UNRECORDED IS NOT ZERO, and this is the same could-not-look failure the rest of the file refuses,
   one field down. The first version returned 0 for an empty `miss_codes`, which made two different
   states identical: a learner who missed nothing, and a grader who did not write the codes down.
   MEASURED in attempts/ on 2026-08-27: three graded questions carry misses and NO miss-code line
   (`2026-08-24-retrieval-as-a-subagent` Q1 and Q2, `2026-08-24-continuous-eval-and-optimizer` Q2).
   Read as 0, each one makes the next real attempt look like a rise in mechanism share and trips the
   honesty rule for a reason nobody can act on. `null` says the share is unknown; a perfect score
   still returns 0, because there a zero was actually earned. */
export const mechanismShare = (a) => {
  const codes = a.miss_codes ?? [];
  if (codes.length) return codes.filter((c) => c === 'mechanism').length / codes.length;
  return (Number.isInteger(a?.hit) && Number.isInteger(a?.of) && a.hit === a.of) ? 0 : null;
};

export const series = (topic, opts) => attempts(opts).filter((a) => a.topic === topic);

/**
 * Slope in hit-rate points per day, between the first and last attempt on a topic.
 * Under two points there is no slope, and that is UNEVALUABLE rather than 0.
 */
export function slope(topic, opts) {
  const s = series(topic, opts);
  if (s.length < 2) return { state: 'UNEVALUABLE', why: `${s.length} attempt(s) — a slope needs two points`, points: s.length };
  /* DECLARED UNTIL OBSERVED. A series with no observed point is arithmetic over assertions. It has
     two endpoints and a positive difference and it measures nothing, which is the exact shape that
     reads as working machinery while reporting an artefact. */
  const obs = s.filter(observed);
  if (!obs.length)
    return { state: 'UNEVALUABLE', points: s.length, observed: 0,
             why: `${s.length} point(s), none observed — every one is declared or self-graded, so a slope over them measures the author` };
  const a = s[0], b = s[s.length - 1];
  const days = (Date.parse(b.at) - Date.parse(a.at)) / 86400000;
  if (!(days > 0)) return { state: 'UNEVALUABLE', why: 'first and last attempt share a moment', points: s.length };
  return { state: 'measured', value: (rate(b) - rate(a)) / days, points: s.length,
           from: rate(a), to: rate(b), days,
           observed: obs.length,
           declared_points: s.filter((x) => x.declared).length,
           self_graded_points: s.filter(selfGraded).length };
}

/**
 * The honesty rule (LP-19): a rise in hit rate with no fall in mechanism share is SUSPECT.
 * The questions may simply have got easier, and a metric that only ever goes up is a metric
 * nobody is testing.
 */
export function verdict(topic, opts) {
  const s = series(topic, opts);
  const sl = slope(topic, opts);
  if (sl.state !== 'measured') return { state: 'UNEVALUABLE', why: sl.why, slope: sl };
  const a = s[0], b = s[s.length - 1];
  const rose = rate(b) > rate(a);
  const from = mechanismShare(a), to = mechanismShare(b);
  /* THE RULE NEEDS BOTH SHARES, and saying so is the whole point. Comparing against an unrecorded
     share would decide `suspect` from a number nobody wrote, which is the arithmetic-over-assertions
     shape this file already refuses one level up. It is only checked on a rise, because that is the
     only direction the rule fires in. */
  if (rose && (from === null || to === null))
    return { state: 'UNEVALUABLE', slope: sl,
             why: `hit rate rose ${rate(a).toFixed(2)} -> ${rate(b).toFixed(2)}, but mechanism share is unrecorded on ${from === null ? a.file ?? 'the first point' : b.file ?? 'the last point'} — a rise cannot be cleared or condemned against a share nobody wrote down` };
  const shareFell = to < from;
  if (rose && !shareFell)
    return { state: 'suspect', slope: sl,
             why: `hit rate rose ${rate(a).toFixed(2)} -> ${rate(b).toFixed(2)} while mechanism share did not fall (${mechanismShare(a).toFixed(2)} -> ${mechanismShare(b).toFixed(2)})` };
  return { state: 'measured', slope: sl, mechanism_share: { from, to } };
}

/**
 * File one graded attempt. Returns the path written.
 *
 * THIS EXISTS SO THE END-TO-END RUN HAS NO HAND-EDITED STEP. Without it a learner finishes a drill
 * and then has to hand-write YAML frontmatter with the right field names, which is the step that
 * would quietly not happen — and an attempt nobody records is a point the curve never gets.
 */
export function record(a, { dir = ATTEMPTS } = {}) {
  const problems = validateAttempt(a);
  if (problems.length) return { state: 'REFUSED', why: problems.join('; '), file: null };
  const slug = String(a.topic).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const day = String(a.at).slice(0, 10);
  const base = `${day}-${slug}`;
  fs.mkdirSync(dir, { recursive: true });
  /* ONE FILE PER ATTEMPT, never an overwrite: a second attempt on the same day is a second point,
     and silently replacing the first would delete the very difference a slope is made of. */
  let name = `${base}.md`, n = 2;
  while (fs.existsSync(path.join(dir, name))) name = `${base}-${n++}.md`;
  const fm = ['topic', 'question_id', 'at', 'hit', 'of', 'miss_codes', 'mode', 'assigned_by', 'declared']
    .filter((k) => a[k] !== undefined)
    .map((k) => `${k}: ${Array.isArray(a[k]) ? `[${a[k].join(', ')}]` : a[k]}`);
  const body = a.body ?? 'Paste the attempt here, verbatim and uncorrected.';
  fs.writeFileSync(path.join(dir, name), `---\n${fm.join('\n')}\n---\n\n${body}\n`);
  return { state: 'RECORDED', file: path.join(dir, name) };
}

/**
 * Stamp a competency as taught. `learn` calls this at consolidation.
 *
 * WHY A COMMAND AND NOT A SENTENCE IN A SKILL FILE. `lint-bank`'s `taught-before-drilled` law
 * refuses a competency with attempts recorded and no `taught_at` — and when that law shipped,
 * NOTHING WROTE THE FIELD. A guard over a field nobody fills is a guard that can only ever refuse,
 * which is worse than none: it makes the honest state unreachable and invites someone to delete the
 * law rather than satisfy it. The rule was prose in two skill files, which is a rule someone has to
 * remember; this is a rule someone can run.
 */
export function markTaught(topic, { file = BANK, at = new Date().toISOString() } = {}) {
  if (typeof topic !== 'string' || !topic.trim())
    return { state: 'REFUSED', why: 'a competency id is required' };
  let bank;
  try { bank = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { return { state: 'UNEVALUABLE', why: `${file} could not be read — ${e.message}` }; }
  const c = (bank.competencies ?? []).find((x) => x.id === topic);
  if (!c) return { state: 'REFUSED', why: `no competency '${topic}' in the bank — teaching something unregistered leaves nothing to drill` };
  /* FIRST DELIVERY WINS. Re-teaching does not reset the date: the law asks whether the material was
     ever delivered, and overwriting would let a re-teach today excuse an attempt from last week. */
  if (str(c.taught_at)) return { state: 'NOOP', why: `already taught ${c.taught_at}`, taught_at: c.taught_at };
  c.taught_at = at;
  fs.writeFileSync(file, `${JSON.stringify(bank, null, 2)}\n`);
  return { state: 'STAMPED', taught_at: at };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  /* GUARDED, because indexOf returns -1 when the flag is absent and argv[-1 + 1] is argv[0] — the
     node binary path. Unguarded, every topic was filtered against "/usr/local/bin/node" and the
     report printed `2 attempt(s) · 0 topic(s)`: two records read, none shown, exit 0. A reader
     would have called that "no data" when the data was right there. */
  const flag = (n) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : null; };
  const only = flag('--topic');

  if (process.argv.includes('--taught')) {
    const r = markTaught(only, flag('--at') ? { at: flag('--at') } : {});
    console.log(`  ${r.state}${r.taught_at ? ` ${r.taught_at}` : ''}${r.why ? ` — ${r.why}` : ''}`);
    process.exit(r.state === 'REFUSED' || r.state === 'UNEVALUABLE' ? 1 : 0);
  }

  if (process.argv.includes('--record')) {
    const r = record({
      topic: only, question_id: flag('--question'),
      at: flag('--at') ?? new Date().toISOString(),
      hit: Number(flag('--hit')), of: Number(flag('--of')),
      miss_codes: (flag('--miss') ?? '').split(',').map((s) => s.trim()).filter(Boolean),
      mode: flag('--mode') ?? 'online',
      assigned_by: flag('--by'),
    });
    console.log(r.state === 'RECORDED' ? `  recorded: ${path.relative(ROOT, r.file)}` : `  REFUSED: ${r.why}`);
    process.exit(r.state === 'RECORDED' ? 0 : 1);
  }
  const all = attempts();
  const missed = skipped();
  /* NAMED, NOT COUNTED. "3 files skipped" is the same could-not-look-reads-as-nothing-wrong shape:
     the reader still cannot act on it without opening the directory themselves. */
  for (const m of missed) console.log(`  skipped     ${m.file} — ${m.why}`);
  if (missed.length) console.log('');
  if (!all.length) { console.log('  no attempt records with valid frontmatter under attempts/'); process.exit(0); }
  const topics = [...new Set(all.map((a) => a.topic))].filter((t) => !only || t === only);
  let suspect = 0;
  for (const t of topics) {
    const v = verdict(t);
    if (v.state === 'suspect') suspect++;
    const s = v.slope;
    const line = s.state === 'measured'
      ? `${s.from.toFixed(2)} -> ${s.to.toFixed(2)} over ${s.days.toFixed(1)}d = ${(s.value * 100).toFixed(1)} pts/day${s.declared_points ? `  (${s.declared_points} declared)` : ''}`
      : s.why;
    console.log(`  ${v.state.padEnd(11)} ${t}\n              ${line}`);
    if (v.why && v.state === 'suspect') console.log(`              ${v.why}`);
  }
  console.log(`\n${all.length} attempt(s) · ${topics.length} topic(s) · ${suspect} suspect`);
  process.exit(suspect ? 1 : 0);
}
