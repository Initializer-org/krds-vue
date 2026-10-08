import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, postcssIsolateStyles } from 'vitepress'
import type { MarkdownRenderer } from 'vitepress'
import { componentGroups } from './component-groups.ts'
import { pageDescription } from './pages.ts'

const root = resolve(import.meta.dirname, '../..')
const { version } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8')) as { version: string }

const siteUrl = 'https://krds.initializer.org'
const siteDescription =
  'KRDS 디자인 시스템을 Vue 3와 TypeScript 환경에서 사용할 수 있도록 구현한 컴포넌트 라이브러리 문서입니다. 공공 웹서비스를 위한 폼, 내비게이션, 레이아웃, 피드백 UI 예제와 API를 제공합니다.'

/** 페이지 URL (cleanUrls 기준) */
const pageUrl = (relativePath: string) => `${siteUrl}/${relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`

/** 옛 Storybook 주소(/?path=/docs/<id>, /iframe.html?id=<id>)를 새 문서 페이지로 옮긴다 (이미 공유된 링크 보존) */
const storybookRedirect = `(() => {
  const params = new URLSearchParams(location.search)
  const id = location.pathname === '/iframe.html' ? params.get('id') : location.pathname === '/' ? params.get('path')?.replace(/^\\/(docs|story)\\//, '') : null
  if (!id) return
  const slugs = ${JSON.stringify(componentGroups.flatMap(group => group.pages.map(([, slug]) => slug)))}
  const name = /^components-[a-z]+-krds([a-z]+)--/.exec(id)?.[1]
  const slug = id.startsWith('directives-v-sr-only') ? 'sr-only' : slugs.find(slug => slug.replace(/-/g, '') === name)
  location.replace(slug ? '/components/' + slug : id.startsWith('krds-vue-') ? '/guide/getting-started' : '/')
})()`

/**
 * 컴포넌트 문서의 '## API' 제목을 경계로 개요 / API 레퍼런스 탭 패널을 일반 HTML로 감싼다 (DocTabs는 탭 목록만 그림).
 * 본문을 컴포넌트 슬롯에 넣지 않아야 Vue가 정적 내용을 문자열로 묶어 페이지 JS가 커지지 않는다
 */
const docTabs = (md: MarkdownRenderer) => {
  md.core.ruler.push('doc-tabs', state => {
    if (!state.env.relativePath?.startsWith('components/')) return
    const { tokens } = state
    const isH2 = (index: number) => tokens[index].type === 'heading_open' && tokens[index].tag === 'h2'
    const api = tokens.findIndex((_, index) => isH2(index) && tokens[index + 1].content === 'API')
    if (api < 0) return
    const first = tokens.findIndex((_, index) => isH2(index))
    const html = (content: string) => Object.assign(new state.Token('html_block', '', 0), { content })
    const panel = (tab: string) =>
      `<div id="doc-panel-${tab}" class="doc-tab-panel" data-tab="${tab}" role="tabpanel" aria-labelledby="doc-tab-${tab}">\n`
    tokens.splice(api, 3, html(`</div>\n${panel('api')}`))
    tokens.splice(first, 0, html(`<div class="doc-tabs" data-active="overview">\n<DocTabs />\n${panel('overview')}`))
    tokens.push(html('</div>\n</div>\n'))
  })
}

export default defineConfig({
  lang: 'ko-KR',
  title: 'KRDS Vue',
  description: siteDescription,
  cleanUrls: true,
  markdown: { config: docTabs },
  // 페이지 수정일 표시와 사이트맵 lastmod (배포 워크플로는 전체 히스토리로 체크아웃)
  lastUpdated: true,
  sitemap: {
    hostname: siteUrl,
    // iframe 예제 페이지는 검색 대상에서 제외
    transformItems: items => items.filter(item => !item.url.startsWith('frame/'))
  },
  head: [
    ['script', {}, storybookRedirect],
    ['link', { rel: 'icon', type: 'image/svg+xml', sizes: 'any', href: '/favicon.svg' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#256ef4' }],
    ['meta', { name: 'author', content: 'Initializer Team' }],
    [
      'meta',
      { name: 'keywords', content: 'KRDS, KRDS Vue, Vue 3, Vue 컴포넌트, TypeScript, 디자인 시스템, 정부 디자인 시스템, 공공 웹서비스' }
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'KRDS Vue' }],
    ['meta', { property: 'og:locale', content: 'ko_KR' }],
    ['meta', { property: 'og:image', content: `${siteUrl}/og-image.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${siteUrl}/og-image.png` }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'KRDS Vue',
        description: siteDescription,
        url: siteUrl,
        codeRepository: 'https://github.com/Initializer-org/krds-vue',
        programmingLanguage: ['TypeScript', 'Vue'],
        runtimePlatform: 'Vue 3',
        license: 'https://opensource.org/licenses/MIT'
      })
    ],
    // VitePress 다크 모드를 KRDS 고대비 모드로 연결
    [
      'script',
      {},
      `(() => {
        const html = document.documentElement
        const sync = () => (html.dataset.krdsMode = html.classList.contains('dark') ? 'high-contrast' : 'light')
        new MutationObserver(sync).observe(html, { attributes: true, attributeFilter: ['class'] })
        sync()
      })()`
    ]
  ],
  // 페이지별 설명: frontmatter description이 없으면 제목 다음 첫 문단(컴포넌트 설명)을 쓴다
  transformPageData(pageData, { siteConfig }) {
    if (pageData.frontmatter.description || pageData.relativePath.startsWith('frame/')) return
    const description = pageDescription(resolve(siteConfig.srcDir, pageData.relativePath))
    if (description) pageData.description = description
  },
  transformHead({ pageData, title, description }) {
    if (pageData.relativePath.startsWith('frame/')) return [['meta', { name: 'robots', content: 'noindex' }]]
    const url = pageUrl(pageData.relativePath)
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }]
    ]
  },
  themeConfig: {
    logo: { src: '/favicon.svg', alt: '' },
    nav: [
      { text: '시작하기', link: '/guide/getting-started' },
      { text: '컴포넌트', link: '/components/' },
      { text: '플레이그라운드', link: '/playground' },
      { text: `v${version}`, link: 'https://github.com/Initializer-org/krds-vue/blob/main/CHANGELOG.md' }
    ],
    sidebar: [
      {
        text: '가이드',
        items: [
          { text: '시작하기', link: '/guide/getting-started' },
          { text: '컴포넌트 목록', link: '/components/' }
        ]
      },
      ...componentGroups.map(group => ({
        text: group.text,
        collapsed: false,
        items: group.pages.map(([name, slug]) => ({ text: name, link: `/components/${slug}` }))
      }))
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Initializer-org/krds-vue' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@krds.ui/vue' }
    ],
    editLink: {
      pattern: 'https://github.com/Initializer-org/krds-vue/edit/main/docs/:path',
      text: '이 페이지 수정하기'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '검색', buttonAriaLabel: '검색' },
          modal: {
            displayDetails: '상세 목록 표시',
            resetButtonTitle: '검색어 지우기',
            backButtonTitle: '검색 닫기',
            noResultsText: '검색 결과가 없습니다',
            footer: { selectText: '선택', navigateText: '이동', closeText: '닫기' }
          }
        }
      }
    },
    outline: { label: '이 페이지에서' },
    docFooter: { prev: '이전', next: '다음' },
    lastUpdated: { text: '마지막 수정', formatOptions: { dateStyle: 'medium', forceLocale: true } },
    darkModeSwitchLabel: '선명하게 (어두운 배경)',
    lightModeSwitchTitle: '기본 (밝은 배경)으로 전환',
    darkModeSwitchTitle: '선명하게 (어두운 배경)으로 전환',
    sidebarMenuLabel: '메뉴',
    returnToTopLabel: '맨 위로',
    // 왼쪽 저작권, 오른쪽 링크 한 줄(style.css). 화면 순서와 DOM 순서를 맞추려고 message에 저작권, copyright에 링크를 둔다
    footer: {
      message:
        'Copyright © 2025 Initializer Team. <a href="https://github.com/Initializer-org/krds-vue/blob/main/LICENSE">MIT License</a>로 배포됩니다.',
      copyright: [
        ['GitHub', 'https://github.com/Initializer-org/krds-vue'],
        ['npm', 'https://www.npmjs.com/package/@krds.ui/vue'],
        ['변경 기록', 'https://github.com/Initializer-org/krds-vue/blob/main/CHANGELOG.md'],
        ['KRDS 공식 사이트', 'https://www.krds.go.kr']
      ]
        .map(([text, href]) => `<a href="${href}">${text}</a>`)
        .join('')
    }
  },
  vite: {
    resolve: {
      alias: [
        // 예제 코드를 그대로 복사해 쓸 수 있도록 패키지 이름으로 import하고, 빌드는 소스를 사용
        { find: /^@krds\.ui\/vue$/, replacement: resolve(root, 'src/index.ts') },
        // KRDS CSS의 이미지·폰트(저장소 public/img, public/fonts)를 Vite 자산으로 번들 (저장소 public/은 라이브러리 dist로 복사되므로 문서 전용 파일은 docs/public에 둔다)
        { find: '@krds-assets', replacement: resolve(root, 'public') },
        { find: '@', replacement: resolve(root, 'src') }
      ]
    },
    define: {
      __KRDS_VERSION__: JSON.stringify(version)
    },
    css: {
      postcss: {
        plugins: [
          // 예제 영역(.vp-raw)에 VitePress 본문·기본 스타일(vp-doc.css, base.css)이 새지 않도록 격리
          postcssIsolateStyles(),
          {
            // KRDS는 html font-size를 62.5%(1rem = 10px)로 두므로, 16px 기준인 VitePress 테마의 rem을 px로 고정한다
            postcssPlugin: 'vitepress-rem-to-px',
            Declaration(decl) {
              if (decl.source?.input.file?.includes('/node_modules/vitepress/') && decl.value.includes('rem')) {
                decl.value = decl.value.replace(/(\d*\.?\d+)rem\b/g, (_, value: string) => `${Number(value) * 16}px`)
              }
            }
          }
        ]
      },
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import'],
          // KRDS CSS의 자산 경로는 배포 CSS 기준 상대 경로($url: '.')이므로 문서 사이트에서는 별칭으로 바꾼다
          additionalData: `@use '${resolve(root, 'src/styles/common/path')}' with ($url: '@krds-assets');`
        }
      }
    }
  }
})
