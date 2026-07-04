-- Supabase PostgreSQL Schema for Cherush Stay Iten

-- 1. Rooms Table
CREATE TABLE public.rooms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_description text NOT NULL,
  description text NOT NULL,
  price_per_night numeric NOT NULL,
  weekly_rate numeric,
  monthly_rate numeric,
  cover_image text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  max_guests integer NOT NULL,
  size_sqm integer NOT NULL,
  beds text NOT NULL,
  bathrooms integer NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT true
);

-- 2. Reviews Table
CREATE TABLE public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name text NOT NULL,
  origin text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  quote text NOT NULL,
  published boolean NOT NULL DEFAULT false
);

-- 3. Gallery Table
CREATE TABLE public.gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url text NOT NULL,
  thumbnail_url text,
  category text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0
);

-- 4. Pricing Rules Table
CREATE TABLE public.pricing_rules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  room_id uuid REFERENCES public.rooms(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  multiplier numeric NOT NULL DEFAULT 1.0,
  min_nights integer
);

-- 5. Content Table
CREATE TABLE public.content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  body text NOT NULL
);

-- 6. Site Settings Table
CREATE TABLE public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  description text
);

-- 7. Bookings Table
CREATE TABLE public.bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_code text NOT NULL UNIQUE,
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE RESTRICT,
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text,
  guests_count integer NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  total_amount numeric NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'cancelled', 'rejected', 'completed')) DEFAULT 'pending',
  special_requests text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Configure RLS (Row Level Security)
-- 1. By default, everything is readable by anyone (public site needs to read rooms, gallery, etc.)
-- 2. But only authenticated users can insert/update/delete.
-- Note: You might want to restrict Bookings further, but for this boilerplate, we'll allow public inserts (for the booking form) but only auth reads.

-- Rooms
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON public.rooms FOR ALL USING (auth.role() = 'authenticated');

-- Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON public.reviews FOR ALL USING (auth.role() = 'authenticated');

-- Gallery
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');

-- Pricing Rules
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.pricing_rules FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON public.pricing_rules FOR ALL USING (auth.role() = 'authenticated');

-- Content
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.content FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON public.content FOR ALL USING (auth.role() = 'authenticated');

-- Site Settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Bookings (Public can insert via API route using server client anyway, but let's be strict here since we are using Server Actions / Route handlers with Service Role/Server Client, which bypasses RLS).
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for authenticated users only" ON public.bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON public.bookings FOR ALL USING (auth.role() = 'authenticated');
