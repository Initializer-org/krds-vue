import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsFormLabel from './KrdsFormLabel'
import { KrdsInput } from '../KrdsInput'

const meta: Meta<typeof KrdsFormLabel> = {
  title: 'Components/Input/KrdsFormLabel',
  component: KrdsFormLabel,
  parameters: {
    docs: {
      description: {
        component: '폼 레이블은 입력 요소의 제목을 표시하는 컴포넌트이다. for 속성으로 입력 요소와 연결한다.'
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
    components: { KrdsFormLabel, KrdsInput },
    template: `
      <div class="form-group">
        <KrdsFormLabel for="form-label-email">이메일</KrdsFormLabel>
        <KrdsInput id="form-label-email" placeholder="example@korea.kr" />
      </div>`
  }),
  play: async ({ canvas, canvasElement }) => {
    // form-tit 래퍼 안에 label이 렌더링된다
    const label = canvasElement.querySelector('.form-tit label')
    await expect(label).toHaveAttribute('for', 'form-label-email')
    await expect(canvas.getByLabelText('이메일')).toBeVisible()
  }
}
