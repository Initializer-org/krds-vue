import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

const root = resolve(import.meta.dirname, '../..')
const { version } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8')) as { version: string }

export default defineConfig({
  lang: 'ko-KR',
  title: 'KRDS Vue',
  description: 'KRDS(대한민국 정부 디자인 시스템) Vue 3 컴포넌트 라이브러리',
  cleanUrls: true,
  head: [
    // VitePress 다크 모드를 KRDS 고대비 모드로 연결 (Storybook의 Dark 토글과 동일)
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
  themeConfig: {
    nav: [
      { text: '시작하기', link: '/guide/getting-started' },
      { text: '컴포넌트', link: '/components/button' },
      { text: `v${version}`, link: 'https://github.com/Initializer-org/krds-vue/blob/main/CHANGELOG.md' }
    ],
    sidebar: [
      { text: '가이드', items: [{ text: '시작하기', link: '/guide/getting-started' }] },
      // KRDS 공식 컴포넌트 분류 순서: 아이덴티티, 탐색, 레이아웃 및 표현, 액션, 선택, 피드백, 도움, 입력, 설정, 콘텐츠
      { text: '레이아웃 및 표현', items: [{ text: '모달 Modal', link: '/components/modal' }] },
      { text: '액션', items: [{ text: '버튼 Button', link: '/components/button' }] },
      { text: '선택', items: [{ text: '셀렉트 Select', link: '/components/select' }] }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Initializer-org/krds-vue' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@krds.ui/vue' }
    ],
    editLink: {
      pattern: 'https://github.com/Initializer-org/krds-vue/edit/main/docs/:path',
      text: '이 페이지 수정하기'
    },
    search: { provider: 'local' },
    outline: { label: '이 페이지에서' },
    docFooter: { prev: '이전', next: '다음' },
    darkModeSwitchLabel: '고대비 모드',
    lightModeSwitchTitle: '기본 모드로 전환',
    darkModeSwitchTitle: '고대비 모드로 전환',
    sidebarMenuLabel: '메뉴',
    returnToTopLabel: '맨 위로',
    footer: { message: 'MIT License', copyright: 'Initializer Team' }
  },
  vite: {
    // KRDS 이미지·폰트(public/img, public/fonts)를 사이트 루트에서 제공
    publicDir: resolve(root, 'public'),
    resolve: {
      alias: [
        // 예제 코드를 그대로 복사해 쓸 수 있도록 패키지 이름으로 import하고, 빌드는 소스를 사용
        { find: /^@krds\.ui\/vue$/, replacement: resolve(root, 'src/index.ts') },
        { find: '@', replacement: resolve(root, 'src') }
      ]
    },
    define: {
      __KRDS_VERSION__: JSON.stringify(version)
    },
    css: {
      postcss: {
        plugins: [
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
          // KRDS CSS의 자산 경로는 배포 CSS 기준 상대 경로($url: '.')이므로 문서 사이트에서는 루트 기준으로 바꾼다
          additionalData: `@use '${resolve(root, 'src/styles/common/path')}' with ($url: '');`
        }
      }
    }
  }
})
