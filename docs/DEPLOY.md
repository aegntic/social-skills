# Deploy — socialskills.ninja on Cloudflare

Canonical domain `socialskills.ninja` is registered (Porkbun) and its Cloudflare
zone is already live (NS delegated to Cloudflare, proxying on). This file is the
agent playbook to finish the wiring.

## 1. DNS records (Cloudflare DNS tab for the `socialskills.ninja` zone)

The app deploys to **Cloudflare Pages** → a `<project>.pages.dev` target. Once
the first `bun run deploy` succeeds, paste these two proxied records
(🧡 orange-cloud = proxied):

| Type  | Name | Target                                 | Proxy |
|-------|------|----------------------------------------|-------|
| CNAME | @    | social-skills.<your-sub>.pages.dev     | 🧡    |
| CNAME | www  | social-skills.<your-sub>.pages.dev     | 🧡    |

> Until records exist, the domain resolves to Cloudflare's "no record" page.
> `NEXT_PUBLIC_SITE_URL` in `.env.sample` already points at the domain; set it
> in the Pages environment variables too.

## 2. Authenticate the agent (one-time)

`wrangler` / Cloudflare API needs a token. Either:

- **Interactive:** `npx wrangler login` (opens browser OAuth), or
- **CI/agent:** export `CLOUDFLARE_API_TOKEN` (scopes: `Zone:Zone:Read`,
  `Zone:DNS:Edit`, `Account:Cloudflare Pages:Edit`).

No token in env → DNS (step 1) and `deploy` (step 3) cannot run from the agent.
They are left as explicit, documented steps, not guessed.

## 3. Deploy

```bash
bun install
bun run build          # typechecks + next build
bun run deploy         # wrangler pages deploy --project-name social-skills
```

First deploy creates the Pages project `social-skills`. Copy the
`*.pages.dev` URL into the DNS CNAME targets (step 1).

## 4. Hermes agent: Cloudflare MCP (optional, for live DNS edits)

Add to `~/.hermes/config.yaml` under `mcp.servers` (use `hermes config` or edit
directly — the agent runtime blocks writing this file itself):

```yaml
    cloudflare:             { url: "https://mcp.cloudflare.com/mcp" }
    cloudflare-docs:        { url: "https://docs.mcp.cloudflare.com/mcp" }
    cloudflare-bindings:    { url: "https://bindings.mcp.cloudflare.com/mcp" }
    cloudflare-builds:      { url: "https://builds.mcp.cloudflare.com/mcp" }
    cloudflare-observability: { url: "https://observability.mcp.cloudflare.com/mcp" }
```

Restart Hermes to load. These require Cloudflare OAuth — inert until a CF
account is linked.

## Status

- [x] Domain registered + CF zone live
- [x] Pages build config (`next.config.ts`, `wrangler.toml`, `deploy` script)
- [ ] DNS CNAME records (needs CF auth or dashboard paste)
- [ ] First `bun run deploy` (needs CF auth)
