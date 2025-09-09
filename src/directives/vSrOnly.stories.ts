import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Directives/v-sr-only',
  parameters: {
    docs: {
      description: {
        component: `
v-sr-only 디렉티브는 스크린 리더 전용 텍스트를 위한 최소 구현 디렉티브입니다.

**사용법:**
- \`v-sr-only\`: 요소에 .sr-only 클래스 추가
- 디렉티브 제거 시 클래스도 자동 제거

**동작:**
- mounted: .sr-only 클래스 추가
- unmounted: .sr-only 클래스 제거
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: '기본',
  render: () => ({
    template: `
      <div>
        <p>일반 텍스트입니다.</p>
        <span v-sr-only>스크린 리더 전용 텍스트입니다.</span>
        <p>다시 일반 텍스트입니다.</p>
      </div>
    `
  })
}
