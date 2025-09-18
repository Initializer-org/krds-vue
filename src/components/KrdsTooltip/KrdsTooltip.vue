<template>
  <button type="button" :class="tooltipClasses" :data-tooltip="tooltipContent">
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { BaseComponentProps } from '@/types'

  type TooltipType = 'default' | 'icon' | 'button'

  export interface KrdsTooltipProps extends BaseComponentProps {
    type?: TooltipType
    tooltipContent: string
    vertical?: boolean
    box?: boolean
  }

  const props = withDefaults(defineProps<KrdsTooltipProps>(), {
    type: 'default'
  })

  const tooltipClasses = computed(() => {
    const classes: string[] = ['krds-btn krds-tooltip']

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

  const tooltip = ref<NodeListOf<Element> | null>(null)
  const isMobile = ref<boolean>(false)

  const checkIsMobile = () => {
    return window.innerWidth <= 768
  }

  const createTooltipPopover = (uniqueIdx: string, tooltipBtnText: string, tooltipText: string) => {
    const tooltipPopover = document.createElement('div')
    tooltipPopover.classList.add('krds-tooltip-popover')
    tooltipPopover.setAttribute('id', uniqueIdx)
    tooltipPopover.setAttribute('aria-hidden', 'true')
    tooltipPopover.innerHTML = `
    <span class="sr-only">${tooltipBtnText}</span>
    ${tooltipText}
  `
    return tooltipPopover
  }

  const closeAllTooltips = () => {
    const otherPopovers = document.querySelectorAll('.krds-tooltip-popover')
    otherPopovers.forEach(popover => {
      if (!popover.classList.contains('active')) return
      popover.removeAttribute('style')
      popover.className = 'krds-tooltip-popover'
    })
  }

  const calculateTooltipPosition = (item: Element, tooltipPopover: HTMLElement) => {
    const tooltipGap = 12
    const { clientHeight: tooltipHeight, clientWidth: tooltipWidth } = tooltipPopover
    const { top: itemTop, left: itemLeft, right: itemRight, height: itemHeight, width: itemWidth } = item.getBoundingClientRect()
    const halfWindowWidth = window.innerWidth / 2
    const halfWindowHeight = window.innerHeight / 2

    let tooltipTop: number
    let tooltipLeft: number

    const isVertical = isMobile.value || item.classList.contains('tooltip-box') || item.classList.contains('tooltip-vertical')

    if (isVertical) {
      if (itemTop + itemHeight > halfWindowHeight) {
        tooltipTop = itemTop - tooltipHeight - tooltipGap
        tooltipPopover.classList.add('top')
      } else {
        tooltipTop = itemTop + itemHeight + tooltipGap
        tooltipPopover.classList.add('bottom')
      }

      if (itemLeft + itemWidth > halfWindowWidth) {
        tooltipLeft = itemRight - tooltipWidth
        tooltipPopover.classList.add('right')
        if (window.innerWidth - (itemLeft + itemWidth) > tooltipWidth / 2) {
          tooltipLeft = itemLeft + (itemWidth - tooltipWidth) / 2
          tooltipPopover.classList.remove('right')
        }
      } else {
        tooltipLeft = itemLeft + (itemWidth - tooltipWidth) / 2
        if (tooltipLeft < 0) {
          tooltipLeft = itemLeft
          tooltipPopover.classList.add('left')
        } else {
          tooltipPopover.classList.remove('left')
        }
      }
    } else {
      tooltipTop = itemTop + (itemHeight - tooltipHeight) / 2
      if (itemLeft + itemWidth > halfWindowWidth) {
        tooltipLeft = itemLeft - tooltipWidth - tooltipGap
        tooltipPopover.classList.add('right')
      } else {
        tooltipLeft = itemRight + tooltipGap
        tooltipPopover.classList.remove('right')
      }
    }
    return { top: tooltipTop, left: tooltipLeft }
  }

  const showTooltip = (item: Element, tooltipPopover: HTMLElement) => {
    if (item.classList.contains('tooltip-box')) {
      tooltipPopover.classList.add('tooltip-box')
    }
    if (item.classList.contains('tooltip-vertical')) {
      tooltipPopover.classList.add('tooltip-vertical')
    }

    tooltipPopover.classList.add('active')

    const { top, left } = calculateTooltipPosition(item, tooltipPopover)
    const mobileSmall = window.innerWidth <= 420
    tooltipPopover.style.top = `${top}px`
    tooltipPopover.style.left = mobileSmall ? '50%' : `${left}px`
  }

  const registerEvents = (item: Element, showTooltipFn: () => void) => {
    item.addEventListener('mouseover', showTooltipFn)
    item.addEventListener('mouseout', closeAllTooltips)
    item.addEventListener('focus', showTooltipFn)
    item.addEventListener('focusout', closeAllTooltips)
  }

  const setupTooltips = () => {
    if (!tooltip.value?.length) return

    tooltip.value.forEach((item, index) => {
      const tooltipText = item.getAttribute('data-tooltip')
      const disabled = item.hasAttribute('disabled')

      if (!tooltipText || disabled) return

      const uniqueIdx = `tooltip-popover-${index}${Math.random().toString(36).substring(2, 9)}`
      item.setAttribute('aria-labelledby', uniqueIdx)

      const tooltipBtnText = item.textContent || ''
      const tooltipPopover = createTooltipPopover(uniqueIdx, tooltipBtnText, tooltipText)
      item.parentNode?.insertBefore(tooltipPopover, item.nextSibling)

      const showTooltipFn = () => showTooltip(item, tooltipPopover)
      registerEvents(item, showTooltipFn)
    })
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      closeAllTooltips()
    }
  }

  const handleResize = () => {
    isMobile.value = checkIsMobile()
    closeAllTooltips()
  }

  const init = () => {
    tooltip.value = document.querySelectorAll('.krds-tooltip')
    isMobile.value = checkIsMobile()

    setupTooltips()

    document.addEventListener('keydown', handleKeydown)
    window.addEventListener('scroll', closeAllTooltips)
    window.addEventListener('resize', handleResize)
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('scroll', closeAllTooltips)
    window.removeEventListener('resize', handleResize)
  })
</script>

<style scoped></style>
