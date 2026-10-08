import { describe, expect, it, onTestFinished } from 'vitest'
import { nextTick, ref } from 'vue'
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

  it('v-model: 처음 값으로 화면 크기를 적용하고, 고르면 값을 갱신하며, 바깥에서 바꿔도 따라감', async () => {
    onTestFinished(() => {
      document.body.style.zoom = ''
    })
    const size = ref<'sm' | 'md' | 'lg' | 'xlg' | 'xxlg'>('lg')
    const { container } = render({ template: `<KrdsResize v-model="size" />`, setup: () => ({ size }) })
    await nextTick()
    expect(document.body.style.zoom).toBe('1.1')
    expect(container.querySelector('[data-adjust-scale="lg"].item-link')).toHaveClass('active')

    await userEvent.click(container.querySelector('.drop-btn') as HTMLElement)
    await userEvent.click(container.querySelector('[data-adjust-scale="xxlg"]') as HTMLElement)
    expect(size.value).toBe('xxlg')
    expect(document.body.style.zoom).toBe('1.5')

    size.value = 'sm'
    await nextTick()
    expect(document.body.style.zoom).toBe('0.9')
    expect(container.querySelector('[data-adjust-scale="sm"].item-link')).toHaveClass('active')
  })
})
