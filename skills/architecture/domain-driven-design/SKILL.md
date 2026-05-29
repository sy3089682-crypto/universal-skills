---
name: domain-driven-design
description: Use when modeling complex business domains — ubiquitous language, bounded contexts, aggregates, entities vs value objects, domain events, and repositories
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "architecture", version: "1.0.0", author: "universal-skills" }
---

# Domain-Driven Design

## Domain Expertise

### Core Principles
- **Ubiquitous Language** — Code, docs, and conversations use the same domain terms
- **Bounded Context** — Explicit boundaries around each domain model; models may differ between contexts
- **Aggregates** — Consistency boundary; one aggregate per transaction; reference other aggregates by ID
- **Entities vs Value Objects** — Entities have identity; Value Objects are defined by their attributes

### Key Patterns
1. **Entity** — Object with a thread of identity (e.g., `User { id, name, email }`). Equality by ID, not fields.
2. **Value Object** — Immutable object defined by its attributes (e.g., `Money { amount, currency }`). Equality by all fields.
3. **Aggregate** — Cluster of domain objects treated as a unit. Root entity enforces invariants. External access only through the root.
4. **Domain Event** — Something meaningful that happened in the domain (e.g., `OrderPlaced`). Past tense, immutable, published to other contexts.
5. **Repository** — Collection-like abstraction for aggregate persistence. One per aggregate root.

## Checklist

- [ ] Ubiquitous language is documented and used in code, tests, and conversations
- [ ] Bounded contexts have explicit interfaces (API contracts, event schemas)
- [ ] Aggregates are consistency boundaries — one aggregate modified per transaction
- [ ] Entities and Value Objects are correctly classified
- [ ] Domain events are named in past tense and include a timestamp + aggregate ID
- [ ] Repositories exist only for aggregate roots

## Common Pitfalls

- **Anemic domain model** — Services contain all logic; domain objects are just data bags
- **Giant aggregates** — Including too many entities in a single aggregate hurts performance
- **Cross-context coupling** — One context reaching into another's database or internals
- **Infrastructure leak** — Domain layer depending on ORM, HTTP, or message broker types

## References

- Eric Evans: Domain-Driven Design (Blue Book)
- Vaughn Vernon: Implementing Domain-Driven Design (Red Book)
- Martin Fowler: DDD patterns
