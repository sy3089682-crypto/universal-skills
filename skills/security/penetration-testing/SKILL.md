---
name: penetration-testing
description: Use when conducting penetration tests — reconnaissance, vulnerability scanning, exploitation, privilege escalation, persistence, and reporting
tags: [security, pentesting, audit]
version: 1.0.0
---

# Penetration Testing

## Domain Expertise

### Core Principles
- **Authorization first, always** — Never test a system without written authorization. Scope, rules of engagement, and emergency contacts must be documented.
- **Follow a methodology** — Use a structured framework: Reconnaissance → Scanning → Exploitation → Post-Exploitation → Reporting. Skip none, repeat as needed.
- **Document everything** — Every command, every finding, every screenshot goes into the report. If it isn't documented, it didn't happen.
- **Think like an adversary** — What would a real attacker target? Customer data, credentials, payment systems, admin panels. Focus on business impact.

### Key Stages

1. **Reconnaissance (Recon)** — Gather information without touching the target.
   - Passive: DNS enumeration (`dig`, `nslookup`), WHOIS, Shodan, Censys, GitHub dorking, LinkedIn OSINT
   - Active: Subdomain brute-force (`ffuf`, `gobuster`), port scanning (`nmap -sC -sV`), technology fingerprinting (`whatweb`, `wappalyzer`)

2. **Vulnerability Scanning** — Identify known vulnerabilities.
   - Automated: Nikto, OpenVAS, Nuclei (template-based scanning)
   - Manual: Check for OWASP Top 10 manually — IDOR, XSS, SSRF, SQLi, insecure deserialization
   - Fuzzing: `ffuf` for parameter discovery, directory brute-force, hidden endpoints

3. **Exploitation** — Attempt to exploit discovered vulnerabilities.
   - Web: SQL injection (`sqlmap`), XSS (custom payloads), SSRF (internal service probing), file upload (webshell)
   - Network: Known CVE exploits (`searchsploit`), default credentials, misconfigured services
   - Auth: Session hijacking, JWT none-algorithm attack, OAuth redirect URI manipulation

4. **Post-Exploitation** — After gaining access.
   - Privilege escalation: LinPEAS/WinPEAS, sudo misconfigs, SUID binaries, scheduled tasks
   - Lateral movement: SSH keys, shared credentials, network pivoting
   - Persistence: Backdoor user accounts, cron jobs, startup scripts
   - Data exfiltration: Simulate data theft (prove impact without actual exfiltration)

### Reporting

Every finding should include:
- **Severity**: Critical / High / Medium / Low / Informational (CVSS score)
- **Description**: What, where, and why it matters
- **Reproduction Steps**: Exact commands, payloads, and screenshots
- **Impact**: What an attacker could achieve
- **Remediation**: Specific, actionable fix (code example, config change, process update)

## Checklist

- [ ] Written authorization and scope are obtained and reviewed
- [ ] Emergency contacts and stop-condition are defined
- [ ] Reconnaissance covers passive and active techniques
- [ ] Automated vulnerability scans are completed before manual testing
- [ ] Manual testing covers OWASP Top 10 for web applications
- [ ] Exploitation is contained within scope (no production data exfiltration)
- [ ] Privilege escalation is attempted from each access level
- [ ] Every finding includes reproduction steps and CVSS score
- [ ] Report is delivered with clear severity ratings and remediation guidance
- [ ] Test data and backdoors are fully removed after testing

## Common Pitfalls

- **Going out of scope** — Stick to the agreed targets. Discovering an unrelated vulnerability doesn't justify testing it.
- **Destructive testing without backups** — SQL injection with `DROP TABLE` or DoS attacks can cause real damage.
- **Only running automated scanners** — Automated tools miss logic flaws, business logic bugs, and complex chained attacks.
- **Not reporting negatives** — Spending time testing something with no findings is valuable — document it anyway.
