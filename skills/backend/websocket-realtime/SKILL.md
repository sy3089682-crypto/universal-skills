---
name: websocket-realtime
description: Use when implementing real-time features with WebSockets — connection management, reconnection, heartbeat, pub/sub, scaling, and backpressure
tags: [backend, realtime, websocket]
version: 1.0.0
---

# WebSocket & Realtime

## Domain Expertise

### Core Principles
- **Connection lifecycle matters** — Every connection has: open → handshake → active → heartbeat → close. Handle every transition explicitly.
- **Reconnection is not optional** — Networks fail, proxies close idle connections, servers restart. Clients must reconnect transparently.
- **Heartbeats keep connections alive** — Proxies and load balancers drop idle TCP connections. Send periodic pings/pongs to keep them open.
- **Backpressure prevents OOM** — A slow consumer can buffer messages until the server runs out of memory. Implement backpressure at every layer.

### Key Patterns

1. **Connection Manager** — Track all connections with metadata (user, room, connectedAt). Handle graceful cleanup on disconnect.

```typescript
class ConnectionManager {
  private connections = new Map<string, WebSocket>();
  
  add(id: string, ws: WebSocket, meta: ConnectionMeta) {
    this.connections.set(id, ws);
    ws.on("close", () => {
      this.connections.delete(id);
      this.emit("disconnect", { id, reason: ws.closeReason });
    });
  }
  
  broadcast(room: string, message: object) {
    for (const [id, ws] of this.connections) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    }
  }
}
```

2. **Heartbeat / Ping-Pong** — Server sends ping every N seconds. Client must respond with pong within timeout. Missed pong = close connection.

```typescript
// Server-side heartbeat
setInterval(() => {
  for (const ws of connections.values()) {
    if (ws.readyState !== WebSocket.OPEN) continue;
    ws.ping();
    ws._heartbeatDeadline = Date.now() + 10_000;
  }
}, 25_000);

ws.on("pong", () => { ws._heartbeatDeadline = null; });
ws.on("close", () => { /* cleanup heartbeat tracking */ });
```

3. **Pub/Sub Adapter** — For multi-instance deployments, use Redis pub/sub or a message broker to broadcast messages across all instances.

```
Instance A → Redis PUBLISH room:chat message
Instance B → Redis SUBSCRIBE room:chat → broadcast to local connections
```

4. **Exponential Backoff Reconnection** — Client retries with increasing delay.

```typescript
function connect(url: string, attempt = 0) {
  const delay = Math.min(1000 * Math.pow(2, attempt), 30_000);
  const jitter = delay * (0.5 + Math.random() * 0.5);
  setTimeout(() => {
    const ws = new WebSocket(url);
    ws.on("open", () => { attempt = 0; });
    ws.on("close", () => { connect(url, attempt + 1); });
  }, jitter);
}
```

## Checklist

- [ ] Heartbeat mechanism is implemented (ping/pong every 25-30s)
- [ ] Client implements exponential backoff reconnection with jitter
- [ ] Connection manager cleans up stale connections
- [ ] Pub/sub adapter enables cross-instance broadcasting
- [ ] Backpressure is implemented (slow consumer detection, message queuing limits)
- [ ] WebSocket close codes are meaningful (1000=normal, 1001=going away, 1008=policy violation)
- [ ] Rate limiting on message send (per user, per room)
- [ ] TLS/WSS is used in production (no unencrypted WebSocket)

## Common Pitfalls

- **No heartbeat** — Proxies (Nginx, HAProxy, AWS ALB) drop idle connections after 60s. Heartbeats keep them alive.
- **Memory leaks from unclosed connections** — Every `on("message")` listener that's not cleaned up leaks memory on reconnect.
- **Broadcasting to all instances without pub/sub** — A direct broadcast only reaches connections on the current instance.
- **Blocking the event loop** — JSON.stringify on large objects blocks the event loop. Offload or limit message size.
