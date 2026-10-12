import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'
import { classProp } from '@/utils/classProp'

/**
 * KRDS Icon 컴포넌트 속성
 */
export interface KrdsIconProps extends BaseComponentProps {
  /** 아이콘 이름 */
  name: string
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsIcon',
  props: {
    /** 아이콘 이름 */
    name: {
      type: String,
      required: true
    },
    /** CSS 클래스 */
    class: classProp
  },
  setup(props) {
    return () =>
      h('i', {
        class: ['svg-icon', props.name, props.class]
      })
  }
})
