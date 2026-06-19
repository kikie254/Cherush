import { SectionHeading } from '@/components/ui/section-heading'

export default function BookingsAdminPage() {
  return (
    <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
      <SectionHeading eyebrow="Admin" title="Bookings" body="This section is scaffolded and ready for Firebase-backed CRUD wiring or richer dashboard widgets." />
    </div>
  )
}
