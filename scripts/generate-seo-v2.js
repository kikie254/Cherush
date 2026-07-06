const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------
// Helper: Ensure Directory Exists
// ---------------------------------------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ---------------------------------------------------------
// Phase 3: High Conversion Landing Pages
// ---------------------------------------------------------
const landingPages = [
  { slug: 'family-accommodation-iten', title: 'Family Accommodation in Iten', h1: 'Spacious Family Accommodation in Iten', desc: 'Discover the perfect family-friendly accommodation in Iten at Cherush Guesthouse. Spacious rooms, secure gardens, and kid-friendly meals.' },
  { slug: 'business-accommodation-iten', title: 'Business Accommodation in Iten', h1: 'Premium Business Accommodation in Iten', desc: 'High-speed fiber WiFi, quiet workspaces, and premium service for business travelers visiting Elgeyo Marakwet County.' },
  { slug: 'conference-venue-iten', title: 'Conference Venue in Iten', h1: 'Professional Conference Venue in Iten', desc: 'Host your next meeting, retreat, or seminar in our fully-equipped conference facilities at Cherush Guesthouse Iten.' },
  { slug: 'budget-accommodation-iten', title: 'Budget Accommodation in Iten', h1: 'Affordable Budget Accommodation in Iten', desc: 'High-quality, secure, and clean budget accommodation options for athletes and backpackers training in the Home of Champions.' },
  { slug: 'luxury-accommodation-iten', title: 'Luxury Accommodation in Iten', h1: 'Luxury Accommodation & Suites in Iten', desc: 'Experience unparalleled luxury, orthopedic beds, and exceptional hospitality in the heart of the Great Rift Valley.' },
  { slug: 'long-stay-accommodation', title: 'Long Stay Accommodation Iten', h1: 'Long-Term & Monthly Stays in Iten', desc: 'Specialized packages for athletes and digital nomads requiring long-stay accommodation in Iten for altitude training.' },
  { slug: 'athlete-accommodation', title: 'Athlete Accommodation in Iten', h1: 'Specialized Athlete Accommodation in Iten', desc: 'Tailored for elite runners: high-altitude recovery, nutritionist-approved meals, and close proximity to Kamariny track.' }
];

landingPages.forEach(p => {
  const dir = path.join('./src/app', p.slug);
  ensureDir(dir);
  
  const fileContent = `import { getMetadata, getBreadcrumbSchema, getSpeakableSchema } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata = getMetadata({
  title: '${p.title} | Cherush Guesthouse',
  description: '${p.desc}',
  path: '/${p.slug}',
})

const breadcrumbs = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: '${p.title}', item: '/${p.slug}' }
])

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSpeakableSchema()) }} />
      
      <article className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <Image src="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=2000" alt="${p.h1}" fill className="object-cover brightness-50" priority />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">${p.h1}</h1>
            <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">${p.desc}</p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/bookings" className="px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">Book Now</Link>
              <Link href="/contact" className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-md font-medium hover:bg-white/20 transition-colors">Contact Us</Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 max-w-5xl mx-auto">
          {/* AI Search Answer Block */}
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-xl mb-12">
            <h2 className="text-xl font-bold text-primary mb-2">Why Choose Cherush for ${p.title.replace(' in Iten', '')}?</h2>
            <p className="text-text/80 leading-relaxed">
              Located in the heart of Iten, Kenya (The Home of Champions), Cherush Guesthouse offers specialized amenities tailored specifically for your needs. Whether you require high-speed fiber internet for remote work, specialized athlete nutrition, or secure environments for your family, our facilities provide 24/7 hot showers, organic meals, and unparalleled hospitality just minutes from the Kerio Valley viewpoints.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none">
              <h2>Experience Excellence in the Rift Valley</h2>
              <p>When searching for <strong>${p.title.toLowerCase()}</strong>, you need a place that understands your unique requirements. At Cherush Guesthouse, we go beyond basic lodging. We provide a sanctuary.</p>
              <ul className="not-prose space-y-4 mt-6">
                {[
                  'High-speed Fiber WiFi (Uninterrupted connectivity)',
                  '24/7 Reliable Hot Showers',
                  'Secure, walled compound with CCTV',
                  'Organic, locally sourced meals customized to dietary needs',
                  'Premium orthopedic mattresses for maximum recovery'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-text/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/rooms" className="text-accent font-medium hover:underline">View Our Rooms &rarr;</Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000" alt="Room interior at Cherush Guesthouse" fill className="object-cover" />
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), fileContent);
});

// ---------------------------------------------------------
// Phase 5: E-E-A-T Pages
// ---------------------------------------------------------
const eeatPages = [
  { slug: 'privacy-policy', title: 'Privacy Policy', desc: 'Privacy policy and data handling procedures for Cherush Guesthouse.' },
  { slug: 'terms-and-conditions', title: 'Terms and Conditions', desc: 'Terms of service and booking conditions for staying at Cherush Guesthouse Iten.' },
  { slug: 'cancellation-policy', title: 'Cancellation Policy', desc: 'Clear and transparent cancellation and refund policies for our guests.' },
  { slug: 'house-rules', title: 'House Rules', desc: 'Guidelines to ensure a peaceful, respectful, and safe environment for all guests.' },
  { slug: 'about-the-owners', title: 'About The Founders', desc: 'Meet the passionate team behind Cherush Guesthouse and their dedication to Iten.' },
  { slug: 'company-history', title: 'Our History', desc: "The story of how Cherush Guesthouse became Iten's premier accommodation choice." },
  { slug: 'mission-and-values', title: 'Mission & Values', desc: 'Our core values: Hospitality, Sustainability, and Community Empowerment.' }
];

eeatPages.forEach(p => {
  const dir = path.join('./src/app', p.slug);
  ensureDir(dir);
  const fileContent = `import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'

export const metadata = getMetadata({
  title: '${p.title} | Cherush Guesthouse',
  description: '${p.desc}',
  path: '/${p.slug}',
})

export default function Page() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8">${p.title}</h1>
      <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-primary/5">
        <p className="lead">${p.desc}</p>
        <h2>Commitment to Transparency</h2>
        <p>At Cherush Guesthouse, we operate under the highest standards of integrity, transparency, and Kenyan hospitality. This document outlines our formal commitments to you, our valued guest, ensuring your experience in Iten is secure, comfortable, and exactly as promised.</p>
        <h3>1. Standard Operations</h3>
        <p>We believe in clear communication. Whether you are an elite athlete here for months or a tourist visiting for the weekend, these guidelines are enforced equitably to protect the serene, focused environment of our guesthouse.</p>
        <h3>2. Contact Information</h3>
        <p>If you have any questions regarding these policies, please reach out directly to our management team via our <a href="/contact" className="text-accent">Contact Page</a>. We are always available to assist.</p>
      </div>
    </main>
  )
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), fileContent);
});

console.log('Landing pages and EEAT pages created successfully.');
