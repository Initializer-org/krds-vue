import { defineComponent, h } from 'vue'
import type { SlotsType, VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS CheckArea 컴포넌트 속성
 */
export interface KrdsCheckAreaProps extends BaseComponentProps {
  /** 추가 클래스 */
  class?: string
  column?: boolean
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsCheckArea',
  props: {
    /** 추가 클래스 */
    class: {
      type: String,
      default: undefined
    },
    /** 세로(컬럼) 배치 여부 */
    column: {
      type: Boolean,
      default: false
    }
  },
  slots: Object as SlotsType<{
    /** 체크박스·라디오 버튼 묶음 */
    default?(): VNode[]
  }>,
  setup(props, { slots }) {
    return () => {
      const classes = ['krds-check-area']

      if (props.column) {
        classes.push('chk-column')
      }

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
