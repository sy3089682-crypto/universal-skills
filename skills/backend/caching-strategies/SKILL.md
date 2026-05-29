---
name: caching-strategies
description: Use when implementing caching — HTTP caching, Redis/Memcached, CDN, cache invalidation, stampede prevention, write-through/write-behind, and TTL strategies
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "backend", version: "1.0.0", author: "universal-skills" }
---

# Caching Strategies

## Domain Expertise

### Core Principles
- **Cache at the right layer** — Browser (Cache-Control), CDN, application (Redis), database (query cache)
- **Invalidation is hard** — Prefer TTL-based expiry over manual invalidation
- **Stampede prevention** — Use SET NX / lock-based recomputation for hot keys
- **Measure before caching** — Profile to find the actual bottleneck first

### Key Patterns
1. **Cache-Aside** — App checks cache first; on miss, loads from DB and writes to cache
2. **Write-Through** — Every write goes to cache first, then DB synchronously
3. **Write-Behind** — Writes go to cache, then asynchronously batched to DB
4. **Cache Stampede Prevention** — On cache miss, acquire a lock; only the lock holder recomputes; others wait
5. **Stale-While-Revalidate** — Serve stale cache immediately, refresh in background

## Checklist

- [ ] Cache key strategy is consistent and includes versioning for schema changes
- [ ] TTL values are set based on data staleness tolerance
- [ ] Cache stampede protection is in place for high-traffic keys
- [ ] Cache is invalidated on data mutations (or TTL handles it)
- [ ] Monitoring tracks cache hit/miss ratio and eviction rates

## Common Pitfalls

- **Caching personalized data globally** — Partition cache by user/tenant
- **Over-caching** — More cache != better; each layer adds complexity
- **No cache warming** — Cold cache after deploy causes a thundering herd
- **Stale cache on rollback** — Cache survives code rollbacks, serving stale data

## References

- Redis: Cache invalidation patterns
- AWS: Caching patterns and best practices
- HTTP Caching: RFC 7234
