const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const trustPages = [
  { slug: 'team', title: 'Meet Our Team', desc: 'Meet the passionate team behind Cherush Guesthouse Iten.' },
  { slug: 'community', title: 'Community Involvement', desc: 'How Cherush Guesthouse supports local athletes and the Iten community.' },
  { slug: 'sustainability', title: 'Sustainability', desc: 'Our commitment to eco-friendly practices in Elgeyo Marakwet.' },
  { slug: 'guest-stories', title: 'Guest Stories', desc: 'Read inspiring stories from athletes and travelers who stayed with us.' },
  { slug: 'media', title: 'Media Mentions & Awards', desc: 'Cherush Guesthouse in the news and our awards for hospitality excellence.' },
  { slug: 'faq', title: 'Frequently Asked Questions', desc: 'Everything you need to know about staying at Cherush Guesthouse.' },
];

trustPages.forEach(p => {
  const dir = path.join('./src/app', p.slug);
  ensureDir(dir);
  
  const content = `import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import Image from 'next/image'

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
      <main className="min-h-screen bg-background pt-32 pb-20">
        <Container>
          <SectionHeading
            eyebrow="Trust & Authority"
            title="${p.title}"
            body="${p.desc}"
          />
          <div className="mt-16 bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-primary/5 prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none">
            <h2>Building Trust in the Home of Champions</h2>
            <p>At Cherush Guesthouse, we believe that transparency, community engagement, and authentic hospitality are the cornerstones of a world-class experience. Whether you are an elite marathoner or a family exploring the Great Rift Valley, our commitment remains the same: providing an environment where you can thrive.</p>
            
            <div className="my-10 p-6 bg-accent/10 rounded-2xl border-l-4 border-accent">
              <h3 className="mt-0">Our Promise to You</h3>
              <p className="mb-0">We operate with the highest standards of integrity, ensuring that every interaction, from booking to check-out, reflects our dedication to excellence.</p>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

console.log('Trust pages generated successfully.');
