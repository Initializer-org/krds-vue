import { describe, expect, it, vi } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

const items = [
  { label: '자주 묻는 질문', icon: 'ico-faq' },
  { label: '전화 상담', icon: 'ico-call', href: 'tel:1555-6365' }
]

describe('KrdsFloatingButton', () => {
  it('단일형: 아이콘과 레이블을 가진 버튼, 클릭 이벤트', async () => {
    const onClick = vi.fn()
    render({ template: `<KrdsFloatingButton label="채팅 상담" icon="ico-faq" @click="onClick" />`, setup: () => ({ onClick }) })

    await userEvent.click(screen.getByRole('button', { name: '채팅 상담' }))
    expect(onClick).toHaveBeenCalledOnce()
    await expectNoA11yViolations()
  })

  it('단일형: href가 있으면 링크', () => {
    render({ template: `<KrdsFloatingButton label="상담 신청" href="/apply" />` })
    expect(screen.getByRole('link', { name: '상담 신청' })).toHaveAttribute('href', '/apply')
  })

  it('확장형: 펼치기·항목 선택 후 닫고 초점을 확장 버튼으로', async () => {
    const onSelect = vi.fn()
    const { container } = render({
      template: `<KrdsFloatingButton label="상담 메뉴" :items="items" @select="onSelect" />`,
      setup: () => ({ items, onSelect })
    })
    const toggle = screen.getByRole('button', { name: '상담 메뉴' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('list')).toBeNull()

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('list')).toBeVisible()
    expect(screen.getByRole('link', { name: '전화 상담' })).toHaveAttribute('href', 'tel:1555-6365')
    expect(container.querySelector('.floating-dim')).toBeTruthy()
    await expectNoA11yViolations()

    await userEvent.click(screen.getByRole('button', { name: '자주 묻는 질문' }))
    expect(onSelect).toHaveBeenCalledWith(items[0], 0)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await vi.waitFor(() => expect(toggle).toHaveFocus())
  })

  it('확장형: Esc·가림막 클릭·바깥으로 초점 이동 시 닫힘', async () => {
    const { container } = render({
      template: `<div><KrdsFloatingButton label="상담 메뉴" :items="items" /><button>바깥 버튼</button></div>`,
      setup: () => ({ items })
    })
    const toggle = screen.getByRole('button', { name: '상담 메뉴' })

    await userEvent.click(toggle)
    await userEvent.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await vi.waitFor(() => expect(toggle).toHaveFocus())

    await userEvent.click(toggle)
    await userEvent.click(container.querySelector('.floating-dim') as HTMLElement)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)
    screen.getByRole('button', { name: '바깥 버튼' }).focus()
    await vi.waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'false'))
  })
})
