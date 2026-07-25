# Deploy — socialskills.ninja

Live at **https://socialskills.ninja** (and **www.socialskills.ninja**).
Both verified 200 with correct page content.

## Architecture

```
socialskills.ninja / www.socialskills.ninja  (CF DNS, proxy on)
        │
        ▼  CNAME → 8ebebe32.cfargotunnel.com
cloudflared tunnel (QUIC, syd05/syd08 edge)
        │
        ▼  localhost:3200
next start (NODE_ENV=production, standalone build)
```

## Why Cloudflare Tunnel (not Pages, not Workers, not direct)

- **Cloudflare Pages** — served 404 on all routes (deployment status None).
- **Workers via OpenNext** — Node 24 + OpenNext esbuild breaks on this host.
- **Direct Fly origin via CF proxy** — 525 (CF TLS handshake fails to Fly).
- **Cloudflare Tunnel** — works reliably: CF edge to tunnel to localhost:3200.

## Run it

```bash
# Build + start the prod server (port 3200)
bun run deploy

# In a separate process, start the tunnel
cloudflared tunnel --config /home/ae/.cloudflared/config.yml run
```

`cloudflared` is installed system-wide.
The tunnel `social-skills` (id 8ebebe32) and its credentials
exist at ~/.cloudflared/. DNS records point to the tunnel UUID
CNAME (proxied via Cloudflare).

## Also deployed to Fly

`flyctl deploy --remote-only` also works. Fly app at
`https://social-skills.fly.dev/` (verified 200) as a fallback origin.
