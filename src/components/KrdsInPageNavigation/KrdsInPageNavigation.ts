import { defineComponent, computed, h, ref, onMounted, onUnmounted, SlotsType } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * 네비게이션 아이템 인터페이스
 */
export interface NavigationItem {
  /** 링크 URL (앵커 링크) */
  href: string
  /** 표시될 텍스트 */
  text: string
  /** 활성 상태 여부 */
  active?: boolean
}

/**
 * KRDS InPageNavigation 컴포넌트 속성
 */
export interface KrdsInPageNavigationProps extends BaseComponentProps {
  /** 네비게이션 제목 */
  title?: string
  /** 네비게이션 캐션 */
  caption?: string
  /** 네비게이션 아이템 목록 */
  items?: NavigationItem[]
  /** 스크롤에 따른 자동 활성화 여부 */
  autoActive?: boolean
  /** 헤더 상단 영역 선택자 (기본값: '#krds-masthead') */
  headerTopSelector?: string
  /** 헤더 내부 영역 선택자 (기본값: '#krds-header .header-in') */
  headerInnerSelector?: string
}

/**
 * KRDS InPageNavigation 컴포넌트 이벤트
 */
export interface KrdsInPageNavigationEmits {
  (e: 'itemClick', item: NavigationItem, event: MouseEvent | KeyboardEvent): void
}

export default defineComponent<KrdsInPageNavigationProps>({
  name: 'KrdsInPageNavigation',
  props: {
    title: {
      type: String,
      default: undefined
    },
    caption: {
      type: String,
      default: '이 페이지의 구성'
    },
    items: {
      type: Array as () => NavigationItem[],
      default: () => []
    },
    autoActive: {
      type: Boolean,
      default: true
    },
    headerTopSelector: {
      type: String,
      default: '#krds-masthead'
    },
    headerInnerSelector: {
      type: String,
      default: '#krds-header .header-in'
    },
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['itemClick'],
  slots: Object as SlotsType<{
    action?: () => unknown // Named slot without props
  }>,
  setup(props, { emit, slots }) {
    const activeItem = ref<string>('')
    const sectionElements = ref<Map<string, HTMLElement>>(new Map())

    /**
     * 컨테이너 클래스 계산
     */
    const containerClasses = computed(() => {
      const classes = ['krds-in-page-navigation-type']

      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 헤더 높이 계산
     */
    const calculateHeaderHeight = () => {
      const headerTopSelector = props.headerTopSelector as string
      const headerInnerSelector = props.headerInnerSelector as string
      const headerTop = (document.querySelector(headerTopSelector) as HTMLElement)?.clientHeight || 0
      const headerInner = (document.querySelector(headerInnerSelector) as HTMLElement)?.clientHeight || 0
      return headerTop + headerInner
    }

    /**
     * 네비게이션 아이템 클릭 핸들러
     */
    const handleItemClick = (item: NavigationItem, event: MouseEvent | KeyboardEvent) => {
      emit('itemClick', item, event)

      // href가 앵커 링크인 경우 스크롤 처리
      if (item.href.startsWith('#')) {
        event.preventDefault()
        const targetElement = document.querySelector(item.href)
        if (targetElement) {
          const headerHeight = calculateHeaderHeight()

          window.scrollTo({
            left: 0,
            top: targetElement.getBoundingClientRect().top + window.scrollY - headerHeight,
            behavior: 'smooth'
          })

          activeItem.value = item.href

          // 키보드 네비게이션의 경우 포커스 이동 (접근성)
          if (event instanceof KeyboardEvent) {
            const focusable = targetElement.querySelector('.sec-tit, h1, h2, h3, h4, h5, h6')
            if (focusable && focusable instanceof HTMLElement) {
              focusable.setAttribute('tabindex', '-1')
              focusable.focus({ preventScroll: true })
            }
          }
        }
      }
    }

    /**
     * 섹션 요소들을 캐싱
     */
    const cacheSectionElements = () => {
      sectionElements.value.clear()

      if (!props.items) return

      props.items
        .filter(item => item.href.startsWith('#'))
        .forEach(item => {
          const element = document.querySelector(item.href) as HTMLElement | null
          if (element) {
            sectionElements.value.set(item.href, element)
          }
        })
    }

    /**
     * 스크롤에 따른 활성 아이템 업데이트
     */
    const updateActiveItem = () => {
      if (!props.autoActive || !props.items || sectionElements.value.size === 0) return

      const winHeight = window.innerHeight
      const topHeight = Math.ceil(winHeight / 5) // 윈도우의 20%
      const scrollBottom = window.scrollY + winHeight
      const scrollHeight = document.body.scrollHeight

      // 캐싱된 요소들을 사용
      const sections = props.items
        .filter(item => item.href.startsWith('#') && sectionElements.value.has(item.href))
        .map(item => ({
          href: item.href,
          element: sectionElements.value.get(item.href)!,
          item
        }))

      if (sections.length === 0) return

      const firstSection = sections[0]
      const lastSection = sections[sections.length - 1]
      const firstSecTop = firstSection.element.offsetTop

      let newActiveItem = ''

      // 스크롤이 페이지 끝에 도달했을 때
      if (scrollBottom >= scrollHeight) {
        newActiveItem = lastSection.href
      }
      // 스크롤이 첫번째 섹션보다 위에 있을때
      else if (window.scrollY <= firstSecTop) {
        newActiveItem = firstSection.href
      }
      // 현재 섹션 확인
      else {
        for (const section of sections) {
          const sectionHeight = section.element.offsetHeight
          const sectionTop = section.element.offsetTop - topHeight

          if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
            newActiveItem = section.href
            break
          }
        }
      }

      // 활성 아이템 업데이트
      if (newActiveItem && newActiveItem !== activeItem.value) {
        activeItem.value = newActiveItem
      }
    }

    /**
     * 초기 활성 아이템 설정
     */
    const initActiveItem = () => {
      if (!props.items) return

      const activeFromProps = props.items.find(item => item.active)
      if (activeFromProps) {
        activeItem.value = activeFromProps.href
      } else if (props.items.length > 0) {
        activeItem.value = props.items[0].href
      }
    }

    /**
     * 컴포넌트 마운트 시 초기화
     */
    onMounted(() => {
      initActiveItem()

      if (props.autoActive) {
        // 섹션 요소들을 미리 캐싱
        cacheSectionElements()
        updateActiveItem()
        window.addEventListener('scroll', updateActiveItem, { passive: true })

        // DOM 변경 감지를 위한 MutationObserver 설정 (선택사항)
        const observer = new MutationObserver(() => {
          cacheSectionElements()
        })

        // body 태그의 자식 요소 변경을 감지
        observer.observe(document.body, {
          childList: true,
          subtree: true
        })

        // cleanup 함수에서 observer도 정리하도록 설정
        onUnmounted(() => {
          observer.disconnect()
        })
      }
    })

    /**
     * 컴포넌트 언마운트 시 정리
     */
    onUnmounted(() => {
      if (props.autoActive) {
        window.removeEventListener('scroll', updateActiveItem)
        // 캐싱된 요소들 정리
        sectionElements.value.clear()
      }
    })

    /**
     * 네비게이션 헤더 렌더링
     */
    const renderHeader = () => {
      if (!props.caption && !props.title) return null

      return h('div', { class: 'in-page-navigation-header' }, [
        props.caption && h('p', { class: 'quick-caption' }, props.caption),
        props.title && h('p', { class: 'quick-title' }, props.title)
      ])
    }

    /**
     * 네비게이션 리스트 렌더링
     */
    const renderNavList = () => {
      if (!props.items) return null

      const listItems = props.items.map(item => {
        // 활성 상태 결정: autoActive 시 스크롤 기반, 아니면 active 속성 포함
        const isActive = activeItem.value === item.href || (!props.autoActive && item.active)

        return h('li', { key: item.href }, [
          h(
            'a',
            {
              href: item.href,
              class: isActive ? 'active' : '',
              onClick: (event: MouseEvent) => handleItemClick(item, event),
              onKeydown: (event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleItemClick(item, event)
                }
              }
            },
            item.text
          )
        ])
      })

      return h('nav', { class: 'in-page-navigation-list' }, [h('ul', {}, listItems)])
    }

    /**
     * 액션 영역 렌더링
     */
    const renderAction = () => {
      if (!slots.action) return null

      return h('div', { class: 'in-page-navigation-action' }, [slots.action()])
    }

    return () =>
      h('div', { class: containerClasses.value }, [
        h('div', { class: 'krds-in-page-navigation-area' }, [renderHeader(), renderNavList(), renderAction()].filter(Boolean))
      ])
  }
})
