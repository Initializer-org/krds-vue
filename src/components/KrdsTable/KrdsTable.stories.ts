import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, within } from 'storybook/test'
import { ref } from 'vue'
import KrdsTable from './KrdsTable'

const meta: Meta<typeof KrdsTable> = {
  title: 'Components/Layout/KrdsTable',
  component: KrdsTable,
  parameters: {
    docs: {
      description: {
        component:
          '표는 데이터를 하나 이상의 행과 열로 조직화하여 표현하는 형식으로 사용자가 빠르게 많은 양의 정보를 확인하고 비교할 수 있도록 도와준다. 기본적으로 대화형 요소가 아니기 때문에 열 제목에 데이터를 정렬하기 위한 컨트롤 요소가 포함된 상황 외에 행 전체나 데이터 셀이 대화형으로 작동하지 않는다.'
      }
    }
  },
  argTypes: {
    caption: {
      control: 'text',
      description: '테이블 캡션'
    },
    columns: {
      control: 'object',
      description: '테이블 열 정의'
    },
    rows: {
      control: 'object',
      description: '테이블 행 데이터'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 테이블 (원본 HTML과 동일)
export const Default: Story = {
  name: '기본 테이블',
  args: {
    caption: '000에 대한 표로 제목1,제목2에 대한 내용으로 구성되어 있으며 제목1은 제목1-1,제목1-2,제목1-3으로 구성되어있다.',
    class: 'col data',
    columns: [
      {
        name: 'title',
        label: '제목1',
        field: 'title',
        headerStyle: 'width: 30%'
      },
      {
        name: 'content',
        label: '제목2',
        field: 'content'
      }
    ],
    rows: [
      {
        title: '제목1-1',
        content:
          '내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다.'
      },
      {
        title: '제목1-2',
        content: '내용이 들어갑니다.'
      },
      {
        title: '제목1-3',
        content: '내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다.'
      }
    ]
  },
  play: async ({ canvas }) => {
    // 래퍼 + class prop은 table에 적용, caption이 표의 접근 가능한 이름
    const table = canvas.getByRole('table')
    await expect(table.parentElement).toHaveClass('krds-table-wrap')
    await expect(table).toHaveClass('tbl', 'col', 'data')
    await expect(table).toHaveAccessibleName(/^000에 대한 표/)

    // headerStyle의 width가 colgroup으로 반영
    const widths = Array.from(table.querySelectorAll<HTMLElement>('colgroup > col'), col => col.style.width)
    await expect(widths).toEqual(['30%', ''])

    // 열 제목 scope=col, 각 행 첫 셀은 scope=row 행 제목
    const colHeaders = canvas.getAllByRole('columnheader')
    await expect(colHeaders.map(th => th.textContent)).toEqual(['제목1', '제목2'])
    for (const th of colHeaders) await expect(th).toHaveAttribute('scope', 'col')
    const rowHeaders = canvas.getAllByRole('rowheader')
    await expect(rowHeaders.map(th => th.textContent)).toEqual(['제목1-1', '제목1-2', '제목1-3'])
    for (const th of rowHeaders) await expect(th).toHaveAttribute('scope', 'row')
    await expect(canvas.getAllByRole('cell')).toHaveLength(3)

    // row-click 리스너가 없으면 행은 대화형이 아님 (초점 불가)
    for (const row of canvas.getAllByRole('row')) await expect(row).not.toHaveAttribute('tabindex')
  }
}

// 행 클릭 (row-click 리스너가 있을 때만 행이 키보드로 동작)
export const RowClick: Story = {
  name: '행 클릭',
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
  render: args => ({
    components: { KrdsTable },
    setup() {
      const selected = ref('없음')
      return { args, selected }
    },
    template: `
      <KrdsTable v-bind="args" @row-click="(row, index) => (selected = row.name + ' (' + index + ')')" />
      <p data-testid="selected">선택된 행: {{ selected }}</p>`
  }),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const selected = canvas.getByTestId('selected')
    const [headerRow, ...bodyRows] = canvas.getAllByRole('row')

    // 바디 행만 Tab 순서에 포함
    await expect(headerRow).not.toHaveAttribute('tabindex')
    for (const row of bodyRows) await expect(row).toHaveAttribute('tabindex', '0')

    // 마우스 클릭
    await userEvent.click(within(bodyRows[2]).getByRole('cell'))
    await expect(selected).toHaveTextContent('선택된 행: 박민수 (2)')

    // Tab → 첫 행, Enter로 선택
    bodyRows[2].blur()
    await userEvent.tab()
    await expect(bodyRows[0]).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await expect(selected).toHaveTextContent('선택된 행: 김철수 (0)')

    // Space로 선택, 페이지 스크롤(기본 동작)은 막음
    let spacePrevented = false
    canvasElement.addEventListener('keydown', e => (spacePrevented = e.key === ' ' && e.defaultPrevented))
    await userEvent.tab()
    await expect(bodyRows[1]).toHaveFocus()
    await userEvent.keyboard(' ')
    await expect(selected).toHaveTextContent('선택된 행: 이영희 (1)')
    await expect(spacePrevented).toBe(true)
  }
}

// 스타일과 클래스 기능 데모 (Quasar-like)
export const StyleAndClassDemo: Story = {
  name: '스타일 & 클래스 기능',
  args: {
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
      {
        name: 'name',
        label: '이름',
        field: 'name',
        headerStyle: 'width: 150px; color: #333',
        classes: 'font-medium'
      },
      {
        name: 'score',
        label: '점수',
        field: 'score',
        headerStyle: 'width: 100px',
        headerClasses: 'text-right',
        classes: row => (row.score >= 80 ? 'score-high text-right' : 'score-low text-right'),
        align: 'right'
      },
      {
        name: 'status',
        label: '상태',
        field: 'status',
        headerClasses: 'text-center',
        classes: row => `status-${row.status.toLowerCase()} text-center`,
        align: 'center'
      }
    ],
    rows: [
      { id: 1, name: '김철수', score: 95, status: 'PASS' },
      { id: 2, name: '이영희', score: 78, status: 'FAIL' },
      { id: 3, name: '박민수', score: 88, status: 'PASS' },
      { id: 4, name: '정수진', score: 92, status: 'PASS' }
    ]
  },
  play: async ({ canvas }) => {
    const table = canvas.getByRole('table')

    // 헤더: align → text-{align}, headerClasses·headerStyle 반영
    const [idTh, nameTh, scoreTh] = canvas.getAllByRole('columnheader')
    await expect(idTh).toHaveClass('text-center', 'bg-gray-100', 'font-bold')
    await expect(nameTh).toHaveStyle('color: #333')
    await expect(scoreTh).toHaveClass('text-right')

    // width가 있는 열만 colgroup 너비 지정
    const widths = Array.from(table.querySelectorAll<HTMLElement>('colgroup > col'), col => col.style.width)
    await expect(widths).toEqual(['80px', '150px', '100px', ''])

    // 바디: 첫 열(행 제목)에도 style·classes 적용
    const [, passRow, failRow] = canvas.getAllByRole('row')
    const idCell = within(passRow).getByRole('rowheader')
    await expect(idCell).toHaveTextContent('1')
    await expect(idCell).toHaveClass('text-center')
    await expect(idCell.style.width).toBe('80px')

    // 함수형 classes는 행 데이터 기준으로 계산
    const [, passScore, passStatus] = within(passRow).getAllByRole('cell')
    await expect(passScore).toHaveClass('score-high', 'text-right')
    await expect(passStatus).toHaveClass('status-pass', 'text-center')
    const [, failScore, failStatus] = within(failRow).getAllByRole('cell')
    await expect(failScore).toHaveClass('score-low', 'text-right')
    await expect(failStatus).toHaveClass('status-fail', 'text-center')
  }
}

// 빈 데이터 테이블 (기본 텍스트)
export const NoData: Story = {
  name: '빈 데이터 (기본)',
  args: {
    caption: '데이터가 없는 테이블',
    columns: [
      {
        name: 'id',
        label: 'ID',
        field: 'id'
      },
      {
        name: 'name',
        label: '이름',
        field: 'name'
      },
      {
        name: 'email',
        label: '이메일',
        field: 'email'
      }
    ],
    rows: []
  },
  play: async ({ canvas }) => {
    // 열 제목은 유지하고 전체 열을 합친 셀에 기본 안내 문구 표시
    await expect(canvas.getAllByRole('columnheader')).toHaveLength(3)
    const cell = canvas.getByRole('cell')
    await expect(cell).toHaveTextContent('데이터가 없습니다.')
    await expect(cell).toHaveAttribute('colspan', '3')
    await expect(cell).toHaveClass('text-center')
  }
}

// 빈 데이터 테이블 (커스텀 no-data 슬롯)
export const NoDataWithSlot: Story = {
  name: '빈 데이터 (커스텀 슬롯)',
  args: {
    caption: '커스텀 no-data 슬롯이 있는 테이블',
    columns: [
      {
        name: 'id',
        label: 'ID',
        field: 'id'
      },
      {
        name: 'name',
        label: '이름',
        field: 'name'
      },
      {
        name: 'email',
        label: '이메일',
        field: 'email'
      }
    ],
    rows: []
  },
  parameters: {
    docs: {
      source: {
        code: `<script lang="ts" setup>
const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id'
  },
  {
    name: 'name',
    label: '이름',
    field: 'name'
  },
  {
    name: 'email',
    label: '이메일',
    field: 'email'
  }
]

const rows = [] 
</script>

<template>
  <KrdsTable 
    caption="커스텀 no-data 슬롯이 있는 테이블" 
    :columns="columns" 
    :rows="rows"
  >
    <template #no-data>
      <div style="padding: 2rem; text-align: center; color: #666;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📋</div>
        <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">데이터를 찾을 수 없습니다</div>
        <div style="font-size: 0.9rem;">새로운 데이터를 추가해보세요</div>
      </div>
    </template>
  </KrdsTable>
</template>`
      }
    }
  },
  render: args => ({
    components: { KrdsTable },
    setup() {
      return { args }
    },
    template: `
      <KrdsTable v-bind="args">
        <template #no-data>
          <div style="padding: 2rem; text-align: center; color: #666;">
            <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">데이터를 찾을 수 없습니다</div>
            <div style="font-size: 0.9rem;">새로운 데이터를 추가해보세요</div>
          </div>
        </template>
      </KrdsTable>
    `
  }),
  play: async ({ canvas }) => {
    // no-data 슬롯이 기본 문구를 대체
    const cell = canvas.getByRole('cell')
    await expect(cell).toHaveAttribute('colspan', '3')
    await expect(cell).toHaveTextContent('데이터를 찾을 수 없습니다')
    await expect(cell).not.toHaveTextContent('데이터가 없습니다.')
  }
}
