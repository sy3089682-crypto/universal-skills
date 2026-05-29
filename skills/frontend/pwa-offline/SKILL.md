---
name: pwa-offline
description: Use when building Progressive Web Apps — service workers, cache strategies (Cache First, Network First, Stale While Revalidate), Web App Manifest, offline fallback, and push notifications
tags: [frontend, pwa, mobile, performance]
version: 1.0.0
---

# PWA & Offline

## Domain Expertise

### Core Principles
- **Offline-first, not offline-only** — Design for connectivity but gracefully handle its absence. Serve cached content immediately, update from network when available.
- **Service worker is a proxy** — It sits between the browser and network. It can intercept requests, serve cached responses, and sync in the background.
- **Cache what the user sees** — Only cache pages and assets the user has actually visited. Don't pre-cache the entire site (waste of storage).
- **Progressive enhancement** — PWA features should work on modern browsers and degrade gracefully on older ones. They're enhancements, not requirements.

### Key Patterns

1. **Cache Strategies** — Choose the right strategy for each resource.

| Strategy | Use Case | Behavior |
|----------|----------|----------|
| Cache First | Static assets (CSS, JS, fonts) | Serve from cache, update in background |
| Network First | Dynamic pages (API, HTML) | Try network, fall back to cache |
| Stale While Revalidate | Immutable assets (images) | Serve cache immediately, update in background |
| Network Only | Mutations (POST, PUT, DELETE) | Never cache |

```javascript
// Cache First strategy
self.addEventListener("fetch", (event) => {
  if (event.request.url.match(/\.(css|js|woff2?)$/)) {
    event.respondWith(caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        caches.open("static-v1").then((cache) => cache.put(event.request, response.clone()));
        return response;
      });
      return cached || fetchPromise;
    }));
  }
});
```

2. **Offline Fallback Page** — When the user is offline and requesting a page not in cache.

```javascript
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((cached) => {
        return cached || caches.match("/offline.html");
      });
    })
  );
});
```

3. **Web App Manifest** — Makes the PWA installable.

```json
{
  "name": "Universal Skills",
  "short_name": "Skills",
  "description": "AI coding skills repository",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#7C3AED",
  "icons": [{ "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" }]
}
```

## Checklist

- [ ] Service worker is registered and active
- [ ] Cache strategy is defined per resource type
- [ ] Offline fallback page exists (`/offline.html`)
- [ ] Manifest is linked: `<link rel="manifest" href="/manifest.json">`
- [ ] App works offline after initial visit
- [ ] Push notifications are permission-based with opt-in
- [ ] Service worker is updated (skipWaiting + clients.claim on activate)
- [ ] Lighthouse PWA audit passes (installable, offline, fast)
- [ ] Background sync for queued mutations when offline

## Common Pitfalls

- **Cache-busting during updates** — Old service worker serves stale content. Version caches and clean up old versions in `activate`.
- **Service worker scope too narrow** — The SW only controls requests in its scope. Register at the highest level needed.
- **Not handling POST requests** — Offline POST requests fail silently. Queue them with Background Sync API.
- **Over-caching** — Don't cache everything. Audit what actually needs offline access.
