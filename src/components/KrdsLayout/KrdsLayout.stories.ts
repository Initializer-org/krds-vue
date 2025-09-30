import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsLayout from './KrdsLayout'
import { KrdsMasthead } from '../KrdsMasthead'
import { KrdsFooter } from '../KrdsFooter'
import { KrdsIdentifier } from '../KrdsIdentifier'
import { KrdsHeader } from '../KrdsHeader'
import KrdsSkipLink from '../KrdsSkipLink/KrdsSkipLink'
import KrdsBreadcrumb from '../KrdsBreadcrumb/KrdsBreadcrumb.vue'
import { KrdsButton } from '../KrdsButton'

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
    components: { KrdsLayout, KrdsMasthead, KrdsHeader, KrdsFooter, KrdsIdentifier, KrdsSkipLink, KrdsBreadcrumb, KrdsButton },
    template: `
      <KrdsLayout>
        <KrdsSkipLink href="#container">본문 바로가기</KrdsSkipLink>
        <KrdsMasthead>이 누리집은 대한민국 공식 전자정부 누리집입니다.</KrdsMasthead>
        <KrdsHeader v-bind="args">
          <template #utility>
            <ul class="utility-list">
              <li>
                <a href="#" class="krds-btn small text" target="_blank" title="새 창 열기">
                  메뉴명 <i class="svg-icon ico-go"></i>
                </a>
              </li>
              <li>
                <div class="krds-drop-wrap">
                  <button type="button" class="krds-btn small text drop-btn">
                    메뉴명 <i class="svg-icon ico-toggle"></i>
                  </button>
                  <div class="drop-menu">
                    <div class="drop-in">
                      <ul class="drop-list">
                        <li><a href="#" class="item-link">메뉴명</a></li>
                        <li><a href="#" class="item-link">메뉴명</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </template>

          <template #branding>
            <h2 class="logo">
              <a href="#">
                <span class="sr-only">KRDS - Korea Design System</span>
              </a>
            </h2>
            <div class="header-actions">
              <button type="button" class="btn-navi sch" title="통합검색 레이어">통합검색</button>
              <a href="#" class="btn-navi login">로그인</a>
              <button type="button" class="btn-navi join">회원가입</button>
              <button type="button" class="btn-navi all" aria-controls="mobile-nav">전체메뉴</button>
            </div>
          </template>

          <template #navigation>
            <ul class="gnb-menu">
              <li>
                <button type="button" class="gnb-main-trigger" data-trigger="gnb">1Depth</button>
              </li>
              <li>
                <button type="button" class="gnb-main-trigger" data-trigger="gnb">1Depth</button>
              </li>
              <li>
                <a href="#" class="gnb-main-trigger is-link" data-trigger="gnb">링크(anchor)</a>
              </li>
            </ul>
          </template>
        </KrdsHeader>
        <div id="container">
          <div class="inner in-between">
            <nav class="krds-side-navigation">
              <h2 class="lnb-tit">1Depth-title</h2>
              <!-- lnb-list -->
              <ul class="lnb-list">
                <li class="lnb-item">
                  <button type="button" class="lnb-btn lnb-toggle" aria-controls="lnbmenu-e7xeix1" aria-expanded="false">2Depth-menu</button>
                  <!-- lnb-submenu -->
                  <div class="lnb-submenu">
                    <ul id="lnbmenu-e7xeix1">
                      <li class="lnb-subitem">
                        <button type="button" class="lnb-btn lnb-toggle-popup" aria-controls="lnbmenu-o4g3re9" aria-expanded="false" aria-haspopup="true">3Depth-menu</button>
                        <!-- lnb-submenu-lv2 -->
                        <div class="lnb-submenu-lv2" id="lnbmenu-o4g3re9">
                          <button type="button" class="lnb-btn-tit">3Depth-title</button>
                          <ul>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                          </ul>
                        </div>
                        <!-- //lnb-submenu-lv2 -->
                      </li>
                      <li class="lnb-subitem"><a href="#" class="lnb-btn lnb-link">3Depth-link</a></li>
                      <li class="lnb-subitem"><a href="./sample_sub_02.html" class="lnb-btn lnb-link">3Depth-link</a></li>
                    </ul>
                  </div>
                  <!-- //lnb-submenu -->
                </li>
                <li class="lnb-item">
                  <button type="button" class="lnb-btn lnb-toggle" aria-controls="lnbmenu-jxx21y4" aria-expanded="false">2Depth-menu</button>
                  <!-- lnb-submenu -->
                  <div class="lnb-submenu">
                    <ul id="lnbmenu-jxx21y4">
                      <li class="lnb-subitem">
                        <button type="button" class="lnb-btn lnb-toggle-popup" aria-controls="lnbmenu-j6hmfzo" aria-expanded="false" aria-haspopup="true">3Depth-menu</button>
                        <!-- lnb-submenu-lv2 -->
                        <div class="lnb-submenu-lv2" id="lnbmenu-j6hmfzo">
                          <button type="button" class="lnb-btn-tit">3Depth-title</button>
                          <ul>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                          </ul>
                        </div>
                        <!-- //lnb-submenu-lv2 -->
                      </li>
                      <li class="lnb-subitem"><a href="#" class="lnb-btn lnb-link">3Depth-link</a></li>
                      <li class="lnb-subitem"><a href="#" class="lnb-btn lnb-link">3Depth-link</a></li>
                    </ul>
                  </div>
                  <!-- //lnb-submenu -->
                </li>
                <li class="lnb-item">
                  <button type="button" class="lnb-btn lnb-toggle" aria-controls="lnbmenu-7fsvaio" aria-expanded="false">2Depth-menu</button>
                  <!-- lnb-submenu -->
                  <div class="lnb-submenu">
                    <ul id="lnbmenu-7fsvaio">
                      <li class="lnb-subitem">
                        <button type="button" class="lnb-btn lnb-toggle-popup" aria-controls="lnbmenu-uk7pakf" aria-expanded="false" aria-haspopup="true">3Depth-menu</button>
                        <!-- lnb-submenu-lv2 -->
                        <div class="lnb-submenu-lv2" id="lnbmenu-uk7pakf">
                          <button type="button" class="lnb-btn-tit">3Depth-title</button>
                          <ul>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                            <li><a href="#" class="lnb-btn">4Depth</a></li>
                          </ul>
                        </div>
                        <!-- //lnb-submenu-lv2 -->
                      </li>
                      <li class="lnb-subitem"><a href="#" class="lnb-btn lnb-link">3Depth-link</a></li>
                      <li class="lnb-subitem"><a href="#" class="lnb-btn lnb-link">3Depth-link</a></li>
                    </ul>
                  </div>
                  <!-- //lnb-submenu -->
                </li>
              </ul>
              <!-- //lnb-list -->
            </nav>
            <div class="contents">
              <KrdsBreadcrumb :items="[{text: '홈'}, {text: '컴포넌트'}]" />
              <div class="page-title-wrap" data-type="responsive">
                <h1 class="h-tit">page title</h1>
                <div class="krds-drop-wrap h-tit-drop">
                  <button type="button" class="h-tit drop-btn" aria-expanded="false">page title</button>
                  <div class="drop-menu" style="display: none;">
                    <div class="drop-in">
                      <ul class="drop-list">
                        <li><a href="#" class="item-link">서비스 소개<span class="sr-only"></span></a></li>
                        <li><a href="#" class="item-link">국내에서 외국발간자료 신청<span class="sr-only"></span></a></li>
                        <li><a href="#" class="item-link">해외에서 국내발간자료 신청<span class="sr-only"></span></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
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
            <span v-sr-only>KRDS - Korea Design System</span>
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
