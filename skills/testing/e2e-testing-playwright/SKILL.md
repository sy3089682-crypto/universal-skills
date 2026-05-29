---
name: e2e-testing-playwright
description: Use when writing or debugging end-to-end tests with Playwright — selectors, fixtures, Page Object Model, CI integration, visual regression, and flakiness prevention
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "testing", version: "1.0.0", author: "universal-skills" }
---

# E2E Testing (Playwright)

## Domain Expertise

### Core Principles
- **Test user journeys, not implementation** — What the user sees and does, not internal state
- **Stable selectors** — Prefer `getByRole`, `getByText`, `getByTestId` over CSS/XPath
- **Auto-waiting** — Playwright waits for elements by default; avoid manual `waitForTimeout`
- **Isolated tests** — Each test has its own state; no shared fixtures

### Key Patterns
1. **Page Object Model** — Encapsulate page interactions in classes. Locators defined once, reused in tests.
2. **Fixtures** — Use `test.beforeEach` for setup (login, seed data). Use `test.use` for context options.
3. **API Mocking** — `page.route()` for backend responses; test frontend in isolation
4. **Visual Regression** — `await expect(page).toHaveScreenshot()` with per-browser snapshots
5. **Parallel Execution** — Playwright runs tests in parallel by worker. Tests must not share state.

## Checklist

- [ ] Selectors use `getByRole`, `getByTestId`, or `getByText` (never CSS/XPath)
- [ ] No `waitForTimeout` — use `waitForSelector`, `waitForResponse`, or `waitForURL`
- [ ] Tests are isolated — no test depends on another's state
- [ ] API mocking for external services to avoid flakiness
- [ ] Visual snapshots are reviewed on every change
- [ ] Tests pass in CI with 3+ retries for known flaky tests

## Common Pitfalls

- **Flaky timeouts** — Replace hard waits with `waitForSelector` or `waitForResponse`
- **Sharing state between tests** — Use `test.describe.serial` only when absolutely necessary
- **Testing implementation details** — CSS classes or internal state changes cause false failures
- **Missing await** — An unawaited Playwright assertion passes silently

## References

- Playwright: Best practices
- Playwright: Selectors guide
- Playwright: CI configuration
