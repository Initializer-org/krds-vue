import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsFormGroup from './KrdsFormGroup'
import { KrdsFormLabel } from '../KrdsFormLabel'
import { KrdsFormHint } from '../KrdsFormHint'
import { KrdsInput } from '../KrdsInput'

const meta: Meta<typeof KrdsFormGroup> = {
  title: 'Components/Input/KrdsFormGroup',
  component: KrdsFormGroup,
  parameters: {
    docs: {
      description: {
        component: '폼 그룹은 레이블(KrdsFormLabel), 입력 요소, 힌트(KrdsFormHint)를 하나의 폼 필드 단위로 묶는 래퍼 컴포넌트이다.'
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
    components: { KrdsFormGroup, KrdsFormLabel, KrdsFormHint, KrdsInput },
    template: `
      <div class="fieldset">
        <KrdsFormGroup>
          <KrdsFormLabel for="form-group-name">이름</KrdsFormLabel>
          <KrdsInput id="form-group-name" placeholder="이름을 입력하세요" />
          <KrdsFormHint>실명을 입력해 주세요.</KrdsFormHint>
        </KrdsFormGroup>
      </div>`
  }),
  play: async ({ canvas, canvasElement }) => {
    const group = canvasElement.querySelector('.form-group')
    await expect(group).toBeTruthy()

    // 레이블-입력 연결
    const input = canvas.getByLabelText('이름')
    await expect(input).toHaveAttribute('id', 'form-group-name')
    await expect(group!.querySelector('.form-hint')).toHaveTextContent('실명을 입력해 주세요.')
  }
}
