# Tool Compatibility Truth Matrix

This file exists to keep public compatibility claims aligned with verified reality.

Use it together with:

- `AGENT_SKILL_QUALITY_STANDARD.md`
- `INSTALLER_RELEASE_VERIFICATION.md`

## Why this exists

For an installer-driven project, trust is damaged when the README sounds broader than the currently verified install surface.

A tool should only be described as fully supported when:

1. the install path is real and documented
2. the expected artifacts land in the right place
3. rerunning the installer does not leave a broken state
4. the release wave recorded a successful verification result

If any of those are missing, the tool should be labeled more honestly (`prototype`, `partial`, or `in progress`).

## Status labels

Use exactly one of these labels for each tool:

- **verified** — fully supported in the current release wave and manually or automatically verified
- **partial** — some flows work, but coverage or artifact checks are incomplete
- **prototype** — exploratory support exists, but should not be marketed as stable
- **in progress** — planned or under active development, not yet release-grade
- **not supported** — intentionally unsupported right now

## Matrix

| Tool | Public status label | Install paths expected to work | Release-blocking? | Last verified in a release wave | Evidence to record |
| --- | --- | --- | --- | --- | --- |
| opencode | verified / partial / prototype / in progress / not supported | auto-detect, `--tool=opencode`, `--tool=all`, shell installer if applicable | yes when labeled `verified` | _fill in each wave_ | command used, target path, artifact check result |
| Claude Code | verified / partial / prototype / in progress / not supported | auto-detect, `--tool=claude-code`, `--tool=all`, shell installer if applicable | yes when labeled `verified` | _fill in each wave_ | command used, target path, artifact check result |
| Cursor | verified / partial / prototype / in progress / not supported | auto-detect, `--tool=cursor`, `--tool=all`, shell installer if applicable | yes when labeled `verified` | _fill in each wave_ | command used, target path, artifact check result |
| Windsurf | verified / partial / prototype / in progress / not supported | auto-detect, `--tool=windsurf`, `--tool=all`, shell installer if applicable | yes when labeled `verified` | _fill in each wave_ | command used, target path, artifact check result |
| GitHub Copilot | in progress unless a real installer path is verified | only the flows that genuinely exist today | no until real support is implemented and verified | _fill in when real support exists_ | command used, target path, artifact check result |

## Release-wave usage

Before a release:

1. Update each tool row to reflect the current verified truth.
2. Do not leave optimistic labels in place from older release waves.
3. If one tool regressed, downgrade the label immediately instead of hiding the gap.
4. Keep README messaging consistent with the matrix.

## Review questions before publishing

- Does the README claim support that the current release wave did not verify?
- Are we treating a prototype path like a stable product surface?
- Would a new user's first install experience match the confidence of our public wording?
- If a tool failed verification today, did we downgrade the claim before shipping?

## Minimum definition of honest compatibility

A compatibility claim is honest only when the repo can answer all of these:

- Which command should the user run?
- Where should files be installed?
- What exact artifacts should appear?
- What happens on rerun?
- When was this last verified?

If the repo cannot answer those questions, the tool should not be described as fully supported.