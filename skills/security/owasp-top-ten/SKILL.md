---
name: owasp-top-ten
description: Use when auditing or securing web apps — broken access control, injection, XSS, SSRF, insecure deserialization, and OWASP Top 10 mitigation patterns
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "security", version: "1.0.0", author: "universal-skills" }
---

# OWASP Top 10

## Domain Expertise

### Core Principles
- **Trust nothing** — Validate, sanitize, and authorize every input
- **Defense in depth** — Multiple layers of protection; never rely on a single control
- **Fail securely** — Errors should not leak implementation details or expose state
- **Keep dependencies current** — Most breaches exploit known CVEs

### Key Vulnerability Patterns
1. **Broken Access Control (A01)** — Enforce at the API/backend, not just the UI. Test with role escalation attempts.
2. **Injection (A03)** — Parameterized queries for SQL; output encoding for XSS; no eval() for command injection
3. **XSS (A03)** — React auto-escapes; dangerouslySetInnerHTML requires manual sanitization (DOMPurify). CSP header as second layer.
4. **SSRF (A10)** — Allowlist allowed URLs; block private IP ranges; disable HTTP redirect following
5. **Insecure Deserialization (A08)** — Don't deserialize untrusted data. Use simple data formats (JSON) over binary serialization.

## Checklist

- [ ] All access control is enforced server-side
- [ ] SQL queries use parameterized statements (no string concatenation)
- [ ] User-supplied data is encoded for the output context (HTML, JS, CSS, URL)
- [ ] CSP headers are configured and enforced
- [ ] Dependencies are scanned for CVEs regularly
- [ ] File upload validation (type, size, content inspection, no execution)

## Common Pitfalls

- **Client-side-only auth checks** — API endpoints must independently verify permissions
- **Open redirects** — Validating redirect URLs against an allowlist
- **Error message over-sharing** — "User not found" vs "Invalid password" for login (use generic messages)

## References

- OWASP: Top 10 (2021)
- OWASP: Cheat Sheet Series
- CWE: Common Weakness Enumeration
