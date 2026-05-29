---
name: gdpr-data-protection
description: Use when ensuring GDPR compliance — data processing, consent management, right to erasure, data portability, DPA, and PII identification
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "compliance", version: "1.0.0", author: "universal-skills" }
---

# GDPR Data Protection

## Domain Expertise

### Core Principles
- **Data minimization** — Collect only what you need; delete what you don't
- **Consent before processing** — Explicit opt-in for data collection; clear withdrawal mechanism
- **Right to erasure (Art. 17)** — Users can request deletion of their data; implement this within 30 days
- **Data Processing Agreement (DPA)** — Required with any third-party processor (cloud, analytics, CRM)

### Key Patterns
1. **PII Identification** — Scan databases and logs for PII fields (email, phone, IP, SSN, DOB). Tag and catalog all PII fields.
2. **Consent Management** — Store consent records with timestamp, scope, and version. Allow withdrawal that propagates to all systems.
3. **Data Deletion Pipeline** — On erasure request: mask/anonymize in primary DB, propagate deletion to all downstream systems (logs, analytics, backups, third-party APIs).
4. **Data Portability (Art. 20)** — Export user data in machine-readable format (JSON, CSV) on request. Include all data the user provided.

## Checklist

- [ ] All PII fields are identified and documented in a data inventory
- [ ] Consent is captured and stored with timestamp and scope
- [ ] Erasure/export requests can be fulfilled within 30 days
- [ ] Data retention policies are defined and enforced (logs: 90 days, user data: until deletion request)
- [ ] DPA is signed with all data processors
- [ ] Privacy policy clearly states what data is collected and why

## Common Pitfalls

- **PII in logs** — Structured logging can include PII; implement log scrubbing or exclusion rules
- **Third-party data sharing** — Workflows that send user data to external APIs without user knowledge
- **Backup data not cleaned** — Deleted user data may persist in backups for months
- **Assuming anonymization is safe** — Aggregated data can sometimes be re-identified

## References

- GDPR: Full text (EUR-Lex)
- ICO: Guide to the GDPR
- NIST: PII protection guidelines
