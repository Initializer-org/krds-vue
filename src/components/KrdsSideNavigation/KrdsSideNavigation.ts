import { defineComponent, ref, computed, h, onBeforeUnmount, onMounted, useId, type VNode, type ComponentPublicInstance } from 'vue'

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

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsSideNavigation',
  props: {
    /** 네비게이션 제목 */
    title: {
      type: String,
      required: true
    },
    /** 메뉴 아이템 배열 */
    modelValue: {
      type: Array as () => SideNavItem[],
      default: () => []
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 메뉴를 펼치거나 접어 항목 상태가 바뀔 때 (v-model) */
    'update:modelValue': (value: SideNavItem[]) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props: KrdsSideNavigationProps, { emit }: { emit: KrdsSideNavigationEmits }) {
    const modelValue = computed(() => props.modelValue || [])
    // 한 페이지에 여러 개를 두어도 aria-controls 대상 id가 겹치지 않도록
    const uid = useId()

    // Template refs를 위한 Map들
    const popupTriggerRefs = ref(new Map<string, HTMLButtonElement>())
    const popupRefs = ref(new Map<string, HTMLDivElement>())
    const popupTitleRefs = ref(new Map<string, HTMLButtonElement>())

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
      const newMenuItems = modelValue.value.map((item, idx) => {
        if (idx === index && item.subItems) {
          const wasExpanded = item.expanded
          const updatedItem = {
            ...item,
            expanded: !item.expanded
          }

          // 2뎁스가 닫힐 때 모든 3뎁스 팝업들을 닫기
          if (wasExpanded && !updatedItem.expanded) {
            updatedItem.subItems = item.subItems.map(subItem => ({
              ...subItem,
              expanded: false
            }))
          }

          return updatedItem
        }
        return item
      })

      emit('update:modelValue', newMenuItems)
    }

    /**
     * 팝업 토글
     */
    const togglePopup = (parentIndex: number, subIndex: number) => {
      const newMenuItems = modelValue.value.map((item, idx) => {
        if (idx === parentIndex && item.subItems) {
          return {
            ...item,
            subItems: item.subItems.map((subItem, subIdx) => {
              if (subIdx === subIndex && subItem.subItems) {
                const updatedSubItem = {
                  ...subItem,
                  expanded: !subItem.expanded
                }

                if (updatedSubItem.expanded) {
                  // 팝업이 열릴 때 포커스 관리 - template ref 사용
                  const key = `${parentIndex}-${subIndex}`
                  const popupElement = popupRefs.value.get(key)
                  const titleButton = popupTitleRefs.value.get(key)

                  if (popupElement && titleButton) {
                    // visibility 전환이 끝나야 초점을 받을 수 있다. 그 사이 닫혔으면 옮기지 않는다
                    const focusTitle = () => isPopupOpen(parentIndex, subIndex) && titleButton.focus()
                    popupElement.addEventListener('transitionend', focusTitle, { once: true })
                    // 전환이 없으면(transition: none 등) transitionend가 오지 않으므로 렌더 후 바로 포커스
                    requestAnimationFrame(() => {
                      if (!popupElement.getAnimations({ subtree: true }).length) focusTitle()
                    })
                  }
                }

                return updatedSubItem
              }
              return subItem
            })
          }
        }
        return item
      })

      emit('update:modelValue', newMenuItems)
    }

    const isPopupOpen = (parentIndex: number, subIndex: number) => !!modelValue.value[parentIndex]?.subItems?.[subIndex]?.expanded

    /**
     * 조건에 맞는 열린 팝업을 한 번에 닫는다
     */
    const closePopups = (shouldClose: (parentIndex: number, subIndex: number) => boolean) => {
      if (!modelValue.value.some((item, idx) => item.subItems?.some((subItem, subIdx) => subItem.expanded && shouldClose(idx, subIdx))))
        return
      const newMenuItems = modelValue.value.map((item, idx) =>
        item.subItems
          ? {
              ...item,
              subItems: item.subItems.map((subItem, subIdx) =>
                subItem.subItems && subItem.expanded && shouldClose(idx, subIdx) ? { ...subItem, expanded: false } : subItem
              )
            }
          : item
      )

      emit('update:modelValue', newMenuItems)
    }

    const closePopup = (parentIndex: number, subIndex: number) => closePopups((idx, subIdx) => idx === parentIndex && subIdx === subIndex)

    /**
     * 초점이 팝업 밖의 다른 요소로 옮겨 가면 닫고, 옮겨 간 초점은 그대로 둔다 (WAI-ARIA 메뉴 패턴).
     * 갈 곳 없이 빠진 초점(다른 창으로 전환 등)은 무시하고, 빈 곳 클릭은 문서 클릭으로 닫는다
     */
    const handlePopupFocusOut = (event: FocusEvent, parentIndex: number, subIndex: number) => {
      const next = event.relatedTarget as Node | null
      const popupElement = popupRefs.value.get(`${parentIndex}-${subIndex}`)
      if (next && popupElement && !popupElement.contains(next)) {
        closePopup(parentIndex, subIndex)
      }
    }

    /**
     * 팝업 제목으로 닫으면 연 버튼으로 초점을 돌려준다
     */
    const handlePopupTitleClick = (parentIndex: number, subIndex: number) => {
      closePopup(parentIndex, subIndex)
      popupTriggerRefs.value.get(`${parentIndex}-${subIndex}`)?.focus()
    }

    /**
     * 팝업 밖을 누르면 누른 항목의 팝업만 남기고 닫는다
     */
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node
      closePopups((idx, subIdx) => !popupRefs.value.get(`${idx}-${subIdx}`)?.parentElement?.contains(target))
    }
    onMounted(() => document.addEventListener('click', handleDocumentClick))
    onBeforeUnmount(() => document.removeEventListener('click', handleDocumentClick))

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
                      'aria-controls': `${uid}-lnbmenu-${parentIndex}-${subIndex}`,
                      'aria-expanded': subItem.expanded ? 'true' : 'false',
                      'aria-haspopup': 'true',
                      onClick: () => togglePopup(parentIndex, subIndex)
                    },
                    subItem.text
                  ),

                  // 3depth 팝업 서브메뉴. 원본은 이 div가 role="menu"라 제목 버튼·역할 없는 ul이 메뉴 안에 섞인다.
                  // div는 바깥 메뉴 안에 둘 수 있는 group으로, 메뉴는 ul로 옮겨 항목이 메뉴에 바로 속하게 한다
                  h(
                    'div',
                    {
                      ref: (el: Element | ComponentPublicInstance | null) =>
                        setPopupRef(el as HTMLDivElement | null, parentIndex, subIndex),
                      class: ['lnb-submenu-lv2', { active: subItem.expanded }],
                      role: 'group',
                      'aria-label': subItem.popupTitle || subItem.text,
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
                          role: 'menuitem',
                          onClick: () => handlePopupTitleClick(parentIndex, subIndex)
                        },
                        subItem.popupTitle || subItem.text
                      ),

                      // 4depth 아이템 목록
                      h(
                        'ul',
                        { id: `${uid}-lnbmenu-${parentIndex}-${subIndex}`, role: 'menu', 'aria-label': subItem.popupTitle || subItem.text },
                        renderPopupItems(subItem.subItems || [], parentIndex, subIndex)
                      )
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
            // 2depth 토글 버튼 (하위 메뉴가 없으면 링크)
            item.subItems
              ? h(
                  'button',
                  {
                    type: 'button',
                    class: ['lnb-btn', 'lnb-toggle', { active: item.expanded }],
                    role: 'menuitem',
                    'aria-controls': `${uid}-lnbmenu-${index}`,
                    'aria-expanded': item.expanded ? 'true' : 'false',
                    onClick: () => toggleSubmenu(index)
                  },
                  item.text
                )
              : h(
                  'a',
                  {
                    href: item.href || '#',
                    class: ['lnb-btn', 'lnb-link'],
                    role: 'menuitem',
                    onClick: (event: MouseEvent) => handleItemClick(item, event)
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
                        id: `${uid}-lnbmenu-${index}`,
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
