---
name: spec-verifier
description: Verifies acceptance criteria in spec files by checking implementation against requirements using Context7 for Next.js validation and Playwright for visual comparison with vision model. Works in current branch, only verifies (no code modifications), and automatically updates the spec file with verification results.
disable-model-invocation: true
argument-hint: <NN-spec-name>
allowed-tools: Read, Glob, Grep, Edit, Bash, Context7, Playwright
---

# /spec-verifier — Verifier of spec acceptance criteria

## Session context

Current repository state:
!`git status --short`

Current branch:
!`git branch --show-current`

Specs available in this folder:
!`ls specs/ 2>/dev/null || echo "The specs/ folder does not exist"`

---

## Instructions

Follow these phases in strict order. **Do not skip any phase.**

---

### Phase 1 — Identify the spec

The received argument is: `$ARGUMENTS`

If `$ARGUMENTS` is empty:

- List the files available in `specs/` (you already have them above).
- Ask the user to specify the exact name of the spec to verify.
- Stop and wait for an answer. Do not continue.

If `$ARGUMENTS` has a value:

- Look for the file in `specs/`. The user may have written the full name (`01-mvp-arkanoid`), only the number (`01`), or only the slug (`mvp-arkanoid`). Try to find the correct file in any of those cases.
- If you do not find the file, show the available specs and ask the user to correct the name.
- If you do find it, continue to Phase 2.

---

### Phase 2 — Read and understand the spec

Read the spec file you located in Phase 1.

Extract and understand:
- **Objective**: What this spec is supposed to accomplish
- **Scope**: What's included and what's explicitly excluded
- **Implementation plan**: The steps that were followed to implement it
- **Acceptance criteria**: The checklist of requirements to verify

Show the user a summary:

```
📋 Verifying spec: [SPEC FILE NAME]

Objective: [extracted objective]
Scope: [brief summary of what's in scope]
Acceptance criteria to verify: [count] items

Starting verification process...
```

---

### Phase 3 — Verify each acceptance criterion

For each item in the acceptance criteria checklist:

1. **Code-level verification**: Read the relevant source files and verify the implementation matches the requirement
2. **Framework validation**: Use Context7 to verify correct usage of Next.js, React, Tailwind, or other framework APIs if the criterion involves framework-specific behavior
3. **Build verification**: If the criterion mentions lint/build, run `npm run lint` and `npm run build` and check for errors
4. **Visual verification** (if applicable): If the criterion involves visual appearance, take a screenshot using Playwright and save it to `.playwright-mcp/` folder. **Note**: The vision model may not be available, so if screenshot comparison fails, note it but continue with code-level verification.

For each criterion, determine:
- ✅ **PASS**: The implementation fully satisfies the requirement
- ❌ **FAIL**: The implementation does not satisfy the requirement (provide details)
- ⚠️ **PARTIAL**: The implementation partially satisfies the requirement (provide details)

---

### Phase 4 — Update the spec file

After verifying all criteria:

1. **Update the checklist**: Replace each unchecked item `- [ ]` with the verification result:
   - If PASS: `- [x]` (keep the original text)
   - If FAIL: `- [ ] ❌` (keep the original text and add ❌)
   - If PARTIAL: `- [~]` (keep the original text and add ⚠️ with explanation below)

2. **Update the status** (only if ALL criteria pass):
   - Change `**Estado:**` / `**Status:**` from any state (e.g., "Implementado", "Implemented") to "Verificado ✅" / "Verified ✅"
   - Keep the same language as the original status line

3. **Add verification notes** (if any criterion failed or was partial):
   - Add a section `## Notas de verificación` / `## Verification notes` at the end of the file
   - List which criteria failed and why
   - Suggest what needs to be fixed

---

### Phase 5 — Report results

Show the user a summary table:

```markdown
## Verification Results

| # | Criterion | Result |
|---|-----------|--------|
| 1 | [criterion summary] | ✅ PASS |
| 2 | [criterion summary] | ❌ FAIL |
| 3 | [criterion summary] | ⚠️ PARTIAL |

**X/Y criteria passed.**

[If all pass]: Spec file updated to status "Verificado ✅"
[If any fail]: Spec file NOT updated to verified status. See notes above for what needs to be fixed.
```

---

## Important rules

1. **Verification only**: Do NOT modify any implementation code. Only modify the spec file to update the checklist and status.
2. **Current branch only**: Work on whatever branch is currently active. Do not switch branches.
3. **No assumptions**: If you cannot verify a criterion definitively, mark it as ⚠️ PARTIAL and explain why.
4. **Framework accuracy**: When verifying framework-specific behavior (Next.js APIs, React patterns, Tailwind usage), use Context7 to check current documentation. Do not rely solely on training data.
5. **Visual verification limitations**: If the vision model is not available for screenshot comparison, note this but continue with code-level verification. Do not stop the process.
6. **Language matching**: Match the language of the spec file. If the spec is in Spanish, use Spanish in your updates and reports.
7. **Build errors are failures**: If `npm run lint` or `npm run build` fails, any criterion that mentions these commands passing is automatically ❌ FAIL.

---

## Summary of expected behavior

```
/spec-verifier 01-home-feed-estatico

  Phase 1  →  Finds specs/01-home-feed-estatico.md
  Phase 2  →  Reads the spec, extracts objective and criteria
  Phase 3  →  Verifies each criterion:
              - Reads relevant source files
              - Uses Context7 for framework validation
              - Runs lint/build if required
              - Takes screenshots if visual verification needed
  Phase 4  →  Updates the spec file:
              - Marks each criterion as [x], [ ], or [~]
              - Updates status to "Verificado ✅" if all pass
  Phase 5  →  Shows summary table to user
```
