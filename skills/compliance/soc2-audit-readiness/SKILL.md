---
name: soc2-audit-readiness
description: Use when preparing for SOC 2 audit — security controls, access reviews, incident response, vendor management, and evidence collection
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "compliance", version: "1.0.0", author: "universal-skills" }
---

# SOC 2 Audit Readiness

## Domain Expertise

### Core Principles
- **Controls, not checklist** — SOC 2 isn't about checking boxes; it's about operating effective controls
- **Evidence is everything** — If it isn't documented, it didn't happen. All controls must produce evidence.
- **Design → Implementation → Monitoring** — Control exists (design), is followed (implementation), is reviewed (monitoring)
- **Continuous compliance** — Automate evidence collection; don't scramble at audit time

### Key Trust Service Criteria
1. **Security (Common Criteria)** — Firewall, IDS/IPS, access control, encryption, vulnerability management. Required for all SOC 2 reports.
2. **Availability** — Monitoring, incident response, disaster recovery, capacity planning. Uptime commitments.
3. **Confidentiality** — Data classification, encryption at rest/transit, access controls, destruction policies.
4. **Processing Integrity** — Input validation, error handling, data reconciliation, anomaly detection.
5. **Privacy** — PII handling, consent, notice, data retention and disposal.

## Checklist

- [ ] Access reviews are conducted quarterly (user access, privileged access, service accounts)
- [ ] Change management process is documented and followed (code review, testing, approval)
- [ ] Incident response plan is documented and tested at least annually
- [ ] Vulnerability scans run monthly; critical findings are remediated within 30 days
- [ ] Vendor due diligence is performed before engagement and reviewed annually
- [ ] Evidence is collected and stored continuously (not retroactively)

## Common Pitfalls

- **No evidence collection** — A control that isn't producing evidence might as well not exist
- **Documentation drift** — Runbooks and policies that don't match actual operations
- **Scope creep** — Including systems in scope that don't need to be there
- **Audit-time scramble** — Collecting a year of evidence in a week leads to gaps and stress

## References

- AICPA: SOC 2 Guide
- Vanta: SOC 2 compliance guide
- Drata: SOC 2 control framework
