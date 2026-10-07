import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, within } from '@/test/utils'
import KrdsTable, { type TableRow } from '../KrdsTable'

const emptyColumns = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'name', label: '이름', field: 'name' },
  { name: 'email', label: '이메일', field: 'email' }
]

const colWidths = (table: HTMLElement) => Array.from(table.querySelectorAll<HTMLElement>('colgroup > col'), col => col.style.width)

describe('KrdsTable', () => {
  it('기본 테이블: 래퍼·caption·colgroup·scope, 행은 대화형이 아님', async () => {
    render(KrdsTable, {
      props: {
        caption: '000에 대한 표로 제목1,제목2에 대한 내용으로 구성되어 있으며 제목1은 제목1-1,제목1-2,제목1-3으로 구성되어있다.',
        class: 'col data',
        columns: [
          { name: 'title', label: '제목1', field: 'title', headerStyle: 'width: 30%' },
          { name: 'content', label: '제목2', field: 'content' }
        ],
        rows: [
          {
            title: '제목1-1',
            content:
              '내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다.'
          },
          { title: '제목1-2', content: '내용이 들어갑니다.' },
          { title: '제목1-3', content: '내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다.' }
        ]
      }
    })

    // 래퍼 + class prop은 table에 적용, caption이 표의 접근 가능한 이름
    const table = screen.getByRole('table')
    expect(table.parentElement).toHaveClass('krds-table-wrap')
    expect(table).toHaveClass('tbl', 'col', 'data')
    expect(table).toHaveAccessibleName(/^000에 대한 표/)

    // headerStyle의 width가 colgroup으로 반영
    expect(colWidths(table)).toEqual(['30%', ''])

    // 열 제목 scope=col, 각 행 첫 셀은 scope=row 행 제목
    const colHeaders = screen.getAllByRole('columnheader')
    expect(colHeaders.map(th => th.textContent)).toEqual(['제목1', '제목2'])
    for (const th of colHeaders) expect(th).toHaveAttribute('scope', 'col')
    const rowHeaders = screen.getAllByRole('rowheader')
    expect(rowHeaders.map(th => th.textContent)).toEqual(['제목1-1', '제목1-2', '제목1-3'])
    for (const th of rowHeaders) expect(th).toHaveAttribute('scope', 'row')
    expect(screen.getAllByRole('cell')).toHaveLength(3)

    // row-click 리스너가 없으면 행은 대화형이 아님 (초점 불가)
    for (const row of screen.getAllByRole('row')) expect(row).not.toHaveAttribute('tabindex')

    await expectNoA11yViolations()
  })

  it('행 클릭: 클릭·Enter·Space로 선택, Space 기본 동작 차단', async () => {
    const { container } = render({
      setup: () => ({
        args: {
          caption: '행을 클릭하거나 Enter·Space로 선택하는 테이블',
          columns: [
            { name: 'name', label: '이름', field: 'name' },
            { name: 'score', label: '점수', field: 'score' }
          ],
          rows: [
            { name: '김철수', score: 95 },
            { name: '이영희', score: 78 },
            { name: '박민수', score: 88 }
          ]
        },
        selected: ref('없음')
      }),
      template: `
        <KrdsTable v-bind="args" @row-click="(row, index) => (selected = row.name + ' (' + index + ')')" />
        <p data-testid="selected">선택된 행: {{ selected }}</p>`
    })
    const selected = screen.getByTestId('selected')
    const [headerRow, ...bodyRows] = screen.getAllByRole('row')

    // 바디 행만 Tab 순서에 포함
    expect(headerRow).not.toHaveAttribute('tabindex')
    for (const row of bodyRows) expect(row).toHaveAttribute('tabindex', '0')

    // 마우스 클릭
    await userEvent.click(within(bodyRows[2]).getByRole('cell'))
    expect(selected).toHaveTextContent('선택된 행: 박민수 (2)')

    // Tab → 첫 행, Enter로 선택
    bodyRows[2].blur()
    await userEvent.tab()
    expect(bodyRows[0]).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    expect(selected).toHaveTextContent('선택된 행: 김철수 (0)')

    // Space로 선택, 페이지 스크롤(기본 동작)은 막음
    let spacePrevented = false
    container.addEventListener('keydown', e => (spacePrevented = e.key === ' ' && e.defaultPrevented))
    await userEvent.tab()
    expect(bodyRows[1]).toHaveFocus()
    await userEvent.keyboard(' ')
    expect(selected).toHaveTextContent('선택된 행: 이영희 (1)')
    expect(spacePrevented).toBe(true)

    await expectNoA11yViolations()
  })

  it('스타일 & 클래스 기능: 헤더·바디 style/classes, 함수형 classes', async () => {
    render(KrdsTable, {
      props: {
        caption: '헤더와 바디에 스타일/클래스가 적용된 테이블',
        columns: [
          {
            name: 'id',
            label: 'ID',
            field: 'id',
            headerStyle: 'width: 80px',
            headerClasses: 'bg-gray-100 text-center font-bold',
            style: 'width: 80px',
            classes: 'text-center',
            align: 'center'
          },
          { name: 'name', label: '이름', field: 'name', headerStyle: 'width: 150px; color: #333', classes: 'font-medium' },
          {
            name: 'score',
            label: '점수',
            field: 'score',
            headerStyle: 'width: 100px',
            headerClasses: 'text-right',
            classes: (row: TableRow) => (Number(row.score) >= 80 ? 'score-high text-right' : 'score-low text-right'),
            align: 'right'
          },
          {
            name: 'status',
            label: '상태',
            field: 'status',
            headerClasses: 'text-center',
            classes: (row: TableRow) => `status-${String(row.status).toLowerCase()} text-center`,
            align: 'center'
          }
        ],
        rows: [
          { id: 1, name: '김철수', score: 95, status: 'PASS' },
          { id: 2, name: '이영희', score: 78, status: 'FAIL' },
          { id: 3, name: '박민수', score: 88, status: 'PASS' },
          { id: 4, name: '정수진', score: 92, status: 'PASS' }
        ]
      }
    })
    const table = screen.getByRole('table')

    // 헤더: align → text-{align}, headerClasses·headerStyle 반영
    const [idTh, nameTh, scoreTh] = screen.getAllByRole('columnheader')
    expect(idTh).toHaveClass('text-center', 'bg-gray-100', 'font-bold')
    expect(nameTh).toHaveStyle('color: #333')
    expect(scoreTh).toHaveClass('text-right')

    // width가 있는 열만 colgroup 너비 지정
    expect(colWidths(table)).toEqual(['80px', '150px', '100px', ''])

    // 바디: 첫 열(행 제목)에도 style·classes 적용
    const [, passRow, failRow] = screen.getAllByRole('row')
    const idCell = within(passRow).getByRole('rowheader')
    expect(idCell).toHaveTextContent('1')
    expect(idCell).toHaveClass('text-center')
    expect(idCell.style.width).toBe('80px')

    // 함수형 classes는 행 데이터 기준으로 계산
    const [, passScore, passStatus] = within(passRow).getAllByRole('cell')
    expect(passScore).toHaveClass('score-high', 'text-right')
    expect(passStatus).toHaveClass('status-pass', 'text-center')
    const [, failScore, failStatus] = within(failRow).getAllByRole('cell')
    expect(failScore).toHaveClass('score-low', 'text-right')
    expect(failStatus).toHaveClass('status-fail', 'text-center')

    await expectNoA11yViolations()
  })

  it('빈 데이터 (기본): 전체 열을 합친 셀에 기본 안내 문구', async () => {
    render(KrdsTable, { props: { caption: '데이터가 없는 테이블', columns: emptyColumns, rows: [] } })

    // 열 제목은 유지하고 전체 열을 합친 셀에 기본 안내 문구 표시
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    const cell = screen.getByRole('cell')
    expect(cell).toHaveTextContent('데이터가 없습니다.')
    expect(cell).toHaveAttribute('colspan', '3')
    expect(cell).toHaveClass('text-center')

    await expectNoA11yViolations()
  })

  it('빈 데이터 (커스텀 슬롯): no-data 슬롯이 기본 문구를 대체', async () => {
    render(KrdsTable, {
      props: { caption: '커스텀 no-data 슬롯이 있는 테이블', columns: emptyColumns, rows: [] },
      slots: {
        'no-data': `
          <div style="padding: 2rem; text-align: center; color: #666;">
            <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">데이터를 찾을 수 없습니다</div>
            <div style="font-size: 0.9rem;">새로운 데이터를 추가해보세요</div>
          </div>`
      }
    })

    // no-data 슬롯이 기본 문구를 대체
    const cell = screen.getByRole('cell')
    expect(cell).toHaveAttribute('colspan', '3')
    expect(cell).toHaveTextContent('데이터를 찾을 수 없습니다')
    expect(cell).not.toHaveTextContent('데이터가 없습니다.')

    await expectNoA11yViolations()
  })
})
