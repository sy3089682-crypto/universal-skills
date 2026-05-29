---
name: secure-api-design
description: Use when designing or reviewing API security — rate limiting, input validation, CORS, CSRF, API keys vs OAuth, request signing, and webhook verification
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "security", version: "1.0.0", author: "universal-skills" }
---

# Secure API Design

## Domain Expertise

### Core Principles
- **Authenticate every request** — No endpoint is public by default; opt-in for public
- **Rate limit per client** — Apply limits by API key, IP, or user ID; return 429 with Retry-After
- **Validate early** — Input validation at the gateway/controller layer before hitting business logic
- **Idempotent mutations** — POST endpoints support idempotency keys for safe retries

### Key Patterns
1. **API Key Authentication** — Key in header `X-API-Key`. Hash keys at rest (bcrypt). Scope keys to specific resources.
2. **Request Signing** — HMAC-signed requests with timestamp and nonce to prevent replay attacks
3. **Webhook Verification** — Sign webhook payloads with HMAC; receiver verifies signature before processing
4. **Rate Limiting** — Token bucket algorithm per client. Different limits per endpoint tier (auth: strict, read: moderate, write: moderate)
5. **CORS** — Explicit allowlist of origins; no `Access-Control-Allow-Origin: *` for authenticated endpoints

## Checklist

- [ ] Every endpoint has authentication (even internal ones)
- [ ] Rate limiting is applied with proper 429 responses
- [ ] Input validation rejects malformed data before processing
- [ ] CORS is restricted to specific origins
- [ ] Webhook receivers verify payload signatures
- [ ] API responses don't leak internal implementation details
- [ ] Idempotency keys are accepted on mutation endpoints

## Common Pitfalls

- **Open CORS** — Allowing all origins (`*`) with credentials enabled is insecure
- **No rate limiting on auth endpoints** — Brute force attacks will succeed eventually
- **Returning stack traces** — Always return sanitized error responses; log full errors server-side
- **API keys in URLs** — Keys in query params get logged by proxies and show in browser history

## References

- OWASP: REST Security Cheat Sheet
- Stormpath: API key best practices
- Stripe: Webhook signature verification
