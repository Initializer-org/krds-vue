import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * 탭바 메뉴 항목
 */
export interface KrdsTabBarItem {
  /** 메뉴 이름 (레이블, 1~2단어) */
  text: string
  /** 아이콘 클래스 (예: 'ico-bread-home') */
  icon: string
  /** 링크 주소 (없으면 버튼으로 렌더링, 예: 전체 메뉴 열기) */
  href?: string
  /** 현재 화면 여부 (인디케이터와 aria-current="page" 표시) */
  selected?: boolean
  /** 클릭 핸들러 (링크는 event.preventDefault()로 라우터 이동에 쓸 수 있음) */
  onClick?: (event: MouseEvent) => void
}

/**
 * KRDS TabBar 컴포넌트 속성
 */
export interface KrdsTabBarProps extends BaseComponentProps {
  /** 메뉴 항목 (5개 이하, 홈은 맨 왼쪽·전체 메뉴는 맨 오른쪽) */
  items: KrdsTabBarItem[]
  /** 내비게이션 이름 (화면낭독기용) */
  label?: string
}

/**
 * KRDS TabBar 컴포넌트
 *
 * 좁은 화면에서 서비스의 핵심 화면으로 바로 가는 하단 고정 내비게이션입니다.
 * 메인 메뉴가 보이는 넓은 화면(1024px 이상)에서는 숨겨지고, 탭바가 있는 동안 페이지 아래에 탭바 높이만큼 여백이 생깁니다.
 *
 * @example
 * ```vue
 * <KrdsTabBar
 *   :items="[
 *     { text: '홈', icon: 'ico-bread-home', href: '/', selected: true },
 *     { text: '마이', icon: 'ico-my', href: '/my' },
 *     { text: '전체', icon: 'ico-all', onClick: openMenu }
 *   ]"
 * />
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsTabBar',
  props: {
    /** 메뉴 항목 (5개 이하, 홈은 맨 왼쪽·전체 메뉴는 맨 오른쪽) */
    items: {
      type: Array as PropType<KrdsTabBarItem[]>,
      required: true
    },
    /** 내비게이션 이름 (화면낭독기용) */
    label: {
      type: String,
      default: '하단 메뉴'
    }
  },
  setup(props) {
    return () =>
      h(
        'nav',
        { class: 'krds-tab-bar', 'aria-label': props.label },
        h(
          'ul',
          props.items.map(item =>
            h(
              'li',
              h(
                item.href ? 'a' : 'button',
                {
                  class: ['tab-bar-item', { active: item.selected }],
                  href: item.href,
                  type: item.href ? undefined : 'button',
                  'aria-current': item.selected ? 'page' : undefined,
                  onClick: item.onClick
                },
                [h('i', { class: `svg-icon ${item.icon}`, 'aria-hidden': 'true' }), h('span', { class: 'tab-bar-label' }, item.text)]
              )
            )
          )
        )
      )
  }
})
