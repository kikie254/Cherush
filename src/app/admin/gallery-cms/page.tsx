
import { SectionHeading } from '@/components/ui/section-heading'
export default function GalleryAdminPage() {
  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Media" title="Gallery CMS" body="Upload photos, generate WebP/AVIF, and manage alt text." />
      <div className="bg-white rounded-3xl p-8 border shadow-sm">
        <button className="bg-primary text-white px-6 py-3 rounded-lg mb-8">+ Upload New Media</button>
        <div className="grid grid-cols-3 gap-4">
           {/* Placeholder for media grid */}
           <div className="h-40 bg-black/5 rounded-xl flex items-center justify-center">Image 1</div>
           <div className="h-40 bg-black/5 rounded-xl flex items-center justify-center">Image 2</div>
        </div>
      </div>
    </div>
  )
}
