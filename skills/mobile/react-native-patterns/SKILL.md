---
name: react-native-patterns
description: Use when building React Native apps — navigation, state management, platform-specific code, performance, animations, and native module integration
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "mobile", version: "1.0.0", author: "universal-skills" }
---

# React Native Patterns

## Domain Expertise

### Core Principles
- **Write once, compose everywhere** — Share logic; customize UI per platform
- **Bridge vs Native** — Minimize bridge traffic; batch updates where possible
- **Flat over deep** — Flatter component trees are faster to render
- **Hermes for production** — Hermes engine reduces startup time and binary size

### Key Patterns
1. **Navigation** — React Navigation with native stack. Deep linking config matches app structure.
2. **Platform-Specific Code** — `.ios.tsx` / `.android.tsx` extensions for platform-specific components. `Platform.select()` for minor differences.
3. **FlashList over FlatList** — FlashList from Shopify significantly outperforms FlatList for long lists
4. **Image Optimization** — `react-native-fast-image` for cached, prioritized image loading

## Checklist

- [ ] Navigation uses native stack (not JavaScript-driven)
- [ ] Long lists use FlashList (not FlatList)
- [ ] Images are sized explicitly to avoid layout shifts
- [ ] Hermes is enabled for production builds
- [ ] Deep links work from cold start
- [ ] KeyboardAvoidingView handles input on both platforms

## Common Pitfalls

- **Not testing on low-end devices** — Performance differs drastically between iPhone 16 and budget Android
- **Over-rendering** — Unnecessary re-renders from inline functions and objects in props
- **Bridge saturation** — Large data transfers across the bridge block the UI thread

## References

- React Native: Performance overview
- Shopify: FlashList docs
- React Navigation: Best practices
