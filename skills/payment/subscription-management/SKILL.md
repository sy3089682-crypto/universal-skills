---
name: subscription-management
description: Use when building subscriptions — pricing tiers, plan switching, proration, trial periods, dunning, churn prevention, and metered billing
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "payment", version: "1.0.0", author: "universal-skills" }
---

# Subscription Management

## Domain Expertise

### Core Principles
- **Clear pricing model** — Flat, per-seat, tiered, or usage-based. Communicate to customers transparently.
- **Proration is expected** — When customers change plans, calculate fair prorated charges.
- **Dunning before cancellation** — Retry failed payments for 3-7 days before canceling.
- **Self-serve plan changes** — Let customers upgrade, downgrade, and cancel without talking to support.

### Key Patterns
1. **Plan Tiers** — Free (limited features) → Pro (full features, limits raised) → Enterprise (custom). Each tier has clear feature boundaries.
2. **Proration** — When upgrading, charge the difference (prorated). When downgrading, issue credit. Stripe handles this automatically with `proration_behavior`.
3. **Dunning** — On payment failure: Day 1 → email, Day 3 → email + SMS, Day 7 → final notice. Cancel on day 14 if unpaid.
4. **Metered Billing** — Track usage with Stripe `UsageRecord`. Bill at the end of the period. Requires `metered` price type.

## Checklist

- [ ] Plan changes calculate proration correctly (upgrade charge, downgrade credit)
- [ ] Dunning process is configured with multiple retry attempts
- [ ] Subscription cancellation handles data retention policies
- [ ] Trial periods are tracked and converted to paid automatically
- [ ] Usage-based billing has usage reporting and rate limiting
- [ ] Customer portal is available for self-serve changes

## Common Pitfalls

- **No dunning** — A failed payment immediately cancels the subscription without retrying
- **Hardcoded plan limits** — Feature limits should come from the plan definition, not hardcoded
- **Ignoring tax requirements** — Stripe Tax or third-party tax calculation for global sales
- **No grace period** — Downgrading immediately removes access; grant access through the billing period

## References

- Stripe: Billing best practices
- ProfitWell: Subscription metrics
- ChartMogul: Recurring revenue management
