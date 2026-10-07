import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { page } from 'vitest/browser'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'
import type { MainMenuItem } from '../../KrdsMainMenu'

const menuItems: MainMenuItem[] = [
  {
    text: '1Depth',
    subItems: [
      {
        text: '2Depth-menu',
        items: [
          { text: '3Depth-menu', href: '#' },
          { text: '3Depth-menu', href: '#' }
        ]
      },
      {
        text: '2Depth-menu',
        items: [
          { text: '3Depth-menu', href: '#' },
          { text: '3Depth-menu', href: '#' }
        ]
      }
    ]
  },
  {
    text: '1Depth',
    subItems: [
      {
        text: '2Depth-menu',
        items: [
          { text: '3Depth-menu', href: '#' },
          { text: '3Depth-menu', href: '#' }
        ]
      }
    ]
  },
  { text: '링크(anchor)', href: '#' }
]

/** 네비게이션 슬롯에 KrdsMainMenu를 둔 기본 헤더 */
const header = {
  setup: () => ({ menuItems, mobileOpen: ref(false) }),
  template: `
    <KrdsHeader>
      <template #utility>
        <ul class="utility-list">
          <li>
            <a href="#" class="krds-btn small text" target="_blank" title="새 창 열기">
              메뉴명 <i class="svg-icon ico-go"></i>
            </a>
          </li>
          <li>
            <div class="krds-drop-wrap">
              <button type="button" class="krds-btn small text drop-btn">
                메뉴명 <i class="svg-icon ico-toggle"></i>
              </button>
              <div class="drop-menu">
                <div class="drop-in">
                  <ul class="drop-list">
                    <li><a href="#" class="item-link">메뉴명</a></li>
                    <li><a href="#" class="item-link">메뉴명</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </template>

      <template #branding>
        <h2 class="logo">
          <a href="#">
            <span class="sr-only">KRDS - Korea Design System</span>
          </a>
        </h2>
        <div class="header-actions">
          <button type="button" class="btn-navi sch" title="통합검색 레이어">통합검색</button>
          <a href="#" class="btn-navi login">로그인</a>
          <button type="button" class="btn-navi join">회원가입</button>
          <button type="button" class="btn-navi all" aria-controls="mobile-nav" :aria-expanded="String(mobileOpen)" @click="mobileOpen = true">전체메뉴</button>
        </div>
      </template>

      <template #navigation>
        <KrdsMainMenu :items="menuItems" />
      </template>

      <template #mobileNavigation>
        <KrdsMainMenu variant="mobile" :items="menuItems" v-model:open="mobileOpen" />
      </template>
    </KrdsHeader>
`
}

describe('KrdsHeader', () => {
  it('기본: 슬롯이 KRDS 구조에 맞게 배치', async () => {
    render(header)
    // banner 랜드마크 + 기본 id
    const banner = screen.getByRole('banner')
    expect(banner).toHaveAttribute('id', 'krds-header')

    // utility·branding은 header-container > inner, 네비게이션은 header-in 직속
    const headerIn = banner.querySelector(':scope > .header-in')!
    const inner = headerIn.querySelector(':scope > .header-container > .inner')!
    expect(Array.from(inner.children, el => el.className)).toEqual(['header-utility', 'header-branding'])
    expect(headerIn.querySelector(':scope > .krds-main-menu')).toBeInTheDocument()

    // 모바일 드로어는 header-in 밖, header 직속
    expect(banner.querySelector(':scope > .krds-main-menu-mobile')).toBeInTheDocument()
    await expectNoA11yViolations()
  })

  it('모바일: 전체메뉴 버튼으로 드로어 열고 ESC로 닫기', async () => {
    await page.viewport(414, 896)
    const { container } = render(header)
    const allMenu = screen.getByRole('button', { name: '전체메뉴' })
    const drawer = container.querySelector<HTMLElement>(`#${allMenu.getAttribute('aria-controls')}`)!
    expect(drawer).toHaveClass('krds-main-menu-mobile')
    expect(drawer).not.toHaveClass('is-open')
    expect(allMenu).toHaveAttribute('aria-expanded', 'false')

    // 전체메뉴 클릭 → aria-controls 대상 드로어 열림
    await userEvent.click(allMenu)
    await waitFor(() => expect(drawer).toHaveClass('is-open'))
    expect(allMenu).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(drawer).toBeVisible())
    await waitFor(() => expect(drawer.querySelector('.gnb-wrap')).toHaveFocus())

    // ESC로 닫으면 전체메뉴 버튼으로 포커스 복귀
    await userEvent.keyboard('{Escape}')
    expect(allMenu).toHaveFocus()
    await waitFor(() => expect(drawer).not.toBeVisible())
    expect(drawer).not.toHaveClass('is-open')
    expect(allMenu).toHaveAttribute('aria-expanded', 'false')
    await expectNoA11yViolations()
  })
})
