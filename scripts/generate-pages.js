const fs = require('fs');
const path = require('path');

const pages = [
  {
    path: 'best-accommodation-iten',
    title: 'Best Accommodation in Iten | Cherush Guesthouse',
    desc: 'Find the best accommodation in Iten. Cherush Guesthouse offers luxury, affordability, and the perfect base for your altitude training or vacation.',
    h1: 'The Best Accommodation in Iten, Kenya',
    topic: 'Accommodation'
  },
  {
    path: 'travel-guide-iten',
    title: 'Complete Iten Travel Guide | Tips, Weather, & Attractions',
    desc: 'The ultimate travel guide to Iten, Kenya. Discover the best time to visit, top attractions, running routes, and cultural experiences in the Home of Champions.',
    h1: 'The Complete Iten Travel Guide',
    topic: 'Travel and Exploration'
  },
  {
    path: 'running-camps-iten',
    title: 'Running Camps in Iten | Train Like a Champion',
    desc: 'Discover the famous high-altitude running camps in Iten. Stay at Cherush Guesthouse for the perfect recovery base after your intense training sessions.',
    h1: 'High-Altitude Running Camps in Iten',
    topic: 'Athletic Training'
  },
  {
    path: 'local-attractions',
    title: 'Local Attractions in Iten & Elgeyo Marakwet',
    desc: 'Explore the best local attractions around Iten: Rimoi National Reserve, Kerio Valley, Torok Waterfall, and cultural Kalenjin experiences.',
    h1: 'Top Local Attractions in Iten',
    topic: 'Tourism and Nature'
  }
];

pages.forEach(p => {
  const dir = path.join('./src/app', p.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const paragraphs = Array.from({ length: 20 }).map((_, i) => 
    `<p>Exploring <strong>${p.topic}</strong> in Iten is a phenomenal experience. ${i % 2 === 0 ? 'The Great Rift Valley provides a breathtaking backdrop for all activities in this region, making every moment picturesque.' : 'Many visitors from across the globe find themselves mesmerized by the sheer beauty and the vibrant athletic culture of this small Kenyan town.'} This comprehensive guide aims to provide you with all the essential details required to make the most out of your visit. Staying at Cherush Guesthouse will undoubtedly elevate your experience, providing top-tier amenities and unmatched hospitality.</p>
    <h2 class="text-3xl mt-10 mb-4">Deep Dive into ${p.topic} (Part ${i + 1})</h2>
    <p>As we delve deeper into ${p.topic}, it becomes clear why Iten has earned its prestigious reputation. The synergy between the natural environment—specifically the high altitude of 2,400 meters—and the determined spirit of the local Kalenjin people creates an atmosphere unlike any other. Tourists and athletes are encouraged to immerse themselves fully in the community. Take the time to visit local markets, run the red dirt roads, and engage with the champions who call this place home. Every aspect of ${p.topic} is enriched by this vibrant community spirit.</p>
    `
  ).join('');

  const fileContent = `import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = getMetadata({
  title: '${p.title}',
  description: '${p.desc}',
  path: '/${p.path}',
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: '${p.title.split('|')[0].trim()}', item: '/${p.path}' }
])

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="min-h-screen bg-background text-text selection:bg-accent/20">
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=2000"
            alt="${p.h1}"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              ${p.h1}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
              Everything you need to know about ${p.topic.toLowerCase()} in the Home of Champions.
            </p>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary max-w-none"
               dangerouslySetInnerHTML={{ __html: \`${paragraphs}\` }}
          />

          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 my-12 text-center">
            <h4 className="text-2xl font-display text-primary mb-4">Experience Iten with Us</h4>
            <p className="mb-6 text-text/80">
              Make Cherush Guesthouse your home base. Book your stay today for premium comfort and hospitality.
            </p>
            <Link 
              href="/rooms" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Check Availability
            </Link>
          </div>
        </section>
      </article>
    </>
  )
}
`;

  fs.writeFileSync(path.join(dir, 'page.tsx'), fileContent);
});

console.log('Static pages generated successfully.');
