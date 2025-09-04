import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS FormHint 컴포넌트 속성
 */
export interface KrdsFormHintProps extends BaseComponentProps {
  /** 힌트 타입 */
  type?: 'hint' | 'error' | 'success' | 'information'
}

/**
 * KRDS FormHint 컴포넌트 이벤트
 */
export interface KrdsFormHintEmits {
  (e: 'click', event: MouseEvent): void
}

export default defineComponent<KrdsFormHintProps>({
  name: 'KrdsFormHint',
  props: {
    type: {
      type: String as () => 'hint' | 'error' | 'success' | 'information',
      default: 'hint'
    },
    class: {
      type: String,
      default: undefined
    },
    style: {
      type: [String, Object],
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    /**
     * 클릭 핸들러
     */
    const handleClick = (event: MouseEvent) => {
      emit('click', event)
    }

    /**
     * 클래스 계산
     */
    const classes = () => {
      let baseClass: string

      switch (props.type) {
        case 'error':
          baseClass = 'form-hint-invalid'
          break
        case 'success':
          baseClass = 'form-hint-success'
          break
        case 'information':
          baseClass = 'form-hint-information'
          break
        default:
          baseClass = 'form-hint'
          break
      }

      return props.class ? `${baseClass} ${props.class}` : baseClass
    }

    return () =>
      h(
        'p',
        {
          id: props.id,
          class: classes(),
          style: props.style,
          onClick: handleClick
        },
        slots.default?.()
      )
  }
})
