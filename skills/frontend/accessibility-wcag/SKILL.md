---
name: accessibility-wcag
description: Use when building or auditing web UIs for accessibility — WCAG 2.1 AA compliance, ARIA roles/labels, keyboard navigation, screen reader support, focus management, and color contrast
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "frontend", version: "1.0.0", author: "universal-skills" }
---

# Accessibility (WCAG)

## Domain Expertise

### Core Principles
- **Semantic HTML first** — Native HTML elements have built-in accessibility
- **Keyboard accessible** — Every interactive element must be reachable and operable via keyboard
- **Don't break screen readers** — Proper ARIA labels, roles, live regions, and focus management
- **Color is not the only indicator** — Use icons, text, and patterns alongside color

### Key Patterns
1. **Skip Links** — First focusable element on the page, links to main content. Visually hidden until focused.
2. **Focus Trapping** — For modals and dialogs, trap focus within the overlay. Close on Escape.
3. **Live Regions** — `aria-live="polite"` for dynamic content updates (notifications, chat). `assertive` only for critical alerts.
4. **Reduced Motion** — Respect `prefers-reduced-motion` media query. Replace animations with transitions or static states.

## Checklist

- [ ] All images have `alt` text (decorative images have `alt=""`)
- [ ] Color contrast ratio >= 4.5:1 for normal text, >= 3:1 for large text
- [ ] All interactive elements are keyboard accessible (Tab, Enter, Escape)
- [ ] Form inputs have associated `<label>` elements
- [ ] Focus indicators are visible (not `outline: none` without replacement)
- [ ] Page has a logical heading hierarchy (h1 → h2 → h3)
- [ ] Modals trap focus and close on Escape

## Common Pitfalls

- **Relying only on color** — Error states must include text/icon indicators, not just red borders
- `**aria-hidden="true"**` **on focusable elements** — This makes the element invisible to screen readers but still focusable
- **Missing focus management** — After navigation or dialog close, focus should go to a logical element
- **Overriding browser defaults** — Custom components missing native keyboard handling

## References

- WCAG 2.1: Quick Reference
- A11y Project: Checklist
- WebAIM: Contrast checker
