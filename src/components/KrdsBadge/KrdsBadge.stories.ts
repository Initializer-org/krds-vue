import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsBadge from './KrdsBadge'

const meta: Meta<typeof KrdsBadge> = {
  title: 'Components/Layout/KrdsBadge',
  component: KrdsBadge,
  parameters: {
    docs: {
      description: {
        component:
          '컴포넌트에 대한 빠른 인지와 탐색을 돕기 위해 컴포넌트 근처에 표시되는 작은 문자 또는 숫자 데이터이다. 컴포넌트의 분류 체계, 구조화된 정보, 상태 정보, 기타 메타 데이터를 표시할 수 있으며 사용자의 주의를 끌기 위해 색상을 활용할 수 있다.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['outline', 'bg', 'bg-light']
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'gray', 'point', 'danger', 'warning', 'success', 'information']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    number: {
      control: { type: 'boolean' },
      description: '넘버 사용 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {},
  render: args => ({
    components: { KrdsBadge },
    setup() {
      return { args }
    },
    template: '<KrdsBadge v-bind="args">label</KrdsBadge>'
  })
}

// 2. 기본 전체
export const DefaultAll: Story = {
  name: '기본 전체',
  render: () => ({
    components: { KrdsBadge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsBadge type="outline" color="primary" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="secondary" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="gray" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="point" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="danger" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="warning" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="success" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="information" size="large">label</KrdsBadge>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsBadge type="bg" color="primary" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="secondary" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="gray" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="point" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="danger" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="warning" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="success" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="information" size="medium">label</KrdsBadge>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsBadge type="bg-light" color="primary" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="secondary" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="gray" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="point" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="danger" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="warning" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="success" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="information" size="small">label</KrdsBadge>
        </div>
      </div>
    `
  })
}

// 2. 계층
export const number: Story = {
  name: '넘버 배지',
  render: () => ({
    components: { KrdsBadge },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <KrdsBadge type="bg" color="primary" number>1234</KrdsBadge>
        <KrdsBadge type="bg" color="point" number>1234</KrdsBadge>
      </div>
    `
  })
}

// 3. 사이즈
export const Sizes: Story = {
  name: '사이즈',
  render: () => ({
    components: { KrdsBadge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsBadge type="outline" color="primary" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="secondary" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="gray" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="point" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="danger" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="warning" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="success" size="large">label</KrdsBadge>
          <KrdsBadge type="outline" color="information" size="large">label</KrdsBadge>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsBadge type="bg" color="primary" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="secondary" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="gray" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="point" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="danger" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="warning" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="success" size="medium">label</KrdsBadge>
          <KrdsBadge type="bg" color="information" size="medium">label</KrdsBadge>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsBadge type="bg-light" color="primary" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="secondary" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="gray" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="point" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="danger" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="warning" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="success" size="small">label</KrdsBadge>
          <KrdsBadge type="bg-light" color="information" size="small">label</KrdsBadge>
        </div>
      </div>
    `
  })
}
