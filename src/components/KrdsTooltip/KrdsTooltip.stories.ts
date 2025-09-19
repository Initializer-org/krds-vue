import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsTooltip from './KrdsTooltip.vue'

const meta: Meta<typeof KrdsTooltip> = {
  title: 'Components/Help/KrdsTooltip',
  component: KrdsTooltip,
  parameters: {
    docs: {
      description: {
        component:
          '툴팁은 요소나 본문 텍스트에 제공되는 짧은 부가 설명이다. 설명이 필요한 대상 또는 별도의 활성화 버튼에 마우스를 올리거나 초점을 이동했을 때 설명 텍스트가 표시된다.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsTooltip },
    template: `
      <div style="height: 300px;">
        <div style="display: flex; align-items: flex-start; gap: 10px">
          <KrdsTooltip tooltip-content="툴팁의 기본 설정입니다">
            tooltip-horizontal <i class="svg-icon ico-angle right"></i>
          </KrdsTooltip>
          <KrdsTooltip type="icon" tooltip-content="아이콘 버튼에 제공되는 툴팁">
            <span class="sr-only">도움말</span>
            <i class="svg-icon ico-help"></i>
          </KrdsTooltip>
          <KrdsTooltip type="button" tooltip-content="버튼에 제공되는 툴팁">
            도움말
          </KrdsTooltip>
        </div>
      </div>
    `
  })
}

export const TooltipVertical: Story = {
  name: 'tooltipVertical',
  render: () => ({
    components: { KrdsTooltip },
    template: `
      <div style="height: 300px;">
        <div style="display: flex; align-items: flex-start; gap: 10px">
          <KrdsTooltip vertical tooltip-content="툴팁의 기본 설정입니다">
            tooltip-horizontal <i class="svg-icon ico-angle right"></i>
          </KrdsTooltip>
          <KrdsTooltip vertical type="icon" tooltip-content="아이콘 버튼에 제공되는 툴팁">
            <span class="sr-only">도움말</span>
            <i class="svg-icon ico-help"></i>
          </KrdsTooltip>
          <KrdsTooltip vertical type="button" tooltip-content="버튼에 제공되는 툴팁">
            도움말
          </KrdsTooltip>
        </div>
      </div>
    `
  })
}

export const TooltipBox: Story = {
  name: 'tooltipBox',
  render: () => ({
    components: { KrdsTooltip },
    template: `
      <div style="height: 500px;">
        <div style="display: flex; align-items: flex-start; gap: 10px">
          <KrdsTooltip box tooltip-content="툴팁의 기본 설정입니다">
            tooltip-horizontal <i class="svg-icon ico-angle right"></i>
          </KrdsTooltip>
          <KrdsTooltip box type="icon" tooltip-content="아이콘 버튼에 제공되는 툴팁">
            <span class="sr-only">도움말</span>
            <i class="svg-icon ico-help"></i>
          </KrdsTooltip>
          <KrdsTooltip box type="button" tooltip-content="버튼에 제공되는 툴팁">
            도움말
          </KrdsTooltip>
        </div>
      </div>
    `
  })
}
