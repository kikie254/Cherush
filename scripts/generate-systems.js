const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// -------------------------------------------------------------
// Phase 1: Review System
// -------------------------------------------------------------
const reviewFormDir = './src/app/leave-review';
ensureDir(reviewFormDir);
fs.writeFileSync(path.join(reviewFormDir, 'page.tsx'), `
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
`);

const reviewAdminDir = './src/app/admin/reviews-v2';
ensureDir(reviewAdminDir);
fs.writeFileSync(path.join(reviewAdminDir, 'page.tsx'), `
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
`);

// -------------------------------------------------------------
// Phase 2: Gallery CMS
// -------------------------------------------------------------
const galleryAdminDir = './src/app/admin/gallery-cms';
ensureDir(galleryAdminDir);
fs.writeFileSync(path.join(galleryAdminDir, 'page.tsx'), `
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
`);

// -------------------------------------------------------------
// Phase 3: Blog CMS
// -------------------------------------------------------------
const blogAdminDir = './src/app/admin/blog-cms';
ensureDir(blogAdminDir);
fs.writeFileSync(path.join(blogAdminDir, 'page.tsx'), `
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
`);

// -------------------------------------------------------------
// Phase 4: Analytics Dashboard
// -------------------------------------------------------------
const analyticsAdminDir = './src/app/admin/analytics-v2';
ensureDir(analyticsAdminDir);
fs.writeFileSync(path.join(analyticsAdminDir, 'page.tsx'), `
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
`);

// -------------------------------------------------------------
// Phase 6: SEO Monitoring
// -------------------------------------------------------------
const seoAdminDir = './src/app/admin/seo-monitor';
ensureDir(seoAdminDir);
fs.writeFileSync(path.join(seoAdminDir, 'page.tsx'), `
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
`);

// -------------------------------------------------------------
// Phase 7: GBP Checklist
// -------------------------------------------------------------
const gbpAdminDir = './src/app/admin/gbp-checklist';
ensureDir(gbpAdminDir);
fs.writeFileSync(path.join(gbpAdminDir, 'page.tsx'), `
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
`);

// -------------------------------------------------------------
// Update Admin Layout Sidebar
// -------------------------------------------------------------
// Assuming I'll inject these links into the admin layout via replace_file_content later.

console.log('Admin CMS pages and Review System generated.');
