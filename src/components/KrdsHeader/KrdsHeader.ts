import { computed, defineComponent, h, VNode } from 'vue'
import type { SlotsType } from 'vue'

// ========================
// 타입 정의
// ========================

/**
 * KRDS Header 컴포넌트 속성
 */
export interface KrdsHeaderProps {
  /** 헤더 ID */
  id?: string
  /** 모바일 메뉴 ID */
  mobileNavId?: string
  /** 추가 CSS 클래스 */
  class?: string
}

export default defineComponent({
  name: 'KrdsHeader',
  props: {
    id: {
      type: String,
      default: 'krds-header'
    },
    mobileNavId: {
      type: String,
      default: 'mobile-nav'
    },
    class: {
      type: String,
      default: undefined
    }
  },
  slots: Object as SlotsType<{
    /** 유틸리티 메뉴 슬롯 */
    utility?(): VNode[]
    /** 브랜딩 영역 슬롯 (로고, 액션 버튼) */
    branding?(): VNode[]
    /** 데스크탑 네비게이션 메뉴 슬롯 */
    navigation?(): VNode[]
    /** 모바일 네비게이션 메뉴 슬롯 */
    mobileNavigation?(): VNode[]
  }>,
  setup(props, { slots }) {
    // ========================
    // Computed Properties
    // ========================

    /**
     * 헤더 클래스 계산
     */
    const headerClasses = computed(() => {
      const classes = []

      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    // ========================
    // 렌더 함수
    // ========================

    return () => {
      const headerInChildren = []

      // 헤더 컨테이너 (utility + branding)
      if (slots.utility || slots.branding) {
        const innerChildren = []

        if (slots.utility) {
          innerChildren.push(h('div', { class: 'header-utility' }, slots.utility()))
        }

        if (slots.branding) {
          innerChildren.push(h('div', { class: 'header-branding' }, slots.branding()))
        }

        headerInChildren.push(h('div', { class: 'header-container' }, [h('div', { class: 'inner' }, innerChildren)]))
      }

      // 네비게이션
      if (slots.navigation) {
        headerInChildren.push(h('nav', { class: 'krds-main-menu' }, [h('div', { class: 'inner' }, slots.navigation())]))
      }

      const children = [h('div', { class: 'header-in' }, headerInChildren)]

      // 모바일 네비게이션
      if (slots.mobileNavigation) {
        children.push(
          h(
            'div',
            {
              id: props.mobileNavId,
              class: 'krds-main-menu-mobile'
            },
            slots.mobileNavigation()
          )
        )
      }

      return h(
        'header',
        {
          id: props.id,
          class: headerClasses.value
        },
        children
      )
    }
  }
})
