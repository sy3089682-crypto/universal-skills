---
name: database-schema-optimization
description: Use when designing or optimizing database schemas — normalization, indexing strategy, query planning, denormalization trade-offs, migration patterns, and connection pooling
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "data", version: "1.0.0", author: "universal-skills" }
---

# Database Schema Optimization

## Domain Expertise

### Core Principles
- **Model the data, not the queries** — A clean schema handles many query patterns
- **Index with intent** — Every index should serve a specific query pattern
- **Normalize for consistency, denormalize for performance** — Know the trade-off
- **Plan migrations carefully** — Zero-downtime migrations require expand-migrate-contract

### Key Patterns
1. **Indexing Strategy** — B-tree for range queries, Hash for equality lookups, GIN/GiST for full-text/array, BRIN for time-series
2. **Partial Indexes** — Index only the rows that matter (e.g., `WHERE status = 'active'`)
3. **Covering Indexes** — Include all columns a query needs to avoid table lookups (INCLUDE clause)
4. **Connection Pooling** — PgBouncer (transaction mode) or built-in poolers. Keep pool size <= (2 * CPU cores) + disk spindles
5. **Zero-Downtime Migration** — Expand (add column/table) → Migrate (backfill) → Contract (drop old)

## Checklist

- [ ] Every query has an `EXPLAIN ANALYZE` plan checked before production
- [ ] Indexes exist for all WHERE/ORDER BY/JOIN columns used in hot paths
- [ ] No sequential scans on tables larger than 10k rows (in hot paths)
- [ ] Migration strategy supports rollback
- [ ] Connection pool size is tuned (not using defaults blindly)
- [ ] Data types are appropriate (TIMESTAMPTZ over TEXT for dates, UUID over auto-increment for distributed)

## Common Pitfalls

- **Over-indexing** — Each index slows writes; benchmark before adding
- **SELECT *** — Fetching columns you don't need wastes memory and I/O
- **Missing foreign keys** — Referential integrity at app level drifts over time
- **N+1 queries in ORM** — Use eager loading or batch loading (DataLoader)

## References

- PostgreSQL: Indexing documentation
- Use the Index, Luke! — SQL indexing guide
- Postgres.ai: Query optimization
