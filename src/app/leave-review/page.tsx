
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'

export default function LeaveReviewPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Feedback" title="Leave a Review" body="Your feedback helps us maintain the highest standards in Iten." />
        <form className="mt-12 bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-primary/5 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div><label className="block text-sm mb-2">Name</label><input type="text" className="w-full border rounded-lg p-3" required /></div>
            <div><label className="block text-sm mb-2">Email</label><input type="email" className="w-full border rounded-lg p-3" required /></div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold">Rate Your Stay (1-5)</h3>
            {['Overall', 'Cleanliness', 'Staff', 'Food', 'WiFi', 'Location'].map(metric => (
              <div key={metric} className="flex justify-between items-center border-b pb-2">
                <span>{metric}</span>
                <select className="border rounded p-1" required>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
            ))}
          </div>
          <div><label className="block text-sm mb-2">Your Story</label><textarea className="w-full border rounded-lg p-3 h-32" required></textarea></div>
          <div><label className="block text-sm mb-2">Upload Photos</label><input type="file" multiple accept="image/*" /></div>
          <button type="submit" className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 transition-colors">Submit Verified Review</button>
        </form>
      </Container>
    </main>
  )
}
