---
name: event-driven-architecture
description: Use when designing event-driven systems — event sourcing, CQRS, pub/sub, event schemas, at-least-once delivery, idempotency, and event versioning
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "architecture", version: "1.0.0", author: "universal-skills" }
---

# Event-Driven Architecture

## Domain Expertise

### Core Principles
- **Events are facts** — They happened, they cannot be changed, only corrected
- **Eventual consistency** — Systems converge over time; don't expect immediate consistency
- **Idempotent consumers** — Processing the same event twice must produce the same result
- **Schema evolution** — Events live longer than services; plan for backward compatibility

### Key Patterns
1. **Event Sourcing** — Store state changes as an append-only event log. Current state = fold over all events. Enables audit trail, time travel, and complete history.
2. **CQRS** — Separate command model (writes) from query model (reads). Commands validate and emit events; queries read from optimized projections.
3. **Pub/Sub** — Publishers emit events without knowing consumers. Decouples services; new consumers can subscribe without publisher changes.
4. **Dead Letter Queue** — Events that fail processing after N retries are moved to a DLQ for manual inspection and replay.

## Checklist

- [ ] Event schema includes `id`, `type`, `version`, `timestamp`, `data`, and `metadata`
- [ ] Consumers are idempotent (dedup by event ID)
- [ ] Event versioning strategy is defined (schema registry or compatible evolution)
- [ ] Dead letter queue exists with monitoring alerts
- [ ] Replay capability is built in (reprocess events from a point in time)
- [ ] Event ordering guarantees are documented and understood

## Common Pitfalls

- **Command-Query coupling** — Using the same model for reads and writes in an event-driven system eliminates the benefits
- **Tight event schemas** — Consumers that require every event field break when schemas evolve
- **Assuming causality** — Events from different sources arrive in unpredictable order
- **No DLQ monitoring** — Events silently fail and data drift goes unnoticed

## References

- Martin Fowler: Event Sourcing
- Confluent: Event-driven architecture patterns
- AWS: Event-driven architecture guide
