# Nako Cafe ☕

A specialty coffee shop website for **Nako Cafe, Lakeside, Pokhara** — built with React, Vite, Tailwind CSS and Framer Motion. Warm minimal coffee theme with dark mode, fully responsive, and a complete admin panel.

![Tech](https://img.shields.io/badge/React-18-blue) ![Tech](https://img.shields.io/badge/Vite-5-purple) ![Tech](https://img.shields.io/badge/Tailwind-3-cyan) ![Tech](https://img.shields.io/badge/Framer%20Motion-11-pink)

---

## ✨ Features

- **Landing** — parallax hero with steam animation, animated scroll indicator, staggered reveals
- **About** — story, mission, vision, why-choose-us, barista intro, animated counters
- **Spanish Latte Feature** — dedicated Coffee page for our most-loved cup
- **Full Digital Menu** — search + category filters, veg / spicy / popular / new badges
- **Gallery** — masonry layout, hover effects, keyboard-friendly lightbox
- **Reviews** — average rating **4.9 / 5** with original testimonials
- **Reservation** — validated form (React Hook Form) with success animation
- **Contact** — info cards, contact form, embedded Google Map, opening hours
- **Extras** — sticky navbar, mobile drawer, dark mode toggle, preloader, custom cursor, back-to-top, floating WhatsApp button, page transitions
- **SEO** — per-page meta tags, Open Graph, Cafe structured data (JSON-LD), lazy images
- **Admin Panel** — dashboard stats, manage foods/gallery/reviews, handle reservations & messages, edit opening hours/settings

## 🧱 Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion, Swiper |
| Routing | React Router 6 |
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

---

## 🔐 Admin Panel

| | |
| --- | --- |
| URL | `http://localhost:5173/admin` |
| Email | `admin@viewside.com` |
| Password | `admin123` |

Credentials can be changed with `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` (see below). The admin panel manages menu items, gallery, reservations, contact messages, reviews and site settings. Data is persisted in `localStorage` by default.

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

# Admin login (defaults: admin@viewside.com / admin123)
VITE_ADMIN_EMAIL=
VITE_ADMIN_PASSWORD=
```

## 🗄️ Supabase (Optional Backend)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the script in [`supabase/schema.sql`](supabase/schema.sql).
3. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`.
4. Restart the dev server. Menu, gallery, reviews, reservations and messages now sync to Supabase tables (`foods`, `categories`, `gallery`, `reservations`, `contact_messages`, `reviews`, `settings`).

> No Supabase config? The app automatically persists everything to `localStorage`, so you can demo it immediately.

## ✉️ EmailJS (Optional)

Create an account at [emailjs.com](https://www.emailjs.com), add your service + template, and set the three `VITE_EMAILJS_*` variables. The contact and reservation forms send a copy of every submission to your inbox. Without config, they simulate a successful send.

---

## 📁 Project Structure

```
├── supabase/schema.sql          # Optional backend schema
├── public/favicon.svg
└── src/
    ├── components/
    │   ├── admin/               # Admin UI (guard, modal, image input, stat card…)
    │   ├── layout/              # Navbar, Footer, Preloader, Cursor, BackToTop, WhatsApp
    │   ├── sections/            # Hero, About, Signature, Stats, Gallery, Reviews, CTA
    │   └── ui/                  # Reusable: Reveal, FoodCard, Badges, RatingStars…
    ├── context/DataContext.jsx  # Global data store (localStorage ↔ Supabase)
    ├── data/                    # Seed data: foods, categories, gallery, reviews, settings
    ├── hooks/                   # useCountUp, useSEO
    ├── pages/                   # Home, About, Menu, Coffee, Gallery, Reviews, Reservation, Contact
    ├── pages/admin/             # Dashboard, Foods, Gallery, Reservations, Messages, Reviews, Settings
    ├── services/                # supabaseClient, emailService, auth
    └── utils/helpers.js
```

## 📦 Deployment

### Vercel
- Import the repo → framework preset **Vite** (build `npm run build`, output `dist`) → add the `.env` variables → Deploy.

### Netlify
- Build command `npm run build`, publish directory `dist`, add env vars in **Site settings → Environment**.

### Static hosting (any)
- `npm run build` → upload the `dist/` folder. Client-side routing works via fallback to `index.html`.

## ♿ Accessibility & Performance

- Semantic HTML, `aria-label`s, keyboard-navigable lightbox (Esc / ← →)
- Lazy-loaded images, preloaded hero, `prefers-reduced-motion` support
- Optimized bundle with Vite

---

© Nako Cafe, Pokhara. Built with ♥ in Nepal.
