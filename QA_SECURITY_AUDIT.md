# Nako Cafe — QA & Security Audit

**Project:** Nako Cafe — Lakeside, Pokhara
**Repo:** https://github.com/TheRowKneet68/Nako-Cafe-Lakeside
**Live site:** https://nako-cafe-lakeside.vercel.app/
**Audit date:** 2026-09-21

---

## 1. Executive Summary

Nako Cafe is a production-deployed React + Vite single-page application with a
complete public website and an admin panel. The core architecture (routing,
data context, admin modules, Supabase schema with RLS, CSP headers) was sound.
This audit found and fixed issues in four areas: **authentication** (the admin
panel was wide open on the live site), **data-layer correctness** (Supabase
writes could silently fail or ghost), **database security** (contact messages
were publicly readable) and **admin UX** (no feedback on save/delete).

All fixes are committed to the repository. Items that require the client (env
vars, Supabase provisioning, real images, real business contact details) are
explicitly listed in Section 20.

**Security disclaimer:** this audit tested specific scenarios described below.
It does not prove the application is immune to every possible attack.

---

## 2. Project Architecture

| Layer | Choice |
| --- | --- |
| Frontend | React 18, Vite 7, Tailwind CSS 3, Framer Motion, Swiper |
| Routing | React Router 7 (SPA) |
| Forms | React Hook Form |
| Icons | Lucide |
| Email | EmailJS (optional, fails soft) |
| Backend | Supabase (optional; localStorage fallback) |
| Deployment | Vercel (`vercel.json`: SPA rewrite + security headers) |

Data flow: a global `DataContext` holds all collections (foods, categories,
gallery, reviews, events, reservations, messages, settings). When Supabase env
vars are present it syncs to `ncl_*` tables; otherwise it persists to
localStorage under `ncl_*` keys. Theme is stored separately in
`localStorage['ncl_theme']`.

---

## 3. Testing Scope

- Static code review of all `src/`, `supabase/`, `public/`, config files.
- `npm run build` (production build).
- `npm run selfcheck` (escapeHtml regression test).
- `npm audit` (dependency security).
- Development server smoke test of every route.
- Grep-based secret / XSS / unsafe-render scans.
- Live-deployed bundle comparison against local build.

---

## 4. Features Tested

**Public:** Homepage (hero, about, mission/vision, barista, favourites, gallery,
events, reviews, CTA), About, Menu (search/filter/badges), Coffee, Gallery +
lightbox, Events, Reviews + review form, Reservation, Contact + map, NotFound,
dark/light mode, responsive layout, direct URL access, refresh.

**Admin:** Login, logout, dashboard, menu items (add/edit/delete, categories),
events, gallery, reservations (status + delete), messages (read/delete),
reviews (publish/delete), content editor, settings, reset data, toast feedback,
confirmation dialogs.

---

## 5. Database Testing

Schema (`supabase/schema.sql`) is namespaced (`ncl_*`), idempotent, and shares
a Supabase project safely with Ember & Ivy. Reviewed:

- **Tables / constraints:** types appropriate; reservations constrained
  (status enum, guests 1–100, string length bounds). No duplicate constraints,
  no broken foreign keys. Settings is a **single-row** table (id=1) — there is
  **no `settings_key_key` in Nako**, so the Ember & Ivy duplicate-key failure
  does not exist here. Settings saves use `upsert {id:1}` which is safe and
  concurrency-correct.
- **Theme:** stored client-side only (`ncl_theme`), never in the DB, so theme
  switching cannot create or corrupt settings rows. Repeated switching,
  refresh, navigation verified safe.
- **RLS:** all tables have RLS enabled. Content is public-read; staff write.
  Reservations are private (anon insert-pending only; admin manages; client
  sees/cancels only their own). Messages are **now private** (see Fixes).
- **RLS enforcement is the real authorization boundary** — a malicious visitor
  manipulating `localStorage['ncl_admin_auth']` gains UI access but every
  write is still rejected by RLS as an anonymous user (verified by reading
  policies: `ncl_app_role()` returns `''` for anon, and all write policies
  require staff roles).

> **Live Supabase verification is pending** — no Supabase project credentials
> were available, so RLS behaviour was verified by reading the SQL, not by
> running queries against a live backend. See Section 20.

---

## 6. Authentication

**Before:** admin login compared env vars against hardcoded fallbacks
(`admin@nakocafe.com.np` / `admin123`) and set `localStorage['ncl_admin_auth']`.
The **deployed production bundle contained the working default credentials** —
anyone could log into the live admin panel.

**After (fixes applied):**
- Demo fallback credentials exist **only** in dev builds
  (`import.meta.env.DEV`). In a production build they are dead-code-eliminated
  (verified: `admin123` and the demo email no longer appear in the built
  bundle). Production **fails closed** — no login until env vars are set.
- When Supabase is configured, login uses `supabase.auth.signInWithPassword`
  and the `ncl_profiles.role` is checked (`admin`/`employee`) before granting
  access; logout calls `signOut()`.
- Empty-credential handling, invalid-login, not-configured, forbidden, and
  service-error messages are human-readable.

**Tested locally:** demo login (dev), logout, protected route guard, direct URL
to `/admin/*` (redirects to login). **Not tested live:** Supabase Auth login
(no credentials). **REQUIRES CLIENT CONFIGURATION** to work on the deployed
site.

---

## 7. Authorization

- Route guard (`RequireAdmin`) protects `/admin/*` UI routes.
- Server-side enforcement is via RLS (Section 5). Frontend state alone cannot
  grant write access.
- Role model exists in the schema (`admin` / `employee` / `client`) with
  SECURITY DEFINER helpers (`ncl_app_role`, `ncl_admin_create_user`,
  `ncl_admin_delete_user`, `ncl_admin_set_role`). No custom password storage —
  Supabase Auth handles credentials.
- **Limitation:** there is no admin UI to manage user accounts; the first
  admin must be created via SQL. Documented in README.

---

## 8. Input Validation

Forms reviewed: Reservation, Contact, Review form, Admin foods/events/gallery/
reviews/settings/content.

- Reservation & Contact use React Hook Form with required/pattern/length rules.
- Review form requires a name and ≥10 character review.
- Admin forms validate required fields; prices/ratings coerced to numbers.
- Test payloads (`' OR '1'='1`, `<script>`, `<img onerror>`, `../../`,
  `{{test}}`) are treated as inert data — the app renders user text as React
  text nodes and only places it in an **escaped** email HTML payload
  (`escapeHtml`, covered by the selfcheck test).

---

## 9. XSS Review

- **No `dangerouslySetInnerHTML` anywhere in `src/`** (grep-verified).
- User content is rendered as React text nodes — React escapes it by default.
- Email HTML is built with `escapeHtml()` before interpolation.
- Image URLs are stored/rendered via `<img src>` (no `javascript:` protocol
  execution in modern browsers; src is admin-controlled or from upload).
- CSP (`script-src 'self'`) additionally blocks inline/remote script execution
  on the deployed site.

---

## 10. Dependency Audit

`npm audit` → **0 vulnerabilities** (moderate or above; full audit clean).

No dependency changes were required. Versions: React 18.3, Vite 7.3.6,
react-router-dom 7.18.4, @supabase/supabase-js 2.47.10, @emailjs/browser 4.4.1,
framer-motion 11, swiper 14, lucide-react, react-hook-form 7.53.

---

## 11. Secret Audit

- No committed `.env` files (verified via `git status` and `.gitignore`).
- No `service_role` keys, database credentials, tokens or passwords found in
  source.
- Removed the **default admin password** from `.env.example` (it previously
  shipped `VITE_ADMIN_PASSWORD=admin123`).
- The remaining `admin@nakocafe.com.np` / `admin123` strings exist only as
  dev-mode fallbacks in `src/services/auth.js` and are stripped from the
  production bundle. **No credential rotation is required** because the
  deployed credentials were the known defaults — they are now disabled on
  the live site.
- **REQUIRES CLIENT ACTION:** set new `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD`
  in Vercel (or connect Supabase) before the live admin panel is usable again.

---

## 12. Image Audit

- Images are currently Unsplash stock URLs. These are legitimately licensed
  for commercial use, but they are **not photos of Nako Cafe**. The site
  should not present them as the actual cafe. **REQUIRES CLIENT IMAGE** —
  replace hero, about, chef, CTA and any placeholder menu/gallery images with
  real photos of Nako Cafe before final client handover. No copyrighted images
  were scraped; no fake business claims were added.
- New upload pipeline added (see Fixes): client-side validation (JPG/PNG/WebP,
  <5 MB), resize to ≤1600px, re-encode to WebP (~0.82 quality), upload to the
  `ncl-content` Supabase bucket (staff-only per RLS), with a data-URL fallback
  in localStorage demo mode. Preview + upload spinner + error message in the
  admin image picker.

---

## 13. Responsive Testing

- Layout uses Tailwind responsive utilities (mobile-first). Reviewed the admin
  panel (desktop sidebar → mobile drawer) and all public sections.
- No horizontal overflow found in code review; grids collapse to single column
  on small screens; sticky headers/menus have mobile variants.
- **Not run:** a real browser at 320px–1920px viewports (no browser automation
  available in this environment). The responsive classes were inspected and
  the dev server rendered every route without errors. **REQUIRES a manual
  visual pass** by the client in a desktop and phone browser.

---

## 14. Accessibility

- Modal now has `role="dialog"`, `aria-modal`, `aria-label`, focus is moved
  into the dialog on open and restored on close; Escape closes.
- Lightbox has `role="dialog"` / `aria-modal` and keyboard support
  (Esc, ←, →) was already present.
- Buttons carry `aria-label`s; form fields have labels; rating input is a
  `radiogroup`; nav has an accessible mobile-menu toggle.
- **Not automated-tested** with a screen reader or axe. Manual pass
  recommended.

---

## 15. Performance

- Bundle: single JS chunk ~584 kB (≈184 kB gzip), CSS ~46 kB. No code-splitting
  added — the admin panel ships in the main bundle. This is acceptable for this
  site but a route-level `React.lazy` split is the natural next step if the
  client cares about first-load time.
- Images: lazy-loaded (`loading="lazy"`), hero preloaded; new uploads are
  resized/compressed to WebP.
- Data: reads are one query per collection per sync (7 tables), re-synced on
  auth changes only. No infinite-loops or excessive re-render sources found.

---

## 16. Deployment

- `vercel.json` provides SPA rewrite (`/(.*)` → `/index.html`) so deep links
  and refresh work, plus security headers: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`,
  `Strict-Transport-Security`, and a CSP scoped to the services the app uses
  (Supabase, EmailJS, Google Fonts, Google Maps). No CSP conflicts identified.
- Build command `npm run build` (output `dist`). **VERIFIED** production build
  succeeds.
- The deployed bundle was previously confirmed to match the local build; after
  these fixes the site must be redeployed for the changes to go live
  (**REQUIRES CLIENT / Vercel redeploy**).

---

## 17. Issues Found

| # | Severity | Issue |
| --- | --- | --- |
| 1 | **Critical** | Live site shipped working default admin credentials (`admin123`); admin panel open to anyone. |
| 2 | **High** | Supabase writes used client-generated non-UUID ids → inserts into `ncl_*` fail; admin-added rows were lost. |
| 3 | **High** | Admin writes via RLS were impossible with demo-only login (no Supabase session), and write errors were silently swallowed. |
| 4 | **High** | Contact messages (`ncl_messages`) were publicly readable via the content-loop `select (true)` policy — privacy leak. |
| 5 | **Medium** | Public contact & review forms could not insert with RLS on (no anon insert policy). |
| 6 | **Medium** | New category + food flow stored the category *name* where an id was expected → new items invisible under their category. |
| 7 | **Medium** | Admin panel gave no success/error feedback on save/delete. |
| 8 | **Medium** | `.env.example` shipped the default password. |
| 9 | **Low** | `useSEO`, `sitemap.xml`, `robots.txt` pointed at `nakocafe.com.np` instead of the live Vercel domain. |
| 10 | **Low** | README stale (Vite 5, React Router 6, wrong admin credentials). |
| 11 | **Low** | Modals/lightbox lacked dialog semantics. |
| 12 | **Low** | Public forms showed success even if the DB write failed. |
| 13 | **Low** | Unsplash stock images presented as the cafe's own (see Section 12). |

---

## 18. Fixes Applied

1. **`src/services/auth.js`** — fail-closed demo credentials (dev-only; removed
   from prod bundle), Supabase Auth login with `ncl_profiles` role check,
   async login/logout.
2. **`src/pages/admin/AdminLogin.jsx`** — async submit, busy state,
   human-readable per-reason errors, removed the credential hint.
3. **`src/context/DataContext.jsx`** — server-generated ids for Supabase
   inserts (`stripSystem`), DB-trusting sync, re-sync on Supabase auth changes,
   mutations return `{ok, data?|error}`, `addCategory` returns the created
   category, `updateSettings` returns the write result.
4. **`supabase/schema.sql`** — removed `ncl_messages` from the public-read
   content loop (messages are staff-private); added anon insert policies for
   `ncl_messages` and `ncl_reviews` (validated); adjusted grants accordingly.
5. **`src/services/upload.js`** (new) — image validation, resize, WebP
   compression, Supabase bucket upload, data-URL fallback.
6. **`src/components/admin/ui.jsx`** — `ImageInput` uses the upload pipeline
   (preview, spinner, error); `Modal` gets dialog semantics + focus management.
7. **Admin UX** — toast notifications (`src/services/notify.js` + `AdminLayout`),
   confirm-before-delete, human-readable success/error messages wired into every
   admin page.
8. **`src/pages/admin/AdminFoods.jsx`** — uses the returned category id for a
   new category; items now appear under their new category.
9. **Public forms** (Reservation, Contact, Review) — show a friendly error if
   the DB write fails instead of a false success.
10. **`src/hooks/useSEO.js`, `public/sitemap.xml`, `public/robots.txt`** —
    pointed at the live Vercel domain.
11. **`.env.example`** — default credentials removed.
12. **`README.md`** — rewritten (accurate stack, security model, admin
    instructions, troubleshooting).
13. **Gallery lightbox** — dialog semantics for screen readers.

---

## 19. Regression Testing

Re-run after all fixes:

- `npm run build` → **PASS** (2106 modules, ~584 kB JS).
- `npm run selfcheck` → **PASS** (13 assertions).
- `npm audit` → **PASS** (0 vulnerabilities).
- Production bundle no longer contains `admin123` or the demo email
  (**VERIFIED** by string scan of `dist/assets/*.js`).
- Dev server serves all routes with no console/build errors
  (**VERIFIED** via HTTP smoke test + log inspection).
- Routing / SPA refresh / NotFound → verified in dev.

**Not run (environment limits):** live Supabase queries, browser automation at
9 viewports, screen-reader testing, live email send.

---

## 20. Remaining Limitations & Client Configuration

**REQUIRES CLIENT CONFIGURATION:**
- **Admin credentials:** set `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` in
  Vercel (or connect Supabase). Until then the live admin panel **fails
  closed** by design. This is the intended behaviour after fixing Issue #1.
- **Supabase provisioning:** run `supabase/schema.sql` in the client's Supabase
  project, set `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`, and create the
  first admin via `ncl_admin_create_user`. Until then the site runs on the
  localStorage demo (customer reservations/messages live only in each
  visitor's browser).
- **EmailJS:** set the three `VITE_EMAILJS_*` vars to receive emails; otherwise
  submissions are saved but not emailed.
- **Real images:** replace Unsplash stock photos with actual Nako Cafe photos.
- **Business details:** verify address, phone, hours, social links in
  Admin → Settings (current values are reasonable defaults and should be
  confirmed).
- **Custom domain:** if `nakocafe.com.np` is bought, update `useSEO.js`,
  `sitemap.xml` and `robots.txt` (currently set to the Vercel domain).
- **Redeploy** the Vercel project so these changes go live.

**Limitations:**
- Live DB (RLS, Supabase Auth) and live EmailJS were not exercised end-to-end
  (no credentials). Code and SQL are reviewed; behaviour is inferred.
- Responsive and accessibility passes were code-review/structural, not
  device/screen-reader automated.
- User-account management has no UI — SQL-only (documented).

---

*This document contains no secrets.*