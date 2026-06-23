import { Award, Wifi, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react'

const BADGES = [
  { icon: Award, title: 'Guest Promises', desc: 'Guaranteed comfort & privacy' },
  { icon: ShieldCheck, title: 'Cleaning Standards', desc: 'Rigorous deep cleaning protocols' },
  { icon: HeartHandshake, title: 'Local Experience', desc: 'Curated connections & itineraries' },
  { icon: CheckCircle, title: 'Rapid Response', desc: 'Under 1 hour host response time' },
]

export function TrustBadges() {
  return (
    <section className="bg-white py-12 border-b border-primary/5">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-8 md:gap-4 overflow-x-auto no-scrollbar">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon
            return (
              <div key={idx} className="flex items-center gap-4 group transition-all duration-300 min-w-[240px]">
                <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-primary tracking-tight leading-none mb-1">{badge.title}</h4>
                  <p className="text-xs text-muted/80">{badge.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
