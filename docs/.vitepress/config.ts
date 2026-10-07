import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, postcssIsolateStyles } from 'vitepress'

const root = resolve(import.meta.dirname, '../..')
const { version } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8')) as { version: string }

const componentGroup = (text: string, pages: [name: string, slug: string][]) => ({
  text,
  collapsed: false,
  items: pages.map(([name, slug]) => ({ text: name, link: `/components/${slug}` }))
})

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
      { text: '컴포넌트', link: '/components/masthead' },
      { text: `v${version}`, link: 'https://github.com/Initializer-org/krds-vue/blob/main/CHANGELOG.md' }
    ],
    sidebar: [
      { text: '가이드', items: [{ text: '시작하기', link: '/guide/getting-started' }] },
      // KRDS 공식 컴포넌트 분류 순서 (README 컴포넌트 범위 표와 같음), 마지막은 공식 목록 외 부가 컴포넌트
      componentGroup('아이덴티티', [
        ['공식 배너 Masthead', 'masthead'],
        ['운영기관 식별자 Identifier', 'identifier'],
        ['헤더 Header', 'header'],
        ['푸터 Footer', 'footer']
      ]),
      componentGroup('탐색', [
        ['건너뛰기 링크 Skip link', 'skip-link'],
        ['메인 메뉴 Main menu', 'main-menu'],
        ['브레드크럼 Breadcrumb', 'breadcrumb'],
        ['사이드 메뉴 Side navigation', 'side-navigation'],
        ['콘텐츠 내 탐색 In-page navigation', 'in-page-navigation'],
        ['페이지네이션 Pagination', 'pagination'],
        ['탭바 Tab bar', 'tab-bar']
      ]),
      componentGroup('레이아웃 및 표현', [
        ['구조화 목록 Structured list', 'structured-list'],
        ['긴급 공지 Critical alerts', 'critical-alerts'],
        ['디스클로저 Disclosure', 'disclosure'],
        ['모달 Modal', 'modal'],
        ['배지 Badge', 'badge'],
        ['아코디언 Accordion', 'accordion'],
        ['캐러셀 Carousel', 'carousel'],
        ['탭 Tab', 'tabs'],
        ['표 Table', 'table'],
        ['텍스트 목록 Text list', 'text-list'],
        ['이미지 Image', 'image'],
        ['스플래시 스크린 Splash screen', 'splash-screen']
      ]),
      componentGroup('액션', [
        ['링크 Link', 'link'],
        ['버튼 Button', 'button']
      ]),
      componentGroup('선택', [
        ['라디오 버튼 Radio button', 'radio'],
        ['체크박스 Checkbox', 'checkbox'],
        ['셀렉트 Select', 'select'],
        ['태그 Tag', 'tag'],
        ['토글 스위치 Toggle switch', 'toggle-switch']
      ]),
      componentGroup('피드백', [
        ['단계 표시기 Step indicator', 'step-indicator'],
        ['스피너 Spinner', 'spinner']
      ]),
      componentGroup('도움', [
        ['패널 Panel', 'panel'],
        ['맥락적 도움말 Contextual help', 'contextual-help'],
        ['코치마크 Coach mark', 'coach-mark'],
        ['툴팁 Tooltip', 'tooltip'],
        ['음성 지원 TTS', 'tts']
      ]),
      componentGroup('입력', [
        ['텍스트 입력 필드 Text input', 'input'],
        ['텍스트 영역 Textarea', 'textarea'],
        ['날짜 입력 필드 Date input', 'date-input'],
        ['파일 업로드 File upload', 'file-upload']
      ]),
      componentGroup('설정', [
        ['언어 변경 Language switcher', 'language-switcher'],
        ['화면 크기 조정 Resize', 'resize']
      ]),
      componentGroup('콘텐츠', [['숨긴 콘텐츠 v-sr-only', 'sr-only']]),
      componentGroup('부가 컴포넌트', [
        ['폼 그룹 Form group', 'form-group'],
        ['아이콘 Icon', 'icon'],
        ['레이아웃 Layout', 'layout']
      ])
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
          // KRDS CSS의 자산 경로는 배포 CSS 기준 상대 경로($url: '.')이므로 문서 사이트에서는 루트 기준으로 바꾼다
          additionalData: `@use '${resolve(root, 'src/styles/common/path')}' with ($url: '');`
        }
      }
    }
  }
})
