import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsStep from './KrdsStep'

const meta: Meta<typeof KrdsStep> = {
  title: 'Components/Feedback/KrdsStep',
  component: KrdsStep,
  parameters: {
    docs: {
      description: {
        component:
          '단계 표시기의 개별 단계 컴포넌트이다. KrdsStepIndicator 내부에서 사용하면 활성 단계에 따라 상태가 자동 계산되며, status 속성으로 완료(done)·진행(active)·대기(pending) 상태를 직접 지정할 수도 있다.'
      }
    }
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['done', 'active', 'pending']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 상태별
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsStep },
    template: `
      <ol class="krds-step-wrap">
        <KrdsStep step="1" title="약관 동의" status="done" />
        <KrdsStep step="2" title="정보 입력" status="active" />
        <KrdsStep step="3" title="신청 완료" status="pending" />
      </ol>`
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
