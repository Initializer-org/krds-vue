import { defineComponent, computed, h } from 'vue'
import type { BaseFormProps, Size } from '@/types'

/**
 * KRDS Select 옵션 타입
 */
export interface SelectOption {
  /** 옵션 값 */
  value: string | number
  /** 옵션 레이블 */
  label: string
  /** 비활성화 여부 */
  disabled?: boolean
}

/**
 * KRDS Select 컴포넌트 속성
 */
export interface KrdsSelectProps extends BaseFormProps {
  /** 선택된 값 */
  modelValue?: string | number | null
  /** 선택 크기 */
  size?: Size
  /** 타이틀 */
  title?: string
  /** 옵션 목록 */
  options?: SelectOption[]
  /** 플레이스홀더 */
  placeholder?: string
  /** 비활성화 여부 */
  disabled?: boolean
  /** 입력 상태 */
  state?: 'default' | 'error' | 'success' | 'information'
  /** 정렬 스타일 여부 */
  sort?: boolean
}

/**
 * KRDS Select 컴포넌트 이벤트
 */
export interface KrdsSelectEmits {
  (e: 'update:modelValue', value: string | number | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

export default defineComponent<KrdsSelectProps>({
  name: 'KrdsSelect',
  props: {
    modelValue: {
      type: [String, Number, null] as unknown as () => string | number | null,
      default: null
    },
    size: {
      type: String as () => Size,
      default: 'medium'
    },
    title: {
      type: String,
      default: undefined
    },
    options: {
      type: Array as () => SelectOption[],
      default: () => []
    },
    placeholder: {
      type: String,
      default: '선택'
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
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: undefined
    },
    state: {
      type: String as () => 'default' | 'error' | 'success' | 'information',
      default: 'default'
    },
    sort: {
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
  emits: ['update:modelValue', 'focus', 'blur'],
  setup(props, { emit, slots }) {
    /**
     * Select 클래스 계산
     */
    const selectClasses = computed(() => {
      const classes = []

      // 정렬 스타일
      if (props.sort) {
        classes.push('krds-form-select-sort')
      } else {
        classes.push('krds-form-select')
      }

      // 크기 클래스
      if (props.size) {
        classes.push(props.size)
      }

      // 사용자 정의 클래스
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 변경 이벤트 핸들러
     */
    const handleChange = (event: Event) => {
      const target = event.target as HTMLSelectElement
      const value = target.value === '' ? null : target.value
      emit('update:modelValue', value)
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

    /**
     * Select 속성 계산
     */
    const selectProps = computed(() => {
      return {
        class: selectClasses.value,
        value: props.modelValue ?? '',
        title: props.title || props.placeholder,
        name: props.name,
        id: props.id,
        required: props.required,
        disabled: props.disabled || props.readonly,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur
      }
    })

    /**
     * form-conts 클래스 계산
     */
    const formContsClasses = computed(() => {
      const classList = ['form-conts']

      if (props.state !== 'default') {
        classList.push(`is-${props.state}`)
      }

      return classList
    })

    /**
     * 옵션 렌더링
     */
    const renderOptions = () => {
      const optionElements = []

      // 플레이스홀더 옵션 (값이 없을 때만)
      if (props.placeholder && !props.modelValue) {
        optionElements.push(h('option', { value: '', disabled: true, selected: true }, props.placeholder))
      }

      // 옵션 목록
      if (props.options && props.options.length > 0) {
        props.options.forEach(option => {
          optionElements.push(
            h(
              'option',
              {
                value: option.value,
                disabled: option.disabled,
                selected: option.value === props.modelValue
              },
              option.label
            )
          )
        })
      }

      // 슬롯으로 전달된 옵션들
      if (slots.default) {
        optionElements.push(...slots.default())
      }

      return optionElements
    }

    return () => {
      const selectElement = h('select', selectProps.value, renderOptions())

      if (props.sort) {
        return selectElement
      }

      return h('div', { class: formContsClasses.value }, [selectElement])
    }
  }
})
