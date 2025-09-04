import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS FormLabel 컴포넌트 속성
 */
export interface KrdsFormLabelProps extends BaseComponentProps {
  /** label의 for 속성 */
  for?: string
}

/**
 * KRDS FormLabel 컴포넌트 이벤트
 */
export interface KrdsFormLabelEmits {
  (e: 'click', event: MouseEvent): void
}

export default defineComponent<KrdsFormLabelProps>({
  name: 'KrdsFormLabel',
  props: {
    for: {
      type: String,
      default: undefined
    },
    class: {
      type: String,
      default: undefined
    },
    style: {
      type: [String, Object],
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    /**
     * 클릭 핸들러
     */
    const handleClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return () =>
      h('div', { class: 'form-tit' }, [
        h(
          'label',
          {
            for: props.for,
            id: props.id,
            class: props.class,
            style: props.style,
            onClick: handleClick
          },
          slots.default?.()
        )
      ])
  }
})
