import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface EventTemplateProps {
  type: 'Marathon' | 'Training Camp' | 'Tour Package' | 'Seasonal Offer' | 'Holiday Promotion' | 'Local Event'
  title: string
  dateString: string
  description: string
  features: string[]
  priceString?: string
  imageUrl: string
  ctaText?: string
  ctaLink?: string
}

export function LocalEventTemplate({
  type,
  title,
  dateString,
  description,
  features,
  priceString,
  imageUrl,
  ctaText = 'Book Now',
  ctaLink = '/bookings'
}: EventTemplateProps) {
  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
            <div className="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              {type}
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className="text-accent font-bold uppercase tracking-widest text-sm mb-4">{dateString}</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">{title}</h2>
              <p className="text-lg text-text/80 leading-relaxed">{description}</p>
            </div>
            
            <ul className="space-y-4 border-y border-primary/10 py-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-accent text-xl leading-none">&bull;</span>
                  <span className="text-primary font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
              {priceString && (
                <div>
                  <p className="text-text/60 text-sm uppercase tracking-wide">Starting from</p>
                  <p className="text-3xl font-bold text-primary">{priceString}</p>
                </div>
              )}
              <Button href={ctaLink} variant="accent" className="px-10 py-6 text-lg">
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
