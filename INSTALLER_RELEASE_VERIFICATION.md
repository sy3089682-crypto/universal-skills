# Installer Release Verification

This repository's product trust lives or dies in the install path.

`universal-skills` promises one install layer for multiple AI coding tools, so a release is **not ready** unless installation succeeds across the supported entry points and creates the expected artifacts in the right locations.

This document defines the current release gate for installer quality.

## Why this exists

At the moment, the repository exposes multiple install paths:

- `npx universal-skills install`
- `npx universal-skills install --tool=<tool>`
- `npx universal-skills install --tool=all`
- `bash scripts/install.sh`

Until automated smoke tests are added, every release should be treated as potentially risky unless the install surface is verified deliberately.

## Current policy

- Do **not** ship based only on package publication success.
- Do **not** assume one passing install path proves the others are safe.
- Treat installer verification as a merge/release blocker for changes that affect:
  - `bin/universal-skills.js`
  - `scripts/install.sh`
  - `skills/`
  - `templates/`
  - tool-specific plugin directories
  - packaging metadata such as `package.json`

## Verification matrix

Run the highest-value checks below before release.

### 1. Auto-detect install

Validate:

```bash
npx universal-skills install
```

Expected result:

- exits successfully
- detects a supported tool or explains clearly why none were found
- installs skill artifacts into the correct target location
- does not leave the target in a partially written state

### 2. Explicit single-tool install

Validate each primary target individually:

```bash
npx universal-skills install --tool=claude-code
npx universal-skills install --tool=cursor
npx universal-skills install --tool=windsurf
npx universal-skills install --tool=opencode
```

Expected result:

- each command exits successfully when the target tool environment is present
- the expected skill or config files are created in the correct directory for that tool
- rerunning the command is safe and does not create duplicate or corrupted output

### 3. Install all supported targets

Validate:

```bash
npx universal-skills install --tool=all
```

Expected result:

- every supported target is processed predictably
- success/failure is reported per tool instead of hiding partial failure
- one failing target does not silently misreport the overall install as healthy

### 4. Manual shell installer

Validate:

```bash
bash scripts/install.sh
bash scripts/install.sh all
```

Expected result:

- behavior matches the documented Node-based install flows closely enough that users are not surprised
- tool detection and install output remain understandable
- manual installation creates the same artifact shape as the package entry point where applicable

## Artifact assertions

A verification run is incomplete unless the reviewer confirms:

- the target directory exists
- expected skill/config/template files are present
- file names match documented conventions
- rerun behavior is idempotent or clearly documented
- failure states do not leave broken partial installs behind

If a target uses a different artifact shape, document that difference explicitly in the README or a tool-specific note before release.

## Minimum manual release checklist

Before tagging or publishing:

1. Run the verification matrix for the changed install paths.
2. Record which tools/environments were validated.
3. Confirm the README still matches real command names and supported tools.
4. Confirm failure messages are honest when a tool is missing or unsupported.
5. If any path was not validated, do not describe the release as fully verified.

## Definition of done for future automation

This document is a temporary manual quality gate. The long-term bar is:

- smoke tests for the primary install paths run in CI
- expected install artifacts are asserted automatically
- a failing install path blocks merge or release
- contributor docs explain how install verification works

When that automation lands, keep this document as the human-readable source of truth for what the tests are supposed to prove.
