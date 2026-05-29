---
name: rag-implementation
description: Use when building or debugging Retrieval-Augmented Generation systems — chunking, embedding, vector search, retrieval quality, and generation with context
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "ai-ml", version: "1.0.0", author: "universal-skills" }
---

# RAG Implementation

## Domain Expertise

### Core Principles
- **Chunk intelligently** — Split documents into semantic chunks with overlap
- **Retrieve with intent** — Query transformation, HyDE, multi-query retrieval
- **Rank and re-rank** — Apply cross-encoder re-rankers on top of bi-encoder results
- **Ground responses** — Always cite source chunks in the generated answer

### Key Patterns
1. **Semantic Chunking** — Split by document structure (headings, paragraphs) not just token count. 500-1000 tokens per chunk with 10-20% overlap.
2. **Hybrid Search** — Combine vector similarity (embeddings) with keyword search (BM25) for better recall
3. **Query Rewriting** — Rewrite the user's question into search-optimized queries before retrieval
4. **Context Window Management** — Fit as many relevant chunks as possible within the LLM's context window

## Checklist

- [ ] Chunking strategy respects document boundaries (headings, sections)
- [ ] Embedding model matches the language and domain of your documents
- [ ] Vector index includes metadata filtering capability
- [ ] Re-ranking step is applied before final context assembly
- [ ] Generated response includes citations to source chunks
- [ ] Evaluated retrieval quality with recall@k and precision@k metrics

## Common Pitfalls

- **Lost-in-the-middle** — Relevant chunks placed in the middle of context get ignored; place the most relevant at the start and end
- **Over-chunking** — Too many small chunks lose document-level context
- **Embedding model mismatch** — Using a general embedding for domain-specific documents

## References

- Anthropic: Contextual retrieval
- Pinecone: RAG patterns and best practices
