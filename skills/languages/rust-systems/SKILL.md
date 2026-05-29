---
name: rust-systems
description: Use when building systems software in Rust — ownership, borrowing, lifetimes, error handling, concurrency (Send/Sync), unsafe patterns, and FFI
tags: [languages, rust, systems]
version: 1.0.0
---

# Rust Systems Programming

## Domain Expertise

### Core Principles
- **Ownership drives everything** — Every value has exactly one owner. References borrow without owning. The borrow checker enforces this at compile time.
- **Fearless concurrency** — If it compiles, it's thread-safe (Send + Sync). Data races are prevented at compile time, not runtime.
- **Error handling via types** — `Result<T, E>` for recoverable errors, `Option<T>` for optional values, `panic!` only for unrecoverable states.
- **Zero-cost abstractions** — High-level expressiveness with no runtime overhead; generics are monomorphized, closures are inlined.

### Key Patterns

1. **Type State Builder** — Use the type system to enforce correct builder usage.

```rust
struct ConfigBuilder<A, B> {
    api_key: Option<String>,
    endpoint: Option<String>,
    _marker: PhantomData<(A, B)>,
}

impl ConfigBuilder<Missing, Missing> {
    pub fn new() -> Self { ... }
    pub fn api_key(self, key: String) -> ConfigBuilder<Present, Missing> { ... }
}

impl ConfigBuilder<Present, Present> {
    pub fn build(self) -> Result<Config, Error> { ... }
}
```

2. **Error Handling with thiserror** — Derive `Error` for domain errors. Use `anyhow` in application code for context.

```rust
#[derive(thiserror::Error, Debug)]
pub enum ApiError {
    #[error("HTTP request failed: {0}")]
    Http(#[from] reqwest::Error),
    #[error("Rate limited, retry after {retry_after}s")]
    RateLimited { retry_after: u64 },
    #[error("Unexpected status: {status}")]
    UnexpectedStatus { status: StatusCode },
}
```

3. **RAII Guards** — Scoped resource management via the Drop trait. Lock guards, file handles, and connection pools use this pattern.

4. **Arc<Mutex<T>> vs channel** — Shared state: `Arc<Mutex<T>>`. Message passing: `crossbeam_channel` or `tokio::sync::mpsc`. Default to channels for coordination, mutex for state.

## Checklist

- [ ] No `unwrap()` or `expect()` in production code — use `?` or pattern matching
- [ ] Error types derive `thiserror::Error` with descriptive `#[error]` messages
- [ ] All unsafe blocks have a SAFETY comment explaining the invariant
- [ ] Send + Sync are implemented correctly (or explicitly bounded)
- [ ] No `Rc` across thread boundaries (use `Arc`)
- [ ] Clippy runs in CI with no warnings
- [ ] Public API surfaces have doc examples (`/// ``` ``` ///`)

## Common Pitfalls

- **Overusing `clone()`** — Clone is a code smell for ownership problems. Restructure to use references where possible.
- **Unnecessary `Box<dyn Trait>`** — Static dispatch with generics is faster. Use trait objects only when you need dynamic dispatch.
- **Ignoring `#[must_use]`** — Return values that should not be discarded need `#[must_use]`.
- **Lifetime anxiety** — If fighting the borrow checker, the design is wrong. Restructure data ownership instead of adding lifetimes.
