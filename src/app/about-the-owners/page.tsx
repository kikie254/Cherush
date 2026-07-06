import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'

export const metadata = getMetadata({
  title: 'About The Founders | Cherush Guesthouse',
  description: 'Meet the passionate team behind Cherush Guesthouse and their dedication to Iten.',
  path: '/about-the-owners',
})

export default function Page() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8">About The Founders</h1>
      <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-primary/5">
        <p className="lead">Meet the passionate team behind Cherush Guesthouse and their dedication to Iten.</p>
        <h2>Commitment to Transparency</h2>
        <p>At Cherush Guesthouse, we operate under the highest standards of integrity, transparency, and Kenyan hospitality. This document outlines our formal commitments to you, our valued guest, ensuring your experience in Iten is secure, comfortable, and exactly as promised.</p>
        <h3>1. Standard Operations</h3>
        <p>We believe in clear communication. Whether you are an elite athlete here for months or a tourist visiting for the weekend, these guidelines are enforced equitably to protect the serene, focused environment of our guesthouse.</p>
        <h3>2. Contact Information</h3>
        <p>If you have any questions regarding these policies, please reach out directly to our management team via our <a href="/contact" className="text-accent">Contact Page</a>. We are always available to assist.</p>
      </div>
    </main>
  )
}
