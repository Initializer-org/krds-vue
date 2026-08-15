import { computed, defineComponent, h, ref, vShow, withDirectives } from 'vue'
import type { PropType } from 'vue'
import type { BaseFormProps, Size } from '@/types'
import KrdsButton from '@/components/KrdsButton/KrdsButton'
import { useDatePicker } from '@/composables/useDatePicker'
import { useClickOutside } from '@/composables/useClickOutside'

// ========================
// 타입 정의
// ========================

/**
 * 캘린더 날짜 정보
 */
interface CalendarDay {
  day: number
  dateString: string
  isCurrentMonth: boolean
  isToday: boolean
  isPrevMonth: boolean
  isNextMonth: boolean
  isSunday: boolean
  isSaturday: boolean
}

/**
 * 액션 버튼 정보
 */
interface ActionButton {
  id: string
  label: string
  class: string | undefined
  variant: 'primary' | 'tertiary' | undefined
  size: Size
  handler: () => void
}

/**
 * KRDS DateInput 컴포넌트 속성
 */
export interface KrdsDateInputProps extends BaseFormProps {
  /** 선택된 날짜 값 */
  modelValue?: string
  /** 입력 크기 */
  size?: Size
  /** 플레이스홀더 */
  placeholder?: string
  /** 비활성화 여부 */
  disabled?: boolean
  /** 읽기 전용 여부 */
  readonly?: boolean
  /** 자동 포커스 */
  autofocus?: boolean
  /** 일정이 있는 날짜 배열 (YYYY.MM.DD 형식) */
  eventDates?: string[]
  /** 휴일 날짜 배열 (YYYY.MM.DD 형식) */
  holidays?: string[]
  /** 초기 표시 년도 (기본: 현재 년도) */
  initialYear?: number
  /** 초기 표시 월 (기본: 현재 월) */
  initialMonth?: number
}

/**
 * KRDS DateInput 컴포넌트 이벤트
 */
export interface KrdsDateInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

/** 요일 헤더 */
const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

export default defineComponent({
  name: 'KrdsDateInput',
  props: {
    /** 선택된 날짜 값 */
    modelValue: {
      type: String,
      default: undefined
    },
    /** 입력 크기 */
    size: {
      type: String as PropType<Size>,
      default: 'medium'
    },
    /** 플레이스홀더 */
    placeholder: {
      type: String,
      default: 'YYYY.MM.DD'
    },
    /** 폼 필드 이름 */
    name: {
      type: String,
      default: undefined
    },
    /** 필수 입력 여부 */
    required: {
      type: Boolean,
      default: false
    },
    /** 읽기 전용 여부 */
    readonly: {
      type: Boolean,
      default: false
    },
    /** 비활성화 여부 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 자동 포커스 */
    autofocus: {
      type: Boolean,
      default: false
    },
    /** 일정이 있는 날짜 배열 (YYYY.MM.DD 형식) */
    eventDates: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    /** 휴일 날짜 배열 (YYYY.MM.DD 형식) */
    holidays: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    /** 초기 표시 년도 (기본: 현재 년도) */
    initialYear: {
      type: Number,
      default: undefined
    },
    /** 초기 표시 월 (기본: 현재 월) */
    initialMonth: {
      type: Number,
      default: undefined
    },
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    },
    /** HTML ID */
    id: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    'update:modelValue': (value: string) => true,
    input: (event: Event) => true,
    change: (event: Event) => true,
    focus: (event: FocusEvent) => true,
    blur: (event: FocusEvent) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit }) {
    // ========================
    // 상태 관리
    // ========================

    // DOM 참조
    const datePickerAreaRef = ref<HTMLElement>()
    const datePickerButtonRef = ref<HTMLButtonElement>()

    // 반응형 상태
    const isCalendarOpen = ref(false)
    const activeDropdown = ref<'year' | 'month' | null>(null)

    // ========================
    // Composables
    // ========================

    // 날짜 선택기 composable 사용
    const {
      currentYear,
      currentMonth,
      selectedStartDate,
      selectedEndDate,
      yearOptions,
      monthOptions,
      prevMonth,
      nextMonth,
      handleDateSelection,
      selectToday,
      isDateInSelectedRange
    } = useDatePicker(props.initialYear, props.initialMonth)

    // 외부 클릭 감지
    const closeAllDatePickers = () => {
      if (isCalendarOpen.value) {
        datePickerButtonRef.value?.focus()
      }

      isCalendarOpen.value = false
      activeDropdown.value = null
    }

    // 외부 클릭 감지 활성화
    useClickOutside(datePickerAreaRef, closeAllDatePickers, '.calendar-conts')

    /**
     * 날짜 입력 클래스
     */
    const inputClasses = computed(() => {
      const classes = ['krds-input', 'datepicker', 'cal']

      if (props.size) {
        classes.push(props.size)
      }

      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 폼 콘텐츠 클래스
     */
    const formContsClasses = computed(() => {
      const classes = ['form-conts', 'calendar-conts']
      return classes
    })

    // ========================
    // Computed Properties
    // ========================

    /**
     * 캘린더 영역 클래스
     */
    const calendarAreaClasses = computed(() => ({
      'krds-calendar-area': true,
      active: isCalendarOpen.value
    }))

    const calendarGrid = computed<CalendarDay[][]>(() => {
      const year = currentYear.value
      const month = currentMonth.value
      const firstDate = new Date(year, month - 1, 1)
      const startDate = new Date(firstDate)

      // 첫 번째 날의 요일만큼 이전 달 날짜 추가 (일요일이 0)
      startDate.setDate(startDate.getDate() - firstDate.getDay())

      const weeks: CalendarDay[][] = []
      const currentDate = new Date(startDate)

      // 6주 생성
      for (let week = 0; week < 6; week++) {
        const days: CalendarDay[] = []

        for (let day = 0; day < 7; day++) {
          const dateString = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`
          const dayOfWeek = currentDate.getDay()

          days.push({
            day: currentDate.getDate(),
            dateString,
            isCurrentMonth: currentDate.getMonth() === month - 1,
            isToday: currentDate.toDateString() === new Date().toDateString(),
            isPrevMonth: currentDate.getMonth() < month - 1 || (currentDate.getMonth() === 11 && month === 1),
            isNextMonth: currentDate.getMonth() > month - 1 || (currentDate.getMonth() === 0 && month === 12),
            isSunday: dayOfWeek === 0,
            isSaturday: dayOfWeek === 6
          })

          currentDate.setDate(currentDate.getDate() + 1)
        }

        weeks.push(days)
      }

      return weeks
    })

    /**
     * 셀 클래스 계산
     */
    const getCellClasses = (day: CalendarDay) => {
      const classes: string[] = []

      // 이전/다음 달 날짜
      if (day.isPrevMonth) classes.push('old')
      if (day.isNextMonth) classes.push('new')

      // 오늘 날짜
      if (day.isToday) classes.push('today')

      // 일요일은 기본적으로 day-off
      if (day.isSunday) classes.push('day-off')

      // props로 전달받은 휴일 체크
      if (props.holidays?.includes(day.dateString)) {
        classes.push('day-off')
      }

      // props로 전달받은 이벤트 날짜 체크
      if (props.eventDates?.includes(day.dateString)) {
        classes.push('day-event')
      }

      // 선택된 날짜 범위 체크 (현재 월의 날짜만)
      if (day.isCurrentMonth) {
        const rangeInfo = isDateInSelectedRange(day.dateString)
        if (rangeInfo.isInRange) {
          classes.push('period')
          if (rangeInfo.isStart) classes.push('start')
          if (rangeInfo.isEnd) classes.push('end')
        }
      }

      return classes
    }

    /**
     * 액션 버튼 설정
     */
    const actionButtons = computed<ActionButton[]>(() => [
      {
        id: 'get-today',
        label: '오늘',
        class: 'text',
        variant: undefined,
        size: 'small' as const,
        handler: selectToday
      },
      {
        id: 'cancel-btn',
        label: '취소',
        class: undefined,
        variant: 'tertiary' as const,
        size: 'small' as const,
        handler: closeAllDatePickers
      },
      {
        id: 'confirm-btn',
        label: '확인',
        class: undefined,
        variant: 'primary' as const,
        size: 'small' as const,
        handler: confirmSelection
      }
    ])

    // ========================
    // Methods
    // ========================

    /**
     * 드롭다운 토글
     */
    const toggleDropdown = (type: 'year' | 'month') => {
      if (activeDropdown.value === type) {
        activeDropdown.value = null
      } else {
        activeDropdown.value = type
      }
    }

    /**
     * 연도 선택
     */
    const selectYear = (year: number) => {
      currentYear.value = year
      activeDropdown.value = null
    }

    /**
     * 월 선택
     */
    const selectMonth = (month: number) => {
      currentMonth.value = month
      activeDropdown.value = null
    }

    /**
     * 선택 확인
     */
    const confirmSelection = () => {
      if (selectedStartDate.value) {
        if (selectedEndDate.value && selectedStartDate.value !== selectedEndDate.value) {
          // 범위 선택
          const rangeValue = `${selectedStartDate.value} ~ ${selectedEndDate.value}`
          emit('update:modelValue', rangeValue)
        } else {
          // 단일 선택
          emit('update:modelValue', selectedStartDate.value)
        }
        closeAllDatePickers()
      }
    }

    /**
     * 캘린더 열기
     */
    const openDatePicker = () => {
      isCalendarOpen.value = true
      activeDropdown.value = null

      // 포커스 이동
      setTimeout(() => {
        const calendarWrap = datePickerAreaRef.value?.querySelector('.calendar-wrap') as HTMLElement
        calendarWrap?.focus()
      }, 50)
    }

    /**
     * 날짜 선택기 토글
     */
    const handleDatePickerToggle = () => {
      if (isCalendarOpen.value) {
        closeAllDatePickers()
      } else {
        openDatePicker()
      }
    }

    /**
     * 키보드 이벤트 처리
     */
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        if (activeDropdown.value) {
          activeDropdown.value = null
        } else if (isCalendarOpen.value) {
          closeAllDatePickers()
        }
      }
    }

    // ========================
    // Event Handlers
    // ========================

    /**
     * 입력 이벤트 핸들러
     */
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
      emit('input', event)
    }

    /**
     * 변경 이벤트 핸들러
     */
    const handleChange = (event: Event) => {
      emit('change', event)
    }

    /**
     * 포커스 이벤트 핸들러
     */
    const handleFocus = (event: FocusEvent) => {
      emit('focus', event)
    }

    /**
     * 블러 이벤트 핸들러
     */
    const handleBlur = (event: FocusEvent) => {
      emit('blur', event)
    }

    // ========================
    // Render
    // ========================

    /**
     * 연/월 드롭다운
     */
    const renderSwitchDropdown = (type: 'year' | 'month') => {
      const isYear = type === 'year'
      const options = isYear ? yearOptions.value : monthOptions.value
      const currentValue = isYear ? currentYear.value : currentMonth.value
      const format = (value: number) => (isYear ? `${value}년` : `${value.toString().padStart(2, '0')}월`)

      return h('div', { class: 'calendar-drop-down' }, [
        h(
          'button',
          {
            type: 'button',
            class: `btn-cal-switch ${type}`,
            'aria-label': isYear ? '연도 선택' : '월 선택',
            'aria-expanded': activeDropdown.value === type,
            onClick: () => toggleDropdown(type)
          },
          format(currentValue)
        ),
        withDirectives(
          h('div', { class: `calendar-select ${isYear ? 'calendar-year-wrap' : 'calendar-mon-wrap'}` }, [
            h(
              'ul',
              { class: `sel ${type}` },
              options.map(option =>
                h('li', { key: option }, [
                  h(
                    'button',
                    {
                      type: 'button',
                      class: { active: option === currentValue },
                      onClick: () => (isYear ? selectYear(option) : selectMonth(option))
                    },
                    format(option)
                  )
                ])
              )
            )
          ]),
          [[vShow, activeDropdown.value === type]]
        )
      ])
    }

    /**
     * 캘린더 표
     */
    const renderCalendarTable = () =>
      h('table', { class: 'calendar-tbl' }, [
        h('caption', null, `${currentYear.value}년 ${currentMonth.value.toString().padStart(2, '0')}월`),
        h('thead', null, [
          h(
            'tr',
            null,
            WEEKDAY_LABELS.map(label => h('th', null, label))
          )
        ]),
        h(
          'tbody',
          null,
          calendarGrid.value.map((week, weekIndex) =>
            h(
              'tr',
              { key: weekIndex },
              week.map((day, dayIndex) =>
                h('td', { key: dayIndex, class: getCellClasses(day), 'data-date': day.dateString }, [
                  h(
                    'button',
                    {
                      type: 'button',
                      class: 'btn-set-date',
                      'aria-pressed': isDateInSelectedRange(day.dateString).isInRange ? 'true' : 'false',
                      onClick: () => handleDateSelection(day.dateString)
                    },
                    [h('span', null, String(day.day))]
                  )
                ])
              )
            )
          )
        )
      ])

    return () =>
      h('div', { class: 'form-conts' }, [
        h('div', { class: formContsClasses.value }, [
          h('div', { class: 'calendar-input' }, [
            h('input', {
              id: props.id,
              name: props.name,
              class: inputClasses.value,
              placeholder: props.placeholder,
              value: props.modelValue,
              readonly: props.readonly,
              disabled: props.disabled,
              required: props.required,
              autofocus: props.autofocus,
              type: 'text',
              onInput: handleInput,
              onChange: handleChange,
              onFocus: handleFocus,
              onBlur: handleBlur
            }),
            h(
              'button',
              {
                ref: datePickerButtonRef,
                class: `krds-btn ${props.size || 'medium'} icon form-btn-datepicker`,
                disabled: props.disabled,
                'aria-expanded': isCalendarOpen.value,
                type: 'button',
                onClick: handleDatePickerToggle
              },
              [h('span', { class: 'sr-only' }, '달력 열기'), h('i', { class: 'svg-icon ico-calendar' })]
            )
          ]),
          h('div', { ref: datePickerAreaRef, class: calendarAreaClasses.value }, [
            withDirectives(
              h(
                'div',
                {
                  class: 'calendar-wrap bottom',
                  'aria-label': '달력',
                  tabindex: '0',
                  onKeydown: handleKeydown
                },
                [
                  // 캘린더 헤더
                  h('div', { class: 'calendar-head' }, [
                    h('button', { type: 'button', class: 'btn-cal-move prev', onClick: prevMonth }, [
                      h('span', { class: 'sr-only' }, '이전 달')
                    ]),
                    h('div', { class: 'calendar-switch-wrap' }, [renderSwitchDropdown('year'), renderSwitchDropdown('month')]),
                    h('button', { type: 'button', class: 'btn-cal-move next', onClick: nextMonth }, [
                      h('span', { class: 'sr-only' }, '다음 달')
                    ])
                  ]),
                  // 캘린더 바디
                  h('div', { class: 'calendar-body' }, [h('div', { class: 'calendar-table-wrap' }, [renderCalendarTable()])]),
                  // 캘린더 푸터
                  h('div', { class: 'calendar-footer' }, [
                    h(
                      'div',
                      { class: 'calendar-btn-wrap' },
                      actionButtons.value.map(action =>
                        h(
                          KrdsButton,
                          {
                            id: action.id,
                            key: action.id,
                            class: action.class,
                            variant: action.variant,
                            size: action.size,
                            onClick: action.handler
                          },
                          { default: () => action.label }
                        )
                      )
                    )
                  ])
                ]
              ),
              [[vShow, isCalendarOpen.value]]
            )
          ])
        ])
      ])
  }
})
