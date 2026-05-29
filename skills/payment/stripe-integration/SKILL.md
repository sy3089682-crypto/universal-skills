---
name: stripe-integration
description: Use when integrating Stripe payments — Checkout Sessions, PaymentIntents, webhooks, idempotency, subscription lifecycle, and error handling
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "payment", version: "1.0.0", author: "universal-skills" }
---

# Stripe Integration

## Domain Expertise

### Core Principles
- **Server-side logic** — Never trust the client; all price calculation and payment orchestration happens on the server
- **Idempotent requests** — Use `Idempotency-Key` header for retry safety
- **Webhooks for state changes** — Don't poll; listen for `checkout.session.completed`, `invoice.paid`, etc.
- **Test mode first** — Always develop with test keys before switching to live

### Key Patterns
1. **Checkout Sessions** — Simplest integration for one-time and subscription payments. Stripe hosts the payment page; redirect back on completion.
2. **PaymentIntents + Elements** — More control — embed payment UI in your app. Requires handling SCA (Strong Customer Authentication).
3. **Webhook Verification** — Verify webhook signatures with `stripe-webhook-signature`. Process webhooks idempotently (dedup by Stripe event ID).
4. **Subscription Lifecycle** — Create → Invoice → Collect → Succeed/Fail. Handle `invoice.payment_failed` with email reminders and dunning.

## Checklist

- [ ] All Stripe API calls happen server-side (never expose secret key to client)
- [ ] Idempotency keys are used for all mutating API calls
- [ ] Webhook endpoint verifies signatures before processing
- [ ] Subscription payment failures trigger a dunning process (retries + customer email)
- [ ] Test mode is used during development; live has restricted API keys
- [ ] Webhook handlers are idempotent (store processed event IDs)

## Common Pitfalls

- **No webhook signature verification** — Anyone can send fake events to your endpoint
- **Assuming payment success from client redirect** — Verify via webhook, not the return URL
- **Hardcoded price IDs** — Price IDs differ between test and live mode; use environment-specific config
- **Not handling `payment_intent.requires_action`** — SCA requires additional authentication step

## References

- Stripe: Integration checklist
- Stripe: Webhooks best practices
- Stripe: Subscription lifecycle
