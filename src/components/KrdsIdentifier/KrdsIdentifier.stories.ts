import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsIdentifier from './KrdsIdentifier'

const meta: Meta<typeof KrdsIdentifier> = {
  title: 'Components/Identity/KrdsIdentifier',
  component: KrdsIdentifier,
  parameters: {
    docs: {
      description: {
        component:
          '운영기관 식별자는 디지털 정부서비스에 대한 신뢰성을 위해 서비스 운영 및 관리 주체를 안내하는 요소로 공식 배너, 푸터와 함께 서비스의 일관성, 브랜드를 확인할 수 있는 핵심 요소이다.'
      }
    }
  },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {},
  render: args => ({
    components: { KrdsIdentifier },
    setup() {
      return { args }
    },
    template: '<KrdsIdentifier v-bind="args">이 누리집은 보건복지부 누리집입니다.</KrdsIdentifier>'
  })
}
