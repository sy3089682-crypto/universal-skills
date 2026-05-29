---
name: ci-cd-pipeline
description: Use when designing or debugging CI/CD pipelines — GitHub Actions, GitLab CI, build caching, test parallelization, deployment gates, and artifact management
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "devops", version: "1.0.0", author: "universal-skills" }
---

# CI/CD Pipeline

## Domain Expertise

### Core Principles
- **Fail fast** — Run the fastest checks first (lint → typecheck → unit → integration → e2e)
- **Reproducible builds** — Pin tool versions, use lockfiles, avoid timestamp-based tags
- **Immutable artifacts** — Build once, promote through environments (never rebuild for staging)
- **Gates, not speed bumps** — Each stage either blocks or passes; no manual intervention in automated paths

### Key Patterns
1. **Build Cache** — Cache `node_modules`, `~/.cache`, or `target/` between runs using cache actions
2. **Test Parallelization** — Split test files across N runners with `--shard` or matrix strategy
3. **Semantic Versioning** — Derive version from git tags (`v1.2.3`) + commit metadata
4. **Deployment Gates** — Dev (auto-deploy) → Staging (auto after tests) → Production (manual approval or gradual rollout)
5. **Dependency Caching** — Cache restored on lockfile hash; invalidated when lockfile changes

## Checklist

- [ ] Pipeline runs on every PR and push to main
- [ ] Cache is configured for package managers and build outputs
- [ ] Tests run in parallel across shards or matrix
- [ ] Secrets are injected via the CI platform (never committed)
- [ ] Deployment has a rollback mechanism
- [ ] Pipeline time is tracked and monitored for regressions

## Common Pitfalls

- **Long-running pipelines** — Break into parallel jobs; aim for < 10 minutes
- **Flaky tests without retry** — Use `retry` on flaky tests but track them separately
- **Caching too aggressively** — Stale cache causes cryptic failures; invalidate on config changes
- **Manual approval as only gate** — Automate what you can; keep manual approval only for production

## References

- GitHub Actions: Workflow syntax
- GitLab CI: Pipeline best practices
- Trunk: CI/CD best practices
