export const siteConfig = {
  name: 'Cherush Guesthouse',
  shortName: 'Cherush',
  tagline: 'Train. Explore. Unwind.',
  description:
    'A premium boutique guesthouse in Iten, Kenya — the Home of Champions. Ideal for runners, families, remote workers, and explorers seeking comfortable, affordable accommodation in Elgeyo-Marakwet.',
  location: 'Iten, Elgeyo-Marakwet County, Kenya',
  address: 'Iten-Kabarnet Road, Iten, Elgeyo-Marakwet County, Kenya',
  email: 'info@cherushguesthouse.com',
  phone: '+254 700 000 000',
  whatsapp: '254700000000',
  coordinates: { lat: 0.6707, lng: 35.5081 },
  social: {
    instagram: 'https://www.instagram.com/cherushguesthouse/',
    facebook: 'https://www.facebook.com/cherushguesthouse/',
    whatsapp: 'https://wa.me/254700000000'
  }
} as const

export const navLinks = [
  { href: '/rooms', label: 'Rooms' },
  { href: '/experience', label: 'Experience Iten' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
]
