import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
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
  }),
  play: async ({ canvasElement, canvas, userEvent }) => {
    // Open calendar
    const calBtn = canvas.getByRole('button', { name: '달력 열기' })
    await userEvent.click(calBtn)

    await waitFor(() => {
      expect(canvasElement.querySelector('.krds-calendar-area.active')).toBeTruthy()
    })

    // Navigate months
    await userEvent.click(canvasElement.querySelector('.btn-cal-move.prev') as HTMLElement)
    await userEvent.click(canvasElement.querySelector('.btn-cal-move.next') as HTMLElement)

    // Year dropdown: open and select
    await userEvent.click(canvasElement.querySelector('.btn-cal-switch.year') as HTMLElement)
    await waitFor(() => {
      const yw = canvasElement.querySelector('.calendar-year-wrap') as HTMLElement
      expect(yw?.style.display).not.toBe('none')
    })
    const yearOpt = canvasElement.querySelector('.calendar-year-wrap .sel button') as HTMLElement
    if (yearOpt) await userEvent.click(yearOpt)

    // Month dropdown: toggle open/close
    await userEvent.click(canvasElement.querySelector('.btn-cal-switch.month') as HTMLElement)
    await waitFor(() => {
      const mw = canvasElement.querySelector('.calendar-mon-wrap') as HTMLElement
      expect(mw?.style.display).not.toBe('none')
    })
    await userEvent.click(canvasElement.querySelector('.btn-cal-switch.month') as HTMLElement)

    // Select a date
    const dateCell = canvasElement.querySelector('td:not(.old):not(.new) .btn-set-date') as HTMLElement
    if (dateCell) await userEvent.click(dateCell)

    // Click today
    const todayBtn = canvasElement.querySelector('#get-today') as HTMLElement
    if (todayBtn) await userEvent.click(todayBtn)

    // Click confirm (closes calendar)
    const confirmBtn = canvasElement.querySelector('#confirm-btn') as HTMLElement
    if (confirmBtn) await userEvent.click(confirmBtn)

    // Reopen and cancel
    await userEvent.click(calBtn)
    await waitFor(() => {
      expect(canvasElement.querySelector('.krds-calendar-area.active')).toBeTruthy()
    })
    const cancelBtn = canvasElement.querySelector('#cancel-btn') as HTMLElement
    if (cancelBtn) await userEvent.click(cancelBtn)
  }
}
