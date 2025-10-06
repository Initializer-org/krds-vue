import { computed, defineComponent, h, Teleport, watch, onBeforeUnmount, nextTick, ref, getCurrentInstance, type SlotsType } from 'vue'

export type KrdsModalSize = 'small' | 'medium' | 'large'

export interface KrdsModalProps {
  modelValue?: boolean
  modalId?: string
  backdrop?: boolean
  size?: KrdsModalSize
  full?: boolean
  bottomSheet?: boolean
  persistent?: boolean
}

export default defineComponent({
  name: 'KrdsModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    modalId: {
      type: String,
      default: undefined
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    size: {
      type: String as () => KrdsModalSize,
      default: 'medium'
    },
    full: {
      type: Boolean,
      default: false
    },
    bottomSheet: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  slots: Object as SlotsType<{
    title?: () => any
    default?: () => any
    footer?: () => any
  }>,
  setup(props, { slots, emit }) {
    const uid = getCurrentInstance()?.uid
    const computedModalId = computed(() => props.modalId ?? `krds-modal-${uid}`)

    const open = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })

    const titleId = computed(() => `tit_${computedModalId.value}`)

    const sizeClass = computed(() => {
      const sizeMap = {
        small: 'modal-sm',
        medium: 'modal-md',
        large: 'modal-lg'
      }
      return sizeMap[props.size]
    })

    const handleClose = () => {
      open.value = false
    }

    // 배경 스크롤 방지 및 포커스 트래핑
    let originalOverflow = ''
    let previousActiveElement: HTMLElement | null = null
    const modalRef = ref<HTMLElement | null>(null)

    const getFocusableElements = (element: HTMLElement): HTMLElement[] => {
      const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      return Array.from(element.querySelectorAll(selector)).filter(
        el => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1'
      ) as HTMLElement[]
    }

    const trapFocus = (event: KeyboardEvent) => {
      if (!modalRef.value || event.key !== 'Tab') return

      const focusableElements = getFocusableElements(modalRef.value)
      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !props.persistent) {
        handleClose()
      }
    }

    const cleanupEffects = () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', trapFocus)
      document.removeEventListener('keydown', handleKeydown)
      if (previousActiveElement) {
        previousActiveElement.focus()
        previousActiveElement = null
      }
      modalRef.value = null
    }

    watch(
      () => props.modelValue,
      async newValue => {
        if (newValue) {
          originalOverflow = document.body.style.overflow
          document.body.style.overflow = 'hidden'
          previousActiveElement = document.activeElement as HTMLElement

          await nextTick()

          const modalElement = document.getElementById(computedModalId.value)
          if (modalElement) {
            modalRef.value = modalElement

            const modalConts = modalElement.querySelector('.modal-conts') as HTMLElement
            if (modalConts) {
              modalConts.setAttribute('tabindex', '-1')
              modalConts.focus()
            }

            document.addEventListener('keydown', trapFocus)
            document.addEventListener('keydown', handleKeydown)
          }
        } else {
          cleanupEffects()
        }
      },
      { immediate: true }
    )

    onBeforeUnmount(() => {
      if (props.modelValue) {
        cleanupEffects()
      }
    })

    return () => {
      if (!open.value) return null

      const modalAttrs: Record<string, any> = {
        id: computedModalId.value,
        class: 'krds-modal fade in shown',
        role: 'dialog',
        'aria-modal': true,
        'aria-labelledby': titleId.value
      }

      if (props.full) {
        modalAttrs['data-type'] = 'full'
      } else if (props.bottomSheet) {
        modalAttrs['data-type'] = 'bottom-sheet'
      }

      return h(
        Teleport,
        { to: 'body' },
        h('section', modalAttrs, [
          h('div', { class: `modal-dialog ${sizeClass.value}` }, [
            h(
              'div',
              { class: 'modal-content' },
              [
                // modal title
                slots.title
                  ? h('div', { class: 'modal-header' }, [h('h2', { id: titleId.value, class: 'modal-title' }, slots.title())])
                  : null,
                // modal contents
                h('div', { class: 'modal-conts' }, [h('div', { class: 'conts-area' }, slots.default?.())]),
                // modal btn
                slots.footer ? h('div', { class: 'modal-btn btn-wrap' }, slots.footer()) : null,
                // close button
                h(
                  'button',
                  {
                    type: 'button',
                    class: 'krds-btn medium icon btn-close close-modal',
                    onClick: handleClose
                  },
                  [h('span', { class: 'sr-only' }, '닫기'), h('i', { class: 'svg-icon ico-popup-close' })]
                )
              ].filter(Boolean)
            )
          ]),
          h('div', {
            class: props.backdrop ? 'modal-back in' : 'modal-back',
            onClick: props.persistent ? undefined : handleClose
          })
        ])
      )
    }
  }
})
