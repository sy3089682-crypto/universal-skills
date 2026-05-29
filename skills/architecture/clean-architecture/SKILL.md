---
name: clean-architecture
description: Use when structuring application code — dependency rule, use cases, interface adapters, layers, and dependency injection. Works with any language/framework
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "architecture", version: "1.0.0", author: "universal-skills" }
---

# Clean Architecture

## Domain Expertise

### Core Principles
- **Dependency Rule** — Source code dependencies point inward; nothing in an inner circle knows about outer circles
- **Abstractions over implementations** — Inner layers define interfaces; outer layers implement them
- **Use cases are the center** — Application-specific business rules, not framework concerns
- **Frameworks are plugins** — The framework is a delivery mechanism, not the core of the application

### Key Layers (inner to outer)
1. **Entities** — Enterprise-wide business rules and data structures. Framework-agnostic, testable in isolation.
2. **Use Cases** — Application-specific business rules. Orchestrate entities and define ports (interfaces) for external communication.
3. **Interface Adapters** — Convert data between use-case format and external format. Controllers, presenters, gateways.
4. **Frameworks & Drivers** — DB, web framework, UI, external APIs. Concrete implementations of the adapter interfaces.

## Checklist

- [ ] Dependency rule is enforced — inner layers have no imports from outer layers
- [ ] Use cases are testable without a database, web server, or framework
- [ ] Entities have no framework annotations, base classes, or imports
- [ ] Dependency injection wires concrete implementations at the composition root
- [ ] Business logic is not in controllers, presenters, or gateways

## Common Pitfalls

- **Framework coupling** — Using framework annotations/imports deep in business logic
- **Skipping use cases** — Putting orchestration logic in controllers or gateways instead of dedicated use case classes
- **Leaking DB types to the domain** — ORM entities mixed with domain entities
- **Creating getters/setters for all fields** — Domain objects should enforce invariants, not be data containers

## References

- Robert C. Martin: Clean Architecture (book)
- Uncle Bob: The Clean Architecture (blog)
- Khalil Stemmler: Clean Architecture in TypeScript
