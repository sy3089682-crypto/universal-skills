---
name: react-nextjs-patterns
description: Use when building React or Next.js apps — Server Components, data fetching, routing, layouts, streaming, ISR, and state management patterns
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "frontend", version: "1.0.0", author: "universal-skills" }
---

# React & Next.js Patterns

## Domain Expertise

### Core Principles
- **Push logic to the server** — Server Components, server actions, route handlers
- **Colocate data fetching** — Fetch in the component that needs it (RSC makes this practical)
- **Minimize client bundles** — `"use client"` is a boundary, not a default
- **Stream early** — Send the shell immediately, stream in async content

### Key Patterns
1. **Server Components First** — Default to RSC; only add `"use client"` for interactivity (hooks, event handlers, browser APIs)
2. **Data Fetching** — Fetch in Server Components with `async`; deduplicate with React `cache()`
3. **Streaming & Suspense** — Wrap slow components in `<Suspense>` with fallbacks; use `loading.tsx` for pages
4. **Route Groups** — Organize routes without affecting URL structure; create separate layouts for auth, dashboard, public

## Checklist

- [ ] Default to Server Components; `"use client"` only where needed
- [ ] Data fetching is colocated with consuming components
- [ ] Loading states via `<Suspense>` or `loading.tsx`
- [ ] Error boundaries via `error.tsx` for each route segment
- [ ] Image optimization with `next/image`
- [ ] Proper font loading with `next/font`
- [ ] Route segments have appropriate revalidation strategies (ISR, dynamic, static)

## Common Pitfalls

- **Over-using `"use client"`** — Everything that doesn't need interactivity stays on the server
- **Fetching in Client Components** — Move data fetching to the parent Server Component
- **Not using streaming** — A slow data fetch blocks the entire page render
- **Large client bundles** — Use dynamic imports with `next/dynamic` for heavy components

## References

- Next.js: RSC docs
- React: Server Components
- Vercel: Data fetching patterns
