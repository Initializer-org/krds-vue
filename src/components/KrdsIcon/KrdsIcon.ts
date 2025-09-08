import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Icon 컴포넌트 속성
 */
export interface KrdsIconProps extends BaseComponentProps {
  /** 아이콘 이름 */
  name: string
}

export default defineComponent<KrdsIconProps>({
  name: 'KrdsIcon',
  props: {
    name: {
      type: String,
      required: true
    },
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
