import { defineComponent, computed, h } from 'vue'
import type { BaseFormProps, Size, InputType } from '@/types'
import KrdsSpinner from '@/components/KrdsSpinner/KrdsSpinner'

/**
 * KRDS Input 컴포넌트 속성
 */
export interface KrdsInputProps extends BaseFormProps {
  /** 입력값 */
  modelValue?: string | number
  /** 입력 타입 */
  type?: InputType
  /** 입력 크기 */
  size?: Size
  /** 플레이스홀더 */
  placeholder?: string
  /** 최대 글자 수 */
  maxlength?: number
  /** 최소 글자 수 */
  minlength?: number
  /** 최대값 (number 타입용) */
  max?: number
  /** 최소값 (number 타입용) */
  min?: number
  /** 단계값 (number 타입용) */
  step?: number
  /** 자동완성 */
  autocomplete?: string
  /** 자동 포커스 */
  autofocus?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 입력 상태 */
  state?: 'default' | 'error' | 'success' | 'information'
  /** 아이콘 (있을 때 btn-ico-wrap 클래스 적용) */
  icon?: boolean
  /** 로딩 상태 */
  loading?: boolean
}

/**
 * KRDS Input 컴포넌트 이벤트
 */
export interface KrdsInputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
}

export default defineComponent<KrdsInputProps>({
  name: 'KrdsInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: undefined
    },
    type: {
      type: String as () => InputType,
      default: 'text'
    },
    size: {
      type: String as () => Size,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    maxlength: {
      type: Number,
      default: undefined
    },
    minlength: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    min: {
      type: Number,
      default: undefined
    },
    step: {
      type: Number,
      default: undefined
    },
    autocomplete: {
      type: String,
      default: undefined
    },
    autofocus: {
      type: Boolean,
      default: false
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
    icon: {
      type: Boolean,
      default: false
    },
    loading: {
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
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'keydown', 'keyup'],
  setup(props, { emit, slots }) {
    /**
     * 입력 필드 클래스 계산
     */
    const inputClasses = computed(() => {
      const classes = ['krds-input']

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
     * 입력 이벤트 핸들러
     */
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      const value = props.type === 'number' ? Number(target.value) : target.value
      emit('update:modelValue', value)
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

    /**
     * 키다운 이벤트 핸들러
     */
    const handleKeydown = (event: KeyboardEvent) => {
      emit('keydown', event)
    }

    /**
     * 키업 이벤트 핸들러
     */
    const handleKeyup = (event: KeyboardEvent) => {
      emit('keyup', event)
    }

    /**
     * 입력 필드 속성 계산
     */
    const inputProps = computed(() => {
      const attrs: Record<string, unknown> = {
        type: props.type,
        class: inputClasses.value,
        value: props.modelValue,
        placeholder: props.placeholder,
        name: props.name,
        id: props.id,
        required: props.required,
        readonly: props.readonly,
        disabled: props.disabled,
        autocomplete: props.autocomplete,
        autofocus: props.autofocus,
        onInput: handleInput,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeydown: handleKeydown,
        onKeyup: handleKeyup
      }

      // 문자 길이 제한
      if (props.maxlength !== undefined) {
        attrs.maxlength = props.maxlength
      }
      if (props.minlength !== undefined) {
        attrs.minlength = props.minlength
      }

      // 숫자 범위 및 단계
      if (props.type === 'number') {
        if (props.max !== undefined) {
          attrs.max = props.max
        }
        if (props.min !== undefined) {
          attrs.min = props.min
        }
        if (props.step !== undefined) {
          attrs.step = props.step
        }
      }

      return attrs
    })

    /**
     * form-conts 클래스 계산
     */
    const formContsClasses = computed(() => {
      const classList = ['form-conts']

      if (props.state !== 'default') {
        classList.push(`is-${props.state}`)
      }

      if (props.icon) {
        classList.push('btn-ico-wrap')
      }

      return classList
    })

    return () => {
      const children = [h('input', inputProps.value)]

      // 로딩 상태일 때 스피너 추가
      if (props.loading) {
        return h('div', { class: formContsClasses.value }, [h('div', { class: 'form-spinner' }, [...children, h(KrdsSpinner)])])
      }

      // 디폴트 슬롯이 있으면 추가 (아이콘 버튼들)
      if (slots.default) {
        children.push(...slots.default())
      }

      return h('div', { class: formContsClasses.value }, children)
    }
  }
})
