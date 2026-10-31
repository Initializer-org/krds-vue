/** 빌드된 HTML과 sitemap을 검사한다. 사용: pnpm docs:build && pnpm docs:seo */
import assert from 'node:assert/strict'
import { existsSync, globSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'docs/.vitepress/dist')
const packagePath = existsSync(resolve(root, 'projects/krds-angular/package.json')) ? 'projects/krds-angular/package.json' : 'package.json'
const pkg = JSON.parse(readFileSync(resolve(root, packagePath), 'utf8'))
const siteUrl = `https://${readFileSync(resolve(root, 'docs/public/CNAME'), 'utf8').trim()}`
const read = path => readFileSync(resolve(dist, path), 'utf8')
const decode = text =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]))
const elements = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'g'))].map(match => attrs(match[0]))
const pageUrl = file => `${siteUrl}/${file.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '')}`
const files = globSync('**/*.html', { cwd: dist }).sort()
assert(files.length > 0, '문서를 먼저 빌드하세요.')
const sitemap = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]))
assert.equal(new Set(sitemap).size, sitemap.length, 'sitemap URL 중복')
const robots = read('robots.txt')
assert(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), 'robots sitemap 누락')
assert(!/^Disallow:\s*\/\s*$/m.test(robots), '문서 크롤링 차단')
assert(!/^Disallow:\s*\/frame\//m.test(robots), 'frame noindex를 읽을 수 있도록 크롤링 허용 필요')

const titles = new Set()
const descriptions = new Set()
const indexed = []
for (const file of files) {
  const html = read(file)
  const meta = elements(html, 'meta')
  const canonical = elements(html, 'link').filter(item => item.rel === 'canonical')
  const noindex = meta.some(item => item.name === 'robots' && item.content.includes('noindex'))
  const schema = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]))
  const url = pageUrl(file)
  if (file === '404.html' || file.startsWith('frame/')) {
    assert(noindex, `${file}: noindex 누락`)
    assert.equal(canonical.length, 0, `${file}: 검색 제외 페이지 canonical 제거 필요`)
    assert.equal(schema.length, 0, `${file}: 검색 제외 페이지 문서 schema 제거 필요`)
    assert(!sitemap.includes(url), `${file}: sitemap에서 제외 필요`)
    continue
  }

  indexed.push(url)
  assert(!noindex, `${file}: 문서가 noindex 상태`)
  assert.equal(canonical.length, 1, `${file}: canonical은 하나여야 함`)
  assert.equal(canonical[0].href, url, `${file}: canonical URL 불일치`)
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '')
  const descriptionsOnPage = meta.filter(item => item.name === 'description')
  assert.equal(descriptionsOnPage.length, 1, `${file}: description은 하나여야 함`)
  const description = descriptionsOnPage[0].content
  assert(title && !titles.has(title), `${file}: 제목 누락 또는 중복`)
  assert(description && !descriptions.has(description), `${file}: 설명 누락 또는 중복`)
  titles.add(title)
  descriptions.add(description)
  assert(/<html[^>]+lang="ko-KR"/.test(html), `${file}: 문서 언어 누락`)
  assert(/<h1\b/.test(html), `${file}: 정적 HTML에 제목 누락`)
  for (const [key, expected] of Object.entries({
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'twitter:title': title,
    'twitter:description': description
  })) {
    const matches = meta.filter(item => item.property === key || item.name === key)
    assert.equal(matches.length, 1, `${file}: ${key} 개수 오류`)
    assert.equal(matches[0].content, expected, `${file}: ${key} 불일치`)
  }
  assert.equal(schema.length, 1, `${file}: JSON-LD graph는 하나여야 함`)
  const graph = schema[0]['@graph']
  assert(Array.isArray(graph), `${file}: 페이지별 schema graph 누락`)
  const document = graph.find(node => node['@id'] === `${url}#document`)
  assert.equal(document?.url, url, `${file}: 문서 schema URL 불일치`)
  assert.equal(document.description, description, `${file}: 문서 schema 설명 불일치`)
  assert(
    graph.some(node => node['@type'] === 'WebSite'),
    `${file}: WebSite 누락`
  )
  const software = graph.find(node => node['@type'] === 'SoftwareSourceCode')
  assert(software?.version && software.codeRepository, `${file}: 패키지 식별 정보 누락`)
  assert.equal(software.version, pkg.version, `${file}: 패키지 버전 불일치`)
  assert.equal(software.name, pkg.name, `${file}: npm 패키지명 불일치`)
  assert.equal(software.identifier, pkg.name, `${file}: npm 식별자 불일치`)
  assert.equal(software.sameAs, `https://www.npmjs.com/package/${pkg.name}`, `${file}: npm URL 불일치`)
  assert.equal(software.codeRepository, pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, ''), `${file}: 저장소 불일치`)
  assert.equal(software.url, `${pkg.homepage.replace(/\/$/, '')}/`, `${file}: 패키지 문서 주소 불일치`)
  if (file !== 'index.html') {
    const breadcrumb = graph.find(node => node['@type'] === 'BreadcrumbList')
    assert.equal(breadcrumb?.itemListElement.at(-1).item, url, `${file}: breadcrumb 현재 페이지 불일치`)
  }
  if (/^(guide|components)\//.test(file) && file !== 'components/index.html') {
    assert(
      graph.some(node => node['@type'] === 'TechArticle' && node.mainEntityOfPage?.['@id'] === document['@id']),
      `${file}: TechArticle 연결 누락`
    )
  }
  // JSON-LD 참조가 동일 graph 안의 실제 entity를 가리키는지 확인한다.
  const ids = new Set(graph.map(node => node['@id']))
  for (const node of graph) {
    for (const key of ['isPartOf', 'about', 'breadcrumb', 'mainEntity', 'mainEntityOfPage']) {
      if (node[key]) assert(ids.has(node[key]['@id']), `${file}: ${key} 참조 대상 누락`)
    }
  }
  // 페이지 내부 링크의 목적지와 명시적인 앵커를 빌드 산출물에서 확인한다.
  for (const link of elements(html, 'a')) {
    if (!link.href?.startsWith('/') || link.href.startsWith('//')) continue
    const target = new URL(link.href, siteUrl)
    const pathname = decodeURIComponent(target.pathname).slice(1)
    const targetFile = pathname.endsWith('/') || !pathname ? `${pathname}index.html` : `${pathname}.html`
    if (/\.[a-z0-9]+$/i.test(pathname)) continue
    assert(existsSync(resolve(dist, targetFile)), `${file}: 내부 링크 누락 ${link.href}`)
    if (target.hash) {
      const id = decodeURIComponent(target.hash.slice(1))
      const targetHtml = read(targetFile)
      assert(targetHtml.includes(`id="${id}"`) || targetHtml.includes(`id="${id.normalize('NFKD')}"`), `${file}: 앵커 누락 ${link.href}`)
    }
  }
}
assert.deepEqual([...sitemap].sort(), indexed.sort(), 'sitemap과 색인 대상 HTML이 다름')
const button = read('components/button.html')
assert(/id="doc-panel-api"/.test(button) && /<table\b/.test(button), 'API 표가 정적 HTML에 없음')
const faq = read('guide/faq.html')
assert((faq.match(/<h2\b/g) ?? []).length >= 6, 'FAQ 질문·답변이 정적 HTML에 없음')
assert(!read('guide/getting-started.html').includes('아직 npm에 배포하지 않았습니다'), '배포 상태 안내가 오래됨')
const aiIndex = read('llms.txt')
const aiFull = read('llms-full.txt')
for (const path of ['guide/getting-started', 'guide/ai', 'guide/faq', 'components/button']) {
  assert(aiIndex.includes(`${siteUrl}/${path}`), `llms.txt에 ${path} 누락`)
  assert(aiFull.includes(`원문: ${siteUrl}/${path}\n`), `llms-full.txt에 ${path} 원문 링크 누락`)
}
const packageInfo = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
assert(aiFull.includes(`${packageInfo.name}@${packageInfo.version}`), 'AI 문서 패키지 버전 불일치')
assert(aiFull.includes(packageInfo.peerDependencies.vue), 'AI 문서 Vue 지원 범위 불일치')
const faqText = aiFull.split(`원문: ${siteUrl}/guide/faq\n`)[1]?.split('\n\n---\n\n')[0]
assert(faqText?.includes('## 라이선스와 AI 도구용 문서는 어디에 있나요?'), 'AI 문서 FAQ 본문 누락')
assert(faqText?.includes('<script setup lang="ts">'), 'AI 문서의 Vue 코드 예제 손상')
assert(!aiFull.includes('<ComponentApi name='), 'AI 문서 API 표가 펼쳐지지 않음')
for (const file of ['llms.txt', 'llms-full.txt', 'ai/guidelines.md', 'ai/krds-vue.mdc']) {
  assert(read(file).includes(`npm install ${pkg.name}`), `${file}: AI 문서 npm 설치 명령 누락`)
  assert(read(file).includes(`https://www.npmjs.com/package/${pkg.name}`), `${file}: AI 문서 npm 링크 누락`)
}
// 검색 엔진이 읽는 본문에도 실제 npm 설치 명령과 패키지 링크가 있어야 한다.
for (const file of ['index.html', 'guide/getting-started.html', 'guide/faq.html']) {
  const html = read(file)
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? ''
  const text = decode(body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ''))
  assert(text.includes(`npm install ${pkg.name}`), `${file}: 본문에 정확한 npm 설치 명령 누락`)
  assert(
    elements(body, 'a').some(link => link.href === `https://www.npmjs.com/package/${pkg.name}`),
    `${file}: npm 링크 누락`
  )
}
const readme = readFileSync(resolve(root, 'README.md'), 'utf8')
assert(readme.includes(`npm install ${pkg.name}`), 'README 설치 명령 불일치')
for (const framework of ['vue', 'react', 'angular']) {
  assert(faq.includes(`https://www.npmjs.com/package/@krds.ui/${framework}`), `FAQ: ${framework} 패키지 구분 누락`)
}
process.stdout.write(
  `SEO 검사 통과: ${relative(root, dist)}, 색인 대상 ${indexed.length}개, 검색 제외 ${files.length - indexed.length}개\n`
)
