import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsLayout from './KrdsLayout'
import { KrdsMasthead } from '../KrdsMasthead'
import { KrdsFooter } from '../KrdsFooter'
import { KrdsIdentifier } from '../KrdsIdentifier'

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
    components: { KrdsLayout, KrdsMasthead, KrdsFooter, KrdsIdentifier },
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
                <KrdsButton text size="medium">찾아오시는 길 <i class="svg-icon ico-angle right"></i></KrdsButton>
                <KrdsButton text size="medium">이용안내 <i class="svg-icon ico-angle right"></i></KrdsButton>
                <KrdsButton text size="medium">직원검색 <i class="svg-icon ico-angle right"></i></KrdsButton>
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
      </KrdsLayout>
    `
  })
}
