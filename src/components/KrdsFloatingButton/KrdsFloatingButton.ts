import { defineComponent, h, nextTick, ref, useId, vShow, withDirectives } from 'vue'
import type { PropType, VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * 플로팅 버튼 항목 (단일형 버튼·확장형 항목 공통)
 */
export interface KrdsFloatingButtonItem {
  /** 버튼 이름 (레이블) */
  label: string
  /** 아이콘 클래스 (예: 'ico-faq') */
  icon: string
  /** 링크 주소 (없으면 버튼으로 렌더링) */
  href?: string
  /** 링크 target */
  target?: string
}

/**
 * KRDS FloatingButton 컴포넌트 속성
 */
export interface KrdsFloatingButtonProps extends BaseComponentProps {
  /** 단일형 버튼의 레이블, 확장형은 확장 버튼의 이름 (화면에는 숨김) */
  label: string
  /** 단일형 버튼의 아이콘 클래스 */
  icon?: string
  /** 단일형 버튼의 링크 주소 */
  href?: string
  /** 단일형 버튼의 링크 target */
  target?: string
  /** 확장형 항목 (지정하면 확장형, 3개 이하 권장) */
  items?: KrdsFloatingButtonItem[]
}

/**
 * KRDS FloatingButton 컴포넌트 이벤트
 */
export interface KrdsFloatingButtonEmits {
  /** 단일형 버튼 클릭 */
  (e: 'click', event: MouseEvent): void
  /** 확장형 항목 선택 */
  (e: 'select', item: KrdsFloatingButtonItem, index: number): void
}

/**
 * KRDS FloatingButton 컴포넌트
 *
 * 화면에서 가장 자주 쓰는 중요한 작업을 화면 오른쪽 아래에 고정해 보여 주는 버튼입니다.
 * `items`가 없으면 단일형(아이콘 + 레이블), 있으면 확장형(+ 버튼으로 항목을 펼치고 X로 닫음)입니다.
 *
 * @example
 * ```vue
 * <!-- 단일형 -->
 * <KrdsFloatingButton label="채팅 상담" icon="ico-faq" @click="openChat" />
 *
 * <!-- 확장형 -->
 * <KrdsFloatingButton
 *   label="상담 메뉴"
 *   :items="[
 *     { label: '전화 상담', icon: 'ico-call', href: 'tel:1555-6365' },
 *     { label: '이메일 문의', icon: 'ico-email', href: 'mailto:krds@nia.or.kr' }
 *   ]"
 * />
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsFloatingButton',
  props: {
    /** 단일형 버튼의 레이블, 확장형은 확장 버튼의 이름 (화면에는 숨김) */
    label: {
      type: String,
      required: true
    },
    /** 단일형 버튼의 아이콘 클래스 */
    icon: {
      type: String,
      default: 'ico-plus'
    },
    /** 단일형 버튼의 링크 주소 */
    href: {
      type: String,
      default: undefined
    },
    /** 단일형 버튼의 링크 target */
    target: {
      type: String,
      default: undefined
    },
    /** 확장형 항목 (지정하면 확장형, 3개 이하 권장) */
    items: {
      type: Array as PropType<KrdsFloatingButtonItem[]>,
      default: undefined
    }
  },
  emits: {
    click: (_event: MouseEvent) => true,
    select: (_item: KrdsFloatingButtonItem, _index: number) => true
  },
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const toggleRef = ref<HTMLButtonElement | null>(null)
    const listId = `floating-list-${useId()}`
    const isOpen = ref(false)

    const close = (returnFocus = false) => {
      isOpen.value = false
      if (returnFocus) nextTick(() => toggleRef.value?.focus())
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen.value) close(true)
    }

    // Tab으로 초점이 바깥으로 나가면 닫는다 (relatedTarget이 없는 클릭은 가림막 클릭으로 처리)
    const handleFocusout = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null
      if (next && !rootRef.value?.contains(next)) close()
    }

    const renderAction = (item: KrdsFloatingButtonItem, onClick: (event: MouseEvent) => void): VNode =>
      h(
        item.href ? 'a' : 'button',
        {
          class: 'floating-action',
          ...(item.href ? { href: item.href, target: item.target } : { type: 'button' }),
          onClick
        },
        [
          h('span', { class: 'floating-icon' }, [h('i', { class: ['svg-icon', item.icon], 'aria-hidden': 'true' })]),
          h('span', { class: 'floating-label' }, item.label)
        ]
      )

    return () => {
      const { items } = props
      if (!items) {
        return h('div', { class: 'krds-floating-button' }, [
          renderAction({ label: props.label, icon: props.icon, href: props.href, target: props.target }, event => emit('click', event))
        ])
      }

      return h(
        'div',
        {
          ref: rootRef,
          class: ['krds-floating-button', 'expand', { active: isOpen.value }],
          onKeydown: handleKeydown,
          onFocusout: handleFocusout
        },
        [
          isOpen.value ? h('div', { class: 'floating-dim', 'aria-hidden': 'true', onClick: () => close() }) : null,
          h(
            'button',
            {
              ref: toggleRef,
              type: 'button',
              class: 'floating-toggle',
              'aria-expanded': isOpen.value,
              'aria-controls': listId,
              onClick: () => (isOpen.value = !isOpen.value)
            },
            [
              h('span', { class: 'floating-icon' }, [h('i', { class: 'svg-icon ico-plus', 'aria-hidden': 'true' })]),
              h('span', { class: 'sr-only' }, props.label)
            ]
          ),
          withDirectives(
            h(
              'ul',
              { id: listId, class: 'floating-list' },
              items.map((item, index) =>
                h('li', { key: index }, [
                  renderAction(item, () => {
                    if (!item.href) emit('select', item, index)
                    close(!item.href)
                  })
                ])
              )
            ),
            [[vShow, isOpen.value]]
          )
        ]
      )
    }
  }
})
