import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, userEvent, waitFor } from '@/test/utils'

// 비활성 이전/다음은 원본 KRDS 마크업(span.disabled)으로, 비활성 컴포넌트는 WCAG 1.4.3 대비 요건 예외다
const a11yRules = [{ id: 'color-contrast', selector: '*:not(.page-navi.disabled)' }]

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
    await expectNoA11yViolations(a11yRules)
  })
})
