import { defineComponent, computed, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Link 크기 타입 (링크는 small, medium, large만 지원)
 */
export type KrdsLinkSize = 'small' | 'medium' | 'large'

/**
 * KRDS Link 컴포넌트 속성
 */
export interface KrdsLinkProps extends BaseComponentProps {
  /** 링크 URL */
  href?: string
  /** 링크 대상 (_blank, _self 등) */
  target?: '_blank' | '_self' | '_parent' | '_top' | string
  /** 링크 제목 (접근성) */
  title?: string
  /** 링크 크기 */
  size?: KrdsLinkSize
  /** Link 클래스 적용 여부 */
  link?: boolean
  /** Basic 링크 여부 (본문 텍스트 컬러) */
  basic?: boolean
  /** Pure 링크 여부 (가상클래스 상태 시 컬러 유지) */
  pure?: boolean
}

/**
 * KRDS Link 컴포넌트 이벤트
 */
export interface KrdsLinkEmits {
  (e: 'click', event: MouseEvent): void
}

export default defineComponent<KrdsLinkProps>({
  name: 'KrdsLink',
  props: {
    href: {
      type: String,
      default: '#!'
    },
    target: {
      type: String as () => '_blank' | '_self' | '_parent' | '_top' | string,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    size: {
      type: String as () => KrdsLinkSize,
      default: undefined
    },
    link: {
      type: Boolean,
      default: true
    },
    basic: {
      type: Boolean,
      default: false
    },
    pure: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    /**
     * 링크 클래스 계산
     */
    const linkClasses = computed(() => {
      const classes = ['krds-btn']

      // 크기 클래스
      if (props.size) {
        classes.push(props.size)
      }

      // link prop이 true일 때 'link' 클래스 추가
      if (props.link) {
        classes.push('link')
      }

      // basic prop이 true일 때 basic 클래스 추가
      if (props.basic) {
        classes.push('basic')
      }

      // pure 링크일 때 pure 클래스 추가
      if (props.pure) {
        classes.push('pure')
      }

      // 사용자 정의 클래스
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 링크 속성 계산
     */
    const linkAttributes = computed(() => {
      const attrs: Record<string, unknown> = {
        href: props.href,
        class: linkClasses.value
      }

      if (props.target) {
        attrs.target = props.target
      }

      if (props.title) {
        attrs.title = props.title
      }

      if (props.target === '_blank') {
        // 보안상 _blank 링크에는 기본적으로 noopener noreferrer 적용
        attrs.rel = 'noopener noreferrer'
      }

      return attrs
    })

    /**
     * 클릭 핸들러
     */
    const handleClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return () =>
      h(
        'a',
        {
          ...linkAttributes.value,
          onClick: handleClick
        },
        slots.default?.()
      )
  }
})
