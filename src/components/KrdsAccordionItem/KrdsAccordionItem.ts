import { computed, defineComponent, h } from 'vue'

/**
 * KRDS AccordionItem 컴포넌트 속성
 */
export interface KrdsAccordionItemProps {
  /** 아이템 고유 식별자 */
  id: string
  /** 현재 열려 있는 아이템의 id */
  openItem?: string
  /** 헤더 텍스트 (title 슬롯으로 대체 가능) */
  title?: string
  /** 본문 텍스트 (content 슬롯으로 대체 가능) */
  content?: string
}

/**
 * KRDS AccordionItem 컴포넌트 이벤트
 */
export interface KrdsAccordionItemEmits {
  (e: 'toggle', id: string): void
}

export default defineComponent({
  name: 'KrdsAccordionItem',
  props: {
    /** 아이템 고유 식별자 */
    id: {
      type: String,
      required: true
    },
    /** 현재 열려 있는 아이템의 id */
    openItem: {
      type: String,
      default: undefined
    },
    /** 헤더 텍스트 (title 슬롯으로 대체 가능) */
    title: {
      type: String,
      default: undefined
    },
    /** 본문 텍스트 (content 슬롯으로 대체 가능) */
    content: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    toggle: (id: string) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit, slots }) {
    const isOpen = computed(() => props.openItem === props.id)

    const openToggle = (): void => {
      emit('toggle', props.id)
    }

    return () =>
      h('div', { id: props.id, class: ['accordion-item', { active: isOpen.value }] }, [
        h('h5', { class: 'accordion-header' }, [
          h(
            'button',
            {
              id: `accordion-header-${props.id}`,
              type: 'button',
              class: ['btn-accordion', { active: isOpen.value }],
              'aria-expanded': isOpen.value,
              'aria-controls': `accordion-collapse-${props.id}`,
              onClick: openToggle
            },
            slots.title?.() ?? props.title
          )
        ]),
        h(
          'div',
          {
            id: `accordion-collapse-${props.id}`,
            class: 'accordion-collapse collapse',
            role: 'region',
            'aria-labelledby': `accordion-header-${props.id}`
          },
          [h('div', { class: 'accordion-body' }, slots.content?.() ?? props.content)]
        )
      ])
  }
})
