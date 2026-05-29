---
name: kubernetes-deployment
description: Use when deploying or managing Kubernetes workloads — Deployments, Services, Ingress, ConfigMaps, resource quotas, HPA, and monitoring with liveness/readiness probes
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "devops", version: "1.0.0", author: "universal-skills" }
---

# Kubernetes Deployment

## Domain Expertise

### Core Principles
- **Declarative over imperative** — All configuration in YAML, committed to git
- **Self-healing** — Define desired state; let the control plane reconcile
- **Resource boundaries** — Every workload needs requests and limits
- **Least privilege RBAC** — ServiceAccounts with minimal permissions

### Key Patterns
1. **Deployment Strategy** — RollingUpdate (default with maxSurge=25%, maxUnavailable=25%) or Blue/Green (via Service selector swap)
2. **Probes** — livenessProbe (restart if dead), readinessProbe (remove from Service if not ready), startupProbe (for slow-starting apps)
3. **Horizontal Pod Autoscaler** — Based on CPU/memory or custom metrics (QPS, latency). Always set min/max replicas.
4. **ConfigMap / Secret** — ConfigMap for non-sensitive config; Secret for credentials (encrypted at rest via KMS)
5. **Pod Disruption Budget** — Ensure minimum availability during voluntary disruptions (node drains, updates)

## Checklist

- [ ] All containers have resource requests AND limits
- [ ] Liveness, readiness, and startup probes are configured
- [ ] PodDisruptionBudget is defined for production workloads
- [ ] ConfigMaps and Secrets are mounted, not baked into images
- [ ] HPA has min/max bounds and is tested with load
- [ ] RBAC roles follow least privilege principle
- [ ] NetworkPolicies restrict ingress/egress traffic

## Common Pitfalls

- **No resource limits** — A memory leak can crash the entire node
- **identical probe configuration** — Liveness and readiness should test different things
- **Hardcoding environment-specific values** — Use Kustomize or Helm for environments
- **Missing PDB** — Node drains can take down all replicas simultaneously

## References

- Kubernetes: Deployments docs
- Kubernetes: ConfigMaps and Secrets
- K8s: Production best practices
