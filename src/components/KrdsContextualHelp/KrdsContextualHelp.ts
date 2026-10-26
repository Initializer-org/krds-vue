import { defineComponent, h, onMounted, onUnmounted, ref, useId } from 'vue'
import type { SlotsType, VNode } from 'vue'
import type { PropType } from 'vue'

type ContextualHelpPosition = 'top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right'

/**
 * KRDS ContextualHelp 컴포넌트 속성
 */
export interface KrdsContextualHelpProps {
  /** 툴팁 제목 */
  tooltipTitle?: string
  /** 도움말 아이콘 사용 여부 (false 면 툴팁 아이콘) */
  helpIcon?: boolean
  /** 툴팁 노출 위치 */
  position?: ContextualHelpPosition
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsContextualHelp',
  props: {
    /** 툴팁 제목 */
    tooltipTitle: {
      type: String,
      default: '도움말 제목'
    },
    /** 도움말 아이콘 사용 여부 (false 면 툴팁 아이콘) */
    helpIcon: {
      type: Boolean,
      default: false
    },
    /** 툴팁 노출 위치 */
    position: {
      type: String as PropType<ContextualHelpPosition>,
      default: 'top left'
    }
  },
  slots: Object as SlotsType<{
    /** 도움말 내용 */
    default?(): VNode[]
  }>,
  setup(props, { slots }) {
    // Template refs
    const containerRef = ref<HTMLElement>()
    const tooltipBtnRef = ref<HTMLElement>()
    const tooltipPopoverRef = ref<HTMLElement>()
    const closeBtnRef = ref<HTMLElement>()

    // State
    const isVisible = ref(false)
    const popoverId = `contextual-help-${useId()}`

    // Methods
    const toggleTooltip = () => {
      const wasVisible = isVisible.value
      closeAllTooltips()

      if (!wasVisible) {
        showTooltip()
      }
    }

    const showTooltip = () => {
      if (!tooltipPopoverRef.value || !tooltipBtnRef.value) return

      isVisible.value = true
      tooltipPopoverRef.value.style.display = 'block'
      tooltipBtnRef.value.setAttribute('aria-expanded', 'true')

      // Focus first focusable element
      const focusables = tooltipPopoverRef.value.querySelector('a, button, [tabindex="0"], input, textarea, select') as HTMLElement
      focusables?.focus()

      adjustTooltipPosition()
    }

    const closeTooltip = () => {
      if (!tooltipPopoverRef.value || !tooltipBtnRef.value) return

      isVisible.value = false
      tooltipPopoverRef.value.style.display = 'none'
      tooltipBtnRef.value.setAttribute('aria-expanded', 'false')
      // 닫기 버튼이 숨으며 초점을 잃지 않게 도움말 버튼으로 돌려준다
      tooltipBtnRef.value.focus()
    }

    const closeAllTooltips = () => {
      // Close all tooltips in the document
      const allPopovers = document.querySelectorAll('.krds-contextual-help .tooltip-popover') as NodeListOf<HTMLElement>
      const allButtons = document.querySelectorAll('.krds-contextual-help .tooltip-btn') as NodeListOf<HTMLElement>

      allPopovers.forEach(popover => {
        popover.style.display = 'none'
      })
      allButtons.forEach(button => {
        button.setAttribute('aria-expanded', 'false')
      })

      isVisible.value = false
    }

    const adjustTooltipPosition = () => {
      if (!containerRef.value || !tooltipPopoverRef.value) return

      const isMobile = window.innerWidth <= 768
      const tooltipAction = containerRef.value.querySelector('.tooltip-action') as HTMLElement

      if (isMobile) {
        const rootStyles = getComputedStyle(document.querySelector(':root')!)
        const contentsPaddingX = rootStyles.getPropertyValue('--krds-contents-padding-x').trim().split('px')[0]
        const tooltipActionRect = tooltipAction.getBoundingClientRect()
        const offsetLeft = tooltipActionRect.left - parseInt(contentsPaddingX)
        const width = document.body.clientWidth - parseInt(contentsPaddingX) * 2
        tooltipPopoverRef.value.style.left = `-${offsetLeft}px`
        tooltipPopoverRef.value.style.width = `${width}px`
      } else {
        tooltipPopoverRef.value.style.left = ''
        tooltipPopoverRef.value.style.right = ''
        tooltipPopoverRef.value.style.width = '360px'
      }
    }

    // Event handlers
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        // 이 도움말 안에 초점이 있었으면 닫은 뒤 도움말 버튼으로 돌려준다 (팝오버가 숨으며 초점을 잃지 않게)
        const focusInside = tooltipPopoverRef.value?.contains(document.activeElement)
        closeAllTooltips()
        if (focusInside) tooltipBtnRef.value?.focus()
      }
    }

    const handleOutsideClick = (event: Event) => {
      const target = event.target as Element
      const clickedInsideTooltip = target.closest('.tooltip-action')
      if (!clickedInsideTooltip) {
        closeAllTooltips()
      }
    }

    const handleResize = () => {
      if (isVisible.value) {
        adjustTooltipPosition()
      }
    }

    // Lifecycle
    onMounted(() => {
      if (!containerRef.value) return

      // Setup ARIA attributes
      if (tooltipBtnRef.value) {
        tooltipBtnRef.value.setAttribute('aria-expanded', 'false')
      }

      // Add global event listeners
      document.addEventListener('keydown', handleKeydown)
      document.addEventListener('click', handleOutsideClick)
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      // Clean up global event listeners
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('click', handleOutsideClick)
      window.removeEventListener('resize', handleResize)
    })

    return () =>
      h('div', { ref: containerRef, class: ['krds-contextual-help', props.position] }, [
        h('div', { class: 'tooltip-action' }, [
          h(
            'button',
            {
              ref: tooltipBtnRef,
              type: 'button',
              class: 'krds-btn medium icon tooltip-btn',
              'aria-controls': popoverId,
              onClick: toggleTooltip
            },
            [
              h('span', { class: 'sr-only' }, '도움말'),
              props.helpIcon ? h('i', { class: 'svg-icon ico-help' }) : h('i', { class: 'svg-icon ico-tooltip' })
            ]
          ),
          // 원본은 role="tooltip"이지만 안에 버튼·링크가 있으므로 제목으로 이름 붙인 비모달 대화 상자로 둔다
          h(
            'div',
            { ref: tooltipPopoverRef, id: popoverId, class: 'tooltip-popover', role: 'dialog', 'aria-labelledby': `${popoverId}-title` },
            [
              h('h4', { id: `${popoverId}-title`, class: 'tooltip-title' }, props.tooltipTitle),
              h('div', { class: 'tooltip-contents' }, slots.default?.()),
              h(
                'button',
                {
                  ref: closeBtnRef,
                  type: 'button',
                  class: 'krds-btn xsmall icon tooltip-close',
                  onClick: closeTooltip
                },
                [h('span', { class: 'sr-only' }, '닫기'), h('i', { class: 'svg-icon ico-modal-close' })]
              )
            ]
          )
        ])
      ])
  }
})
