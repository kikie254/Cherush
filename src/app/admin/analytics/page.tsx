import { SectionHeading } from '@/components/ui/section-heading'

export default function AnalyticsAdminPage() {
  return (
    <div className="rounded-[32px] bg-white p-8 shadow-[var(--shadow-soft)]">
      <SectionHeading eyebrow="Admin" title="Analytics" body="This section is scaffolded and ready for Supabase-backed CRUD wiring or richer dashboard widgets." />
    </div>
  )
}
