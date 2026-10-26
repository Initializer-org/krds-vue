import { computed, defineComponent, h } from 'vue'
import type { PropType, SlotsType, VNode } from 'vue'

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
  /** 제목 수준 (2~6). 페이지의 제목 구조에 맞춰 바로 위 제목보다 한 단계 아래로 둔다 */
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

/**
 * KRDS AccordionItem 컴포넌트 이벤트
 */
export interface KrdsAccordionItemEmits {
  (e: 'toggle', id: string): void
}

export default /* @__PURE__ */ defineComponent({
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
    },
    /** 제목 수준 (2~6). 페이지의 제목 구조에 맞춰 바로 위 제목보다 한 단계 아래로 둔다 */
    headingLevel: {
      type: Number as PropType<2 | 3 | 4 | 5 | 6>,
      default: 5,
      validator: (value: number) => [2, 3, 4, 5, 6].includes(value)
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 펼침·접힘 버튼을 눌렀을 때 (항목 id) */
    toggle: (id: string) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  slots: Object as SlotsType<{
    /** 제목 (title 속성 대신) */
    title?(): VNode[]
    /** 펼쳤을 때 보이는 내용 (content 속성 대신) */
    content?(): VNode[]
  }>,
  setup(props, { emit, slots }) {
    const isOpen = computed(() => props.openItem === props.id)

    const openToggle = (): void => {
      emit('toggle', props.id)
    }

    return () =>
      h('div', { id: props.id, class: ['accordion-item', { active: isOpen.value }] }, [
        // KRDS reset이 제목 수준과 관계없이 같은 모양으로 맞춘다
        h(`h${props.headingLevel}`, { class: 'accordion-header' }, [
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
