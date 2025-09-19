<template>
  <div ref="containerRef">
    <button
      type="button"
      :class="tooltipClasses"
      :disabled="disabled"
      :aria-labelledby="popoverId"
      @mouseover="showTooltip"
      @mouseout="hideTooltip"
      @focusin="showTooltip"
      @focusout="hideTooltip"
    >
      <slot />
    </button>
    <div
      v-show="isTooltipVisible"
      :id="popoverId"
      ref="popoverRef"
      class="krds-tooltip-popover"
      :class="popoverClasses"
      :style="popoverStyle"
      :aria-hidden="!isTooltipVisible"
      role="tooltip"
    >
      <span class="sr-only">{{ buttonText }}</span>
      {{ tooltipContent }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
  import { BaseComponentProps } from '@/types'

  type TooltipType = 'default' | 'icon' | 'button'

  export interface KrdsTooltipProps extends BaseComponentProps {
    type?: TooltipType
    tooltipContent: string
    vertical?: boolean
    box?: boolean
    disabled?: boolean
  }

  const props = withDefaults(defineProps<KrdsTooltipProps>(), {
    type: 'default',
    disabled: false
  })

  const containerRef = ref<HTMLElement | null>(null)
  const popoverRef = ref<HTMLElement | null>(null)
  const isTooltipVisible = ref(false)
  const popoverStyle = ref<Record<string, string>>({})
  const popoverId = ref(`tooltip-popover-${Math.random().toString(36).substring(2, 9)}`)
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
</script>

<style scoped></style>
