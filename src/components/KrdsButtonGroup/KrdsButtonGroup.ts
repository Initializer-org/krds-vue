import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS ButtonGroup 컴포넌트 속성
 */
export type KrdsButtonGroupProps = BaseComponentProps

export default defineComponent<KrdsButtonGroupProps>({
  name: 'KrdsButtonGroup',
  props: {},
  setup(_, { slots }) {
    return () =>
      h(
        'div',
        {
          class: 'btn-group'
        },
        slots.default?.()
      )
  }
})
