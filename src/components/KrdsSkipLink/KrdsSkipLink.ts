import { defineComponent, h, type VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS SkipLink 컴포넌트 속성
 */
export interface KrdsSkipLinkProps extends BaseComponentProps {
  /** 건너뛸 대상 요소의 ID */
  href: string
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
 * <KrdsSkipLink href="#main-content">본문 바로가기</KrdsSkipLink>
 * <KrdsSkipLink href="#breadcrumb">본문 바로가기</KrdsSkipLink>
 * <KrdsSkipLink href="#gnb">메인메뉴 바로가기</KrdsSkipLink>
 * ```
 */
export default defineComponent({
  name: 'KrdsSkipLink',
  props: {
    /**
     * 건너뛸 대상 요소의 ID
     * @example '#main-content', '#breadcrumb'
     */
    href: {
      type: String,
      required: true,
      validator: (value: string) => value.startsWith('#')
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
        [
          h(
            'a',
            {
              href: props.href,
              'aria-label': `${slots.default?.()?.[0]?.children || '바로가기'} 링크`
            },
            slots.default?.()
          )
        ]
      )
    }
  }
})
