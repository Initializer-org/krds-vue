import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/Layout/KrdsSplashScreen',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `스플래시 스크린은 응용 프로그램이 실행되기 전에 사용자에게 짧은 시간 동안 제공되는 화면으로 모바일 애플리케이션 전용 컴포넌트이다.`
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
        <h2 style="margin-bottom: 20px;">KrdsSplashScreen 컴포넌트</h2>
        <p style="color: #666;">
          스플래시 스크린 컴포넌트는 현재 제공되는 것이 없습니다.<br>
          모바일 앱 시작 시 표시되는 화면으로 각 플랫폼의 네이티브 기능을 통해 구현할 예정입니다.
        </p>
      </div>
    `
  })
}
