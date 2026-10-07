import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
import KrdsSkipLink from './KrdsSkipLink'

const meta: Meta<typeof KrdsSkipLink> = {
  title: 'Components/Navigation/KrdsSkipLink',
  component: KrdsSkipLink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '건너뛰기 링크는 웹사이트에서 웹 페이지의 주요 콘텐츠 섹션의 탐색을 도와주는 페이지 내부 링크이다. 키보드나 가상 초점을 이용하여 콘텐츠를 탐색하는 사용자는 건너뛰기 링크를 이용하여 대부분의 페이지에서 반복되는 콘텐츠 영역을 건너뛰고 주요 콘텐츠로 빠르게 이동할 수 있다.'
      }
    }
  },
  argTypes: {
    href: {
      control: 'text',
      description: '건너뛸 대상 요소의 ID (# 포함)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: '기본',
  args: {
    href: '#main-content'
  },
  render: args => ({
    components: { KrdsSkipLink },
    setup() {
      return { args }
    },
    template: `
      <div>
        <KrdsSkipLink v-bind="args">본문 바로가기</KrdsSkipLink>
        <div style="margin-top: 20px; padding: 20px; border: 1px dashed #ccc;">
          <p><strong>사용법:</strong> Tab 키를 눌러 건너뛰기 링크에 포커스를 맞춰보세요.</p>
          <p>실제 사용 시에는 페이지 최상단에 배치하고, 포커스를 받기 전까지는 화면에서 숨겨집니다.</p>
        </div>
        <div id="main-content" style="margin-top: 100px; padding: 20px; background: #f5f5f5;">
          <h2>주요 콘텐츠 영역</h2>
          <p>이곳이 건너뛰기 링크의 대상이 되는 주요 콘텐츠 영역입니다.</p>
        </div>
      </div>
    `
  }),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const link = canvas.getByRole('link', { name: '본문 바로가기' })

    // KRDS 구조: #krds-skip-link > a, href는 본문 영역을 가리킴
    await expect(link.parentElement).toHaveAttribute('id', 'krds-skip-link')
    await expect(link).toHaveAttribute('href', '#main-content')
    await expect(canvasElement.querySelector('#main-content')).toBeInTheDocument()

    // 초점 전에는 화면에서 숨김(sr-only)
    await expect(link.getBoundingClientRect().height).toBeLessThanOrEqual(1)

    // 첫 Tab에 초점을 받고 화면에 노출 (전역 transition이 있어 대기)
    await userEvent.tab()
    await expect(link).toHaveFocus()
    await waitFor(() => expect(link.getBoundingClientRect().height).toBeGreaterThan(1))
  }
}
