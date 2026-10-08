import type { MainMenuItem, SideNavItem } from '@krds.ui/vue'
import { componentGroups } from '../../component-groups.ts'

/**
 * 플레이그라운드 메뉴: KRDS 공식 누리집처럼 하위 묶음이 하나인 메뉴는 single-list(제목 + 링크),
 * 컴포넌트는 2depth에 KRDS 분류를 나열한다. 메인 메뉴·사이드 메뉴 모두 실제 문서로 연결된다
 */

const pageLinks = (pages: [name: string, slug: string][]) => pages.map(([name, slug]) => ({ text: name, href: `/components/${slug}` }))

export const mainMenuItems: MainMenuItem[] = [
  {
    text: '시작하기',
    items: [
      { text: '설치와 사용법', href: '/guide/getting-started' },
      { text: '컴포넌트 목록', href: '/components/' },
      { text: '플레이그라운드', href: '/playground' }
    ]
  },
  {
    text: '컴포넌트',
    subItems: componentGroups.map(group => ({ text: group.text, items: pageLinks(group.pages) }))
  },
  {
    text: '리소스',
    items: [
      { text: 'GitHub 저장소', href: 'https://github.com/Initializer-org/krds-vue', external: true },
      { text: 'npm 패키지', href: 'https://www.npmjs.com/package/@krds.ui/vue', external: true },
      { text: '변경 기록', href: 'https://github.com/Initializer-org/krds-vue/blob/main/CHANGELOG.md', external: true },
      { text: 'KRDS 공식 누리집', href: 'https://www.krds.go.kr/html/site/index.html', external: true }
    ]
  }
]

export const sideNavItems = (): SideNavItem[] =>
  componentGroups.map((group, index) => ({
    text: group.text,
    expanded: index === 0,
    subItems: pageLinks(group.pages)
  }))
