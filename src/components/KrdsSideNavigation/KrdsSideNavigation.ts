import { defineComponent, ref, computed, h, type VNode, type ComponentPublicInstance } from 'vue'

/**
 * 사이드 네비게이션 아이템 인터페이스
 */
export interface SideNavItem {
  /** 텍스트 */
  text: string
  /** 링크 URL */
  href?: string
  /** 확장 상태 */
  expanded?: boolean
  /** 하위 아이템 */
  subItems?: SideNavSubItem[]
  /** 클릭 핸들러 */
  onClick?: (event: MouseEvent) => void
}

/**
 * 사이드 네비게이션 하위 아이템 인터페이스
 */
export interface SideNavSubItem {
  /** 텍스트 */
  text: string
  /** 링크 URL */
  href?: string
  /** 확장 상태 (3depth popup용) */
  expanded?: boolean
  /** 팝업 제목 (3depth popup용) */
  popupTitle?: string
  /** 하위 아이템 (4depth용) */
  subItems?: SideNavPopupItem[]
  /** 클릭 핸들러 */
  onClick?: (event: MouseEvent) => void
}

/**
 * 사이드 네비게이션 팝업 아이템 인터페이스 (4depth)
 */
export interface SideNavPopupItem {
  /** 텍스트 */
  text: string
  /** 링크 URL */
  href?: string
  /** 클릭 핸들러 */
  onClick?: (event: MouseEvent) => void
}

/**
 * KRDS SideNavigation 컴포넌트 속성
 */
export interface KrdsSideNavigationProps {
  /** 네비게이션 제목 */
  title: string
  /** 메뉴 아이템 배열 */
  modelValue?: SideNavItem[]
}

/**
 * KRDS SideNavigation 컴포넌트 이벤트
 */
export interface KrdsSideNavigationEmits {
  (event: 'update:modelValue', value: SideNavItem[]): void
}

export default defineComponent({
  name: 'KrdsSideNavigation',
  props: {
    title: {
      type: String,
      required: true
    },
    modelValue: {
      type: Array as () => SideNavItem[],
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props: KrdsSideNavigationProps, { emit }: { emit: KrdsSideNavigationEmits }) {
    const modelValue = computed(() => props.modelValue || [])

    // Template refs를 위한 Map들
    const popupTriggerRefs = ref(new Map<string, HTMLButtonElement>())
    const popupRefs = ref(new Map<string, HTMLDivElement>())
    const popupTitleRefs = ref(new Map<string, HTMLButtonElement>())
    const lastClickedPopupButton = ref<HTMLButtonElement | null>(null)

    // Template ref 설정 함수들
    const setPopupTriggerRef = (el: HTMLButtonElement | null, parentIndex: number, subIndex: number) => {
      const key = `${parentIndex}-${subIndex}`
      if (el) {
        popupTriggerRefs.value.set(key, el)
      } else {
        popupTriggerRefs.value.delete(key)
      }
    }

    const setPopupRef = (el: HTMLDivElement | null, parentIndex: number, subIndex: number) => {
      const key = `${parentIndex}-${subIndex}`
      if (el) {
        popupRefs.value.set(key, el)
      } else {
        popupRefs.value.delete(key)
      }
    }

    const setPopupTitleRef = (el: HTMLButtonElement | null, parentIndex: number, subIndex: number) => {
      const key = `${parentIndex}-${subIndex}`
      if (el) {
        popupTitleRefs.value.set(key, el)
      } else {
        popupTitleRefs.value.delete(key)
      }
    }

    /**
     * 서브메뉴 토글
     */
    const toggleSubmenu = (index: number) => {
      const newMenuItems = [...modelValue.value]
      const item = newMenuItems[index]
      if (item.subItems) {
        const wasExpanded = item.expanded
        item.expanded = !item.expanded

        // 2뎁스가 닫힐 때 모든 3뎁스 팝업들을 닫기
        if (wasExpanded && !item.expanded) {
          closeAllPopupsInSubmenu(item.subItems)
        }

        emit('update:modelValue', newMenuItems)
      }
    }

    /**
     * 서브메뉴 내 모든 팝업 닫기
     */
    const closeAllPopupsInSubmenu = (subItems: SideNavSubItem[]) => {
      subItems.forEach(subItem => {
        if (subItem.subItems && subItem.expanded) {
          subItem.expanded = false
        }
      })

      // 마지막 클릭된 팝업 버튼 참조 초기화
      lastClickedPopupButton.value = null
    }

    /**
     * 팝업 토글
     */
    const togglePopup = (parentIndex: number, subIndex: number) => {
      const newMenuItems = [...modelValue.value]
      const parentItem = newMenuItems[parentIndex]
      if (parentItem.subItems) {
        const subItem = parentItem.subItems[subIndex]
        if (subItem.subItems) {
          subItem.expanded = !subItem.expanded

          if (subItem.expanded) {
            // 현재 클릭된 버튼 저장 - template ref 사용
            const key = `${parentIndex}-${subIndex}`
            lastClickedPopupButton.value = popupTriggerRefs.value.get(key) || null

            // 팝업이 열릴 때 포커스 관리 - template ref 사용
            const popupElement = popupRefs.value.get(key)
            const titleButton = popupTitleRefs.value.get(key)

            if (popupElement && titleButton) {
              popupElement.addEventListener(
                'transitionend',
                () => {
                  titleButton.focus()
                },
                { once: true }
              )
            }
          }

          emit('update:modelValue', newMenuItems)
        }
      }
    }

    /**
     * 팝업 닫기
     */
    const closePopup = (parentIndex: number, subIndex: number) => {
      const newMenuItems = [...modelValue.value]
      const parentItem = newMenuItems[parentIndex]
      if (parentItem.subItems) {
        const subItem = parentItem.subItems[subIndex]
        if (subItem.subItems && subItem.expanded) {
          subItem.expanded = false

          // 포커스를 원래 버튼으로 돌리기
          if (lastClickedPopupButton.value) {
            const buttonToFocus = lastClickedPopupButton.value
            requestAnimationFrame(() => {
              buttonToFocus.focus()
            })
            lastClickedPopupButton.value = null
          }

          emit('update:modelValue', newMenuItems)
        }
      }
    }

    /**
     * 팝업 외부 클릭 시 닫기
     */
    const handlePopupFocusOut = (event: FocusEvent, parentIndex: number, subIndex: number) => {
      const key = `${parentIndex}-${subIndex}`
      const popupElement = popupRefs.value.get(key)
      if (popupElement && !popupElement.contains(event.relatedTarget as Node)) {
        closePopup(parentIndex, subIndex)
      }
    }

    /**
     * 팝업 제목 클릭 시 닫기
     */
    const handlePopupTitleClick = (parentIndex: number, subIndex: number) => {
      closePopup(parentIndex, subIndex)
    }

    /**
     * 아이템 클릭 핸들러
     */
    const handleItemClick = (item: SideNavItem | SideNavSubItem | SideNavPopupItem, event: MouseEvent) => {
      if (item.onClick) {
        item.onClick(event)
      }
    }

    /**
     * 4depth 아이템 렌더링
     */
    const renderPopupItems = (items: SideNavPopupItem[], parentIndex: number, subIndex: number): VNode[] => {
      return items.map((popupItem, popupIndex) =>
        h(
          'li',
          {
            key: `popup-item-${parentIndex}-${subIndex}-${popupIndex}`,
            role: 'none'
          },
          h(
            'a',
            {
              href: popupItem.href || '#',
              class: 'lnb-btn',
              role: 'menuitem',
              onClick: (event: MouseEvent) => handleItemClick(popupItem, event)
            },
            popupItem.text
          )
        )
      )
    }

    /**
     * 3depth 서브메뉴 렌더링
     */
    const renderSubItems = (subItems: SideNavSubItem[], parentIndex: number): VNode[] => {
      return subItems.map((subItem, subIndex) => {
        const key = `lnb-subitem-${parentIndex}-${subIndex}`

        return h(
          'li',
          {
            key,
            class: ['lnb-subitem', { active: subItem.expanded }],
            role: 'none'
          },
          [
            // 3depth 링크 또는 팝업 버튼
            !subItem.subItems
              ? h(
                  'a',
                  {
                    href: subItem.href || '#',
                    class: ['lnb-btn', 'lnb-link'],
                    role: 'menuitem',
                    onClick: (event: MouseEvent) => handleItemClick(subItem, event)
                  },
                  subItem.text
                )
              : [
                  // 3depth 팝업 버튼
                  h(
                    'button',
                    {
                      ref: (el: Element | ComponentPublicInstance | null) =>
                        setPopupTriggerRef(el as HTMLButtonElement | null, parentIndex, subIndex),
                      type: 'button',
                      class: 'lnb-btn lnb-toggle-popup',
                      role: 'menuitem',
                      'aria-controls': `lnbmenu-${parentIndex}-${subIndex}`,
                      'aria-expanded': subItem.expanded ? 'true' : 'false',
                      'aria-haspopup': 'true',
                      onClick: () => togglePopup(parentIndex, subIndex)
                    },
                    subItem.text
                  ),

                  // 3depth 팝업 서브메뉴
                  h(
                    'div',
                    {
                      ref: (el: Element | ComponentPublicInstance | null) =>
                        setPopupRef(el as HTMLDivElement | null, parentIndex, subIndex),
                      id: `lnbmenu-${parentIndex}-${subIndex}`,
                      class: ['lnb-submenu-lv2', { active: subItem.expanded }],
                      role: 'menu',
                      onFocusout: (event: FocusEvent) => handlePopupFocusOut(event, parentIndex, subIndex)
                    },
                    [
                      // 팝업 제목 버튼
                      h(
                        'button',
                        {
                          ref: (el: Element | ComponentPublicInstance | null) =>
                            setPopupTitleRef(el as HTMLButtonElement | null, parentIndex, subIndex),
                          type: 'button',
                          class: 'lnb-btn-tit',
                          tabindex: 0,
                          onClick: () => handlePopupTitleClick(parentIndex, subIndex)
                        },
                        subItem.popupTitle || subItem.text
                      ),

                      // 4depth 아이템 목록
                      h('ul', {}, renderPopupItems(subItem.subItems || [], parentIndex, subIndex))
                    ]
                  )
                ]
          ]
        )
      })
    }

    /**
     * 2depth 메뉴 아이템 렌더링
     */
    const renderMenuItems = (): VNode[] => {
      return modelValue.value.map((item: SideNavItem, index: number) =>
        h(
          'li',
          {
            key: `lnb-item-${index}`,
            class: ['lnb-item', { active: item.expanded }],
            role: 'none'
          },
          [
            // 2depth 토글 버튼
            h(
              'button',
              {
                type: 'button',
                class: ['lnb-btn', 'lnb-toggle', { active: item.expanded }],
                role: 'menuitem',
                'aria-controls': `lnbmenu-${index}`,
                'aria-expanded': item.expanded ? 'true' : 'false',
                onClick: () => toggleSubmenu(index)
              },
              item.text
            ),

            // 2depth 서브메뉴
            item.subItems
              ? h(
                  'div',
                  {
                    class: 'lnb-submenu'
                  },
                  [
                    h(
                      'ul',
                      {
                        id: `lnbmenu-${index}`,
                        role: 'menu'
                      },
                      renderSubItems(item.subItems, index)
                    )
                  ]
                )
              : null
          ]
        )
      )
    }

    return () =>
      h('nav', { class: 'krds-side-navigation' }, [
        h('h2', { class: 'lnb-tit' }, props.title),
        h(
          'ul',
          {
            class: 'lnb-list',
            role: 'menubar'
          },
          renderMenuItems()
        )
      ])
  }
})
