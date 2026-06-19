create table if not exists profiles (
  id uuid primary key,
  role text default 'guest'
);

create table if not exists rooms (
  id uuid primary key,
  slug text unique not null,
  name text not null,
  short_description text not null,
  description text not null,
  price_per_night integer not null,
  weekly_rate integer,
  monthly_rate integer,
  cover_image text not null,
  gallery jsonb default '[]'::jsonb,
  max_guests integer not null,
  size_sqm integer not null,
  beds text not null,
  bathrooms integer not null,
  features jsonb default '[]'::jsonb,
  published boolean default true
);

create table if not exists bookings (
  id uuid primary key,
  booking_code text not null,
  room_id uuid not null,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  guests_count integer not null,
  check_in date not null,
  check_out date not null,
  total_amount integer not null,
  status text not null,
  special_requests text,
  created_at timestamptz default now()
);
