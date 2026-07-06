import { requireAdmin } from '@/lib/auth'
import { getAdminReviews } from '@/lib/queries'
import { ReviewsModeration } from '@/components/admin/reviews-moderation'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Review Moderation | Admin',
  robots: { index: false, follow: false },
}

export default async function AdminReviewsPage() {
  await requireAdmin()

  const reviews = await getAdminReviews()

  return (
    <div className="space-y-10 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[40px] shadow-premium border border-white/50">
        <SectionHeading
          eyebrow="Admin"
          title="Review Moderation"
          body="Approve, hide, or delete guest reviews. Only published reviews appear on the website."
        />
      </div>
      <ReviewsModeration reviews={reviews} />
    </div>
  )
}
