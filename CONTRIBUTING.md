# Contributing

Thanks for wanting to make Universal Skills better. Every skill you add helps thousands of developers build better software with AI.

## How to Write a Great Skill

A skill is a `SKILL.md` file inside a category folder. When your AI needs domain expertise, it reads this file and follows the instructions.

### Anatomy of a skill

```
skills/<category>/<skill-name>/
                    └── SKILL.md
```

### YAML frontmatter (required)

```yaml
---
name: your-skill-name
description: >
  Use when doing X — pattern A, pattern B, tool C, and framework D.
  Front-load keywords the AI can match against.
tags: [category]
version: 1.0.0
---
```

**`description` rules:**
- Must be **>50 characters** (shorter descriptions get lost in the skill list)
- Front-load concrete keywords: "Use when implementing rate limiting — token bucket, sliding window..."
- Be specific enough that the AI can match it against a user's task
- One sentence is fine; two sentences are better

### Skill body structure

```
## Domain Expertise
### Core Principles
- 3-5 foundational rules for this domain

### Key Patterns
1. **Pattern Name** — When to use, trade-offs, implementation notes
2. ...

## Checklist
- [ ] Actionable items the AI can verify
- [ ] ...

## Common Pitfalls
- **Pitfall**: How to avoid it
- ...
```

### Quality checklist

Before submitting, verify:

- [ ] `name` matches the directory name (lowercase, hyphens)
- [ ] `description` is >50 characters with concrete keywords
- [ ] "## Domain Expertise" section exists
- [ ] "## Checklist" section exists with actionable items
- [ ] "## Common Pitfalls" section exists
- [ ] At least 3 patterns documented
- [ ] Code examples in the relevant language (if applicable)
- [ ] No external dependencies (plain markdown only)
- [ ] Skill is focused on ONE domain (not a grab-bag)

### Example

See [`templates/skill-template.md`](templates/skill-template.md) for a starting point.

## PR Process

1. Fork the repo
2. Add your skill: `skills/<category>/<skill-name>/SKILL.md`
3. Update the skill table in `README.md`
4. Open a PR with a clear title: `Add <skill-name> skill`
5. In the PR description, explain the domain and why this skill is useful

## Code of Conduct

Be excellent to each other. Skills are educational resources; keep them accurate, actionable, and inclusive.
