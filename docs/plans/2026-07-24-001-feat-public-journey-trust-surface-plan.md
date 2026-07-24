---
date: 2026-07-24
topic: public-journey-trust-surface
origin: docs/brainstorms/public-journey-trust-surface-requirements.md
type: feat
status: active
---

# feat: Public /journey Trust Surface (Seeded Demo Account)

## Problem Frame

Social Skills is a Postiz-clone whose differentiator is a memory layer that *is* the agent's brain (gbrain under Cognitive OS v3 scoped isolation), surfaced through `/journey`. Today that view shells out to gbrain and renders agent-operator memory — invisible to prospects and, with gbrain's PGLite broken in this env, effectively empty. At 0 signups, retention features have nobody to retain; the leverage is acquisition. The memory thesis only converts if a prospect can *see* it pre-signup. This plan makes `/journey` a public, unauthenticated trust surface: curated product memory + a seeded demo account, with operator gbrain removed from the public path.

## Summary

Convert `/journey` from an operator-only gbrain view into a public trust surface seeded from `store.ts`, reframe page copy from "operator console" to "what the app has learned about this example account," and move operator gbrain onto an internal path. Reuses the existing `applyHygiene()` COS v3 pipeline; scope keys swap from `global`/`project` to `product`/`user_demo`.

---

## Requirements Traceability

- R1 (public, no auth) → U1, U3
- R2 (public response: only `product` + `user_demo`) → U2, U3
- R3 (curated product memory, not raw gbrain) → U2
- R4 (seeded demo account, populated, visible label) → U2, U3
- R5 (prospect copy) → U3
- R6 (operator gbrain off public path) → U1
- R7 (reuse `applyHygiene()`) → U2
- R8 (no new store/persistence) → U2, U3

---

## Implementation Units

### U1. Split operator gbrain onto an internal route

- **Goal:** Remove agent gbrain from the public `/api/journey` path and expose it only on an operator-only internal route so public callers can never receive operator memory.
- **Requirements:** R6
- **Dependencies:** none
- **Files:**
  - `src/app/api/journey/route.ts` (modify — public handler)
  - `src/app/api/journey/operator/route.ts` (create — operator-only gbrain handler)
- **Approach:** The current public `route.ts` shells out to gbrain and returns operator memory. Move that gbrain call + `projectMemoryNodes()`/`.gbrain-source` logic into a new `src/app/api/journey/operator/route.ts`. Gate it so it never runs for unauthenticated requests (reuse `getSessionUser()` from `@/lib/auth`; return 401 when no session). The public `route.ts` must not import or call any gbrain code. The operator route keeps the existing `source: "gbrain-memory"` shape so any internal viewer is unaffected.
- **Patterns to follow:** Auth gating already exists in `src/app/api/auth/route.ts` and `getSessionUser` is used by `src/app/journey/page.tsx:39`.
- **Test scenarios:**
  - Covers R2/R6. Given an unauthenticated GET to `/api/journey/operator`, expect 401 and no gbrain node in the body.
  - Covers R6. Given an authenticated GET to `/api/journey/operator`, expect 200 and a response whose nodes include `scope: "global"` or `scope: "project"` (gbrain + repo-local memory intact).
- **Verification:** Public route imports contain no reference to `hermes-agent`, `agent.learning_graph`, or `.gbrain-source`. Operator route returns operator scopes only when authed.

### U2. Seed curated product + demo-account memory in store

- **Goal:** Add two in-memory memory slices to `store.ts` — curated `product` nodes (operator-authored, illustrative learnings) and `user_demo` nodes (the seeded example account's learned preferences) — so the public API has populated content without depending on gbrain.
- **Requirements:** R2, R3, R4, R7, R8
- **Dependencies:** U1
- **Files:**
  - `src/lib/store.ts` (modify — add `getJourneyMemory()` exporting seeded `product` + `user_demo` raw nodes)
  - `src/lib/types.ts` (modify — add a `JourneyMemoryNode` type if the existing `Node`/`RawNode` shape is reused; otherwise reuse existing fields)
- **Approach:** Add a `getJourneyMemory()` function returning an array of raw journey nodes (`{ id, label, kind, timestamp, category, body, source }`). Two `source` buckets: `"product"` (4-6 curated nodes: e.g. "LinkedIn outperforms at 08:00–09:30 local", "Threads hooks with a question get 2.1x replies", "Carousel beats single-image on Instagram by 34%", "B2B cadence of 3/week outperforms daily") and `"user_demo"` (4-6 nodes representing the demo account: brand voice = concise builder tone, preferred cadence = weekdays 9am, top platform = LinkedIn, audience insight = technical founders). Seed timestamps spread over the last ~90 days so the timeline renders. Route these through the existing `applyHygiene()` pipeline (it already maps `source` to `scope`: `product` → not `project`/`base` → resolved to `global` today, so the hygiene `scope` mapping must be extended to emit `product` and `user_demo` as first-class scopes — see U2 Technical Design). No new persistence; in-memory seed is acceptable to reset on restart (R8).
- **Technical design:** The `applyHygiene()` scope mapping at `route.ts:70-71` currently collapses any non-`project`/`base` source to `global`. Extend it to:
  ```
  const scope = n.source === "project" ? "project"
              : n.source === "user_demo" ? "user_demo"
              : n.source === "product" ? "product"
              : "global";
  ```
  This keeps `applyHygiene()` reused (R7) and makes `product`/`user_demo` first-class scopes. The `RawNode.source` type already permits arbitrary strings.
- **Patterns to follow:** `seedDb()` at `store.ts:32` is the existing seed pattern; mirror its structure for journey seeds.
- **Test scenarios:**
  - Covers R4. Given `getJourneyMemory()`, expect ≥4 `user_demo` nodes and ≥4 `product` nodes, all with non-null `timestamp`.
  - Covers R3. Given the returned nodes, expect `product` nodes to contain no operator/gbrain-derived labels (curated content only).
  - Covers R7. Given the nodes passed through `applyHygiene()`, expect `scope` values of exactly `product` and `user_demo` (no `global`).
- **Verification:** `getJourneyMemory()` returns populated arrays; after `applyHygiene()`, every node's `scope` is `product` or `user_demo`.

### U3. Public route serves seeded memory; page reframed

- **Goal:** The public `/api/journey` returns the seeded `product` + `user_demo` nodes (no gbrain). The `/journey` page drops the auth gate, reframes copy to prospect language, and shows a visible "demo account" badge.
- **Requirements:** R1, R2, R4, R5
- **Dependencies:** U1, U2
- **Files:**
  - `src/app/api/journey/route.ts` (modify — replace gbrain call with `getJourneyMemory()` + `applyHygiene()`)
  - `src/app/journey/page.tsx` (modify — remove auth dependency, reframe copy, add demo badge, fix scope labels)
  - `src/app/journey/page.tsx` metadata (modify — flip `robots: index: true` so prospects can reach it)
- **Approach:** Public `route.ts` GET handler calls `getJourneyMemory()` from `store.ts`, runs `applyHygiene()`, returns `{ ok: true, source: "seeded-memory", protocol: "cognitive-os-v3", graph: { nodes, clusters, stats } }`. Remove the `execFile` gbrain call, `PY`/`PY_PATH` constants, and `.gbrain-source`/`MEMORY.local.md` reads (now operator-only in U1). In `page.tsx`, remove `getSessionUser()` (R1 — page renders unauthenticated); replace the intro paragraph's "gbrain memory store / operator console" language with prospect copy ("here's what Social Skills has learned about this example account"); replace the `global`/`project` badge counts with `product`/`user_demo` counts; add a visible badge near the title reading "Example account — seeded for demonstration". Update the timeline `<title>` and signal cards to show `product`/`user_demo` scopes. Flip `metadata.robots` to `index: true, follow: true`.
- **Patterns to follow:** Existing scope-badge rendering at `page.tsx:167-168` and `page.tsx:188`; the `colorFor`/category map at `page.tsx:64-70` already includes `product`.
- **Test scenarios:**
  - Covers AE1. Given an unauthenticated GET to `/api/journey`, expect 200 and a body whose nodes contain only `scope: "product"` and `scope: "user_demo"`; a grep for `scope: "global"` or `scope: "project"` returns zero.
  - Covers AE2. Given a fresh restart with no real users, when `/journey` is rendered, expect ≥3 `user_demo` nodes visible and a "demo account" badge present; no empty-state prompt.
  - Covers AE3. Given no session cookie, when `/journey` is requested, expect 200 and rendered content (no redirect to login).
  - Covers R5. Given the rendered page, expect intro copy to reference "example account" / "what the app has learned" and contain no "operator" / "gbrain memory store" phrasing.
- **Verification:** Public API response contains only `product`/`user_demo` scopes; page renders unauthenticated with demo badge and prospect copy; `robots` allows indexing.

### U4. Build, typecheck, and smoke-verify

- **Goal:** Confirm the public surface builds, typechecks, and renders seeded content with the dev server.
- **Requirements:** R1, R2, R4, R5, R6
- **Dependencies:** U1, U2, U3
- **Files:**
  - `src/app/api/journey/route.ts`, `src/app/api/journey/operator/route.ts`, `src/lib/store.ts`, `src/app/journey/page.tsx` (all modified above)
- **Approach:** Run the project build/typecheck. Start the dev server on port 3456, curl `/api/journey` and assert only `product`/`user_demo` scopes; curl `/api/journey/operator` unauthenticated and assert 401; load `/journey` and confirm 200 + demo badge + populated timeline. Stop the dev server after verification.
- **Execution note:** Start from a clean `node_modules`/build cache only if the prior build is stale; otherwise incremental build is fine.
- **Test scenarios:**
  - Covers AE1. `curl -s localhost:3456/api/journey | jq '.graph.nodes[].scope | unique'` returns `["product","user_demo"]`.
  - Covers R6. `curl -s -o /dev/null -w "%{http_code}" localhost:3456/api/journey/operator` returns `401`.
  - Covers AE2. Rendered `/journey` HTML contains "demo account" and at least 3 `user_demo` node labels.
- **Verification:** Build passes with no type errors; the three curl/HTML assertions above pass.

---

## Scope Boundaries

- Real per-user memory capture (writing user signals into memory) is deferred until signups exist; flipping to real `userId` scope is the only change required then.
- Persistent demo memory across restarts is out of scope; in-memory seed on boot is sufficient.
- No new auth, new store layer, or analytics wiring in v1.
- The gbrain MCP dependency is deliberately dropped from the public path; if gbrain returns, the operator route (U1) is its home, not the public one.

### Deferred to Follow-Up Work

- Real per-user capture + `userId`-scoped memory store (requires signups).
- Richer demo-account narrative (more nodes, categories) if the seeded set looks thin in review.
- Operator `/journey` viewer UI (today the operator route is API-only; a protected page could reuse the same component).

---

## Key Technical Decisions

- **Public route drops gbrain entirely** (see origin R6). The current shell-out is broken in this env anyway and leaks operator memory; seeding from `store.ts` makes the public surface self-contained and deterministic.
- **`applyHygiene()` reused, scope mapping extended** (R7). Adding `product`/`user_demo` as first-class scopes is a 3-line change, cheaper than a second pipeline, and keeps COS v3 hygiene (forgetting curve, redaction) on the public surface for free.
- **In-memory seed, no persistence** (R8). A trust surface does not need durable demo state; reset-on-restart is acceptable and avoids a new store layer.

---

## Dependencies / Assumptions

- `store.ts` already seeds `user_demo` (`store.ts:33`); the journey seed reuses that account identity for the `user_demo` slice.
- `getSessionUser` from `@/lib/auth` is the existing auth gate to reuse for the operator route.
- gbrain PGLite remains broken in this env (known from prior session); the public path must not depend on it.

---

## Outstanding Questions

### Resolve Before Planning

- None. Scope, content-source ownership, and copy direction are decided.

### Deferred to Planning

- Affects R3 [Technical] Exact seed location for `product` memory (function in `store.ts` vs a small `MEMORY.product.md`) — decided as a `store.ts` function (fewer files).
- Affects R4 [Technical] Exact demo-account node count/categories — plan specifies 4-6 each; finalize during U2.
- Affects R6 [Technical] Operator route returns 401 unauthenticated (chosen) vs a flag on the public route — chosen as separate route for clean isolation.
