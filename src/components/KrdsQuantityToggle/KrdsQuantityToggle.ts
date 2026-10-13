import { defineComponent, computed, h, ref, useId } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS QuantityToggle 컴포넌트 속성
 */
export interface KrdsQuantityToggleProps extends BaseComponentProps {
  /** 수량 (없으면 최솟값) */
  modelValue?: number
  /** 레이블 (어떤 수량을 고르는지 안내) */
  label: string
  /** 레이블을 화면에서 숨김 (화면낭독기는 읽음) */
  hideLabel?: boolean
  /** 최솟값 */
  min?: number
  /** 최댓값 (KRDS 가이드: 기준값 포함 11단계 이내) */
  max?: number
  /** 세로형 (+ 버튼이 위) */
  vertical?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
}

/**
 * KRDS QuantityToggle 컴포넌트 이벤트
 */
export interface KrdsQuantityToggleEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}

/**
 * KRDS QuantityToggle 컴포넌트
 *
 * −/+ 버튼으로 정해진 범위 안에서 수량을 고르는 요소입니다. 최솟값·최댓값에 닿으면 해당 버튼이 비활성화됩니다.
 * 수량 값은 WAI-ARIA spinbutton이라 키보드로 ↑/↓(1씩), Home/End(최솟값/최댓값)로 바꿀 수 있습니다.
 *
 * @example
 * ```vue
 * <KrdsQuantityToggle v-model="count" label="관람 인원" :min="1" :max="10" />
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsQuantityToggle',
  props: {
    /** 수량 (없으면 최솟값) */
    modelValue: {
      type: Number,
      default: undefined
    },
    /** 레이블 (어떤 수량을 고르는지 안내) */
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
    /** 최댓값 (KRDS 가이드: 기준값 포함 11단계 이내) */
    max: {
      type: Number,
      default: 10
    },
    /** 세로형 (+ 버튼이 위) */
    vertical: {
      type: Boolean,
      default: false
    },
    /** 비활성화 여부 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 수량 값(spinbutton) 요소 ID */
    id: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 수량이 바뀔 때 (v-model) */
    'update:modelValue': (value: number) => true,
    /** 버튼·키보드로 수량을 바꿨을 때 */
    change: (value: number) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit }) {
    const labelId = `quantity-label-${useId()}`
    const valueRef = ref<HTMLElement | null>(null)
    const value = computed(() => props.modelValue ?? props.min)

    const update = (next: number) => {
      next = Math.min(props.max, Math.max(props.min, next))
      if (props.disabled || next === value.value) return
      emit('update:modelValue', next)
      emit('change', next)
    }

    // 버튼은 탭 순서에서 빼고(APG spinbutton), 누르면 초점을 수량 값으로 옮긴다.
    // 끝값에 닿아 버튼이 비활성화돼도 초점을 잃지 않고, 화면낭독기가 바뀐 값을 읽는다
    const step = (delta: number) => {
      update(value.value + delta)
      valueRef.value?.focus()
    }

    const keys: Record<string, () => number> = {
      ArrowUp: () => value.value + 1,
      ArrowDown: () => value.value - 1,
      Home: () => props.min,
      End: () => props.max
    }
    const handleKeydown = (event: KeyboardEvent) => {
      const next = keys[event.key]
      if (!next) return
      event.preventDefault()
      update(next())
    }

    const button = (delta: number, text: string, icon: string) =>
      h(
        'button',
        {
          type: 'button',
          class: 'krds-btn tertiary small btn-quantity',
          tabindex: -1,
          disabled: props.disabled || (delta < 0 ? value.value <= props.min : value.value >= props.max),
          onClick: () => step(delta)
        },
        [h('i', { class: `svg-icon ${icon}`, 'aria-hidden': 'true' }), h('span', { class: 'sr-only' }, `${props.label} ${text}`)]
      )

    return () => {
      const controls = [
        button(-1, '감소', 'ico-minus'),
        h(
          'span',
          {
            ref: valueRef,
            id: props.id,
            class: 'quantity-value',
            role: 'spinbutton',
            tabindex: props.disabled ? -1 : 0,
            'aria-labelledby': labelId,
            'aria-valuenow': value.value,
            'aria-valuemin': props.min,
            'aria-valuemax': props.max,
            'aria-disabled': props.disabled || undefined,
            onKeydown: handleKeydown
          },
          value.value
        ),
        button(1, '증가', 'ico-plus')
      ]
      // 세로형은 + 버튼이 위 (KRDS 가이드 모범 사례). 읽는 순서도 화면과 같게 DOM 순서를 뒤집는다
      if (props.vertical) controls.reverse()

      return h('div', { class: ['krds-quantity-toggle', { vertical: props.vertical, disabled: props.disabled }] }, [
        h('span', { id: labelId, class: props.hideLabel ? 'sr-only' : 'quantity-label' }, props.label),
        h('div', { class: 'quantity-control' }, controls)
      ])
    }
  }
})
