---
name: memory-leak-detection
description: Use when debugging memory leaks in Node.js or browser apps — heap snapshots, Chrome DevTools, Node --inspect, event listener leaks, and closure retention
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "performance", version: "1.0.0", author: "universal-skills" }
---

# Memory Leak Detection

## Domain Expertise

### Core Principles
- **Reproduce consistently** — A leak you can trigger is a leak you can fix
- **Three snapshots** — Take heap snapshot before, during, and after the suspected leak operation
- **Look for detached DOM** — In browsers, elements removed from the DOM but still referenced by JavaScript
- **Node.js: growing RSS** — If Resident Set Size grows monotonically without plateau, it's a leak

### Key Patterns
1. **Heap Snapshots (Browser)** — Chrome DevTools Memory tab. Compare snapshots to find retained objects. Filter by "detached" for DOM leaks.
2. **Heap Snapshots (Node.js)** — `--inspect` flag + Chrome DevTools. Compare snapshots; look for growing object counts.
3. **Event Listener Leaks** — Event emitters that are never cleaned up. Use `EventEmitter.setMaxListeners(0)` and `process.on('warning')` to detect.
4. **Closure Retention** — Functions that close over large objects retain them in memory. Check DevTools "Closure" scope in the Call Stack.
5. **Caching Without Eviction** — Infinite-growth caches (LRU caches with no max size, memoization without TTL).

## Checklist

- [ ] Heap snapshots are captured and compared (before/after suspected leak operation)
- [ ] Event listeners are removed when components/services are destroyed
- [ ] Caches have max size or TTL eviction policies
- [ ] WebSocket connections are closed on unmount/logout
- [ ] Observables/subscriptions are unsubscribed on cleanup
- [ ] Closures don't accidentally retain large objects

## Common Pitfalls

- **Forgotten `setInterval`** — Timers that aren't cleared keep references to their callback scope
- **Global caches** — Objects attached to `global` or `window` never get garbage collected
- **Abandoned Promises** — Promises with no `.catch()` or `await` can keep references alive indefinitely
- **Third-party widget leaks** — Embedded widgets (chat, analytics) that don't provide cleanup methods

## References

- Chrome DevTools: Memory issues
- Node.js: Debugging memory leaks
- MDN: Memory management
