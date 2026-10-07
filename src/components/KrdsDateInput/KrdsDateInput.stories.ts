import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
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
  }),
  play: async ({ canvasElement, canvas, userEvent }) => {
    const input = canvas.getByLabelText('날짜 선택')
    const calBtn = canvas.getByRole('button', { name: '달력 열기' })
    const calendar = canvasElement.querySelector<HTMLElement>('.calendar-wrap')!
    const cell = (date: string) => canvasElement.querySelector(`td[data-date="${date}"]`)!
    const pick = (date: string) => userEvent.click(cell(date).querySelector('button')!)
    const confirm = () => userEvent.click(canvas.getByRole('button', { name: '확인' }))
    const open = async () => {
      await userEvent.click(calBtn)
      // 열린 뒤 달력 영역으로 초점 이동
      await waitFor(() => expect(calendar).toHaveFocus())
    }

    // 직접 입력: 포맷 변환 없이 그대로 입력
    await userEvent.type(input, '2025.03.10')
    await expect(input).toHaveValue('2025.03.10')

    // 달력 열기: aria-expanded·표시 상태
    await expect(calBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(calendar).not.toBeVisible()
    await open()
    await expect(calBtn).toHaveAttribute('aria-expanded', 'true')
    await expect(canvasElement.querySelector('.krds-calendar-area')).toHaveClass('active')
    await expect(calendar).toBeVisible()
    // 재렌더링 후에도 입력값 유지 → v-model 반영됨
    await expect(input).toHaveValue('2025.03.10')

    // 선택 없이 확인 → 닫히지 않음
    await confirm()
    await expect(calendar).toBeVisible()

    // 연/월 드롭다운은 하나만 열림, Escape는 드롭다운만 닫음
    const yearBtn = canvas.getByRole('button', { name: '연도 선택' })
    const monthBtn = canvas.getByRole('button', { name: '월 선택' })
    await userEvent.click(yearBtn)
    await expect(yearBtn).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(monthBtn)
    await expect(yearBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(monthBtn).toHaveAttribute('aria-expanded', 'true')
    await userEvent.keyboard('{Escape}')
    await expect(monthBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(calendar).toBeVisible()

    // 처음엔 이번 달 표시 → 이전 달로 1월까지 이동
    const now = new Date()
    const year = now.getFullYear()
    const pad = (n: number) => String(n).padStart(2, '0')
    const prevBtn = canvas.getByRole('button', { name: '이전 달' })
    await expect(canvas.getByRole('table', { name: `${year}년 ${pad(now.getMonth() + 1)}월` })).toBeInTheDocument()
    for (let i = 0; i < now.getMonth(); i++) await userEvent.click(prevBtn)
    await expect(canvas.getByRole('table', { name: `${year}년 01월` })).toBeInTheDocument()
    await expect(yearBtn).toHaveTextContent(`${year}년`)
    await expect(monthBtn).toHaveTextContent('01월')

    // 이전/다음 달: 연도 경계 넘김
    await userEvent.click(prevBtn)
    await expect(canvas.getByRole('table', { name: `${year - 1}년 12월` })).toBeInTheDocument()
    await expect(yearBtn).toHaveTextContent(`${year - 1}년`)
    await userEvent.click(canvas.getByRole('button', { name: '다음 달' }))
    await userEvent.click(canvas.getByRole('button', { name: '다음 달' }))
    await expect(canvas.getByRole('table', { name: `${year}년 02월` })).toBeInTheDocument()
    await expect(cell(`${year}.02.01`)).not.toHaveClass('old')
    await expect(cell(`${year}.02.01`)).not.toHaveClass('new')
    await expect(cell(`${year}.03.01`)).toHaveClass('new')

    // 첫 클릭 → 시작일로 선택 표시
    await pick(`${year}.02.12`)
    await expect(cell(`${year}.02.12`)).toHaveClass('period', 'start')
    await expect(cell(`${year}.02.12`).querySelector('button')).toHaveAttribute('aria-pressed', 'true')

    // 뒤 날짜 → 앞 날짜 순이면 시작일 재지정, 다음 클릭으로 기간 완성
    await pick(`${year}.02.10`)
    await expect(cell(`${year}.02.10`)).toHaveClass('period', 'start')
    await expect(cell(`${year}.02.12`)).not.toHaveClass('period')
    await expect(cell(`${year}.02.12`).querySelector('button')).toHaveAttribute('aria-pressed', 'false')
    await pick(`${year}.02.12`)
    await expect(cell(`${year}.02.10`)).toHaveClass('period', 'start')
    await expect(cell(`${year}.02.11`)).toHaveClass('period')
    await expect(cell(`${year}.02.12`)).toHaveClass('period', 'end')
    await expect(cell(`${year}.02.13`)).not.toHaveClass('period')
    await expect(cell(`${year}.02.11`).querySelector('button')).toHaveAttribute('aria-pressed', 'true')
    await expect(cell(`${year}.02.13`).querySelector('button')).toHaveAttribute('aria-pressed', 'false')

    // 확인 → 기간 문자열로 v-model 갱신, 닫히고 초점 복귀
    await confirm()
    await expect(input).toHaveValue(`${year}.02.10 ~ ${year}.02.12`)
    await expect(calendar).not.toBeVisible()
    await expect(calBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(calBtn).toHaveFocus()

    // 같은 날짜 두 번 → 단일 날짜
    await open()
    await pick(`${year}.02.20`)
    await pick(`${year}.02.20`)
    await expect(cell(`${year}.02.20`)).toHaveClass('period', 'start', 'end')
    await confirm()
    await expect(input).toHaveValue(`${year}.02.20`)

    // 오늘 → 오늘 날짜로 확정
    const today = `${year}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`
    await open()
    await userEvent.click(canvas.getByRole('button', { name: '오늘' }))
    await confirm()
    await expect(input).toHaveValue(today)

    // 취소 → 값 유지, 닫히고 초점 복귀
    await open()
    await pick(`${year}.02.05`)
    await userEvent.click(canvas.getByRole('button', { name: '취소' }))
    await expect(input).toHaveValue(today)
    await expect(calendar).not.toBeVisible()
    await expect(calBtn).toHaveFocus()

    // 달력 버튼 재클릭 → 닫힘
    await open()
    await userEvent.click(calBtn)
    await expect(calendar).not.toBeVisible()
    await expect(calBtn).toHaveFocus()

    // 키보드: Enter로 열고 Tab 이동, Enter로 이전 달, Escape로 닫고 초점 복귀
    calBtn.focus()
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(calendar).toHaveFocus())
    await userEvent.keyboard('{Tab}')
    await expect(canvas.getByRole('button', { name: '이전 달' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await expect(canvas.getByRole('table', { name: `${year}년 01월` })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await expect(calendar).not.toBeVisible()
    await expect(calBtn).toHaveFocus()

    // 입력창 클릭은 유지, 바깥 클릭 → 닫힘
    await open()
    await userEvent.click(input)
    await expect(calendar).toBeVisible()
    await userEvent.click(canvas.getByText('도움말'))
    await expect(calendar).not.toBeVisible()
    await expect(calBtn).toHaveAttribute('aria-expanded', 'false')
  }
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
  render: renderWithValue('date-input-disabled', '2025.03.10'),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByLabelText('날짜 선택')
    const calBtn = canvas.getByRole('button', { name: '달력 열기' })
    await expect(input).toBeDisabled()
    await expect(calBtn).toBeDisabled()

    // 입력·달력 열기 모두 불가
    await userEvent.type(input, '1')
    await expect(input).toHaveValue('2025.03.10')
    await userEvent.click(calBtn)
    await expect(calBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(canvasElement.querySelector('.calendar-wrap')).not.toBeVisible()
  }
}

// 3. 읽기 전용
export const Readonly: Story = {
  name: '읽기 전용',
  args: { readonly: true },
  render: renderWithValue('date-input-readonly', '2025.03.10'),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('날짜 선택')
    await expect(input).toHaveAttribute('readonly')

    // 직접 입력 불가
    await userEvent.type(input, '1')
    await expect(input).toHaveValue('2025.03.10')
  }
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
  render: renderWithValue('date-input-events'),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const cell = (date: string) => canvasElement.querySelector(`td[data-date="${date}"]`)
    const calBtn = canvas.getByRole('button', { name: '달력 열기' })
    await userEvent.click(calBtn)

    // initialYear/initialMonth로 시작 월 지정
    await expect(canvas.getByRole('table', { name: '2025년 05월' })).toBeInTheDocument()
    await expect(cell('2025.04.27')).toHaveClass('old')
    await expect(cell('2025.06.01')).toHaveClass('new')

    // 휴일·일요일은 day-off, 일정은 day-event
    await expect(cell('2025.05.05')).toHaveClass('day-off')
    await expect(cell('2025.05.06')).toHaveClass('day-off')
    await expect(cell('2025.05.04')).toHaveClass('day-off')
    await expect(cell('2025.05.07')).not.toHaveClass('day-off')
    await expect(cell('2025.05.15')).toHaveClass('day-event')
    await expect(cell('2025.05.16')).not.toHaveClass('day-event')

    // 월 목록: 열면 보이고, 항목 선택 → 해당 월로 이동 후 닫히고 월 버튼으로 초점 복귀
    const monthBtn = canvas.getByRole('button', { name: '월 선택' })
    const monthList = canvasElement.querySelector('.calendar-mon-wrap')
    await userEvent.click(monthBtn)
    await expect(monthList).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: '12월' }))
    await expect(canvas.getByRole('table', { name: '2025년 12월' })).toBeInTheDocument()
    await expect(monthList).not.toBeVisible()
    await expect(monthBtn).toHaveTextContent('12월')
    await expect(monthBtn).toHaveFocus()

    // 12월: 이웃 달 날짜는 old/new 중 하나만
    await expect(cell('2025.11.30')).toHaveClass('old')
    await expect(cell('2025.11.30')).not.toHaveClass('new')
    await expect(cell('2026.01.01')).toHaveClass('new')
    await expect(cell('2026.01.01')).not.toHaveClass('old')

    // 연도 목록: 작년 선택 → 해당 연도로 이동 후 닫히고 연도 버튼으로 초점 복귀
    const lastYear = new Date().getFullYear() - 1
    const yearBtn = canvas.getByRole('button', { name: '연도 선택' })
    const yearList = canvasElement.querySelector('.calendar-year-wrap')
    await userEvent.click(yearBtn)
    await expect(yearList).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: `${lastYear}년` }))
    await expect(canvas.getByRole('table', { name: `${lastYear}년 12월` })).toBeInTheDocument()
    await expect(yearList).not.toBeVisible()
    await expect(yearBtn).toHaveTextContent(`${lastYear}년`)
    await expect(yearBtn).toHaveFocus()

    // 1월: 이전 해 12월 날짜는 old만
    await userEvent.click(monthBtn)
    await userEvent.click(canvas.getByRole('button', { name: '01월' }))
    const dec31 = cell(`${lastYear - 1}.12.31`)
    await expect(dec31).toHaveClass('old')
    await expect(dec31).not.toHaveClass('new')

    await userEvent.click(calBtn)
  }
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
  }),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const [btn1, btn2] = canvas.getAllByRole('button', { name: '달력 열기' })
    const [cal1, cal2] = canvasElement.querySelectorAll<HTMLElement>('.calendar-wrap')

    // 다른 달력 열기 → 기존 달력은 닫힘 (원본 openDatePicker와 동일)
    await userEvent.click(btn1)
    await waitFor(() => expect(cal1).toHaveFocus())
    await userEvent.click(btn2)
    await waitFor(() => expect(cal2).toHaveFocus())
    await expect(cal1).not.toBeVisible()
    await expect(btn1).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(btn2)
  }
}
