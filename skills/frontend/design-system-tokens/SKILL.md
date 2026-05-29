---
name: design-system-tokens
description: Use when building or maintaining a design system — design tokens, CSS custom properties, component APIs, theming, dark mode, and documentation
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "frontend", version: "1.0.0", author: "universal-skills" }
---

# Design System & Tokens

## Domain Expertise

### Core Principles
- **Single source of truth** — Tokens drive all visual decisions; no magic values
- **Three-layer architecture** — Primitive → Semantic → Component tokens
- **Platform-agnostic tokens** — Define in JSON; generate CSS, Swift, Kotlin from them
- **Accessible by default** — Token values enforce contrast ratios and spacing rhythm

### Key Patterns
1. **Token Layers** — Primitives (color/red-500, size/4), Semantics (color/danger, spacing/md), Components (button/background, card/padding)
2. **Dark Mode** — Semantic token swapping at the theme level; components never reference primitives directly
3. **Theme Architecture** — CSS custom properties on `:root` for light, `[data-theme="dark"]` for dark. Components reference `var(--color-bg-primary)`.
4. **Spacing Scale** — Geometric progression (4, 8, 12, 16, 24, 32, 48, 64) or Fibonacci

## Checklist

- [ ] All colors, spacing, typography, and shadows use design tokens
- [ ] Semantic tokens exist for critical color roles (bg-primary, text-primary, border-default)
- [ ] Dark mode works by swapping semantic tokens only
- [ ] Token documentation includes usage guidance, not just values
- [ ] Token naming is consistent (namespace/semantic/variant pattern)

## Common Pitfalls

- **Flat token names** — `red` is ambiguous; `color/danger-surface` is specific
- **Components referencing primitives** — Components should use semantic tokens for theming
- **Missing dark mode tokens** — Every semantic token needs a dark value
- **Token drift** — Design files and code tokens get out of sync without automated checks

## References

- Design Tokens W3C Community Group
- Shopify: Polaris design system
- Salesforce: Lightning Design System
