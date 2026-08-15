import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Icon 컴포넌트 속성
 */
export interface KrdsIconProps extends BaseComponentProps {
  /** 아이콘 이름 */
  name: string
}

export default defineComponent({
  name: 'KrdsIcon',
  props: {
    /** 아이콘 이름 */
    name: {
      type: String,
      required: true
    },
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    return () =>
      h('i', {
        class: ['svg-icon', props.name, props.class].filter(Boolean).join(' ')
      })
  }
})
