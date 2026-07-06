
import { SectionHeading } from '@/components/ui/section-heading'
export default function BlogAdminPage() {
  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Content" title="Blog CMS" body="Draft, schedule, and publish high-authority SEO content." />
      <div className="bg-white rounded-3xl p-8 border shadow-sm">
        <button className="bg-primary text-white px-6 py-3 rounded-lg mb-8">+ New Article</button>
        <div className="border rounded-xl divide-y">
           <div className="p-4 flex justify-between items-center"><span className="font-bold">Best Running Routes</span><span className="text-green-600 bg-green-50 px-3 rounded-full">Published</span></div>
           <div className="p-4 flex justify-between items-center"><span className="font-bold">Nutrition Tips</span><span className="text-orange-600 bg-orange-50 px-3 rounded-full">Draft</span></div>
        </div>
      </div>
    </div>
  )
}
