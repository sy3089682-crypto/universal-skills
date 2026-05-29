---
name: secrets-management
description: Use when handling sensitive information — API keys, database credentials, encryption keys. Covers vaults, environment variables, secret rotation, and detection
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "security", version: "1.0.0", author: "universal-skills" }
---

# Secrets Management

## Domain Expertise

### Core Principles
- **Never commit secrets** — Use `.env` (gitignored) or a vault; never hardcode
- **Least privilege for secrets** — Each service gets only the secrets it needs
- **Rotate automatically** — Short-lived credentials; automated rotation without downtime
- **Audit access** — Every secret access should be logged and reviewed

### Key Patterns
1. **Vault-Based** — HashiCorp Vault or cloud-native (AWS Secrets Manager, GCP Secret Manager). Dynamic secrets with TTL.
2. **Environment Variables** — Loaded at process start, never via `.env` in production (use secrets injection)
3. **Encryption at Rest** — Encrypt secrets in the database using envelope encryption (DEK + KEK)
4. **Secret Detection** — Pre-commit hooks (talisman, gitleaks) and CI scans for accidental commits. `.gitignore` for `.env*` files.

## Checklist

- [ ] No secrets committed to git (use gitleaks/talisman pre-commit hook)
- [ ] Production secrets use a vault or secrets manager (not .env files)
- [ ] Secrets are rotated on a schedule (90 days max for long-lived keys)
- [ ] Access to the secrets manager is logged and audited
- [ ] `.env` is in `.gitignore`
- [ ] Service accounts have minimal secret permissions

## Common Pitfalls

- **Checking in `.env`** — One accidental push exposes all credentials permanently
- **Logging secrets** — Sanitize logs to redact tokens, passwords, and API keys
- **Sharing service account secrets** — Each service/app gets its own credentials
- **Hardcoded fallback secrets** — Default passwords or test keys in config that make it to production

## References

- OWASP: Secrets management cheat sheet
- HashiCorp: Vault documentation
- GitLeaks: Secret detection
