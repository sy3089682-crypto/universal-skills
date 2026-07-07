# Package Artifact Verification Spec

## Why this exists

`universal-skills` is an installer-first package. The npm tarball is the real production surface.

The repository already has strong manual guidance for installer and release checks:

- `INSTALLER_RELEASE_VERIFICATION.md`
- `INSTALLER_VERIFICATION_MATRIX.md`
- `TOOL_COMPATIBILITY_TRUTH_MATRIX.md`

Those documents are valuable, but they do not yet define one executable answer to the most basic release question:

> Is the published npm artifact complete enough to trust before install flows even begin?

This spec defines that missing automated gate.

## Trust model

Two verification layers are required and they protect different failure modes:

1. **Package artifact verification**
   - verifies the packed npm artifact contains the required runtime payload
   - should fail before publish if a required file or asset class is missing
2. **Installer smoke verification**
   - verifies the advertised install flows place the packaged payload correctly for each supported tool
   - should catch install-path regressions after the tarball itself is known to be complete

The package artifact gate should land first because every installer path depends on the tarball being complete.

## Required package verification contract

The repository should expose one explicit package verification command in `package.json`:

```json
{
  "scripts": {
    "verify:package": "node ./scripts/verify-package-artifact.js"
  }
}
```

The exact command name can vary, but there must be one obvious local and CI-safe answer to:

> Does the npm artifact contain the minimum runtime contract?

## Recommended verifier implementation

Add a committed Node-based verifier:

- `scripts/verify-package-artifact.js`

The verifier should inspect the package artifact rather than only the working tree.

Recommended implementation approach:

1. run `npm pack --json --dry-run`
2. read the returned file list for the packed artifact
3. compare that file list against the minimum required manifest
4. exit non-zero with a clear error when a required asset is missing

The verifier should fail closed.

## Minimum required manifest

The first implementation should stay small and measurable.

### Required exact paths

- `bin/universal-skills.js`
- `plugins/opencode/skill-router.ts`
- `scripts/install.sh`
- `README.md`
- `LICENSE`

### Required asset classes

- at least one packaged `SKILL.md` file under `skills/**/SKILL.md`
- at least one packaged file under `templates/`

This establishes a concrete production boundary without over-engineering the first gate.

## Failure conditions

The verification must fail if any of these are true:

- the CLI entrypoint is missing
- the packaged skill payload is empty or missing
- the opencode router plugin drops out of the artifact
- the shell installer helper is excluded
- required template assets disappear
- documentation remains present while runtime assets are incomplete

A release should never pass because the repo looks healthy while the tarball is broken.

## CI and release integration

Run the package artifact gate in two places:

### Packaging-sensitive pull requests

Run `verify:package` when changes touch areas such as:

- `package.json`
- `bin/**`
- `skills/**`
- `plugins/**`
- `scripts/**`
- `templates/**`
- `README.md`
- `LICENSE`

### Release and publish preparation

Run the same command before publish so local release checks and CI share one source of truth.

## Acceptance criteria

- `package.json` exposes one explicit package verification command.
- The repo contains a committed package artifact verifier.
- CI runs the verifier for packaging-sensitive changes.
- Release preparation runs the same verifier before publish.
- The packed npm artifact is checked against the minimum required manifest above.
- Removing a required asset causes the verification to fail before publish.
- Manual installer verification docs remain aligned and are positioned as the second layer rather than the only layer.

## Suggested verification scenarios

1. Remove `bin/universal-skills.js` from the packed file list and confirm the verifier fails.
2. Remove packaged `skills/**/SKILL.md` output and confirm the verifier fails.
3. Remove `plugins/opencode/skill-router.ts` from the artifact and confirm the verifier fails.
4. Remove `scripts/install.sh` while the README still advertises shell install and confirm the verifier fails.
5. Remove packaged `templates/` content and confirm the verifier fails.
6. Leave docs intact but remove runtime payload and confirm the verifier still fails.

## Relationship to installer smoke tests

This spec complements installer smoke testing rather than replacing it.

Recommended implementation order:

1. land the tarball-level package artifact gate described here
2. keep expanding the supported-tool installer smoke-test matrix

That sequence creates a clear production-ready packaging trust story:

- the tarball is complete
- the install flows are honest
- release claims match runtime reality
