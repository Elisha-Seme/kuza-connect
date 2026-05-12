import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kuzaconnect.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'monthly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/ai-solutions', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/associates', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
    { url: '/careers', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/impact-matcher', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/capacity-assessment', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/mne-analyzer', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${SITE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
