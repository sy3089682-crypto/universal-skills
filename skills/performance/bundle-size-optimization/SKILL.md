---
name: bundle-size-optimization
description: Use when optimizing JavaScript bundles — code splitting, tree shaking, dynamic imports, bundle analysis, dependency auditing, and CDN delivery
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "performance", version: "1.0.0", author: "universal-skills" }
---

# Bundle Size Optimization

## Domain Expertise

### Core Principles
- **Measure first** — Run bundle analyzer before and after every optimization
- **Tree-shaking works at module level** — Named exports from ES modules tree-shake better than default exports
- **Code-split by route, not by component** — Route-based splitting gives the best user-perceived improvement
- **Critical CSS inlined** — Inline above-the-fold CSS in `<head>`; lazy-load the rest

### Key Patterns
1. **Bundle Analysis** — Use `webpack-bundle-analyzer` or `vite-bundle-visualizer`. Identify large dependencies and duplicate libraries.
2. **Route-Based Code Splitting** — `React.lazy(() => import('./Page'))` with `<Suspense>`. Next.js does this automatically per page.
3. **Dependency Auditing** — Check bundle cost of each dependency. Replace heavy libraries with lighter alternatives (e.g., date-fns over moment, zustand over redux).
4. **Dynamic Import for Heavy Components** — Charts, code editors, image editors → load on demand, not at bootstrap.

## Checklist

- [ ] Bundle analyzer is run and large dependencies are identified
- [ ] Route-based code splitting is in place
- [ ] Heavy libraries (charts, editors, maps) are dynamically imported
- [ ] Moment.js is replaced with date-fns or native Date
- [ ] Lodash uses per-method imports (`lodash/map` instead of `lodash`)
- [ ] Duplicate dependencies are resolved (check `npm dedupe` or `yarn-deduplicate`)

## Common Pitfalls

- **Importing entire libraries** — `import { map } from 'lodash'` still imports the whole library in some bundler configs
- **Dynamic imports without loading states** — A split chunk that downloads slowly needs a loading spinner or skeleton
- **Over-splitting** — Too many tiny chunks create HTTP overhead; find the sweet spot (30-50 KB per chunk)
- **Forgetting vendor chunk** — Vendor dependencies change rarely; separate them for long-term caching

## References

- Webpack: Code splitting
- Vite: Build optimizations
- BundlePhobia: Check dependency size
