import { getMetadata } from '@/lib/seo'

export const metadata = getMetadata({
  title: 'Leave a Review',
  description: 'Share your experience staying at Cherush Guesthouse in Iten, Kenya.',
  path: '/leave-review',
  noindex: true,
})

import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

export default function LeaveReviewPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Feedback" title="Leave a Review" body="Your feedback helps us maintain the highest standards in Iten." />
        <form className="mt-12 bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-primary/5 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="reviewer-name" className="block text-sm mb-2 font-medium">Name</label>
              <input id="reviewer-name" type="text" className="w-full border rounded-lg p-3" required autoComplete="name" />
            </div>
            <div>
              <label htmlFor="reviewer-email" className="block text-sm mb-2 font-medium">Email</label>
              <input id="reviewer-email" type="email" className="w-full border rounded-lg p-3" required autoComplete="email" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold">Rate Your Stay (1–5)</h2>
            {['Overall', 'Cleanliness', 'Staff', 'Food', 'WiFi', 'Location'].map(metric => (
              <div key={metric} className="flex justify-between items-center border-b pb-2">
                <label htmlFor={`rating-${metric.toLowerCase()}`}>{metric}</label>
                <select id={`rating-${metric.toLowerCase()}`} className="border rounded p-1" required>
                  <option value="5">5 — Excellent</option>
                  <option value="4">4 — Good</option>
                  <option value="3">3 — Average</option>
                  <option value="2">2 — Poor</option>
                  <option value="1">1 — Terrible</option>
                </select>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="review-body" className="block text-sm mb-2 font-medium">Your Story</label>
            <textarea id="review-body" className="w-full border rounded-lg p-3 h-32" required />
          </div>
          <div>
            <label htmlFor="review-photos" className="block text-sm mb-2 font-medium">Upload Photos (optional)</label>
            <input id="review-photos" type="file" multiple accept="image/*" />
          </div>
          <button type="submit" className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 transition-colors">
            Submit Review
          </button>
        </form>
      </Container>
    </main>
  )
}
