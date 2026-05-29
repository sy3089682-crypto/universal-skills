---
name: integration-testing
description: Use when writing integration tests — database testing, API contract tests, service-level testing, testcontainers, and test fixtures
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "testing", version: "1.0.0", author: "universal-skills" }
---

# Integration Testing

## Domain Expertise

### Core Principles
- **Test real interactions** — Hit the database, call the API, read the message queue
- **Isolate test data** — Each test suite gets its own database or schema; parallel-safe
- **Testcontainers for dependencies** — Spin up Postgres/Redis/Kafka in containers for CI
- **Faster than E2E, more realistic than unit** — Integration tests balance speed and fidelity

### Key Patterns
1. **Database Testing** — Use a test database (or in-memory SQLite). Roll back transactions after each test. Seed minimal data.
2. **API Contract Tests** — Verify request/response schemas, status codes, error shapes. Use OpenAPI/Swagger as the source of truth.
3. **Testcontainers** — Programmatic containers for CI; `GenericContainer` for custom deps; `PostgreSQLContainer` for DB tests
4. **Fixture Factories** — Build test data with factories (FactoryBot, Faker). Only specify fields relevant to the test.

## Checklist

- [ ] Integration tests use real dependencies (Testcontainers or test instances)
- [ ] Database state is isolated per test or per suite
- [ ] Tests clean up after themselves (transaction rollback, truncation)
- [ ] API contract tests validate all endpoints (success + error)
- [ ] Fixtures are minimal — only the data needed for the test case

## Common Pitfalls

- **Using mocks in integration tests** — If it's mocked, it's a unit test, not integration
- **Shared mutable database** — Tests that don't clean up cause cascading failures
- **Slow tests from heavy fixtures** — Keep fixture data minimal; only seed what the test needs
- **Not testing error responses** — Verify 4xx/5xx responses have the expected body and status code

## References

- Testcontainers: Documentation
- Martin Fowler: Integration Test
- Pact: Consumer-driven contract testing
