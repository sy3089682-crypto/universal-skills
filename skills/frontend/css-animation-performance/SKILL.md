---
name: css-animation-performance
description: Use when animating on the web — GPU-accelerated properties, will-change, FLIP technique, reduced-motion, requestAnimationFrame, and layout thrashing prevention
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "frontend", version: "1.0.0", author: "universal-skills" }
---

# CSS Animation & Performance

## Domain Expertise

### Core Principles
- **Animate only `transform` and `opacity`** — These trigger compositing only, not layout or paint
- **Use `will-change` sparingly** — Hints the browser to prepare for changes; overuse wastes memory
- **Respect reduced motion** — `prefers-reduced-motion: reduce` to disable or simplify animations
- **60fps or bust** — Frame drops are noticeable; profile with DevTools Performance tab

### Key Patterns
1. **FLIP Technique** — First, Last, Invert, Play. Record start/end positions, apply transform to invert, then animate to identity. Natural-feeling layout animations.
2. **Compositor-Only Animation** — Use `transform: translate()` instead of `top/left`, `scale()` instead of `width/height`, `opacity` instead of `visibility`.
3. **requestAnimationFrame** — Use for JS-driven animations; it syncs with the browser's paint cycle. Avoid `setInterval` for animation.
4. **Reduced Motion** — Wrap animations in `@media (prefers-reduced-motion: no-preference)`. Provide static fallbacks.

## Checklist

- [ ] All animations use `transform` and `opacity` (not `width`, `height`, `top`, `left`)
- [ ] `will-change` is used only on actively animated elements and removed when animation ends
- [ ] `prefers-reduced-motion` is respected and tested
- [ ] Animations run at 60fps (verified with DevTools FPS meter)
- [ ] No layout thrashing — batch read/write operations on the DOM

## Common Pitfalls

- **Animating layout properties** — `width`, `height`, `margin`, `top` trigger layout recalculations
- **Animating too many elements** — Each composited layer costs GPU memory; dozens of simultaneous animations cause jank
- **Forcing expensive paints** — Animations on elements with `box-shadow`, `filter`, or `backdrop-filter` are expensive
- **No `transform: translateZ(0)`** — Elements that don't create a compositing layer animate on the main thread

## References

- Web.dev: Animations and performance
- CSS Tricks: FLIP animation technique
- Google: Animations guide
