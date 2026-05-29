---
name: agent-tool-use
description: Use when building AI agents that use tools — function calling, tool definitions, error recovery, multi-step reasoning, and tool selection strategies
tags: [ai-ml, agents, llm]
version: 1.0.0
---

# Agent Tool Use

## Domain Expertise

### Core Principles
- **Tools are functions** — Each tool has a clear name, description, and parameter schema. The description is what the LLM uses to decide when to call it.
- **Idempotency is mandatory** — Tools may be called multiple times (retries, parallel calls). Design them to be safe to re-run.
- **Error recovery** — Tools fail. The agent needs structured error messages it can act on.
- **Progressive disclosure** — Give the agent the simplest tools first; escalate to more powerful ones only when needed.

### Key Patterns

1. **Tool Definition Schema** — Every tool needs: descriptive name, clear description (what, when, why), typed parameters, return type.

```json
{
  "name": "search_documentation",
  "description": "Search technical documentation for a query. Use when the user asks about framework, library, or API usage.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search query" },
      "max_results": { "type": "number", "default": 5 }
    },
    "required": ["query"]
  }
}
```

2. **Structured Error Returns** — Return errors the LLM can parse and recover from.

```
Tool Error: {"status": "rate_limited", "retry_after": 30, "strategy": "wait_and_retry"}
Tool Error: {"status": "not_found", "query": "deprecated API", "strategy": "try_alternative"}
```

3. **Tool Selection Strategy** — Categorize tools:
   - **Read tools** (search, lookup, list) — always available, no side effects
   - **Write tools** (create, update, delete) — require confirmation
   - **Meta tools** (think, plan, analyze) — help the agent reason

4. **Multi-Step Reasoning** — Break complex user requests into tool calls. Each call's output feeds the next.

```
1. search_docs("Next.js 15 migration guide") → [results]
2. read_doc("nextjs-15-migration") → [migration steps]
3. analyze_changes("current codebase", migration_steps) → [plan]
```

## Checklist

- [ ] Every tool has a clear, keyword-rich description
- [ ] Tool error messages include recovery hints
- [ ] Write tools have confirmation gates
- [ ] Tool calls are logged with timing for observability
- [ ] Parallel tool calls are supported where dependencies allow
- [ ] Max tool call iterations prevent infinite loops
- [ ] Tools are idempotent (safe to retry)

## Common Pitfalls

- **Poor tool descriptions** — The LLM can't call a tool it doesn't understand. Descriptions must include WHEN and WHY.
- **Circular tool calls** — Tool A calls B which calls A. Detect and break cycles.
- **Not handling truncation** — Long tool outputs exceed context windows. Summarize or paginate.
- **Missing confirmation on destructive actions** — Deleting data without a confirmation step is a user trust violation.
