---
name: vector-databases
description: Use when working with vector databases — embedding models, indexing (HNSW, IVF), similarity search, hybrid search, filtering, and performance tuning
tags: [ai-ml, vector-search, database]
version: 1.0.0
---

# Vector Databases

## Domain Expertise

### Core Principles
- **Embedding model determines quality** — The vector DB is just storage + search. Bad embeddings = bad results regardless of the database.
- **Index strategy = speed/accuracy tradeoff** — HNSW (fast, accurate, memory-heavy), IVF (balanced), Flat (brute-force, only for small datasets).
- **Metadata filtering is essential** — Raw vector search without metadata pre-filtering returns irrelevant results. Always combine vector similarity with structured filters.
- **Dimension reduction** — Higher dimensions = more memory, slower search. Use PCA or Matryoshka embeddings to reduce dimensions without losing accuracy.

### Key Patterns

1. **Index Selection** — Match the index type to your use case.

| Index | Use Case | Speed | Memory | Accuracy |
|-------|----------|-------|--------|----------|
| HNSW | Low-latency production | Fastest | High | Best |
| IVF | Large-scale, some latency OK | Fast | Medium | Good |
| Flat | <100k vectors, brute-force | Slow | Low | Exact |
| DiskANN | Billion-scale, limited RAM | Medium | Low | Good |

2. **Hybrid Search** — Combine vector similarity with keyword (BM25) for better recall.

```python
results = db.hybrid_search(
    vector=embed("quantum computing"),  # semantic
    keywords=["quantum", "QPU"],         # lexical
    alpha=0.7,  # 0.7 vector + 0.3 keyword
    filter={"year": {"$gte": 2023}}
)
```

3. **Metadata Filtering Strategy** — Apply filters before or during vector search. Pre-filtering (apply filter, then search) works for selective queries. Post-filtering (search, then filter) works for broad queries.

4. **Batching and Caching** — Batch embeddings to maximize throughput. Cache frequent queries in Redis. Implement TTL-based cache invalidation.

## Checklist

- [ ] Embedding model is evaluated on domain-specific data before production deployment
- [ ] Index type matches the query pattern (HNSW for low-latency, IVF for cost-sensitive)
- [ ] Metadata filters are indexed (not just stored)
- [ ] Dimension reduction is applied for high-dimensional embeddings (>1024)
- [ ] Monitoring tracks recall@k and query latency
- [ ] Caching layer exists for frequent queries
- [ ] Backup and restore strategy for vector indexes

## Common Pitfalls

- **Ignoring the curse of dimensionality** — Over 1024 dimensions, distance metrics become less meaningful. Reduce dimensions or use a different metric.
- **No re-indexing strategy** — Vectors added over time degrade index quality. Schedule periodic re-indexing.
- **Over-filtering** — Too many metadata filters can exclude all relevant results. Design for graceful degradation.
- **Using Euclidean for normalized vectors** — Cosine similarity is equivalent to Euclidean on normalized vectors but more intuitive.
