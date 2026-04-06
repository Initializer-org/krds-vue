import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
import KrdsResize from './KrdsResize.vue'

const meta: Meta<typeof KrdsResize> = {
  title: 'Components/Setting/KrdsResize',
  component: KrdsResize,
  parameters: {
    docs: {
      description: {
        component: `화면 크기 조정은 텍스트를 포함하여 화면에 표시되는 정보를 확대하거나 축소하는 데 사용되는 요소이다. 사용자에 따라 읽을 수 있는 텍스트의 크기, 조작할 수 있는 요소의 크기는 다르다. 디바이스나 사용자 에이전트가 지원하는 여러 가지 설정 기능을 활용하면 사용자가 선호하는 방식으로 콘텐츠의 표시 방식을 수정할 수 있다. 그러나 화면 크기 조정 기능을 필요로 하는 사용자는 관련 기능을 찾아 설정하는 데 어려움을 겪을 가능성이 높으므로 서비스 자체적으로 화면 크기 조정 기능을 제공하고 접근하기 쉽게 만드는 것이 중요하다.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {},
  render: () => ({
    components: { KrdsResize },
    setup() {},
    template: `
      <div style="height: 400px; padding: 20px">
        <KrdsResize />
      </div>
    `
  }),
  play: async ({ canvasElement, userEvent }) => {
    const toggleBtn = canvasElement.querySelector('.drop-btn') as HTMLElement

    // Open dropdown
    await userEvent.click(toggleBtn)

    // Wait for dropdown to open
    await waitFor(() => {
      const menu = canvasElement.querySelector('.drop-menu') as HTMLElement
      expect(menu.style.display).toBe('block')
    })

    // Select a size option
    const largeBtn = canvasElement.querySelector('[data-adjust-scale="xlg"]') as HTMLElement
    await userEvent.click(largeBtn)

    // Reopen dropdown and reset
    await userEvent.click(toggleBtn)
    await waitFor(() => {
      const menu = canvasElement.querySelector('.drop-menu') as HTMLElement
      expect(menu.style.display).toBe('block')
    })
    const resetBtn = canvasElement.querySelector('[data-adjust-scale="md"].krds-btn') as HTMLElement
    await userEvent.click(resetBtn)

    // Reopen and close with Escape
    await userEvent.click(toggleBtn)
    await waitFor(() => {
      const menu = canvasElement.querySelector('.drop-menu') as HTMLElement
      expect(menu.style.display).toBe('block')
    })
    await userEvent.keyboard('{Escape}')

    // Verify dropdown closed
    await waitFor(() => {
      const menu = canvasElement.querySelector('.drop-menu') as HTMLElement
      expect(menu.style.display).toBe('none')
    })
  }
}
