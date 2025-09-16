import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsContextualHelp from './KrdsContextualHelp.vue'

const meta: Meta<typeof KrdsContextualHelp> = {
  title: 'Components/Help/KrdsContextualHelp',
  component: KrdsContextualHelp,
  parameters: {
    docs: {
      description: {
        component:
          '컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에 표시된다.'
      }
    }
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top left', 'top center', 'top right', 'bottom left', 'bottom center', 'bottom right'],
      description: '툴팁의 생성 위치'
    },
    helpIcon: {
      control: 'boolean',
      description: '물음표 아이콘 사용 여부'
    },
    tooltipTitle: {
      control: 'text',
      description: '툴팁 타이틀'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {},
  render: args => ({
    components: { KrdsContextualHelp },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 500px">
        <div style="display: flex; align-items: center; gap: 8px">
          <p>예시이미지(상단 왼쪽)</p>
          <KrdsContextualHelp v-bind="args">
            <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
              표시된다.</p>
            <div class="btn-wrap">
              <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
            </div>
          </KrdsContextualHelp>
        </div>
      </div>
    `
  })
}

export const Positions: Story = {
  name: '위치',
  args: {},
  render: () => ({
    components: { KrdsContextualHelp },
    template: `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 800px">
        <div style="display: flex; align-items: center; gap: 8px">
          <p>예시이미지(상단 왼쪽)</p>
          <KrdsContextualHelp title="도움말 제목">
            <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
              표시된다.</p>
            <div class="btn-wrap">
              <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
            </div>
          </KrdsContextualHelp>
        </div>
        <div style="display: flex; align-items: center; gap: 8px">
          <p>예시이미지(상단 중앙)</p>
          <KrdsContextualHelp title="도움말 제목" position="top center">
            <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
              표시된다.</p>
            <div class="btn-wrap">
              <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
            </div>
          </KrdsContextualHelp>
        </div>
        <div style="display: flex; align-items: center; gap: 8px">
          <p>예시이미지(상단 오른쪽)</p>
          <KrdsContextualHelp title="도움말 제목" position="top right">
            <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
              표시된다.</p>
            <div class="btn-wrap">
              <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
            </div>
          </KrdsContextualHelp>
        </div>
        <div style="display: flex; align-items: center; gap: 8px">
          <p>예시이미지(하단 왼쪽)</p>
          <KrdsContextualHelp title="도움말 제목" position="bottom left">
            <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
              표시된다.</p>
            <div class="btn-wrap">
              <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
            </div>
          </KrdsContextualHelp>
        </div>
        <div style="display: flex; align-items: center; gap: 8px">
          <p>예시이미지(하단 중앙)</p>
          <KrdsContextualHelp title="도움말 제목" position="bottom center">
            <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
              표시된다.</p>
            <div class="btn-wrap">
              <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
            </div>
          </KrdsContextualHelp>
        </div>
        <div style="display: flex; align-items: center; gap: 8px">
          <p>예시이미지(하단 오른쪽)</p>
          <KrdsContextualHelp title="도움말 제목" position="bottom right">
            <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
              표시된다.</p>
            <div class="btn-wrap">
              <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
            </div>
          </KrdsContextualHelp>
        </div>
      </div>
    `
  })
}

export const HelpIcon: Story = {
  name: '도움말 아이콘',
  args: {},
  render: () => ({
    components: { KrdsContextualHelp },
    template: `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 500px">
        <div style="display: flex; align-items: center; gap: 8px">
          <p>예시이미지(상단 왼쪽)</p>
          <KrdsContextualHelp title="도움말 제목" help-icon>
            <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
              표시된다.</p>
            <div class="btn-wrap">
              <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
            </div>
          </KrdsContextualHelp>
        </div>
      </div>
    `
  })
}
