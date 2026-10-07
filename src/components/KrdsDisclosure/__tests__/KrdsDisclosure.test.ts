import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsDisclosure', () => {
  it('기본: 펼치고 접기', async () => {
    render({
      // Storybook args처럼 reactive로 두어야 v-model이 반영된다
      setup: () => ({ args: reactive({ title: '신청 서비스안내', modelValue: false }) }),
      template: `
        <KrdsDisclosure v-model="args.modelValue" :title="args.title">
          <ul class="krds-info-list dash">
            <li>하나의 아이디로 안전하고 편리하게 여러 전자정부 서비스를 이용할 수 있는 서비스입니다.</li>
            <li>디지털원패스 이용문의 : 1533-3713 (평일9~18시, 공휴일제외)</li>
          </ul>
        </KrdsDisclosure>
      `
    })
    const toggleBtn = screen.getByRole('button', { name: '신청 서비스안내' })

    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggleBtn)
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(toggleBtn)
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false')
    await expectNoA11yViolations()
  })
})
