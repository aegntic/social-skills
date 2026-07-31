<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Theming — Soft Industrial Clay (light + dark)

The site uses the ClayUI system (ported from `aesthetic-blanks/clayui`) on **Tailwind v4** (CSS-first, no tailwind.config). Everything theme-aware flows from RGB channel vars in `src/app/globals.css`:

- `:root` = light clay, `.dark` (on `<html>`) = dark clay. Flip the `--c-*` channels and every surface, shadow, text color, and utility follows.
- **Never hardcode hex colors** in markup. Use theme tokens: `text-ink`, `text-muted`, `text-slate-*`/`text-white` (remapped to clay channels in `@theme`), `bg-slate-800/900/950` (clay fills), `border-line`.
- Accent text: `text-acc-amber|cyan|purple|rose|emerald` (`@utility`, so `dark:`/`hover:` work). Brand accents: `text-wutang-metallic`, `text-azure-neon`, `btn-wutang`, `btn-azure` (kept brand, work in both themes).
- Clay primitives: `.clay` (raised surface), `.clay-inset` (sunk well), `.clay-pressable` (press-to-sink), `.clay-dark` (inverted surface), `.clay-gradient`, `.clay-text` (raised headings), `.clay-text-carved` (engraved — only on `.clay-dark`/`.clay-gradient`/dark mode).
- Components in `src/components/clay/`: `ClayButton`, `ClayCard`, `ClayInput`, `ClayToggle`, `ClayNav`, `ThemeToggle`. `cn()` lives in `src/lib/cn.ts`.
- Theme flip: `ThemeToggle` sets `.dark` on `<html>` + persists `localStorage["ss-theme"]`. No-FOUC inline script in `src/app/layout.tsx` (stored choice wins, else `prefers-color-scheme`).
- Fonts: Nunito (body) + Baloo 2 (display) via next/font → `--font-nunito` / `--font-baloo`.

**Gotchas**
- `bg-white` / `text-white` are remapped to clay channels — for an always-white or always-dark surface (image overlays, platform-brand tiles) use explicit hex or platform-brand classes.
- Custom CSS classes are NOT variant-compatible — if you need `dark:foo`, define `foo` with `@utility` in globals.css.
- Do not run `npm run build` while `next dev` is running — they share `.next` and corrupt it (module-not-found 500s). Stop dev first.
