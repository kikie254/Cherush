import { getMetadata, getBreadcrumbSchema, getLodgingBusinessSchema } from '@/lib/seo'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { Shield, Heart, Users, Award } from 'lucide-react'

export const metadata = getMetadata({
  title: 'About The Founders | Cherush Guesthouse Iten',
  description: 'Meet the family behind Cherush Guesthouse in Iten, Kenya. Learn about our mission to provide world-class accommodation for athletes, families, and remote workers.',
  path: '/about-the-owners',
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'About The Founders', item: '/about-the-owners' },
])

const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'The Cherush Family',
  'jobTitle': 'Founders',
  'worksFor': {
    '@type': 'LodgingBusiness',
    'name': 'Cherush Guesthouse',
    'url': 'https://cherushguesthouse.com',
  },
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Iten',
    'addressRegion': 'Elgeyo Marakwet County',
    'addressCountry': 'KE',
  },
}

export default function AboutTheOwnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getLodgingBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }} />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-primary text-white py-28 px-4">
          <Container className="max-w-4xl text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-premium font-semibold mb-4 block">Our Story</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Family Behind Cherush
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Rooted in Iten, driven by hospitality. Cherush Guesthouse was built by a Kenyan family with a simple belief: every guest deserves to feel at home in the Home of Champions.
            </p>
          </Container>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <Container className="max-w-4xl">
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary max-w-none">
              
              <h2>Our Origin Story</h2>
              <p>
                Cherush Guesthouse was born from a deeply personal vision: to create a place in Iten where the world's most driven people — elite athletes, passionate travelers, and focused remote workers — could find genuine comfort and community.
              </p>
              <p>
                The founders grew up watching Iten transform from a quiet highland town into the globally recognized "Home of Champions." They witnessed firsthand how thousands of athletes from Europe, the Americas, and across Kenya arrived seeking accommodation that met their specific needs — reliable hot water after cold dawn runs, fast internet for coach communications, and kitchens for precise athletic diets. What they found was often inadequate.
              </p>
              <p>
                That gap was the founding vision of Cherush Guesthouse. Built with family savings and an uncompromising commitment to quality, the guesthouse opened its doors as a direct answer to what was missing in Iten's accommodation landscape.
              </p>

              <h2>Our Core Values</h2>
              <p>
                Every decision at Cherush is guided by four principles that the founders instilled from day one:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 my-12">
              {[
                { icon: Shield, title: 'Uncompromising Security', desc: 'Every guest — whether a solo female traveler or a team of athletes — deserves to feel completely safe. Our compound is walled, gated, and professionally guarded 24/7.' },
                { icon: Heart, title: 'Genuine Kenyan Hospitality', desc: 'We don\'t follow a corporate service script. We serve from the heart, anticipating your needs before you express them and treating every guest as a member of our family.' },
                { icon: Users, title: 'Community First', desc: 'We actively support the local Iten economy by sourcing produce from local farmers, employing local staff, and partnering with local guides and transport providers.' },
                { icon: Award, title: 'Quality Without Compromise', desc: 'From the orthopedic mattresses to the fiber-optic WiFi, every amenity was chosen to serve a specific need. We are proud to offer standards that rival urban hotels in a highland setting.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-8 border border-primary/5 shadow-sm flex gap-5 items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-primary font-semibold mb-2">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none">
              <h2>Our Commitment to Athletes</h2>
              <p>
                Having watched world record holders train on the very dirt roads outside our gate, the founders developed a deep respect for the discipline of endurance athletics. This inspired a specific set of infrastructure investments: enterprise-grade internet, backup power generators, self-catering kitchens for dietary precision, and a noise policy that protects early bedtimes and quiet recovery periods.
              </p>
              <p>
                Cherush Guesthouse has since hosted athletes from over 30 countries — from Olympic medalists conducting training camps to amateur runners chasing their first sub-3:00 marathon in the altitude of the Rift Valley. Each guest has contributed to the culture of excellence and community that defines our guesthouse.
              </p>

              <h2>Our Commitment to Transparency</h2>
              <p>
                We operate with radical transparency. Our pricing is straightforward, inclusive, and publicly displayed. We do not add hidden fees. We do not add booking surcharges. What you see is what you pay.
              </p>
              <p>
                If you have any concern during your stay — no matter how minor — our management team is available 24 hours a day, 7 days a week. We view every piece of feedback as a gift that helps us serve the next guest better.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-16 bg-primary text-white rounded-3xl p-10 md:p-14 text-center">
              <h2 className="font-display text-3xl font-bold mb-4">Come Stay With Our Family</h2>
              <p className="text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
                We would love to welcome you to Iten and to Cherush Guesthouse. Check our room availability and secure your spot today.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/rooms" className="inline-flex h-12 items-center justify-center rounded-lg bg-white text-primary px-8 text-sm font-semibold hover:bg-white/90 transition-colors">
                  View Rooms
                </Link>
                <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 text-white px-8 text-sm font-semibold hover:bg-white/10 transition-colors">
                  Get In Touch
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}
