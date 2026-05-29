---
name: go-patterns
description: Use when building Go applications — interfaces, goroutines, channels, error handling, struct composition, testing with table-driven tests, and HTTP middleware
tags: [languages, go, backend]
version: 1.0.0
---

# Go Patterns

## Domain Expertise

### Core Principles
- **Simplicity over cleverness** — Go rewards straightforward code. A plain loop is better than a complex abstraction.
- **Composition over inheritance** — Struct embedding replaces inheritance. Interfaces define behavior implicitly.
- **Errors are values** — Handle errors explicitly everywhere. No exceptions. No silent failures.
- **Share memory by communicating** — Use channels to pass data between goroutines. Don't use shared state with mutexes by default.

### Key Patterns

1. **Interface Segregation** — Define small, focused interfaces. Accept interfaces, return structs.

```go
type Storer interface {
    Get(ctx context.Context, id string) (Item, error)
    Set(ctx context.Context, item Item) error
}

type CacheStorer struct {
    client *redis.Client
}

func (c *CacheStorer) Get(ctx context.Context, id string) (Item, error) { ... }
func (c *CacheStorer) Set(ctx context.Context, item Item) error { ... }
```

2. **Table-Driven Tests** — Single test function, array of cases.

```go
func TestParseDuration(t *testing.T) {
    tests := []struct {
        name  string
        input string
        want  time.Duration
        err   bool
    }{
        {"seconds", "30s", 30 * time.Second, false},
        {"invalid unit", "30x", 0, true},
        {"negative", "-5m", 0, true},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := ParseDuration(tt.input)
            if (err != nil) != tt.err { t.Errorf("ParseDuration(%q) error = %v", tt.input, err) }
            if got != tt.want { t.Errorf("ParseDuration(%q) = %v, want %v", tt.input, got, tt.want) }
        })
    }
}
```

3. **HTTP Middleware Pattern** — Decorate `http.Handler` with composable middleware.

```go
func RateLimit(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if !limiter.Allow() {
            http.Error(w, "429 Too Many Requests", http.StatusTooManyRequests)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

4. **Fan-Out / Fan-In** — Distribute work across goroutines, collect results.

```go
func processItems(ctx context.Context, items []Item) []Result {
    jobs := make(chan Item, len(items))
    results := make(chan Result, len(items))

    for range 10 { // 10 workers
        go worker(ctx, jobs, results)
    }

    for _, item := range items { jobs <- item }
    close(jobs)

    var out []Result
    for range items { out = append(out, <-results) }
    return out
}
```

## Checklist

- [ ] All errors are handled (no `_ =` swallowing)
- [ ] `go vet` and `staticcheck` pass in CI
- [ ] Tests follow table-driven pattern
- [ ] Context is propagated through all function signatures
- [ ] No global state — dependencies are injected
- [ ] `defer` for cleanup (closing files, unlocking mutexes)
- [ ] `go mod tidy` keeps dependencies clean

## Common Pitfalls

- **Ignoring the zero value** — `var s []string` is nil, not empty. `json.Marshal` produces `null` for nil slices. Use `make` or literal initialization.
- **Value receiver vs pointer receiver** — Value receivers operate on a copy. Pointer receivers can modify. Be consistent: if any method needs a pointer, use pointer for all.
- **Not closing response body** — `resp.Body.Close()` must be called even if the body is discarded.
- **Context.Background() in libraries** — Use `context.TODO()` during development. Accept context from the caller.
