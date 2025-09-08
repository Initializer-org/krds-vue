import { defineComponent, computed, h } from 'vue'
import type { BaseFormProps } from '@/types'
import { generateId, classNames } from '@/utils'

/**
 * KRDS ToggleSwitch 컴포넌트 속성
 */
export interface KrdsToggleSwitchProps extends BaseFormProps {
  /** 모델 값 */
  modelValue?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 스위치 라벨 */
  label?: string
  /** 크기 */
  size?: 'medium' | 'large'
}

/**
 * KRDS ToggleSwitch 컴포넌트 이벤트
 */
export interface KrdsToggleSwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

export default defineComponent<KrdsToggleSwitchProps>({
  name: 'KrdsToggleSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: undefined
    },
    size: {
      type: String as () => 'medium' | 'large',
      default: 'medium',
      validator: (value: string) => ['medium', 'large'].includes(value)
    },
    name: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
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
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    /**
     * 스위치 상태 계산
     */
    const isChecked = computed(() => props.modelValue)

    /**
     * 스위치 컨테이너 클래스 계산
     */
    const containerClasses = computed(() => {
      return classNames('krds-form-toggle-switch', props.size, props.class)
    })

    /**
     * 스위치 토글 핸들러
     */
    const handleToggle = (event: Event) => {
      if (props.disabled) {
        return
      }

      const target = event.target as HTMLInputElement
      const newValue = target.checked

      emit('update:modelValue', newValue)
      emit('change', newValue)
    }

    /**
     * input ID 생성
     */
    const inputId = computed(() => {
      return props.id || generateId('toggle-switch')
    })

    return () => {
      return h(
        'div',
        {
          class: containerClasses.value
        },
        [
          h('input', {
            type: 'checkbox',
            id: inputId.value,
            name: props.name,
            checked: isChecked.value,
            disabled: props.disabled,
            onChange: handleToggle,
            ...attrs
          }),
          h(
            'label',
            {
              for: inputId.value
            },
            [
              h(
                'span',
                {
                  class: 'switch-toggle'
                },
                [h('i')]
              ),
              props.label || ''
            ]
          )
        ]
      )
    }
  }
})
