import { defineComponent, computed, h } from 'vue'
import type { BaseComponentProps, Size, Variant } from '@/types'

/**
 * KRDS Button 컴포넌트 속성
 */
export interface KrdsButtonProps extends BaseComponentProps {
  /** 버튼 타입 */
  type?: 'button' | 'submit' | 'reset'
  /** 버튼 크기 */
  size?: Size
  /** 버튼 변형 */
  variant?: Variant
  /** 아이콘 전용 버튼 */
  icon?: boolean
  /** 테두리 스타일 (아이콘 버튼용) */
  border?: boolean
  /** Pure 버튼 여부 (가상클래스 상태 시 컬러 유지) */
  pure?: boolean
  /** 텍스트 버튼 스타일 */
  text?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
}

/**
 * KRDS Button 컴포넌트 이벤트
 */
export interface KrdsButtonEmits {
  (e: 'click', event: MouseEvent): void
}

export default defineComponent<KrdsButtonProps>({
  name: 'KrdsButton',
  props: {
    type: {
      type: String as () => 'button' | 'submit' | 'reset',
      default: 'button'
    },
    size: {
      type: String as () => Size,
      default: undefined
    },
    variant: {
      type: String as () => Variant,
      default: 'primary'
    },
    icon: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    pure: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    /**
     * 버튼 클래스 계산
     */
    const buttonClasses = computed(() => {
      const classes = ['krds-btn']

      // 아이콘 전용 클래스
      if (props.icon) {
        classes.push('icon')
      }

      // 테두리 클래스
      if (props.border) {
        classes.push('border')
      }

      // pure 클래스
      if (props.pure) {
        classes.push('pure')
      }

      // text 클래스
      if (props.text) {
        classes.push('text')
      }

      // 변형 클래스
      if (props.variant && !props.icon) {
        classes.push(props.variant)
      }

      // 크기 클래스 (KRDS 실제 규격: xsmall, small, medium, large, xlarge)
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
     * 클릭 핸들러
     */
    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event)
      }
    }

    return () =>
      h(
        'button',
        {
          type: props.type,
          class: buttonClasses.value,
          disabled: props.disabled,
          onClick: handleClick
        },
        slots.default?.()
      )
  }
})
