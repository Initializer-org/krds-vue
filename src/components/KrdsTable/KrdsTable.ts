import { defineComponent, h, computed } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * 테이블 행 데이터
 */
export type TableRow = Record<string, any>

/**
 * 테이블 열 정의
 */
export interface TableColumn {
  /** 고유 ID - 컬럼 식별자 */
  name: string
  /** 헤더 라벨 */
  label: string
  /** 행 객체 속성명 또는 함수 */
  field: string | ((row: any) => any)
  /** 필수 컬럼 여부 (visible-columns 사용시 항상 표시) */
  required?: boolean
  /** 정렬 */
  align?: 'left' | 'center' | 'right'
  /** body td 스타일 */
  style?: string | ((row: any) => string)
  /** body td 클래스 */
  classes?: string | ((row: any) => string)
  /** header th 스타일 */
  headerStyle?: string
  /** header th 클래스 */
  headerClasses?: string
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

export default defineComponent<KrdsTableProps>({
  name: 'KrdsTable',
  props: {
    caption: {
      type: String,
      default: undefined
    },
    columns: {
      type: Array as () => TableColumn[],
      required: true
    },
    rows: {
      type: Array as () => TableRow[],
      required: true
    },
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['row-click'],
  setup(props, { emit, slots }) {
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
     * 헤더 스타일 계산
     */
    const getHeaderStyle = (column: TableColumn) => {
      if (!column.headerStyle) return undefined

      // CSS 스타일 문자열을 객체로 변환
      const styles: Record<string, string> = {}
      const styleString = column.headerStyle

      // 간단한 파싱 (예: "width: 500px; color: red")
      styleString.split(';').forEach(style => {
        const [property, value] = style.split(':').map(s => s.trim())
        if (property && value) {
          styles[property] = value
        }
      })

      return styles
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
     * 바디 셀 스타일 계산
     */
    const getCellStyle = (row: TableRow, column: TableColumn) => {
      if (!column.style) return undefined

      if (typeof column.style === 'function') {
        const styleString = column.style(row)
        // CSS 스타일 문자열을 객체로 변환
        const styles: Record<string, string> = {}
        styleString.split(';').forEach(style => {
          const [property, value] = style.split(':').map(s => s.trim())
          if (property && value) {
            styles[property] = value
          }
        })
        return styles
      }

      // 문자열인 경우
      const styles: Record<string, string> = {}
      column.style.split(';').forEach(style => {
        const [property, value] = style.split(':').map(s => s.trim())
        if (property && value) {
          styles[property] = value
        }
      })
      return styles
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
          const style = getHeaderStyle(column)
          return h('col', {
            style: style && style.width ? { width: style.width } : undefined
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
          column.label
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
      return row[column.field]
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

      const bodyRows = props.rows.map((row, index) => {
        const cells = props.columns.map((column, colIndex) => {
          const cellValue = getCellValue(row, column)
          const cellContent = typeof cellValue === 'function' ? cellValue() : cellValue
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
          {
            onClick: () => handleRowClick(row, index)
          },
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

    return () => {
      // 슬롯 콘텐츠가 있으면 슬롯 우선 사용
      if (slots.default) {
        return h('div', { class: wrapperClasses.value }, [
          h('table', { class: tableClasses.value }, [props.caption && h('caption', props.caption), slots.default()])
        ])
      }

      // props 데이터로 테이블 생성
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
