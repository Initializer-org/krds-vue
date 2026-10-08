import { defineComponent, h, mergeProps, onMounted, onUnmounted, ref, useId, vShow, withDirectives } from 'vue'
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
  /** 링크를 새 창으로 열기 ('새 창 열림' 안내 포함) */
  external?: boolean
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
  /** 단일형 링크를 새 창으로 열기 ('새 창 열림' 안내 포함) */
  external?: boolean
  /** 단일형 레이블을 화면에서 숨김 (아이콘만 표시, 화면낭독기는 읽음) */
  hideLabel?: boolean
  /** 확장형 항목 (지정하면 확장형, 3개 이하 권장) */
  items?: KrdsFloatingButtonItem[]
}

/**
 * KRDS FloatingButton 컴포넌트 이벤트
 */
export interface KrdsFloatingButtonEmits {
  /** 단일형 버튼 클릭 */
  (e: 'click', event: MouseEvent): void
  /** 확장형 항목 선택 (링크 항목은 event.preventDefault()로 라우터 이동 가능) */
  (e: 'select', item: KrdsFloatingButtonItem, index: number, event: MouseEvent): void
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
 * <!-- 아이콘만 -->
 * <KrdsFloatingButton label="맨 위로" icon="ico-go-top" hide-label @click="scrollToTop" />
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
  // 단일형은 class·style만 바깥 틀에, 나머지 속성(aria-*, rel, download 등)은 실제 버튼·링크에 붙인다
  inheritAttrs: false,
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
    /** 단일형 링크를 새 창으로 열기 ('새 창 열림' 안내 포함) */
    external: {
      type: Boolean,
      default: false
    },
    /** 단일형 레이블을 화면에서 숨김 (아이콘만 표시, 화면낭독기는 읽음) */
    hideLabel: {
      type: Boolean,
      default: false
    },
    /** 확장형 항목 (지정하면 확장형, 3개 이하 권장) */
    items: {
      type: Array as PropType<KrdsFloatingButtonItem[]>,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 단일형 버튼 클릭 */
    click: (event: MouseEvent) => true,
    /** 확장형 항목 선택 (링크 항목은 event.preventDefault()로 라우터 이동 가능) */
    select: (item: KrdsFloatingButtonItem, index: number, event: MouseEvent) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit, attrs }) {
    const rootRef = ref<HTMLElement | null>(null)
    const toggleRef = ref<HTMLButtonElement | null>(null)
    const listId = `floating-list-${useId()}`
    const isOpen = ref(false)

    // 초점은 바로 옮긴다: select 핸들러가 모달을 열거나 다른 곳으로 초점을 옮기면 그쪽이 이기고, 모달은 확장 버튼을 돌아갈 곳으로 기억한다
    const close = (returnFocus = false) => {
      isOpen.value = false
      if (returnFocus) toggleRef.value?.focus()
    }

    // Safari 등은 버튼을 클릭해도 초점을 주지 않으므로 Esc는 문서 전체에서 받는다 (다른 펼침 컴포넌트와 같음)
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen.value) close(true)
    }
    onMounted(() => document.addEventListener('keydown', handleKeydown))
    onUnmounted(() => document.removeEventListener('keydown', handleKeydown))

    // Tab으로 초점이 바깥으로 나가면 닫는다 (relatedTarget이 없는 클릭은 가림막 클릭으로 처리)
    const handleFocusout = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null
      if (next && !rootRef.value?.contains(next)) close()
    }

    const renderAction = (
      item: KrdsFloatingButtonItem,
      onClick: (event: MouseEvent) => void,
      hideLabel = false,
      extraAttrs: Record<string, unknown> = {}
    ): VNode =>
      h(
        item.href ? 'a' : 'button',
        mergeProps(
          {
            class: 'floating-action',
            ...(item.href
              ? { href: item.href, ...(item.external && { target: '_blank', rel: 'noopener noreferrer', title: '새 창 열림' }) }
              : { type: 'button' }),
            onClick
          },
          extraAttrs
        ),
        [
          h('span', { class: 'floating-icon' }, [h('i', { class: ['svg-icon', item.icon], 'aria-hidden': 'true' })]),
          h('span', { class: hideLabel ? 'sr-only' : 'floating-label' }, item.label)
        ]
      )

    return () => {
      const { items } = props
      if (!items) {
        const { class: className, style, ...actionAttrs } = attrs
        return h('div', { class: ['krds-floating-button', className], style }, [
          renderAction(
            { label: props.label, icon: props.icon, href: props.href, external: props.external },
            event => emit('click', event),
            props.hideLabel,
            actionAttrs
          )
        ])
      }

      return h(
        'div',
        mergeProps(attrs, {
          ref: rootRef,
          class: ['krds-floating-button', 'expand', { active: isOpen.value }],
          onFocusout: handleFocusout
        }),
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
                  renderAction(item, event => {
                    // tel:·mailto:처럼 페이지에 남는 링크도 초점을 확장 버튼으로 돌려준 뒤 알린다.
                    // 같은 페이지 안 링크(#...)는 브라우저가 이동한 위치에서 탐색을 이어 가도록 초점을 옮기지 않는다
                    close(!item.href?.startsWith('#'))
                    emit('select', item, index, event)
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
