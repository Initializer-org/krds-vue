import { defineComponent, h, onUnmounted, ref, watch, withModifiers } from 'vue'
import type { PropType } from 'vue'
import type { BaseComponentProps } from '@/types'

export type LanguageData = { code: string; name: string; url?: string }

export type DropdownPosition = 'left' | 'center' | 'right'

/**
 * KRDS LanguageSwitcher 컴포넌트 속성
 */
export interface KrdsLanguageSwitcherProps extends BaseComponentProps {
  /** 언어 목록 */
  languageList: LanguageData[]
  /** 선택된 언어 코드 (v-model) */
  modelValue?: string
  /** 동작 타입 (default: 언어 선택, external: 외부 페이지 이동) */
  type?: 'default' | 'external'
  /** 드롭다운 정렬 위치 */
  dropPosition?: DropdownPosition
}

/**
 * KRDS LanguageSwitcher 컴포넌트 이벤트
 */
export interface KrdsLanguageSwitcherEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'close'): void
}

export default defineComponent<KrdsLanguageSwitcherProps>({
  name: 'KrdsLanguageSwitcher',
  props: {
    languageList: {
      type: Array as PropType<LanguageData[]>,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'default' | 'external'>,
      default: 'default'
    },
    dropPosition: {
      type: String as PropType<DropdownPosition>,
      default: 'center'
    },
    class: {
      type: String,
      default: undefined
    },
    style: {
      type: [String, Object] as PropType<string | Record<string, string | number>>,
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    'update:modelValue': (value: string) => true,
    close: () => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit, slots }) {
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLElement>()
    const buttonRef = ref<HTMLElement>()

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value

      if (isOpen.value && dropdownRef.value) {
        positionDropdown()
      }
    }

    const closeDropdown = () => {
      isOpen.value = false
    }

    const selectLanguage = (languageCode: string) => {
      emit('update:modelValue', languageCode)
      closeDropdown()
      emit('close')
      buttonRef.value?.focus()
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

    /**
     * 기본 타입 (언어 선택)
     */
    const renderDefaultList = () =>
      h(
        'ul',
        { class: 'drop-list' },
        props.languageList.map(language =>
          h('li', { key: language.code }, [
            h(
              'a',
              {
                href: '#',
                class: ['item-link', { active: props.modelValue === language.code }],
                lang: language.code,
                'aria-selected': props.modelValue === language.code,
                onClick: withModifiers(() => selectLanguage(language.code), ['prevent']),
                onFocus: handleItemFocus
              },
              [language.name, ' ', h('span', { class: 'sr-only' }, props.modelValue === language.code ? '선택됨' : '')]
            )
          ])
        )
      )

    /**
     * 외부 페이지 이동 타입
     */
    const renderExternalList = () =>
      h(
        'ul',
        { class: 'drop-list' },
        props.languageList.map(language =>
          h('li', { key: language.code }, [
            h(
              'a',
              {
                href: language.url || '#',
                class: 'item-link',
                lang: language.code,
                target: '_blank',
                title: '새 창 열림',
                onFocus: handleItemFocus
              },
              [language.name, ' ', h('i', { class: 'svg-icon ico-go' })]
            )
          ])
        )
      )

    return () =>
      h(
        'div',
        {
          ref: dropdownRef,
          class: [
            'krds-drop-wrap',
            'krds-language',
            {
              active: isOpen.value,
              'drop-left': props.dropPosition === 'left',
              'drop-right': props.dropPosition === 'right'
            }
          ],
          onFocusout: handleFocusOut
        },
        [
          h(
            'button',
            {
              ref: buttonRef,
              type: 'button',
              class: ['krds-btn small text drop-btn', { active: isOpen.value }],
              'aria-expanded': isOpen.value,
              onClick: toggleDropdown
            },
            [h('i', { class: 'svg-icon ico-global' }), slots.default?.(), h('i', { class: 'svg-icon ico-toggle' })]
          ),
          h('div', { class: 'drop-menu', style: { display: isOpen.value ? 'block' : 'none' } }, [
            h('div', { class: 'drop-in' }, [
              slots['prev-item'] ? h('div', { class: 'drop-top' }, slots['prev-item']()) : null,
              props.type === 'default' ? renderDefaultList() : props.type === 'external' ? renderExternalList() : null
            ])
          ])
        ]
      )
  }
})
