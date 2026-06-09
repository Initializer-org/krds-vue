import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const outputDir = 'storybook-static'
const siteUrl = 'https://krds.initializer.org'
const siteHost = 'krds.initializer.org'
const title = 'KRDS Vue - Vue 3 컴포넌트 라이브러리'
const description =
  'KRDS 디자인 시스템을 Vue 3와 TypeScript 환경에서 사용할 수 있도록 구현한 컴포넌트 라이브러리 문서입니다. 공공 웹서비스를 위한 폼, 내비게이션, 레이아웃, 피드백 UI 예제와 API를 제공합니다.'
const keywords = [
  'KRDS',
  'KRDS Vue',
  'Vue 3',
  'Vue 컴포넌트',
  'TypeScript',
  '디자인 시스템',
  '정부 디자인 시스템',
  '공공 웹서비스',
  'Storybook'
]

const escapeHtml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const escapeXml = value =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

const indexPath = join(outputDir, 'index.html')
const indexJsonPath = join(outputDir, 'index.json')

if (!existsSync(indexPath)) {
  throw new Error(`Storybook index.html not found: ${indexPath}`)
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: 'KRDS Vue',
  description,
  url: siteUrl,
  codeRepository: 'https://github.com/Initializer-org/krds-vue',
  programmingLanguage: ['TypeScript', 'Vue'],
  runtimePlatform: 'Vue 3',
  license: 'https://opensource.org/licenses/MIT',
  applicationCategory: 'DeveloperApplication'
}

const seoBlock = `    <!-- KRDS Vue SEO -->
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords.join(', '))}" />
    <meta name="author" content="Initializer Team" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${siteUrl}/" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#256ef4" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="KRDS Vue" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${siteUrl}/" />
    <meta property="og:image" content="${siteUrl}/og-image.svg" />
    <meta property="og:image:type" content="image/svg+xml" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="ko_KR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${siteUrl}/og-image.svg" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <!-- /KRDS Vue SEO -->`

let html = readFileSync(indexPath, 'utf-8')
html = html.replace(/<html lang="[^"]*">/, '<html lang="ko">')
html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)

if (html.includes('<!-- KRDS Vue SEO -->')) {
  html = html.replace(/ {4}<!-- KRDS Vue SEO -->[\s\S]*? {4}<!-- \/KRDS Vue SEO -->/, seoBlock)
} else {
  html = html.replace(/(\s*)<\/head>/, `\n${seoBlock}$1</head>`)
}

writeFileSync(indexPath, html)

if (existsSync(join(outputDir, 'iframe.html'))) {
  let iframeHtml = readFileSync(join(outputDir, 'iframe.html'), 'utf-8')
  if (!iframeHtml.includes('name="robots"')) {
    iframeHtml = iframeHtml.replace(/(\s*)<\/head>/, '\n    <meta name="robots" content="noindex, nofollow" />$1</head>')
  }
  iframeHtml = iframeHtml.replace(/<html lang="[^"]*">/, '<html lang="ko">')
  writeFileSync(join(outputDir, 'iframe.html'), iframeHtml)
}

const docsUrls = []
if (existsSync(indexJsonPath)) {
  const storybookIndex = JSON.parse(readFileSync(indexJsonPath, 'utf-8'))
  const entries = Object.values(storybookIndex.entries ?? {})
    .filter(entry => entry.type === 'docs')
    .sort((a, b) => a.id.localeCompare(b.id))

  for (const entry of entries) {
    docsUrls.push(`${siteUrl}/?path=/docs/${encodeURIComponent(entry.id)}`)
  }
}

const today = new Date().toISOString().slice(0, 10)
const sitemapUrls = [
  { loc: `${siteUrl}/`, priority: '1.0' },
  ...docsUrls.map(loc => ({
    loc,
    priority: loc.includes('krds-vue-') ? '0.9' : '0.7'
  }))
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(outputDir, 'sitemap.xml'), sitemap)
writeFileSync(
  join(outputDir, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /iframe.html
Disallow: /project.json
Sitemap: ${siteUrl}/sitemap.xml
`
)
writeFileSync(join(outputDir, 'CNAME'), `${siteHost}\n`)
writeFileSync(join(outputDir, '.nojekyll'), '')
writeFileSync(
  join(outputDir, 'site.webmanifest'),
  `${JSON.stringify(
    {
      name: 'KRDS Vue',
      short_name: 'KRDS Vue',
      description,
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#256ef4',
      lang: 'ko'
    },
    null,
    2
  )}\n`
)
writeFileSync(
  join(outputDir, 'og-image.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">KRDS Vue</title>
  <desc id="desc">Vue 3와 TypeScript를 위한 KRDS 컴포넌트 라이브러리</desc>
  <rect width="1200" height="630" fill="#f4f5f6"/>
  <rect x="72" y="72" width="1056" height="486" rx="24" fill="#ffffff"/>
  <rect x="72" y="72" width="1056" height="12" fill="#256ef4"/>
  <text x="120" y="230" fill="#1e2124" font-family="Arial, sans-serif" font-size="84" font-weight="700">KRDS Vue</text>
  <text x="120" y="318" fill="#464c53" font-family="Arial, sans-serif" font-size="40">Vue 3 + TypeScript Component Library</text>
  <text x="120" y="392" fill="#58616a" font-family="Arial, sans-serif" font-size="30">Korea Digital Service Design System</text>
  <g transform="translate(120 444)">
    <rect width="176" height="54" rx="12" fill="#256ef4"/>
    <text x="88" y="36" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="700">Storybook</text>
    <rect x="204" width="128" height="54" rx="12" fill="#eef2f7"/>
    <text x="268" y="36" text-anchor="middle" fill="#063a74" font-family="Arial, sans-serif" font-size="24" font-weight="700">ESM</text>
    <rect x="360" width="184" height="54" rx="12" fill="#eef2f7"/>
    <text x="452" y="36" text-anchor="middle" fill="#063a74" font-family="Arial, sans-serif" font-size="24" font-weight="700">Vue 3.5+</text>
  </g>
</svg>
`
)

if (existsSync(indexPath)) {
  copyFileSync(indexPath, join(outputDir, '404.html'))
}
