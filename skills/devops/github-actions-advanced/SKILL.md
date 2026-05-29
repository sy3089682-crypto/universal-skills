---
name: github-actions-advanced
description: Use when writing advanced GitHub Actions — composite actions, matrix builds, reusable workflows, caching, artifacts, OIDC, and self-hosted runners
tags: [devops, ci-cd, github-actions]
version: 1.0.0
---

# GitHub Actions Advanced

## Domain Expertise

### Core Principles
- **Reusable workflows save months** — Extract shared CI patterns into reusable workflows. Call them with `uses: ./.github/workflows/ci.yml`.
- **MATRIX is your friend** — Test across OS, Node versions, and dependency combinations with a single matrix strategy.
- **Cache everything** — Dependencies, build outputs, test databases. A well-cached workflow runs in 2 minutes instead of 10.
- **OIDC over static secrets** — Use OpenID Connect to authenticate to cloud providers. No long-lived credentials to rotate.

### Key Patterns

1. **Composite Action** — Bundle multiple steps into a reusable action within your repo.

```yaml
# .github/actions/setup-project/action.yml
name: "Setup Project"
description: "Install deps and build"
inputs:
  node-version:
    required: true
    default: "20"
runs:
  using: "composite"
  steps:
    - uses: actions/setup-node@v4
      with: { node-version: "${{ inputs.node-version }}" }
    - uses: actions/cache@v4
      with:
        path: node_modules
        key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
    - run: npm ci
      shell: bash
```

2. **Matrix Builds** — Test across versions and configurations.

```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [18, 20, 22]
        include:
          - os: ubuntu-latest
            node: 20
            coverage: true  # only run coverage on one combo
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "${{ matrix.node }}" }
      - run: npm ci
      - run: npm test
      - if: matrix.coverage
        run: npm run coverage
```

3. **Reusable Workflow** — Define once, call from any repo.

```yaml
# .github/workflows/deploy.yml (called workflow)
on:
  workflow_call:
    inputs:
      environment: { required: true, type: string }
    secrets:
      CLOUD_TOKEN: { required: true }

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh ${{ inputs.environment }}
        env:
          TOKEN: ${{ secrets.CLOUD_TOKEN }}
```

## Checklist

- [ ] Composite actions for shared setup steps
- [ ] Matrix strategy for cross-platform/cross-version testing
- [ ] Reusable workflows for deployment pipelines
- [ ] Caching configured for dependencies and build outputs
- [ ] OIDC used instead of long-lived credentials
- [ ] Workflow timeouts set (default 360m is too long)
- [ ] Concurrency groups prevent duplicate runs
- [ ] Workflow is tested with `act` locally before pushing

## Common Pitfalls

- **Hardcoding secrets** — Use GitHub secrets or OIDC, never `echo $TOKEN` in a script
- **No concurrency control** — Multiple pushes to the same branch trigger overlapping deployments
- **Caching too aggressively** — Stale `node_modules` cache causes "module not found" errors; invalidate on lockfile change
- **Ignoring the 6-hour timeout** — Long-running workflows hit the default 360-minute limit. Set explicit timeouts.
