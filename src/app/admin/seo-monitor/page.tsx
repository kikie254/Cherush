
import { SectionHeading } from '@/components/ui/section-heading'
export default function SEOMonitorPage() {
  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Health" title="SEO Monitoring" body="Automatic detection of 404s, broken links, missing alt text, and schema errors." />
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-200">
           <h4 className="font-bold text-green-700 flex items-center gap-2"><span>🟢</span> Core Web Vitals</h4>
           <p className="text-sm mt-2">All pages passing LCP &lt; 1.8s</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-200">
           <h4 className="font-bold text-yellow-700 flex items-center gap-2"><span>🟡</span> Broken Links</h4>
           <p className="text-sm mt-2">2 orphaned images detected in gallery.</p>
        </div>
      </div>
    </div>
  )
}
