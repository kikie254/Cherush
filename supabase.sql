-- ============================================================
-- Cherush Guesthouse — Production Supabase Schema v2
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

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

CREATE INDEX IF NOT EXISTS idx_rooms_slug       ON public.rooms (slug);
CREATE INDEX IF NOT EXISTS idx_rooms_published  ON public.rooms (published);

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

CREATE INDEX IF NOT EXISTS idx_reviews_published ON public.reviews (published);

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

CREATE INDEX IF NOT EXISTS idx_gallery_featured    ON public.gallery (featured);
CREATE INDEX IF NOT EXISTS idx_gallery_sort_order  ON public.gallery (sort_order);

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

CREATE INDEX IF NOT EXISTS idx_pricing_rules_dates  ON public.pricing_rules (start_date, end_date);
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
  -- Prevent overlapping active bookings for same room
  CONSTRAINT no_double_booking EXCLUDE USING gist (
    room_id WITH =,
    daterange(check_in, check_out, '[)') WITH &&
  ) WHERE (status IN ('pending', 'approved'))
);

CREATE INDEX IF NOT EXISTS idx_bookings_room_id     ON public.bookings (room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status      ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in    ON public.bookings (check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_email ON public.bookings (guest_email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at  ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_code        ON public.bookings (booking_code);

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
-- 9. ENABLE BTREE_GIST for the exclusion constraint
-- (Required for daterange exclusion — run once per database)
-- ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ────────────────────────────────────────────────────────────
-- 10. AUTO-UPDATE updated_at trigger
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
-- 11. ROW LEVEL SECURITY (RLS)
-- ────────────────────────────────────────────────────────────

-- Rooms: public read, authenticated write
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "rooms_public_read"  ON public.rooms;
DROP POLICY IF EXISTS "rooms_auth_write"   ON public.rooms;
CREATE POLICY "rooms_public_read"  ON public.rooms FOR SELECT USING (true);
CREATE POLICY "rooms_auth_write"   ON public.rooms FOR ALL    USING (auth.role() = 'authenticated');

-- Reviews: public read (published only), authenticated write
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews_public_read"  ON public.reviews;
DROP POLICY IF EXISTS "reviews_auth_write"   ON public.reviews;
CREATE POLICY "reviews_public_read"  ON public.reviews FOR SELECT USING (published = true);
CREATE POLICY "reviews_auth_write"   ON public.reviews FOR ALL    USING (auth.role() = 'authenticated');

-- Gallery: public read, authenticated write
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_public_read"  ON public.gallery;
DROP POLICY IF EXISTS "gallery_auth_write"   ON public.gallery;
CREATE POLICY "gallery_public_read"  ON public.gallery FOR SELECT USING (true);
CREATE POLICY "gallery_auth_write"   ON public.gallery FOR ALL    USING (auth.role() = 'authenticated');

-- Pricing Rules: public read, authenticated write
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pricing_public_read"  ON public.pricing_rules;
DROP POLICY IF EXISTS "pricing_auth_write"   ON public.pricing_rules;
CREATE POLICY "pricing_public_read"  ON public.pricing_rules FOR SELECT USING (true);
CREATE POLICY "pricing_auth_write"   ON public.pricing_rules FOR ALL    USING (auth.role() = 'authenticated');

-- Content: public read, authenticated write
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "content_public_read"  ON public.content;
DROP POLICY IF EXISTS "content_auth_write"   ON public.content;
CREATE POLICY "content_public_read"  ON public.content FOR SELECT USING (true);
CREATE POLICY "content_auth_write"   ON public.content FOR ALL    USING (auth.role() = 'authenticated');

-- Site Settings: public read, authenticated write
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_public_read"  ON public.site_settings;
DROP POLICY IF EXISTS "settings_auth_write"   ON public.site_settings;
CREATE POLICY "settings_public_read"  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_auth_write"   ON public.site_settings FOR ALL    USING (auth.role() = 'authenticated');

-- Bookings: NO public SELECT (privacy). Server-side route handlers bypass RLS via service role.
--           Guests can INSERT (for booking form). Only authenticated admins can see/modify all.
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bookings_public_insert"  ON public.bookings;
DROP POLICY IF EXISTS "bookings_auth_all"       ON public.bookings;
CREATE POLICY "bookings_public_insert"  ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_auth_all"       ON public.bookings FOR ALL    USING (auth.role() = 'authenticated');

-- Contact Messages: NO public SELECT. Server inserts only. Admins manage.
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "contact_public_insert"  ON public.contact_messages;
DROP POLICY IF EXISTS "contact_auth_all"       ON public.contact_messages;
CREATE POLICY "contact_public_insert"  ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_auth_all"       ON public.contact_messages FOR ALL    USING (auth.role() = 'authenticated');

-- ────────────────────────────────────────────────────────────
-- 12. SEED ESSENTIAL SITE SETTINGS (idempotent)
-- ────────────────────────────────────────────────────────────
INSERT INTO public.site_settings (key, value, description) VALUES
  ('contact_email',  'bookings@cherushguesthouse.com', 'Primary contact email'),
  ('contact_phone',  '+254 700 000 000',               'Primary phone number'),
  ('whatsapp_number','254700000000',                   'WhatsApp number (no +)'),
  ('address',        'Iten, Elgeyo-Marakwet County, Kenya', 'Physical address'),
  ('checkin_time',   '14:00',                          'Standard check-in time'),
  ('checkout_time',  '11:00',                          'Standard check-out time')
ON CONFLICT (key) DO NOTHING;
