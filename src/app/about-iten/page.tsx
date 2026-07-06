import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'
import { absoluteUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = getMetadata({
  title: 'About Iten: The Home of Champions | Travel Guide',
  description: 'Discover Iten, Kenya - The Home of Champions. Learn about high-altitude training, local culture, Kalenjin heritage, and why athletes worldwide flock to this running mecca.',
  path: '/about-iten',
  ogType: 'article'
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'About Iten', item: '/about-iten' }
])

export default function AboutItenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="min-h-screen bg-background text-text selection:bg-accent/20">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
            alt="Beautiful landscape of Iten, Kenya"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome to Iten: The Home of Champions
            </h1>
            <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">
              Perched on the edge of the Great Rift Valley, Iten is more than just a town. It is a global phenomenon, a sanctuary for athletes, and a destination of breathtaking beauty.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary max-w-none">
            
            <h2 className="text-4xl mt-12 mb-6">A Journey to the Heart of the Rift Valley</h2>
            <p className="lead text-xl text-text/80 mb-8">
              Sitting at an altitude of 2,400 meters (7,900 feet) above sea level, Iten is a small town in Elgeyo-Marakwet County, Kenya. But its global reputation is anything but small. Known affectionately as the "Home of Champions," Iten is the undisputed capital of long-distance running.
            </p>
            
            <p>
              When you arrive in Iten, the first thing that strikes you is the crisp, unpolluted mountain air. The red dirt roads wind through lush green landscapes, offering panoramic views of the spectacular Kerio Valley. Every morning, before the sun even peaks over the escarpment, the sound of rhythmic breathing and synchronized footsteps fills the air as hundreds of athletes begin their daily training.
            </p>

            <h3 className="text-3xl mt-12 mb-4">Why is Iten Famous?</h3>
            <p>
              Iten's fame is inextricably linked to the Kalenjin people, who are renowned for their extraordinary athletic prowess. The town has produced more Olympic and World Champion long-distance runners than any other place on Earth. Names like David Rudisha, Mary Keitany, and Eliud Kipchoge have graced these very roads.
            </p>
            <p>
              The secret to this success is a unique combination of factors:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-6">
              <li><strong>High Altitude:</strong> At 2,400 meters, the thin air stimulates the production of red blood cells, naturally enhancing cardiovascular endurance.</li>
              <li><strong>Ideal Terrain:</strong> Endless miles of soft, rolling dirt roads are perfect for building strength while minimizing the impact on joints.</li>
              <li><strong>Diet:</strong> The local diet is rich in complex carbohydrates, fresh organic vegetables, and the famous Kenyan tea, providing the perfect fuel for endurance sports.</li>
              <li><strong>Culture of Excellence:</strong> In Iten, running is a way of life. The communal dedication to the sport creates an environment where greatness is expected and nurtured.</li>
            </ul>

            <h3 className="text-3xl mt-12 mb-4">Beyond Running: Experiencing the Culture</h3>
            <p>
              While running is the heartbeat of Iten, the town offers much more to the discerning traveler. The local Kalenjin culture is deeply rooted in hospitality and respect for nature. Visitors are welcomed not just as tourists, but as guests.
            </p>
            <p>
              Take a walk through the bustling local markets, where you can taste freshly roasted maize, sip on traditional mursik (fermented milk), and engage with the friendly locals. The sense of community here is palpable, and the unhurried pace of life is a refreshing escape from the chaos of modern cities.
            </p>

            <h3 className="text-3xl mt-12 mb-4">Spectacular Landscapes and Attractions</h3>
            <p>
              Nature lovers will find themselves in paradise in Iten. The edge of the escarpment offers jaw-dropping views of the Kerio Valley, dropping thousands of feet below. It's one of the best spots in the world for paragliding, drawing thrill-seekers who want to soar above the Rift Valley.
            </p>
            <p>
              Nearby attractions include the stunning Torok Waterfall, the mysterious Rimoi National Reserve (home to majestic herds of elephants), and the serene Chebloch Gorge, where local divers perform daring leaps into the crocodile-infested waters below.
            </p>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 my-12">
              <h4 className="text-2xl font-display text-primary mb-4">Plan Your Visit to Iten</h4>
              <p className="mb-6">
                Whether you are an aspiring athlete looking to train at high altitude, or a traveler seeking a unique cultural and natural experience, Iten has something for you. At Cherush Guest House, we provide the perfect base camp for your Iten adventure, combining modern comfort with authentic Kenyan hospitality.
              </p>
              <Link 
                href="/rooms" 
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                Book Your Stay with Us
              </Link>
            </div>

            <h2 className="text-4xl mt-12 mb-6">The High-Altitude Training Experience</h2>
            <p>
              For professional and amateur runners alike, training in Iten is a pilgrimage. The town is dotted with training camps, but the real magic happens on the open roads. It is common to find yourself running alongside world record holders. The camaraderie among athletes is unique—here, everyone is united by the pursuit of excellence.
            </p>
            <p>
              The typical training day starts at 6:00 AM with a long run or speed work on the famous Kamariny Track (currently under renovation but historically significant). After a simple breakfast, athletes rest before an easy evening run. This monastic lifestyle—sleep, eat, run, repeat—strips away distractions and allows individuals to focus entirely on their potential.
            </p>

            <h3 className="text-3xl mt-12 mb-4">A Sustainable Destination</h3>
            <p>
              As Iten grows as a tourist destination, there is a strong focus on sustainable tourism. Local businesses, including Cherush Guest House, are committed to preserving the natural environment and uplifting the local community. By visiting Iten, you are directly contributing to the local economy and supporting grassroots athletic programs.
            </p>

            <h2 className="text-4xl mt-12 mb-6">Conclusion</h2>
            <p>
              Iten is a place where legends are born and ordinary people achieve extraordinary things. It is a town that will challenge you physically, inspire you mentally, and welcome you warmly. We invite you to discover the magic of the Home of Champions.
            </p>
          </div>
        </section>
      </article>
    </>
  )
}
