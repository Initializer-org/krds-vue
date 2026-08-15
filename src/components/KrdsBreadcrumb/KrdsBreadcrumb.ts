import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'

/**
 * 브레드크럼 아이템 인터페이스
 */
export interface BreadcrumbItem {
  /** 텍스트 */
  text: string
  /** 링크 URL */
  href?: string
  /** 클릭 핸들러 */
  onClick?: (event: MouseEvent) => void
}

/**
 * KRDS Breadcrumb 컴포넌트 속성
 */
export interface KrdsBreadcrumbProps {
  /** 브레드크럼 아이템 배열 */
  items: BreadcrumbItem[]
  /** 엘리먼트 ID */
  id?: string
  /** 접근성 라벨 */
  ariaLabel?: string
  /** 홈 아이콘 표시 여부 */
  showHomeIcon?: boolean
}

/**
 * KRDS Breadcrumb 컴포넌트 이벤트
 */
export interface KrdsBreadcrumbEmits {
  (e: 'item-click', item: BreadcrumbItem, event: MouseEvent): void
}

export default defineComponent<KrdsBreadcrumbProps>({
  name: 'KrdsBreadcrumb',
  props: {
    items: {
      type: Array as PropType<BreadcrumbItem[]>,
      required: true
    },
    id: {
      type: String,
      default: undefined
    },
    ariaLabel: {
      type: String,
      default: '현재 경로'
    },
    showHomeIcon: {
      type: Boolean,
      default: true
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    'item-click': (item: BreadcrumbItem, event: MouseEvent) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit }) {
    /**
     * 현재 페이지 여부 확인
     */
    const isCurrentPage = (index: number) => index === props.items.length - 1

    /**
     * 아이템 클릭 핸들러
     */
    const handleClick = (item: BreadcrumbItem, event: MouseEvent) => {
      // 커스텀 onClick 핸들러 실행
      if (item.onClick) {
        item.onClick(event)
      }

      // 상위로 이벤트 전달
      emit('item-click', item, event)
    }

    return () =>
      h('nav', { id: props.id, class: 'krds-breadcrumb-wrap', 'aria-label': props.ariaLabel }, [
        h(
          'ol',
          { class: 'breadcrumb' },
          props.items.map((item, index) => {
            const isHome = index === 0 && props.showHomeIcon

            return h('li', { key: `breadcrumb-${index}`, class: { home: isHome } }, [
              h(
                'a',
                {
                  href: item.href || '#',
                  class: 'txt',
                  'aria-current': isCurrentPage(index) ? 'page' : undefined,
                  onClick: (event: MouseEvent) => handleClick(item, event)
                },
                isHome ? [] : [h('span', null, item.text)]
              )
            ])
          })
        )
      ])
  }
})
