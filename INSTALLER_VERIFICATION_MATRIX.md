# Installer verification matrix

`universal-skills` is an installer-led product. The first-run experience is the product, so every release should prove that the supported install paths still work before publishing.

This document defines the minimum verification bar until automated smoke tests are added.

## Current release risk

Today the package exposes a working CLI entrypoint and shell installer, but the public package baseline does **not** expose test scripts or CI workflows that verify installation behavior across supported tools.

That means release quality currently depends on an explicit verification pass.

## Supported install surfaces

### Node CLI

```bash
npx universal-skills install
npx universal-skills install --tool=cursor
npx universal-skills install --tool=all
npx universal-skills list
```

### Shell installer

```bash
bash scripts/install.sh
bash scripts/install.sh all
```

## Supported tool targets

| Tool | Skills destination | Extra artifact |
| --- | --- | --- |
| OpenCode | `~/.config/opencode/skills` | plugins copied to `~/.opencode/plugins` |
| Claude Code | `~/.claude/skills` | none |
| Cursor | `~/.cursor/skills` | none |
| Windsurf | `~/.windsurf/skills` | none |

## Release gate

A release is **not ready** unless all of the following are true:

- the CLI can be invoked with `npx universal-skills list`
- auto-detect install succeeds on a machine where at least one supported tool is present
- explicit single-tool install succeeds for at least one target
- `all` install succeeds and creates the expected directories for every supported tool
- the shell installer succeeds for auto-detect and `all`
- each installed tool receives non-empty skill output in the expected path
- OpenCode also receives plugin output in `~/.opencode/plugins`
- placeholder or partial installs are treated as failures

## Manual verification matrix

Use a clean or throwaway environment where possible.

| Flow | Setup | Command | Required assertions |
| --- | --- | --- | --- |
| CLI list | Node available | `npx universal-skills list` | exits successfully and shows available skills |
| CLI auto-detect | one supported tool installed | `npx universal-skills install` | detects the installed tool, creates its skills directory, copies non-empty skill content |
| CLI single target | Cursor installed | `npx universal-skills install --tool=cursor` | `~/.cursor/skills` exists and contains installed skills |
| CLI all | all supported tools directories available | `npx universal-skills install --tool=all` | all four tool skill directories exist; OpenCode plugins are copied |
| Shell auto-detect | one supported tool installed | `bash scripts/install.sh` | same expectations as CLI auto-detect |
| Shell all | all supported tools directories available | `bash scripts/install.sh all` | same expectations as CLI all |

## Fast verification checklist

Before tagging or publishing:

- [ ] run `npx universal-skills list`
- [ ] run one CLI auto-detect install in a clean environment
- [ ] run one explicit CLI install (`--tool=cursor` or another installed target)
- [ ] run one CLI `--tool=all` pass
- [ ] run one shell auto-detect pass
- [ ] run one shell `all` pass
- [ ] verify that copied skill directories are non-empty
- [ ] verify that OpenCode plugins are present when OpenCode is targeted
- [ ] confirm there are no broken symlinks, empty directories, or partial copies left behind
- [ ] record any environment-specific edge cases before release

## Failure modes that must block release

- a command exits successfully but no skills are installed
- auto-detect chooses the wrong target
- `all` misses one of the supported tool destinations
- OpenCode skills install but plugins do not
- shell and CLI installers produce different destination layouts
- an install leaves only empty directories or partial content

## Next hardening step

The next improvement should convert this manual gate into automated smoke tests plus a GitHub Actions workflow so installer regressions block merges and releases instead of being discovered after publish.
