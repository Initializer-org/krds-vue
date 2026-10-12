import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsCheckbox', () => {
  it('기본: 클릭으로 선택 토글, CheckArea 가로·세로 배치', async () => {
    const { container } = render({
      setup() {
        const basic = ref(false)
        const selected = ref(true)
        const disabled = ref(false)
        const disabledSelected = ref(true)
        return { basic, selected, disabled, disabledSelected }
      },
      template: `
        <div>
          <div style="margin-bottom: 2rem;">
            <KrdsCheckArea>
              <KrdsCheckbox v-model="basic">기본</KrdsCheckbox>
              <KrdsCheckbox v-model="selected">선택됨</KrdsCheckbox>
              <KrdsCheckbox v-model="disabled" disabled>비활성화</KrdsCheckbox>
              <KrdsCheckbox v-model="disabledSelected" disabled>선택된 비활성화</KrdsCheckbox>
            </KrdsCheckArea>
          </div>

          <div style="margin-bottom: 2rem;">
            <KrdsCheckArea column>
              <KrdsCheckbox>
                체크박스
                <template #description>
                  부가적인 설명이 들어갑니다.
                </template>
              </KrdsCheckbox>

              <KrdsCheckbox>
                체크박스
                <template #description>
                  부가적인 설명이 들어갑니다.
                </template>
              </KrdsCheckbox>
            </KrdsCheckArea>
          </div>
        </div>
      `
    })
    const checkbox = screen.getByLabelText('기본')

    expect(checkbox).not.toBeChecked()

    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()

    // KrdsCheckArea 배치: 기본은 가로, column 속성은 세로(chk-column)
    const areas = container.querySelectorAll('.krds-check-area')
    expect(areas[0]).not.toHaveClass('chk-column')
    expect(areas[1]).toHaveClass('chk-column')
    await expectNoA11yViolations()
  })

  it('사이즈', async () => {
    render({
      setup() {
        const mediumChecked = ref(false)
        const largeChecked = ref(false)
        return { mediumChecked, largeChecked }
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <KrdsCheckArea>
            <KrdsCheckbox v-model="mediumChecked" size="medium">Medium 크기 체크박스</KrdsCheckbox>
          </KrdsCheckArea>

          <KrdsCheckArea>
            <KrdsCheckbox v-model="largeChecked" size="large">Large 크기 체크박스</KrdsCheckbox>
          </KrdsCheckArea>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('Chip', async () => {
    render({
      setup() {
        const checked1 = ref(false)
        const checked2 = ref(true)
        const checked3 = ref(false)
        return { checked1, checked2, checked3 }
      },
      template: `
        <KrdsCheckArea>
          <KrdsCheckbox v-model="checked1" chip>Chip 체크박스 1</KrdsCheckbox>
          <KrdsCheckbox v-model="checked2" chip>Chip 체크박스 2 (선택됨)</KrdsCheckbox>
          <KrdsCheckbox v-model="checked3" chip disabled>Chip 체크박스 3</KrdsCheckbox>
        </KrdsCheckArea>
      `
    })
    await expectNoA11yViolations()
  })

  it('글자를 숨긴 레이블은 포커스 링을 상자 둘레에 그린다 (레이블 안쪽 링이 상자에 가려지지 않게)', async () => {
    render({
      template: `
        <div>
          <KrdsCheckbox id="chk-hidden"><span class="sr-only">첫 글 선택</span></KrdsCheckbox>
          <KrdsCheckbox id="chk-visible">전체선택</KrdsCheckbox>
        </div>
      `
    })
    const hidden = screen.getByRole('checkbox', { name: '첫 글 선택' })
    hidden.focus()
    const hiddenLabel = hidden.nextElementSibling as HTMLElement
    expect(getComputedStyle(hiddenLabel).boxShadow).toBe('none')
    expect(getComputedStyle(hiddenLabel, '::before').outlineStyle).toBe('solid')

    // 글자가 보이는 레이블은 KRDS 원본대로 레이블 안쪽 링
    const visible = screen.getByRole('checkbox', { name: '전체선택' })
    visible.focus()
    const visibleLabel = visible.nextElementSibling as HTMLElement
    expect(getComputedStyle(visibleLabel).boxShadow).not.toBe('none')
    expect(getComputedStyle(visibleLabel, '::before').outlineStyle).toBe('none')
  })
})
