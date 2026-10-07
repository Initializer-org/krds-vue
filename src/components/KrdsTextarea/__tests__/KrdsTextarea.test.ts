import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, userEvent } from '@/test/utils'

describe('KrdsTextarea', () => {
  it('기본: 포커스·입력·블러', async () => {
    const { container } = render({
      setup: () => ({ args: { placeholder: '내용을 입력하세요', rows: 4, showCount: true, resize: 'vertical' } }),
      template: `
        <div class="fieldset">
          <KrdsFormGroup>
            <KrdsFormLabel for="textarea1">레이블</KrdsFormLabel>
            <KrdsTextarea id="textarea1" v-bind="args" />
          </KrdsFormGroup>
        </div>
      `
    })
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement
    expect(textarea).toBeTruthy()

    // Focus → Input → Blur to cover event handlers
    await userEvent.click(textarea)
    await userEvent.type(textarea, 'test')
    await userEvent.tab()
    await expectNoA11yViolations()
  })
})
