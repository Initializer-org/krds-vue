import { computed, defineComponent, h } from 'vue'

/**
 * KRDS Panel 컴포넌트 속성
 */
export interface KrdsPanelProps {
  /** 도움말 패널 펼침 상태 (v-model) */
  modelValue?: boolean
}

/**
 * KRDS Panel 컴포넌트 이벤트
 */
export interface KrdsPanelEmits {
  (e: 'update:modelValue', value: boolean): void
}

export default defineComponent({
  name: 'KrdsPanel',
  props: {
    /** 도움말 패널 펼침 상태 (v-model) */
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    'update:modelValue': (value: boolean) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit, slots }) {
    const open = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })

    const handleOpen = () => {
      open.value = true
    }
    const handleClose = () => {
      open.value = false
    }

    return () =>
      h('div', { class: 'inner help-panel-flexible' }, [
        h(
          'button',
          {
            type: 'button',
            class: 'krds-btn small tertiary btn-help-panel expand btn-help-exec',
            onClick: handleOpen
          },
          [h('i', { class: 'svg-icon ico-fold' }), ' 도움말']
        ),
        h('div', { class: ['krds-help-panel', { expand: open.value }] }, [
          h('div', { class: 'help-panel-wrap' }, [
            h('div', { class: 'help-conts-area' }, [
              slots.default?.(),
              h(
                'button',
                {
                  type: 'button',
                  class: 'krds-btn small tertiary btn-help-panel fold',
                  onClick: handleClose
                },
                [h('span', { class: 'sr-only' }, '도움말'), ' 접어두기 ', h('i', { class: 'svg-icon ico-angle right' })]
              )
            ])
          ])
        ])
      ])
  }
})
