import { getMetadata, getBreadcrumbSchema } from '@/lib/seo'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/blog-data'

export const metadata = getMetadata({
  title: 'Blog & Travel Guide | Cherush Guesthouse Iten',
  description: 'Read the latest articles about running in Iten, travel guides, local attractions, and accommodation tips in the Home of Champions.',
  path: '/blog',
})

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Blog', item: '/blog' }
])

export default async function BlogIndexPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
          Iten Travel & Athletics Blog
        </h1>
        <p className="text-xl text-text/70 mb-12 max-w-2xl">
          Everything you need to know about training, staying, and exploring Iten, Kenya.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-primary/5"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-accent/10 text-accent rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-text/50">{post.date}</span>
                </div>
                <h2 className="font-display text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-text/70 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <span className="mt-auto text-sm font-medium text-accent">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
