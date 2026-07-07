import { getMetadata, getBreadcrumbSchema, getOrganizationSchema } from '@/lib/seo'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'Our History',
  description:
    'Discover the story of Cherush Guesthouse — from a vision of warm highland hospitality to becoming Iten\'s trusted home for athletes, families, and travellers from around the world.',
  path: '/company-history',
})

const breadcrumbs = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Our History', item: '/company-history' },
])

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }} />
      <main className="min-h-screen bg-background pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8">Our History</h1>
        <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-primary/5">
          <p className="lead text-xl text-text/80">
            Cherush Guesthouse was born from a simple but powerful idea: that visitors to Iten — whether elite marathon runners,
            weekend explorers, or remote professionals — deserved a place that felt genuinely welcoming, well-organised,
            and deeply connected to the local community.
          </p>

          <h2>The Beginning</h2>
          <p>
            The property on the Iten-Kabarnet Road began its life as a family home — a quiet corner of the highlands
            with expansive views of the Kerio Valley and clean mountain air at 2,400 metres above sea level.
            Recognising Iten&apos;s growing reputation as a global training destination, the founders saw an opportunity
            to create accommodation that truly served the needs of long-stay guests, not just overnight visitors.
          </p>
          <p>
            Early guests were mostly endurance athletes from Europe and North America, arriving to train alongside Kenya&apos;s
            world-class runners. Word spread quickly: Cherush was clean, reliable, and run by people who genuinely cared.
          </p>

          <h2>Growing with Iten</h2>
          <p>
            As Iten grew in international recognition — cemented by its designation as the &quot;Home of Champions&quot; —
            so did the diversity of guests choosing Cherush as their base. Families arrived to explore the Rift Valley escarpment.
            Remote workers discovered that fibre WiFi at altitude was surprisingly productive. Conference delegates found
            a quiet and professional venue far from city distractions.
          </p>
          <p>
            Each new wave of guests taught the Cherush team something new: that great hospitality is less about luxury and
            more about reliability, trust, and a warm welcome at the gate.
          </p>

          <h2>Where We Are Today</h2>
          <p>
            Today, Cherush Guesthouse offers a range of thoughtfully designed rooms — from compact solo layouts to
            spacious family units — each with private bathrooms, self-catering kitchens, high-speed WiFi, and 24-hour
            hot water. Our compound is gated, secure, and professionally maintained.
          </p>
          <p>
            We remain proudly independent and locally rooted. Every decision we make — from the rooms we offer to the
            suppliers we support — reflects our commitment to Iten and to the guests who choose us.
          </p>

          <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 mt-8 not-prose">
            <h3 className="font-display text-xl text-primary font-semibold mb-3">Come and stay with us</h3>
            <p className="text-text/75 text-sm leading-7 mb-4">
              Whether you&apos;re planning a training block, a family holiday, or a remote work retreat,
              we&apos;d love to welcome you to Cherush.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/rooms"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                View Our Rooms
              </Link>
              <Link
                href="/about-the-owners"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-primary/20 px-5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                Meet the Founders
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
