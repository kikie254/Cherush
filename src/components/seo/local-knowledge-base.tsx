import { MapPin, Navigation, Calendar, Cloud, Activity, Coffee, Hospital, Car } from 'lucide-react'
import { siteConfig } from '@/lib/constants'

export function LocalKnowledgeBase() {
  const mapUrl = `https://www.google.com/maps?q=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`

  return (
    <div className="space-y-16 py-12">
      {/* Introduction to Iten */}
      <div className="prose prose-lg prose-slate max-w-none text-muted">
        <h2 className="text-3xl font-display text-primary tracking-tight">The Ultimate Iten Travel & Lifestyle Guide</h2>
        <p>
          Iten, affectionately known globally as the <strong>"Home of Champions"</strong>, is a high-altitude town (2,400 meters or 7,874 feet above sea level) perched on the edge of the spectacular Great Rift Valley in Elgeyo-Marakwet County, Kenya. For decades, it has been the proving ground for the world's greatest long-distance runners.
        </p>
        <p>
          However, Iten is no longer just for elite athletes. Today, it attracts remote workers, digital nomads, families seeking a serene holiday, and tourists eager to experience Kalenjin culture and the breathtaking Kerio Valley escarpment. Understanding the local infrastructure is key to a comfortable stay.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Athletic Infrastructure */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-primary/5 space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <Activity className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-display text-2xl text-primary font-medium">Running Camps & Stadiums</h3>
          <p className="text-muted leading-relaxed">
            Cherush Guesthouse is situated within warm-up distance of the legendary red dirt trails that crisscross the highland farms. The famous <strong>Kamariny Stadium</strong> (currently undergoing upgrades) and the modern Lornah Kiplagat Sports Academy track are easily accessible. Dozens of elite and development running camps are located in our immediate neighborhood, making it easy to network, find pacers, or join group fartlek sessions.
          </p>
        </div>

        {/* Transportation */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-primary/5 space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <Car className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-display text-2xl text-primary font-medium">Transportation & Access</h3>
          <p className="text-muted leading-relaxed">
            The closest major transit hub is <strong>Eldoret International Airport (EDL)</strong>, located about 1 hour and 15 minutes away by car. We can arrange trusted private airport transfers directly to Cherush Guesthouse. For local travel, matatus (shared minibuses) run frequently between Eldoret and Iten. Within Iten town, boda-bodas (motorcycle taxis) are the primary and most affordable way to get around quickly.
          </p>
        </div>

        {/* Healthcare & Supermarkets */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-primary/5 space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <Hospital className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-display text-2xl text-primary font-medium">Hospitals & Supermarkets</h3>
          <p className="text-muted leading-relaxed">
            Your health and convenience are covered. The <strong>Iten County Referral Hospital</strong> provides reliable emergency and general healthcare services just minutes away. For daily necessities, well-stocked supermarkets like <strong>Naivas Supermarket</strong> (in nearby Eldoret for major runs) and local grocery stores in Iten center provide fresh local produce, organic vegetables, bottled water, and household items essential for self-catering.
          </p>
        </div>

        {/* Weather & Climate */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-primary/5 space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <Cloud className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-display text-2xl text-primary font-medium">Weather & Climate</h3>
          <p className="text-muted leading-relaxed">
            Because of its high altitude, Iten enjoys a temperate climate year-round, entirely different from coastal Kenya. Expect crisp, cool mornings (often around 10-12°C or 50-54°F)—perfect for intense training. Afternoons are typically warm and sunny (22-26°C or 72-79°F). The long rains occur between April and May, while August through March offers excellent dry conditions.
          </p>
        </div>

        {/* Dining & Restaurants */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-primary/5 space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <Coffee className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-display text-2xl text-primary font-medium">Restaurants & Cafes</h3>
          <p className="text-muted leading-relaxed">
            While all Cherush rooms feature self-catering kitchens, Iten has a growing culinary scene. You will find local eateries serving traditional Kalenjin staples like Ugali, Mursik (fermented milk), and Sukuma Wiki, which are the secret fuel of champions. Popular athlete hangouts like the Iten Club and Kerio View Hotel offer excellent international cuisine and Kenyan coffee with panoramic views.
          </p>
        </div>

        {/* Attractions */}
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-primary/5 space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-display text-2xl text-primary font-medium">Nearby Attractions</h3>
          <p className="text-muted leading-relaxed">
            Rest days are spectacular here. Take a short walk to the edge of the <strong>Kerio Valley Escarpment</strong> to watch paragliders soar on the thermals, or hike down into the valley towards the Chebloch Gorge to see the crocodiles. The nearby Singore Forest offers quiet trail walks, and day trips to Rimoi National Reserve provide opportunities to see large herds of elephants just 45 minutes away.
          </p>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="mt-16 space-y-6">
        <h3 className="font-display text-2xl text-primary font-medium">Cherush Guesthouse Location Map</h3>
        <p className="text-muted">Use the map below to explore our exact location relative to Kamariny Stadium, Iten town center, and the Kerio Valley viewpoints.</p>
        <div className="h-[500px] w-full rounded-[24px] overflow-hidden shadow-premium border border-primary/10">
          <iframe
            title="Cherush Guesthouse Location Map - Iten, Kenya"
            src={mapUrl.replace('maps?q', 'maps?output=embed&q')}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
