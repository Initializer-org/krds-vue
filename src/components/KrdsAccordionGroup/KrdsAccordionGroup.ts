import { computed, defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

export interface KrdsAccordionGroupProps extends BaseComponentProps {
  typeLine?: boolean
}

export default defineComponent<KrdsAccordionGroupProps>({
  name: 'KrdsAccordionGroup',
  props: {
    typeLine: {
      type: Boolean,
      default: false
    },
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
