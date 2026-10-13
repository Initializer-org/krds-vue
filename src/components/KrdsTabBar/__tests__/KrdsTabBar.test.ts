import { beforeEach, describe, expect, it, vi } from 'vitest'
import { page } from 'vitest/browser'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

const items = [
  { text: '홈', icon: 'ico-bread-home', href: '#home', selected: true },
  { text: '내정보', icon: 'ico-my', href: '#my' },
  { text: '즐겨찾기', icon: 'ico-scrap', href: '#bookmark' }
]

describe('KrdsTabBar', () => {
  // 탭바는 좁은 화면 전용 (1024px 이상에서는 숨김)
  beforeEach(() => page.viewport(375, 700))

  it('기본: 내비게이션 목록, 선택된 메뉴는 aria-current, href 없는 항목은 버튼', async () => {
    const openMenu = vi.fn()
    render({
      setup: () => ({ items: [...items, { text: '전체', icon: 'ico-all', onClick: openMenu }] }),
      template: `<KrdsTabBar :items="items" />`
    })
    const nav = screen.getByRole('navigation', { name: '하단 메뉴' })
    expect(nav).toBeVisible()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: '내정보' })).not.toHaveAttribute('aria-current')

    await userEvent.click(screen.getByRole('button', { name: '전체' }))
    expect(openMenu).toHaveBeenCalledOnce()
    await expectNoA11yViolations()
  })

  it('페이지 아래에 탭바 높이만큼 여백, 넓은 화면에서는 숨김', async () => {
    render({ setup: () => ({ items }), template: `<KrdsTabBar :items="items" label="주요 메뉴" />` })
    const nav = screen.getByRole('navigation', { name: '주요 메뉴' })
    expect(parseFloat(getComputedStyle(document.body).paddingBottom)).toBeCloseTo(nav.offsetHeight, 0)

    await page.viewport(1200, 900)
    expect(nav).not.toBeVisible()
    expect(getComputedStyle(document.body).paddingBottom).toBe('0px')
  })
})
