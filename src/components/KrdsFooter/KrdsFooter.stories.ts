import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsFooter from './KrdsFooter'
import { KrdsIdentifier } from '../KrdsIdentifier'
import { KrdsButton } from '../KrdsButton'

const meta: Meta<typeof KrdsFooter> = {
  title: 'Components/Identity/KrdsFooter',
  component: KrdsFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '푸터는 화면을 구성하는 가장 마지막 요소로 헤더와 본문에서 원하는 정보를 찾지 못하였거나 사이트 구조 탐색 중에 길을 잃은 사용자들이 대면하게 되는 정보이다. 따라서 푸터에는 사용자가 서비스를 탐색할 수 있는 추가적인 수단, 문제를 해결하는 데 참고할 수 있는 유용한 링크가 제공되어야 한다.'
      }
    }
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Footer 요소의 ID'
    }
  },
  args: {
    id: 'krds-footer'
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 Footer (전체 콘텐츠)
export const Default: Story = {
  render: args => ({
    components: { KrdsFooter, KrdsIdentifier, KrdsButton },
    setup() {
      return { args }
    },
    template: `
      <KrdsFooter v-bind="args">
        <template #top>
          <button type="button" class="link" title="관련 사이트 레이어">related_site</button>
          <button type="button" class="link" title="관련 사이트 레이어">related_site</button>
          <button type="button" class="link" title="관련 사이트 레이어">related_site</button>
          <button type="button" class="link" title="관련 사이트 레이어">related_site</button>
        </template>
        
        <template #logo>
          <span class="sr-only">KRDS - Korea Design System</span>
        </template>
        
        <template #content>
          <div class="f-info">
            <p class="info-addr">(26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단</p>
            <ul class="info-cs">
              <li><strong class="strong">대표전화 1577-1000</strong><span class="span">(유료, 평일 09시~18시)</span></li>
              <li><strong class="strong">해외이용 82-33-811-2001</strong><span class="span">(유료, 평일 09시~18시)</span></li>
            </ul>
          </div>
          
          <div class="f-link">
            <div class="link-go">
              <KrdsButton class="text" size="medium">찾아오시는 길 <i class="svg-icon ico-angle right"></i></KrdsButton>
              <KrdsButton class="text" size="medium">이용안내 <i class="svg-icon ico-angle right"></i></KrdsButton>
              <KrdsButton class="text" size="medium">직원검색 <i class="svg-icon ico-angle right"></i></KrdsButton>
            </div>
            <div class="link-sns">
              <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                <span class="sr-only">인스타그램</span>
                <i class="svg-icon ico-instagram"></i>
              </a>
              <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                <span class="sr-only">유튜브</span>
                <i class="svg-icon ico-youtube"></i>
              </a>
              <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                <span class="sr-only">X</span>
                <i class="svg-icon ico-sns-x"></i>
              </a>
              <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                <span class="sr-only">페이스북</span>
                <i class="svg-icon ico-facebook"></i>
              </a>
              <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                <span class="sr-only">블로그</span>
                <i class="svg-icon ico-blog"></i>
              </a>
            </div>
          </div>
        </template>
        
        <template #bottom>
          <div class="f-btm-text">
            <div class="f-menu">
              <a href="#" class="point">개인정보처리방침</a>
              <a href="#">저작권 정책</a>
              <a href="#">웹 접근성 품질인증 마크 획득</a>
            </div>
            <p class="f-copy">© 2023 National Health Insurance Service. All rights reserved.</p>
          </div>
          <KrdsIdentifier>이 누리집은 보건복지부 누리집입니다.</KrdsIdentifier>
        </template>
      </KrdsFooter>
    `
  })
}
