---
name: rate-limiting
description: Use when implementing API rate limiting — token bucket, sliding window, Redis-backed counters, header propagation, distributed limiting, and backpressure
tags: [backend, security, performance]
version: 1.0.0
---

# Rate Limiting

## Domain Expertise

### Core Principles
- **Limit at the right layer** — Gateway (global), application (per-endpoint), or database (per-query). Apply multiple layers.
- **Inform the client** — Always return `429 Too Many Requests` with `Retry-After` header and current rate limit status.
- **Distributed requires shared state** — For multi-instance deployments, rate limiting must use Redis or similar. Local in-memory counters drift across instances.
- **Graceful degradation** — When the rate limiter itself is overloaded, fail open (allow the request) rather than denying all traffic.

### Key Patterns

1. **Token Bucket** — Simple, allows bursts. Parameters: refill rate, bucket capacity.

```typescript
class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  constructor(private capacity: number, private refillRate: number) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  allow(): boolean {
    this.refill();
    if (this.tokens >= 1) { this.tokens--; return true; }
    return false;
  }
  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}
```

2. **Sliding Window Log** — Accurate, stores timestamps in a sorted set (Redis). Memory-heavy but precise.

```
Sliding Window (Redis):
  ZREMRANGEBYSCORE user:42:requests 0 <(now - 60s)
  ZCARD user:42:requests
  if < limit → ZADD user:42:requests TIMESTAMP TIMESTAMP; allow
  else → deny with retry-after
```

3. **Rate Limit Headers** — Standard headers every API should return.

```
RateLimit-Limit: 100
RateLimit-Remaining: 42
RateLimit-Reset: 1620000000
Retry-After: 30
```

4. **Distributed Rate Limiting** — Use Redis Lua scripts for atomic increments.

```lua
-- atomic_sliding_window.lua
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
redis.call('ZREMRANGEBYSCORE', key, 0, now - window * 1000)
local count = redis.call('ZCARD', key)
if count < limit then
  redis.call('ZADD', key, now, now)
  redis.call('EXPIRE', key, window)
  return {1, limit - count - 1}
end
return {0, 0}
```

## Checklist

- [ ] Rate limiter uses shared state (Redis) for multi-instance deployments
- [ ] `429` responses include `Retry-After` and rate limit headers
- [ ] Different limits for different endpoints (auth: strict, public: moderate)
- [ ] Rate limiter has a health check and fail-open mechanism
- [ ] Rate limit configuration is hot-reloadable or deployable without downtime
- [ ] Excessive rate limit violations trigger alerts (possible DDoS)
- [ ] Rate limiter is tested under load (k6, wrk, artillery)

## Common Pitfalls

- **Fail-closed when Redis is down** — If the rate limiter can't reach Redis, it shouldn't block all traffic. Fail open and log.
- **No IP-based limits for anonymous traffic** — Authenticated users can be limited by user ID. Anonymous traffic needs IP-based limits.
- **Clock skew in distributed limiting** — Sliding window algorithms are sensitive to time drift. Use NTP-synchronized clocks.
- **Rate limiting health checks** — Health check endpoints shouldn't count toward rate limits.
