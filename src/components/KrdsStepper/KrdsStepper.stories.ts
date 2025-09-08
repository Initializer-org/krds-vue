import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsStepper from './KrdsStepper'
import KrdsStep from '../KrdsStep/KrdsStep'

const meta: Meta<typeof KrdsStepper> = {
  title: 'Components/Feedback/KrdsStepper',
  component: KrdsStepper,
  parameters: {
    docs: {
      description: {
        component:
          '단계 표시기는 서비스 이용을 위해 사용자가 거쳐야 하는 일련의 단계를 시각화하여 표현한 것으로 진행 상태에 대한 피드백을 사용자에게 전달한다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: '현재 활성 단계의 인덱스 (0부터 시작) - v-model'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsStepper, KrdsStep },
    template: `
      <KrdsStepper :model-value="3">
        <KrdsStep step="1단계" title="단계 레이블" />
        <KrdsStep step="2단계" title="단계 레이블" />
        <KrdsStep step="3단계" title="단계 레이블" />
        <KrdsStep step="4단계" title="단계 레이블" />
        <KrdsStep step="5단계" title="단계 레이블" />
      </KrdsStepper>
    `
  })
}

export const WithPageTitle: Story = {
  name: '페이지 타이틀과 함께',
  render: () => ({
    components: { KrdsStepper, KrdsStep },
    template: `
      <div class="page-title-wrap between">
        <h2 class="h-tit">타이틀</h2>
        <KrdsStepper :model-value="2">
          <KrdsStep step="1단계" title="유의 사항 확인" />
          <KrdsStep step="2단계" title="신청인 정보" />
          <KrdsStep step="3단계" title="이사 전 살던 곳" />
          <KrdsStep step="4단계" title="이사 온 곳" />
        </KrdsStepper>
      </div>
    `
  })
}
