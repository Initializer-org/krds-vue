import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsIcon from './KrdsIcon'

const meta: Meta<typeof KrdsIcon> = {
  title: 'Components/Layout/KrdsIcon',
  component: KrdsIcon,
  parameters: {
    docs: {
      description: {
        component:
          'KRDS SVG 아이콘을 표시하는 컴포넌트이다. name 속성에 아이콘 클래스명(ico-*)을 지정하며, 실제 그래픽은 스타일 시트의 svg-icon 마스크로 렌더링된다.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {
    name: 'ico-help'
  },
  render: args => ({
    components: { KrdsIcon },
    setup() {
      return { args }
    },
    template: `<KrdsIcon v-bind="args" />`
  }),
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('.svg-icon')
    await expect(icon).toBeTruthy()
    await expect(icon).toHaveClass('ico-help')
  }
}

// 2. 아이콘 목록
export const Gallery: Story = {
  name: '아이콘 목록',
  render: () => ({
    components: { KrdsIcon },
    setup() {
      const icons = [
        'ico-angle',
        'ico-calendar',
        'ico-call',
        'ico-del',
        'ico-email',
        'ico-faq',
        'ico-file',
        'ico-filter',
        'ico-global',
        'ico-go',
        'ico-help',
        'ico-like'
      ]
      return { icons }
    },
    template: `
      <ul style="display: flex; flex-wrap: wrap; gap: 1.6rem; list-style: none; padding: 0;">
        <li v-for="icon in icons" :key="icon" style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem; width: 8rem;">
          <KrdsIcon :name="icon" />
          <code style="font-size: 1.2rem;">{{ icon }}</code>
        </li>
      </ul>`
  })
}
