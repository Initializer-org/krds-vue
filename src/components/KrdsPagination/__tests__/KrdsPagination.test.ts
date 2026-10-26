import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

describe('KrdsPagination', () => {
  it('기본: 이전/다음·페이지 번호로 이동', async () => {
    const { container } = render({
      setup() {
        const args = { modelValue: 4, min: undefined, max: 99, pageRange: 8 }
        const currentPage = ref(args.modelValue)
        return { args, currentPage }
      },
      template: `
        <div style="width: 100%; max-width: 800px; padding: 20px;">
          <KrdsPagination
            v-model="currentPage"
            :min="args.min"
            :max="args.max"
            :page-range="args.pageRange"
          />
        </div>
      `
    })

    // <a href="#"> 이동 방지
    container.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).closest('a')) e.preventDefault()
    })

    // 다음 페이지 (4 → 5)
    await userEvent.click(container.querySelector('.page-navi.next') as HTMLElement)
    await waitFor(() => {
      const active = container.querySelector('[aria-current="page"]')
      expect(active?.textContent).toContain('5')
    })

    // 이전 페이지 (5 → 4)
    await userEvent.click(container.querySelector('.page-navi.prev') as HTMLElement)
    await waitFor(() => {
      const active = container.querySelector('[aria-current="page"]')
      expect(active?.textContent).toContain('4')
    })

    // 특정 페이지 링크 클릭
    const pageLink = container.querySelector('.page-link:not(.active):not(.link-dot)') as HTMLElement
    if (pageLink) await userEvent.click(pageLink)
    await expectNoA11yViolations()
  })

  it('첫·끝 페이지의 이전·다음은 초점을 받지 않는 비활성 링크', async () => {
    render({
      setup: () => ({ first: ref(1), last: ref(5) }),
      template: `
        <KrdsPagination v-model="first" :max="5" aria-label="첫 페이지" />
        <KrdsPagination v-model="last" :max="5" aria-label="끝 페이지" />
      `
    })
    const prev = screen.getByRole('navigation', { name: '첫 페이지' }).querySelector('.page-navi.prev')!
    const next = screen.getByRole('navigation', { name: '끝 페이지' }).querySelector('.page-navi.next')!
    for (const link of [prev, next]) {
      expect(link).toHaveClass('disabled')
      expect(link).toHaveAttribute('role', 'link')
      expect(link).toHaveAttribute('aria-disabled', 'true')
      expect(link).not.toHaveAttribute('href')
    }
    // 비활성 링크는 대비 검사에서 빠진다 (규칙을 빼지 않고 검사)
    await expectNoA11yViolations()
  })

  it('이름 붙은 내비게이션 영역이고, 링크를 눌러도 주소(#)가 바뀌지 않는다', async () => {
    const hash = location.hash
    render({
      setup: () => ({ page: ref(1) }),
      template: `<KrdsPagination v-model="page" :max="5" aria-label="게시물 목록 페이지" /><p>현재 {{ page }}쪽</p>`
    })
    const nav = screen.getByRole('navigation', { name: '게시물 목록 페이지' })
    expect(nav).toHaveClass('krds-pagination')

    await userEvent.click(screen.getByText('다음'))
    await userEvent.click(nav.querySelector('.page-link:not(.active)') as HTMLElement)
    await userEvent.click(nav.querySelector('.page-link.active') as HTMLElement)
    expect(screen.getByText(/현재 \d쪽/)).toHaveTextContent('현재 1쪽')
    expect(location.hash).toBe(hash)
  })
})
