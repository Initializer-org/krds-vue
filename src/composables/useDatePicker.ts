import { computed, ref } from 'vue'

export interface DatePickerState {
  currentYear: number
  currentMonth: number
  selectedStartDate: string | null
  selectedEndDate: string | null
}

export function useDatePicker(initialYear?: number, initialMonth?: number) {
  const today = new Date()
  const currentYear = ref(initialYear || today.getFullYear())
  const currentMonth = ref(initialMonth || today.getMonth() + 1)
  const selectedStartDate = ref<string | null>(null)
  const selectedEndDate = ref<string | null>(null)
  const activeDateSelector = ref<HTMLElement | null>(null)

  /**
   * 연도 옵션 생성 (현재 년도 기준 ±10년)
   */
  const yearOptions = computed(() => {
    const currentYearValue = today.getFullYear()
    const years = []
    for (let i = currentYearValue - 10; i <= currentYearValue + 10; i++) {
      years.push(i)
    }
    return years
  })

  /**
   * 월 옵션 생성 (1~12월)
   */
  const monthOptions = computed(() => {
    return Array.from({ length: 12 }, (_, i) => i + 1)
  })

  /**
   * 선택된 날짜 범위 초기화
   */
  const clearDateSelection = () => {
    selectedStartDate.value = null
    selectedEndDate.value = null
  }

  /**
   * 이전 달로 이동
   */
  const prevMonth = () => {
    if (currentMonth.value === 1) {
      currentMonth.value = 12
      currentYear.value -= 1
    } else {
      currentMonth.value -= 1
    }
  }

  /**
   * 다음 달로 이동
   */
  const nextMonth = () => {
    if (currentMonth.value === 12) {
      currentMonth.value = 1
      currentYear.value += 1
    } else {
      currentMonth.value += 1
    }
  }

  /**
   * 날짜 선택 처리
   */
  const handleDateSelection = (dateString: string, isSingle = false) => {
    if (isSingle) {
      selectedStartDate.value = dateString
      selectedEndDate.value = dateString
    } else {
      if (!selectedStartDate.value || (selectedStartDate.value && selectedEndDate.value)) {
        selectedStartDate.value = dateString
        selectedEndDate.value = null
      } else {
        const startDate = new Date(selectedStartDate.value.replace(/\./g, '-'))
        const endDate = new Date(dateString.replace(/\./g, '-'))

        if (endDate < startDate) {
          selectedStartDate.value = dateString
          selectedEndDate.value = null
        } else {
          selectedEndDate.value = dateString
        }
      }
    }
  }

  /**
   * 오늘 날짜 선택
   */
  const selectToday = () => {
    const todayString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`
    handleDateSelection(todayString, true)
  }

  /**
   * 날짜가 선택된 범위에 포함되는지 확인
   */
  const isDateInSelectedRange = (dateString: string) => {
    if (!selectedStartDate.value || !selectedEndDate.value) {
      return { isInRange: false, isStart: false, isEnd: false }
    }

    const currentDate = new Date(dateString.replace(/\./g, '-'))
    const startDate = new Date(selectedStartDate.value.replace(/\./g, '-'))
    const endDate = new Date(selectedEndDate.value.replace(/\./g, '-'))

    const isStart = dateString === selectedStartDate.value
    const isEnd = dateString === selectedEndDate.value
    const isInRange = currentDate >= startDate && currentDate <= endDate

    return { isInRange, isStart, isEnd }
  }

  return {
    // State
    currentYear,
    currentMonth,
    selectedStartDate,
    selectedEndDate,
    activeDateSelector,

    // Computed
    yearOptions,
    monthOptions,

    // Methods
    clearDateSelection,
    prevMonth,
    nextMonth,
    handleDateSelection,
    selectToday,
    isDateInSelectedRange
  }
}
