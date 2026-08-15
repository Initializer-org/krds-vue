import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsFormHint from './KrdsFormHint'

const meta: Meta<typeof KrdsFormHint> = {
  title: 'Components/Input/KrdsFormHint',
  component: KrdsFormHint,
  parameters: {
    docs: {
      description: {
        component:
          '폼 힌트는 입력 요소에 대한 도움말이나 유효성 검사 결과를 표시하는 컴포넌트이다. type 속성으로 기본 도움말(hint), 오류(error), 성공(success), 안내(information) 상태를 표현한다.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['hint', 'error', 'success', 'information']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 타입별
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsFormHint },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.8rem;">
        <KrdsFormHint>기본 도움말입니다.</KrdsFormHint>
        <KrdsFormHint type="error">오류 메시지입니다.</KrdsFormHint>
        <KrdsFormHint type="success">성공 메시지입니다.</KrdsFormHint>
        <KrdsFormHint type="information">안내 메시지입니다.</KrdsFormHint>
      </div>`
  }),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.form-hint')).toHaveTextContent('기본 도움말입니다.')
    await expect(canvasElement.querySelector('.form-hint-invalid')).toHaveTextContent('오류 메시지입니다.')
    await expect(canvasElement.querySelector('.form-hint-success')).toHaveTextContent('성공 메시지입니다.')
    await expect(canvasElement.querySelector('.form-hint-information')).toHaveTextContent('안내 메시지입니다.')
  }
}
