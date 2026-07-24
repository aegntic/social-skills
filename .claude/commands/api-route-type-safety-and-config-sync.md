---
name: api-route-type-safety-and-config-sync
description: Workflow command scaffold for api-route-type-safety-and-config-sync in social-skills.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /api-route-type-safety-and-config-sync

Use this workflow when working on **api-route-type-safety-and-config-sync** in `social-skills`.

## Goal

Ensure API route handlers are properly type-annotated and keep TypeScript configuration in sync with Next.js requirements.

## Common Files

- `src/app/api/journey/operator/route.ts`
- `tsconfig.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Annotate API route handler return types (e.g., Promise<NextResponse>)
- Update or reformat tsconfig.json as needed for Next.js compatibility

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.