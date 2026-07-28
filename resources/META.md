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
| 3 | Service Level Objectives & Canarying Releases | `sre-slo-canary/` | Betsy Beyer, Niall Richard Murphy, David K. Rensin, Kent Kawahara & Stephen Thorne (eds.), *The Site Reliability Workbook*, O'Reilly — Ch. 2 "Implementing SLOs" by Steven Thurgood and David Ferguson with Alex Hidalgo and Betsy Beyer (pp. 17–42), Ch. 16 "Canarying Releases" by Alec Warner and Štěpán Davidovič with Alex Hidalgo, Betsy Beyer, Kyle Smith and Matt Duftler (pp. 335–351). | Built · 18 questions registered |
| 4 | Distributed Data — Encoding, Replication, Sharding, Unreliability | `ddia-distributed-data/` | Martin Kleppmann with Chris Riccomini, *Designing Data-Intensive Applications*, 2nd ed., O'Reilly — Ch. 5 "Encoding and Evolution", Ch. 6 "Replication", Ch. 7 "Sharding", Ch. 9 "The Trouble with Distributed Systems". | Built · 18 questions registered |
| 5 | Transactions — Isolation Levels, Serializability, Atomic Commit | `ddia-transactions/` | Martin Kleppmann with Chris Riccomini, *Designing Data-Intensive Applications*, 2nd ed., O'Reilly — Ch. 8 "Transactions". | Built · 18 questions registered |
| 6 | Browser Networking — Latency, HTTP/1.x, Server-Sent Events, WebSocket | `hpbn-browser-networking/` | Ilya Grigorik, *High Performance Browser Networking*, O'Reilly — Ch. 1 "Primer on Latency and Bandwidth", Ch. 11 "HTTP 1.X", Ch. 16 "Server-Sent Events (SSE)", Ch. 17 "WebSocket". | Built · 18 questions registered |
| 7 | Performance Methodology — Concepts, Perspectives, Methods, Statistics | `sysperf-methodology/` | Brendan Gregg, *Systems Performance: Enterprise and the Cloud*, 2nd ed., Addison-Wesley — Ch. 2 "Methodologies". | Built · 18 questions registered |
| 8 | Benchmarking — What the Number Is, How It Lies, Which Kind, and Active Analysis | `sysperf-benchmarking/` | Brendan Gregg, *Systems Performance: Enterprise and the Cloud*, 2nd ed., Addison-Wesley — Ch. 12 "Benchmarking". | Built · 18 questions registered |
| 9 | *unassigned* | — | — | Awaiting source |
| 10 | *unassigned* | — | — | Awaiting source |
| 11 | *unassigned* | — | — | Awaiting source |
| 12 | *unassigned* | — | — | Awaiting source |
| 13 | *unassigned* | — | — | Awaiting source |

### Works referenced inside competency 8

Cited within the source chapter and named or described in the booklet's teaching: the Transaction
Processing Performance Council (TPC) and its benchmarks TPC-C, TPC-DS, TPC-E, TPC-H, TPC-VMS, TPCx-HS
and TPCx-V, together with the TPC history page account of the 1993 TPC-A dispute — The Standish Group's
charge that Oracle's discrete transactions option was a benchmark special, Oracle's reply, and the
anti-benchmark-special and 2% pricing clauses that followed; the Standard Performance Evaluation
Corporation (SPEC) and its SPEC Cloud IaaS 2018, SPEC CPU 2017, SPECjEnterprise 2018 Web Profile,
SPECsfs2014 and SPECvirt_sc2013 suites; Jim Gray and co-authors for the 1985 paper "A Measure of
Transaction Processing Power", its Sort, Scan and DebitCredit benchmarks and the TPS measure, and
David DeWitt's account of Gray's role in the founding of TPC; the Whetstone (1972) and Dhrystone (1984)
CPU benchmarks; the bonnie++ micro-benchmark suite and Russell Coker's description of it, together with
Roch Bourbonnais's article "Decoding Bonnie++"; the observability tools used in the case studies —
iostat, bpftrace, cachestat, strace and perf-style CPU profiling with flame graphs; the micro-benchmark
tools listed by resource type — SysBench, lmbench, fio, hdparm, dd and iperf; the load generators wrk,
siege and hey; Avishay Traeger and co-authors for "Most popular benchmarks are flawed"; Bart Smaalders
for the warning about optimising for a benchmark that does not resemble customer workloads; Raj Jain
for the Markov-model treatment of stateful workloads and for the statistical texts, alongside Neil
Gunther's; ZFS I/O throttling as the resource control found by CPU profiling, and the Sun ZFS Storage
Appliance as the system whose limits were found by the ramping-load method; the Perl randread.pl load
generator printed in full in the source; Linux /proc counters, sar(1) and tar(1)'s zero-sized-file
problem; and MIPS and FLOPS as cross-vendor measures.

The booklet names **TPC and SPEC as organisations and their suites by name**, because industry-standard
benchmarking is the subject of a whole section and those names are durable and searchable. It names
**no individual tools** — the case-study benchmark, the observability tools, the micro-benchmark tools
and the load generators are all described by what they do. That is the fastest-decaying part of the
chapter, and the analysis is transferable without it. This differs deliberately from competency 7,
which named nothing at all; the line is drawn at whether the name is the subject or the instrument.

### Works referenced inside competency 7

Cited within the source chapter and named in the booklet's teaching: Gene Amdahl for the Law of
Scalability, and Neil Gunther for the Universal Scalability Law (previously the super-serial model) and
for the queueing-theory definition of time-based utilization; Agner Krarup Erlang as the inventor of
queueing theory, with Erlang's C formula, Little's Law and Kendall's notation; Adrian Cockcroft for the
performance-degradation profiles; Richard McDougall for the three-stage drill-down methodology and for
TazTool; Cary Millsap for Method R; Tom Wilkie for the RED method and for USE and RED implementations
using Prometheus and Grafana; Jim Gettys by way of the bufferbloat discussion in the wider work; Raj
Jain for the three types of performance evaluation and for the geometric mean example; Richard Elling
for static performance tuning; Brian Wong for the capacity-planning definition of utilization; John
Allspaw, *The Art of Capacity Planning*; Roy Harrington for the Atlas cloud-wide monitoring tool;
Christopher Williams for the transatlantic-cable latency figure; Craig Hanson and Pat Crain as the
attributed origin of the performance mantras, learned from Scott Emmons; the Five Whys technique; the
Netflix cloud as the worked environment for drill-down analysis, auto scaling and monitoring at scale,
with perfdash and FlameCommander; AWS auto scaling groups and Kubernetes horizontal pod autoscalers; the
Simple Network Monitoring Protocol; the R project and gnuplot for regression and plotting; the observability
tools named as examples — iostat, vmstat, mpstat, top, strace, perf, tcpdump, biosnoop, BCC, bpftrace,
Ftrace, KernelShark, Trace Compass and iperf; Linux PSI pressure metrics and cgroups; and the ZFS Storage
appliance Analytics as the origin of latency heat maps.

### Works referenced inside competency 6

Cited within the source chapters and named in the booklet's teaching: the Hibernia Express transatlantic
cable as the worked example of buying latency; Jim Gettys for coining *bufferbloat*, and the CoDel
active queue management algorithm proposed against it, described in "Controlling Queue Delay" (*ACM
Queue*); the US Federal Communications Commission's "Measuring Broadband America" report (February
2013) for the last-mile figures; Akamai's quarterly broadband reports and Ookla's speedtest.net for edge
bandwidth; TeleGeography for subsea capacity utilisation; Steve Souders, *High Performance Web Sites*,
for the fourteen rules, half of them networking optimisations; David Gourley and Brian Totty, *HTTP: The
Definitive Guide*; Joshua Graessley's WWDC 2012 session "Networking Best Practices" for the iTunes
keepalive-and-pipelining case study; the HTTP Archive for the ninety-plus resources per page figure;
Google's PageSpeed team for the 30–50 KB script-bundle target, and Gmail as the worked first-load
optimisation; the W3C for the EventSource and WebSocket APIs and the IETF HyBi Working Group for the
WebSocket protocol (RFC 6455), its multiplexing and compression extension drafts, and the X/Open
handshake headers; "Talking to Yourself for Fun and Profit" (W2SP 2011) for the cache-poisoning attack
that masking defends against; caniuse.com for browser support status; SockJS and Socket.IO as WebSocket
polyfills and real-time frameworks; and Nginx and HAProxy as the proxy and load-balancer timeout
examples.

### Works referenced inside competency 5

Cited within the source chapter and named in the booklet's teaching: IBM System R as the first SQL
database and the origin of the transaction style still in use; the ACID acronym as coined in 1983;
the BASE label offered as its counterpart; the Post Office Horizon accounting failure as a
consequence of missing ACID transactions; PostgreSQL, MySQL/InnoDB, Oracle, SQL Server and IBM Db2
as the isolation-level implementations compared, including the naming divergence around "repeatable
read"; CockroachDB, TiDB, Spanner, FoundationDB and YugabyteDB as the scaled transactional systems;
VoltDB/H-Store, Redis and Datomic as the serial-execution implementations, with state machine
replication; SQL Server's In-Memory OLTP/Hekaton, HyPer and BadgerDB as further serializable
snapshot isolation implementations; CouchDB, Datomic and LMDB for immutable copy-on-write B-trees;
Aerospike and the lightweight-transactions feature of Cassandra and ScyllaDB as single-object
linearizable stores; MongoDB and Redis for atomic document and data-structure operations; the
X/Open XA standard with the Java Transaction API, JDBC and JMS, and WS-AtomicTransaction; Narayana,
JOTM, BTM and MSDTC as XA coordinators; ActiveMQ, HornetQ, MSMQ and IBM MQ as XA-capable brokers;
Kafka and Kafka Streams for internal distributed transactions and exactly-once semantics; the
SQL/PSM standard and the vendor procedure languages PL/SQL, T-SQL and PL/pgSQL; Rails ActiveRecord
and Django as ORMs that do not retry aborted transactions; and the Spanner paper for the epigraph on
the cost of two-phase commit.

### Works referenced inside competency 4

Cited within the source chapters and named in the booklet's teaching: Apache Thrift, Protocol Buffers
and Apache Avro as the binary encoding formats compared; MessagePack as the binary-JSON family;
MySQL's binlog as the logical replication log; Amazon's Dynamo paper as
the origin of leaderless quorums; Riak and Cassandra as Dynamo-style stores; Chubby
(*sequencers*) and Kafka (*epoch numbers*) as the fencing-token implementations; ZooKeeper and etcd as
lock and lease services; HBase, MongoDB and Cassandra as the sharding examples; Kyle Kingsbury's
network-partition catalogue; the datacentre network-fault study behind the twelve-faults-a-month
figure; the GitHub incident of a lagging promoted leader reusing autoincrement primary keys; NTP and
the time-of-day versus monotonic clock APIs; and the Byzantine Generals problem as the origin of the
term.

### Works referenced inside competency 3

Cited within the source chapters and named in the booklet's teaching: the principles of chaos
engineering are not involved here, but the chapters reference Ben Treynor, Mike Dahlin, Vivek Rau
and Betsy Beyer, "The Calculus of Service Availability" (*ACM Queue*, 2017); Jez Humble and David
Farley, *Continuous Delivery*; George E. P. Box and Norman R. Draper, *Empirical Model-Building and
Response Surfaces* (the "all models are wrong" remark); ITIL's continuous-improvement service goal;
Spearman's rank correlation coefficient; the feature-flag frameworks Gertrude, Feature and PlanOut;
and Google's App Engine as the worked example platform.

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
- **Competency 3's printed final quiz also has no answers in the booklet**, by the same deliberate
  choice as competencies 1 and 2: the ten ideals are frozen in `competency-progress.json` so the
  questions are gradeable, but they are not printed, which keeps the offline quiz honest.
- **Competency 4's printed final quiz also has no answers in the booklet**, by the same deliberate
  choice as competencies 1–3: the ten ideals are frozen in `competency-progress.json` so the questions
  are gradeable, but they are not printed, which keeps the offline quiz honest.
- **Competency 4's source is four chapters, not two.** The booklet teaches the load-bearing spine of
  each chapter rather than its full contents, and says nothing about that inside the booklet — a scope
  note is construction commentary, which belongs here. Material deliberately left out includes the
  detailed byte-level encodings, dataflow through message brokers and services beyond the RPC
  boundary, request-routing implementations, and the formal system-model proofs.
- **Competencies 1–3 have no write-lines under their printed final quizzes.** Decision E4 requires
  ruled lines under every question; competency 4 is the first booklet to apply it to the final quiz,
  and the template now carries it. The three earlier booklets predate the change and have not been
  re-rendered.
- **Competency 5's printed final quiz also has no answers in the booklet**, by the same deliberate
  choice as competencies 1–4: the ten ideals are frozen in `competency-progress.json` so the questions
  are gradeable, but they are not printed, which keeps the offline quiz honest.
- **Competency 5 uses one scoped style block inside its `body.html`**, reducing the monospace sketch
  size and tightening the tracker and quiz spacing. Every other booklet takes all its styling from the
  shared block. The scoped rules exist to fit five large sketches onto their pages; if the shared style
  block is ever revised, check this booklet's sketches first.
- **Competencies 2, 3 and 4 have no reverse-mapping section**, which decision H lists as part of the
  fixed back matter (prescription → what it counters, so a reader can audit a design rather than
  diagnose an incident). Competency 1 has one and competency 5 now has one; the three in between
  drifted. They have not been re-rendered.
- **Competency 6 also carries a scoped style block inside its `body.html`**, as competency 5 does —
  reducing the monospace sketch size, tightening the tracker and quiz, and suppressing the page break
  after the final section. Competencies 1–4 take all their styling from the shared block.
- **Competency 6's printed final quiz also has no answers in the booklet**, by the same deliberate
  choice as competencies 1–5: the ten ideals are frozen in `competency-progress.json` so the questions
  are gradeable, but they are not printed, which keeps the offline quiz honest.
- **Competency 6's source is four chapters spanning two parts of its book**, joined here on a causal
  spine rather than presented in book order. The booklet says nothing about that; the ordering is
  1, 11, 16, 17 as the source presents them, and no chapter is abridged.
- **Competency 6 teaches one mechanism its supplied chapters defer.** Chapter 1 says bufferbloat
  "breaks TCP's congestion avoidance mechanisms" and postpones the explanation to a chapter not
  supplied; the booklet explains it — loss is TCP's congestion signal, so hiding drops removes the
  backoff. The claim is correct and load-bearing for two registered questions, but it is not traceable
  to the four chapters provided. Recorded here rather than removed.
- **Competency 7 also carries the scoped style block** introduced in competency 5, as competency 6 does.
- **Competency 7's printed final quiz also has no answers in the booklet**, by the same deliberate
  choice as competencies 1–6.
- **Competency 7 names methods and models but no products, tools or organisations.** The source names
  many — observability tools, monitoring platforms, cloud providers, orchestrators — and the booklet
  teaches the methodology generically instead, since the method is the transferable part and the tool
  list is the fastest-decaying part of the chapter. All of those names are recorded above.
- **Competency 7 retired two questions the day it was registered.** `p4q2` reused the source's own
  worked example, so its first part tested recognition rather than retrieval; `z03` asked for "four
  anti-methods" where the source names three, the fourth being a legitimate method. Both were caught
  in review before any attempt existed. They were retired and reissued as `p4q2b` and `z03b` rather
  than corrected in place, because the bank convention is unconditional — a materially changed
  question gets a new id. Recording the reason here so the two entries in `retired` are not mistaken
  for a change of standard.
- **Competency 8 also carries the scoped style block** introduced in competency 5, as competencies 6
  and 7 do — with one addition: the whole-competency concept sketch in section 6 is explicitly allowed
  to break across pages, because it is taller than one page and the shared `page-break-inside: avoid`
  rule was stranding its heading on an otherwise empty page.
- **Competency 8's printed final quiz also has no answers in the booklet**, by the same deliberate
  choice as competencies 1–7.
- **Competency 8 names two organisations and their benchmark suites, and no tools.** The reasoning and
  the full list of what was left unnamed are recorded above, under works referenced. It is a different
  line from competency 7's, drawn deliberately.
- **Competency 8's orphan check found a page the character count could not see.** A page carrying only
  two ruled write-lines extracts as zero characters, so it registered as an empty page rather than as a
  spilled question; it was found by rendering the page to an image. This is the same hole in decision
  I5 recorded when competency 4 was built, and it is still open: the check counts extracted text, so a
  page of pure write-lines reads as empty and a stranded heading reads as fine.
- Competencies 9–13 are unassigned pending sources.
