import type { Meta, StoryObj } from '@storybook/vue3-vite'
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
  }
}
