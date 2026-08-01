-- ============================================================
-- Nako Cafe — Supabase schema
-- Run in the Supabase SQL editor (Dashboard → SQL → New query).
-- Column names are quoted camelCase to match the app's data model.
-- The app works WITHOUT this backend (falls back to localStorage).
-- ============================================================

create table if not exists categories (
  id text primary key,
  name text not null
);

create table if not exists foods (
  id text primary key,
  name text not null,
  description text,
  price numeric not null default 0,
  category text,
  image text,
  veg boolean default true,
  spicy integer default 0,
  popular boolean default false,
  new boolean default false,
  rating numeric default 4.5,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id text primary key,
  src text not null,
  alt text,
  category text,
  created_at timestamptz default now()
);

create table if not exists reservations (
  id text primary key,
  name text not null,
  phone text,
  email text,
  guests integer default 2,
  date text,
  time text,
  request text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id text primary key,
  name text not null,
  email text,
  subject text,
  message text,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id text primary key,
  name text not null,
  location text,
  rating numeric default 4.5,
  text text,
  created_at timestamptz default now()
);

create table if not exists settings (
  id integer primary key default 1,
  name text,
  tagline text,
  address text,
  phone text,
  mobile text,
  email text,
  whatsapp text,
  "mapQuery" text,
  "openingDays" text,
  "openingHours" text,
  "priceRange" text,
  instagram text,
  facebook text,
  twitter text,
  youtube text,
  -- editable website content (admin → Content Editor)
  "heroBadge" text,
  "heroTitle" text,
  "heroHighlight" text,
  "heroSubtitle" text,
  "aboutEyebrow" text,
  "aboutTitle" text,
  "aboutTitleHighlight" text,
  "aboutText1" text,
  "aboutText2" text,
  mission text,
  vision text,
  "chefName" text,
  "chefRole" text,
  "chefBio" text,
  "signatureEyebrow" text,
  "signatureTitle" text,
  "signatureSubtitle" text,
  "galleryEyebrow" text,
  "galleryTitle" text,
  "gallerySubtitle" text,
  "reviewsEyebrow" text,
  "reviewsTitle" text,
  "reviewsSubtitle" text,
  "ctaTitle" text,
  "ctaTitleHighlight" text,
  "ctaSubtitle" text,
  "footerAbout" text
);

-- Seed the settings row
insert into settings (id, name, tagline, address, phone, email, whatsapp, "mapQuery", "openingDays", "openingHours", "priceRange")
values (
  1,
  'Nako Cafe',
  'Crafted Coffee. Meaningful Moments.',
  'Lakeside Road, Pokhara 33700, Nepal',
  '+977 61-456789',
  'hello@nakocafe.com.np',
  '9779801234567',
  'Lakeside, Pokhara, Nepal',
  'Open Daily',
  '7:00 AM – 9:00 PM',
  'Rs 1–500'
)
on conflict (id) do nothing;

-- Real-time (optional, enables live admin updates)
alter publication supabase_realtime add table foods, gallery, reservations, contact_messages, reviews;

-- Row Level Security: allow anon read/write for demo simplicity.
-- For production, restrict this (e.g. read-only anon, write via auth).
alter table foods enable row level security;
alter table gallery enable row level security;
alter table reservations enable row level security;
alter table contact_messages enable row level security;
alter table reviews enable row level security;
alter table settings enable row level security;
alter table categories enable row level security;

create policy "anon read foods" on foods for select using (true);
create policy "anon read gallery" on gallery for select using (true);
create policy "anon read reservations" on reservations for select using (true);
create policy "anon read contact_messages" on contact_messages for select using (true);
create policy "anon read reviews" on reviews for select using (true);
create policy "anon read settings" on settings for select using (true);
create policy "anon read categories" on categories for select using (true);

create policy "anon write foods" on foods for all using (true) with check (true);
create policy "anon write gallery" on gallery for all using (true) with check (true);
create policy "anon write reservations" on reservations for all using (true) with check (true);
create policy "anon write contact_messages" on contact_messages for all using (true) with check (true);
create policy "anon write reviews" on reviews for all using (true) with check (true);
create policy "anon write settings" on settings for all using (true) with check (true);
create policy "anon write categories" on categories for all using (true) with check (true);
