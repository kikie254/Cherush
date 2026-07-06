-- Migration V4: Comprehensive CMS, Reviews, and Analytics
-- Run this in the Supabase SQL Editor

-- --------------------------------------------------------
-- 1. REVIEWS SYSTEM
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
    guest_name TEXT NOT NULL,
    guest_email TEXT,
    rating_overall NUMERIC(2,1) NOT NULL CHECK (rating_overall >= 1 AND rating_overall <= 5),
    rating_cleanliness NUMERIC(2,1) CHECK (rating_cleanliness >= 1 AND rating_cleanliness <= 5),
    rating_staff NUMERIC(2,1) CHECK (rating_staff >= 1 AND rating_staff <= 5),
    rating_food NUMERIC(2,1) CHECK (rating_food >= 1 AND rating_food <= 5),
    rating_wifi NUMERIC(2,1) CHECK (rating_wifi >= 1 AND rating_wifi <= 5),
    rating_location NUMERIC(2,1) CHECK (rating_location >= 1 AND rating_location <= 5),
    comment TEXT,
    photos TEXT[] DEFAULT '{}',
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    admin_reply TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist in case the table was already created in an earlier migration
ALTER TABLE public.reviews 
    ADD COLUMN IF NOT EXISTS rating_cleanliness NUMERIC(2,1) CHECK (rating_cleanliness >= 1 AND rating_cleanliness <= 5),
    ADD COLUMN IF NOT EXISTS rating_staff NUMERIC(2,1) CHECK (rating_staff >= 1 AND rating_staff <= 5),
    ADD COLUMN IF NOT EXISTS rating_food NUMERIC(2,1) CHECK (rating_food >= 1 AND rating_food <= 5),
    ADD COLUMN IF NOT EXISTS rating_wifi NUMERIC(2,1) CHECK (rating_wifi >= 1 AND rating_wifi <= 5),
    ADD COLUMN IF NOT EXISTS rating_location NUMERIC(2,1) CHECK (rating_location >= 1 AND rating_location <= 5),
    ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS admin_reply TEXT;

-- RLS for Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved reviews are public" ON public.reviews FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (TRUE);
CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- --------------------------------------------------------
-- 2. BLOG CMS
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Blog
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blog posts are public" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- --------------------------------------------------------
-- 3. GALLERY CMS
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    title TEXT,
    alt_text TEXT,
    category TEXT DEFAULT 'general',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Gallery
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gallery images are public" ON public.gallery_images FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage gallery images" ON public.gallery_images FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- --------------------------------------------------------
-- 4. PROMO CODES
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_amount NUMERIC NOT NULL,
    valid_from TIMESTAMPTZ NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,
    max_uses INTEGER DEFAULT 100,
    current_uses INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Promo Codes
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Promo codes are viewable by all" ON public.promo_codes FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins can manage promo codes" ON public.promo_codes FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
