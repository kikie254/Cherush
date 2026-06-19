import { StatsGrid } from '@/components/admin/stats'
import { SectionHeading } from '@/components/ui/section-heading'
import { getAdminData } from '@/lib/queries'

export default async function AdminPage() {
  const data = await getAdminData()

  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Admin" title="Overview" body="Seed admin dashboard showing revenue, approvals, occupancy, and sample operational data." />
      <StatsGrid stats={data.stats} />
    </div>
  )
}
