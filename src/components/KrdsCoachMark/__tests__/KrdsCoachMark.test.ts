import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

describe('KrdsCoachMark', () => {
  it('기본: 다음·이전 단계 이동과 그만보기로 닫힘', async () => {
    render({
      setup() {
        const currentStep = ref(null)
        const stepsData = [
          { id: 1, title: '첫번째 단계', description: '첫번째 단계의 내용임' },
          { id: 2, title: '두번째 단계', description: '두번째 단계의 내용임' },
          { id: 3, title: '세번째 단계', description: '세번째 단계의 내용임' }
        ]
        return { currentStep, stepsData }
      },
      template: `
        <KrdsButton variant="tertiary" size="xsmall" @click="currentStep = 1">코치마크 보기</KrdsButton>
        <div style="display: flex; flex-direction: column; gap: 40px; padding: 150px 40px 40px;">
          <KrdsCoachMark
            v-model="currentStep"
            :activeStep="1"
            :stepsData="stepsData"
            :coachMarkClass="[currentStep === 1 ? 'txt-box': '']"
            style="width: 500px"
            @close="currentStep = null"
          >
            <template #coach-mark-content>
              <div style="display: flex; flex-direction: column; gap: 20px;">
                <h3>1. 이전 살던 곳 작성</h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <krds-form-label for="coach-prev-address">이전 살던 곳</krds-form-label>
                  <div style="display: flex; gap: 8px">
                    <KrdsInput id="coach-prev-address" style="width: 100%" />
                    <KrdsButton variant="secondary">주소 조회</KrdsButton>
                  </div>
                </div>
              </div>
            </template>
          </KrdsCoachMark>
          <div style="border-top: 1px solid lightgray" />
          <KrdsCoachMark
            v-model="currentStep"
            :activeStep="2"
            :stepsData="stepsData"
            style="width: 500px"
            :coachMarkClass="[currentStep === 2 ? 'txt-box': '']"
            @close="currentStep = null"
          >
            <template #coach-mark-content>
              <div style="display: flex; flex-direction: column; gap: 20px;">
                <h3>2. 현재 사는 곳 작성</h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <krds-form-label for="coach-current-address">현재 사는 곳</krds-form-label>
                  <div style="display: flex; gap: 8px">
                    <KrdsInput id="coach-current-address" style="width: 100%" />
                    <KrdsButton variant="secondary">주소 조회</KrdsButton>
                  </div>
                </div>
              </div>
            </template>
          </KrdsCoachMark>
          <div style="border-top: 1px solid lightgray" />
          <KrdsCoachMark
            v-model="currentStep"
            :activeStep="3"
            :stepsData="stepsData"
            style="display:flex; justify-content: flex-end"
            @close="currentStep = null"
          >
            <template #coach-mark-content>
              <KrdsButton :class="[currentStep === 3 ? 'coach-btn': '']">주소 이전 신청 완료</KrdsButton>
            </template>
          </KrdsCoachMark>
        </div>
      `
    })

    await userEvent.click(screen.getByRole('button', { name: '코치마크 보기' }))
    await waitFor(() => {
      expect(screen.getByText('1단계 : 첫번째 단계')).toBeInTheDocument()
    })

    // 1 → 2
    await userEvent.click(screen.getByRole('button', { name: '다음으로' }))
    await waitFor(() => {
      expect(screen.getByText('2단계 : 두번째 단계')).toBeInTheDocument()
    })

    // 2 → 3 (마지막 단계: "다음으로" 숨김, "이전으로" 표시)
    await userEvent.click(screen.getByRole('button', { name: '다음으로' }))
    await waitFor(() => {
      expect(screen.getByText('3단계 : 세번째 단계')).toBeInTheDocument()
    })
    expect(screen.queryByRole('button', { name: '다음으로' })).not.toBeInTheDocument()

    // 3 → 2
    await userEvent.click(screen.getByRole('button', { name: '이전으로' }))
    await waitFor(() => {
      expect(screen.getByText('2단계 : 두번째 단계')).toBeInTheDocument()
    })

    // 2 → 1
    await userEvent.click(screen.getByRole('button', { name: '이전으로' }))
    await waitFor(() => {
      expect(screen.getByText('1단계 : 첫번째 단계')).toBeInTheDocument()
    })
    expect(screen.queryByRole('button', { name: '이전으로' })).not.toBeInTheDocument()

    // 닫기
    await userEvent.click(screen.getByRole('button', { name: '그만보기' }))
    await waitFor(() => {
      expect(screen.queryByText('1단계 : 첫번째 단계')).not.toBeInTheDocument()
    })
    await expectNoA11yViolations()
  })
})
