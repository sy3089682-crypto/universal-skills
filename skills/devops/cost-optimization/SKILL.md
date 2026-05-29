---
name: cost-optimization
description: Use when reducing cloud infrastructure costs — right-sizing, reserved instances, spot instances, storage tiering, data transfer optimization, and FinOps practices
tags: [devops, cloud, cost]
version: 1.0.0
---

# Cloud Cost Optimization

## Domain Expertise

### Core Principles
- **Measure before cutting** — Tag everything, allocate costs by team/service, and establish a baseline before optimizing. Without measurements, optimizations are guesses.
- **Right-size before reserving** — Reserving instances locks you into a size. First, right-size for actual usage. Then reserve for the discount.
- **The largest costs are often invisible** — Data transfer egress, NAT gateway hours, and unused EBS volumes quietly account for 30%+ of many bills.
- **FinOps is culture, not a tool** — Tagging discipline, cost reviews, and developer accountability matter more than any cost optimization tool.

### Key Patterns

1. **Compute Right-Sizing** — Analyze CPU/memory utilization. If average usage is <40%, downsize. If it varies, use auto-scaling or serverless.

```
Rule of thumb:
  avg CPU < 20% → downsize 2 tiers
  avg CPU < 40% → downsize 1 tier
  avg CPU > 80% → consider upsizing or horizontal scaling
```

2. **Spot / Preemptible Instances** — 60-90% discount for interruptible workloads. Use for batch processing, CI runners, stateless workers, and non-production environments. Combine with on-demand fallback.

3. **Storage Tiering** — Hot (SSD, frequently accessed) → Cool (HDD, accessed monthly) → Archive (accessed yearly). Automate transitions with lifecycle policies.

4. **Data Transfer Optimization** — Egress is often the #1 unexpected cost. Use CloudFront/CDN for content delivery, compress API responses, cache aggressively at the edge.

5. **Unused Resource Cleanup** — Weekly automated scans for: unattached EBS volumes, unused load balancers, idle RDS instances, orphaned EIPs, and stale snapshots.

## Checklist

- [ ] All resources are tagged with cost center, environment, and owner
- [ ] Compute instances are right-sized based on 30-day utilization metrics
- [ ] Reserved instances / savings plans cover predictable baseline usage
- [ ] Spot/preemptible instances used for interruptible workloads
- [ ] Storage lifecycle policies move cold data to cheaper tiers automatically
- [ ] Data transfer is minimized (CDN, compression, caching)
- [ ] Unused resource cleanup runs weekly
- [ ] Cost anomaly alerts are configured (>20% weekly increase)
- [ ] Each team has a cost budget with alerts

## Common Pitfalls

- **Optimizing before measuring** — You can't fix what you don't measure. Start with cost allocation tags and a cost breakdown.
- **Forgetting licensing costs** — Database licenses (Oracle, SQL Server) can cost more than the compute they run on. Consider open-source alternatives.
- **Over-provisioning "just in case"** — Provision for average + burst, not peak. Use auto-scaling for spikes.
- **Ignoring dev/staging environments** — Dev/QA environments can be 40% of the bill. Shut them down on nights and weekends.
