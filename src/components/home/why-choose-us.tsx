import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Dumbbell, Laptop, ShieldAlert, Palmtree, Utensils, Zap } from 'lucide-react'

const ADVANTAGES = [
  {
    icon: Dumbbell,
    title: 'Altitude Training Base',
    desc: 'Situated at 2,400m altitude, within easy jogging distance to Kamariny Stadium and major red dirt running trails.'
  },
  {
    icon: Laptop,
    title: 'Digital Nomad Ready',
    desc: 'Dedicated workspace desks in our One Bedroom & Extended Stay suites, with high-speed fiber internet.'
  },
  {
    icon: Utensils,
    title: 'Private Self-Catering',
    desc: 'Each unit features a private kitchen or kitchenette, giving you full control over your recovery diet and schedule.'
  },
  {
    icon: Palmtree,
    title: 'Tranquil Gardens',
    desc: 'Relaxing outdoor green spaces and private veranda patios for stretching, reading, and post-run unwinding.'
  },
  {
    icon: Zap,
    title: 'Utility Redundancy',
    desc: 'Automatic backup battery systems for WiFi routers ensure you never lose connectivity during local grid outages.'
  },
  {
    icon: ShieldAlert,
    title: 'Safe Gated Living',
    desc: "Full secure perimeter walls with guarded entryways, located in Iten's quiet, friendly residential neighborhood."
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-32 bg-white relative">
      <Container className="space-y-16">
        <SectionHeading
          eyebrow="The Advantages"
          title="Designed for high performance and calm recovery"
          body="Whether you are in Iten for a heavy training block, family holiday, or a quiet remote work retreat, we provide all the conveniences you need."
          center
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon
            return (
              <div key={idx} className="p-8 rounded-[28px] border border-primary/5 bg-primary/5 hover:bg-primary hover:text-white transition-all duration-500 group flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent group-hover:bg-white group-hover:text-primary transition-all duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-2xl font-semibold mb-4 tracking-tight group-hover:text-premium transition-colors">
                    {adv.title}
                  </h4>
                  <p className="text-muted text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                    {adv.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
