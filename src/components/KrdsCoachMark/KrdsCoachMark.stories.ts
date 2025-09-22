import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsCoachMark from './KrdsCoachMark.vue'
import { ref } from 'vue'

const meta: Meta<typeof KrdsCoachMark> = {
  title: 'Components/Help/KrdsCoachMark',
  component: KrdsCoachMark,
  parameters: {
    docs: {
      description: {
        component:
          '코치마크는 사용자에게 새로 도입된 기능을 안내하거나, 여러 단계를 거쳐 수행해야 하는 복잡한 과업을 사용자가 보다 쉽게 완료할 수 있도록 세부 수행 단계별로 고맥락적 도움말을 제공하는 컴포넌트이다.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsCoachMark },
    setup() {
      const currentStep = ref(null)
      const stepsData = [
        { id: 1, title: '첫번째 단계', description: '첫번째 단계의 내용임' },
        { id: 2, title: '두번째 단계', description: '두번째 단계의 내용임' },
        { id: 3, title: '세번째 단계', description: '세번째 단계의 내용임' }
      ]

      return {
        currentStep,
        stepsData
      }
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
                <krds-form-label>이전 살던 곳</krds-form-label>
                <div style="display: flex; gap: 8px">
                  <KrdsInput style="width: 100%" />
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
                <krds-form-label>이전 살던 곳</krds-form-label>
                <div style="display: flex; gap: 8px">
                  <KrdsInput style="width: 100%" />
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
}
