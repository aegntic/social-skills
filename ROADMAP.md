# Publisher Rollout — socialskills.ninja

Bluesky is shipped real (`src/lib/publishers/bluesky.ts`, commit `85f9a4e`). This
file sequences the remaining 7 platforms. Produced by an ultracode research sweep
(7 platform agents + synthesis, 2026 API reality, web-verified).

## How a platform ships

Every platform follows the Bluesky pattern: **one new file** in
`src/lib/publishers/` + **one entry** in each dispatch map in `index.ts`
(`WIRED_PLATFORMS`, `NEEDS_CREDENTIALS`, `publishToPlatform`, `fetchMetrics`) +
a `NEEDS_CREDENTIALS` mirror in `AccountManager.tsx`. Credentials reuse
`src/lib/crypto.ts` (AES-256-GCM, `SS_MASTER_KEY`) — never invent a new secret store.

Two platform shapes diverge from Bluesky's app-password field:
- **OAuth platforms** (Twitter, LinkedIn, YouTube, Pinterest, Facebook, TikTok)
  need a `/api/oauth/<platform>/{start,callback}` route pair + an "Authorize" button
  in `AccountManager`, not a password field. Extract a shared `OAuthAccountButton`
  during the Twitter phase and reuse for all six.
- **URL-media platforms** (Instagram, Facebook, TikTok) fetch media by public HTTPS
  URL, not bytes. Need a shared `src/lib/media-hosting.ts` (R2/S3/CDN URL minter)
  before those three.

## Ranking (soonest-usable first)

| # | Platform | Gate | Gate wks | Effort LOC | Metrics (free tier) |
|---|----------|------|---------:|-----------:|---------------------|
| 1 | Twitter/X | none (dev-account approval, days) | 0 | ~600 | ❌ views/impressions paywalled → honest null |
| 2 | LinkedIn | none (`w_member_social` open perm) | 0 | ~320 | ❌ `r_member_postAnalytics` restricted → honest zeros |
| 3 | YouTube | Google sensitive-scope verification | 4–8 | ~280 | ✅ viewCount/likeCount/commentCount FREE |
| 4 | Pinterest | Standard Access review | 3–6 | ~420 | ✅ impressions/saves/clicks FREE |
| 5 | Instagram | Meta App Review (`instagram_content_publish`) | 3–5 | ~450 | ✅ rich insights FREE |
| 6 | Facebook | Meta App Review + Business Verification | 2–6 | ~650 | ✅ full page metrics FREE |
| 7 | TikTok | scope review + Direct Post audit (stacked) | 2–6 | ~650 | ✅ view/like/comment/share FREE |

**Start every external review NOW, in parallel with coding** — the calendar is the
long pole, not the code. Submit the moment the OAuth callback URL exists.

## Phases

### Phase 1 — Twitter/X  `gate: none`
Real posting on Free/pay-per-use. `fetchMetrics` returns honest null (metrics paywalled).
Establishes the OAuth scaffold every other OAuth platform reuses.
- `NEW src/lib/publishers/twitter.ts` (~600 LOC): PKCE authorize/token + refresh-token rotation (`offline.access`); v2 chunked media upload (`upload.twitter.com/2/media/upload` init→append→finalize, OAuth 1.0a HMAC-SHA1 signer as fallback if bearer rejected); `POST api.x.com/2/tweets`.
- `NEW src/app/api/oauth/twitter/{start,callback}/route.ts`: PKCE + state in HttpOnly cookie; encrypt token bundle via `crypto.ts`.
- `EDIT index.ts`, `types.ts` (credentials = ciphertext of `{accessToken, refreshToken, expiresAt, oauth1Token?, oauth1Secret?}`), `store.ts` (token-refresh preflight), `AccountManager.tsx` (extract `OAuthAccountButton`), `.env.sample` (`TWITTER_CLIENT_ID/SECRET/REDIRECT_URI`).
- **Open Qs to confirm first:** does Free tier still allow `POST /2/tweets` for new 2026 accounts (vs forced pay-per-use)? Does `upload.twitter.com` accept OAuth 2.0 bearer or still require OAuth 1.0a?

### Phase 2 — LinkedIn  `gate: none`
- `NEW src/lib/publishers/linkedin.ts` (~320 LOC): `POST api.linkedin.com/rest/posts` (pin `Linkedin-Version` constant); image helper = init upload → PUT bytes → poll until AVAILABLE → attach. `fetchMetrics` → honest zeros.
- OAuth routes + `OAuthAccountButton` reuse. `store.ts`: surface "reconnect" when 60-day token near expiry (no silent refresh for non-partners).

### Phase 3 — YouTube  `gate: Google verification 4–8 wks — START NOW`
Best metrics story (full + free). **No text/image API** — publisher must reject payloads without video bytes.
- `NEW src/lib/publishers/youtube.ts` (~280 LOC): resumable upload (`googleapis.com/upload/youtube/v3/videos` → Location → PUT chunks); `videos.list?part=statistics` for metrics. `metricsRef` = 11-char video id.
- OAuth routes. `.env.sample`: `GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI`, `GOOGLE_API_KEY` (metrics readback). In Testing mode refresh tokens expire every 7 days until verification lands.

### Phase 4 — Pinterest  `gate: Standard Access review 3–6 wks — START NOW`
Free business-account metrics. Pins are HIDDEN until review passes.
- `NEW src/lib/publishers/pinterest.ts` (~420 LOC): `POST api.pinterest.com/v5/pins`; 4-step media flow (init → S3 upload → poll → `video_id`); internal `refreshAccessToken`. `fetchMetrics` via `/v5/pins/{id}/analytics`. Needs a `boardId` selector.
- OAuth routes + board selector in `AccountManager`.

### Phase 5 — Shared media infra (prereq for IG/FB/TikTok)
- `NEW src/lib/media-hosting.ts` (~80–120 LOC): upload bytes → public HTTPS URL (R2 preferred — creds already in `.env`). Single adapter, reused by IG/FB/TikTok. Do NOT let each publisher mint URLs.
- `NEW src/app/api/meta/data-deletion/route.ts`: Meta's required data-deletion callback (hard App Review dependency for IG + FB).

### Phase 6 — Instagram  `gate: Meta App Review 3–5 wks — START NOW` · blockedBy Phase 5
Free rich insights. IG fetches media by public URL (uses Phase 5). JPEG-only images; Reels MP4/H.264 vertical. 25 posts/24h.
- `NEW src/lib/publishers/instagram.ts` (~450 LOC): create media container → poll status → `media_publish`; `insights` for metrics.
- OAuth (`instagram_content_publish` scope). `store.ts`: guard "Instagram requires media"; 60-day token refresh.

### Phase 7 — Facebook  `gate: Meta App Review + Business Verification 2–6 wks — START NOW` · blockedBy Phase 5
Worst gate. Pages only (personal deprecated). Posts admin-only/invisible until Advanced Access. 60-day token, no silent refresh.
- `NEW src/lib/publishers/facebook.ts` (~650 LOC): derive page token at publish; `/feed`, `/photos`, `/videos` (resumable); `insights` for full metrics.
- OAuth (`pages_manage_posts`, `pages_read_engagement`). Business Verification needs legal entity docs.

### Phase 8 — TikTok  `gate: scope review 2–6 wks + Direct Post audit — START BOTH NOW` · blockedBy Phase 5
Stacked reviews. Tokens expire every 24h (refresh inline before each publish). Posts forced PRIVATE until audit passes. Uses Phase 5 media hosting (or FILE_UPLOAD chunking).
- `NEW src/lib/publishers/tiktok.ts` (~650 LOC): token refresh → `/v2/post/publish/video/init/` or `/content/init/` (photos) → poll status → `video/query` for metrics.
- OAuth (`video.publish`, `video.upload`, `video.list`, `user.info.basic`).

## Shared decisions (lock these once)

- **Callback route convention:** `/api/oauth/<platform>/{start,callback}/route.ts` for all OAuth platforms.
- **Token refresh:** lazy, on-demand inside `publishToAccounts` (no background worker — standalone runtime, single JSON db). Encapsulate in `src/lib/publishers/oauth.ts` shared helper during Phase 1.
- **AccountManager:** one `OAuthAccountButton` component (button + status + reconnect) extracted in Phase 1; Bluesky keeps its app-password field.
- **Meta Graph API version:** pin ONE constant (confirm current 2026 version — findings cited both v23.0 and v26.0; verify before IG/FB).

## Open questions (resolve before/while coding)

1. X Free tier in 2026 — still allows `POST /2/tweets` for new accounts, or pay-per-use only? Confirm ~$0.20/URL-post + ~$0.005/read cost if so.
2. `upload.twitter.com/2/media/upload` — OAuth 2.0 bearer accepted, or OAuth 1.0a required? (Affects twitter.ts complexity.)
3. LinkedIn `r_member_postAnalytics` — truly restricted, or self-serve Creator Tools without partner approval?
4. YouTube `videos.insert` quota (1,600 units?) + 100/day hard cap — confirm in Cloud Console.
5. Pinterest Standard Access rejection causes — what app-quality signals avoid rejection?
6. Meta data-deletion callback — exact response shape Meta expects (Phase 5).
7. TikTok PULL_FROM_URL — which domains pre-verified; does the standalone host qualify or must media go via `media-hosting.ts`?
8. Graph API version — v23.0 vs v26.0, pin one.
