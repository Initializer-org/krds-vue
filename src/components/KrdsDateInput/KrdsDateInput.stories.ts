import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import KrdsDateInput from './KrdsDateInput.vue'
import KrdsFormGroup from '../KrdsFormGroup/KrdsFormGroup'
import KrdsFormLabel from '../KrdsFormLabel/KrdsFormLabel'
import KrdsFormHint from '../KrdsFormHint/KrdsFormHint'

const meta: Meta<typeof KrdsDateInput> = {
  title: 'Components/Input/KrdsDateInput',
  component: KrdsDateInput,
  parameters: {
    docs: {
      description: {
        component: '날짜 입력 필드는 사용자가 특정 날짜 또는 기간을 입력하거나 선택하는 데 사용되는 요소이다.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      description: '입력 필드 크기'
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본 날짜 입력
export const Default: Story = {
  name: '기본',
  args: {
    placeholder: 'YYYY.MM.DD'
  },
  render: args => ({
    components: { KrdsDateInput, KrdsFormGroup, KrdsFormLabel, KrdsFormHint },
    setup() {
      const dateValue = ref('')
      return {
        args,
        dateValue
      }
    },
    template: `
      <div style="padding-top: 600px; padding-bottom: 100px; min-height: 800px;">
        <KrdsFormGroup>
          <KrdsFormLabel for="date-input">날짜 선택</KrdsFormLabel>
          <KrdsDateInput 
            v-bind="args" 
            id="date-input" 
            v-model="dateValue"
          />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>
      </div>
    `
  })
}
