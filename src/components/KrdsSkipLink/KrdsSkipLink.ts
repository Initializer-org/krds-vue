import { defineComponent, h, type PropType, type VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS SkipLink 컴포넌트 속성
 */
export interface KrdsSkipLinkProps extends BaseComponentProps {
  /** 건너뛸 대상 요소의 ID (단일 링크, 기본 슬롯이 링크 텍스트) */
  href?: string
  /** 여러 건너뛰기 링크 (하나의 래퍼 안에 렌더링, 지정 시 href·기본 슬롯 대신 사용) */
  links?: { href: string; label: string }[]
}

/**
 * KRDS SkipLink 컴포넌트
 *
 * 건너뛰기 링크는 웹사이트에서 웹 페이지의 주요 콘텐츠 섹션의 탐색을 도와주는 페이지 내부 링크입니다.
 * 키보드나 가상 초점을 이용하여 콘텐츠를 탐색하는 사용자는 건너뛰기 링크를 이용하여
 * 대부분의 페이지에서 반복되는 콘텐츠 영역을 건너뛰고 주요 콘텐츠로 빠르게 이동할 수 있습니다.
 *
 * @example
 * ```vue
 * <!-- 단일 링크 -->
 * <KrdsSkipLink href="#main-content">본문 바로가기</KrdsSkipLink>
 *
 * <!-- 여러 링크: 컴포넌트를 나란히 두면 #krds-skip-link가 중복되므로 links 사용 -->
 * <KrdsSkipLink
 *   :links="[
 *     { href: '#main-content', label: '본문 바로가기' },
 *     { href: '#gnb', label: '메인메뉴 바로가기' }
 *   ]"
 * />
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsSkipLink',
  props: {
    /**
     * 건너뛸 대상 요소의 ID
     * @example '#main-content', '#breadcrumb'
     */
    href: {
      type: String,
      default: undefined,
      validator: (value: string) => value.startsWith('#')
    },
    /**
     * 여러 건너뛰기 링크 (하나의 래퍼 안에 렌더링, 지정 시 href·기본 슬롯 대신 사용)
     */
    links: {
      type: Array as PropType<{ href: string; label: string }[]>,
      default: undefined,
      validator: (value: { href: string }[]) => value.every(link => link.href.startsWith('#'))
    },
    /**
     * 추가 CSS 클래스
     */
    class: {
      type: [String, Array, Object],
      default: undefined
    },
    /**
     * 요소 ID
     */
    id: {
      type: String,
      default: 'krds-skip-link'
    }
  },
  setup(props, { slots }) {
    return (): VNode => {
      return h(
        'div',
        {
          id: props.id,
          class: props.class
        },
        props.links
          ? props.links.map(link => h('a', { href: link.href }, link.label))
          : [
              h(
                'a',
                {
                  href: props.href
                },
                slots.default?.()
              )
            ]
      )
    }
  }
})
