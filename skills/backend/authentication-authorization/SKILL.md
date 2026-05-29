---
name: authentication-authorization
description: Use when implementing auth — JWT, OAuth 2.0, session management, role-based access control, password hashing, MFA, and token refresh flows
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "backend", version: "1.0.0", author: "universal-skills" }
---

# Authentication & Authorization

## Domain Expertise

### Core Principles
- **Never roll your own crypto** — Use established libraries (bcrypt, argon2, OAuth SDKs)
- **Defense in depth** — Auth at every layer: network, application, data
- **Least privilege** — Grant the minimum permissions needed
- **Short-lived tokens** — Access tokens expire in minutes; refresh tokens in days

### Key Patterns
1. **JWT with Refresh Rotation** — Access token (15min) + refresh token (7d). Rotate refresh token on each use; invalidate old ones.
2. **OAuth 2.0 + OIDC** — Standard delegation protocol. Use PKCE for mobile/SPA clients. Validate `aud`, `iss`, `exp` on every token.
3. **RBAC / ABAC** — Role-Based: roles assigned to users, permissions to roles. Attribute-Based: dynamic policies evaluated at request time.
4. **Password Hashing** — Argon2id (preferred) or bcrypt with cost factor >= 12. Never store plaintext or unsalted hashes.
5. **Rate Limiting on Auth** — Apply stricter limits on login, MFA, password reset endpoints. Lockout after N failures.

## Checklist

- [ ] Passwords hashed with Argon2id or bcrypt (cost >= 12)
- [ ] JWT validated on every request (signature, expiry, audience, issuer)
- [ ] Refresh tokens are rotated and old tokens invalidated
- [ ] Rate limiting on auth endpoints
- [ ] MFA available for sensitive operations
- [ ] Session invalidation on password change / logout
- [ ] No sensitive data in JWT payload (PII, secrets)

## Common Pitfalls

- **Storing JWT in localStorage** (XSS vulnerable) — Use httpOnly cookies or memory
- **Ignoring token expiry** — Client must handle 401 and refresh gracefully
- **Over-permissive CORS** — Restrict to specific origins, not `*`
- **Logging credentials** — Never log tokens, passwords, or session IDs

## References

- OWASP: Authentication Cheat Sheet
- OAuth 2.0: RFC 6749
- JWT: RFC 7519
