---
date: 2026-07-24
topic: public-journey-trust-surface
---

# Public /journey Trust Surface (Seeded Demo Account)

## Summary

Convert the existing operator-only `/journey` memory view into a **public, unauthenticated trust surface** that shows two scope slices — curated *product* memory (shared, public-safe) and a seeded *demo-account* memory (isolated, illustrative) — so prospects see Social Skills "learning an account" before they sign up. No per-user capture yet; the plumbing already supports flipping to real `userId` scope when signups exist.

---

## Problem Frame

Social Skills is a Postiz-clone whose genuine differentiator is a memory layer that *is* the agent's brain (gbrain under Cognitive OS v3 scoped isolation), made visible through `/journey`. That view currently charts the agent's own memory and is operator-only — invisible to the prospects it is meant to win. At 0 signups, a retention feature (real per-user memory) has nobody to retain; the leverage is acquisition. The memory thesis only converts if a prospect can *see* it pre-signup. The current route also leaks agent gbrain memory into a view about to go public — an operator-privacy bug the build must fix, not just a framing change.

---

## Actors

- A1. Prospect (visitor, not logged in): views `/journey` to judge whether the product "learns" an account.
- A2. Operator (you): authors the curated product-memory slice; never appears in the public view.
- A3. Demo account (`user_demo`): the seeded, isolated memory shown as the illustrative example.

---

## Key Flows

- F1. Public view
  - **Trigger:** prospect navigates to `/journey` (no auth).
  - **Actors:** A1, A3.
  - **Steps:** page fetches `/api/journey`; API returns product + demo-account scoped nodes only; page renders with a visible "demo account" label and reframed copy.
  - **Outcome:** prospect sees a populated memory graph with no empty panes and no operator data.
  - **Covered by:** R1, R2, R4, R6.

- F2. Operator curation
  - **Trigger:** operator updates the shared product-memory slice.
  - **Actors:** A2.
  - **Steps:** operator edits the curated product-memory source; on next deploy/restart the seeded product nodes refresh.
  - **Outcome:** public view reflects updated product learnings without any code change.
  - **Covered by:** R3, R5.

---

## Requirements

**Content and scope**
- R1. `/journey` MUST render without authentication and MUST NOT require a session.
- R2. The public `/api/journey` response MUST contain exactly two scope slices: `product` (curated, shared) and `user_demo` (seeded, isolated). No `global`/`project` agent-gbrain scope MUST be present in the public response.
- R3. `product`-scope nodes MUST come from a curated source authored by the operator (illustrative learnings: posting-time patterns, thread hooks that outperform, cadence norms), NOT from raw agent gbrain memory.
- R4. `user_demo` nodes MUST be seeded at boot from a demo store and MUST render populated (no empty panes). The page MUST display a visible "demo account" label so prospects understand it is illustrative.
- R5. The page copy MUST be reframed from operator-console language ("here's what the agent remembers about this project") to prospect language ("here's what the app has learned about this example account").
- R6. Operator gbrain memory (agent skills, profile memory, repo `MEMORY.local.md`) MUST remain accessible via an operator-only path and MUST NOT be reachable from the public route.

**Reuse and non-goals**
- R7. The existing `applyHygiene()` COS v3 pipeline (scope tag, 30-day forgetting-curve confidence, secret redaction) MUST be reused unchanged; scope keys swap from `global`/`project` to `product`/`user_demo`.
- R8. No new datastore, dependency, or persistence layer beyond the existing `store.ts` seed; demo memory lives in-memory and is acceptable to reset on restart.

---

## Acceptance Examples

- AE1. **Covers R2, R6.** Given the public API after this change, when an integrator fetches `/api/journey` unauthenticated, the response nodes contain only `scope: "product"` and `scope: "user_demo"`; a grep for `scope: "global"` or `scope: "project"` returns zero matches.
- AE2. **Covers R4.** Given a fresh restart with no real users, when a prospect loads `/journey`, the graph shows ≥3 `user_demo` nodes and a visible "demo account" badge; the page does not show an empty-state prompt.
- AE3. **Covers R1.** Given no session cookie, when an unauthenticated request hits `/journey`, the page returns 200 and renders content (no redirect to login).

---

## Success Criteria

- Prospect-facing `/journey` renders seeded content with zero empty panes and zero operator/gbrain memory visible.
- A downstream planner can implement without inventing product behavior: scope keys, seed source, and copy direction are all specified.
- The surface reads as "the app learns you," not an admin console.

---

## Scope Boundaries

- Real per-user memory capture (writing user signals into memory) is deferred until signups exist; the scope-key swap to real `userId` is the only change required when ready.
- Persistent demo memory across restarts is out of scope; in-memory seed on boot is sufficient for a trust surface.
- No new auth, no new store layer, no analytics wiring in v1.
- The `/journey` route currently shelling into agent gbrain is removed from the public path (R6); gbrain stays operator-only.

---

## Key Decisions

- Public trust surface over real per-user capture: at 0 signups the leverage is acquisition, not retention. Seed a demo account so the differentiator is visible pre-signup.
- Curated `product` memory instead of raw agent gbrain in the public view: prevents operator-memory leakage and keeps the shared slice intentional and public-safe.
- Reuse `/api/journey` + `applyHygiene()` rather than a second route: smallest diff, isolation mechanic already proven.

---

## Dependencies / Assumptions

- `store.ts` already defines `db.users`/`db.sessions` and seeds `user_demo`; the demo store is the seed target for R4.
- A curated product-memory source (file or seed block) is operator-authored; the exact format is a planning detail, not a product decision.
- gbrain MCP PGLite remains broken in this env (known from prior session); the public path must not depend on it.

---

## Outstanding Questions

### Resolve Before Planning

- None blocking. Scope, content source ownership, and copy direction are decided.

### Deferred to Planning

- Affects R3 [Technical] Where does the curated `product` memory source live (seed block in `store.ts` vs a small `MEMORY.product.md`)? Pick the fewer-files option when implementing.
- Affects R4 [Technical] Exact demo-account node set — how many, what categories — to look believable without over-engineering. Seed 4-6 representative nodes.
- Affects R6 [Technical] Operator-only path for gbrain memory: keep the current `/api/journey` operator variant behind a flag, or document a separate internal route? Decide during planning.
