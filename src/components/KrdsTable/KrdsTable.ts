import { defineComponent, h, computed, getCurrentInstance, SlotsType, type VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * 테이블 행 데이터
 */
export type TableRow = Record<string, unknown>

/**
 * 테이블 열 정의
 */
export interface TableColumn {
  /** 고유 ID - 컬럼 식별자 */
  name: string
  /** 헤더 라벨 */
  label: string
  /** 행 객체 속성명 또는 함수 (`cell-<name>` 슬롯으로만 그리는 열은 생략 가능) */
  field?: string | ((row: TableRow) => unknown)
  /** 필수 컬럼 여부 (visible-columns 사용시 항상 표시) */
  required?: boolean
  /** 정렬 */
  align?: 'left' | 'center' | 'right'
  /** body td 스타일 */
  style?: string | ((row: TableRow) => string)
  /** body td 클래스 */
  classes?: string | ((row: TableRow) => string)
  /** header th 스타일 */
  headerStyle?: string
  /** header th 클래스 */
  headerClasses?: string
}

/**
 * `cell-<name>` 슬롯 인자
 */
export interface KrdsTableCellSlotProps {
  /** 행 데이터 */
  row: TableRow
  /** 열 정의 */
  column: TableColumn
  /** `field`로 꺼낸 셀 값 */
  value: unknown
  /** 행 순서 (0부터) */
  index: number
}

/**
 * KRDS Table 컴포넌트 속성
 */
export interface KrdsTableProps extends BaseComponentProps {
  /** 테이블 캡션 */
  caption?: string
  /** 테이블 열 정의 */
  columns: TableColumn[]
  /** 테이블 행 데이터 */
  rows: TableRow[]
}

/**
 * KRDS Table 컴포넌트 이벤트
 */
export interface KrdsTableEmits {
  (e: 'row-click', row: TableRow, index: number): void
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsTable',
  props: {
    /** 테이블 캡션 */
    caption: {
      type: String,
      default: undefined
    },
    /** 테이블 열 정의 */
    columns: {
      type: Array as () => TableColumn[],
      required: true
    },
    /** 테이블 행 데이터 */
    rows: {
      type: Array as () => TableRow[],
      required: true
    },
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 행을 클릭했을 때 (행, 순서) */
    'row-click': (row: TableRow, index: number) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  slots: Object as SlotsType<{
    /** 행이 없을 때 표시할 내용 */
    'no-data'?: () => VNode[]
    /** 열(`name`)의 본문 셀 내용. 체크박스·버튼·배지 등을 넣을 때 쓴다 (셀 태그·style·classes는 유지) */
    [cell: `cell-${string}`]: ((props: KrdsTableCellSlotProps) => VNode[]) | undefined
    /** 열(`name`)의 헤더 셀 내용 (예: 화면에 숨긴 열 제목) */
    [header: `header-${string}`]: ((props: { column: TableColumn }) => VNode[]) | undefined
  }>,
  setup(props, { emit, slots }) {
    const instance = getCurrentInstance()

    /**
     * 테이블 클래스 계산
     */
    const tableClasses = computed(() => {
      const classes = ['tbl']

      // 사용자 정의 클래스 (원본 HTML: "tbl col data")
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 컨테이너 클래스 계산
     */
    const wrapperClasses = computed(() => {
      return ['krds-table-wrap']
    })

    /**
     * 헤더 스타일 반환
     */
    const getHeaderStyle = (column: TableColumn) => {
      return column.headerStyle || undefined
    }

    /**
     * 헤더 클래스 계산
     */
    const getHeaderClasses = (column: TableColumn) => {
      const classes: string[] = []

      if (column.align) {
        classes.push(`text-${column.align}`)
      }

      if (column.headerClasses) {
        classes.push(column.headerClasses)
      }

      return classes.length > 0 ? classes : undefined
    }

    /**
     * 바디 셀 스타일 반환
     */
    const getCellStyle = (row: TableRow, column: TableColumn) => {
      if (!column.style) return undefined

      if (typeof column.style === 'function') {
        return column.style(row)
      }

      return column.style
    }

    /**
     * 바디 셀 클래스 계산
     */
    const getCellClasses = (row: TableRow, column: TableColumn) => {
      const classes: string[] = []

      if (column.align) {
        classes.push(`text-${column.align}`)
      }

      if (column.classes) {
        const columnClasses = typeof column.classes === 'function' ? column.classes(row) : column.classes
        classes.push(columnClasses)
      }

      return classes.length > 0 ? classes : undefined
    }

    /**
     * colgroup 생성
     */
    const renderColgroup = () => {
      if (!props.columns.length) return null

      // headerStyle에서 width 추출
      const hasWidthStyles = props.columns.some(column => column.headerStyle && column.headerStyle.includes('width'))

      if (!hasWidthStyles) return null

      return h(
        'colgroup',
        props.columns.map(column => {
          if (!column.headerStyle) return h('col')

          // width 값 추출 (예: "width: 100px;" 또는 "width:100px")
          const widthMatch = column.headerStyle.match(/width\s*:\s*([^;]+)/i)
          return h('col', {
            style: widthMatch ? { width: widthMatch[1].trim() } : undefined
          })
        })
      )
    }

    /**
     * 테이블 헤더 생성
     */
    const renderHeader = () => {
      if (!props.columns.length) return null

      const headerCells = props.columns.map(column => {
        const headerStyle = getHeaderStyle(column)
        const headerClasses = getHeaderClasses(column)

        return h(
          'th',
          {
            scope: 'col',
            class: headerClasses,
            style: headerStyle
          },
          slots[`header-${column.name}`]?.({ column }) ?? column.label
        )
      })

      return h('thead', [h('tr', headerCells)])
    }

    /**
     * 셀 값 추출
     */
    const getCellValue = (row: TableRow, column: TableColumn) => {
      if (typeof column.field === 'function') {
        return column.field(row)
      }
      return column.field === undefined ? undefined : row[column.field]
    }

    /**
     * 테이블 바디 생성
     */
    const renderBody = () => {
      if (!props.rows.length) {
        return h('tbody', [
          h('tr', [
            h(
              'td',
              {
                colspan: props.columns.length || 1,
                class: 'text-center'
              },
              // no-data 슬롯이 있으면 슬롯 사용, 없으면 기본 텍스트
              slots['no-data'] ? slots['no-data']() : '데이터가 없습니다.'
            )
          ])
        ])
      }

      // row-click 리스너가 있을 때만 행을 대화형으로 (기본 표는 비대화형)
      const vnodeProps = instance?.vnode.props
      const clickable = !!(vnodeProps?.onRowClick || vnodeProps?.['onRow-click'])

      const bodyRows = props.rows.map((row, index) => {
        const cells = props.columns.map((column, colIndex) => {
          const cellValue = getCellValue(row, column)
          const cellSlot = slots[`cell-${column.name}`]
          const cellContent = cellSlot
            ? cellSlot({ row, column, value: cellValue, index })
            : typeof cellValue === 'function'
              ? cellValue()
              : cellValue
          const cellStyle = getCellStyle(row, column)
          const cellClasses = getCellClasses(row, column)

          return h(
            colIndex === 0 ? 'th' : 'td',
            {
              scope: colIndex === 0 ? 'row' : undefined,
              class: cellClasses,
              style: cellStyle
            },
            cellContent
          )
        })

        return h(
          'tr',
          clickable
            ? {
                tabindex: 0,
                onClick: (event: MouseEvent) => {
                  // 셀 슬롯 안 컨트롤(체크박스·버튼 등) 클릭은 행 선택으로 보지 않음 (표를 감싼 바깥 요소는 제외하고 행 안에서만 찾는다)
                  const control = (event.target as Element).closest('a, button, input, select, textarea, label')
                  if (control && (event.currentTarget as Element).contains(control)) return
                  handleRowClick(row, index)
                },
                onKeydown: (event: KeyboardEvent) => handleRowKeydown(event, row, index)
              }
            : null,
          cells
        )
      })

      return h('tbody', bodyRows)
    }

    /**
     * 행 클릭 핸들러
     */
    const handleRowClick = (row: TableRow, index: number) => {
      emit('row-click', row, index)
    }

    /**
     * 행 키보드 핸들러 (Enter·Space로 행 선택, 셀 안 컨트롤의 키 입력은 무시)
     */
    const handleRowKeydown = (event: KeyboardEvent, row: TableRow, index: number) => {
      if (event.target !== event.currentTarget || (event.key !== 'Enter' && event.key !== ' ')) return
      // Space의 페이지 스크롤 방지
      event.preventDefault()
      handleRowClick(row, index)
    }

    return () => {
      return h('div', { class: wrapperClasses.value }, [
        h('table', { class: tableClasses.value }, [
          props.caption && h('caption', props.caption),
          renderColgroup(),
          renderHeader(),
          renderBody()
        ])
      ])
    }
  }
})
