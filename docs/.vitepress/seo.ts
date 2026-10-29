import type { HeadConfig, PageData } from 'vitepress'

/** VitePress의 titleTemplate을 반영해 정적 HTML과 클라이언트 라우팅에 같은 제목을 쓴다. */
export function documentationTitle(page: PageData, siteTitle: string, siteTemplate?: string | boolean): string {
  const title = page.title || siteTitle
  const template = page.titleTemplate ?? siteTemplate
  if (template === false) return title
  if (typeof template === 'string' && template.includes(':title')) return template.replace(/:title/g, title)
  if (template === siteTitle) return title
  const suffix = typeof template === 'string' ? template : siteTitle
  return title === suffix ? title : `${title} | ${suffix}`
}

type DocumentationContext = {
  siteUrl: string
  siteName: string
  siteDescription: string
  framework: string
  version: string
  license: string
  repository: string
  pageData: PageData
  title: string
  description: string
}

/** SSR HTML에 페이지별 식별 정보와 문서 관계를 함께 기록한다. */
export function documentationHead(context: DocumentationContext): HeadConfig[] {
  const { siteUrl, siteName, siteDescription, framework, version, license, repository, pageData, title, description } = context
  const path = pageData.relativePath
  if (path === '404.md' || path.startsWith('frame/')) {
    return [['meta', { name: 'robots', content: 'noindex, follow' }]]
  }

  const url = `${siteUrl}/${path.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`
  const home = path === 'index.md'
  const collection = path === 'components/index.md'
  const article = !collection && /^(guide|components)\//.test(path)
  const websiteId = `${siteUrl}/#website`
  const softwareId = `${siteUrl}/#software`
  const breadcrumbId = `${url}#breadcrumb`
  const crumbs = [{ name: siteName, item: `${siteUrl}/` }]
  if (path.startsWith('components/') && !collection) {
    crumbs.push({ name: '컴포넌트 목록', item: `${siteUrl}/components/` })
  }
  if (!home) crumbs.push({ name: pageData.title, item: url })

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteName,
      url: `${siteUrl}/`,
      inLanguage: 'ko-KR',
      description: siteDescription,
      publisher: { '@type': 'Organization', name: 'Initializer Team', url: 'https://github.com/Initializer-org' }
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': softwareId,
      name: siteName,
      url: `${siteUrl}/`,
      description: siteDescription,
      codeRepository: repository,
      programmingLanguage: 'TypeScript',
      runtimePlatform: framework,
      version,
      license: `https://opensource.org/licenses/${license}`,
      author: { '@type': 'Organization', name: 'Initializer Team', url: 'https://github.com/Initializer-org' }
    },
    {
      '@type': collection ? 'CollectionPage' : 'WebPage',
      '@id': `${url}#document`,
      url,
      name: title,
      headline: title,
      description,
      inLanguage: 'ko-KR',
      isPartOf: { '@id': websiteId },
      about: { '@id': softwareId },
      ...(!home && { breadcrumb: { '@id': breadcrumbId } }),
      ...(article && { mainEntity: { '@id': `${url}#article` } }),
      ...(pageData.lastUpdated && { dateModified: new Date(pageData.lastUpdated).toISOString() })
    }
  ]
  if (article) {
    graph.push({
      '@type': 'TechArticle',
      '@id': `${url}#article`,
      headline: title,
      description,
      url,
      inLanguage: 'ko-KR',
      mainEntityOfPage: { '@id': `${url}#document` },
      about: { '@id': softwareId },
      ...(pageData.lastUpdated && { dateModified: new Date(pageData.lastUpdated).toISOString() })
    })
  }
  if (!home) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb }))
    })
  }

  return [
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image:alt', content: `${siteName} 컴포넌트 라이브러리` }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image:alt', content: `${siteName} 컴포넌트 라이브러리` }],
    // 문서 제목에 HTML이 들어와도 script 요소를 닫지 못하게 직렬화한다.
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
    ]
  ]
}
