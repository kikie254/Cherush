import { Award, Wifi, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react'

const BADGES = [
  {
    icon: Award,
    title: '4.9/5 Rating',
    desc: 'Verified guest satisfaction score across all booking channels'
  },
  {
    icon: Wifi,
    title: 'Fiber WiFi',
    desc: 'Uninterrupted internet connection with power backup systems'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Compound',
    desc: 'Gated residential property with 24/7 security presence'
  },
  {
    icon: HeartHandshake,
    title: 'Superhost Standard',
    desc: 'Attentive, locally connected hosting for a seamless stay'
  }
]

export function TrustBadges() {
  return (
    <section className="bg-primary/5 py-16 border-y border-primary/10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon
            return (
              <div key={idx} className="flex gap-4 md:flex-col md:items-start group transition-all duration-300">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display text-xl text-primary font-semibold tracking-tight">{badge.title}</h4>
                  <p className="text-sm leading-relaxed text-muted">{badge.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
