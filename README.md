# Nako Cafe ☕

A specialty coffee shop website for **Nako Cafe, Lakeside, Pokhara** — built with React 18, Vite 7, Tailwind CSS 3 and Framer Motion. Warm minimal coffee theme with dark mode, fully responsive, and a complete admin panel usable by non-technical staff.

Live site: **https://nako-cafe-lakeside.vercel.app/**

![Tech](https://img.shields.io/badge/React-18-blue) ![Tech](https://img.shields.io/badge/Vite-7-purple) ![Tech](https://img.shields.io/badge/Tailwind-3-cyan) ![Tech](https://img.shields.io/badge/Framer%20Motion-11-pink)

---

## ✨ Features

**Public website**
- **Home** — hero, story/about, mission & vision, barista intro, customer favourites, gallery preview, events preview, reviews, CTA banner
- **About** — story, mission, vision, barista
- **Menu** — search + category filters, veg / spicy / popular / new badges
- **Coffee** — Spanish Latte feature page
- **Gallery** — masonry layout, hover effects, keyboard-friendly lightbox
- **Events** — upcoming/past list with countdown
- **Reviews** — guest reviews + public review form
- **Reservation** — validated form (React Hook Form) with success animation
- **Contact** — info cards, contact form, embedded Google Map, opening hours
- **Extras** — sticky navbar, mobile drawer, dark/light mode, preloader, custom cursor, back-to-top, floating WhatsApp/Instagram buttons, page transitions
- **SEO** — per-page meta tags, Open Graph, JSON-LD structured data, lazy images

**Admin panel** (`/admin`)
- **Dashboard** — live stats, recent reservations & messages
- **Menu Items** — add / edit / delete with image upload, categories, badges, spice level
- **Events** — add / edit / delete with image upload, featured flag
- **Gallery** — add / delete photos
- **Reservations** — confirm / cancel / delete
- **Messages** — read / unread / delete
- **Reviews** — publish / delete
- **Content Editor** — every section's text (hero, about, mission, barista, favourites, events, gallery, reviews, CTA, footer), every page header banner, homepage stats & numbers, about value cards, amenities & atmosphere groups, coffee page (intro, "why it's a legend", how we brew), and barista counters
- **Settings** — business info, hours, social links, map query
- **Images** — upload/replace every site image (hero, about, barista, CTA, coffee) plus menu/event/gallery photos; files are validated, resized and compressed to WebP automatically

Every admin action shows a clear success/error message. Confirmation is required before any delete.

## 🧱 Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + Vite 7 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion, Swiper |
| Routing | React Router 7 |
| Forms | React Hook Form |
| Icons | Lucide |
| Email | EmailJS (optional) |
| Backend | Supabase (optional — falls back to localStorage) |

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173** — the site runs fully offline out of the box.

Production build:

```bash
npm run build
npm run preview
```

Run the security self-check:

```bash
npm run selfcheck
```

---

## 🔐 Admin Panel

| | |
| --- | --- |
| URL | `/admin` |

**Local development only** — the demo account is `admin@nakocafe.com.np` / `admin123`.

**Production (the deployed Vercel site) FAILS CLOSED.** No default password works there. The owner must set `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD` in the Vercel project environment variables, or connect Supabase (recommended) so staff sign in with their Supabase Auth account.

If **Supabase is configured**, the `VITE_ADMIN_*` variables are ignored and login uses Supabase Auth instead. The user must have a row in `ncl_profiles` with role `admin` or `employee`. Create the first admin:

```sql
-- run in the Supabase SQL editor (once the schema.sql has been run)
select public.ncl_admin_create_user('your.email@example.com', 'a-strong-password', 'admin');
```

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and fill in what you need. Everything is **optional** — leave blank to run offline.

```env
# Supabase (OPTIONAL backend)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# EmailJS (OPTIONAL — powers Contact + Reservation emails)
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

# Admin login — REQUIRED in production (dev has a demo fallback)
VITE_ADMIN_EMAIL=
VITE_ADMIN_PASSWORD=
```

## 🗄️ Supabase (Optional Backend)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the script in [`supabase/schema.sql`](supabase/schema.sql) — it is idempotent and namespaced (`ncl_*`) so it can share a project with other apps.
3. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`.
4. Restart the dev server. Menu, categories, gallery, reviews, reservations, messages and settings now sync to Supabase tables with Row Level Security:
   - Public visitors can read content and submit reservations/reviews/messages.
   - Contact messages are private — staff only.
   - Only admins manage reservations, settings and user accounts.
   - Image uploads go to the `ncl-content` storage bucket (only staff can upload).

> No Supabase config? The app automatically persists everything to `localStorage`, so you can demo it immediately.

## ✉️ EmailJS (Optional)

Create an account at [emailjs.com](https://www.emailjs.com), add your service + template, and set the three `VITE_EMAILJS_*` variables. The contact and reservation forms send a copy of every submission to your inbox. Without config, they still save the submission to the admin panel.

## 🖼️ Images

**Everything on the site is editable from the admin panel and stored in the database.** All site images (hero, about photos, barista, CTA banner, coffee page) are admin-manageable via the Content Editor; menu/event/gallery images are managed in their own sections. Every image is uploaded as an optimized WebP file (validated for type/size, resized to a maximum of 1600px, re-encoded at ~0.82 quality), stored in the Supabase `ncl-content` bucket (or an optimized data-URL in localStorage demo mode), and the resulting URL is saved to the database.

Structured blocks (homepage stats, about value cards, amenities & atmosphere, coffee-page content, barista counters, page-header banners) are stored in the `sections` JSONB column of `ncl_settings` and edited in the Content Editor.

---

## 📁 Project Structure

```
├── supabase/schema.sql          # Optional backend schema (ncl_* tables + RLS)
├── tests/security-selfcheck.mjs # Dependency-free security regression test
├── public/                      # favicon, robots.txt, sitemap.xml
└── src/
    ├── components/
    │   ├── admin/               # Admin UI (modal, image input, stat card…)
    │   ├── layout/              # Navbar, Footer, Preloader, Cursor, BackToTop, WhatsApp
    │   ├── sections/            # Hero, About, Signature, Stats, Gallery, Reviews, CTA…
    │   └── ui/                  # Reusable: Reveal, FoodCard, Badges, RatingStars…
    ├── context/DataContext.jsx  # Global data store (localStorage ↔ Supabase)
    ├── data/                    # Seed data: foods, categories, gallery, reviews, settings
    ├── hooks/                   # useCountUp, useSEO, useTheme
    ├── pages/                   # Home, About, Menu, Coffee, Gallery, Reviews, Reservation, Contact
    ├── pages/admin/             # Dashboard, Foods, Events, Gallery, Reservations, Messages, Reviews, Content, Settings
    ├── services/                # supabaseClient, emailService, auth, upload, notify, analytics
    └── utils/helpers.js
```

## 📦 Deployment

### Vercel (current)
- Import the repo → framework preset **Vite** (build `npm run build`, output `dist`).
- Add the environment variables in **Project → Settings → Environment Variables**.
- SPA routing and security headers (CSP, etc.) are handled by `vercel.json`.
- Deploy. Then set `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` (or Supabase) so admin login works.

### Netlify / static hosting
- Build command `npm run build`, publish directory `dist`, add env vars. Client-side routing works via fallback to `index.html`.

## ♿ Accessibility & Performance

- Semantic HTML, `aria-label`s, keyboard-navigable lightbox (Esc / ← →), focus-managed modals
- Lazy-loaded images, preloaded hero, `prefers-reduced-motion` support
- Optimized bundle with Vite; images compressed to WebP on upload

## 🛟 Troubleshooting

- **Can't log into admin on the live site** — the production build fails closed. Set `VITE_ADMIN_EMAIL`/`VITE_ADMIN_PASSWORD` in Vercel, or connect Supabase.
- **Site shows demo data even though Supabase is configured** — make sure the schema ran and `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` are set in your env.
- **Contact/review forms fail in Supabase mode** — the schema must be applied; inserts are validated server-side.

---

© Nako Cafe, Pokhara. Built with ♥ in Nepal.