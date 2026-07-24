# Deploy — socialskills.ninja

The app is live at **https://social-skills.fly.dev/**
(verified 200, `/journey` → 200, correct title).

`https://socialskills.ninja` returns 525 via Cloudflare proxy —
a known CF↔Fly TLS incompatibility on the CNAME route.
Fly's DNS resolution over CF's proxy edge fails. The fix is
documented below.

## Architecture

```
social-skills.fly.dev  ──► Fly Machines (iad)
                          ── Docker: node:22-alpine
                          ── next start :8080 (standalone)
                          ── 2 machines, auto restart

socialskills.ninja DNS ──► CNAME → social-skills.fly.dev (Cloudflare proxy)
                            currently 525 (CF can't reach Fly via proxy)
```

## Running Locally

```bash
# Build + start production server on :8080
NODE_ENV=production bun run build
bun run start        # starts on :3456 (fly.toml internal_port)
NODE_ENV=production bun run start -p 3200  # for local dev

# Deploy to Fly (requires flyctl auth)
flyctl deploy --remote-only --yes
```

## Fixing socialskills.ninja (525 → live)

The `socialskills.ninja` apex CNAME routes through CF's proxy (orange cloud)
which breaks TLS to Fly origin.

**Option A — Cloudflare Tunnel (recommended):**
Use `cloudflared` (already installed) to tunnel without proxy:
```bash
cloudflared tunnel --config /home/ae/.cloudflared/config.yml run
```
This was working earlier (`socialskills.ninja` → tunnel → :3200). Re-enable
by switching the DNS record at `socialskills.ninja` back to the tunnel
UUID CNAME `8ebebe32-ba8a-4bd4-9593-50dfe7c976de.cfargotunnel.com` (proxied).

**Option B — DNS-only (grey cloud):**
Set `socialskills.ninja` as A record → `66.241.125.55` (proxied: false).
Fly's shared ingress IP. No SSL (HTTP only), so not ideal for production.

**Option C — Use fly.dev directly:**
The working URL is `https://social-skills.fly.dev/`. Update any references
to use this hostname until the DNS issue is resolved.

## Notes

- Fly tunnel was working and the app was accessible via `socialskills.ninja`
  before the DNS record was changed to `fly.dev` CNAME (which broke 525).
- Reverting `socialskills.ninja` to a CNAME pointing at the tunnel UUID
  (not `social-skills.fly.dev`) restores the working path.
- `fly.toml.bak` is a backup; can be removed.
