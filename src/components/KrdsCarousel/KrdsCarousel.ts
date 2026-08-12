import {
  Comment,
  Fragment,
  Text,
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
  type VNode
} from 'vue'

// ========================
// 타입 정의
// ========================

/**
 * 캐러셀 형태
 * - `visual`: 비주얼 배너형 (원본 carousel.html, 이전/다음 버튼이 슬라이드 좌우에 겹쳐 배치)
 * - `banner`: 배너형 (원본 carousel_banner.html, 인디케이터 안에 페이지네이션·재생 제어·내비게이션 배치)
 */
export type KrdsCarouselVariant = 'visual' | 'banner'

/**
 * 페이지네이션 표시 방식
 * - `bullets`: 불릿(점) 목록, 클릭으로 이동 가능
 * - `fraction`: `현재 / 전체` 분수 표기
 * - `none`: 표시하지 않음
 */
export type KrdsCarouselPaginationType = 'bullets' | 'fraction' | 'none'

/** 프롭 기본값 — props 선언과 setup 양쪽에서 공유한다 */
const DEFAULT_SPEED = 400
const DEFAULT_AUTOPLAY_DELAY = 2500
const VISUAL_SPACE_BETWEEN = 0
const BANNER_SPACE_BETWEEN = 16

/**
 * KRDS Carousel 컴포넌트 속성
 */
export interface KrdsCarouselProps {
  /** 캐러셀 형태 (기본값: visual) */
  variant?: KrdsCarouselVariant
  /** 현재 슬라이드 인덱스 (v-model:activeIndex) */
  activeIndex?: number
  /** 처음/마지막 슬라이드에서 순환 이동 여부 (기본값: true) */
  loop?: boolean
  /** 자동 재생 여부. true면 재생/정지 버튼을 노출하고 즉시 재생을 시작한다 (기본값: false) */
  autoplay?: boolean
  /** 자동 재생 간격 (ms, 기본값: 2500) */
  autoplayDelay?: number
  /** 마우스 오버 시 자동 재생 일시 정지 여부 (기본값: true). 포커스 진입 시에는 값과 무관하게 항상 정지한다 */
  pauseOnHover?: boolean
  /** 슬라이드 전환 속도 (ms, 기본값: 400) */
  speed?: number
  /** 슬라이드 사이 간격 (px, 기본값: visual 0 / banner 16) */
  spaceBetween?: number
  /** 페이지네이션 표시 방식 (기본값: visual bullets / banner fraction) */
  pagination?: KrdsCarouselPaginationType
  /** 이전/다음 버튼 표시 여부 (기본값: true) */
  navigation?: boolean
  /** 더 보기 링크 URL. 지정하면 더 보기 버튼을 표시한다 */
  moreHref?: string
  /** 캐러셀 영역 접근성 라벨 */
  ariaLabel?: string
  /** 이전 버튼 라벨 */
  prevLabel?: string
  /** 다음 버튼 라벨 */
  nextLabel?: string
  /** 재생 버튼 라벨 */
  playLabel?: string
  /** 정지 버튼 라벨 */
  stopLabel?: string
  /** 더 보기 버튼 라벨 */
  moreLabel?: string
  /** 엘리먼트 ID */
  id?: string
}

/**
 * KRDS Carousel 컴포넌트 이벤트
 */
export interface KrdsCarouselEmits {
  /** 현재 슬라이드 인덱스 업데이트 (v-model:activeIndex) */
  (e: 'update:activeIndex', value: number): void
  /** 슬라이드 변경 완료 */
  (e: 'change', value: number): void
  /** 자동 재생 시작 */
  (e: 'play'): void
  /** 자동 재생 정지 */
  (e: 'stop'): void
  /** 더 보기 클릭 */
  (e: 'more-click', event: MouseEvent): void
}

/**
 * 슬롯 자식에서 실제 슬라이드가 될 VNode만 골라낸다.
 * v-for/템플릿으로 전달된 Fragment는 펼치고, 주석·공백 텍스트는 제외한다.
 */
const flattenSlides = (nodes?: VNode[]): VNode[] => {
  if (!nodes) return []

  return nodes.flatMap(node => {
    if (node.type === Fragment) {
      return Array.isArray(node.children) ? flattenSlides(node.children as VNode[]) : []
    }
    if (node.type === Comment) return []
    if (node.type === Text && typeof node.children === 'string' && node.children.trim() === '') return []
    return [node]
  })
}

export default defineComponent({
  name: 'KrdsCarousel',
  props: {
    variant: {
      type: String as () => KrdsCarouselVariant,
      default: 'visual'
    },
    activeIndex: {
      type: Number,
      default: undefined
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayDelay: {
      type: Number,
      default: DEFAULT_AUTOPLAY_DELAY
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: DEFAULT_SPEED
    },
    spaceBetween: {
      type: Number,
      default: undefined
    },
    pagination: {
      type: String as () => KrdsCarouselPaginationType,
      default: undefined
    },
    navigation: {
      type: Boolean,
      default: true
    },
    moreHref: {
      type: String,
      default: undefined
    },
    ariaLabel: {
      type: String,
      default: '캐러셀'
    },
    prevLabel: {
      type: String,
      default: '이전'
    },
    nextLabel: {
      type: String,
      default: '다음'
    },
    playLabel: {
      type: String,
      default: '슬라이드 재생'
    },
    stopLabel: {
      type: String,
      default: '슬라이드 멈춤'
    },
    moreLabel: {
      type: String,
      default: '더 보기'
    },
    id: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:activeIndex', 'change', 'play', 'stop', 'more-click'],
  setup(props, { emit, slots }) {
    const uid = getCurrentInstance()?.uid
    const wrapperId = computed(() => `${props.id ?? `krds-carousel-${uid}`}-wrapper`)

    /** 렌더 시점에 갱신되는 슬라이드 개수 — 이벤트 핸들러는 렌더 이후에 실행되므로 반응형일 필요가 없다 */
    let slideCount = 0

    const internalIndex = ref(props.activeIndex ?? 0)

    // ========================
    // Computed Properties
    // ========================

    /** 슬라이드 간격 — 원본 Swiper 옵션(visual 0 / banner 16)을 기본값으로 사용 */
    const spaceBetween = computed(() => props.spaceBetween ?? (props.variant === 'banner' ? BANNER_SPACE_BETWEEN : VISUAL_SPACE_BETWEEN))

    /** 페이지네이션 방식 — 원본 Swiper 옵션(visual bullets / banner fraction)을 기본값으로 사용 */
    const paginationType = computed<KrdsCarouselPaginationType>(
      () => props.pagination ?? (props.variant === 'banner' ? 'fraction' : 'bullets')
    )

    // ========================
    // 자동 재생
    // ========================

    const isPlaying = ref(false)
    const hoverPaused = ref(false)
    const focusPaused = ref(false)
    const isPaused = computed(() => hoverPaused.value || focusPaused.value)

    let autoplayTimer: ReturnType<typeof setInterval> | undefined

    const clearAutoplayTimer = () => {
      if (autoplayTimer === undefined) return
      clearInterval(autoplayTimer)
      autoplayTimer = undefined
    }

    /**
     * 슬라이드 이동
     */
    const goTo = (index: number) => {
      if (slideCount <= 0) return

      const next = props.loop ? ((index % slideCount) + slideCount) % slideCount : Math.min(Math.max(index, 0), slideCount - 1)

      if (next === internalIndex.value) return

      internalIndex.value = next
      emit('update:activeIndex', next)
      emit('change', next)
    }

    const goPrev = () => goTo(internalIndex.value - 1)
    const goNext = () => goTo(internalIndex.value + 1)

    const startAutoplay = () => {
      if (isPlaying.value) return
      isPlaying.value = true
      emit('play')
    }

    const stopAutoplay = () => {
      if (!isPlaying.value) return
      isPlaying.value = false
      emit('stop')
    }

    /**
     * 재생 상태·일시 정지 상태에 맞춰 타이머를 동기화한다
     */
    const syncAutoplayTimer = () => {
      clearAutoplayTimer()
      if (!isPlaying.value || isPaused.value) return

      autoplayTimer = setInterval(() => {
        // 순환하지 않는 캐러셀은 마지막 슬라이드에서 재생을 종료한다
        if (!props.loop && slideCount > 0 && internalIndex.value >= slideCount - 1) {
          stopAutoplay()
          return
        }
        goNext()
      }, props.autoplayDelay)
    }

    watch([isPlaying, isPaused, () => props.autoplayDelay], syncAutoplayTimer)

    watch(
      () => props.autoplay,
      value => {
        if (value) {
          startAutoplay()
        } else {
          stopAutoplay()
        }
      }
    )

    watch(
      () => props.activeIndex,
      value => {
        if (typeof value !== 'number' || value === internalIndex.value) return
        internalIndex.value = slideCount > 0 ? Math.min(Math.max(value, 0), slideCount - 1) : value
      }
    )

    // ========================
    // 모션 최소화 설정
    // ========================

    const reducedMotion = ref(false)
    let motionQuery: MediaQueryList | undefined

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion.value = event.matches
    }

    /** 전환 시간 — 모션 최소화 설정에서는 즉시 이동한다 */
    const transitionDuration = computed(() => (reducedMotion.value ? 0 : props.speed))

    onMounted(() => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        reducedMotion.value = motionQuery.matches
        motionQuery.addEventListener('change', handleMotionChange)
      }

      if (props.autoplay) startAutoplay()
    })

    onBeforeUnmount(() => {
      clearAutoplayTimer()
      motionQuery?.removeEventListener('change', handleMotionChange)
    })

    // ========================
    // Event Handlers
    // ========================

    const handlePointerEnter = () => {
      if (props.pauseOnHover) hoverPaused.value = true
    }

    const handlePointerLeave = () => {
      hoverPaused.value = false
    }

    const handleFocusIn = () => {
      focusPaused.value = true
    }

    const handleFocusOut = (event: FocusEvent) => {
      const root = event.currentTarget as HTMLElement | null
      if (root && root.contains(event.relatedTarget as Node | null)) return
      focusPaused.value = false
    }

    const handleMoreClick = (event: MouseEvent) => {
      emit('more-click', event)
    }

    // ========================
    // 인라인 스타일
    // ========================
    // 원본은 swiper-bundle.min.css가 제공하는 트랙 레이아웃에 의존하지만
    // 이 라이브러리에는 해당 CSS가 없으므로 최소한의 레이아웃만 인라인으로 지정한다.

    const swiperStyle: CSSProperties = {
      position: 'relative',
      overflow: 'hidden',
      width: '100%'
    }

    const slideStyle: CSSProperties = {
      flex: '0 0 100%',
      width: '100%'
    }

    const buildWrapperStyle = (current: number): CSSProperties => ({
      display: 'flex',
      width: '100%',
      gap: spaceBetween.value > 0 ? `${spaceBetween.value}px` : undefined,
      transform: `translate3d(calc(${-current} * (100% + ${spaceBetween.value}px)), 0, 0)`,
      transitionProperty: 'transform',
      transitionDuration: `${transitionDuration.value}ms`,
      transitionTimingFunction: 'ease-out',
      willChange: 'transform'
    })

    /** visual 형태의 이전/다음 버튼은 슬라이드 좌우에 겹쳐 배치된다 */
    const buildOverlayNavStyle = (isPrev: boolean): CSSProperties => ({
      position: 'absolute',
      top: '50%',
      left: isPrev ? '0' : undefined,
      right: isPrev ? undefined : '0',
      transform: 'translateY(-50%)',
      zIndex: 10
    })

    // ========================
    // 렌더 함수
    // ========================

    /**
     * 슬라이드 렌더링 — 현재 슬라이드 외에는 보조기기·포커스 대상에서 제외한다
     *
     * 원본 마크업(li)의 목록 의미를 유지하기 위해 role="group"으로 덮어쓰지 않고
     * aria-roledescription으로만 슬라이드임을 알린다. li에 role="group"을 지정하면
     * axe(aria-allowed-role)에 위배된다.
     */
    const renderSlides = (slides: VNode[], current: number): VNode[] =>
      slides.map((slide, index) => {
        const isActive = index === current

        return h(
          'li',
          {
            key: slide.key ?? `krds-carousel-slide-${index}`,
            class: ['swiper-slide', { 'swiper-slide-active': isActive }],
            style: slideStyle,
            'aria-roledescription': 'slide',
            'aria-label': `${index + 1} / ${slides.length}`,
            'aria-hidden': isActive ? undefined : 'true',
            inert: isActive ? undefined : true
          },
          [slide]
        )
      })

    /**
     * 이전/다음 버튼 렌더링
     */
    const renderNavigationButton = (direction: 'prev' | 'next', current: number, overlay: boolean): VNode => {
      const isPrev = direction === 'prev'
      const disabled = !props.loop && (isPrev ? current <= 0 : current >= slideCount - 1)

      return h(
        'button',
        {
          type: 'button',
          class: [`swiper-button-${direction}`, { 'swiper-button-disabled': disabled }],
          style: overlay ? buildOverlayNavStyle(isPrev) : undefined,
          disabled,
          'aria-controls': wrapperId.value,
          onClick: isPrev ? goPrev : goNext
        },
        [h('span', { class: 'sr-only' }, isPrev ? props.prevLabel : props.nextLabel)]
      )
    }

    /**
     * 더 보기 링크 렌더링
     */
    const renderMoreLink = (): VNode =>
      h(
        'a',
        {
          href: props.moreHref,
          class: 'swiper-button-more',
          onClick: handleMoreClick
        },
        [h('span', { class: 'sr-only' }, props.moreLabel)]
      )

    /**
     * 페이지네이션 렌더링 (불릿 / 분수)
     */
    const renderPagination = (total: number, current: number): VNode => {
      if (paginationType.value === 'fraction') {
        return h('div', { class: 'swiper-pagination swiper-pagination-fraction' }, [
          h('span', { class: 'swiper-pagination-current' }, String(current + 1)),
          h('span', { 'aria-hidden': 'true' }, '/'),
          h('span', { class: 'swiper-pagination-total' }, String(total))
        ])
      }

      return h(
        'div',
        { class: 'swiper-pagination' },
        Array.from({ length: total }, (_, index) =>
          h('button', {
            key: `krds-carousel-bullet-${index}`,
            type: 'button',
            class: ['swiper-pagination-bullet', { 'swiper-pagination-bullet-active': index === current }],
            'aria-label': `${index + 1}번째 슬라이드로 이동`,
            'aria-current': index === current ? 'true' : undefined,
            'aria-controls': wrapperId.value,
            onClick: () => goTo(index)
          })
        )
      )
    }

    /**
     * 재생/정지 컨트롤 렌더링 — 원본 스크립트와 같이 현재 상태의 버튼만 노출한다
     */
    const renderController = (): VNode =>
      h('div', { class: 'swiper-controller' }, [
        h(
          'button',
          {
            type: 'button',
            class: 'swiper-button-play',
            style: isPlaying.value ? { display: 'none' } : undefined,
            'aria-controls': wrapperId.value,
            onClick: startAutoplay
          },
          [h('span', { class: 'sr-only' }, props.playLabel)]
        ),
        h(
          'button',
          {
            type: 'button',
            class: 'swiper-button-stop',
            style: isPlaying.value ? undefined : { display: 'none' },
            'aria-controls': wrapperId.value,
            onClick: stopAutoplay
          },
          [h('span', { class: 'sr-only' }, props.stopLabel)]
        )
      ])

    /**
     * 인디케이터 영역 렌더링 — 형태에 따라 구성 요소와 배치가 달라진다
     */
    const renderIndicator = (total: number, current: number): VNode | null => {
      const isBanner = props.variant === 'banner'
      const showPagination = paginationType.value !== 'none'
      const showMore = Boolean(props.moreHref)
      const children: (VNode | null)[] = []

      if (showPagination) children.push(renderPagination(total, current))
      if (props.autoplay) children.push(renderController())

      if (isBanner) {
        const navigationChildren: VNode[] = []
        if (props.navigation) {
          navigationChildren.push(renderNavigationButton('prev', current, false), renderNavigationButton('next', current, false))
        }
        if (showMore) navigationChildren.push(renderMoreLink())
        if (navigationChildren.length > 0) children.push(h('div', { class: 'swiper-navigation' }, navigationChildren))
      } else if (showMore) {
        children.push(renderMoreLink())
      }

      if (children.length === 0) return null

      return h('div', { class: ['swiper-indicator', { 'text-center': !isBanner }] }, children)
    }

    return () => {
      const slides = flattenSlides(slots.default?.())
      const total = slides.length
      slideCount = total

      const current = total > 0 ? Math.min(Math.max(internalIndex.value, 0), total - 1) : 0
      const isBanner = props.variant === 'banner'

      return h(
        'div',
        {
          id: props.id,
          class: ['krds-carousel', isBanner ? 'main-d-ban-swiper' : 'vb-swiper'],
          style: { position: 'relative' } as CSSProperties,
          role: 'region',
          'aria-roledescription': 'carousel',
          'aria-label': props.ariaLabel,
          onMouseenter: handlePointerEnter,
          onMouseleave: handlePointerLeave,
          onFocusin: handleFocusIn,
          onFocusout: handleFocusOut
        },
        [
          // 슬라이드 트랙
          h(
            'div',
            {
              class: 'swiper',
              style: swiperStyle,
              'aria-live': isPlaying.value ? 'off' : 'polite'
            },
            [
              h(
                'ul',
                {
                  id: wrapperId.value,
                  class: 'swiper-wrapper',
                  style: buildWrapperStyle(current)
                },
                renderSlides(slides, current)
              )
            ]
          ),

          // visual 형태의 이전/다음 버튼은 슬라이드 위에 겹쳐 배치한다
          !isBanner && props.navigation && total > 0 ? renderNavigationButton('prev', current, true) : null,
          !isBanner && props.navigation && total > 0 ? renderNavigationButton('next', current, true) : null,

          // 인디케이터 (페이지네이션 / 재생 제어 / 내비게이션 / 더 보기)
          total > 0 ? renderIndicator(total, current) : null
        ]
      )
    }
  }
})
