import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsLink from './KrdsLink'

const meta: Meta<typeof KrdsLink> = {
  title: 'Components/Action/KrdsLink',
  component: KrdsLink,
  parameters: {
    docs: {
      description: {
        component:
          '링크는 다른 서비스/애플리케이션, 한 서비스 내의 다른 화면, 한 화면 내의 다른 섹션 등으로 이동하는 데 사용되는 탐색 요소이다.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    link: {
      control: 'boolean'
    },
    basic: {
      control: 'boolean'
    },
    target: {
      control: 'select',
      options: [undefined, '_blank', '_self']
    },
    href: {
      control: 'text'
    },
    pure: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본 링크
export const Default: Story = {
  name: '기본',
  args: {
    href: 'https://www.site_name.com/',
    size: 'small',
    target: '_blank',
    title: '새 창 열림'
  },
  render: args => ({
    components: { KrdsLink },
    setup() {
      return { args }
    },
    template: `
      <KrdsLink v-bind="args">
        <span class="underline">기본 링크</span> <i class="svg-icon ico-go"></i>
      </KrdsLink>
    `
  })
}

// 2. 링크 변형들
export const AllVariations: Story = {
  name: '모든 링크 변형',
  render: () => ({
    components: { KrdsLink },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <KrdsLink href="#!" size="medium" pure>
          <span class="underline">가상클래스 상태 시 컬러 유지</span>
        </KrdsLink>
        
        <KrdsLink href="#!" size="large" basic target="_blank" title="새 창 열림">
          <span class="underline">본문 텍스트 컬러 링크</span> <i class="svg-icon ico-go"></i>
        </KrdsLink>
        
        <KrdsLink href="#!" size="large" basic>
          <span class="underline hidden-underline">가상클래스 상태 시 밑줄</span>
        </KrdsLink>
        
        <KrdsLink href="#!" size="large" basic>
          <span>밑줄 없음</span>
        </KrdsLink>
      </div>
    `
  })
}
