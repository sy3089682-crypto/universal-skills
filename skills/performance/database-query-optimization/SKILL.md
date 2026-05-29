---
name: database-query-optimization
description: Use when debugging slow database queries — EXPLAIN ANALYZE, index analysis, query rewriting, connection pooling, N+1 detection, and read replicas
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "performance", version: "1.0.0", author: "universal-skills" }
---

# Database Query Optimization

## Domain Expertise

### Core Principles
- **EXPLAIN ANALYZE before changing anything** — Understand the actual query plan, not the guessed one
- **Index for your queries** — Analyze slow queries, then create targeted indexes; don't index proactively
- **N+1 is the most common perf bug** — Detect it with database query logging or ORM tooling
- **Reduce data transfer** — Only SELECT the columns you need; paginate large result sets

### Key Patterns
1. **EXPLAIN ANALYZE** — Read the output: seq scan vs index scan, actual rows vs estimated rows, join type, sort method. Focus on high-cost nodes.
2. **Composite Indexes** — Column order matters: equality columns first, range columns last. Covering indexes with INCLUDE for extra columns.
3. **Batch Operations** — INSERT/UPDATE in batches of 100-1000. Use `unnest` for bulk operations in PostgreSQL.
4. **Read Replicas** — Route read-only queries (reports, analytics, dashboards) to read replicas. ORM tools often support this natively.

## Checklist

- [ ] Slow query is identified and captured with `EXPLAIN ANALYZE`
- [ ] Proper index exists for the query (check with `EXPLAIN` before and after)
- [ ] N+1 queries are eliminated (eager loading or batching)
- [ ] Only needed columns are SELECTed (no `SELECT *`)
- [ ] Pagination uses cursor-based (keyset) pagination for large datasets
- [ ] Connection pool size is tuned for the workload

## Common Pitfalls

- **Creating indexes without testing** — An index that's never used still slows writes
- **N+1 in ORM** — Active Record / Sequelize / Prisma can silently issue hundreds of queries
- **Missing `LIMIT`** — A query that returns 1M rows when you only need 100
- **Sequential scans on large tables** — Missing index or wrong query structure

## References

- PostgreSQL: Using EXPLAIN
- Use the Index, Luke — The art of SQL indexing
- pganalyze: Query optimization
