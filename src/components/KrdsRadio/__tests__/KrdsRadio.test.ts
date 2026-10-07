import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsRadio', () => {
  it('기본: 클릭한 라디오가 선택됨', async () => {
    render({
      setup() {
        const selectedValue = ref('option2')
        const selectedValue2 = ref('option4')
        const selectedWithDescription = ref('option1')
        return { selectedValue, selectedValue2, selectedWithDescription }
      },
      template: `
        <div>
          <div style="margin-bottom: 2rem;">
            <KrdsCheckArea>
              <KrdsRadio v-model="selectedValue" value="option1" name="basic">기본</KrdsRadio>
              <KrdsRadio v-model="selectedValue" value="option2" name="basic">선택됨</KrdsRadio>
              <KrdsRadio v-model="selectedValue" value="option3" name="basic" disabled>비활성화</KrdsRadio>
              <KrdsRadio v-model="selectedValue2" value="option4" name="basic2" disabled>선택된 비활성화</KrdsRadio>
            </KrdsCheckArea>
          </div>

          <div style="margin-bottom: 2rem;">
            <KrdsCheckArea column>
              <KrdsRadio v-model="selectedWithDescription" value="option1" name="withDesc">
                라디오버튼
                <template #description>
                  부가적인 설명이 들어갑니다.
                </template>
              </KrdsRadio>
              <KrdsRadio v-model="selectedWithDescription" value="option2" name="withDesc">
                라디오버튼
                <template #description>
                  부가적인 설명이 들어갑니다.
                </template>
              </KrdsRadio>
            </KrdsCheckArea>
          </div>
        </div>
      `
    })
    // 처음에는 option2가 선택된 상태에서 "기본"(option1)을 클릭
    const radio = screen.getByLabelText('기본')
    await userEvent.click(radio)
    expect(radio).toBeChecked()
    await expectNoA11yViolations()
  })
})
