import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsCriticalAlerts from './KrdsCriticalAlerts'

const meta: Meta<typeof KrdsCriticalAlerts> = {
  title: 'Components/Layout/KrdsCriticalAlerts',
  component: KrdsCriticalAlerts,
  parameters: {
    docs: {
      description: {
        component:
          '긴급 공지는 본문 상단에 강조되어 표시되는 배너로 사용자에게 긴급하거나 중요한 정보를 전달하는 데 사용된다. 모든 공공 디지털 서비스에서 동일한 긴급 공지 컴포넌트를 사용함으로써 사용자는 긴급한 정보를 일관되고 예측 가능한 방식으로 찾고 이해할 수 있다.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['danger', 'ok', 'info'],
      description: '알림 타입'
    },
    message: {
      control: 'text',
      description: '알림 메시지'
    },
    linkHref: {
      control: 'text',
      description: '링크 URL'
    },
    linkText: {
      control: 'text',
      description: '링크 텍스트'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {
    type: 'danger',
    message: '긴급 공지 내용 표시',
    linkHref: '#',
    linkText: '자세히 보기'
  },
  render: args => ({
    components: { KrdsCriticalAlerts },
    setup() {
      return { args }
    },
    template: '<KrdsCriticalAlerts v-bind="args" />'
  })
}
