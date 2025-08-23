import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'luke-docs',
    short_name: 'luke-docs',
    description: 'terminal-inspired documentation system',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'fullscreen'],
    background_color: '#ffffff',
    theme_color: '#ffffff',
    orientation: 'portrait',
    categories: ['documentation', 'development', 'reference'],
    prefer_related_applications: false,
    icons: [
      {
        src: '/assets/logo-2.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/logo-2.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}