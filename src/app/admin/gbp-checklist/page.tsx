
import { SectionHeading } from '@/components/ui/section-heading'
export default function GBPChecklistPage() {
  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Local SEO" title="Google Business Profile Tasks" body="Weekly checklist to maintain #1 local ranking." />
      <div className="bg-white rounded-3xl p-8 border shadow-sm space-y-4">
        {['Upload 3 new photos this week', 'Reply to 2 new guest reviews', 'Publish a Google Post about a local event', 'Verify holiday opening hours'].map(task => (
           <label key={task} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-black/5 cursor-pointer">
             <input type="checkbox" className="w-5 h-5 accent-primary" />
             <span className="font-medium">{task}</span>
           </label>
        ))}
      </div>
    </div>
  )
}
