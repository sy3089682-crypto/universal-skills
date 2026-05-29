# Universal Skills

**A cross-CLI, universal skill system for AI coding agents.**

Install once. Works with opencode, Claude Code, Cursor, and any tool that supports skill-based instructions.

> "Skills" are reusable instruction sets that teach AI coding agents domain-specific
> expertise — like having a senior engineer's playbook for every technology.

## Quick Install

```bash
# One-command install (auto-detects your CLI tools)
git clone https://github.com/universal-skills/universal-skills.git
cd universal-skills
bash scripts/install.sh

# Or install for a specific CLI
bash scripts/install.sh opencode   # opencode only
bash scripts/install.sh claude     # Claude Code only
bash scripts/install.sh all        # all known locations
```

After install, restart your CLI. Skills auto-load when you ask about relevant topics.

## How It Works

```
Your Prompt                          Skill System
─────────────────                    ─────────────────────────────
"Deploy this to           ──► scan   deployment-reliability-engineer
 production"              ──► load   docker-multi-stage
                           ──► use   kubernetes-deployment
                                      observability-monitoring
```

1. You describe your task
2. The AI scans `<available_skills>` for matching descriptions
3. Matching skills are loaded automatically
4. The AI uses the loaded expertise to help you

### opencode Plugin

For opencode users, the [opencode plugin](plugins/opencode/skill-router.ts) adds:

- **Auto-loading** — System prompt instruction to scan and load skills before every task
- **`/skills <task>`** — Manually trigger skill loading
- **`/list-skills`** — Browse all installed skills

```json
// ~/.config/opencode/opencode.json
{
  "plugin": ["universal-skills"]
}
```

It auto-discovers from `.opencode/plugins/` so no config is needed if you install there.

## Compatibility

| Tool | Support | Method |
|------|---------|--------|
| opencode | ✅ Full | Plugin + `~/.config/opencode/skills/` |
| Claude Code | ✅ Full | `~/.claude/skills/` directory |
| Cursor | ✅ Partial | `~/.agents/skills/` directory |
| Windsurf | ✅ Partial | `.windsurf/skills/` (copy manually) |
| GitHub Copilot | ⬜ Planned | Custom format |

All skills are plain `SKILL.md` files with YAML frontmatter — compatible with any
tool that reads [standard skill format](https://opencode.ai/docs/skills/).

## Skills

### AI / ML

| Skill | Use When |
|-------|----------|
| [Prompt Engineering](skills/ai-ml/prompt-engineering/SKILL.md) | Crafting LLM prompts, system prompts, prompt caching |
| [RAG Implementation](skills/ai-ml/rag-implementation/SKILL.md) | Retrieval-Augmented Generation, vector search |
| [LLM Evaluation](skills/ai-ml/llm-evaluation/SKILL.md) | Evaluating LLM output quality, benchmarks |

### Backend

| Skill | Use When |
|-------|----------|
| [API Design](skills/backend/api-design-rest-graphql/SKILL.md) | Designing REST or GraphQL APIs |
| [Auth & Authorization](skills/backend/authentication-authorization/SKILL.md) | JWT, OAuth, RBAC, password hashing |
| [Caching Strategies](skills/backend/caching-strategies/SKILL.md) | Redis, CDN, HTTP caching, stampede prevention |
| [Message Queue Patterns](skills/backend/message-queue-patterns/SKILL.md) | Kafka, RabbitMQ, event sourcing, CQRS |

### Data

| Skill | Use When |
|-------|----------|
| [Database Optimization](skills/data/database-schema-optimization/SKILL.md) | Schema design, indexing, query planning |
| [ETL Pipeline Design](skills/data/etl-pipeline-design/SKILL.md) | Batch/streaming pipelines, incremental loads |

### DevOps

| Skill | Use When |
|-------|----------|
| [Docker Multi-Stage](skills/devops/docker-multi-stage/SKILL.md) | Dockerfiles, layer caching, distroless images |
| [CI/CD Pipeline](skills/devops/ci-cd-pipeline/SKILL.md) | GitHub Actions, build caching, deployment gates |
| [Kubernetes Deployment](skills/devops/kubernetes-deployment/SKILL.md) | Deployments, services, HPA, probes |
| [Observability](skills/devops/observability-monitoring/SKILL.md) | Logging, metrics, tracing, SLOs |
| [Infrastructure as Code](skills/devops/infrastructure-as-code/SKILL.md) | Terraform, state management, policy as code |

### Frontend

| Skill | Use When |
|-------|----------|
| [React & Next.js](skills/frontend/react-nextjs-patterns/SKILL.md) | RSC, data fetching, streaming, layouts |
| [Accessibility (WCAG)](skills/frontend/accessibility-wcag/SKILL.md) | ARIA, keyboard nav, screen reader support |
| [CSS Animation](skills/frontend/css-animation-performance/SKILL.md) | GPU-accelerated animation, FLIP, reduced-motion |
| [Responsive Mobile UX](skills/frontend/responsive-mobile-ux/SKILL.md) | Mobile-first, touch targets, safe areas |
| [Design System Tokens](skills/frontend/design-system-tokens/SKILL.md) | Design tokens, theming, dark mode |

### Mobile

| Skill | Use When |
|-------|----------|
| [React Native](skills/mobile/react-native-patterns/SKILL.md) | Navigation, performance, platform code |
| [iOS Swift](skills/mobile/ios-swift-patterns/SKILL.md) | SwiftUI, MVVM, async/await, Core Data |

### Performance

| Skill | Use When |
|-------|----------|
| [Web Vitals](skills/performance/web-vitals-optimization/SKILL.md) | LCP, CLS, INP, Core Web Vitals |
| [Bundle Size](skills/performance/bundle-size-optimization/SKILL.md) | Code splitting, tree shaking, dependency audit |
| [DB Query Optimization](skills/performance/database-query-optimization/SKILL.md) | EXPLAIN ANALYZE, indexes, N+1 detection |
| [Memory Leak Detection](skills/performance/memory-leak-detection/SKILL.md) | Heap snapshots, DevTools, closures |

### Security

| Skill | Use When |
|-------|----------|
| [OWASP Top 10](skills/security/owasp-top-ten/SKILL.md) | Web app security, XSS, injection, SSRF |
| [Secrets Management](skills/security/secrets-management/SKILL.md) | API keys, vaults, rotation, detection |
| [Dependency Scanning](skills/security/dependency-vulnerability-scanning/SKILL.md) | SCA, CVE remediation, SBOM |
| [Secure API Design](skills/security/secure-api-design/SKILL.md) | Rate limiting, input validation, CORS |

### Testing

| Skill | Use When |
|-------|----------|
| [E2E (Playwright)](skills/testing/e2e-testing-playwright/SKILL.md) | E2E tests, Page Object Model, visual regression |
| [Unit Testing](skills/testing/unit-testing-patterns/SKILL.md) | AAA, mocking, edge cases, naming |
| [Integration Testing](skills/testing/integration-testing/SKILL.md) | Testcontainers, API contract tests, fixtures |
| [Property-Based Testing](skills/testing/property-based-testing/SKILL.md) | Invariants, generators, shrinking |
| [Coverage Strategies](skills/testing/test-coverage-strategies/SKILL.md) | Thresholds, risk-based, mutation testing |

### Architecture

| Skill | Use When |
|-------|----------|
| [Microservices](skills/architecture/microservices-patterns/SKILL.md) | Service boundaries, circuit breakers, saga |
| [Domain-Driven Design](skills/architecture/domain-driven-design/SKILL.md) | Bounded contexts, aggregates, domain events |
| [Clean Architecture](skills/architecture/clean-architecture/SKILL.md) | Dependency rule, use cases, layers |
| [Event-Driven Architecture](skills/architecture/event-driven-architecture/SKILL.md) | Event sourcing, CQRS, pub/sub |
| [Migration Strategies](skills/architecture/migration-strategies/SKILL.md) | Expand-migrate-contract, strangler fig |

### Payment

| Skill | Use When |
|-------|----------|
| [Stripe Integration](skills/payment/stripe-integration/SKILL.md) | Checkout, webhooks, subscriptions |
| [Subscription Management](skills/payment/subscription-management/SKILL.md) | Pricing, proration, dunning, churn |
| [Webhook Reliability](skills/payment/payment-webhook-reliability/SKILL.md) | Verification, idempotency, reconciliation |

### Compliance

| Skill | Use When |
|-------|----------|
| [GDPR](skills/compliance/gdpr-data-protection/SKILL.md) | Data protection, consent, erasure, portability |
| [SOC 2](skills/compliance/soc2-audit-readiness/SKILL.md) | Controls, audits, evidence collection |

## Adding Skills

### Using the template

```bash
cp templates/skill-template.md skills/<category>/<skill-name>/SKILL.md
```

Edit the YAML frontmatter (name, description, metadata) and the skill body.
The `description` field is what the AI matches against your task — make it clear and keyword-rich.

### Writing a good description

```
Good:    "Use when optimizing React Native list performance — FlashList, FlatList, memo, and re-render prevention"
Bad:     "React Native performance"
```

The description is scanned by the AI to determine when to load your skill.
Front-load the trigger keywords.

## Development

```bash
# Validate all skills
bash scripts/validate-skills.sh

# Sync local changes to all CLI tool locations
bash scripts/sync.sh
```

## License

MIT — use it, fork it, contribute to it.
