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

// All images that are confirmed uploaded on disk
const roomImages = {
  bed:            '/images/rooms/cherush-one-bedroom-iten-kenya-bed.webp',
  closet:         '/images/rooms/cherush-one-bedroom-iten-kenya-bedroom-closet.webp',
  livingRoom:     '/images/rooms/cherush-one-bedroom-iten-kenya-living-room.webp',
  kitchen:        '/images/rooms/cherush-one-bedroom-iten-kenya-kitchen.webp',
  bathroom:       '/images/rooms/cherush-one-bedroom-iten-kenya-bathroom.webp',
  bathroomTub:    '/images/rooms/cherush-one-bedroom-iten-kenya-bathroom-tub.webp',
}

// Bedsitter — SEO-optimized photo filenames: [feature]-[location]-[brand]
const bedsitterImages = {
  space:    '/bedsitter/bedsitter-room-iten-kenya-cherush-guesthouse.webp',
  bed:      '/bedsitter/bedsitter-bedroom-king-bed-iten-kenya-cherush.webp',
  kitchen:  '/bedsitter/bedsitter-kitchenette-self-catering-iten-kenya-cherush.webp',
  closet:   '/bedsitter/bedsitter-wardrobe-storage-iten-kenya-cherush.webp',
  bathroom: '/bedsitter/bedsitter-bathroom-en-suite-iten-kenya-cherush.webp',
  shower:   '/bedsitter/bedsitter-shower-hot-water-iten-kenya-cherush.webp',
}

// One Bedroom — SEO-optimized photo filenames
const oneBedroomImages = {
  livingRoom: '/onebedroom/one-bedroom-living-room-iten-kenya-cherush-guesthouse.webp',
  bed:        '/onebedroom/one-bedroom-king-bed-iten-kenya-cherush-guesthouse.webp',
  kitchen:    '/onebedroom/one-bedroom-full-kitchen-iten-kenya-cherush-guesthouse.webp',
  closet:     '/onebedroom/one-bedroom-wardrobe-closet-iten-kenya-cherush-guesthouse.webp',
  bathroom:   '/onebedroom/one-bedroom-bathroom-en-suite-iten-kenya-cherush-guesthouse.webp',
  bathroomTub:'/onebedroom/one-bedroom-bathroom-tub-iten-kenya-cherush-guesthouse.webp',
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
    cover_image: bedsitterImages.space,
    gallery: [
      bedsitterImages.space,
      bedsitterImages.bed,
      bedsitterImages.kitchen,
      bedsitterImages.closet,
      bedsitterImages.bathroom,
      bedsitterImages.shower,
    ],
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
    cover_image: oneBedroomImages.livingRoom,
    gallery: [
      oneBedroomImages.livingRoom,
      oneBedroomImages.bed,
      oneBedroomImages.kitchen,
      oneBedroomImages.closet,
      oneBedroomImages.bathroom,
      oneBedroomImages.bathroomTub,
    ],
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
    cover_image: roomImages.bathroomTub,
    gallery: [roomImages.bathroomTub, roomImages.bathroom, roomImages.closet],
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
  // Bedsitter
  { id: 'g1', title: 'Bedsitter – living space', media_type: 'image', media_url: bedsitterImages.space, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 1 },
  { id: 'g2', title: 'Bedsitter – bedroom', media_type: 'image', media_url: bedsitterImages.bed, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 2 },
  { id: 'g3', title: 'Bedsitter – kitchen', media_type: 'image', media_url: bedsitterImages.kitchen, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 3 },
  { id: 'g4', title: 'Bedsitter – wardrobe', media_type: 'image', media_url: bedsitterImages.closet, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 4 },
  // One Bedroom
  { id: 'g9',  title: 'One Bedroom – lounge', media_type: 'image', media_url: oneBedroomImages.livingRoom, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 9 },
  { id: 'g10', title: 'One Bedroom – bedroom', media_type: 'image', media_url: oneBedroomImages.bed, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 10 },
  { id: 'g11', title: 'One Bedroom – kitchen', media_type: 'image', media_url: oneBedroomImages.kitchen, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 11 },
  { id: 'g12', title: 'One Bedroom – wardrobe', media_type: 'image', media_url: oneBedroomImages.closet, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 12 },
  { id: 'g13', title: 'One Bedroom – bathroom', media_type: 'image', media_url: oneBedroomImages.bathroom, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 13 },
  { id: 'g14', title: 'One Bedroom – bathtub', media_type: 'image', media_url: oneBedroomImages.bathroomTub, thumbnail_url: null, category: 'Rooms', featured: false, sort_order: 14 },
  { id: 'g5', title: 'Bedsitter – bathroom', media_type: 'image', media_url: bedsitterImages.bathroom, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 5 },
  { id: 'g6', title: 'Bedsitter – shower', media_type: 'image', media_url: bedsitterImages.shower, thumbnail_url: null, category: 'Rooms', featured: true, sort_order: 6 },
  { id: 'g7', title: 'Garden arrival', media_type: 'image', media_url: images.garden, thumbnail_url: null, category: 'Stay', featured: true, sort_order: 7 },
  { id: 'g8', title: 'Valley sunrise', media_type: 'image', media_url: images.hero, thumbnail_url: null, category: 'Explore', featured: false, sort_order: 8 }
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
  { id: 's2', key: 'contact_phone', value: '+254 724 541 664', description: null },
  { id: 's3', key: 'whatsapp_number', value: '254724541664', description: null },
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
