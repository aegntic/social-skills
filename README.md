# Social Skills

A cross-post desk for creators: **one caption, ten networks, real per-platform
transformation.** Type once, publish everywhere. IG gets media, X strips links,
Threads gets a question hook, LinkedIn keeps the long form.

## The big picture

Most social tools are fire-and-forget. Social Skills is built around a **memory
layer** that is also the product's differentiator: the app learns how each
account actually performs and feeds that back into every draft.

- **Postiz** (FOSS self-host) is a scheduling UI with no memory of you.
- **Post-Bridge** is an agent pipe with no human-facing memory surface.
- **Social Skills** makes the memory visible: `/journey` shows what the app has
  learned about an account, brand voice, cadence, top platform, audience.

That journey view is the acquisition wedge. At zero signups, a retention feature
has nobody to retain — but a **public, seeded trust surface** lets a prospect
*see* the memory thesis before they sign up. That's the current build direction
(see `docs/brainstorms` + `docs/plans`).

## Run

```bash
cd social-skills
bun install
bun run dev   # http://localhost:3456
```

**Demo:** `demo@socialskills.app` / `demo1234`

Set `OPENAI_API_KEY`, `XAI_API_KEY`, or `OPENROUTER_API_KEY` for live caption
improve.

## Product loop

1. Sign up or use demo
2. Compose → pick accounts → optional media
3. Post now / schedule / draft
4. Read per-platform results

## Launch surface

- Landing + auth + desk
- SEO compare hub (`/compare`, 8 competitors)
- Memory journey (`/journey`) — public trust surface in progress
- sitemap + robots

## Repo layout

```
src/app/         # Next.js App Router (pages + API routes)
src/components/   # client UI (DashboardApp, AuthForm, Shell)
src/lib/         # store (in-memory db + journey seeds), auth, platforms, competitors
docs/            # brainstorms + plans (compound-engineering workflow)
data/db.json     # local store (gitignored in prod via .gitignore)
```

## Development

This repo is managed with the compound-engineering workflow: `/ce-brainstorm`
→ `/ce-plan` → `/ce-work`. Active plan:
`docs/plans/2026-07-24-001-feat-public-journey-trust-surface-plan.md`.
