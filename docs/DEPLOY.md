# Deploy — socialskills.ninja

Canonical domain `socialskills.ninja` is registered (Porkbun) and its Cloudflare
zone is live (NS delegated, proxying on). The app runs as a standard Next.js
production server and is exposed to the internet through a **Cloudflare Tunnel**
(cloudflared) — Cloudflare proxies `socialskills.ninja` → tunnel → `localhost:3200`.

> Why a tunnel instead of Cloudflare Pages/Workers? Pages served 404 on every
> route (deployment `status: None` bug, unreproducible via API/CLI promote) and
> the OpenNext Workers adapter breaks on this host's Node 24 + Bun toolchain.
> The tunnel is the reliable path: CF handles DNS + SSL + proxy, the app runs
> as a normal Node server.

## Architecture

```
socialskills.ninja (CF DNS, proxied)
        │
        ▼
Cloudflare edge (SSL, WAF, caching)
        │
        ▼
cloudflared tunnel 8ebebe32-…  (quic, syd05/syd08)
        │
        ▼
localhost:3200  (next start, NODE_ENV=production)
```

## Run it

```bash
# 1. Build + start the prod server (port 3200)
bun run deploy

# 2. In a separate process, run the tunnel (config in ~/.cloudflared/config.yml)
cloudflared tunnel --config /home/ae/.cloudflared/config.yml run
```

`cloudflared` is installed system-wide (`/usr/local/bin/cloudflared`).
The tunnel `social-skills` (id `8ebebe32-ba8a-4bd4-9593-50dfe7c976de`) and its
credentials already exist under `~/.cloudflared/`. DNS records (`@` + `www`
CNAME → `<tunnel-id>.cfargotunnel.com`, proxied) are set in the CF zone.

## Status

- [x] Domain registered + CF zone live
- [x] App builds (Next 15.4) + serves on :3200
- [x] Cloudflare Tunnel live (QUIC to edge)
- [x] DNS `@`/`www` → tunnel, proxied
- [x] **LIVE:** https://socialskills.ninja (200, /journey 200, www 200)

## Notes

- The prod server and tunnel are long-lived processes — run them under a
  process manager (systemd / tmux / supervisor) for durability, not a bare shell.
- To redeploy after code changes: `bun run deploy` restarts the server; the
  tunnel stays up (it only proxies, doesn't care about app restarts).
- Secrets (Porkbun/CF keys) live in `.env` (gitignored, chmod 600) — never committed.
