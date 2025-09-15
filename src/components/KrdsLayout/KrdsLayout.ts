import { computed, defineComponent, h, onMounted, onUnmounted, ref } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Layout 컴포넌트 속성
 */
export interface KrdsLayoutProps extends BaseComponentProps {
  /** 레이아웃 ID */
  id?: string
  /** 스크롤 감지 활성화 여부 */
  enableScrollDetection?: boolean
}
/**
 * 스크롤 상세 정보
 */
export interface ScrollDetails {
  scrollY: number
  scrollHeight: number
  direction: 'up' | 'down' | null
  timestamp: number
}

/**
 * 레이아웃 크기 정보
 */
export interface LayoutSize {
  width: number
  height: number
}

export default defineComponent<KrdsLayoutProps>({
  name: 'KrdsLayout',
  props: {
    id: {
      type: String,
      default: 'wrap'
    },
    class: {
      type: String,
      default: undefined
    },
    enableScrollDetection: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    resize: (_size: LayoutSize) => true,
    scroll: (_details: ScrollDetails) => true,
    'scroll-height': (_height: number) => true
  },
  setup(props, { slots, emit }) {
    const scrollY = ref(0)
    const scrollH = ref(0)
    const lastScrollY = ref(0)
    const scrollDirection = ref<'up' | 'down' | null>(null)
    const wrapElement = ref<HTMLElement | null>(null)
    const resizeObserver = ref<ResizeObserver | null>(null)

    /**
     * 스크롤 값 업데이트
     */
    const updateScrollValues = () => {
      const prevScrollHeight = scrollH.value
      scrollY.value = window.scrollY
      scrollH.value = document.body.scrollHeight

      // scroll-height 이벤트 발생 (높이가 변경된 경우)
      if (prevScrollHeight !== scrollH.value && prevScrollHeight > 0) {
        emit('scroll-height', scrollH.value)
      }
    }

    /**
     * 스크롤 방향 처리
     */
    const handleScrollDirection = () => {
      if (!wrapElement.value || !props.enableScrollDetection) return

      const container = document.querySelector('#container')
      if (!container) return

      const containerOffsetTop = (container as HTMLElement).offsetTop
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.value
      const isScrollingUp = currentScrollY < lastScrollY.value

      if (currentScrollY > containerOffsetTop + 50) {
        if (isScrollingDown) {
          wrapElement.value.classList.add('scroll-down')
          wrapElement.value.classList.remove('scroll-up')
          scrollDirection.value = 'down'
        } else if (isScrollingUp) {
          wrapElement.value.classList.add('scroll-up')
          wrapElement.value.classList.remove('scroll-down')
          scrollDirection.value = 'up'
        }
      } else {
        wrapElement.value.classList.remove('scroll-down', 'scroll-up')
        scrollDirection.value = null
      }

      lastScrollY.value = currentScrollY
    }

    /**
     * 스크롤 이벤트 핸들러
     */
    const handleScroll = () => {
      updateScrollValues()
      handleScrollDirection()

      // scroll 이벤트 발생
      const scrollDetails: ScrollDetails = {
        scrollY: scrollY.value,
        scrollHeight: scrollH.value,
        direction: scrollDirection.value,
        timestamp: Date.now()
      }
      emit('scroll', scrollDetails)
    }

    /**
     * 리사이즈 핸들러
     */
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        const size: LayoutSize = { width, height }
        emit('resize', size)
      }
    }

    /**
     * 컨테이너 클래스 계산
     */
    const containerClasses = computed(() => {
      const classes = ['g-wrap']

      // 사용자 정의 클래스
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    onMounted(() => {
      if (props.enableScrollDetection) {
        updateScrollValues()
        window.addEventListener('scroll', handleScroll, { passive: true })
      }

      // ResizeObserver 설정
      if (wrapElement.value && typeof ResizeObserver !== 'undefined') {
        resizeObserver.value = new ResizeObserver(handleResize)
        resizeObserver.value.observe(wrapElement.value)
      }
    })

    onUnmounted(() => {
      if (props.enableScrollDetection) {
        window.removeEventListener('scroll', handleScroll)
      }

      // ResizeObserver 정리
      if (resizeObserver.value) {
        resizeObserver.value.disconnect()
        resizeObserver.value = null
      }
    })

    return () => {
      return h(
        'div',
        {
          id: props.id,
          class: containerClasses.value,
          ref: wrapElement
        },
        slots.default?.()
      )
    }
  }
})
