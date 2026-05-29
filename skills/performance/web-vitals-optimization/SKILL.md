---
name: web-vitals-optimization
description: Use when optimizing frontend performance — LCP, CLS, INP, FID, Core Web Vitals, lazy loading, resource hints, and performance budgets
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "performance", version: "1.0.0", author: "universal-skills" }
---

# Web Vitals Optimization

## Domain Expertise

### Core Principles
- **LCP < 2.5s** — Largest Contentful Paint. Optimize hero image, text rendering, and server response time.
- **CLS < 0.1** — Cumulative Layout Shift. Set explicit dimensions for images, embeds, and ads.
- **INP < 200ms** — Interaction to Next Paint. Minimize main-thread blocking; debounce expensive handlers.
- **Measure, then optimize** — Lab data (Lighthouse) catches issues; field data (RUM) shows real user impact.

### Key Patterns
1. **Image Optimization** — Next/Image or `loading="lazy"` + `fetchpriority="high"` for hero images. Use WebP/AVIF, responsive sizes, proper aspect ratio.
2. **Font Optimization** — `font-display: swap` or `optional`. Subset fonts. Preload critical fonts with `<link rel="preload">`.
3. **Resource Hints** — `preconnect` for third-party origins, `preload` for critical assets, `prefetch` for likely-next-page assets
4. **JS Optimization** — Code-split by route, lazy-load non-critical components, defer third-party scripts. Use `module/nomodule` for modern bundles.

## Checklist

- [ ] LCP element is identified and optimized (image: fetchpriority, font: preload)
- [ ] All images and embeds have explicit width/height to prevent CLS
- [ ] Third-party scripts are deferred or loaded async
- [ ] Fonts are subsetted and use `font-display: swap`
- [ ] Performance budget is set and tracked in CI
- [ ] RUM (Real User Monitoring) is in place to track field data

## Common Pitfalls

- **Optimizing without measuring** — Guessing at bottlenecks instead of profiling
- **Ignoring CLS on dynamic content** — Ads, embeds, and injected content without dimensions
- **Over-preloading** — Preloading everything instead of only critical resources
- **Mobile not tested** — Desktop performance doesn't reflect 3G device experience

## References

- web.dev: Core Web Vitals
- Lighthouse: Performance scoring
- Calibre: Web performance guide
