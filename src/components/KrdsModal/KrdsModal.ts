import { computed, defineComponent, h, Teleport, type SlotsType } from 'vue'

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
      default: 'krds-modal'
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
    const open = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })

    const titleId = computed(() => `tit_${props.modalId}`)

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

    return () => {
      if (!open.value) return null

      const modalAttrs: Record<string, string> = {
        id: props.modalId,
        class: 'krds-modal fade in shown',
        role: 'dialog',
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
