---
name: responsive-mobile-ux
description: Use when building responsive UIs — breakpoints, mobile-first CSS, touch targets, safe areas, keyboard avoidance, and performance on low-end devices
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "frontend", version: "1.0.0", author: "universal-skills" }
---

# Responsive Mobile UX

## Domain Expertise

### Core Principles
- **Mobile-first CSS** — Base styles are mobile; media queries add complexity for larger screens
- **Touch targets >= 44px** — WCAG minimum; 48px recommended for comfort
- **Respect safe areas** — Notch, home indicator, rounded corners on modern phones
- **Optimize for flaky networks** — Skeleton loaders, optimistic UI, offline support

### Key Patterns
1. **Mobile-First Breakpoints** — `@media (min-width: 640px)` sm, `768px` md, `1024px` lg, `1280px` xl
2. **Safe Area Insets** — `env(safe-area-inset-*)` for notched devices; padding respects the safe area automatically on newer CSS
3. **Bottom Navigation** — Persistent nav bar at the bottom (iOS/Android convention); max 5 items
4. **Touch Feedback** — Active state on touch (`:active`); no 300ms delay (use `touch-action: manipulation`)

## Checklist

- [ ] Touch targets are at least 44px (48px preferred)
- [ ] Content respects safe areas (notch, home indicator)
- [ ] Keyboard doesn't obscure focused inputs
- [ ] Offline/loading states are visually indicated
- [ ] No horizontal scrolling at 320px viewport width
- [ ] Font sizes are >= 16px to prevent iOS zoom on input focus

## Common Pitfalls

- **Desktop-first media queries** — Mobile gets the complex overridden styles
- **Ignoring safe areas** — Content hidden behind notch or home indicator
- **No touch feedback** — Taps feel unresponsive without visual feedback
- **Fixed headers covering content** — Account for fixed elements in scroll calculations

## References

- Apple: Human Interface Guidelines
- Google: Material Design (mobile)
- WCAG: Target Size
