-- ============================================================
-- Nako Cafe Lakeside — Supabase schema (namespace: ncl_)
-- Run this in the Supabase SQL editor after creating your project.
-- The script is idempotent — it can be run again safely.
--
-- This project shares a Supabase project with Ember & Ivy. EVERY object
-- below is namespaced with the `ncl_` prefix so nothing collides with
-- Ember & Ivy's tables/functions/buckets. Never drop, alter, or overwrite
-- an Ember & Ivy object.
--
-- ACCESS ROLES (stored in the `ncl_profiles` table, set inside the app):
--   * admin    — full access: content, reservations, settings, users, uploads
--   * employee — content only (menu, categories, gallery, reviews, events)
--                + image uploads. NOT reservations, settings or users.
--   * client   — a guest portal: can only read + cancel their OWN
--                reservations (matched on the booking email).
--
-- ROW LEVEL SECURITY:
--   * Public visitors (anon) can only:
--       - SELECT content tables
--       - SELECT the single public settings row used to render the site
--       - INSERT their own reservation (status locked to 'pending')
--       - Track the aggregate "visits" counter (via ncl_track_visit)
--   * Admins/employees write content; only admins touch settings,
--     reservations, analytics and user accounts.
--   * Accounts created before this script have NO ncl_profiles row;
--     ncl_app_role() returns '' for them (public read-only) until an
--     admin assigns a role.
--
-- The app works entirely WITHOUT this backend (falls back to localStorage).
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- Tables ----------

create table if not exists public.ncl_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists public.ncl_foods (
  id uuid primary key default gen_random_uuid(),
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

create table if not exists public.ncl_gallery (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text,
  category text,
  created_at timestamptz default now()
);

create table if not exists public.ncl_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text,
  time text,
  tag text,
  description text,
  image text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.ncl_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  rating numeric default 4.5,
  text text,
  created_at timestamptz default now()
);

create table if not exists public.ncl_reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  guests integer default 2,
  date text,
  time text,
  request text,
  status text default 'pending',   -- pending | confirmed | cancelled
  created_at timestamptz default now()
);

create table if not exists public.ncl_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  subject text,
  message text,
  read boolean default false,
  created_at timestamptz default now()
);

-- Business settings + site content text. Flat single-row shape used by the app.
create table if not exists public.ncl_settings (
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
  "eventsEyebrow" text,
  "eventsTitle" text,
  "eventsSubtitle" text,
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

create table if not exists public.ncl_analytics (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value numeric default 0,
  updated_at timestamptz default now()
);

-- User accounts: one row per auth user holding their access role.
create table if not exists public.ncl_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'employee'
    check (role in ('admin', 'employee', 'client')),
  created_at timestamptz default now()
);

-- ---------- Row Level Security ----------
alter table public.ncl_categories   enable row level security;
alter table public.ncl_foods        enable row level security;
alter table public.ncl_gallery      enable row level security;
alter table public.ncl_events       enable row level security;
alter table public.ncl_reviews      enable row level security;
alter table public.ncl_reservations enable row level security;
alter table public.ncl_messages     enable row level security;
alter table public.ncl_settings     enable row level security;
alter table public.ncl_analytics    enable row level security;
alter table public.ncl_profiles     enable row level security;

-- Grant the app roles base privileges (RLS still enforces what each
-- role may actually do).
grant select on public.ncl_categories, public.ncl_foods, public.ncl_gallery,
  public.ncl_events, public.ncl_reviews, public.ncl_messages,
  public.ncl_settings, public.ncl_profiles to anon, authenticated;
grant insert, update, delete on public.ncl_categories, public.ncl_foods,
  public.ncl_gallery, public.ncl_events, public.ncl_reviews,
  public.ncl_messages, public.ncl_settings, public.ncl_reservations,
  public.ncl_profiles to authenticated;
grant select on public.ncl_analytics to anon, authenticated;
grant select, insert on public.ncl_reservations to anon, authenticated;

-- ---------- Role helper ----------
-- Returns the caller's access role ('' when they have no profile yet).
-- SECURITY DEFINER so RLS policies can call it without recursion.
create or replace function public.ncl_app_role() returns text
language sql stable security definer set search_path = public as $$
  select coalesce((select role from public.ncl_profiles where id = auth.uid()), '')
$$;

-- Auto-add a profile when a new auth account signs up (never admins by default).
create or replace function public.ncl_handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.ncl_profiles (id, email, role)
  values (new.id, lower(new.email), 'employee')
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created_ncl on auth.users;
create trigger on_auth_user_created_ncl
  after insert on auth.users
  for each row execute function public.ncl_handle_new_user();

-- NOTE: unlike Ember & Ivy we do NOT backfill existing accounts as admins —
-- they simply have no ncl_profiles row and read publicly until assigned a role.

-- ---------- Content: everyone can read; staff (admin/employee) can write ----------
do $$
declare
  p text;
  t text;
begin
  foreach t in array array['ncl_categories','ncl_foods','ncl_gallery','ncl_events','ncl_reviews','ncl_messages']
  loop
    p := '_read_' || t;
    execute format('drop policy if exists %I on public.%I;', p, t);
    execute format('create policy %I on public.%I for select using (true);', p, t);
    p := '_staff_' || t;
    execute format('drop policy if exists %I on public.%I;', p, t);
    execute format(
      'create policy %I on public.%I for all to authenticated using (public.ncl_app_role() in (''admin'',''employee'')) with check (public.ncl_app_role() in (''admin'',''employee''));',
      p, t
    );
  end loop;
end $$;

-- ---------- Reservations ----------
-- Public visitors can submit a booking (always 'pending'); the data is
-- never publicly readable.
drop policy if exists _insert_ncl_reservations on public.ncl_reservations;
create policy _insert_ncl_reservations on public.ncl_reservations
  for insert to anon, authenticated
  with check (status is null or status = 'pending');

-- Only admins can see/manage all reservations.
drop policy if exists _admin_ncl_reservations on public.ncl_reservations;
create policy _admin_ncl_reservations on public.ncl_reservations
  for all to authenticated
  using (public.ncl_app_role() = 'admin') with check (public.ncl_app_role() = 'admin');

-- Clients can see their own reservations (matched on booking email)…
drop policy if exists _client_read_own_ncl_reservations on public.ncl_reservations;
create policy _client_read_own_ncl_reservations on public.ncl_reservations
  for select to authenticated
  using (public.ncl_app_role() = 'client' and lower(email) = lower(auth.jwt() ->> 'email'));

-- …and cancel their own pending booking (only pending -> cancelled).
drop policy if exists _client_cancel_own_ncl_reservations on public.ncl_reservations;
create policy _client_cancel_own_ncl_reservations on public.ncl_reservations
  for update to authenticated
  using (public.ncl_app_role() = 'client' and lower(email) = lower(auth.jwt() ->> 'email') and status = 'pending')
  with check (public.ncl_app_role() = 'client' and lower(email) = lower(auth.jwt() ->> 'email') and status = 'cancelled');

-- ---------- Settings ----------
-- The single public row renders the whole site; only admins edit it.
drop policy if exists _read_ncl_settings on public.ncl_settings;
create policy _read_ncl_settings on public.ncl_settings
  for select using (true);

drop policy if exists _admin_ncl_settings on public.ncl_settings;
create policy _admin_ncl_settings on public.ncl_settings
  for all to authenticated
  using (public.ncl_app_role() = 'admin') with check (public.ncl_app_role() = 'admin');

-- ---------- Analytics ----------
drop policy if exists _admin_ncl_analytics on public.ncl_analytics;
create policy _admin_ncl_analytics on public.ncl_analytics
  for all to authenticated
  using (public.ncl_app_role() = 'admin') with check (public.ncl_app_role() = 'admin');

-- Visits are written only through the SECURITY DEFINER function below;
-- public users NEVER write analytics directly.

-- ---------- Profiles (user accounts) ----------
-- Anyone can read their own profile; only admins can read/modify others.
drop policy if exists _select_own_ncl_profiles on public.ncl_profiles;
create policy _select_own_ncl_profiles on public.ncl_profiles
  for select using (auth.uid() = id);

drop policy if exists _select_admin_ncl_profiles on public.ncl_profiles;
create policy _select_admin_ncl_profiles on public.ncl_profiles
  for select using (public.ncl_app_role() = 'admin');

drop policy if exists _insert_admin_ncl_profiles on public.ncl_profiles;
create policy _insert_admin_ncl_profiles on public.ncl_profiles
  for insert to authenticated
  with check (public.ncl_app_role() = 'admin');

drop policy if exists _update_admin_ncl_profiles on public.ncl_profiles;
create policy _update_admin_ncl_profiles on public.ncl_profiles
  for update to authenticated
  using (public.ncl_app_role() = 'admin') with check (public.ncl_app_role() = 'admin');

drop policy if exists _delete_admin_ncl_profiles on public.ncl_profiles;
create policy _delete_admin_ncl_profiles on public.ncl_profiles
  for delete to authenticated
  using (public.ncl_app_role() = 'admin');

-- ---------- Admin manages user accounts (create / delete / change role) ----------
-- These run as the database owner so an admin in the app can create auth
-- accounts without the service-role key. Each function checks the caller.

create or replace function public.ncl_admin_create_user(p_email text, p_password text, p_role text default 'employee')
returns void language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid;
begin
  if public.ncl_app_role() <> 'admin' then
    raise exception 'Only admins can create user accounts.';
  end if;
  if p_role not in ('admin', 'employee', 'client') then
    raise exception 'Invalid role. Choose admin, employee or client.';
  end if;
  if exists (select 1 from auth.users where lower(email) = lower(p_email)) then
    raise exception 'A user with that email already exists.';
  end if;
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, invited_at, confirmation_token, recovery_token,
    email_change_token_new, email_change,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) values (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(),
    'authenticated', 'authenticated', lower(p_email),
    crypt(p_password, gen_salt('bf')), now(), now(), '', '', '', '',
    jsonb_build_object('provider', 'email', 'providers', array['email']),
    '{}'::jsonb, now(), now()
  ) returning id into v_uid;
  -- upsert so the signup trigger's default 'employee' row (if it ran first)
  -- is overwritten with the chosen role.
  insert into public.ncl_profiles (id, email, role)
  values (v_uid, lower(p_email), p_role)
  on conflict (id) do update set role = excluded.role, email = excluded.email;
end $$;

create or replace function public.ncl_admin_delete_user(p_user_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if public.ncl_app_role() <> 'admin' then
    raise exception 'Only admins can delete user accounts.';
  end if;
  if p_user_id = auth.uid() then
    raise exception 'You cannot delete your own account.';
  end if;
  delete from auth.users where id = p_user_id;
end $$;

create or replace function public.ncl_admin_set_role(p_user_id uuid, p_role text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if public.ncl_app_role() <> 'admin' then
    raise exception 'Only admins can change roles.';
  end if;
  if p_role not in ('admin', 'employee', 'client') then
    raise exception 'Invalid role. Choose admin, employee or client.';
  end if;
  update public.ncl_profiles set role = p_role where id = p_user_id;
end $$;

revoke all on function public.ncl_admin_create_user(text, text, text) from public, anon;
grant execute on function public.ncl_admin_create_user(text, text, text) to authenticated;
revoke all on function public.ncl_admin_delete_user(uuid) from public, anon;
grant execute on function public.ncl_admin_delete_user(uuid) to authenticated;
revoke all on function public.ncl_admin_set_role(uuid, text) from public, anon;
grant execute on function public.ncl_admin_set_role(uuid, text) to authenticated;

-- ---------- Image uploads (Supabase Storage, bucket "ncl-content") ----------
insert into storage.buckets (id, name, public)
values ('ncl-content', 'ncl-content', true)
on conflict (id) do nothing;

drop policy if exists ncl_content_read on storage.objects;
create policy ncl_content_read on storage.objects
  for select using (bucket_id = 'ncl-content');

drop policy if exists ncl_content_write on storage.objects;
create policy ncl_content_write on storage.objects
  for insert to authenticated
  with check (bucket_id = 'ncl-content' and public.ncl_app_role() in ('admin', 'employee'));

drop policy if exists ncl_content_update on storage.objects;
create policy ncl_content_update on storage.objects
  for update to authenticated
  using (bucket_id = 'ncl-content' and public.ncl_app_role() in ('admin', 'employee'))
  with check (bucket_id = 'ncl-content' and public.ncl_app_role() in ('admin', 'employee'));

drop policy if exists ncl_content_delete on storage.objects;
create policy ncl_content_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'ncl-content' and public.ncl_app_role() in ('admin', 'employee'));

-- ---------- Settings seed ----------
insert into public.ncl_settings (id, name, tagline, address, phone, email, whatsapp, "mapQuery", "openingDays", "openingHours", "priceRange")
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

-- ---------- Hardening (idempotent — safe to re-run) ----------

-- Visit counter: increments server-side only. Public users can never write
-- arbitrary values into `analytics`; the app calls this function instead.
create or replace function public.ncl_track_visit() returns void
language sql security definer set search_path = public as $$
  insert into public.ncl_analytics (key, value) values ('visits', 1)
  on conflict (key) do update set value = public.ncl_analytics.value + 1, updated_at = now();
$$;
revoke all on function public.ncl_track_visit() from public, anon;
grant execute on function public.ncl_track_visit() to anon, authenticated;

-- Reservation sanity constraints (public bookings still start 'pending').
alter table public.ncl_reservations drop constraint if exists ncl_reservations_status_check;
alter table public.ncl_reservations add constraint ncl_reservations_status_check
  check (status in ('pending', 'confirmed', 'cancelled'));
alter table public.ncl_reservations drop constraint if exists ncl_reservations_guests_check;
alter table public.ncl_reservations add constraint ncl_reservations_guests_check
  check (guests >= 1 and guests <= 100);
alter table public.ncl_reservations drop constraint if exists ncl_reservations_name_len;
alter table public.ncl_reservations add constraint ncl_reservations_name_len
  check (char_length(name) <= 120);
alter table public.ncl_reservations drop constraint if exists ncl_reservations_phone_len;
alter table public.ncl_reservations add constraint ncl_reservations_phone_len
  check (char_length(coalesce(phone, '')) <= 40);
alter table public.ncl_reservations drop constraint if exists ncl_reservations_email_len;
alter table public.ncl_reservations add constraint ncl_reservations_email_len
  check (char_length(coalesce(email, '')) <= 320);
alter table public.ncl_reservations drop constraint if exists ncl_reservations_request_len;
alter table public.ncl_reservations add constraint ncl_reservations_request_len
  check (char_length(coalesce(request, '')) <= 2000);