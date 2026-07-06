
import { SectionHeading } from '@/components/ui/section-heading'
export default function AnalyticsDashboardPage() {
  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Data" title="Performance Analytics" body="Bookings, visitors, search terms, and revenue trends." />
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border"><h4 className="text-text/60">Total Revenue</h4><p className="text-3xl font-bold mt-2">KES 450,000</p></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border"><h4 className="text-text/60">Conversion Rate</h4><p className="text-3xl font-bold mt-2">3.2%</p></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border"><h4 className="text-text/60">Top Page</h4><p className="text-xl font-bold mt-2">/athlete-accommodation</p></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border"><h4 className="text-text/60">Bounce Rate</h4><p className="text-3xl font-bold mt-2">42%</p></div>
      </div>
      <div className="bg-white rounded-3xl p-8 border shadow-sm h-64 flex items-center justify-center">
        Chart Placeholder
      </div>
    </div>
  )
}
