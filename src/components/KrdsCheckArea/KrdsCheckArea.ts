import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS CheckArea 컴포넌트 속성
 */
export interface KrdsCheckAreaProps extends BaseComponentProps {
  /** 추가 클래스 */
  class?: string
}

export default defineComponent<KrdsCheckAreaProps>({
  name: 'KrdsCheckArea',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    return () => {
      const classes = ['krds-check-area']

      if (props.class) {
        classes.push(props.class)
      }

      return h(
        'div',
        {
          class: classes
        },
        slots.default?.()
      )
    }
  }
})
