import { defineComponent, computed, h, useId } from 'vue'
import type { PropType } from 'vue'
import type { BaseComponentProps } from '@/types'

export type KrdsRangeSliderValuePosition = 'handle' | 'end'

/**
 * KRDS RangeSlider 컴포넌트 속성
 */
export interface KrdsRangeSliderProps extends BaseComponentProps {
  /** 선택 값 (없으면 최솟값) */
  modelValue?: number
  /** 레이블 (어떤 값을 고르는지 안내) */
  label: string
  /** 레이블을 화면에서 숨김 (화면낭독기는 읽음) */
  hideLabel?: boolean
  /** 최솟값 */
  min?: number
  /** 최댓값 */
  max?: number
  /** 단계 (KRDS 가이드: 전체 범위의 10~20%) */
  step?: number
  /** 값을 글자로 바꾸는 함수 (선택 값·범위 값 표시와 화면낭독기 aria-valuetext에 사용) */
  valueText?: (value: number) => string
  /** 선택 값 위치: 핸들 위 말풍선(handle) 또는 슬라이더 끝(end) */
  valuePosition?: KrdsRangeSliderValuePosition
}

/**
 * KRDS RangeSlider 컴포넌트 이벤트
 */
export interface KrdsRangeSliderEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}

/** 단계 눈금은 이 개수 이하일 때만 그린다 (더 많으면 눈금이 빽빽해 의미가 없음) */
const MAX_TICKS = 20

/**
 * KRDS RangeSlider 컴포넌트
 *
 * 정해진 범위에서 상대적인 값을 고르는 슬라이더입니다. 조작·키보드·화면낭독기는 기본 `<input type="range">`가 맡고,
 * 트랙·단계 눈금·선택 값·범위 값을 KRDS 도안대로 표시합니다.
 *
 * @example
 * ```vue
 * <KrdsRangeSlider v-model="volume" label="음량" :step="10" :value-text="v => `${v}%`" />
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsRangeSlider',
  props: {
    /** 선택 값 (없으면 최솟값) */
    modelValue: {
      type: Number,
      default: undefined
    },
    /** 레이블 (어떤 값을 고르는지 안내) */
    label: {
      type: String,
      required: true
    },
    /** 레이블을 화면에서 숨김 (화면낭독기는 읽음) */
    hideLabel: {
      type: Boolean,
      default: false
    },
    /** 최솟값 */
    min: {
      type: Number,
      default: 0
    },
    /** 최댓값 */
    max: {
      type: Number,
      default: 100
    },
    /** 단계 (KRDS 가이드: 전체 범위의 10~20%) */
    step: {
      type: Number,
      default: 1
    },
    /** 값을 글자로 바꾸는 함수 (선택 값·범위 값 표시와 화면낭독기 aria-valuetext에 사용) */
    valueText: {
      type: Function as PropType<(value: number) => string>,
      default: undefined
    },
    /** 선택 값 위치: 핸들 위 말풍선(handle) 또는 슬라이더 끝(end) */
    valuePosition: {
      type: String as PropType<KrdsRangeSliderValuePosition>,
      default: 'handle'
    },
    /** 슬라이더(input) 요소 ID */
    id: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 값이 바뀔 때 (끄는 동안 계속, v-model) */
    'update:modelValue': (value: number) => true,
    /** 값을 정했을 때 (핸들을 놓거나 키보드로 바꾼 뒤) */
    change: (value: number) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit }) {
    const generatedId = `range-slider-${useId()}`
    const inputId = computed(() => props.id ?? generatedId)
    const value = computed(() => props.modelValue ?? props.min)
    const text = (v: number) => (props.valueText ? props.valueText(v) : String(v))
    const percent = computed(() => (props.max > props.min ? (value.value - props.min) / (props.max - props.min) : 0))
    // 양 끝을 뺀 단계 눈금 위치 (0~1)
    const ticks = computed(() => {
      const count = Math.round((props.max - props.min) / props.step)
      return count > 1 && count <= MAX_TICKS ? Array.from({ length: count - 1 }, (_, i) => (i + 1) / count) : []
    })

    const read = (event: Event) => Number((event.target as HTMLInputElement).value)

    return () => {
      // 선택 값·범위 값은 화면 표시용 (화면낭독기는 슬라이더의 aria-valuetext로 읽음)
      const current = h('span', { class: 'range-value', 'aria-hidden': 'true' }, text(value.value))
      const field = h('div', { class: 'range-field' }, [
        h('div', { class: 'range-track' }, [
          h('span', { class: 'range-fill' }),
          ...ticks.value.map(position => h('span', { class: 'range-tick', style: { '--krds-range-slider--tick': position } }))
        ]),
        props.valuePosition === 'handle' ? current : null,
        h('input', {
          id: inputId.value,
          class: 'range-input',
          type: 'range',
          min: props.min,
          max: props.max,
          step: props.step,
          value: value.value,
          'aria-valuetext': props.valueText ? text(value.value) : undefined,
          onInput: (event: Event) => emit('update:modelValue', read(event)),
          onChange: (event: Event) => emit('change', read(event))
        }),
        h('div', { class: 'range-limits', 'aria-hidden': 'true' }, [h('span', text(props.min)), h('span', text(props.max))])
      ])

      return h(
        'div',
        {
          class: ['krds-range-slider', `value-${props.valuePosition}`],
          style: { '--krds-range-slider--percent': percent.value }
        },
        [
          h('label', { for: inputId.value, class: props.hideLabel ? 'sr-only' : 'range-label' }, props.label),
          props.valuePosition === 'end' ? h('div', { class: 'range-body' }, [field, current]) : field
        ]
      )
    }
  }
})
