---
name: ai-assisted-testing
description: Use when using AI to write or improve tests — test generation, property discovery, edge case fuzzing, regression test identification, and test maintenance
tags: [testing, ai, automation]
version: 1.0.0
---

# AI-Assisted Testing

## Domain Expertise

### Core Principles
- **AI generates tests; humans validate them** — AI is good at coverage and boilerplate. Humans are good at understanding intent and correctness.
- **Seed with good examples** — The AI writes better tests when given 2-3 manually written examples that demonstrate the expected testing style and depth.
- **Test the behavior, not the code** — AI that sees the implementation tends to test the implementation. Describe the API contract and expected behaviors, not the internal code.
- **AI for edge cases** — Humans think of the happy path. AI excels at boundary values, error states, and combinatorial explosions.

### Key Patterns

1. **Specification-First Test Generation** — Describe the function's contract and let AI generate the test suite.

```
Prompt: Write tests for a function `rateLimit(key, maxRequests, windowMs)`.
Contract:
  - Returns true if request is allowed, false if rate limited
  - Resets after windowMs milliseconds
  - Handles multiple keys independently
  - Returns remaining requests in header

The AI generates:
  - Happy path: within limit → allowed
  - Boundary: exactly at limit → allowed (last one)
  - Exceeded: one over limit → denied
  - Reset: wait windowMs → allowed again
  - Multiple keys: independent counters
  - Error: negative windowMs → throws
```

2. **Property Discovery from Tests** — Feed existing tests to AI and ask it to infer invariants, then generate property-based tests for those invariants.

```
Existing test: test("withdraw reduces balance by amount")
Inferred property: "balance - withdraw >= 0" → invariant: balance never negative
Generated property test: random withdrawals from random starting balances
```

3. **Edge Case Fuzzing** — AI generates combinatorial edge cases that humans rarely think of.

```
For a search function: empty query, null filters, special characters (SQL injection attempts),
unicode normalization, extremely long strings, HTML tags in query, negative pagination params.
```

4. **Regression Test Identification** — Given before/after code diff, AI identifies which behaviors changed and generates regression tests.

```
Diff: Changed sort algorithm from quicksort to mergesort
AI generates: test stable sort (equal elements preserve order), test empty array, test single element,
test already-sorted, test reverse-sorted, test duplicate values.
```

5. **Test Suite Quality Audit** — AI reviews existing test suite for coverage gaps, weak assertions, and untested error paths.

```
Findings:
  - UserService.updateEmail: no test for invalid email format
  - PaymentService.charge: no test for declined card
  - AuthService.login: no test for rate-limited account
  - All tests: no negative assertions (testing that things DON'T happen)
```

## Checklist

- [ ] AI-generated tests are reviewed by a human before merging
- [ ] Test generation prompt includes the contract, not the implementation
- [ ] Property-based invariant tests are generated for core business logic
- [ ] Edge case fuzzing covers: empty/null, boundaries, special chars, error paths
- [ ] Regression tests are generated for every behavior-change diff
- [ ] AI audit identifies coverage gaps in the existing test suite
- [ ] Generated tests follow the project's testing conventions and style
- [ ] Flaky AI-generated tests are detected (nondeterministic output, time-dependent)

## Common Pitfalls

- **Testing the implementation** — AI that sees the code writes tests that pass now but break on refactoring. Describe the contract instead.
- **Over-relying on AI assertions** — AI sometimes writes assertions that always pass (`expect(true).toBe(true)`). Review assertions carefully.
- **Hallucinated APIs** — AI may generate tests using methods that don't exist. Verify imports and API surfaces.
- **Not seeding the style** — AI generates tests in its default style, which may not match your project's conventions. Give examples first.
