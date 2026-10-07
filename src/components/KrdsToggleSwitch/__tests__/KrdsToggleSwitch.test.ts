import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsToggleSwitch', () => {
  it('기본: 클릭으로 켜짐·꺼짐 전환', async () => {
    render({
      setup() {
        const args = { label: 'switch : default' }
        const checked = ref(false)
        return { args, checked }
      },
      template: `
        <div>
          <KrdsToggleSwitch v-model="checked" v-bind="args" />
          <p style="margin-top: 1rem;">현재 상태: {{ checked ? '켜짐' : '꺼짐' }}</p>
        </div>
      `
    })
    const toggle = screen.getByRole('checkbox')

    expect(toggle).not.toBeChecked()

    await userEvent.click(toggle)
    expect(toggle).toBeChecked()

    await userEvent.click(toggle)
    expect(toggle).not.toBeChecked()
    await expectNoA11yViolations()
  })

  it('크기', async () => {
    render({
      setup() {
        const mediumChecked = ref(false)
        const largeChecked = ref(false)
        return { mediumChecked, largeChecked }
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <KrdsToggleSwitch v-model="mediumChecked" size="medium" label="Medium 크기 스위치 (기본)" />
          <KrdsToggleSwitch v-model="largeChecked" size="large" label="Large 크기 스위치" />
        </div>
      `
    })
    await expectNoA11yViolations()
  })
})
