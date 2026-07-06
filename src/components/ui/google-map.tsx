'use client'

import { MapPin, Phone, MessageCircle, ExternalLink, Navigation } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { trackWhatsAppClick, trackPhoneClick, trackMapClick } from '@/lib/analytics'

interface GoogleMapProps {
  className?: string
}

export function GoogleMap({ className = '' }: GoogleMapProps) {
  const { lat, lng } = siteConfig.coordinates
  const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`

  return (
    <div className={`rounded-[28px] overflow-hidden shadow-[0_12px_60px_rgba(0,0,0,0.08)] ${className}`}>
      {/* Map iframe */}
      <div className="relative w-full h-64 md:h-80 bg-primary/5">
        <iframe
          title="Cherush Stay Iten – Location Map"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Action bar */}
      <div className="bg-white px-6 py-5 flex flex-wrap items-center gap-3 border-t border-black/5">
        {/* Address */}
        <div className="flex items-center gap-2 text-sm text-muted mr-auto min-w-0">
          <MapPin className="w-4 h-4 text-accent shrink-0" />
          <span className="truncate">{siteConfig.address}</span>
        </div>

        {/* Directions */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-accent transition-colors duration-200"
          aria-label="Get directions to Cherush Stay Iten"
        >
          <Navigation className="w-3.5 h-3.5" />
          Directions
        </a>

        {/* Open in Maps */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary/5 text-primary text-xs font-medium px-4 py-2 rounded-full hover:bg-primary/10 transition-colors duration-200"
          aria-label="Open location in Google Maps"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open Maps
        </a>

        {/* Phone */}
        <a
          href={`tel:${siteConfig.phone}`}
          onClick={() => trackPhoneClick()}
          className="flex items-center gap-2 bg-primary/5 text-primary text-xs font-medium px-4 py-2 rounded-full hover:bg-primary/10 transition-colors duration-200"
          aria-label={`Call us at ${siteConfig.phone}`}
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('contact_page')}
          className="flex items-center gap-2 bg-emerald-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-emerald-600 transition-colors duration-200"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
