import { defineComponent, computed, h } from 'vue'
import type { BaseComponentProps, Size } from '@/types'

/**
 * KRDS Badge 컴포넌트 속성
 */
type ColorVariant = 'primary' | 'secondary' | 'gray' | 'point' | 'danger' | 'warning' | 'success' | 'information' | 'disabled'

export interface KrdsBadgeProps extends BaseComponentProps {
  /** 배지 타입 */
  type?: 'outline' | 'bg' | 'bg-light'
  /** 배지 컬러 */
  color?: ColorVariant
  /** 넘버 여부 */
  number?: boolean
  /** 배지 크기 */
  size?: 'large' | 'medium' | 'small'
}

/**
 * KRDS Badge 컴포넌트 이벤트
 */
export interface KrdsBadgeEmits {
  (e: 'click', event: MouseEvent): void
}

export default defineComponent<KrdsBadgeProps>({
  name: 'KrdsBadge',
  props: {
    type: {
      type: String as () => 'outline' | 'bg' | 'bg-light',
      default: 'outline'
    },
    color: {
      type: String as () => ColorVariant,
      default: 'primary'
    },
    size: {
      type: String as () => Size,
      default: 'large'
    },
    number: {
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
     * 배지 클래스 계산
     */
    const buttonClasses = computed(() => {
      const classes = ['krds-badge']

      // 타입과 컬러 조합 클래스
      classes.push(`${props.type}-${props.color}`)

      // 크기 클래스 (KRDS 실제 규격:  small, medium, large)
      if (props.size) {
        classes.push(props.size)
      }

      // 넘버 클래스
      if (props.number) {
        classes.push('number')
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
      emit('click', event)
    }

    return () =>
      h(
        'span',
        {
          type: props.type,
          color: props.color,
          size: props.size,
          number: props.number,
          class: buttonClasses.value,
          onClick: handleClick
        },
        slots.default?.()
      )
  }
})
