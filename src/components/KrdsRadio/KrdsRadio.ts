import { defineComponent, computed, h, SlotsType } from 'vue'
import type { BaseFormProps } from '@/types'
import { generateId, classNames } from '@/utils'

/**
 * KRDS Radio 컴포넌트 속성
 */
export interface KrdsRadioProps extends BaseFormProps {
  /** 모델 값 */
  modelValue?: string | number | boolean
  /** 라디오 값 */
  value: string | number | boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 크기 */
  size?: 'medium' | 'large'
  /** Chip 스타일 여부 */
  chip?: boolean
}

/**
 * KRDS Radio 컴포넌트 이벤트
 */
export interface KrdsRadioEmits {
  (e: 'update:modelValue', value: string | number | boolean): void
}

export default defineComponent<KrdsRadioProps>({
  name: 'KrdsRadio',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: undefined
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as () => 'medium' | 'large',
      default: 'medium',
      validator: (value: string) => ['medium', 'large'].includes(value)
    },
    chip: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: undefined
    },
    class: {
      type: String,
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  slots: Object as SlotsType<{
    default?: () => unknown // Default slot with props
    description?: () => unknown // Named slot without props
  }>,
  setup(props, { emit, attrs, slots }) {
    /**
     * 선택 상태 계산
     */
    const isChecked = computed(() => {
      return props.modelValue === props.value
    })

    /**
     * 컨테이너 클래스 계산
     */
    const containerClasses = computed(() => {
      const baseClass = props.chip ? 'krds-form-chip' : 'krds-form-check'
      return classNames(baseClass, props.size, props.class)
    })

    /**
     * 라디오 변경 핸들러
     */
    const handleChange = (event: Event) => {
      if (props.disabled) {
        return
      }

      const target = event.target as HTMLInputElement
      if (target.checked) {
        emit('update:modelValue', props.value)
      }
    }

    /**
     * input ID 생성
     */
    const inputId = computed(() => {
      return props.id || generateId('radio')
    })

    /**
     * name 속성 계산
     */
    const inputName = computed(() => {
      return props.name || generateId('radio-group')
    })

    return () => {
      const children = [
        h('input', {
          type: 'radio',
          id: inputId.value,
          name: inputName.value,
          value: String(props.value),
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
