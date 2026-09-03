import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rincondelaromo.com'

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/talleres', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/bienestar', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/cafeteria-cowork', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/espacios', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/concept-store', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/planes', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contacto', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacidad', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
