---
name: api-endpoint-refactor-or-addition
description: Workflow command scaffold for api-endpoint-refactor-or-addition in social-skills.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /api-endpoint-refactor-or-addition

Use this workflow when working on **api-endpoint-refactor-or-addition** in `social-skills`.

## Goal

Refactor an existing API endpoint or add a new one, often to split public vs operator logic.

## Common Files

- `src/app/api/journey/route.ts`
- `src/app/api/journey/operator/route.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or modify a route handler file under src/app/api/[feature]/[route]/route.ts
- Adjust authentication/authorization logic as needed (e.g., add 401 for unauthenticated access)
- Update the public route to change its data source or response shape
- Reference or close relevant planning docs/issues

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.