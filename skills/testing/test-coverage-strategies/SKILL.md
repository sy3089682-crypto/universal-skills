---
name: test-coverage-strategies
description: Use when defining test coverage strategy — risk-based testing, coverage thresholds, mutation testing, and balancing speed vs coverage across unit/integration/e2e
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "testing", version: "1.0.0", author: "universal-skills" }
---

# Test Coverage Strategies

## Domain Expertise

### Core Principles
- **Coverage is a signal, not a goal** — 100% coverage doesn't mean 100% bug-free
- **Test risk, not lines** — Prioritize critical paths, security boundaries, and complex logic
- **Pyramid over ice-cream cone** — Many unit tests, some integration tests, few E2E tests
- **Mutation testing > line coverage** — Can your tests detect actual code mutations?

### Key Patterns
1. **Test Pyramid** — 70% unit tests (fast, isolated), 20% integration (real dependencies), 10% E2E (full system)
2. **Coverage Thresholds** — Set per-module thresholds in CI. New code must meet thresholds; legacy code is exempted with a `coverage-exempt` comment.
3. **Risk-Based Coverage** — Map risk areas (auth, payments, data export) and ensure high coverage there. Accept lower coverage for administrative UIs.
4. **Mutation Testing** — Tools like Stryker mutate your code and check if tests catch the change. Aim for >80% mutation score on critical modules.

## Checklist

- [ ] Code coverage thresholds are configured in CI (line, branch, function)
- [ ] Critical modules (auth, payment, security) have >= 90% branch coverage
- [ ] Test types follow the pyramid ratio (mostly unit, some integration, few E2E)
- [ ] Coverage reports are generated and visible in PRs
- [ ] Legacy code has documented coverage exemptions
- [ ] Mutation testing is considered for critical paths

## Common Pitfalls

- **Gaming line coverage** — Writing tests that execute code but don't assert anything
- **Ignoring branch coverage** — Line coverage hides untested conditional branches
- **100% coverage as a blocker** — Leads to shallow tests rather than meaningful ones
- **No coverage for new code** — Without enforcement, coverage degrades over time

## References

- Martin Fowler: Test Coverage
- Stryker: Mutation testing
- Google: Testing at scale
