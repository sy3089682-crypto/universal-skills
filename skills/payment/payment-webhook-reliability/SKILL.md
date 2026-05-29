---
name: payment-webhook-reliability
description: Use when handling payment webhooks — idempotency, verification, retries, idempotency replay, monitoring, and reconciliation
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "payment", version: "1.0.0", author: "universal-skills" }
---

# Payment Webhook Reliability

## Domain Expertise

### Core Principles
- **Verify before processing** — Always verify webhook signatures; reject unverified payloads
- **Idempotent handlers** — Store processed webhook IDs; skip duplicates
- **Process asynchronously** — Enqueue webhook processing; respond 200 immediately
- **Reconcile regularly** — Daily reconciliation catches missed webhooks

### Key Patterns
1. **Signature Verification** — Verify HMAC signature. Use the provider's SDK (Stripe `constructEvent`, PayPal `verify-webhook-signature`).
2. **Idempotency Store** — Cache processed webhook IDs (Redis/DynamoDB) with TTL. Return 200 for duplicates without processing.
3. **Async Processing** — Receive webhook → validate signature → enqueue to message queue → return 200. Processing happens in the background worker.
4. **Reconciliation** — Daily job compares Stripe transactions with local records. Alerts on mismatches.

## Checklist

- [ ] Webhook signature is verified on every request before processing
- [ ] Processed webhook IDs are stored and checked for deduplication
- [ ] Webhook handler returns 200 quickly; actual processing is async
- [ ] Dead letter queue with monitoring for failed events
- [ ] Daily reconciliation job compares provider records with local state
- [ ] Webhook endpoint is idempotent and safe to retry

## Common Pitfalls

- **Processing on the webhook thread** — Slow processing causes timeouts and retries
- **No signature verification** — Any request to the webhook URL is accepted
- **No duplicate detection** — Provider retries cause duplicate charges or duplicate fulfillment
- **No reconciliation** — Missed webhooks go undetected indefinitely

## References

- Stripe: Webhook best practices
- Stripe: Idempotency guide
- Adyen: Webhook reliability
