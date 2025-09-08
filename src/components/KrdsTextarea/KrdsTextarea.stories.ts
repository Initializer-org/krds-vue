import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsTextarea from './KrdsTextarea'
import KrdsFormGroup from '../KrdsFormGroup/KrdsFormGroup'
import KrdsFormHint from '../KrdsFormHint/KrdsFormHint'
import { KrdsFormLabel } from '../KrdsFormLabel'

const meta: Meta<typeof KrdsTextarea> = {
  title: 'Components/Input/KrdsTextarea',
  component: KrdsTextarea,
  parameters: {
    docs: {
      description: {
        component: '텍스트 영역은 사용자가 키보드로 글자, 숫자, 기호 등이 조합된 여러 줄의 텍스트를 입력하는 경우에 사용하는 요소이다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: '입력값'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력 크기'
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 여부'
    },
    autofocus: {
      control: { type: 'boolean' },
      description: '자동 포커스 여부'
    },
    maxlength: {
      control: { type: 'number' },
      description: '최대 글자 수'
    },
    minlength: {
      control: { type: 'number' },
      description: '최소 글자 수'
    },
    rows: {
      control: { type: 'number' },
      description: '행 수'
    },
    cols: {
      control: { type: 'number' },
      description: '열 수'
    },
    showCount: {
      control: { type: 'boolean' },
      description: '글자 수 표시 여부'
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: '리사이즈 가능 여부'
    }
  },
  args: {
    placeholder: '내용을 입력하세요',
    rows: 4,
    showCount: true,
    resize: 'vertical'
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  render: args => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsTextarea, KrdsFormHint },
    setup() {
      return { args }
    },
    template: `
      <div class="fieldset">
        <KrdsFormGroup>
          <KrdsFormLabel for="textarea1">레이블</KrdsFormLabel>
          <KrdsTextarea id="textarea1" v-bind="args" />
        </KrdsFormGroup>
      </div>
    `
  })
}
