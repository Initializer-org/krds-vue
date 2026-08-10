import { computed, defineComponent, h, withDirectives } from 'vue'
import { vSrOnly } from '@/directives'

// ========================
// 타입 정의
// ========================

/**
 * 페이지 아이템 타입
 */
interface PageItem {
  type: 'page' | 'ellipsis'
  key: string
  page?: number
  href?: string
  ariaLabel?: string
}

/** 프롭 기본값 — props 선언과 setup 양쪽에서 공유한다 */
const DEFAULT_MIN = 1
const DEFAULT_PAGE_RANGE = 8

/**
 * KRDS Pagination 컴포넌트 속성
 */
export interface KrdsPaginationProps {
  /** 현재 페이지 번호 (v-model) */
  modelValue?: number
  /** 최소 페이지 번호 (기본값: 1, 최소값: 1) */
  min?: number
  /** 최대 페이지 번호 (전체 페이지 수) */
  max: number
  /** 엘리먼트 ID */
  id?: string
  /** 접근성 라벨 */
  ariaLabel?: string
  /** 표시할 페이지 범위 */
  pageRange?: number
}

/**
 * KRDS Pagination 컴포넌트 이벤트
 */
export interface KrdsPaginationEmits {
  /** v-model 업데이트 이벤트 */
  (e: 'update:modelValue', value: number): void
}

export default defineComponent<KrdsPaginationProps>({
  name: 'KrdsPagination',
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: DEFAULT_MIN
    },
    max: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      default: undefined
    },
    ariaLabel: {
      type: String,
      default: '페이지 내비게이션'
    },
    pageRange: {
      type: Number,
      default: DEFAULT_PAGE_RANGE
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // ========================
    // Computed Properties
    // ========================

    /**
     * 최소 페이지 번호 (1보다 작을 수 없음)
     */
    const minPage = computed(() => Math.max(1, props.min ?? DEFAULT_MIN))

    /**
     * 현재 페이지 값 (v-model 처리)
     */
    const currentPage = computed(() => props.modelValue ?? minPage.value)

    /**
     * 이전 페이지 비활성화 여부
     */
    const prevDisabled = computed(() => currentPage.value <= minPage.value)

    /**
     * 다음 페이지 비활성화 여부
     */
    const nextDisabled = computed(() => currentPage.value >= props.max)

    /**
     * 이전 페이지 URL
     */
    const prevHref = computed(() => {
      if (prevDisabled.value) return undefined
      return '#'
    })

    /**
     * 다음 페이지 URL
     */
    const nextHref = computed(() => {
      if (nextDisabled.value) return undefined
      return '#'
    })

    /**
     * 표시할 페이지 목록 계산
     */
    const displayedPages = computed((): PageItem[] => {
      const { max: totalPages } = props
      const pageRange = props.pageRange ?? DEFAULT_PAGE_RANGE
      const boundaryRange = 1
      const pages: PageItem[] = []

      if (totalPages <= pageRange + 2 * boundaryRange) {
        // 모든 페이지를 표시할 수 있는 경우
        for (let i = minPage.value; i <= totalPages; i++) {
          pages.push({
            type: 'page',
            key: `page-${i}`,
            page: i,
            href: '#'
          })
        }
      } else {
        // 생략이 필요한 경우
        const leftBoundary = Math.min(boundaryRange, totalPages)
        const rightBoundary = Math.max(totalPages - boundaryRange + 1, 1)

        const rangeStart = Math.max(minPage.value, currentPage.value - Math.floor(pageRange / 2))
        const rangeEnd = Math.min(totalPages, rangeStart + pageRange - 1)
        const adjustedRangeStart = Math.max(minPage.value, rangeEnd - pageRange + 1)

        // 왼쪽 경계 페이지들
        for (let i = minPage.value; i <= leftBoundary; i++) {
          pages.push({
            type: 'page',
            key: `page-${i}`,
            page: i,
            href: '#'
          })
        }

        // 왼쪽 생략
        if (adjustedRangeStart > leftBoundary + 1) {
          pages.push({
            type: 'ellipsis',
            key: 'ellipsis-left',
            ariaLabel: '페이지 생략'
          })
        }

        // 중앙 범위 페이지들
        const startPage = Math.max(adjustedRangeStart, leftBoundary + 1)
        const endPage = Math.min(rangeEnd, rightBoundary - 1)

        for (let i = startPage; i <= endPage; i++) {
          pages.push({
            type: 'page',
            key: `page-${i}`,
            page: i,
            href: '#'
          })
        }

        // 오른쪽 생략
        if (rangeEnd < rightBoundary - 1) {
          pages.push({
            type: 'ellipsis',
            key: 'ellipsis-right',
            ariaLabel: '페이지 생략'
          })
        }

        // 오른쪽 경계 페이지들
        for (let i = rightBoundary; i <= totalPages; i++) {
          pages.push({
            type: 'page',
            key: `page-${i}`,
            page: i,
            href: '#'
          })
        }
      }

      return pages
    })

    // ========================
    // Event Handlers
    // ========================

    /**
     * 페이지 클릭 핸들러
     */
    const handlePageClick = (page: number, event: MouseEvent) => {
      if (page === currentPage.value) {
        event.preventDefault()
        return
      }

      emit('update:modelValue', page)
    }

    /**
     * 이전 페이지 클릭 핸들러
     */
    const handlePrevClick = (event: MouseEvent) => {
      if (prevDisabled.value) {
        event.preventDefault()
        return
      }

      const prevPage = currentPage.value - 1
      emit('update:modelValue', prevPage)
    }

    /**
     * 다음 페이지 클릭 핸들러
     */
    const handleNextClick = (event: MouseEvent) => {
      if (nextDisabled.value) {
        event.preventDefault()
        return
      }

      const nextPage = currentPage.value + 1
      emit('update:modelValue', nextPage)
    }

    /**
     * 페이지 링크 / 생략 표시 렌더링
     */
    const renderPageItem = (item: PageItem) => {
      if (item.type === 'page') {
        const isCurrent = item.page === currentPage.value

        return h(
          'a',
          {
            key: item.key,
            href: item.href || '#',
            class: ['page-link', { active: isCurrent }],
            'aria-current': isCurrent ? 'page' : undefined,
            onClick: (event: MouseEvent) => handlePageClick(item.page!, event)
          },
          [isCurrent ? withDirectives(h('span', null, '현재페이지'), [[vSrOnly]]) : null, ` ${item.page} `]
        )
      }

      return h('span', {
        key: item.key,
        class: 'page-link link-dot',
        'aria-label': item.ariaLabel
      })
    }

    return () =>
      h('div', { id: props.id, class: 'krds-pagination' }, [
        // 이전 버튼
        h(
          prevDisabled.value ? 'span' : 'a',
          {
            href: prevDisabled.value ? undefined : prevHref.value,
            class: ['page-navi', 'prev', { disabled: prevDisabled.value }],
            onClick: handlePrevClick
          },
          '이전'
        ),

        // 페이지 링크
        h('div', { class: 'page-links' }, displayedPages.value.map(renderPageItem)),

        // 다음 버튼
        h(
          nextDisabled.value ? 'span' : 'a',
          {
            href: nextDisabled.value ? undefined : nextHref.value,
            class: ['page-navi', 'next', { disabled: nextDisabled.value }],
            onClick: handleNextClick
          },
          '다음'
        )
      ])
  }
})
