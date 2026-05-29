---
name: etl-pipeline-design
description: Use when designing ETL or data pipelines — batch vs streaming, incremental loads, schema evolution, data quality checks, and pipeline monitoring
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "data", version: "1.0.0", author: "universal-skills" }
---

# ETL Pipeline Design

## Domain Expertise

### Core Principles
- **Idempotent runs** — Re-running a pipeline produces the same result as the first run
- **Incremental over full loads** — Process only changed data since the last run
- **Schema evolution** — Source schemas change; pipelines must handle new fields gracefully
- **Observable pipelines** — Every run produces metrics: row count, duration, error rate, data quality score

### Key Patterns
1. **Incremental Load** — Track `updated_at` timestamp or use CDC (Change Data Capture). Process records where `updated_at > last_run`.
2. **Schema Registry** — Avro/Protobuf schemas with compatibility checks. New fields are optional; removing fields requires a new schema version.
3. **Data Quality Checks** — Row-level (null checks, type validation, uniqueness), table-level (row count thresholds, referential integrity).
4. **Monitor and Alert** — Track record counts, data freshness, pipeline duration. Alert on zero records (stalled pipeline) or unusually high counts (duplicates).

## Checklist

- [ ] Pipeline is idempotent — re-running produces the same data
- [ ] Incremental loads use a reliable watermark (timestamp, offset, or sequence ID)
- [ ] Schema changes are handled without breaking existing pipelines
- [ ] Data quality checks run after each stage of the pipeline
- [ ] Metrics are emitted for every run (rows processed, duration, error count)
- [ ] Alert on stalled pipelines (no new data within expected interval)

## Common Pitfalls

- **Full reload every time** — Works for small data; fails at scale
- **Schema drift ignored** — New columns in source cause pipeline errors or silent data loss
- **No backfill capability** — When a bug is fixed, you need to reprocess historical data
- **Silent failures** — A failed step that completes with 0 rows looks like success without data quality checks

## References

- Martin Kleppmann: Designing Data-Intensive Applications
- Apache Airflow: Best practices
- dbt: Data quality patterns
