---
name: migration-strategies
description: Use when planning or executing migrations — database migrations, codebase rewrites, framework upgrades, data migration, blue-green deployment, and rollback plans
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "architecture", version: "1.0.0", author: "universal-skills" }
---

# Migration Strategies

## Domain Expertise

### Core Principles
- **Make small, reversible changes** — Each step should be safe to roll back
- **Parallel run before switching** — Run old and new systems simultaneously to verify correctness
- **Dark reads / shadow traffic** — Send copy of traffic to the new system without affecting responses
- **Automate the migration** — Manual steps introduce risk and inconsistency

### Key Patterns
1. **Expand-Migrate-Contract (Database)** — Add new column/table (expand) → Backfill data (migrate) → Drop old column/table (contract). Every step is reversible.
2. **Strangler Fig (Codebase)** — Route specific endpoints or features to new implementation. Old code stays until nothing references it.
3. **Blue-Green Deployment** — New version (green) deployed alongside old (blue). Route traffic all at once. Immediate rollback by switching back.
4. **Versioned APIs** — Release new API version alongside old. Deprecate old version after all clients migrate. Provide migration guide.

## Checklist

- [ ] Rollback plan is defined and tested before starting
- [ ] Migration has a canary phase (small traffic % first)
- [ ] Data integrity is verified after migration (compare old vs new)
- [ ] Old system is kept running until migration is confirmed stable
- [ ] Migration script is idempotent (can be re-run safely)
- [ ] All stakeholders are notified of the migration window and rollback procedure

## Common Pitfalls

- **No rollback plan** — Every migration must have a known, tested rollback path
- **Big bang migrations** — The risk is proportional to the change size; reduce it by splitting into phases
- **Ignoring stale data** — Old data formats break new code paths; plan data migration explicitly
- **Skipping parallel run** — Without comparing old and new outputs, silent bugs go undetected

## References

- Martin Fowler: Strangler Fig
- Sam Newman: Monolith to Microservices
- Google SRE: Migration best practices
