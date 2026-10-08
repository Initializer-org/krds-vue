import { defineComponent, h, onMounted, onUnmounted, ref, watch, withModifiers } from 'vue'
import type { PropType } from 'vue'

/** 화면 크기 (작게 sm · 보통 md · 조금 크게 lg · 크게 xlg · 가장 크게 xxlg) */
export type KrdsResizeScale = 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg'

/**
 * KRDS Resize 컴포넌트 속성
 */
export interface KrdsResizeProps {
  /** 선택한 화면 크기 (v-model). 지정하면 그 크기로 화면을 확대·축소한다 */
  modelValue?: KrdsResizeScale
}

/**
 * KRDS Resize 컴포넌트 이벤트
 */
export interface KrdsResizeEmits {
  (e: 'update:modelValue', value: KrdsResizeScale): void
  (e: 'close'): void
}

interface ScaleProps {
  key: KrdsResizeScale
  label: string
  zoom: string
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsResize',
  props: {
    /** 선택한 화면 크기 (v-model). 지정하면 그 크기로 화면을 확대·축소한다 */
    modelValue: {
      type: String as PropType<KrdsResizeScale>,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 화면 크기를 골랐을 때 (v-model) */
    'update:modelValue': (value: KrdsResizeScale) => true,
    /** 크기 목록이 닫힐 때 */
    close: () => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit }) {
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLElement>()
    const buttonRef = ref<HTMLElement>()
    const selectedSize = ref<KrdsResizeScale>(props.modelValue ?? 'md')

    const scaleList: ScaleProps[] = [
      { key: 'sm', label: '작게', zoom: '0.9' },
      { key: 'md', label: '보통', zoom: '1' },
      { key: 'lg', label: '조금 크게', zoom: '1.1' },
      { key: 'xlg', label: '크게', zoom: '1.3' },
      { key: 'xxlg', label: '가장 크게', zoom: '1.5' }
    ]

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value

      if (isOpen.value && dropdownRef.value) {
        positionDropdown()
      }
    }

    const closeDropdown = () => {
      isOpen.value = false
    }

    const applySize = (key: KrdsResizeScale) => {
      const scale = scaleList.find(item => item.key === key)
      if (!scale) return
      selectedSize.value = scale.key
      document.body.style.zoom = scale.zoom
    }

    const selectSize = (scale: ScaleProps) => {
      closeDropdown()
      emit('close')
      buttonRef.value?.focus()
      applySize(scale.key)
      emit('update:modelValue', scale.key)
    }

    // v-model로 받은 크기는 마운트할 때와 바뀔 때 화면에 적용한다 (SSR에서는 document가 없어 마운트 후)
    onMounted(() => props.modelValue && applySize(props.modelValue))
    watch(
      () => props.modelValue,
      key => key && applySize(key)
    )

    const resetSize = () => {
      const defaultScale = scaleList.find(scale => scale.key === 'md')
      if (defaultScale) {
        selectSize(defaultScale)
      }
    }

    const positionDropdown = () => {
      if (!dropdownRef.value) return

      const menu = dropdownRef.value.querySelector('.drop-menu') as HTMLElement
      if (!menu) return

      const menuRect = menu.getBoundingClientRect()
      const windowWidth = window.innerWidth

      dropdownRef.value.classList.remove('drop-left', 'drop-right')

      if (menuRect.left < 0) {
        dropdownRef.value.classList.add('drop-left')
      } else if (windowWidth < menuRect.left + menuRect.width) {
        dropdownRef.value.classList.add('drop-right')
      }
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown()
        buttonRef.value?.focus()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.value?.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    const handleFocusOut = (event: FocusEvent) => {
      if (!dropdownRef.value?.contains(event.relatedTarget as Node)) {
        closeDropdown()
      }
    }

    const handleItemFocus = (event: FocusEvent) => {
      if (!dropdownRef.value) return

      const items = dropdownRef.value.querySelectorAll('.drop-list .item-link') as NodeListOf<HTMLElement>
      items.forEach(item => {
        item.style.position = 'relative'
        item.style.zIndex = '0'
      })

      const currentItem = event.target as HTMLElement
      currentItem.style.zIndex = '1'
    }

    watch(isOpen, isDropdownOpen => {
      if (isDropdownOpen) {
        document.addEventListener('keydown', handleKeydown)
        document.addEventListener('click', handleClickOutside)
      } else {
        document.removeEventListener('keydown', handleKeydown)
        document.removeEventListener('click', handleClickOutside)
      }
    })

    onUnmounted(() => {
      // 컴포넌트가 제거될 때 리스너가 남아있지 않도록 보장합니다.
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('click', handleClickOutside)
    })

    return () =>
      h(
        'div',
        {
          ref: dropdownRef,
          class: 'krds-drop-wrap krds-resize',
          'data-adjust': 'scale',
          onFocusout: handleFocusOut
        },
        [
          h(
            'button',
            {
              ref: buttonRef,
              type: 'button',
              class: 'krds-btn small text drop-btn',
              onClick: toggleDropdown
            },
            ['화면크기 ', h('i', { class: 'svg-icon ico-toggle' })]
          ),
          h('div', { class: 'drop-menu', style: { display: isOpen.value ? 'block' : 'none' } }, [
            h('div', { class: 'drop-in' }, [
              h(
                'ul',
                { class: 'drop-list' },
                scaleList.map(scale =>
                  h('li', { key: scale.key }, [
                    h(
                      'button',
                      {
                        type: 'button',
                        class: ['item-link', scale.key, scale.key === selectedSize.value ? 'active' : ''],
                        'data-adjust-scale': scale.key,
                        onClick: withModifiers(() => selectSize(scale), ['prevent']),
                        onFocus: handleItemFocus
                      },
                      scale.label
                    )
                  ])
                )
              ),
              h('div', { class: 'drop-bottom' }, [
                h(
                  'button',
                  {
                    type: 'button',
                    class: 'krds-btn medium text',
                    'data-adjust-scale': 'md',
                    onClick: withModifiers(resetSize, ['prevent']),
                    onFocus: handleItemFocus
                  },
                  [h('i', { class: 'svg-icon ico-reset' }), ' 초기화']
                )
              ])
            ])
          ])
        ]
      )
  }
})
