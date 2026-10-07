import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import KrdsDateInput from './KrdsDateInput'
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

// 상태별 스토리용 렌더 (달력이 위로 열리므로 상단 여백 확보)
const renderWithValue =
  (id: string, value = ''): Story['render'] =>
  args => ({
    components: { KrdsDateInput, KrdsFormGroup, KrdsFormLabel },
    setup() {
      return { args, id, dateValue: ref(value) }
    },
    template: `
      <div style="padding-top: 600px;">
        <KrdsFormGroup>
          <KrdsFormLabel :for="id">날짜 선택</KrdsFormLabel>
          <KrdsDateInput v-bind="args" :id="id" v-model="dateValue" />
        </KrdsFormGroup>
      </div>
    `
  })

// 2. 비활성화
export const Disabled: Story = {
  name: '비활성화',
  args: { disabled: true },
  render: renderWithValue('date-input-disabled', '2025.03.10')
}

// 3. 읽기 전용
export const Readonly: Story = {
  name: '읽기 전용',
  args: { readonly: true },
  render: renderWithValue('date-input-readonly', '2025.03.10')
}

// 4. 일정·휴일 표시
export const EventsAndHolidays: Story = {
  name: '일정·휴일 표시',
  args: {
    initialYear: 2025,
    initialMonth: 5,
    holidays: ['2025.05.05', '2025.05.06'],
    eventDates: ['2025.05.15']
  },
  render: renderWithValue('date-input-events')
}

// 5. 여러 개 배치
export const Multiple: Story = {
  name: '여러 개 배치',
  render: () => ({
    components: { KrdsDateInput, KrdsFormGroup, KrdsFormLabel },
    setup() {
      return { start: ref(''), end: ref('') }
    },
    template: `
      <div style="padding-top: 600px;">
        <KrdsFormGroup>
          <KrdsFormLabel for="date-input-start">시작일</KrdsFormLabel>
          <KrdsDateInput id="date-input-start" v-model="start" />
        </KrdsFormGroup>
        <KrdsFormGroup>
          <KrdsFormLabel for="date-input-end">종료일</KrdsFormLabel>
          <KrdsDateInput id="date-input-end" v-model="end" />
        </KrdsFormGroup>
      </div>
    `
  })
}
