
import { SectionHeading } from '@/components/ui/section-heading'
export default function AdminReviewsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Management" title="Review Moderation" body="Approve, reject, and reply to guest reviews." />
      <div className="bg-white rounded-3xl p-8 border shadow-sm flex flex-col gap-4 text-center items-center py-20">
        <h3 className="text-xl font-bold">Review System Active</h3>
        <p className="text-text/60">Connect to Supabase to moderate incoming reviews. Only approved reviews will emit schema.</p>
      </div>
    </div>
  )
}
