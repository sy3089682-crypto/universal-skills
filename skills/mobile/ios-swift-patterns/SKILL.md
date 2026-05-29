---
name: ios-swift-patterns
description: Use when building iOS apps with Swift/SwiftUI — MVVM architecture, state management, Combine, async/await, Core Data, and App Store deployment
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "mobile", version: "1.0.0", author: "universal-skills" }
---

# iOS Swift Patterns

## Domain Expertise

### Core Principles
- **Value types by default** — Use structs over classes unless identity/shared mutability is needed
- **Single source of truth** — One store/repository per domain, observed by all consumers
- **Prefer SwiftUI** — UIKit for complex custom UI; SwiftUI for everything else
- **async/await over Combine** — Structured concurrency for most async work; Combine for reactive streams

### Key Patterns
1. **MVVM with ObservableObject** — ViewModel is `@Observable`; View observes published properties. Avoid putting business logic in Views.
2. **Swift Concurrency** — `async/await` for networking and DB; `Task { }` for fire-and-forget; `@MainActor` for UI updates
3. **Repository Pattern** — Data sources (API, Cache, DB) behind a repository protocol; ViewModel only knows the repository
4. **Dependency Injection** — Manual DI via initializer injection; Use `@Environment` for SwiftUI-specific services

## Checklist

- [ ] ViewModel uses `@Observable` (iOS 17+) or `ObservableObject` (older)
- [ ] Network calls use async/await with proper error handling
- [ ] Thread safety — UI updates on main actor, DB work on background
- [ ] Memory management — No reference cycles; use `[weak self]` where needed
- [ ] App handles background/foreground transitions gracefully

## Common Pitfalls

- **Massive ViewController** — Extract logic into ViewModels and services
- **Main thread blocking** — Heavy work on the main thread causes UI stutter
- **Not handling optionals** — Forced unwrapping leads to crashes
- **Ignoring accessibility** — SwiftUI accessibility is mostly automatic; verify with VoiceOver

## References

- Apple: SwiftUI documentation
- Apple: Concurrency migration guide
- NSHipster: Swift best practices
