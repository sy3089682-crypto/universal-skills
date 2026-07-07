# Package Artifact Verification

`universal-skills` is installer-first, so the packed npm tarball is a production surface.
A release is not trustworthy just because source files look correct in the repository. The packaged artifact also needs to contain the runtime assets that installs depend on.

## Why this exists

This guide documents the automated package-boundary gate that now complements the manual installer verification flow.

Use it to answer a simple release question:

> Does the npm package artifact actually include the files required for real installs?

## Local verification command

Run this before publishing, and whenever you change packaging-sensitive files:

```bash
node scripts/verify-package-artifact.js
```

The verifier creates an `npm pack` artifact in metadata mode, inspects the packaged file list, and fails if required runtime assets are missing.

## What the verifier currently enforces

### Required exact paths

- `package.json`
- `bin/universal-skills.js`
- `plugins/opencode/skill-router.ts`
- `scripts/install.sh`
- `scripts/install.ps1`
- `README.md`
- `LICENSE`

### Required packaged asset classes

- `skills/`

If any required file or asset class is missing from the tarball, verification fails before release.

## CI enforcement

The same protection runs in GitHub Actions:

- workflow: `.github/workflows/package-artifact-verification.yml`
- triggers:
  - manual dispatch
  - pull requests touching packaging-sensitive paths
  - pushes to `main` touching packaging-sensitive paths

Current workflow path filters cover:

- `package.json`
- `bin/**`
- `skills/**`
- `plugins/**`
- `scripts/**`
- `templates/**`
- `.github/workflows/package-artifact-verification.yml`

## Relationship to installer verification

This guide does **not** replace the installer checks in:

- `INSTALLER_RELEASE_VERIFICATION.md`
- `INSTALLER_VERIFICATION_MATRIX.md`

They protect different layers:

- package artifact verification proves the published npm tarball contains the expected runtime payload
- installer verification proves supported install flows behave correctly in real environments

Both are needed for production-ready packaging trust.

## When maintainers should run this

Run package artifact verification when changing any of the following:

- package boundaries in `package.json`
- CLI entrypoints in `bin/`
- installer logic in `scripts/`
- shipped skills in `skills/`
- packaged plugin/runtime assets in `plugins/`
- packaged templates in `templates/`

## Failure examples this should catch

- the CLI entrypoint is accidentally excluded from the package
- the shell or PowerShell installer stops shipping in the tarball
- the skill corpus disappears from the artifact after a packaging change
- repository docs are present, but the runtime payload is incomplete

## Definition of done for this gate

Before release, maintainers should be able to say all of the following are true:

1. `node scripts/verify-package-artifact.js` passes locally.
2. The GitHub Actions package verification workflow passes for the change.
3. The manual installer verification docs still match current supported install behavior.
4. No release is described as verified if either the tarball gate or installer checks are failing.
