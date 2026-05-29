---
name: message-queue-patterns
description: Use when designing or debugging message-driven systems — RabbitMQ, Kafka, SQS, event sourcing, CQRS, at-least-once delivery, dead letter queues
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "backend", version: "1.0.0", author: "universal-skills" }
---

# Message Queue Patterns

## Domain Expertise

### Core Principles
- **Decouple producers from consumers** — Producers don't wait on consumers
- **Idempotent consumers** — Processing the same message twice must be safe
- **Design for failure** — Messages may be lost, delayed, or duplicated
- **Ordering guarantees are expensive** — Only enforce ordering where strictly needed

### Key Patterns
1. **At-Least-Once Delivery** — Consumer acknowledges after processing. Duplicates possible; idempotency required.
2. **Dead Letter Queue** — Failed messages after N retries go to a DLQ for manual inspection
3. **Event Sourcing** — Store all state changes as an immutable event log; rebuild state by replaying
4. **CQRS** — Separate read models (queries) from write models (commands), connected via events
5. **Competing Consumers** — Multiple consumers read from the same queue for horizontal scaling

## Checklist

- [ ] Consumers are idempotent (message ID dedup or upsert semantics)
- [ ] Dead letter queue is configured with alerts
- [ ] Message schema has a version field for evolution
- [ ] Backpressure handling is implemented (circuit breaker, throttling)
- [ ] Message ordering is only enforced where business logic requires it

## Common Pitfalls

- **Assuming in-order delivery** — Unless using a partition key with Kafka, assume out-of-order
- **No DLQ monitoring** — Failed messages silently accumulate
- **Tight coupling to queue implementation** — Abstract behind an interface for testing

## References

- Kafka: Exactly-once semantics
- AWS: SQS best practices
- Martin Fowler: Event Sourcing
