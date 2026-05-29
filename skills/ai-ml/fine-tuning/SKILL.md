---
name: fine-tuning
description: Use when fine-tuning LLMs — dataset preparation, prompt formatting, hyperparameter selection, LoRA vs full fine-tune, evaluation, and deployment
tags: [ai-ml, llm, fine-tuning]
version: 1.0.0
---

# Fine-Tuning

## Domain Expertise

### Core Principles
- **Data quality > data quantity** — 1000 curated examples beat 100k noisy ones. Clean, deduplicate, and validate every example.
- **Start with RAG, move to fine-tune** — Only fine-tune when RAG + prompt engineering isn't enough. Fine-tuning is expensive and harder to iterate.
- **Choose the right method** — LoRA (fast, cheap, good for task adaptation), Full fine-tune (expensive, best for domain shift), QLoRA (run on consumer GPUs).
- **Evaluate before and after** — A/B test the fine-tuned model on a held-out eval set. If performance doesn't improve on the target task, don't deploy.

### Key Patterns

1. **Dataset Format** — Each example is a structured conversation. Use the chat template format matching the base model.

```json
{
  "messages": [
    {"role": "system", "content": "You are a code reviewer specialized in Python."},
    {"role": "user", "content": "Review this function:\ndef add(a, b):\n    return a + b"},
    {"role": "assistant", "content": "**Security**: No input validation. **Edge cases**: None handled. **Suggestion**: Add type checks."}
  ]
}
```

2. **LoRA Configuration** — Target `q_proj`, `v_proj` for most tasks. Rank `r=8` to `r=64`. Higher rank = more expressiveness, more memory.

```
LoRA config:
  r: 16
  lora_alpha: 32
  target_modules: ["q_proj", "v_proj", "k_proj", "o_proj"]
  lora_dropout: 0.05
  bias: "none"
```

3. **Training Hyperparameters** — Learning rate: `2e-4` for LoRA, `1e-5` for full fine-tune. Batch size: as large as GPU memory allows. Epochs: 2-3 (monitor eval loss for overfitting).

## Checklist

- [ ] Training data is deduplicated and validated (no empty messages, no malformed JSON)
- [ ] Eval set is held out before training (never seen by the model during training)
- [ ] Base model is appropriate for the task (code model for code, instruct model for chat)
- [ ] Training loss decreases monotonically; eval loss doesn't start increasing (overfitting)
- [ ] Fine-tuned model passes A/B test against base model on target task
- [ ] Quantization (bitsandbytes) is used to fit larger models on available GPU memory
- [ ] LoRA adapter is merged before deployment (or loaded separately)

## Common Pitfalls

- **Data leakage** — Eval examples that appear in the training set inflate metrics. Deduplicate across splits.
- **Forgetting to save the tokenizer** — The fine-tuned model needs the same tokenizer + chat template as training.
- **Catastrophic forgetting** — The model loses general capabilities. Mix in general instruction data to preserve them.
- **Overfitting to formatting** — If all training examples have the same structure, the model can't handle variations at inference.
