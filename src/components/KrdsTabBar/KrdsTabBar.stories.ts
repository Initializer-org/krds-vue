import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/Navigation/KrdsTabBar',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `탭바는 화면 하단에 고정하여 제공하는 탐색 수단으로 작은 디바이스나 좁은 화면에서 서비스의 핵심 화면으로 빠르게 접근할 수 있도록 도와준다.`
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    template: `
      <div style="text-align: center; padding: 40px;">
        <h2 style="margin-bottom: 20px;">KrdsTabBar 컴포넌트</h2>
        <p style="color: #666;">
          탭바 컴포넌트는 현재 제공되는 것이 없습니다.<br>
          화면 하단에 고정되는 모바일 내비게이션 바를 제공할 예정입니다.
        </p>
      </div>
    `
  })
}
