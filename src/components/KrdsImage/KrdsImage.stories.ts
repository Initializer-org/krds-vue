import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/Layout/KrdsImage',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `이미지는 콘텐츠 양식 중 하나로 단일 이미지 또는 이미지 시퀀스로 표현될 수 있다. 이미지를 적절하게 사용하게 되면 사용자는 텍스트보다 효과적으로 정보를 인지할 수 있으며, 텍스트로 표현하기 어려운 정보를 전달할 수 있다.`
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
        <h2 style="margin-bottom: 20px;">KrdsImage 컴포넌트</h2>
        <p style="color: #666;">
          이미지 컴포넌트는 현재 제공되는 것이 없습니다.
        </p>
      </div>
    `
  })
}
