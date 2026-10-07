import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import { ref } from 'vue'
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
      const clickCount = ref(0)
      return { args, clickCount }
    },
    template: `
      <KrdsCriticalAlerts v-bind="args" @link-click="clickCount++" />
      <p data-testid="click-count">링크 클릭: {{ clickCount }}회</p>`
  }),
  play: async ({ canvas, canvasElement, userEvent }) => {
    // <a href="#"> 이동이 브라우저 연결을 끊지 않도록 차단
    canvasElement.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).closest('a')) e.preventDefault()
    })

    // KRDS 구조: ul.krds-critical-alerts > li > .critical-ban
    const banner = canvasElement.querySelector('ul.krds-critical-alerts > li > .critical-ban')!
    await expect(banner).toBeInTheDocument()

    // 타입별 배지 클래스·텍스트
    const badge = banner.querySelector('.critical-badge')
    await expect(badge).toHaveClass('danger')
    await expect(badge).toHaveTextContent('긴급')
    await expect(banner.querySelector('.critical-txt')).toHaveTextContent('긴급 공지 내용 표시')

    // 링크
    const link = canvas.getByRole('link', { name: '자세히 보기' })
    await expect(link).toHaveAttribute('href', '#')
    await expect(link).toHaveClass('krds-btn', 'medium', 'link', 'basic')

    // 클릭·Enter 모두 link-click 이벤트 전달
    await userEvent.click(link)
    await expect(canvas.getByTestId('click-count')).toHaveTextContent('링크 클릭: 1회')
    link.focus()
    await userEvent.keyboard('{Enter}')
    await expect(canvas.getByTestId('click-count')).toHaveTextContent('링크 클릭: 2회')
  }
}

// 2. 타입
export const Types: Story = {
  name: '타입',
  render: () => ({
    components: { KrdsCriticalAlerts },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <KrdsCriticalAlerts type="danger" message="긴급 공지 내용 표시" link-href="#" />
        <KrdsCriticalAlerts type="ok" message="안전 공지 내용 표시" link-href="#" />
        <KrdsCriticalAlerts type="info" message="안내 공지 내용 표시" />
      </div>`
  }),
  play: async ({ canvas, canvasElement }) => {
    // 타입별 배지 텍스트
    const badges = canvasElement.querySelectorAll('.critical-badge')
    await expect(badges[0]).toHaveClass('danger')
    await expect(badges[0]).toHaveTextContent('긴급')
    await expect(badges[1]).toHaveClass('ok')
    await expect(badges[1]).toHaveTextContent('안전')
    await expect(badges[2]).toHaveClass('info')
    await expect(badges[2]).toHaveTextContent('안내')

    // linkHref가 없으면 링크 미표시, linkText 기본값은 '자세히 보기'
    await expect(canvas.getAllByRole('link', { name: '자세히 보기' })).toHaveLength(2)
    const infoBanner = badges[2].closest('.critical-ban')!
    await expect(infoBanner.querySelector('a')).toBeNull()
  }
}
