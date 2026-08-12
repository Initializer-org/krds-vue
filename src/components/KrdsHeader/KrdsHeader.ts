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
    /** 데스크탑 네비게이션 슬롯 — KrdsMainMenu 등 완성된 메뉴 요소를 그대로 전달 */
    navigation?(): VNode[]
    /** 모바일 네비게이션 슬롯 — KrdsMainMenu(variant="mobile") 등 완성된 드로어 요소를 그대로 전달 */
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

      // 네비게이션 (슬롯이 .krds-main-menu 루트를 포함한 완성된 메뉴를 렌더링)
      if (slots.navigation) {
        headerInChildren.push(...slots.navigation())
      }

      const children = [h('div', { class: 'header-in' }, headerInChildren)]

      // 모바일 네비게이션 (슬롯이 .krds-main-menu-mobile 루트를 포함한 완성된 드로어를 렌더링)
      if (slots.mobileNavigation) {
        children.push(...slots.mobileNavigation())
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
