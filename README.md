# Universal Skills

**One install. Every AI coding tool. 60+ expert skills.**

<p align="center">
  <a href="https://www.npmjs.com/package/universal-skills"><img src="https://img.shields.io/npm/v/universal-skills?style=flat&label=npm&color=7C3AED" /></a>
  <a href="https://github.com/sy3089682-crypto/universal-skills/stargazers"><img src="https://img.shields.io/github/stars/sy3089682-crypto/universal-skills?style=flat&label=stars&color=7C3AED" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/sy3089682-crypto/universal-skills?style=flat&color=7C3AED" /></a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat&color=7C3AED" />
  <img src="https://img.shields.io/badge/works-everywhere-success?style=flat&color=7C3AED" />
</p>

---

```text
      ╔══════════════════════════════════════════════════════╗
      ║   Before:                    After:                  ║
      ║                                                   ║
      ║   "Deploy to prod"           "Deploy to prod"        ║
      ║   ├── AI guesses             ├── AI loads skills     ║
      ║   ├── Misses 50%             ├── 60+ expert refs     ║
      ║   └── No checklist           └── Structured output   ║
      ╚══════════════════════════════════════════════════════╝
```

**Skills turn your AI from a generalist into a specialist.** Every skill file is like handing your coding agent a senior engineer's playbook for that domain — complete with patterns, pitfalls, and a checklist.

---

## Install

```bash
# ONE command. Auto-detects your tools (opencode, Claude Code, Cursor, Windsurf)
npx universal-skills install

# Or for a specific tool
npx universal-skills install --tool=cursor
npx universal-skills install --tool=all

# Browse available skills
npx universal-skills list
```

Done. Restart your CLI. Skills auto-load when you ask about related topics.

### Manual install (no Node.js)

```bash
git clone https://github.com/sy3089682-crypto/universal-skills.git
cd universal-skills
bash scripts/install.sh          # auto-detect
bash scripts/install.sh all      # all tools
```

---

## What's Inside

60+ skills across 14 categories. Each one is a battle-tested playbook:

### AI / Machine Learning
`prompt-engineering` `rag-implementation` `llm-evaluation` `agent-tool-use` `fine-tuning` `vector-databases`

### Backend
`api-design-rest-graphql` `authentication-authorization` `caching-strategies` `message-queue-patterns` `rate-limiting` `websocket-realtime`

### Languages
`python-best-practices` `typescript-advanced` `rust-systems` `go-patterns`

### DevOps
`docker-multi-stage` `ci-cd-pipeline` `kubernetes-deployment` `observability-monitoring` `infrastructure-as-code` `github-actions-advanced` `cost-optimization`

### Frontend
`react-nextjs-patterns` `accessibility-wcag` `css-animation-performance` `responsive-mobile-ux` `design-system-tokens` `seo-optimization` `pwa-offline`

### Security
`owasp-top-ten` `secrets-management` `dependency-vulnerability-scanning` `secure-api-design` `penetration-testing`

### Testing
`e2e-testing-playwright` `unit-testing-patterns` `integration-testing` `property-based-testing` `test-coverage-strategies` `ai-assisted-testing`

### + Architecture, Payment, Compliance, Data, Mobile, Performance

> **[Browse all skills →](https://github.com/sy3089682-crypto/universal-skills/tree/main/skills)**

---

## Before / After

### ❌ Without Universal Skills

```
User: "Add rate limiting to our API"
  AI: "Sure, you can use express-rate-limit..." [writes basic middleware]
       → Misses: token bucket vs sliding window, distributed rate limiting,
         headers, backpressure signaling, Redis-backed storage
       → No checklist. No production patterns. Generic answer.
```

### ✅ With Universal Skills

```
User: "Add rate limiting to our API"
  AI: [loads rate-limiting skill] "Here's a production-grade approach:"

      1. Algorithm: Sliding window log (accurate) or Token bucket (burst-friendly)
      2. Backend: Redis-backed, Lua scripts for atomic increments
      3. Headers: RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset
      4. Response: 429 with Retry-After
      5. Distributed: Consistent hashing + local cache fallback

      ✓ Checklist validated. Pitfalls documented. Production-ready.
```

---

## Compatibility

| Tool | Status | Method |
|------|--------|--------|
| **opencode** | ✅ Full | Plugin + skill directory |
| **Claude Code** | ✅ Full | `~/.claude/skills/` |
| **Cursor** | ✅ Full | `~/.cursor/skills/` |
| **Windsurf** | ✅ Full | `~/.windsurf/skills/` |
| **GitHub Copilot** | 🚧 In progress | Custom format |

---

## How Skills Work

Every skill is a **`SKILL.md`** file with YAML frontmatter:

```markdown
---
name: rate-limiting
description: Use when implementing API rate limiting — token bucket, sliding window,
  Redis-backed counters, header propagation, and backpressure signaling
tags: [backend, security, performance]
version: 1.0.0
---

# Rate Limiting

## Core Patterns
...
## Checklist
- [ ] ...
## Common Pitfalls
- ...
```

Your AI reads the `description` field, matches it against your task, and loads the full skill content when relevant. No manual intervention.

---

## Why This Exists

Every AI coding agent has the same problem: **they're generalists**. Ask one to "deploy to Kubernetes" and you get chatGPT-level advice. But your AI can be a specialist — if you give it the right playbooks.

This repo started because I was tired of telling my AI the same production patterns over and over. Instead, I wrote them down once as skills. Now my AI has a senior engineer's knowledge baked in.

**This is the repo I wish existed when I started using AI coding tools.**

---

## Contributing

Skills are how we share knowledge with AI. If you have expertise in a domain, write a skill.

- **[Contributing Guide](CONTRIBUTING.md)** — How to write a great skill
- **[Skill Template](templates/skill-template.md)** — Start here
- **Score +10 stars** — Quality skills get promoted

---

## From the Community

> "Universal Skills turned my Claude from 'helpful junior' to 'senior engineer on demand.' The rate-limiting skill alone saved me a production incident." — @codedev

> "This should be the first thing every AI coding user installs." — @techlead

> "I contributed two skills and learned more about the topics writing them than I did implementing them." — @devopsgirl

---

<p align="center">
  <b>Star this repo</b> — every star tells the AI to load one more skill ⭐<br>
  <sub>MIT · Open Source · PRs Welcome</sub>
</p>
