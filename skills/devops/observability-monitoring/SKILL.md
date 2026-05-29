---
name: observability-monitoring
description: Use when implementing observability — structured logging, metrics (Prometheus), distributed tracing (OpenTelemetry), dashboards, alerts, and SLI/SLO tracking
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "devops", version: "1.0.0", author: "universal-skills" }
---

# Observability & Monitoring

## Domain Expertise

### Core Principles
- **Three pillars** — Logs (events), Metrics (aggregations), Traces (request lifecycle)
- **Correlation** — Every log line and trace includes a request ID for correlation
- **Alert on symptoms, not causes** — High error rate is a symptom; disk full is a cause
- **SLOs drive action** — Burn rate alerts on SLO violation, not static thresholds

### Key Patterns
1. **Structured Logging** — JSON format with consistent fields: `timestamp`, `level`, `service`, `trace_id`, `message`, `error`. No string interpolation.
2. **RED Metrics** — Rate (requests/sec), Errors (failed requests/sec), Duration (latency distribution)
3. **OpenTelemetry Tracing** — Auto-instrumentation for HTTP, gRPC, DB calls. Add manual spans for business logic.
4. **Alert Fatigue Prevention** — Silence noisy alerts; route critical alerts to PagerDuty/OpsGenie; use burn-rate alerts on SLOs
5. **Dashboards** — Start with a system dashboard (CPU, memory, disk, network per service); then business metrics dashboards

## Checklist

- [ ] All services emit structured logs with trace IDs
- [ ] RED metrics are collected for every HTTP/gRPC endpoint
- [ ] Distributed tracing is implemented across service boundaries
- [ ] SLOs are defined and monitored (latency, availability, correctness)
- [ ] Alert rules are tested (canary alerts, silence during maintenance)
- [ ] Dashboard exists for every service with at least RED metrics

## Common Pitfalls

- **Logging sensitive data** — Strip PII, tokens, and secrets from logs
- **Too many alerts** — Every alert should trigger a specific, documented action
- **No sampling** — Trace every request in low-traffic; sample in high-traffic services
- **Metrics without labels** — Aggregated metrics hide per-endpoint issues

## References

- OpenTelemetry: Documentation
- Prometheus: Best practices
- Google SRE: Monitoring distributed systems
