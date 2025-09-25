import { computed, defineComponent, h, type VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Footer 컴포넌트 속성
 */
export interface KrdsFooterProps extends BaseComponentProps {
  /** Footer ID */
  id?: string
}

export default defineComponent<KrdsFooterProps>({
  name: 'KrdsFooter',
  props: {
    id: {
      type: String,
      default: 'krds-footer'
    },
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    /**
     * Footer 클래스 계산
     */
    const footerClasses = computed(() => {
      const classes = []
      if (props.class) {
        classes.push(props.class)
      }
      return classes
    })

    /**
     * Top 섹션 렌더링
     */
    const renderTop = (): VNode | null => {
      if (!slots.top) return null

      return h('div', { class: 'foot-quick' }, [h('div', { class: 'inner' }, slots.top())])
    }

    /**
     * 로고 섹션 렌더링
     */
    const renderLogo = (): VNode | null => {
      if (!slots.logo) return null
      return h('div', { class: 'f-logo' }, slots.logo())
    }

    /**
     * Footer 콘텐츠 렌더링
     */
    const renderContent = (): VNode | null => {
      if (!slots.content) return null
      return h('div', { class: 'f-cnt' }, slots.content())
    }

    /**
     * Footer 하단 렌더링
     */
    const renderBottom = (): VNode | null => {
      if (!slots.bottom) return null
      return h('div', { class: 'f-btm' }, slots.bottom())
    }

    return () => {
      const top = renderTop()
      const logo = renderLogo()
      const content = renderContent()
      const bottom = renderBottom()

      const innerChildren: VNode[] = []
      if (logo) innerChildren.push(logo)
      if (content) innerChildren.push(content)
      if (bottom) innerChildren.push(bottom)

      const children: VNode[] = []
      if (top) children.push(top)
      if (innerChildren.length > 0) {
        children.push(h('div', { class: 'inner' }, innerChildren))
      }

      return h(
        'footer',
        {
          id: props.id,
          class: footerClasses.value
        },
        children
      )
    }
  }
})
