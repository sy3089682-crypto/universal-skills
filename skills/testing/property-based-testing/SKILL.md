---
name: property-based-testing
description: Use when writing property-based tests — invariant testing, stateful testing, shrinking, generators, and integration with QuickCheck/JSVerify/FastCheck
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "testing", version: "1.0.0", author: "universal-skills" }
---

# Property-Based Testing

## Domain Expertise

### Core Principles
- **Test properties, not examples** — Instead of specific inputs, define invariants that should always hold
- **Let the computer find edge cases** — Randomly generated inputs often find cases you never thought of
- **Shrinking is essential** — When a test fails, shrink the input to the minimal failing case
- **Deterministic by default** — Use a seed to reproduce failures

### Key Patterns
1. **Invariant Testing** — Define properties: idempotency, round-trip (serialize → deserialize → match), associativity, commutativity
2. **Stateful Testing** — Define operations and state transitions; the framework generates valid sequences and verifies state invariants after each step
3. **Custom Generators** — Create generators for domain types (e.g., valid email, UUID, positive integer, non-empty string). Compose simple generators into complex ones.
4. **Integration with Example Tests** — Use property tests alongside example tests. Examples cover known edge cases; properties find unknown ones.

## Checklist

- [ ] Properties are defined as invariants, not specific example values
- [ ] Custom generators exist for domain types (not just primitives)
- [ ] Shrinking produces the minimal failing input
- [ ] Test runs are deterministic (seed is logged or reproducible)
- [ ] Stateful testing is used for complex state machines
- [ ] Property tests are part of CI with sufficient iterations (100+ per run)

## Common Pitfalls

- **Testing too-generic properties** — `result.length >= 0` will never fail but adds no value
- **Not testing side effects** — Pure function testing is straightforward; stateful effects require more setup
- **Ignoring shrunk output** — The shrunk input tells you exactly what went wrong; inspect it carefully
- **Too few iterations** — 1000 iterations per property test gives reasonable confidence

## References

- F# for Fun and Profit: Property-based testing
- FastCheck: Documentation
- Hypothesis: Property-based testing in Python
