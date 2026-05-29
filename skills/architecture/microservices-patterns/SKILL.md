---
name: microservices-patterns
description: Use when designing or refactoring microservices — service boundaries, inter-service communication, API gateways, service discovery, circuit breakers, and observability
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "architecture", version: "1.0.0", author: "universal-skills" }
---

# Microservices Patterns

## Domain Expertise

### Core Principles
- **Bounded contexts** — Services own their data and domain logic; no shared databases
- **Communicate via APIs** — Synchronous (HTTP/gRPC) or asynchronous (events/messages)
- **Design for failure** — Circuit breakers, retries, timeouts, bulkheads, and fallbacks
- **Observability is mandatory** — Distributed tracing, structured logging, and metrics per service

### Key Patterns
1. **API Gateway** — Single entry point for clients; handles auth, rate limiting, routing, aggregation. Use a dedicated gateway service (Kong, Envoy, AWS API Gateway).
2. **Circuit Breaker** — Wrap external calls. After N failures, open the circuit and fail fast. Periodically let a request through (half-open) to test recovery.
3. **Saga Pattern** — Distributed transaction via a sequence of local transactions. Choreography (each service publishes events) or Orchestration (central coordinator).
4. **Strangler Fig** — Incrementally replace a monolith by routing specific endpoints to new services. Keep both running until migration is complete.

## Checklist

- [ ] Service boundaries align with business domains (not technical layers)
- [ ] No shared databases between services
- [ ] Circuit breakers and retries with exponential backoff are configured for inter-service calls
- [ ] Distributed tracing is implemented across all services
- [ ] Each service has its own CI/CD pipeline and deployment
- [ ] API versioning strategy is defined and enforced

## Common Pitfalls

- **Distributed monolith** — Services share databases or have tight coupling
- **Chatty communication** — Too many synchronous calls between services adds latency
- **No saga / eventual consistency** — Assuming immediate consistency across services
- **Skipping the strangler** — Trying to rewrite the monolith from scratch instead of incremental migration

## References

- Sam Newman: Building Microservices
- Chris Richardson: Microservices Patterns
- Martin Fowler: Strangler Fig pattern
