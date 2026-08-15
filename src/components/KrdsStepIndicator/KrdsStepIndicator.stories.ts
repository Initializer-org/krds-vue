import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsStepIndicator from './KrdsStepIndicator'
import KrdsStep from '../KrdsStep/KrdsStep'

const meta: Meta<typeof KrdsStepIndicator> = {
  title: 'Components/Feedback/KrdsStepIndicator',
  component: KrdsStepIndicator,
  subcomponents: { KrdsStep },
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
    components: { KrdsStepIndicator, KrdsStep },
    template: `
      <KrdsStepIndicator :model-value="3">
        <KrdsStep step="1단계" title="단계 레이블" />
        <KrdsStep step="2단계" title="단계 레이블" />
        <KrdsStep step="3단계" title="단계 레이블" />
        <KrdsStep step="4단계" title="단계 레이블" />
        <KrdsStep step="5단계" title="단계 레이블" />
      </KrdsStepIndicator>
    `
  })
}

// KrdsStep의 status 속성으로 상태를 직접 지정
export const ForcedStatus: Story = {
  name: '상태 지정',
  render: () => ({
    components: { KrdsStepIndicator, KrdsStep },
    template: `
      <KrdsStepIndicator>
        <KrdsStep step="1단계" title="약관 동의" status="done" />
        <KrdsStep step="2단계" title="정보 입력" status="active" />
        <KrdsStep step="3단계" title="신청 완료" status="pending" />
      </KrdsStepIndicator>
    `
  }),
  play: async ({ canvasElement }) => {
    const [done, active, pending] = Array.from(canvasElement.querySelectorAll('.krds-step-wrap > li'))

    await expect(done).toHaveClass('done')
    await expect(active).toHaveClass('active')
    await expect(pending).toHaveClass('pending')

    // 활성 단계에는 스크린 리더용 현재단계 텍스트가 붙는다
    await expect(active.querySelector('.sr-only')).toHaveTextContent('현재단계')
    await expect(done.querySelector('.sr-only')).toBeNull()
  }
}

export const WithPageTitle: Story = {
  name: '페이지 타이틀과 함께',
  render: () => ({
    components: { KrdsStepIndicator, KrdsStep },
    template: `
      <div class="page-title-wrap between">
        <h2 class="h-tit">타이틀</h2>
        <KrdsStepIndicator :model-value="2">
          <KrdsStep step="1단계" title="유의 사항 확인" />
          <KrdsStep step="2단계" title="신청인 정보" />
          <KrdsStep step="3단계" title="이사 전 살던 곳" />
          <KrdsStep step="4단계" title="이사 온 곳" />
        </KrdsStepIndicator>
      </div>
    `
  })
}
