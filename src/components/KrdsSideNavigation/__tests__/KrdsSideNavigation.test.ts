import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, waitFor, within } from '@/test/utils'
import type { SideNavItem } from '../KrdsSideNavigation'

const defaultMenuItems: SideNavItem[] = [
  {
    text: '2Depth-menu',
    expanded: true,
    subItems: [
      {
        text: '3Depth-menu',
        expanded: false,
        popupTitle: '3Depth-title',
        subItems: [
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' }
        ]
      },
      { text: '3Depth-link', href: '#' },
      { text: '3Depth-link', href: '#' }
    ]
  },
  {
    text: '2Depth-menu',
    expanded: false,
    subItems: [
      {
        text: '3Depth-menu',
        expanded: false,
        popupTitle: '3Depth-title',
        subItems: [
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' }
        ]
      },
      { text: '3Depth-link', href: '#' },
      { text: '3Depth-link', href: '#' }
    ]
  },
  {
    text: '2Depth-menu',
    expanded: false,
    subItems: [
      {
        text: '3Depth-menu',
        expanded: false,
        popupTitle: '3Depth-title',
        subItems: [
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' }
        ]
      },
      { text: '3Depth-link', href: '#' },
      { text: '3Depth-link', href: '#' }
    ]
  }
]

describe('KrdsSideNavigation', () => {
  it('기본: 2Depth 토글·3Depth 팝업 열고 닫기와 초점 이동', async () => {
    const { container } = render({
      setup: () => ({ title: '1Depth-title', menuData: ref([...defaultMenuItems]) }),
      template: '<KrdsSideNavigation :title="title" v-model="menuData" />'
    })
    const controlled = (el: HTMLElement) => container.querySelector<HTMLElement>(`#${CSS.escape(el.getAttribute('aria-controls')!)}`)!
    const toggles = screen.getAllByRole('menuitem', { name: '2Depth-menu' })

    // 2Depth 토글: aria-expanded + aria-controls로 하위 메뉴(role=menu) 연결
    expect(screen.getByRole('menubar')).toBeInTheDocument()
    expect(toggles[0]).toHaveAttribute('aria-expanded', 'true')
    expect(toggles[0].closest('li')).toHaveClass('active')
    expect(toggles[1]).toHaveAttribute('aria-expanded', 'false')
    expect(controlled(toggles[0])).toHaveAttribute('role', 'menu')

    // 3Depth 팝업 버튼: aria-haspopup, 닫힌 상태로 시작
    const popupBtn = screen.getByRole('menuitem', { name: '3Depth-menu' })
    const popup = controlled(popupBtn)
    expect(popupBtn).toHaveAttribute('aria-haspopup', 'true')
    expect(popupBtn).toHaveAttribute('aria-expanded', 'false')
    expect(popup).toHaveAttribute('role', 'menu')
    expect(popup).not.toHaveClass('active')

    // 클릭으로 열면 전환이 끝난 뒤 팝업 제목으로 초점 이동
    await userEvent.click(popupBtn)
    expect(popupBtn).toHaveAttribute('aria-expanded', 'true')
    expect(popup).toHaveClass('active')
    const popupTitle = await within(popup).findByRole('button', { name: '3Depth-title' })
    await waitFor(() => expect(popupTitle).toHaveFocus())
    expect(within(popup).getAllByRole('menuitem', { name: '4Depth' })).toHaveLength(3)

    // 제목 버튼(Enter)으로 닫으면 초점이 팝업 버튼으로 복귀
    await userEvent.keyboard('{Enter}')
    expect(popupBtn).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(popupBtn).toHaveFocus())

    // Enter로 다시 열고, Tab으로 팝업을 벗어나면 닫히고 팝업 버튼으로 초점 복귀 (원본 KRDS 동작)
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(popupTitle).toHaveFocus())
    await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}')
    expect(popupBtn).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(popupBtn).toHaveFocus())

    // 팝업이 열린 채로 2Depth를 접으면 하위 팝업도 닫힘
    await userEvent.click(popupBtn)
    expect(popupBtn).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(popupTitle).toHaveFocus())
    await userEvent.click(toggles[0])
    expect(toggles[0]).toHaveAttribute('aria-expanded', 'false')
    expect(toggles[0].closest('li')).not.toHaveClass('active')
    await userEvent.click(toggles[0])
    expect(toggles[0]).toHaveAttribute('aria-expanded', 'true')
    expect(popupBtn).toHaveAttribute('aria-expanded', 'false')

    // 2Depth 토글은 키보드(Space)로도 펼침
    toggles[1].focus()
    await userEvent.keyboard('[Space]')
    expect(toggles[1]).toHaveAttribute('aria-expanded', 'true')
    expect(toggles[1].closest('li')).toHaveClass('active')

    // 전환이 없어도(transition: none) 팝업 제목으로 초점 이동 (열린 팝업 상태로 접근성 검사)
    for (const el of [popup, ...popup.querySelectorAll<HTMLElement>('*')]) el.style.transition = 'none'
    await userEvent.click(popupBtn)
    await waitFor(() => expect(popupTitle).toHaveFocus())

    // 원본 KRDS 마크업(role=menu 팝업 안의 제목 버튼·역할 없는 ul)을 따르므로 열린 팝업 요소만 제외한다
    await expectNoA11yViolations([
      { id: 'aria-required-children', selector: '[role]:not(.lnb-submenu-lv2)' },
      { id: 'aria-required-parent', selector: '[role]:not(.lnb-submenu-lv2 a)' },
      { id: 'list', selector: 'ul:not(.lnb-submenu-lv2 > ul), ol' }
    ])
  })

  it('2Depth 링크: 하위 메뉴 없는 항목은 링크, onClick 호출', async () => {
    render({
      setup() {
        const clicked = ref(0)
        const menuData = ref<SideNavItem[]>([
          { text: '2Depth-link', href: '#lnb-link' },
          {
            text: '2Depth-action',
            onClick: event => {
              event.preventDefault()
              clicked.value++
            }
          },
          defaultMenuItems[1]
        ])
        return { title: '1Depth-title', menuData, clicked }
      },
      template: '<KrdsSideNavigation :title="title" v-model="menuData" /><p>2Depth-action 클릭: {{ clicked }}회</p>'
    })

    // 하위 메뉴가 없는 2Depth는 href를 가진 링크, 토글 속성(aria-controls/expanded) 없음
    const link = screen.getByRole('menuitem', { name: '2Depth-link' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '#lnb-link')
    expect(link).not.toHaveAttribute('aria-controls')
    expect(link).not.toHaveAttribute('aria-expanded')

    // onClick 호출
    await userEvent.click(screen.getByRole('menuitem', { name: '2Depth-action' }))
    expect(screen.getByText('2Depth-action 클릭: 1회')).toBeInTheDocument()

    // 하위 메뉴가 있는 2Depth는 그대로 토글
    const toggle = screen.getByRole('menuitem', { name: '2Depth-menu' })
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expectNoA11yViolations()
  })

  it('여러 개 배치: id가 겹치지 않고 aria-controls는 자기 내비게이션 안을 가리킴', async () => {
    const { container } = render({
      setup: () => ({ title: '1Depth-title', first: ref([...defaultMenuItems]), second: ref([...defaultMenuItems]) }),
      template: `
        <div style="display: flex; gap: 2rem;">
          <KrdsSideNavigation :title="title" v-model="first" aria-label="첫 번째 사이드 메뉴" style="flex: 1;" />
          <KrdsSideNavigation :title="title" v-model="second" aria-label="두 번째 사이드 메뉴" style="flex: 1;" />
        </div>
      `
    })

    const ids = [...container.querySelectorAll('[id]')].map(el => el.id)
    expect(ids.length).toBeGreaterThan(0)
    expect(new Set(ids).size).toBe(ids.length)
    for (const nav of container.querySelectorAll('nav')) {
      for (const control of nav.querySelectorAll('[aria-controls]')) {
        expect(nav.querySelector(`#${CSS.escape(control.getAttribute('aria-controls')!)}`)).not.toBeNull()
      }
    }
    await expectNoA11yViolations()
  })
})
