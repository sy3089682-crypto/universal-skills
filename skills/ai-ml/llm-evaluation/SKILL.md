---
name: llm-evaluation
description: Use when evaluating LLM output quality — benchmarks, human eval, automated metrics, hallucination detection, and regression testing
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "ai-ml", version: "1.0.0", author: "universal-skills" }
---

# LLM Evaluation

## Domain Expertise

### Core Principles
- **Evaluate what matters** — Task-specific metrics over general benchmarks
- **Automate regression** — Run eval suites on every prompt/model change
- **Human-in-the-loop** — Automated metrics catch regressions; humans judge quality
- **Test edge cases** — Adversarial inputs, empty contexts, and out-of-distribution queries

### Key Patterns
1. **LLM-as-Judge** — Use a strong model (Claude, GPT-4) to rate output on correctness, helpfulness, harmlessness
2. **Reference-Based** — Compare output against a golden answer (BLEU, ROUGE, semantic similarity)
3. **Structured Eval** — For structured outputs, validate schema compliance and field-level accuracy
4. **Red-Teaming** — Automated adversarial testing with injection attempts and edge case inputs

## Checklist

- [ ] Evaluation dataset covers happy path, edge cases, and adversarial inputs
- [ ] Both automated metrics and human evaluation are in place
- [ ] Regression suite runs on every prompt change
- [ ] Hallucination detection is implemented for factual queries
- [ ] Performance (latency, token usage) is tracked alongside quality

## Common Pitfalls

- **Metric gaming** — Optimizing for a metric without validating actual quality
- **Leakage** — Evaluation data overlapping with training data
- **Single-judge bias** — Using one LLM-as-judge without calibration

## References

- Anthropic: Evaluating LLM systems
- OpenAI: Eval best practices
