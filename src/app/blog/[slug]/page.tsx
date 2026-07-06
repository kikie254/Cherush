import { getMetadata, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo'
import { getBlogPost, getBlogPosts } from '@/lib/blog-data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return getMetadata({
      title: 'Not Found',
      path: `/blog/${slug}`,
      noindex: true
    })
  }

  return getMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    ogImage: post.image
  })
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: post.title, item: `/blog/${post.slug}` }
  ])

  const faqSchema = post.faqs ? getFAQSchema(post.faqs) : null

  // Generate article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'image': [post.image],
    'datePublished': post.datePublished,
    'dateModified': post.datePublished,
    'author': [{
      '@type': 'Person',
      'name': 'Cherush Content Team',
      'url': 'https://cherushguesthouse.com/about-iten'
    }]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="min-h-screen bg-background selection:bg-accent/20 pb-20">
        <header className="relative h-[60vh] flex items-end justify-center overflow-hidden pb-16">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="px-3 py-1 bg-accent rounded-full text-white text-sm font-medium">
                {post.category}
              </span>
              <span className="text-white/80 text-sm">{post.date}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="px-4 md:px-8 max-w-4xl mx-auto -mt-8 relative z-20">
          <div className="bg-white rounded-2xl shadow-sm border border-primary/5 p-8 md:p-12">
            
            {/* E-E-A-T Author Block */}
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-primary/10">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <span className="text-accent font-bold">C</span>
              </div>
              <div>
                <p className="font-semibold text-primary">Cherush Content Team</p>
                <div className="flex items-center gap-2 text-sm text-text/60">
                  <span>Local Iten Experts</span>
                  <span>&bull;</span>
                  <span>Last Reviewed: {new Date(post.datePublished).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <div 
              className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary max-w-none prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-primary/10">
                <h3 className="font-display text-3xl text-primary mb-8">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {post.faqs.map((faq, i) => (
                    <div key={i} className="bg-background rounded-xl p-6">
                      <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                      <p className="text-text/80">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </article>
    </>
  )
}
