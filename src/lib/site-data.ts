import type { Attraction, ContentBlock, GalleryItem, PricingRule, Review, Room, SiteSetting } from '@/types'

export const images = {
  hero: '/images/hero/cherush-exterior-sunrise-hero.webp',
  heroAlt: '/images/hero/cherush-exterior-golden-hour.webp',
  bedroom: '/images/rooms/cherush-one-bedroom-iten-kenya-bed.webp',
  bedroomAlt: '/images/rooms/cherush-one-bedroom-iten-kenya-bedroom-closet.webp',
  livingRoom: '/images/rooms/cherush-one-bedroom-iten-kenya-living-room.webp',
  livingRoomAlt: '/images/rooms/cherush-one-bedroom-iten-kenya-kitchen.webp',
  bathroom: '/images/bathroom/cherush-bathroom-clean-modern.webp',
  bathroomAlt: '/images/bathroom/cherush-bathroom-shower.webp',
  kitchen: '/images/kitchen/cherush-kitchen-full-setup.webp',
  kitchenAlt: '/images/kitchen/cherush-kitchen-dining.webp',
  workspace: '/images/workspace/cherush-workspace-desk-setup.webp',
  workspaceAlt: '/images/workspace/cherush-workspace-window-view.webp',
  garden: '/images/exterior/cherush-garden-view.webp',
  gardenAlt: '/images/exterior/cherush-entrance.webp',
  exterior: '/images/exterior/cherush-building-front.webp',
  lifestyle: '/images/lifestyle/cherush-coffee-morning.webp',
  lifestyleAlt: '/images/lifestyle/cherush-athlete-training.webp',
}

export const seedRooms: Room[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    slug: 'bedsitter',
    name: 'Bed Sitter',
    short_description: 'A bright, efficient suite designed for solo travelers or couples.',
    description:
      'A cozy bedsitter with a king bed, kitchenette, fast WiFi, and a warm lounge feel for recovery after training or travel.',
    price_per_night: 1000,
    weekly_rate: 6000,
    monthly_rate: 22000,
    cover_image: images.livingRoom,
    gallery: [images.livingRoom, images.garden],
    max_guests: 2,
    size_sqm: 34,
    beds: '1 king bed',
    bathrooms: 1,
    features: ['Kitchenette', 'Fast WiFi', 'Hot shower', 'Parking'],
    published: true
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    slug: 'one-bedroom',
    name: 'One Bedroom',
    short_description: 'Flexible comfort for small families, teams, or remote workers.',
    description:
      'A one-bedroom stay with a dedicated workspace, full kitchen, and social lounge, ideal for week-long training blocks and mixed work-travel stays.',
    price_per_night: 1500,
    weekly_rate: 9000,
    monthly_rate: 32000,
    cover_image: images.workspace,
    gallery: [images.workspace, images.workspaceAlt],
    max_guests: 4,
    size_sqm: 56,
    beds: '1 queen bed + lounge sofa',
    bathrooms: 1,
    features: ['Full kitchen', 'Workspace', 'WiFi', 'Parking'],
    published: true
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    slug: 'extended-stay',
    name: 'Extended Stay',
    short_description: 'More room, more privacy, and a private patio for longer stays.',
    description:
      'A spacious two-bedroom setup for groups or longer visits, with outdoor space and support for comfortable recovery, work, and family routines.',
    price_per_night: 2500,
    weekly_rate: 15000,
    monthly_rate: 50000,
    cover_image: images.garden,
    gallery: [images.garden, images.lifestyleAlt],
    max_guests: 5,
    size_sqm: 72,
    beds: '2 bedrooms + daybed',
    bathrooms: 2,
    features: ['Long-stay discount', 'Full kitchen', 'Laundry support', 'Private patio'],
    published: true
  }
]

export const seedReviews: Review[] = [
  {
    id: 'r1',
    guest_name: 'Nina L.',
    origin: 'Berlin',
    rating: 5,
    quote: 'Quiet mornings, excellent WiFi, and thoughtful hosting. It felt easy to train, work, and rest here.',
    published: true,
    created_at: '2026-05-01T10:00:00.000Z',
  },
  {
    id: 'r2',
    guest_name: 'David & Achieng',
    origin: 'Nairobi',
    rating: 5,
    quote: 'The stay felt warm and polished. Great base for a family weekend and sunrise drives around the valley.',
    published: true,
    created_at: '2026-05-15T10:00:00.000Z',
  },
]

export const seedGallery: GalleryItem[] = [
  { id: 'g1', title: 'Sunlit lounge', media_type: 'image', media_url: images.livingRoom, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 1 },
  { id: 'g2', title: 'Garden arrival', media_type: 'image', media_url: images.garden, thumbnail_url: null, category: 'Stay', featured: true, sort_order: 2 },
  { id: 'g3', title: 'Workspace', media_type: 'image', media_url: images.workspace, thumbnail_url: null, category: 'Work', featured: true, sort_order: 3 },
  { id: 'g4', title: 'Morning trail', media_type: 'image', media_url: images.lifestyleAlt, thumbnail_url: null, category: 'Training', featured: true, sort_order: 4 },
  { id: 'g5', title: 'Valley sunrise', media_type: 'image', media_url: images.hero, thumbnail_url: null, category: 'Explore', featured: true, sort_order: 5 },
  { id: 'g6', title: 'Safari day trip', media_type: 'image', media_url: images.exterior, thumbnail_url: null, category: 'Explore', featured: true, sort_order: 6 }
]

export const seedPricing: PricingRule[] = [
  {
    id: 'p1',
    name: 'Peak racing season',
    room_id: null,
    start_date: '2026-07-01',
    end_date: '2026-09-30',
    multiplier: 1.15,
    min_nights: 2
  }
]

export const seedContent: ContentBlock[] = [
  {
    id: 'c1',
    page: 'about',
    slug: 'story',
    title: 'A thoughtful base in Iten',
    body:
      'Cherush Stay Iten was designed for guests who want a polished, grounded base in the highlands. It is equally suited to runners, families, remote workers, and curious explorers.'
  },
  {
    id: 'c2',
    page: 'home',
    slug: 'experience',
    title: 'The Cherush experience',
    body:
      'Wake up to cool air, train or explore in the morning, and return to spaces built for recovery, good meals, focused work, and unhurried evenings.'
  }
]

export const seedSettings: SiteSetting[] = [
  { id: 's1', key: 'contact_email', value: 'hello@cherushstayiten.com', description: null },
  { id: 's2', key: 'contact_phone', value: '+254 700 000 000', description: null },
  { id: 's3', key: 'whatsapp_number', value: '254700000000', description: null },
  { id: 's4', key: 'address', value: 'Iten, Elgeyo-Marakwet County, Kenya', description: null }
]

export const faqs = [
  {
    question: 'Do you host runners and training camps?',
    answer: 'Yes. The property is set up for early starts, recovery, extended stays, and practical comforts like WiFi, kitchens, and quiet rooms.'
  },
  {
    question: 'Is the stay suitable for families or remote work?',
    answer: 'Yes. Room options support couples, families, and longer stays, while work-friendly spaces make it easy to stay productive.'
  },
  {
    question: 'How do bookings work?',
    answer: 'Guests can submit a reservation request online. Availability and pricing are confirmed before final approval.'
  },
  {
    question: 'Can you help with local recommendations?',
    answer: 'Yes. We share pointers for viewpoints, training routes, coffee stops, and day trips around the Iten area.'
  }
]

export const attractions: Attraction[] = [
  { name: 'Iten View Point', category: 'Scenic', description: 'Wide valley views and a classic sunrise stop.', latitude: 0.676, longitude: 35.511 },
  { name: 'Kamariny Stadium', category: 'Training', description: 'A landmark track and training location in Iten.', latitude: 0.669, longitude: 35.506 },
  { name: 'Kerio View Road', category: 'Drive', description: 'Rolling roads with dramatic valley edges.', latitude: 0.681, longitude: 35.523 },
  { name: 'Cheploch Gorge', category: 'Day trip', description: 'A striking landscape feature worth a local excursion.', latitude: 0.505, longitude: 35.452 }
]

export const localSpots = [
  { name: 'Valley coffee stop', description: 'A relaxed local coffee break after a morning drive.', url: 'https://maps.google.com/?q=Iten' },
  { name: 'Trail warm-up loop', description: 'A gentle acclimatization route for easy starts.', url: 'https://maps.google.com/?q=Iten' },
  { name: 'Market visit', description: 'For produce, snacks, and a sense of local rhythm.', url: 'https://maps.google.com/?q=Iten' },
  { name: 'Scenic sunset turnoff', description: 'A simple evening stop for valley light.', url: 'https://maps.google.com/?q=Iten' }
]
