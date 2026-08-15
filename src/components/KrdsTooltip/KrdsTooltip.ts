import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, ref, useId, vShow, withDirectives } from 'vue'
import type { PropType } from 'vue'
import type { BaseComponentProps } from '@/types'

type TooltipType = 'default' | 'icon' | 'button'

/**
 * KRDS Tooltip 컴포넌트 속성
 */
export interface KrdsTooltipProps extends BaseComponentProps {
  /** 트리거 버튼 타입 */
  type?: TooltipType
  /** 툴팁 본문 */
  tooltipContent: string
  /** 세로 방향 배치 여부 */
  vertical?: boolean
  /** 박스형 여부 */
  box?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
}

export default defineComponent({
  name: 'KrdsTooltip',
  props: {
    /** 트리거 버튼 타입 */
    type: {
      type: String as PropType<TooltipType>,
      default: 'default'
    },
    /** 툴팁 본문 */
    tooltipContent: {
      type: String,
      required: true
    },
    /** 세로 방향 배치 여부 */
    vertical: {
      type: Boolean,
      default: false
    },
    /** 박스형 여부 */
    box: {
      type: Boolean,
      default: false
    },
    /** 비활성화 여부 */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const containerRef = ref<HTMLElement | null>(null)
    const popoverRef = ref<HTMLElement | null>(null)
    const isTooltipVisible = ref(false)
    const popoverStyle = ref<Record<string, string>>({})
    const popoverId = `tooltip-popover-${useId()}`
    const isMobile = ref(false)

    const tooltipClasses = computed(() => {
      const classes: string[] = ['krds-btn', 'krds-tooltip']

      if (props.type === 'default') {
        classes.push('small', 'text')
      } else if (props.type === 'icon') {
        classes.push('icon')
      } else if (props.type === 'button') {
        classes.push('')
      }

      if (!props.box && props.vertical) {
        classes.push('tooltip-vertical')
      }

      if (props.box && !props.vertical) {
        classes.push('tooltip-box')
      }

      return classes.join(' ')
    })

    const popoverClasses = computed(() => {
      const classes: string[] = []

      if (props.box) {
        classes.push('tooltip-box')
      }

      if (props.vertical) {
        classes.push('tooltip-vertical')
      }

      if (isTooltipVisible.value) {
        classes.push('active')
      }

      return classes
    })

    const buttonText = computed(() => {
      return containerRef.value?.querySelector('button')?.textContent?.trim() || ''
    })

    const checkIsMobile = () => {
      return window.innerWidth <= 768
    }

    const calculateTooltipPosition = () => {
      if (!containerRef.value || !popoverRef.value) return

      const button = containerRef.value.querySelector('button')
      if (!button) return

      const tooltipGap = 12
      const { clientHeight: tooltipHeight, clientWidth: tooltipWidth } = popoverRef.value
      const { top: itemTop, left: itemLeft, right: itemRight, height: itemHeight, width: itemWidth } = button.getBoundingClientRect()
      const halfWindowWidth = window.innerWidth / 2
      const halfWindowHeight = window.innerHeight / 2

      let tooltipTop: number
      let tooltipLeft: number
      const classes: string[] = []

      const isVertical = isMobile.value || props.box || props.vertical

      if (isVertical) {
        if (itemTop + itemHeight > halfWindowHeight) {
          tooltipTop = itemTop - tooltipHeight - tooltipGap
          classes.push('top')
        } else {
          tooltipTop = itemTop + itemHeight + tooltipGap
          classes.push('bottom')
        }

        if (itemLeft + itemWidth > halfWindowWidth) {
          tooltipLeft = itemRight - tooltipWidth
          classes.push('right')
          if (window.innerWidth - (itemLeft + itemWidth) > tooltipWidth / 2) {
            tooltipLeft = itemLeft + (itemWidth - tooltipWidth) / 2
            classes.splice(classes.indexOf('right'), 1)
          }
        } else {
          tooltipLeft = itemLeft + (itemWidth - tooltipWidth) / 2
          if (tooltipLeft < 0) {
            tooltipLeft = itemLeft
            classes.push('left')
          }
        }
      } else {
        tooltipTop = itemTop + (itemHeight - tooltipHeight) / 2
        if (itemLeft + itemWidth > halfWindowWidth) {
          tooltipLeft = itemLeft - tooltipWidth - tooltipGap
          classes.push('right')
        } else {
          tooltipLeft = itemRight + tooltipGap
        }
      }

      const mobileSmall = window.innerWidth <= 420
      popoverStyle.value = {
        top: `${tooltipTop}px`,
        left: mobileSmall ? '50%' : `${tooltipLeft}px`,
        transform: mobileSmall ? 'translateX(-50%)' : 'none'
      }

      if (popoverRef.value) {
        popoverRef.value.className = `krds-tooltip-popover ${classes.join(' ')} ${popoverClasses.value.join(' ')}`
      }
    }

    const showTooltip = async () => {
      if (props.disabled || !props.tooltipContent) return

      isTooltipVisible.value = true

      await nextTick()
      calculateTooltipPosition()
    }

    const hideTooltip = () => {
      isTooltipVisible.value = false
      popoverStyle.value = {}
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.key === 'Escape' || event.key === 'Esc') && isTooltipVisible.value) {
        hideTooltip()
      }
    }

    const handleResize = () => {
      isMobile.value = checkIsMobile()
      if (isTooltipVisible.value) {
        hideTooltip()
      }
    }

    const handleScroll = () => {
      if (isTooltipVisible.value) {
        hideTooltip()
      }
    }

    onMounted(() => {
      isMobile.value = checkIsMobile()

      document.addEventListener('keydown', handleKeydown)
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    })

    return () =>
      h('div', { ref: containerRef }, [
        h(
          'button',
          {
            type: 'button',
            class: tooltipClasses.value,
            disabled: props.disabled,
            'aria-labelledby': popoverId,
            onMouseover: showTooltip,
            onMouseout: hideTooltip,
            onFocusin: showTooltip,
            onFocusout: hideTooltip
          },
          slots.default?.()
        ),
        withDirectives(
          h(
            'div',
            {
              id: popoverId,
              ref: popoverRef,
              class: ['krds-tooltip-popover', popoverClasses.value],
              style: popoverStyle.value,
              'aria-hidden': !isTooltipVisible.value,
              role: 'tooltip'
            },
            [h('span', { class: 'sr-only' }, buttonText.value), ' ', props.tooltipContent]
          ),
          [[vShow, isTooltipVisible.value]]
        )
      ])
  }
})
