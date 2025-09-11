import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS TextList 컴포넌트 속성
 */
export interface KrdsTextListProps extends BaseComponentProps {
  /** 리스트 타입 */
  type?: 'ul' | 'ol'
  /** 스타일 변형 */
  variant?: 'decimal' | 'dash' | 'hollow' | 'ordered'
}

export default defineComponent<KrdsTextListProps>({
  name: 'KrdsTextList',
  props: {
    type: {
      type: String as () => 'ul' | 'ol',
      default: 'ul'
    },
    variant: {
      type: String as () => 'decimal' | 'dash' | 'hollow' | 'ordered',
      default: 'dash'
    }
  },
  setup(props, { slots }) {
    return () =>
      h(
        props.type as 'ul' | 'ol',
        {
          class: ['krds-info-list', props.variant]
        },
        slots.default?.()
      )
  }
})
