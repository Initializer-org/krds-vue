import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsBreadcrumb from './KrdsBreadcrumb.vue'
import type { BreadcrumbItem } from './KrdsBreadcrumb.vue'

const meta: Meta<typeof KrdsBreadcrumb> = {
  title: 'Components/Navigation/KrdsBreadcrumb',
  component: KrdsBreadcrumb,
  parameters: {
    docs: {
      description: {
        component:
          '브레드크럼은 탐색 계층 구조를 표시하여 사용자가 현재 위치를 파악하고 계층 구조의 수준을 이동할 수 있게 해준다. 브레드크럼을 통해 사용자는 탐색 중인 화면의 상위 수준 화면으로 이동할 수 있다.'
      }
    }
  },
  argTypes: {
    showHomeIcon: {
      control: 'boolean',
      description: '홈 아이콘 표시 여부'
    },
    ariaLabel: {
      control: 'text',
      description: '접근성 라벨'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const defaultItems: BreadcrumbItem[] = [{ text: '홈', href: '#' }, { text: '서비스 신청', href: '#' }, { text: '서비스 신청2' }]

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {
    items: defaultItems,
    ariaLabel: '현재 경로',
    showHomeIcon: true
  },
  render: args => ({
    components: { KrdsBreadcrumb },
    setup() {
      return { args }
    },
    template: '<KrdsBreadcrumb v-bind="args" />'
  })
}
