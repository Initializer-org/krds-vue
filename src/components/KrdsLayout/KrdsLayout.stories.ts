import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsLayout from './KrdsLayout'
import { KrdsMasthead } from '../KrdsMasthead'

const meta: Meta<typeof KrdsLayout> = {
  title: 'Components/ETC/KrdsLayout',
  component: KrdsLayout,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: '레이아웃 컨테이너 ID',
      defaultValue: 'wrap'
    },
    enableScrollDetection: {
      control: 'boolean',
      description: '스크롤 감지 기능 활성화 여부',
      defaultValue: true
    }
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `웹사이트의 전체 레이아웃 구조를 제공하는 컴포넌트입니다. 스크롤 방향에 따라 자동으로 scroll-up/scroll-down 클래스를 추가합니다.`
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 기본 레이아웃
 */
export const Default: Story = {
  render: () => ({
    components: { KrdsLayout, KrdsMasthead },
    template: `
      <KrdsLayout>
        <KrdsSkipLink href="#container">본문 바로가기</KrdsSkipLink>
        <KrdsMasthead>이 누리집은 대한민국 공식 전자정부 누리집입니다.</KrdsMasthead>
        <div id="container">
          <div class="inner in-between">
            <div class="contents">
              <KrdsBreadcrumb :items="[{text: '홈'}, {text: '컴포넌트'}]" />
            </div>
          </div> 
        </div>
      </KrdsLayout>
    `
  })
}
