import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsSpinner from './KrdsSpinner'

const meta: Meta<typeof KrdsSpinner> = {
  title: 'Components/Feedback/KrdsSpinner',
  component: KrdsSpinner,
  parameters: {
    docs: {
      description: {
        component:
          '스피너는 화면이나 요소의 다양한 처리 상태를 시각적으로 표시한 것으로 화면 전체나 일부 요소에 접근하기 위해 일정 시간 동안 대기해야 함을 사용자에게 안내한다.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: '스피너와 함께 표시될 라벨'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: '기본',
  render: args => ({
    components: { KrdsSpinner },
    setup() {
      return { args }
    },
    template: `
      <div style="position: relative; height: 200px;">
        <KrdsSpinner v-bind="args" />
      </div>
    `
  }),
  args: {}
}

export const WithLabel: Story = {
  name: '라벨 포함',
  render: args => ({
    components: { KrdsSpinner },
    setup() {
      return { args }
    },
    template: `
      <div style="position: relative; height: 200px;">
        <KrdsSpinner v-bind="args" />
      </div>
    `
  }),
  args: {
    label: 'Loading data..'
  }
}
