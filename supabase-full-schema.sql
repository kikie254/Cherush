-- ============================================================
-- Cherush Guesthouse — FULL PRODUCTION SCHEMA (Combined)
-- Run this ONCE in the Supabase SQL Editor.
-- Idempotent: safe to re-run at any time.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 0. EXTENSIONS
-- ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ────────────────────────────────────────────────────────────
-- 1. ROOMS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.rooms (
  id               uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
  slug             text         NOT NULL UNIQUE,
  name             text         NOT NULL,
  short_description text        NOT NULL,
  description      text         NOT NULL,
  price_per_night  numeric(10,2) NOT NULL CHECK (price_per_night > 0),
  weekly_rate      numeric(10,2) CHECK (weekly_rate > 0),
  monthly_rate     numeric(10,2) CHECK (monthly_rate > 0),
  cover_image      text         NOT NULL,
  gallery          text[]       NOT NULL DEFAULT '{}',
  max_guests       integer      NOT NULL CHECK (max_guests > 0),
  size_sqm         integer      NOT NULL CHECK (size_sqm > 0),
  beds             text         NOT NULL,
  bathrooms        integer      NOT NULL CHECK (bathrooms > 0),
  features         text[]       NOT NULL DEFAULT '{}',
  published        boolean      NOT NULL DEFAULT true,
  created_at       timestamptz  NOT NULL DEFAULT now(),
  updated_at       timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rooms_slug      ON public.rooms (slug);
CREATE INDEX IF NOT EXISTS idx_rooms_published ON public.rooms (published);
CREATE INDEX IF NOT EXISTS idx_rooms_price     ON public.rooms (price_per_night);

-- ────────────────────────────────────────────────────────────
-- 2. REVIEWS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name text        NOT NULL,
  origin     text,
  rating     integer     NOT NULL CHECK (rating >= 1 AND rating <= 5),
  quote      text        NOT NULL,
  published  boolean     NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_published  ON public.reviews (published);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews (created_at DESC);

-- ────────────────────────────────────────────────────────────
-- 3. GALLERY
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery (
  id            uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  title         text    NOT NULL,
  media_type    text    NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url     text    NOT NULL,
  thumbnail_url text,
  category      text    NOT NULL,
  featured      boolean NOT NULL DEFAULT false,
  sort_order    integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_gallery_featured   ON public.gallery (featured);
CREATE INDEX IF NOT EXISTS idx_gallery_sort_order ON public.gallery (sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category   ON public.gallery (category);

-- ────────────────────────────────────────────────────────────
-- 4. PRICING RULES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.pricing_rules (
  id         uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text    NOT NULL,
  room_id    uuid    REFERENCES public.rooms(id) ON DELETE CASCADE,
  start_date date    NOT NULL,
  end_date   date    NOT NULL CHECK (end_date > start_date),
  multiplier numeric NOT NULL DEFAULT 1.0 CHECK (multiplier > 0),
  min_nights integer CHECK (min_nights > 0)
);

CREATE INDEX IF NOT EXISTS idx_pricing_rules_dates   ON public.pricing_rules (start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_pricing_rules_room_id ON public.pricing_rules (room_id);

-- ────────────────────────────────────────────────────────────
-- 5. CONTENT
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.content (
  id    uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page  text NOT NULL,
  slug  text NOT NULL UNIQUE,
  title text NOT NULL,
  body  text NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_content_page ON public.content (page);

-- ────────────────────────────────────────────────────────────
-- 6. SITE SETTINGS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key         text NOT NULL UNIQUE,
  value       text NOT NULL,
  description text
);

-- ────────────────────────────────────────────────────────────
-- 7. BOOKINGS (with double-booking prevention)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookings (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_code     text        NOT NULL UNIQUE,
  room_id          uuid        NOT NULL REFERENCES public.rooms(id) ON DELETE RESTRICT,
  guest_name       text        NOT NULL CHECK (char_length(guest_name) >= 2),
  guest_email      text        NOT NULL CHECK (guest_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  guest_phone      text,
  guests_count     integer     NOT NULL CHECK (guests_count >= 1 AND guests_count <= 12),
  check_in         date        NOT NULL,
  check_out        date        NOT NULL CHECK (check_out > check_in),
  total_amount     numeric(10,2) NOT NULL CHECK (total_amount >= 0),
  status           text        NOT NULL DEFAULT 'pending'
                               CHECK (status IN ('pending','approved','cancelled','rejected','completed')),
  special_requests text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT no_double_booking EXCLUDE USING gist (
    room_id WITH =,
    daterange(check_in, check_out, '[)') WITH &&
  ) WHERE (status IN ('pending', 'approved'))
);

CREATE INDEX IF NOT EXISTS idx_bookings_room_id     ON public.bookings (room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status      ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in    ON public.bookings (check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_check_out   ON public.bookings (check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_email ON public.bookings (guest_email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at  ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_code        ON public.bookings (booking_code);
CREATE INDEX IF NOT EXISTS idx_bookings_total       ON public.bookings (total_amount);

-- ────────────────────────────────────────────────────────────
-- 8. CONTACT MESSAGES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text        NOT NULL CHECK (char_length(name) >= 2),
  email      text        NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  subject    text        NOT NULL CHECK (char_length(subject) >= 3),
  message    text        NOT NULL CHECK (char_length(message) >= 10),
  status     text        NOT NULL DEFAULT 'unread' CHECK (status IN ('unread','read','replied')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status     ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);

-- ────────────────────────────────────────────────────────────
-- 9. USER ROLES (admin role management)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_roles (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       text        NOT NULL DEFAULT 'guest' CHECK (role IN ('admin', 'guest')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles (user_id);

-- ────────────────────────────────────────────────────────────
-- 10. AUTO-UPDATE updated_at TRIGGER
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER rooms_set_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER bookings_set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- 11. HELPER: is_admin() FUNCTION
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- ────────────────────────────────────────────────────────────
-- 12. ROW LEVEL SECURITY — ALL TABLES
-- ────────────────────────────────────────────────────────────

-- ROOMS
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "rooms_public_read" ON public.rooms;
DROP POLICY IF EXISTS "rooms_auth_write"  ON public.rooms;
DROP POLICY IF EXISTS "rooms_admin_all"   ON public.rooms;
CREATE POLICY "rooms_public_read" ON public.rooms FOR SELECT USING (published = true);
CREATE POLICY "rooms_admin_all"   ON public.rooms FOR ALL   USING (public.is_admin());

-- REVIEWS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews_public_read" ON public.reviews;
DROP POLICY IF EXISTS "reviews_auth_write"  ON public.reviews;
DROP POLICY IF EXISTS "reviews_admin_all"   ON public.reviews;
CREATE POLICY "reviews_public_read" ON public.reviews FOR SELECT USING (published = true);
CREATE POLICY "reviews_admin_all"   ON public.reviews FOR ALL   USING (public.is_admin());

-- GALLERY
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_public_read" ON public.gallery;
DROP POLICY IF EXISTS "gallery_auth_write"  ON public.gallery;
DROP POLICY IF EXISTS "gallery_admin_all"   ON public.gallery;
CREATE POLICY "gallery_public_read" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "gallery_admin_all"   ON public.gallery FOR ALL   USING (public.is_admin());

-- PRICING RULES
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pricing_public_read" ON public.pricing_rules;
DROP POLICY IF EXISTS "pricing_auth_write"  ON public.pricing_rules;
DROP POLICY IF EXISTS "pricing_admin_all"   ON public.pricing_rules;
CREATE POLICY "pricing_public_read" ON public.pricing_rules FOR SELECT USING (true);
CREATE POLICY "pricing_admin_all"   ON public.pricing_rules FOR ALL   USING (public.is_admin());

-- CONTENT
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "content_public_read" ON public.content;
DROP POLICY IF EXISTS "content_auth_write"  ON public.content;
DROP POLICY IF EXISTS "content_admin_all"   ON public.content;
CREATE POLICY "content_public_read" ON public.content FOR SELECT USING (true);
CREATE POLICY "content_admin_all"   ON public.content FOR ALL   USING (public.is_admin());

-- SITE SETTINGS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_public_read"  ON public.site_settings;
DROP POLICY IF EXISTS "settings_auth_write"   ON public.site_settings;
DROP POLICY IF EXISTS "settings_admin_write"  ON public.site_settings;
CREATE POLICY "settings_public_read"  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_write"  ON public.site_settings FOR ALL   USING (public.is_admin());

-- BOOKINGS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bookings_public_insert" ON public.bookings;
DROP POLICY IF EXISTS "bookings_auth_all"      ON public.bookings;
DROP POLICY IF EXISTS "bookings_guest_select"  ON public.bookings;
DROP POLICY IF EXISTS "bookings_admin_all"     ON public.bookings;
CREATE POLICY "bookings_public_insert" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_guest_select"  ON public.bookings FOR SELECT USING (
  guest_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR public.is_admin()
);
CREATE POLICY "bookings_admin_all" ON public.bookings FOR ALL USING (public.is_admin());

-- CONTACT MESSAGES
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "contact_public_insert" ON public.contact_messages;
DROP POLICY IF EXISTS "contact_auth_all"      ON public.contact_messages;
DROP POLICY IF EXISTS "contact_admin_all"     ON public.contact_messages;
CREATE POLICY "contact_public_insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_admin_all"     ON public.contact_messages FOR ALL   USING (public.is_admin());

-- USER ROLES
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_roles_self_read" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_admin_all" ON public.user_roles;
CREATE POLICY "user_roles_self_read" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_roles_admin_all" ON public.user_roles FOR ALL   USING (public.is_admin());

-- ────────────────────────────────────────────────────────────
-- 13. SEED ESSENTIAL SITE SETTINGS (idempotent)
-- ────────────────────────────────────────────────────────────
INSERT INTO public.site_settings (key, value, description) VALUES
  ('contact_email',  'bookings@cherushguesthouse.com', 'Primary contact email'),
  ('contact_phone',  '+254 700 000 000',               'Primary phone number'),
  ('whatsapp_number','254700000000',                   'WhatsApp number (no +)'),
  ('address',        'Iten, Elgeyo-Marakwet County, Kenya', 'Physical address'),
  ('checkin_time',   '14:00',                          'Standard check-in time'),
  ('checkout_time',  '11:00',                          'Standard check-out time')
ON CONFLICT (key) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- 14. VALIDATE ALL TABLES HAVE RLS ENABLED
-- ────────────────────────────────────────────────────────────
DO $$
DECLARE
  t text;
  tables text[] := ARRAY[
    'rooms', 'reviews', 'gallery', 'pricing_rules',
    'content', 'site_settings', 'bookings', 'contact_messages', 'user_roles'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relname = t AND c.relrowsecurity = true
    ) THEN
      RAISE EXCEPTION 'RLS NOT ENABLED on table: %', t;
    END IF;
  END LOOP;
  RAISE NOTICE 'RLS validation passed — all tables have RLS enabled.';
END $$;
