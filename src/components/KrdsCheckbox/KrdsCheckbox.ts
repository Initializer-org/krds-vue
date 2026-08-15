import { defineComponent, computed, h, SlotsType, useId, type VNode } from 'vue'
import type { BaseFormProps } from '@/types'
import { classNames } from '@/utils'

/**
 * KRDS Checkbox 컴포넌트 속성
 */
export interface KrdsCheckboxProps extends BaseFormProps {
  /** 모델 값 */
  modelValue?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 크기 */
  size?: 'medium' | 'large'
  /** Chip 스타일 여부 */
  chip?: boolean
}

/**
 * KRDS Checkbox 컴포넌트 이벤트
 */
export interface KrdsCheckboxEmits {
  (e: 'update:modelValue', value: boolean): void
}

export default defineComponent({
  name: 'KrdsCheckbox',
  props: {
    /** 모델 값 */
    modelValue: {
      type: Boolean,
      default: false
    },
    /** 비활성화 여부 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 크기 */
    size: {
      type: String as () => 'medium' | 'large',
      default: 'medium',
      validator: (value: string) => ['medium', 'large'].includes(value)
    },
    /** Chip 스타일 여부 */
    chip: {
      type: Boolean,
      default: false
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
    'update:modelValue': (value: boolean) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  slots: Object as SlotsType<{
    default?: () => VNode[] // Default slot with props
    description?: () => VNode[] // Description slot without props
  }>,
  setup(props, { emit, attrs, slots }) {
    const generatedInputId = `checkbox-${useId()}`

    /**
     * 체크 상태 계산
     */
    const isChecked = computed(() => {
      return props.modelValue
    })

    /**
     * 컨테이너 클래스 계산
     */
    const containerClasses = computed(() => {
      const baseClass = props.chip ? 'krds-form-chip' : 'krds-form-check'
      return classNames(baseClass, props.size, props.class)
    })

    /**
     * 체크박스 변경 핸들러
     */
    const handleChange = (event: Event) => {
      if (props.disabled) {
        return
      }

      const target = event.target as HTMLInputElement
      const newValue = target.checked

      emit('update:modelValue', newValue)
    }

    /**
     * input ID 생성
     */
    const inputId = computed(() => {
      return props.id || generatedInputId
    })

    return () => {
      const children = [
        h('input', {
          type: 'checkbox',
          id: inputId.value,
          checked: isChecked.value,
          disabled: props.disabled,
          onChange: handleChange,
          ...attrs
        }),
        h(
          'label',
          {
            for: inputId.value
          },
          slots.default?.()
        )
      ]

      // description 슬롯이 있고 chip이 false일 때만 추가
      if (slots.description && !props.chip) {
        children.push(h('div', { class: 'krds-form-check-cnt' }, h('p', { class: 'krds-form-check-p' }, slots.description())))
      }

      return h(
        'div',
        {
          class: containerClasses.value
        },
        children
      )
    }
  }
})
