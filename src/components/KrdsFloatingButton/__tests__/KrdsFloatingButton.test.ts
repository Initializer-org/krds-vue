import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
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

  it('단일형: hide-label이면 레이블을 화면에서 숨기고 이름은 유지', () => {
    render({ template: `<KrdsFloatingButton label="맨 위로" icon="ico-go-top" hide-label />` })
    expect(screen.getByRole('button', { name: '맨 위로' }).querySelector('.sr-only')).toHaveTextContent('맨 위로')
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
    expect(onSelect).toHaveBeenCalledWith(items[0], 0, expect.any(MouseEvent))
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

  it('확장형: 링크 항목을 눌러도 초점을 확장 버튼으로, 초점이 바깥에 있어도 Esc로 닫힘', async () => {
    render({ template: `<KrdsFloatingButton label="상담 메뉴" :items="items" />`, setup: () => ({ items }) })
    const toggle = screen.getByRole('button', { name: '상담 메뉴' })

    await userEvent.click(toggle)
    const link = screen.getByRole('link', { name: '전화 상담' })
    link.addEventListener('click', event => event.preventDefault())
    await userEvent.click(link)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await vi.waitFor(() => expect(toggle).toHaveFocus())

    // Safari처럼 클릭해도 초점이 버튼에 가지 않은 상황
    await userEvent.click(toggle)
    toggle.blur()
    await userEvent.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('확장형: 항목에서 연 모달을 닫으면 초점이 확장 버튼으로 돌아옴', async () => {
    const open = ref(false)
    render({
      template: `
        <div>
          <KrdsFloatingButton label="상담 메뉴" :items="[{ label: '문의하기', icon: 'ico-faq' }]" @select="open = true" />
          <KrdsModal v-model="open" title="문의하기"><p>내용</p></KrdsModal>
        </div>
      `,
      setup: () => ({ open })
    })
    const toggle = screen.getByRole('button', { name: '상담 메뉴' })
    await userEvent.click(toggle)
    await userEvent.click(screen.getByRole('button', { name: '문의하기' }))
    await vi.waitFor(() => expect(open.value).toBe(true))
    open.value = false
    await vi.waitFor(() => expect(toggle).toHaveFocus())
  })

  it('external이면 새 창 링크와 안내', () => {
    render({ template: `<KrdsFloatingButton label="채팅 상담" href="https://example.go.kr" external />` })
    const link = screen.getByRole('link', { name: '채팅 상담' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('title', '새 창 열림')
  })

  it('확장형: 같은 페이지 안 링크(#)는 초점을 확장 버튼으로 가져오지 않음', async () => {
    render({
      template: `<KrdsFloatingButton label="상담 메뉴" :items="[{ label: '본문으로', icon: 'ico-go-top', href: '#pg-target' }]" />`
    })
    const toggle = screen.getByRole('button', { name: '상담 메뉴' })
    await userEvent.click(toggle)
    await userEvent.click(screen.getByRole('link', { name: '본문으로' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).not.toHaveFocus()
  })

  it('단일형: class·style은 바깥 틀, 나머지 속성은 버튼에', () => {
    const { container } = render({
      template: `<KrdsFloatingButton label="채팅 상담" class="my-fab" style="bottom: 10rem" aria-describedby="fab-desc" data-testid="fab" />`
    })
    const root = container.querySelector('.krds-floating-button') as HTMLElement
    const button = screen.getByRole('button', { name: '채팅 상담' })
    expect(root).toHaveClass('my-fab')
    expect(root.style.bottom).toBe('10rem')
    expect(root).not.toHaveAttribute('data-testid')
    expect(button).toHaveAttribute('aria-describedby', 'fab-desc')
    expect(button).toHaveAttribute('data-testid', 'fab')
  })
})
