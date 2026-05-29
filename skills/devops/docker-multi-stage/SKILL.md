---
name: docker-multi-stage
description: Use when creating or optimizing Dockerfiles — multi-stage builds, layer caching, distroless images, security scanning, and image size optimization
license: MIT
compatibility: { opencode: ">=1.0", claude-code: ">=1.0" }
metadata: { category: "devops", version: "1.0.0", author: "universal-skills" }
---

# Docker Multi-Stage Builds

## Domain Expertise

### Core Principles
- **One concern per stage** — Build, test, publish, run
- **Minimize layers** — Combine RUN commands; use `&& \` chaining
- **Smallest possible runtime** — Distroless or scratch for production
- **Leverage cache** — Order COPY instructions from least to most frequently changing

### Key Patterns
1. **Multi-Stage Build** — Stage 1 (build deps + compile), Stage 2 (runtime only, copy artifacts)
2. **Distroless Images** — `gcr.io/distroless/base` contains only the app and its runtime deps — no shell, no package manager
3. **Layer Cache Optimization** — `COPY package*.json` before source code; `RUN npm ci` before `COPY .`
4. **Health Checks** — `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/health`

## Checklist

- [ ] Production image has no build tools, shells, or package managers
- [ ] Layers are ordered by change frequency (stable first, volatile last)
- [ ] Image is scanned for vulnerabilities (Trivy, Docker Scout)
- [ ] HEALTHCHECK instruction is defined
- [ ] Multi-stage build separates compile from runtime
- [ ] `.dockerignore` excludes node_modules, .git, and build artifacts

## Common Pitfalls

- **Installing dev dependencies in production image** — Use `npm ci --production` in final stage
- **COPY before RUN** — Copy package files first, then source code, to maximize cache hits
- **Running as root** — Use `USER` directive with a non-root user
- **Hardcoding secrets** — Use build args with `--secret` or Docker Compose secrets

## References

- Docker: Multi-stage builds docs
- Docker: Best practices for writing Dockerfiles
- Google: Distroless container images
