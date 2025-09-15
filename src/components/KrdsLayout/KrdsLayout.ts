import { computed, defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Layout 컴포넌트 속성
 */
export interface KrdsLayoutProps extends BaseComponentProps {
  /** 레이아웃 ID */
  id?: string
}

export default defineComponent<KrdsLayoutProps>({
  name: 'KrdsLayout',
  props: {
    id: {
      type: String,
      default: 'wrap'
    },
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    /**
     * 컨테이너 클래스 계산
     */
    const containerClasses = computed(() => {
      const classes = ['g-wrap']

      // 사용자 정의 클래스
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    return () => {
      return h(
        'div',
        {
          id: props.id,
          class: containerClasses.value
        },
        slots.default?.()
      )
    }
  }
})
