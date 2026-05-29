---
name: typescript-advanced
description: Use when writing advanced TypeScript — conditional types, mapped types, template literals, discriminated unions, branded types, and type-level programming
tags: [languages, typescript, frontend, backend]
version: 1.0.0
---

# TypeScript Advanced Patterns

## Domain Expertise

### Core Principles
- **Model your data, then your functions** — Types describe the shape of your domain; functions transform those shapes
- **Prefer unions over enums** — String literal unions are more flexible, tree-shakeable, and serializable
- **Branded types for primitive safety** — Prevent passing a raw `string` where a `UserId` is expected
- **Never is your friend** — Exhaustive checks with `never` catch unhandled cases at compile time

### Key Patterns

1. **Branded Types** — Add a phantom type marker to prevent mixing up primitives.

```typescript
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function getUser(id: UserId): User { ... }
// getUser("abc") — type error
// getUser("abc" as UserId) — works
```

2. **Discriminated Unions** — Single `type` field drives exhaustive narrowing.

```typescript
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function handle<T>(r: Result<T, Error>): T {
  if (r.ok) return r.value;
  throw r.error;
}
```

3. **Template Literal Types** — Derive types from string patterns.

```typescript
type EventName = `on${Capitalize<string>}`;
type CSSValue = `${number}${"px" | "em" | "rem" | "%"}`;
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

type Route = `/${string}`;
type APIEndpoint = `https://api.example.com${Route}`;
```

4. **Conditional + Mapped Types** — Transform types based on conditions.

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
```

## Checklist

- [ ] Primitive types at domain boundaries use branding or nominal typing
- [ ] Discriminated unions handle all cases (exhaustive `never` check)
- [ ] `strict: true` in tsconfig (no `strictNullChecks` alone)
- [ ] No `any` — use `unknown` + type guards instead
- [ ] Utility types extracted to a shared `types/utils.ts`
- [ ] Function signatures model both input constraints and output guarantees

## Common Pitfalls

- **Over-engineering types** — A simple `interface` is often better than a complex conditional type
- **Using `any` to silence errors** — `any` disables all type checking; use `unknown` and narrow
- **Not using `satisfies`** — `satisfies` checks a type without widening it, preserving the literal type
- **Ignoring `tsconfig` strict mode** — Without strict, many type bugs are silently allowed
