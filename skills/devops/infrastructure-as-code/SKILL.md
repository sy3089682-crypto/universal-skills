---
name: infrastructure-as-code
description: Use when managing infrastructure as code — Terraform/Pulumi, state management, modular design, secrets in IaC, and policy as code
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "devops", version: "1.0.0", author: "universal-skills" }
---

# Infrastructure as Code

## Domain Expertise

### Core Principles
- **State is sensitive** — Never commit state files; use remote state with encryption
- **Modular design** — Break infrastructure into reusable modules (VPC, database, compute, monitoring)
- **Immutable infrastructure** — Replace, don't modify. Changes create new resources; old ones are destroyed.
- **Policy as code** — Enforce compliance through code (Sentinel, OPA), not manual review

### Key Patterns
1. **Remote State** — Terraform state in S3/GCS with DynamoDB for locking. Pulumi uses its own service or self-managed backend.
2. **Workspaces or Stacks** — Separate state per environment (dev/staging/prod). Modules parameterized by environment variables.
3. **Secrets in IaC** — Reference secrets from a vault (AWS Secrets Manager, Vault) rather than storing them in code or state
4. **Policy as Code** — OPA rules enforce tagging, region restrictions, encryption requirements. Run in CI and as a webhook.

## Checklist

- [ ] State is stored remotely with encryption and locking
- [ ] Infrastructure is organized into reusable modules
- [ ] Each environment has its own state (workspace or stack)
- [ ] Secrets are referenced from a secrets manager, not hardcoded
- [ ] CI/CD pipeline runs `plan` before `apply` for all changes
- [ ] Policies enforce security and compliance rules

## Common Pitfalls

- **Storing state locally** — Lost state means losing track of resources
- **One state for all environments** — A mistake in dev can destroy prod
- **Hardcoded secrets** — Secrets in state files or config are a data breach waiting to happen
- **No plan review** — Applying without reviewing the plan risks unexpected changes

## References

- Terraform: Best practices
- Pulumi: Infrastructure patterns
- OPA: Policy as code
