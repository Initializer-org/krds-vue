import { computed, defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

export interface KrdsAccordionGroupProps extends BaseComponentProps {
  typeLine?: boolean
}

export default defineComponent({
  name: 'KrdsAccordionGroup',
  props: {
    /** 라인 타입 아코디언 여부 */
    typeLine: {
      type: Boolean,
      default: false
    },
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const accordionGroupClasses = computed(() => {
      const classes = ['krds-accordion']

      if (props.typeLine) {
        classes.push(`type-line`)
      }

      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    return () =>
      h(
        'div',
        {
          class: accordionGroupClasses.value
        },
        slots.default?.()
      )
  }
})
