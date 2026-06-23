import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

const PARTNERS = [
  { name: 'Iten Athletic Club', role: 'Training Partner' },
  { name: 'Kamariny Stadium', role: '5 Minutes Away' },
  { name: 'Kerio Valley Tours', role: 'Experience Partner' }
]

export function LocalPartners() {
  return (
    <section className="py-32 bg-white border-t border-primary/5">
      <Container>
        <div className="flex flex-col items-center text-center mb-16">
          <SectionHeading
            eyebrow="Community"
            title="Local Partners"
            body="We work with the best in Iten to ensure your stay and training are fully supported."
            center
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PARTNERS.map((partner, idx) => (
            <div key={idx} className="p-8 rounded-[20px] bg-background text-center flex flex-col items-center justify-center transition-all duration-300 hover:shadow-soft">
              <h3 className="font-display text-2xl text-primary mb-2">{partner.name}</h3>
              <p className="text-sm uppercase tracking-widest text-accent font-medium">{partner.role}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
