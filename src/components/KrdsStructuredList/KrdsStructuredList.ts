import { defineComponent, h, SlotsType } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS StructuredList 컴포넌트 속성
 */
export interface KrdsStructuredListProps extends BaseComponentProps {
  /** 전체 타입 여부 */
  full?: boolean
}

export default defineComponent<KrdsStructuredListProps>({
  name: 'KrdsStructuredList',
  props: {
    full: {
      type: Boolean,
      default: true
    }
  },
  slots: Object as SlotsType<{
    cardTop?: () => unknown
    cardBody?: () => unknown
    cardBtm?: () => unknown
    cardBtn?: () => unknown
  }>,
  setup(props, { slots }) {
    return () => {
      const cardTop = slots.cardTop?.()
      const cardBody = slots.cardBody?.()
      const cardBtm = slots.cardBtm?.()
      const cardBtn = slots.cardBtn?.()

      // 구조화된 슬롯들로 단일 아이템 생성
      const structuredItem = h('li', { class: 'structured-item' }, [
        h(
          'div',
          { class: 'in' },
          [
            cardTop && h('div', { class: 'card-top' }, cardTop),
            cardBody && h('div', { class: 'card-body' }, cardBody),
            cardBtm && h('div', { class: 'card-btm' }, cardBtm),
            cardBtn && h('div', { class: 'card-btn' }, cardBtn)
          ].filter(Boolean)
        )
      ])

      return h(
        'ul',
        {
          class: ['krds-structured-list', props.full ? 'type-full' : '']
        },
        [structuredItem]
      )
    }
  }
})
