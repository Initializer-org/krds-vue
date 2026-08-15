import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsButtonGroup from './KrdsButtonGroup'
import { KrdsButton } from '../KrdsButton'

const meta: Meta<typeof KrdsButtonGroup> = {
  title: 'Components/Action/KrdsButtonGroup',
  component: KrdsButtonGroup,
  parameters: {
    docs: {
      description: {
        component: '버튼 그룹은 여러 개의 버튼을 나란히 배치할 때 사용하는 래퍼 컴포넌트이다. 취소/확인과 같은 액션 버튼 묶음에 사용한다.'
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
    components: { KrdsButtonGroup, KrdsButton },
    template: `
      <KrdsButtonGroup>
        <KrdsButton variant="secondary">취소</KrdsButton>
        <KrdsButton variant="primary">확인</KrdsButton>
      </KrdsButtonGroup>`
  }),
  play: async ({ canvas, canvasElement }) => {
    const group = canvasElement.querySelector('.btn-group')
    await expect(group).toBeTruthy()
    await expect(canvas.getByRole('button', { name: '취소' })).toBeVisible()
    await expect(canvas.getByRole('button', { name: '확인' })).toBeVisible()
  }
}
