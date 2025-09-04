import { defineComponent, computed, ref, watch, h } from 'vue'
import type { Size } from '@/types'

/**
 * KRDS FormTextarea 컴포넌트 속성
 */
export interface KrdsFormTextareaProps {
  /** CSS 클래스 */
  class?: string
  /** HTML ID */
  id?: string
  /** 폼 필드 이름 */
  name?: string
  /** 필수 입력 여부 */
  required?: boolean
  /** 읽기 전용 여부 */
  readonly?: boolean
  /** 입력값 */
  modelValue?: string
  /** 입력 크기 */
  size?: Size
  /** 플레이스홀더 */
  placeholder?: string
  /** 최대 글자 수 */
  maxlength?: number
  /** 최소 글자 수 */
  minlength?: number
  /** 행 수 */
  rows?: number
  /** 열 수 */
  cols?: number
  /** 자동 포커스 */
  autofocus?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 입력 상태 */
  state?: 'default' | 'error' | 'success' | 'information'
  /** 글자 수 표시 여부 */
  showCount?: boolean
  /** 리사이즈 가능 여부 */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

/**
 * KRDS FormTextarea 컴포넌트 이벤트
 */
export interface KrdsFormTextareaEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
}

export default defineComponent<KrdsFormTextareaProps>({
  name: 'KrdsFormTextarea',
  props: {
    modelValue: {
      type: String,
      default: ''
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
    rows: {
      type: Number,
      default: 4
    },
    cols: {
      type: Number,
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
    state: {
      type: String as () => 'default' | 'error' | 'success' | 'information',
      default: 'default'
    },
    showCount: {
      type: Boolean,
      default: true
    },
    resize: {
      type: String as () => 'none' | 'both' | 'horizontal' | 'vertical',
      default: 'vertical'
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
  setup(props, { emit }) {
    const currentLength = ref(0)

    /**
     * 현재 글자 수 업데이트
     */
    watch(
      () => props.modelValue,
      newValue => {
        currentLength.value = (newValue || '').length
      },
      { immediate: true }
    )

    /**
     * textarea 클래스 계산
     */
    const textareaClasses = computed(() => {
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
     * textarea 스타일 계산
     */
    const textareaStyles = computed(() => {
      const styles: Record<string, string> = {}

      if (props.resize) {
        styles.resize = props.resize
      }

      return styles
    })

    /**
     * 입력 이벤트 핸들러
     */
    const handleInput = (event: Event) => {
      const target = event.target as HTMLTextAreaElement
      const value = target.value
      currentLength.value = value.length
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
     * textarea 속성 계산
     */
    const textareaProps = computed(() => {
      const attrs: Record<string, unknown> = {
        class: textareaClasses.value,
        style: textareaStyles.value,
        value: props.modelValue,
        placeholder: props.placeholder,
        name: props.name,
        id: props.id,
        required: props.required,
        readonly: props.readonly,
        disabled: props.disabled,
        autofocus: props.autofocus,
        rows: props.rows,
        cols: props.cols,
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

      return classList
    })

    /**
     * textarea-wrap 클래스 계산
     */
    const textareaWrapClasses = computed(() => {
      return ['textarea-wrap']
    })

    /**
     * 글자 수 표시 계산
     */
    const countDisplay = computed(() => {
      if (!props.showCount) return null

      const current = currentLength.value
      const max = props.maxlength

      return {
        current,
        max: max || ''
      }
    })

    return () => {
      const children = [h('textarea', textareaProps.value)]

      // 글자 수 표시 추가
      if (countDisplay.value) {
        children.push(
          h('p', { class: 'textarea-count' }, [
            h('span', { class: 'count-now' }, countDisplay.value.current),
            h('span', { class: 'count-total' }, countDisplay.value.max ? `/${countDisplay.value.max}` : '')
          ])
        )
      }

      return h('div', { class: formContsClasses.value }, [h('div', { class: textareaWrapClasses.value }, children)])
    }
  }
})
