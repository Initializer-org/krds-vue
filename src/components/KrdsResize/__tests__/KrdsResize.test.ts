import { describe, expect, it, onTestFinished } from 'vitest'
import { expectNoA11yViolations, render, userEvent, waitFor } from '@/test/utils'

describe('KrdsResize', () => {
  it('기본: 크기 선택·초기화 후 Escape로 드롭다운 닫힘', async () => {
    // 크기 선택이 body zoom을 바꾸므로 다음 테스트로 새지 않게 되돌린다
    onTestFinished(() => {
      document.body.style.zoom = ''
    })
    const { container } = render({
      template: `
        <div style="height: 400px; padding: 20px">
          <KrdsResize />
        </div>
      `
    })
    const toggleBtn = container.querySelector('.drop-btn') as HTMLElement
    const expectMenuDisplay = (display: string) =>
      waitFor(() => {
        const menu = container.querySelector('.drop-menu') as HTMLElement
        expect(menu.style.display).toBe(display)
      })

    // 드롭다운 열기
    await userEvent.click(toggleBtn)
    await expectMenuDisplay('block')

    // 크기 선택
    await userEvent.click(container.querySelector('[data-adjust-scale="xlg"]') as HTMLElement)

    // 다시 열어 초기화
    await userEvent.click(toggleBtn)
    await expectMenuDisplay('block')
    await userEvent.click(container.querySelector('[data-adjust-scale="md"].krds-btn') as HTMLElement)

    // 다시 열어 Escape로 닫기
    await userEvent.click(toggleBtn)
    await expectMenuDisplay('block')
    await userEvent.keyboard('{Escape}')
    await expectMenuDisplay('none')
    await expectNoA11yViolations()
  })
})
