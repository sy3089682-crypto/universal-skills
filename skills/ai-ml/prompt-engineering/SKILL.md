---
name: prompt-engineering
description: Use when crafting LLM prompts — system prompts, few-shot, chain-of-thought, structured output, prompt caching, and prompt injection prevention
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "ai-ml", version: "1.0.0", author: "universal-skills" }
---

# Prompt Engineering

## Domain Expertise

### Core Principles
- **Be specific** — state format, constraints, and examples explicitly
- **One task per prompt** — decompose complex requests into sequential steps
- **Use structured output** — request JSON/XML/YAML with a schema
- **Separate instructions from data** — use delimiters or markup to isolate user input

### Key Patterns
1. **System Prompt** — Define role, rules, output format, and constraints upfront
2. **Few-Shot** — Provide 2-5 input/output examples before the real query
3. **Chain-of-Thought** — Ask the model to reason step-by-step before answering
4. **Prompt Caching** — Place static prefix content (system prompt, examples, tool defs) before dynamic content. Cache hit rates improve with consistent prefix ordering.
5. **Structured Output** — Define a strict schema (JSON Schema, Pydantic, Zod) and request the response in that format

## Checklist

- [ ] System prompt defines the role and output format
- [ ] Few-shot examples match the target distribution
- [ ] User input is isolated from instructions (delimiter or separate field)
- [ ] Prompt caching prefix is as large as possible and static across calls
- [ ] Structured output includes a schema, not just a format request

## Common Pitfalls

- **Prompt injection** — Never concatenate user input directly into instructions
- **Overly long prompts** — Include only relevant context; prune before calling
- **Assuming knowledge** — Specify conventions, jargon, and abbreviations

## References

- Anthropic docs: Prompt engineering overview
- OpenAI: Best practices for prompt engineering
