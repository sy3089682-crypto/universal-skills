# Universal Skills Agent Skill Quality Standard

This document defines the minimum bar for shipping a skill, plugin, or installer path in `universal-skills`.

The goal is simple: if this repository promises that one install can upgrade many AI coding tools, each skill must be packaged, validated, and documented with a level of trust that feels production-ready.

## Core principle

A skill is only valuable if an agent can:

1. find it
2. install it
3. understand when to use it
4. execute it safely
5. get a predictable outcome

If any one of those breaks, the skill is not production-ready.

---

## Definition of a production-ready skill

A production-ready skill in this repository should satisfy all of the following:

### 1. Clear purpose
- The skill name should make its purpose obvious.
- The description should explain the job the skill is for, not just restate the title.
- The intended tool/runtime targets should be explicit.

### 2. Honest installability
- Installation instructions must reflect reality.
- If a skill only works on certain tools, platforms, or versions, say so plainly.
- The installer should not imply broad compatibility that has not been verified.

### 3. Predictable behavior
- A user or agent should know what inputs the skill expects.
- The output shape or expected effect should be described in practical terms.
- Failure cases and limitations should be visible instead of hidden behind optimistic marketing language.

### 4. Safe execution
- The skill should avoid ambiguous or risky instructions when safer guidance is possible.
- Any action that could change files, infrastructure, credentials, or external systems should be called out clearly.
- Tool-specific caveats should be documented when they affect safety or correctness.

### 5. Verification
- Each release path should have a validation story.
- At minimum, the repository should be able to verify that:
  - the installer completes
  - the right files/directories are created
  - the skill is discoverable in the target environment
  - the skill metadata remains well-formed

---

## Skill packaging checklist

Every skill or plugin contribution should be reviewable against this checklist.

### Metadata and discoverability
- [ ] name is clear and specific
- [ ] description explains the actual job to be done
- [ ] target tools/platforms are documented
- [ ] location in the repo is consistent with existing structure

### Usability
- [ ] usage instructions are concrete enough for a first-time user
- [ ] expected inputs are described
- [ ] expected outputs or effects are described
- [ ] examples are realistic rather than purely aspirational

### Safety and limits
- [ ] limitations are documented
- [ ] unsafe or high-impact actions are clearly signposted
- [ ] tool/runtime caveats are called out where relevant
- [ ] the skill does not over-promise beyond verified behavior

### Installability
- [ ] installer path for the skill is documented
- [ ] install location is predictable
- [ ] uninstall/update expectations are understandable
- [ ] manual fallback path exists if automation fails

### Verification
- [ ] installer success can be checked automatically or with a short manual checklist
- [ ] expected artifacts are explicitly known
- [ ] release checks cover the most important supported tool paths
- [ ] repo documentation explains how verification is performed

---

## Repository-level quality bar

For `universal-skills`, the product is not just the skills — it is the trust that they will land correctly across tools.

That means repository quality should prioritize:

1. **installer reliability**
2. **skill metadata consistency**
3. **clear documentation and examples**
4. **cross-tool compatibility honesty**
5. **release verification before expansion**

A new skill should not lower confidence in the whole ecosystem.

---

## Apple-level interpretation for agent skills

Apple-level quality here does **not** mean visual styling.

It means:
- calm clarity in naming and docs
- no ambiguity about what works and where
- compatibility claims that match reality
- predictable installation paths
- a trustworthy first-run experience

For this repository, polish means **confidence**.

---

## Recommended implementation order

1. Establish installer smoke-test coverage for the highest-value tool paths.
2. Define a consistent metadata/documentation template for skills.
3. Add artifact verification so installs prove the right files were created.
4. Review high-traffic skills for naming, purpose clarity, and caveat honesty.
5. Expand support only after the release/verification story is solid.

---

## Definition of done for a release wave

A release wave should only be treated as production-ready when:
- the targeted install paths were verified
- documentation matches actual support
- high-risk caveats are visible
- the added or changed skills improve capability without weakening trust
