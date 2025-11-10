export async function GET() {
  const pages = [
    '',
    'features',
    'pricing',
    'demos',
    'team',
    'case-studies',
    'blog',
    'careers',
    'contact',
    'support',
    'status',
    'docs',
    'about',
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>https://pixelatedempathy.com/${page}</loc>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
