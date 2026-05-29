---
name: unit-testing-patterns
description: Use when writing unit tests — test structure (AAA), mocking, dependency injection, edge cases, code coverage, and naming conventions
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "testing", version: "1.0.0", author: "universal-skills" }
---

# Unit Testing Patterns

## Domain Expertise

### Core Principles
- **Test behavior, not implementation** — What a function does, not how it does it
- **One logical assertion per test** — Multiple assertions about the same behavior are fine
- **Fast and deterministic** — No network, no filesystem, no I/O in unit tests
- **Tests are documentation** — A well-named test describes the expected behavior

### Key Patterns
1. **AAA Pattern** — Arrange (setup), Act (invoke), Assert (verify). Clear visual separation.
2. **Mocking External Dependencies** — Mock at the boundary (HTTP client, DB repository), not internals. Use interfaces for injectability.
3. **Table-Driven Tests** — Array of input/expected pairs; loop and assert. Reduces boilerplate for multiple cases.
4. **Edge Case Testing** — Empty/null/undefined inputs, boundary values, error paths, unusual orderings
5. **Coverage-Guided Discovery** — Write tests for uncovered branches; don't chase 100% line coverage blindly

## Checklist

- [ ] Tests follow AAA structure with clear sections
- [ ] Every public function has tests for happy path, error path, and edge cases
- [ ] Mocks are at the boundary (not mocking internals of the system under test)
- [ ] Test names describe the scenario and expected outcome
- [ ] Tests are fast (< 100ms per test) and deterministic
- [ ] No test depends on another test or shared mutable state

## Common Pitfalls

- **Testing implementation instead of behavior** — Refactoring breaks the test even though behavior is unchanged
- **Over-mocking** — Mocking too many dependencies makes tests brittle and hard to understand
- **Testing only the happy path** — Error handling and edge cases are where bugs hide
- **Flaky tests from shared state** — Static variables, global state, or shared fixtures cause intermittent failures

## References

- Martin Fowler: Unit Testing
- Kent Beck: Test-Driven Development
- xUnit: Test patterns
