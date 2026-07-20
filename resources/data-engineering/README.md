# Data Engineering — Resources

Collaborative resource list for the data engineering learning track. Add books, papers, and references here as new study materials are brought in.

---

## Books

### Designing Data-Intensive Applications (DDIA), 2nd Edition
- **Authors:** Martin Kleppmann, Chris Riccomini
- **Publisher:** O'Reilly Media (February 2026)
- **ISBN:** 978-1-098-11906-5
- **File:** `Designing-Data-Intensive-Applications-Second-Edition-Sixth-Early-Release-Martin-Kleppmann-Chris-Riccomini.pdf` (attached in session)
- **Scope:** Full 2nd edition (early release) — covers architecture trade-offs, nonfunctional requirements, storage engines, replication, partitioning, transactions, distributed systems, stream/batch processing, and ethics/law.
- **Role fit:** AI Product Manager — architectural fluency for PRDs, vendor decisions, and engineering collaboration. Prioritized around agentic workflows, data platforms, and distributed systems.
- **Study plan (22 chunks across 13 chapters):**

| # | Chunk | Chapter | Priority | Rationale |
|---|-------|---------|----------|-----------|
| 1 | Ch 1 Part 1 | Trade-offs in Data Systems Architecture | 🔴 Core | OLTP/OLAP split, data warehouse vs lake — vocabulary for PRDs |
| 2 | Ch 1 Part 2 | Trade-offs in Data Systems Architecture | 🔴 Core | Cloud vs self-host, distributed vs single-node, microservices/serverless |
| 3 | Ch 2 Part 1 | Defining Nonfunctional Requirements | 🔴 Core | Latency, percentiles, reliability — how to spec system behavior |
| 4 | Ch 2 Part 2 | Defining Nonfunctional Requirements | 🔴 Core | Scalability, maintainability, evolvability |
| 5 | Ch 3 Part 1 | Data Models & Query Languages | 🔴 Core | Relational vs document vs graph — choosing data stores for your platform |
| 6 | Ch 3 Part 2 | Data Models & Query Languages | 🔴 Core | Event sourcing, dataframes, SQL vs NoSQL trade-offs |
| 7 | Ch 4 Part 1 | Storage & Retrieval | 🟡 Important | LSM trees, B-trees — why Postgres vs Cassandra vs ClickHouse differ |
| 8 | Ch 4 Part 2 | Storage & Retrieval | 🟡 Important | Columnar storage, OLAP engines, vector databases |
| 9 | Ch 5 | Encoding & Evolution | 🟡 Important | Avro/Parquet/Protobuf, schema evolution — directly relevant to pipelines |
| 10 | Ch 6 Part 1 | Replication | 🔴 Core | Leader/follower, replication lag — reliable reads for agentic workflows |
| 11 | Ch 6 Part 2 | Replication | 🔴 Core | Multi-leader, leaderless, consistency trade-offs |
| 12 | Ch 7 | Partitioning | 🟡 Important | Sharding strategies — data platform scaling conversations |
| 13 | Ch 8 Part 1 | Transactions | 🔴 Core | ACID, isolation levels — the foundation under Temporal |
| 14 | Ch 8 Part 2 | Transactions | 🔴 Core | Serializability, 2PL, SSI — why Temporal handles retries and idempotency |
| 15 | Ch 9 Part 1 | The Trouble with Distributed Systems | 🔴 Core | Network faults, unreliable clocks — the why behind Temporal's design |
| 16 | Ch 9 Part 2 | The Trouble with Distributed Systems | 🔴 Core | Process pauses, Byzantine faults, partial failures |
| 17 | Ch 10 Part 1 | Consistency & Consensus | 🔴 Core | Linearizability, CAP theorem |
| 18 | Ch 10 Part 2 | Consistency & Consensus | 🔴 Core | Raft, ZooKeeper, distributed transactions |
| 19 | Ch 11 | Batch Processing | 🟢 Awareness | MapReduce, Spark, Flink — enough to speak to data engineers |
| 20 | Ch 12 Part 1 | Stream Processing | 🔴 Core | Kafka, event streams — directly relevant to your data platform product |
| 21 | Ch 12 Part 2 | Stream Processing | 🔴 Core | Exactly-once semantics, stream joins, stateful processing |
| 22 | Ch 13 | Doing the Right Thing | 🟡 Important | GDPR, data minimization, bias — PM-level responsibility |

- **Status:** 🟡 In progress — Chunk 1 (Ch 1 Part 1) active

---

## Papers & Reports

_To be added as study sessions progress._

---

## How to add a resource

1. Add an entry under the appropriate section (Books / Papers / Reports).
2. Include: title, authors, year, a one-line scope note, and status (🔴 not started / 🟡 in progress / 🟢 complete).
3. Commit with message format: `add: <short resource name> under data-engineering`.
