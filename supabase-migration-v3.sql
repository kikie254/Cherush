-- ============================================================
-- Cherush Guesthouse — Production Security Migration v3
-- Run this in the Supabase SQL Editor AFTER supabase.sql
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. ENSURE btree_gist EXTENSION (required for EXCLUDE constraint)
-- ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ────────────────────────────────────────────────────────────
-- 2. USER ROLES TABLE (admin role management)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_roles (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       text        NOT NULL DEFAULT 'guest' CHECK (role IN ('admin', 'guest')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles (user_id);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_roles_self_read"  ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_admin_all"  ON public.user_roles;
-- Users can read their own role; only admins can write
CREATE POLICY "user_roles_self_read"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "user_roles_admin_all"
  ON public.user_roles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
    )
  );

-- ────────────────────────────────────────────────────────────
-- 3. HELPER: is_admin() function
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
-- 4. TIGHTEN BOOKING POLICIES
--    - Guests can INSERT and SELECT their own (by email match)
--    - Admins can see and modify everything
-- ────────────────────────────────────────────────────────────
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "bookings_public_insert"  ON public.bookings;
DROP POLICY IF EXISTS "bookings_auth_all"       ON public.bookings;
DROP POLICY IF EXISTS "bookings_guest_select"   ON public.bookings;
DROP POLICY IF EXISTS "bookings_admin_all"      ON public.bookings;

-- Any visitor can create a booking (guest makes reservation)
CREATE POLICY "bookings_public_insert"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Guests can view their own bookings by email
CREATE POLICY "bookings_guest_select"
  ON public.bookings FOR SELECT
  USING (
    guest_email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
    OR public.is_admin()
  );

-- Admins have full control
CREATE POLICY "bookings_admin_all"
  ON public.bookings FOR ALL
  USING (public.is_admin());

-- ────────────────────────────────────────────────────────────
-- 5. TIGHTEN CONTACT_MESSAGES POLICIES
--    - Public insert only (no anonymous read)
--    - Admin full access
-- ────────────────────────────────────────────────────────────
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_public_insert"  ON public.contact_messages;
DROP POLICY IF EXISTS "contact_auth_all"       ON public.contact_messages;
DROP POLICY IF EXISTS "contact_admin_all"      ON public.contact_messages;

CREATE POLICY "contact_public_insert"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "contact_admin_all"
  ON public.contact_messages FOR ALL
  USING (public.is_admin());

-- ────────────────────────────────────────────────────────────
-- 6. TIGHTEN ROOMS POLICIES
--    - Public can only read published rooms
--    - Admins can manage all rooms
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "rooms_public_read"  ON public.rooms;
DROP POLICY IF EXISTS "rooms_auth_write"   ON public.rooms;
DROP POLICY IF EXISTS "rooms_admin_all"    ON public.rooms;

CREATE POLICY "rooms_public_read"
  ON public.rooms FOR SELECT
  USING (published = true);

CREATE POLICY "rooms_admin_all"
  ON public.rooms FOR ALL
  USING (public.is_admin());

-- ────────────────────────────────────────────────────────────
-- 7. TIGHTEN REVIEWS POLICIES
--    - Public reads only published reviews
--    - Admins manage all reviews
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "reviews_public_read"  ON public.reviews;
DROP POLICY IF EXISTS "reviews_auth_write"   ON public.reviews;
DROP POLICY IF EXISTS "reviews_admin_all"    ON public.reviews;

CREATE POLICY "reviews_public_read"
  ON public.reviews FOR SELECT
  USING (published = true);

CREATE POLICY "reviews_admin_all"
  ON public.reviews FOR ALL
  USING (public.is_admin());

-- ────────────────────────────────────────────────────────────
-- 8. GALLERY, CONTENT, PRICING, SETTINGS: admin write only
-- ────────────────────────────────────────────────────────────

-- Gallery
DROP POLICY IF EXISTS "gallery_auth_write"   ON public.gallery;
DROP POLICY IF EXISTS "gallery_admin_all"    ON public.gallery;
CREATE POLICY "gallery_admin_all"
  ON public.gallery FOR ALL
  USING (public.is_admin());

-- Content
DROP POLICY IF EXISTS "content_auth_write"   ON public.content;
DROP POLICY IF EXISTS "content_admin_all"    ON public.content;
CREATE POLICY "content_admin_all"
  ON public.content FOR ALL
  USING (public.is_admin());

-- Pricing Rules
DROP POLICY IF EXISTS "pricing_auth_write"   ON public.pricing_rules;
DROP POLICY IF EXISTS "pricing_admin_all"    ON public.pricing_rules;
CREATE POLICY "pricing_admin_all"
  ON public.pricing_rules FOR ALL
  USING (public.is_admin());

-- Site Settings: only admins can write; public can read
DROP POLICY IF EXISTS "settings_auth_write"   ON public.site_settings;
DROP POLICY IF EXISTS "settings_admin_write"  ON public.site_settings;
CREATE POLICY "settings_admin_write"
  ON public.site_settings FOR ALL
  USING (public.is_admin());

-- ────────────────────────────────────────────────────────────
-- 9. USER ROLES TABLE — protect from public reads (except self)
-- ────────────────────────────────────────────────────────────
-- (Already set above in section 2)

-- ────────────────────────────────────────────────────────────
-- 10. ADDITIONAL DATABASE INDEXES for performance
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_bookings_check_out    ON public.bookings (check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_total        ON public.bookings (total_amount);
CREATE INDEX IF NOT EXISTS idx_rooms_price           ON public.rooms (price_per_night);
CREATE INDEX IF NOT EXISTS idx_gallery_category      ON public.gallery (category);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at    ON public.reviews (created_at DESC);

-- ────────────────────────────────────────────────────────────
-- 11. STORAGE BUCKET POLICIES (run in Supabase dashboard)
-- Ensure the 'gallery' bucket is not public — access only via signed URLs
-- ────────────────────────────────────────────────────────────
-- Note: Storage bucket policies are managed in the Supabase dashboard
-- under Storage > Policies. Recommended settings:
--   - gallery bucket: private (no anon read)
--   - Only authenticated admins can upload/delete
--   - Generate signed URLs with short TTL for public display

-- ────────────────────────────────────────────────────────────
-- 12. VALIDATE ALL TABLES HAVE RLS ENABLED
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
