---
name: api-design-rest-graphql
description: Use when designing or reviewing REST or GraphQL APIs — resource modeling, versioning, error handling, pagination, rate limiting, and documentation
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "backend", version: "1.0.0", author: "universal-skills" }
---

# API Design (REST & GraphQL)

## Domain Expertise

### Core Principles
- REST: Resources are nouns, actions are HTTP methods
- GraphQL: Query exactly what you need, nothing more
- Design for clients — the API contract is the product
- Version via headers or URL path; never break existing clients

### REST Patterns
1. **Resource Modeling** — `/users`, `/users/:id/orders`, not `/getUsers` or `/createOrder`
2. **Consistent Error Format** — RFC 7807 Problem Details: `{ type, title, status, detail, instance }`
3. **Cursor Pagination** — Use `cursor` params instead of `page`/`offset` for stable pagination
4. **Idempotency** — POST requests for creation accept an `Idempotency-Key` header

### GraphQL Patterns
1. **DataLoader** — Batch and cache database queries to solve N+1
2. **Persisted Queries** — Hash-pinned queries for production safety
3. **Rate Limiting** — Cost-based limiting (query depth + complexity score)

## Checklist

- [ ] Endpoints follow resource-oriented naming (REST) or logical schema (GraphQL)
- [ ] Error responses follow a consistent structure with machine-readable codes
- [ ] Pagination is implemented for list endpoints
- [ ] Breaking changes trigger a new API version
- [ ] Authentication and authorization are documented and enforced

## Common Pitfalls

- **Over-fetching (REST)** — Returning full objects when clients need subsets
- **Under-fetching (REST)** — Requiring multiple round-trips for a single view
- **Deeply nested queries (GraphQL)** — No depth limiting leads to performance bombs
- **Inconsistent error shapes** — Different endpoints returning different error formats

## References

- Google: API Design Guide
- GraphQL: Best practices
- RFC 7807: Problem Details for HTTP APIs
