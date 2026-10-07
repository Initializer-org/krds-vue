import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

// 상태별 렌더 (달력이 위로 열리므로 상단 여백 확보)
const withValue = (id: string, value = '', args: Record<string, unknown> = {}) => ({
  setup: () => ({ args, id, dateValue: ref(value) }),
  template: `
    <div style="padding-top: 600px;">
      <KrdsFormGroup>
        <KrdsFormLabel :for="id">날짜 선택</KrdsFormLabel>
        <KrdsDateInput v-bind="args" :id="id" v-model="dateValue" />
      </KrdsFormGroup>
    </div>
  `
})

describe('KrdsDateInput', () => {
  it('기본: 직접 입력, 달력 열기·닫기, 기간·단일·오늘 선택, 키보드, 바깥 클릭', async () => {
    const { container } = render({
      setup: () => ({ args: { placeholder: 'YYYY.MM.DD' }, dateValue: ref('') }),
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
    const input = screen.getByLabelText('날짜 선택')
    const calBtn = screen.getByRole('button', { name: '달력 열기' })
    const calendar = container.querySelector<HTMLElement>('.calendar-wrap')!
    const cell = (date: string) => container.querySelector(`td[data-date="${date}"]`)!
    const pick = (date: string) => userEvent.click(cell(date).querySelector('button')!)
    const confirm = () => userEvent.click(screen.getByRole('button', { name: '확인' }))
    const open = async () => {
      await userEvent.click(calBtn)
      // 열린 뒤 달력 영역으로 초점 이동
      await waitFor(() => expect(calendar).toHaveFocus())
    }

    // 직접 입력: 포맷 변환 없이 그대로 입력
    await userEvent.type(input, '2025.03.10')
    expect(input).toHaveValue('2025.03.10')

    // 달력 열기: aria-expanded·표시 상태
    expect(calBtn).toHaveAttribute('aria-expanded', 'false')
    expect(calendar).not.toBeVisible()
    await open()
    expect(calBtn).toHaveAttribute('aria-expanded', 'true')
    expect(container.querySelector('.krds-calendar-area')).toHaveClass('active')
    expect(calendar).toBeVisible()
    // 재렌더링 후에도 입력값 유지 → v-model 반영됨
    expect(input).toHaveValue('2025.03.10')

    // 선택 없이 확인 → 닫히지 않음
    await confirm()
    expect(calendar).toBeVisible()

    // 연/월 드롭다운은 하나만 열림, Escape는 드롭다운만 닫음
    const yearBtn = screen.getByRole('button', { name: '연도 선택' })
    const monthBtn = screen.getByRole('button', { name: '월 선택' })
    await userEvent.click(yearBtn)
    expect(yearBtn).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(monthBtn)
    expect(yearBtn).toHaveAttribute('aria-expanded', 'false')
    expect(monthBtn).toHaveAttribute('aria-expanded', 'true')
    await userEvent.keyboard('{Escape}')
    expect(monthBtn).toHaveAttribute('aria-expanded', 'false')
    expect(calendar).toBeVisible()

    // 처음엔 이번 달 표시 → 이전 달로 1월까지 이동
    const now = new Date()
    const year = now.getFullYear()
    const pad = (n: number) => String(n).padStart(2, '0')
    const prevBtn = screen.getByRole('button', { name: '이전 달' })
    expect(screen.getByRole('table', { name: `${year}년 ${pad(now.getMonth() + 1)}월` })).toBeInTheDocument()
    for (let i = 0; i < now.getMonth(); i++) await userEvent.click(prevBtn)
    expect(screen.getByRole('table', { name: `${year}년 01월` })).toBeInTheDocument()
    expect(yearBtn).toHaveTextContent(`${year}년`)
    expect(monthBtn).toHaveTextContent('01월')

    // 이전/다음 달: 연도 경계 넘김
    await userEvent.click(prevBtn)
    expect(screen.getByRole('table', { name: `${year - 1}년 12월` })).toBeInTheDocument()
    expect(yearBtn).toHaveTextContent(`${year - 1}년`)
    await userEvent.click(screen.getByRole('button', { name: '다음 달' }))
    await userEvent.click(screen.getByRole('button', { name: '다음 달' }))
    expect(screen.getByRole('table', { name: `${year}년 02월` })).toBeInTheDocument()
    expect(cell(`${year}.02.01`)).not.toHaveClass('old')
    expect(cell(`${year}.02.01`)).not.toHaveClass('new')
    expect(cell(`${year}.03.01`)).toHaveClass('new')

    // 첫 클릭 → 시작일로 선택 표시
    await pick(`${year}.02.12`)
    expect(cell(`${year}.02.12`)).toHaveClass('period', 'start')
    expect(cell(`${year}.02.12`).querySelector('button')).toHaveAttribute('aria-pressed', 'true')

    // 뒤 날짜 → 앞 날짜 순이면 시작일 재지정, 다음 클릭으로 기간 완성
    await pick(`${year}.02.10`)
    expect(cell(`${year}.02.10`)).toHaveClass('period', 'start')
    expect(cell(`${year}.02.12`)).not.toHaveClass('period')
    expect(cell(`${year}.02.12`).querySelector('button')).toHaveAttribute('aria-pressed', 'false')
    await pick(`${year}.02.12`)
    expect(cell(`${year}.02.10`)).toHaveClass('period', 'start')
    expect(cell(`${year}.02.11`)).toHaveClass('period')
    expect(cell(`${year}.02.12`)).toHaveClass('period', 'end')
    expect(cell(`${year}.02.13`)).not.toHaveClass('period')
    expect(cell(`${year}.02.11`).querySelector('button')).toHaveAttribute('aria-pressed', 'true')
    expect(cell(`${year}.02.13`).querySelector('button')).toHaveAttribute('aria-pressed', 'false')

    // 확인 → 기간 문자열로 v-model 갱신, 닫히고 초점 복귀
    await confirm()
    expect(input).toHaveValue(`${year}.02.10 ~ ${year}.02.12`)
    expect(calendar).not.toBeVisible()
    expect(calBtn).toHaveAttribute('aria-expanded', 'false')
    expect(calBtn).toHaveFocus()

    // 같은 날짜 두 번 → 단일 날짜
    await open()
    await pick(`${year}.02.20`)
    await pick(`${year}.02.20`)
    expect(cell(`${year}.02.20`)).toHaveClass('period', 'start', 'end')
    await confirm()
    expect(input).toHaveValue(`${year}.02.20`)

    // 오늘 → 오늘 날짜로 확정
    const today = `${year}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`
    await open()
    await userEvent.click(screen.getByRole('button', { name: '오늘' }))
    await confirm()
    expect(input).toHaveValue(today)

    // 취소 → 값 유지, 닫히고 초점 복귀
    await open()
    await pick(`${year}.02.05`)
    await userEvent.click(screen.getByRole('button', { name: '취소' }))
    expect(input).toHaveValue(today)
    expect(calendar).not.toBeVisible()
    expect(calBtn).toHaveFocus()

    // 달력 버튼 재클릭 → 닫힘
    await open()
    await userEvent.click(calBtn)
    expect(calendar).not.toBeVisible()
    expect(calBtn).toHaveFocus()

    // 키보드: Enter로 열고 Tab 이동, Enter로 이전 달, Escape로 닫고 초점 복귀
    calBtn.focus()
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(calendar).toHaveFocus())
    await userEvent.keyboard('{Tab}')
    expect(screen.getByRole('button', { name: '이전 달' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    expect(screen.getByRole('table', { name: `${year}년 01월` })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(calendar).not.toBeVisible()
    expect(calBtn).toHaveFocus()

    // 입력창 클릭은 유지, 바깥 클릭 → 닫힘
    await open()
    await userEvent.click(input)
    expect(calendar).toBeVisible()
    await userEvent.click(screen.getByText('도움말'))
    expect(calendar).not.toBeVisible()
    expect(calBtn).toHaveAttribute('aria-expanded', 'false')
    await expectNoA11yViolations()
  })

  it('비활성화: 입력·달력 열기 불가', async () => {
    const { container } = render(withValue('date-input-disabled', '2025.03.10', { disabled: true }))
    const input = screen.getByLabelText('날짜 선택')
    const calBtn = screen.getByRole('button', { name: '달력 열기' })
    expect(input).toBeDisabled()
    expect(calBtn).toBeDisabled()

    // 입력·달력 열기 모두 불가
    await userEvent.type(input, '1')
    expect(input).toHaveValue('2025.03.10')
    await userEvent.click(calBtn)
    expect(calBtn).toHaveAttribute('aria-expanded', 'false')
    expect(container.querySelector('.calendar-wrap')).not.toBeVisible()
    await expectNoA11yViolations()
  })

  it('읽기 전용: 직접 입력 불가', async () => {
    render(withValue('date-input-readonly', '2025.03.10', { readonly: true }))
    const input = screen.getByLabelText('날짜 선택')
    expect(input).toHaveAttribute('readonly')

    // 직접 입력 불가
    await userEvent.type(input, '1')
    expect(input).toHaveValue('2025.03.10')
    await expectNoA11yViolations()
  })

  it('일정·휴일 표시: 시작 월 지정, 휴일·일정 표시, 연/월 목록 이동', async () => {
    const { container } = render(
      withValue('date-input-events', '', {
        initialYear: 2025,
        initialMonth: 5,
        holidays: ['2025.05.05', '2025.05.06'],
        eventDates: ['2025.05.15']
      })
    )
    const cell = (date: string) => container.querySelector(`td[data-date="${date}"]`)
    const calBtn = screen.getByRole('button', { name: '달력 열기' })
    await userEvent.click(calBtn)
    // 열린 뒤 50ms 지연으로 달력에 초점이 가므로, 그 전에 조작하면 이후 초점 검증과 경합한다
    await waitFor(() => expect(container.querySelector('.calendar-wrap')).toHaveFocus())

    // initialYear/initialMonth로 시작 월 지정
    expect(screen.getByRole('table', { name: '2025년 05월' })).toBeInTheDocument()
    expect(cell('2025.04.27')).toHaveClass('old')
    expect(cell('2025.06.01')).toHaveClass('new')

    // 휴일·일요일은 day-off, 일정은 day-event
    expect(cell('2025.05.05')).toHaveClass('day-off')
    expect(cell('2025.05.06')).toHaveClass('day-off')
    expect(cell('2025.05.04')).toHaveClass('day-off')
    expect(cell('2025.05.07')).not.toHaveClass('day-off')
    expect(cell('2025.05.15')).toHaveClass('day-event')
    expect(cell('2025.05.16')).not.toHaveClass('day-event')

    // 월 목록: 열면 보이고, 항목 선택 → 해당 월로 이동 후 닫히고 월 버튼으로 초점 복귀
    const monthBtn = screen.getByRole('button', { name: '월 선택' })
    const monthList = container.querySelector('.calendar-mon-wrap')
    await userEvent.click(monthBtn)
    expect(monthList).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: '12월' }))
    expect(screen.getByRole('table', { name: '2025년 12월' })).toBeInTheDocument()
    expect(monthList).not.toBeVisible()
    expect(monthBtn).toHaveTextContent('12월')
    expect(monthBtn).toHaveFocus()

    // 12월: 이웃 달 날짜는 old/new 중 하나만
    expect(cell('2025.11.30')).toHaveClass('old')
    expect(cell('2025.11.30')).not.toHaveClass('new')
    expect(cell('2026.01.01')).toHaveClass('new')
    expect(cell('2026.01.01')).not.toHaveClass('old')

    // 연도 목록: 작년 선택 → 해당 연도로 이동 후 닫히고 연도 버튼으로 초점 복귀
    const lastYear = new Date().getFullYear() - 1
    const yearBtn = screen.getByRole('button', { name: '연도 선택' })
    const yearList = container.querySelector('.calendar-year-wrap')
    await userEvent.click(yearBtn)
    expect(yearList).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: `${lastYear}년` }))
    expect(screen.getByRole('table', { name: `${lastYear}년 12월` })).toBeInTheDocument()
    expect(yearList).not.toBeVisible()
    expect(yearBtn).toHaveTextContent(`${lastYear}년`)
    expect(yearBtn).toHaveFocus()

    // 1월: 이전 해 12월 날짜는 old만
    await userEvent.click(monthBtn)
    await userEvent.click(screen.getByRole('button', { name: '01월' }))
    const dec31 = cell(`${lastYear - 1}.12.31`)
    expect(dec31).toHaveClass('old')
    expect(dec31).not.toHaveClass('new')

    await userEvent.click(calBtn)
    await expectNoA11yViolations()
  })

  it('여러 개 배치: 다른 달력을 열면 기존 달력은 닫힘', async () => {
    const { container } = render({
      setup: () => ({ start: ref(''), end: ref('') }),
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
    const [btn1, btn2] = screen.getAllByRole('button', { name: '달력 열기' })
    const [cal1, cal2] = container.querySelectorAll<HTMLElement>('.calendar-wrap')

    // 다른 달력 열기 → 기존 달력은 닫힘 (원본 openDatePicker와 동일)
    await userEvent.click(btn1)
    await waitFor(() => expect(cal1).toHaveFocus())
    await userEvent.click(btn2)
    await waitFor(() => expect(cal2).toHaveFocus())
    expect(cal1).not.toBeVisible()
    expect(btn1).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(btn2)
    await expectNoA11yViolations()
  })

  it('달력 방향: 위쪽 공간이 모자라면 아래로, 충분하면 원본처럼 위로 열림', async () => {
    const { container } = render({
      template: `
        <div>
          <KrdsFormGroup>
            <KrdsFormLabel for="date-input-top">화면 위쪽</KrdsFormLabel>
            <KrdsDateInput id="date-input-top" />
          </KrdsFormGroup>
          <KrdsFormGroup style="padding-top: 600px;">
            <KrdsFormLabel for="date-input-lower">화면 아래쪽</KrdsFormLabel>
            <KrdsDateInput id="date-input-lower" />
          </KrdsFormGroup>
        </div>
      `
    })
    const [topBtn, lowerBtn] = screen.getAllByRole('button', { name: '달력 열기' })
    const [topCal, lowerCal] = container.querySelectorAll<HTMLElement>('.calendar-wrap')

    await userEvent.click(topBtn)
    await waitFor(() => expect(topCal).toHaveFocus())
    expect(topCal).not.toHaveClass('bottom')
    expect(topCal.getBoundingClientRect().top).toBeGreaterThan(topBtn.getBoundingClientRect().bottom)

    await userEvent.click(lowerBtn)
    await waitFor(() => expect(lowerCal).toHaveFocus())
    expect(lowerCal).toHaveClass('bottom')
    expect(lowerCal.getBoundingClientRect().bottom).toBeLessThan(lowerBtn.getBoundingClientRect().top)

    await userEvent.click(lowerBtn)
    await expectNoA11yViolations()
  })

  it('teleport: 달력을 body에 렌더하고 입력 필드 바로 아래 자리에 둠', async () => {
    const { container } = render(withValue('date-input-teleport', '', { teleport: true }))
    const calBtn = screen.getByRole('button', { name: '달력 열기' })

    await userEvent.click(calBtn)
    const area = document.querySelector<HTMLElement>('body > .krds-calendar-area')!
    expect(container.querySelector('.krds-calendar-area')).toBeNull()
    expect(area).toHaveClass('active')
    await waitFor(() => expect(area.querySelector('.calendar-wrap')).toHaveFocus())

    // 원래 자리(입력 행 바로 아래)와 같은 위치·폭
    const row = container.querySelector('.calendar-input')!.getBoundingClientRect()
    const rect = area.getBoundingClientRect()
    expect(Math.round(rect.top)).toBe(Math.round(row.bottom))
    expect(Math.round(rect.left)).toBe(Math.round(row.left))
    expect(Math.round(rect.width)).toBe(Math.round(row.width))

    // 날짜 선택·확인 → 입력값 반영, 달력 닫힘
    const cell = area.querySelector<HTMLElement>('td[data-date]:not(.old):not(.new)')!
    await userEvent.click(cell.querySelector('button')!)
    await userEvent.click(screen.getByRole('button', { name: '확인' }))
    expect(screen.getByLabelText('날짜 선택')).toHaveValue(cell.dataset.date)
    expect(area).not.toHaveClass('active')
    await expectNoA11yViolations()
  })
})
