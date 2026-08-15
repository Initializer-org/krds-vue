import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  Teleport,
  useId,
  watch,
  type ComponentPublicInstance,
  type PropType,
  type SlotsType,
  type VNode
} from 'vue'

// ========================
// 타입 정의
// ========================

/**
 * 메인 메뉴 렌더링 방식
 * - `pc`: 데스크탑 메가 메뉴 (`.krds-main-menu`)
 * - `mobile`: 모바일 드로어 메뉴 (`.krds-main-menu-mobile`)
 */
export type MainMenuVariant = 'pc' | 'mobile'

/**
 * 서브 패널 레이아웃
 * - `default`: 배너 영역이 하단에 위치
 * - `between`: 배너 영역이 우측에 위치
 */
export type MainMenuLayout = 'default' | 'between'

/**
 * 모바일 4depth 아이템 인터페이스
 */
export interface MainMenuDepth4Item {
  /** 텍스트 */
  text: string
  /** 링크 URL */
  href?: string
  /** 새 창 열림 여부 */
  external?: boolean
  /** 현재 페이지 여부 (강조 표시) */
  selected?: boolean
  /** 클릭 핸들러 */
  onClick?: (event: MouseEvent) => void
}

/**
 * 링크 아이템 인터페이스
 *
 * PC에서는 서브 패널의 마지막 뎁스, 모바일에서는 3depth로 렌더링된다.
 */
export interface MainMenuLinkItem {
  /** 텍스트 */
  text: string
  /** 링크 URL (없으면 button으로 렌더링) */
  href?: string
  /** 새 창 열림 여부 */
  external?: boolean
  /** 메뉴 설명 (PC에서 `type-description` 스타일로 렌더링) */
  description?: string
  /** 현재 페이지 여부 (강조 표시) */
  selected?: boolean
  /** 4depth 패널 제목 (모바일 전용, 기본값은 `text`) */
  panelTitle?: string
  /** 하위 아이템 (모바일 4depth 전용) */
  items?: MainMenuDepth4Item[]
  /** 클릭 핸들러 */
  onClick?: (event: MouseEvent) => void
}

/**
 * 2depth 아이템 인터페이스
 *
 * `items`가 있으면 서브 패널을 여는 트리거로, 없으면 바로가기 링크로 렌더링된다.
 */
export interface MainMenuSubItem {
  /** 텍스트 */
  text: string
  /** 링크 URL (`items`가 없을 때 바로가기 링크로 사용) */
  href?: string
  /** 새 창 열림 여부 */
  external?: boolean
  /** 서브 패널 제목 (기본값은 `text`) */
  title?: string
  /** 서브 패널 제목 옆 바로가기 링크 (PC 전용) */
  titleLink?: { text?: string; href: string }
  /** 하위 아이템 (PC 마지막 뎁스 / 모바일 3depth) */
  items?: MainMenuLinkItem[]
  /** 배너 영역 표시 여부 (`banner` 슬롯 필요, PC 전용) */
  banner?: boolean
  /** 서브 패널 레이아웃 (PC 전용) */
  layout?: MainMenuLayout
  /** 모바일 3depth 초기 확장 상태 */
  expanded?: boolean
  /** 현재 페이지 여부 (강조 표시) */
  selected?: boolean
  /** 클릭 핸들러 */
  onClick?: (event: MouseEvent) => void
}

/**
 * 1depth 메인 메뉴 아이템 인터페이스
 *
 * `subItems`가 있으면 2depth 목록을 가진 메가 패널을, `items`만 있으면
 * 2depth 목록 없이 링크만 나열하는 `single-list` 패널을 렌더링한다.
 * 둘 다 없으면 단순 링크(`is-link`)로 렌더링된다.
 */
export interface MainMenuItem {
  /** 텍스트 */
  text: string
  /** 링크 URL (하위 메뉴가 없을 때 단순 링크로 사용) */
  href?: string
  /** 새 창 열림 여부 */
  external?: boolean
  /** 2depth 아이템 목록 */
  subItems?: MainMenuSubItem[]
  /** 2depth 없이 바로 나열되는 링크 목록 (`single-list`) */
  items?: MainMenuLinkItem[]
  /** `single-list` 패널 제목 */
  title?: string
  /** `single-list` 배너 영역 표시 여부 (`banner` 슬롯 필요) */
  banner?: boolean
  /** `single-list` 패널 레이아웃 */
  layout?: MainMenuLayout
  /** 현재 페이지 여부 (강조 표시) */
  selected?: boolean
  /** 클릭 핸들러 */
  onClick?: (event: MouseEvent) => void
}

/** 클릭 이벤트로 전달되는 아이템 타입 */
export type MainMenuAnyItem = MainMenuItem | MainMenuSubItem | MainMenuLinkItem | MainMenuDepth4Item

/**
 * KRDS MainMenu 컴포넌트 속성
 */
export interface KrdsMainMenuProps {
  /** 메뉴 아이템 배열 */
  items?: MainMenuItem[]
  /** 렌더링 방식 */
  variant?: MainMenuVariant
  /** 메뉴 영역 레이블 */
  ariaLabel?: string
  /** 모바일 드로어 열림 상태 (v-model:open) */
  open?: boolean
  /** 모바일 드로어 요소 id (외부 트리거의 `aria-controls` 대상) */
  mobileId?: string
  /** PC 메가 패널 배경 딤(backdrop) 사용 여부 */
  backdrop?: boolean
  /** 모바일 드로어 닫기 버튼 레이블 */
  closeLabel?: string
}

/**
 * KRDS MainMenu 컴포넌트 이벤트
 */
export interface KrdsMainMenuEmits {
  /** 모바일 드로어 열림 상태 변경 */
  (event: 'update:open', value: boolean): void
  /** PC 메가 패널 열림/닫힘 */
  (event: 'menu-toggle', index: number, expanded: boolean): void
  /** 메뉴 아이템 클릭 */
  (event: 'item-click', item: MainMenuAnyItem, mouseEvent: MouseEvent): void
}

// ========================
// 상수
// ========================

/** 새 창으로 열리는 링크의 title 값 */
const NEW_WINDOW_TITLE = '새 창 열림'

/** 드로어 전환(transition) 시간과 맞춘 지연 시간 (ms) */
const DRAWER_OPEN_DELAY = 100
const DRAWER_CLOSE_DELAY = 400

/** 포커스 트랩 대상 셀렉터 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default defineComponent({
  name: 'KrdsMainMenu',
  props: {
    /** 메뉴 아이템 배열 */
    items: {
      type: Array as PropType<MainMenuItem[]>,
      default: () => []
    },
    /** 렌더링 방식 */
    variant: {
      type: String as PropType<MainMenuVariant>,
      default: 'pc'
    },
    /** 메뉴 영역 레이블 */
    ariaLabel: {
      type: String,
      default: '메인 메뉴'
    },
    /** 모바일 드로어 열림 상태 (v-model:open) */
    open: {
      type: Boolean,
      default: false
    },
    /** 모바일 드로어 요소 id (외부 트리거의 `aria-controls` 대상) */
    mobileId: {
      type: String,
      default: 'mobile-nav'
    },
    /** PC 메가 패널 배경 딤(backdrop) 사용 여부 */
    backdrop: {
      type: Boolean,
      default: true
    },
    /** 모바일 드로어 닫기 버튼 레이블 */
    closeLabel: {
      type: String,
      default: '전체메뉴 닫기'
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    'update:open': (value: boolean) => true,
    'menu-toggle': (index: number, expanded: boolean) => true,
    'item-click': (item: MainMenuAnyItem, mouseEvent: MouseEvent) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  slots: Object as SlotsType<{
    /** PC 서브 패널 배너 영역 */
    banner?(props: { item: MainMenuItem; subItem?: MainMenuSubItem; index: number; subIndex: number }): VNode[]
    /** 모바일 드로어 헤더 영역 (유틸리티, 로그인, 검색 등) */
    header?(): VNode[]
    /** 모바일 드로어 하단 영역 */
    bottom?(): VNode[]
  }>,
  setup(props, { emit, slots }) {
    const uid = useId()

    const rootRef = ref<HTMLElement | null>(null)
    const wrapRef = ref<HTMLElement | null>(null)
    const bodyRef = ref<HTMLElement | null>(null)

    const isPc = computed(() => props.variant === 'pc')

    // ========================
    // 고유 id 생성 (SSR 안전)
    // ========================

    const panelId = (index: number) => `${uid}-gnb-panel-${index}`
    const subPanelId = (index: number, subIndex: number) => `${uid}-gnb-sub-${index}-${subIndex}`
    const tabId = (index: number) => `${uid}-gnb-tab-${index}`
    const depth3Id = (index: number, subIndex: number) => `${uid}-gnb-depth3-${index}-${subIndex}`

    // ========================
    // 구조 판별 헬퍼
    // ========================

    /** 2depth 목록을 가진 메가 패널인지 */
    const hasSubColumns = (item?: MainMenuItem) => !!item?.subItems?.length
    /** 2depth 없이 링크만 나열하는 패널인지 */
    const hasSingleList = (item?: MainMenuItem) => !hasSubColumns(item) && !!item?.items?.length
    /** 펼칠 패널을 가지고 있는지 */
    const hasPanel = (item?: MainMenuItem) => hasSubColumns(item) || hasSingleList(item)
    /** 2depth가 서브 패널 없이 바로가기 링크로만 동작하는지 */
    const isSubLink = (subItem: MainMenuSubItem) => !subItem.items?.length

    /** 새 창 링크 속성 */
    const externalAttrs = (external?: boolean) =>
      external ? { target: '_blank', rel: 'noopener noreferrer', title: NEW_WINDOW_TITLE } : {}

    /**
     * 아이템 클릭 처리
     */
    const handleItemClick = (item: MainMenuAnyItem, event: MouseEvent) => {
      item.onClick?.(event)
      emit('item-click', item, event)
    }

    // ========================
    // PC 상태
    // ========================

    /** 열려 있는 1depth 인덱스 (-1이면 모두 닫힘) */
    const openIndex = ref(-1)
    /** 사용자가 선택한 2depth 인덱스 (1depth 인덱스별) */
    const subOverrides = ref<Record<number, number>>({})
    /** 활성 서브 패널 높이에 맞춘 `.gnb-main-list` 최소 높이 */
    const panelMinHeight = ref(0)

    const mainListEls = new Map<number, HTMLElement>()
    const mainTriggerEls = new Map<number, HTMLElement>()

    const setElRef = (map: Map<number, HTMLElement>, el: Element | ComponentPublicInstance | null, key: number) => {
      if (el) {
        map.set(key, el as HTMLElement)
      } else {
        map.delete(key)
      }
    }

    /**
     * 기본 활성 2depth 인덱스
     *
     * 원본 스크립트와 동일하게 링크가 아닌 첫 번째 2depth를 활성화한다.
     */
    const defaultSubIndex = (item?: MainMenuItem) => {
      const index = item?.subItems?.findIndex(subItem => !isSubLink(subItem))
      return index === undefined ? -1 : index
    }

    const activeSubIndex = (index: number) => {
      const override = subOverrides.value[index]
      return override === undefined ? defaultSubIndex(props.items[index]) : override
    }

    /**
     * body 상태 클래스 토글 (backdrop 노출 및 스크롤 잠금)
     */
    const setPcBodyState = (isOpen: boolean) => {
      if (typeof document === 'undefined') return
      document.body.classList.toggle('is-gnb-web', isOpen)
      const needsScroll = document.body.scrollHeight > window.innerHeight
      document.body.classList.toggle('hasScrollY', isOpen && needsScroll)
    }

    /**
     * 활성 서브 패널 높이에 맞춰 `.gnb-main-list` 최소 높이를 보정
     *
     * `.gnb-sub-list`가 absolute로 배치되므로 부모 높이를 직접 맞춰줘야 한다.
     */
    const adjustPanelHeight = async () => {
      await nextTick()
      const listEl = mainListEls.get(openIndex.value)
      const activeSubList = listEl?.querySelector<HTMLElement>('.gnb-sub-list.active')
      panelMinHeight.value = activeSubList?.scrollHeight ?? 0
    }

    /**
     * 메가 패널 닫기
     */
    const closeMainMenu = (restoreFocus = false) => {
      if (openIndex.value === -1) return
      const closedIndex = openIndex.value
      openIndex.value = -1
      panelMinHeight.value = 0
      setPcBodyState(false)
      emit('menu-toggle', closedIndex, false)
      if (restoreFocus) mainTriggerEls.get(closedIndex)?.focus()
    }

    /**
     * 메가 패널 토글
     */
    const toggleMainMenu = (index: number) => {
      if (!hasPanel(props.items[index])) return
      if (openIndex.value === index) {
        closeMainMenu()
        return
      }
      openIndex.value = index
      setPcBodyState(true)
      emit('menu-toggle', index, true)
      void adjustPanelHeight()
    }

    /**
     * 2depth 선택
     */
    const selectSubMenu = (index: number, subIndex: number) => {
      subOverrides.value = { ...subOverrides.value, [index]: subIndex }
      void adjustPanelHeight()
    }

    /**
     * 메뉴 외부 클릭 시 닫기 (backdrop 클릭 포함)
     */
    const handleDocumentClick = (event: MouseEvent) => {
      const root = rootRef.value
      if (!root || root.contains(event.target as Node)) return
      closeMainMenu()
    }

    /**
     * 포커스가 메뉴 밖으로 이동하면 닫기 (Tab 이탈)
     */
    const handlePcFocusout = (event: FocusEvent) => {
      const root = rootRef.value
      const nextTarget = event.relatedTarget as Node | null
      if (!root || !nextTarget || root.contains(nextTarget)) return
      closeMainMenu()
    }

    /**
     * PC 키보드 내비게이션 (ESC / Home / End / 방향키)
     */
    const handlePcKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMainMenu(true)
        return
      }

      const target = event.target as HTMLElement | null
      if (!target?.dataset.trigger) return

      const focusSibling = (direction: 'next' | 'prev') => {
        const listItem = target.closest('li')
        const sibling = direction === 'next' ? listItem?.nextElementSibling : listItem?.previousElementSibling
        sibling?.querySelector<HTMLElement>('[data-trigger]')?.focus()
      }

      switch (event.key) {
        case 'Home':
          event.preventDefault()
          mainTriggerEls.get(0)?.focus()
          break
        case 'End':
          event.preventDefault()
          mainTriggerEls.get(props.items.length - 1)?.focus()
          break
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          focusSibling('next')
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          focusSibling('prev')
          break
        default:
          break
      }
    }

    // ========================
    // 모바일 상태
    // ========================

    /** 활성 1depth 탭 인덱스 */
    const activeTab = ref(0)
    /** 3depth 확장 상태 (`${index}-${subIndex}` 키) */
    const depth3Expanded = ref<Record<string, boolean>>({})
    /** 표시 중인 4depth 패널 키 (`display` 제어) */
    const depth4Displayed = ref<string | null>(null)
    /** 열려 있는 4depth 패널 키 (`is-open` 제어) */
    const depth4Opened = ref<string | null>(null)
    /** 드로어 DOM 표시 여부 */
    const drawerDisplayed = ref(props.open)
    /** 드로어 열림 상태 (`is-open` / `is-backdrop`) */
    const drawerOpened = ref(props.open)

    const panelEls = new Map<number, HTMLElement>()
    const depth3TriggerEls = new Map<string, HTMLElement>()
    const depth4Els = new Map<string, HTMLElement>()
    const depth4PrevEls = new Map<string, HTMLElement>()

    const setKeyedRef = (map: Map<string, HTMLElement>, el: Element | ComponentPublicInstance | null, key: string) => {
      if (el) {
        map.set(key, el as HTMLElement)
      } else {
        map.delete(key)
      }
    }

    let openTimer: ReturnType<typeof setTimeout> | undefined
    let closeTimer: ReturnType<typeof setTimeout> | undefined

    const setMobileBodyState = (isOpen: boolean) => {
      if (typeof document === 'undefined') return
      document.body.classList.toggle('is-gnb-mobile', isOpen)
    }

    /**
     * 드로어 열기
     *
     * `display` 변경 직후에는 transition이 동작하지 않으므로,
     * 원본과 동일하게 지연을 두고 열림 클래스를 부여한다.
     */
    const openDrawer = () => {
      if (closeTimer) clearTimeout(closeTimer)
      drawerDisplayed.value = true
      openTimer = setTimeout(() => {
        drawerOpened.value = true
        setMobileBodyState(true)
        wrapRef.value?.focus()
      }, DRAWER_OPEN_DELAY)
    }

    /**
     * 드로어 닫기
     */
    const closeDrawer = () => {
      if (openTimer) clearTimeout(openTimer)
      drawerOpened.value = false
      closeTimer = setTimeout(() => {
        drawerDisplayed.value = false
        setMobileBodyState(false)
      }, DRAWER_CLOSE_DELAY)
    }

    watch(
      () => props.open,
      isOpen => {
        if (isOpen) {
          openDrawer()
        } else {
          closeDrawer()
        }
      }
    )

    /**
     * 1depth 탭 클릭 시 해당 패널 위치로 스크롤
     */
    const handleTabClick = (event: MouseEvent, index: number) => {
      event.preventDefault()
      activeTab.value = index
      const body = bodyRef.value
      const panel = panelEls.get(index)
      if (body && panel) {
        body.scrollTo({ left: 0, top: panel.offsetTop, behavior: 'smooth' })
      }
    }

    /**
     * 스크롤 위치에 따라 활성 탭 갱신
     */
    const handleBodyScroll = () => {
      const body = bodyRef.value
      if (!body) return
      const { scrollTop, scrollHeight, clientHeight } = body
      let nextActive = activeTab.value
      panelEls.forEach((panel, index) => {
        if (scrollTop >= panel.offsetTop || scrollTop + clientHeight >= scrollHeight) {
          nextActive = index
        }
      })
      activeTab.value = nextActive
    }

    /**
     * 3depth 토글
     */
    const toggleDepth3 = (event: MouseEvent, key: string) => {
      event.preventDefault()
      depth3Expanded.value = { ...depth3Expanded.value, [key]: !depth3Expanded.value[key] }
    }

    /**
     * 4depth 패널 열기
     */
    const openDepth4 = async (event: MouseEvent, key: string) => {
      event.preventDefault()
      depth4Displayed.value = key
      await nextTick()
      depth4Opened.value = key
      await nextTick()
      depth4PrevEls.get(key)?.focus()
    }

    /**
     * 4depth 패널 닫기
     */
    const closeDepth4 = (key: string) => {
      depth4Opened.value = null
      depth3TriggerEls.get(key)?.focus()
      setTimeout(() => {
        if (!depth4Opened.value) depth4Displayed.value = null
      }, DRAWER_CLOSE_DELAY)
    }

    /**
     * 포커스 트랩
     */
    const trapFocus = (container: HTMLElement, event: KeyboardEvent) => {
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || active === container)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    /**
     * 모바일 키보드 처리 (ESC 닫기 + 포커스 트랩)
     */
    const handleMobileKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (depth4Opened.value) {
          closeDepth4(depth4Opened.value)
        } else {
          emit('update:open', false)
        }
        return
      }

      if (event.key !== 'Tab') return
      const container = depth4Opened.value ? depth4Els.get(depth4Opened.value) : wrapRef.value
      if (container) trapFocus(container, event)
    }

    // ========================
    // 라이프사이클
    // ========================

    onMounted(() => {
      if (isPc.value) {
        document.addEventListener('click', handleDocumentClick)
        return
      }
      if (props.open) {
        drawerDisplayed.value = true
        drawerOpened.value = true
        setMobileBodyState(true)
      }
      // 초기 확장 상태 반영
      const initialExpanded: Record<string, boolean> = {}
      props.items.forEach((item, index) => {
        item.subItems?.forEach((subItem, subIndex) => {
          if (subItem.expanded) initialExpanded[`${index}-${subIndex}`] = true
        })
      })
      depth3Expanded.value = initialExpanded
    })

    onBeforeUnmount(() => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('click', handleDocumentClick)
        document.body.classList.remove('is-gnb-web', 'hasScrollY', 'is-gnb-mobile')
      }
      if (openTimer) clearTimeout(openTimer)
      if (closeTimer) clearTimeout(closeTimer)
    })

    // ========================
    // PC 렌더링
    // ========================

    /**
     * PC 마지막 뎁스 링크 목록 렌더링
     */
    const renderPcLinkList = (linkItems: MainMenuLinkItem[]): VNode => {
      const isDescription = linkItems.some(linkItem => !!linkItem.description)

      const children = linkItems.map((linkItem, linkIndex) => {
        const attrs = externalAttrs(linkItem.external)
        const icon = linkItem.external ? h('i', { class: 'svg-icon ico-go' }) : null

        if (isDescription) {
          return h('li', { key: `link-${linkIndex}` }, [
            h('h3', { class: 'tit' }, [
              h(
                'a',
                {
                  href: linkItem.href || '#',
                  ...attrs,
                  onClick: (event: MouseEvent) => handleItemClick(linkItem, event)
                },
                [linkItem.text, icon]
              )
            ]),
            linkItem.description ? h('p', { class: 'txt' }, linkItem.description) : null
          ])
        }

        const tag = linkItem.href ? 'a' : 'button'
        return h('li', { key: `link-${linkIndex}` }, [
          h(
            tag,
            {
              ...(linkItem.href ? { href: linkItem.href, ...attrs } : { type: 'button' }),
              class: { active: linkItem.selected },
              onClick: (event: MouseEvent) => handleItemClick(linkItem, event)
            },
            [linkItem.text, icon]
          )
        ])
      })

      return h('ul', { class: isDescription ? 'type-description' : undefined }, children)
    }

    /**
     * PC 서브 패널(`.gnb-sub-list`) 렌더링
     */
    const renderPcSubList = (options: {
      id?: string
      title: string
      titleLink?: { text?: string; href: string }
      linkItems: MainMenuLinkItem[]
      layout?: MainMenuLayout
      single?: boolean
      active?: boolean
      banner: VNode | null
    }): VNode => {
      const titleChildren: (VNode | string)[] = options.titleLink
        ? [
            options.title,
            h('a', { href: options.titleLink.href, class: 'krds-btn link basic small' }, [
              h('span', { class: 'underline' }, options.titleLink.text || '바로가기'),
              h('i', { class: 'svg-icon ico-angle right' })
            ])
          ]
        : [h('span', options.title)]

      return h(
        'div',
        {
          id: options.id,
          class: [
            'gnb-sub-list',
            {
              active: options.active,
              between: options.layout === 'between',
              'single-list': options.single
            }
          ]
        },
        [
          h('div', { class: 'gnb-sub-content' }, [h('h2', { class: 'sub-title' }, titleChildren), renderPcLinkList(options.linkItems)]),
          options.banner
        ]
      )
    }

    /**
     * PC 2depth 트리거 + 서브 패널 렌더링
     */
    const renderPcSubItems = (item: MainMenuItem, index: number): VNode[] => {
      return (item.subItems ?? []).map((subItem, subIndex) => {
        const linkOnly = isSubLink(subItem)

        // 서브 패널이 없는 2depth는 바로가기 링크로 렌더링
        if (linkOnly) {
          const tag = subItem.href ? 'a' : 'button'
          return h('li', { key: `sub-${subIndex}` }, [
            h(
              tag,
              {
                ...(subItem.href ? { href: subItem.href, ...externalAttrs(subItem.external) } : { type: 'button' }),
                class: ['gnb-sub-trigger', 'is-link', { 'external-link': subItem.external, selected: subItem.selected }],
                'data-trigger': 'gnb',
                onClick: (event: MouseEvent) => handleItemClick(subItem, event)
              },
              subItem.text
            )
          ])
        }

        const isActive = activeSubIndex(index) === subIndex
        const banner =
          subItem.banner && slots.banner ? h('div', { class: 'gnb-sub-banner' }, slots.banner({ item, subItem, index, subIndex })) : null

        return h('li', { key: `sub-${subIndex}` }, [
          h(
            'button',
            {
              type: 'button',
              class: ['gnb-sub-trigger', { active: isActive, selected: subItem.selected }],
              'data-trigger': 'gnb',
              'aria-controls': subPanelId(index, subIndex),
              'aria-expanded': isActive ? 'true' : 'false',
              'aria-haspopup': 'true',
              onClick: (event: MouseEvent) => {
                selectSubMenu(index, subIndex)
                handleItemClick(subItem, event)
              }
            },
            subItem.text
          ),
          renderPcSubList({
            id: subPanelId(index, subIndex),
            title: subItem.title || subItem.text,
            titleLink: subItem.titleLink,
            linkItems: subItem.items ?? [],
            layout: subItem.layout,
            active: isActive,
            banner
          })
        ])
      })
    }

    /**
     * PC 메가 패널(`.gnb-toggle-wrap`) 렌더링
     */
    const renderPcPanel = (item: MainMenuItem, index: number): VNode => {
      const isOpen = openIndex.value === index
      const withColumns = hasSubColumns(item)

      const mainListChildren = withColumns
        ? [h('ul', {}, renderPcSubItems(item, index))]
        : [
            renderPcSubList({
              title: item.title || item.text,
              linkItems: item.items ?? [],
              layout: item.layout,
              single: true,
              banner:
                item.banner && slots.banner ? h('div', { class: 'gnb-sub-banner' }, slots.banner({ item, index, subIndex: -1 })) : null
            })
          ]

      return h('div', { id: panelId(index), class: ['gnb-toggle-wrap', { 'is-open': isOpen }] }, [
        h(
          'div',
          {
            ref: (el: Element | ComponentPublicInstance | null) => setElRef(mainListEls, el, index),
            class: 'gnb-main-list',
            ...(withColumns ? { 'data-has-submenu': 'true' } : {}),
            style: isOpen && panelMinHeight.value ? { minHeight: `${panelMinHeight.value}px` } : undefined
          },
          mainListChildren
        )
      ])
    }

    /**
     * PC 메인 메뉴 렌더링
     */
    const renderPc = (): VNode => {
      const menuItems = props.items.map((item, index) => {
        const withPanel = hasPanel(item)
        const isOpen = openIndex.value === index
        const tag = !withPanel && item.href ? 'a' : 'button'

        const trigger = h(
          tag,
          {
            ref: (el: Element | ComponentPublicInstance | null) => setElRef(mainTriggerEls, el, index),
            ...(tag === 'a' ? { href: item.href, ...externalAttrs(item.external) } : { type: 'button' }),
            class: ['gnb-main-trigger', { active: isOpen, 'is-link': !withPanel, selected: item.selected }],
            'data-trigger': 'gnb',
            ...(withPanel
              ? {
                  'aria-controls': panelId(index),
                  'aria-expanded': isOpen ? 'true' : 'false',
                  'aria-haspopup': 'true'
                }
              : {}),
            onClick: (event: MouseEvent) => {
              if (withPanel) toggleMainMenu(index)
              handleItemClick(item, event)
            }
          },
          item.text
        )

        return h('li', { key: `main-${index}` }, [trigger, withPanel ? renderPcPanel(item, index) : null])
      })

      const backdrop =
        props.backdrop && openIndex.value !== -1
          ? h(Teleport, { to: 'body' }, [h('div', { class: 'gnb-backdrop active', 'aria-hidden': 'true' })])
          : null

      return h(
        'nav',
        {
          ref: rootRef,
          class: 'krds-main-menu',
          'aria-label': props.ariaLabel,
          onKeydown: handlePcKeydown,
          onFocusout: handlePcFocusout
        },
        [h('div', { class: 'inner' }, [h('ul', { class: 'gnb-menu', 'aria-label': props.ariaLabel }, menuItems)]), backdrop]
      )
    }

    // ========================
    // 모바일 렌더링
    // ========================

    /**
     * 모바일 4depth 패널 렌더링
     */
    const renderDepth4 = (linkItem: MainMenuLinkItem, key: string): VNode => {
      const closeDepth4Panel = () => closeDepth4(key)

      return h(
        'div',
        {
          ref: (el: Element | ComponentPublicInstance | null) => setKeyedRef(depth4Els, el, key),
          class: ['depth4-wrap', { 'is-open': depth4Opened.value === key }],
          style: depth4Displayed.value === key ? { display: 'block' } : undefined
        },
        [
          h('div', { class: 'depth4-head' }, [
            h(
              'button',
              {
                ref: (el: Element | ComponentPublicInstance | null) => setKeyedRef(depth4PrevEls, el, key),
                type: 'button',
                class: 'krds-btn icon trigger-prev',
                onClick: closeDepth4Panel
              },
              [h('span', { class: 'sr-only' }, '이전화면'), h('i', { class: 'svg-icon ico-angle left' })]
            ),
            h('button', { type: 'button', class: 'krds-btn icon trigger-close', onClick: closeDepth4Panel }, [
              h('span', { class: 'sr-only' }, props.closeLabel),
              h('i', { class: 'svg-icon ico-popup-close' })
            ])
          ]),
          h('div', { class: 'depth4-body' }, [
            h('h4', { class: 'sub-title' }, linkItem.panelTitle || linkItem.text),
            h(
              'ul',
              { class: 'depth4-ul' },
              (linkItem.items ?? []).map((depth4Item, depth4Index) =>
                h('li', { key: `depth4-${depth4Index}` }, [
                  h(
                    'a',
                    {
                      href: depth4Item.href || '#',
                      ...externalAttrs(depth4Item.external),
                      class: { selected: depth4Item.selected },
                      onClick: (event: MouseEvent) => handleItemClick(depth4Item, event)
                    },
                    depth4Item.text
                  )
                ])
              )
            )
          ])
        ]
      )
    }

    /**
     * 모바일 3depth 목록 렌더링
     */
    const renderDepth3 = (subItem: MainMenuSubItem, index: number, subIndex: number): VNode => {
      const children = (subItem.items ?? []).map((linkItem, linkIndex) => {
        const key = `${index}-${subIndex}-${linkIndex}`
        const withDepth4 = !!linkItem.items?.length

        return h('li', { key: `depth3-${linkIndex}` }, [
          h(
            'a',
            {
              ref: (el: Element | ComponentPublicInstance | null) => setKeyedRef(depth3TriggerEls, el, key),
              href: linkItem.href || '#',
              ...(withDepth4 ? {} : externalAttrs(linkItem.external)),
              class: ['depth3-trigger', { 'has-depth4': withDepth4, selected: linkItem.selected }],
              ...(withDepth4 ? { 'aria-haspopup': 'true', 'aria-expanded': depth4Opened.value === key ? 'true' : 'false' } : {}),
              onClick: (event: MouseEvent) => {
                if (withDepth4) {
                  void openDepth4(event, key)
                }
                handleItemClick(linkItem, event)
              }
            },
            linkItem.text
          ),
          withDepth4 ? renderDepth4(linkItem, key) : null
        ])
      })

      return h('div', { class: ['depth3-wrap', { 'is-open': depth3Expanded.value[`${index}-${subIndex}`] }] }, [h('ul', {}, children)])
    }

    /**
     * 모바일 1depth 패널(`.gnb-sub-list`) 렌더링
     */
    const renderMobilePanel = (item: MainMenuItem, index: number): VNode => {
      const subItems = item.subItems ?? []

      const children = subItems.map((subItem, subIndex) => {
        const key = `${index}-${subIndex}`
        const withDepth3 = !!subItem.items?.length

        return h('li', { key: `sub-${subIndex}` }, [
          h(
            'a',
            {
              href: subItem.href || '#',
              ...(withDepth3 ? {} : externalAttrs(subItem.external)),
              class: [
                'gnb-sub-trigger',
                { 'has-depth3': withDepth3, active: withDepth3 && depth3Expanded.value[key], selected: subItem.selected }
              ],
              ...(withDepth3
                ? { 'aria-controls': depth3Id(index, subIndex), 'aria-expanded': depth3Expanded.value[key] ? 'true' : 'false' }
                : {}),
              onClick: (event: MouseEvent) => {
                if (withDepth3) toggleDepth3(event, key)
                handleItemClick(subItem, event)
              }
            },
            subItem.text
          ),
          withDepth3 ? renderDepth3(subItem, index, subIndex) : null
        ])
      })

      return h(
        'div',
        {
          ref: (el: Element | ComponentPublicInstance | null) => setElRef(panelEls, el, index),
          id: panelId(index),
          class: 'gnb-sub-list',
          role: 'tabpanel',
          'aria-labelledby': tabId(index)
        },
        [h('h2', { class: 'sub-title' }, item.title || item.text), h('ul', {}, children)]
      )
    }

    /**
     * 모바일 드로어 렌더링
     */
    const renderMobile = (): VNode => {
      const tabs = props.items.map((item, index) =>
        h('li', { key: `tab-${index}`, role: 'none' }, [
          h(
            'a',
            {
              id: tabId(index),
              href: `#${panelId(index)}`,
              class: ['gnb-main-trigger', { active: activeTab.value === index }],
              role: 'tab',
              'aria-controls': panelId(index),
              'aria-selected': activeTab.value === index ? 'true' : 'false',
              onClick: (event: MouseEvent) => {
                handleTabClick(event, index)
                handleItemClick(item, event)
              }
            },
            item.text
          )
        ])
      )

      const bodyChildren: (VNode | null)[] = [
        h('div', { class: 'gnb-menu' }, [
          h('div', { class: 'menu-wrap' }, [h('ul', { role: 'tablist', 'aria-label': props.ariaLabel }, tabs)]),
          h('div', { class: 'submenu-wrap' }, props.items.map(renderMobilePanel))
        ]),
        slots.bottom ? h('div', { class: 'gnb-bottom' }, slots.bottom()) : null
      ]

      return h(
        'div',
        {
          ref: rootRef,
          id: props.mobileId,
          class: ['krds-main-menu-mobile', { 'is-open': drawerOpened.value, 'is-backdrop': drawerOpened.value }],
          style: drawerDisplayed.value ? undefined : { display: 'none' },
          onKeydown: handleMobileKeydown
        },
        [
          h('div', { ref: wrapRef, class: 'gnb-wrap', tabindex: -1 }, [
            h('div', { class: 'gnb-header' }, slots.header ? slots.header() : []),
            h('div', { ref: bodyRef, class: 'gnb-body', onScroll: handleBodyScroll }, bodyChildren),
            h(
              'button',
              {
                type: 'button',
                id: 'close-nav',
                class: 'krds-btn medium icon',
                onClick: () => emit('update:open', false)
              },
              [h('span', { class: 'sr-only' }, props.closeLabel), h('i', { class: 'svg-icon ico-popup-close' })]
            )
          ])
        ]
      )
    }

    return () => (isPc.value ? renderPc() : renderMobile())
  }
})
