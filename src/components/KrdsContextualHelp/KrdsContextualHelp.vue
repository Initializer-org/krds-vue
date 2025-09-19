<template>
  <div ref="containerRef" class="krds-contextual-help" :class="props.position">
    <div class="tooltip-action">
      <button ref="tooltipBtnRef" type="button" class="krds-btn medium icon tooltip-btn" @click="toggleTooltip">
        <span class="sr-only">도움말</span>
        <i v-if="props.helpIcon" class="svg-icon ico-help"></i>
        <i v-else class="svg-icon ico-tooltip"></i>
      </button>
      <div ref="tooltipPopoverRef" class="tooltip-popover" role="tooltip">
        <h4 class="tooltip-title">{{ props.tooltipTitle }}</h4>
        <div class="tooltip-contents">
          <slot />
        </div>
        <button ref="closeBtnRef" type="button" class="krds-btn xsmall icon tooltip-close" @click="closeTooltip">
          <span class="sr-only">닫기</span>
          <i class="svg-icon ico-modal-close"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  export interface KrdsContextualHelpProps {
    tooltipTitle?: string
    helpIcon?: boolean
    position?: 'top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right'
  }

  const props = withDefaults(defineProps<KrdsContextualHelpProps>(), {
    tooltipTitle: '도움말 제목',
    position: 'top left'
  })

  // Template refs
  const containerRef = ref<HTMLElement>()
  const tooltipBtnRef = ref<HTMLElement>()
  const tooltipPopoverRef = ref<HTMLElement>()
  const closeBtnRef = ref<HTMLElement>()

  // State
  const isVisible = ref(false)

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
      closeAllTooltips()
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

    // Setup position classes
    if (containerRef.value.classList.length === 1) {
      containerRef.value.classList.add('top', 'left')
    }

    // Setup ARIA attributes
    if (tooltipBtnRef.value) {
      tooltipBtnRef.value.setAttribute('aria-expanded', 'false')
    }
    if (tooltipPopoverRef.value) {
      tooltipPopoverRef.value.setAttribute('role', 'tooltip')
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
</script>
<style scoped></style>
