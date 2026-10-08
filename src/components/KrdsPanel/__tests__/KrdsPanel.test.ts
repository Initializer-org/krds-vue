import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

// 원본 KRDS 마크업(li[role=tab] > button)을 따르므로 탭 요소만 제외한다
const a11yRules = [{ id: 'nested-interactive', selector: '*:not([role="tab"])' }]

// 도움/따라하기 탭 공통 콘텐츠 (KrdsTabs 패널 슬롯에 주입)
const helpContent = `
  <h3 class="sr-only">도움</h3>
  <div class="help-conts-area-inner">
    <!-- 도움말 -->
    <div class="conts-area help-conts">
      <div class="conts-wrap">
        <h4 class="help-title">
          전자문서지갑
          <span class="krds-btn medium icon">
            <span class="sr-only">도움말</span>
            <i class="svg-icon ico-help"></i>
          </span>
        </h4>
        <div class="conts-desc">
          <p>
            전자문서지갑에서는 전자증명서 출력기능을 제공하지 않으며, 스마트폰 화면을 캡쳐하여 사용할 수 없습니다. 다만, 발급받은 전자증명서를
            열람용으로 다운로드할 수는 있습니다.
          </p>
        </div>
        <ul class="link-list">
          <li>
            <a href="#" target="_blank" title="새 창 열림" class="krds-btn xsmall link basic">
              안드로이드 애플리케이션 다운로드
              <i class="svg-icon ico-go"></i>
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="새 창 열림" class="krds-btn xsmall link basic">
              iOS애플리케이션 다운로드
              <i class="svg-icon ico-go"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="conts-area related-service">
      <div class="conts-wrap">
        <h4 class="help-title">관련서비스/민원</h4>
        <ul class="link-list">
          <li>
            <a href="#" class="krds-btn xsmall link basic">
              영문 주민등록표등본
              <i class="svg-icon ico-angle right"></i>
            </a>
          </li>
          <li>
            <a href="#" class="krds-btn xsmall link basic">
              영문 주민등록표초본
              <i class="svg-icon ico-angle right"></i>
            </a>
          </li>
          <li>
            <a href="#" class="krds-btn xsmall link basic">
              주민등록표등본
              <i class="svg-icon ico-angle right"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="conts-wrap">
        <h4 class="help-title">기타 문의/도움말</h4>
        <ul class="link-list">
          <li>
            <a href="#" class="krds-btn xsmall link basic">
              <i class="svg-icon ico-call"></i>
              민원신청 관련 문의 전화 번호 찾기
            </a>
          </li>
          <li>
            <a href="#" class="krds-btn xsmall link basic">
              <i class="svg-icon ico-faq"></i>
              자주 묻는 질문 확인하기
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>`

const tutorialContent = `
  <h3 class="sr-only">따라하기</h3>
  <div class="help-conts-area-inner">
    <div class="conts-area">
      <h4 class="help-title">
        <a href="#" title="이전으로 돌아가기">
          이사 전 살던 곳 정보 입력하기
        </a>
      </h4>
      <ul class="coach-help-process">
        <li>
          <h4 class="tit current">Task 1: 이사 전에 살던 곳 주소 확인</h4>
          <div class="krds-disclosure conts-expand-area">
            <button type="button" class="btn-conts-expand">전체 2단계</button>
            <div class="expand-wrap">
              <div class="expand-in">
                <ul class="krds-info-list decimal">
                  <li>단계1 : 주소조회</li>
                  <li>단계2 : 조회 결과 확인</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li>
          <h4 class="tit">Task 2: 이사 갈 가족 구성원 선택하기</h4>
          <div class="krds-disclosure conts-expand-area">
            <button type="button" class="btn-conts-expand">전체 1단계</button>
            <div class="expand-wrap">
              <div class="expand-in">
                <ul class="krds-info-list decimal">
                  <li>단계1 : 주소조회</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="help-panel-action">
      <button type="button" class="krds-btn medium secondary coach-btn-stop">그만 따라하기</button>
    </div>
  </div>`

const tabs = [
  { id: 'help', label: '도움' },
  { id: 'tutorial', label: '따라하기' }
]

const openPanel = async (container: Element) => {
  await userEvent.click(container.querySelector('.btn-help-exec') as HTMLElement)
  await waitFor(() => {
    expect(container.querySelector('.krds-help-panel.expand')).toBeTruthy()
  })
}

describe('KrdsPanel', () => {
  it('기본: 열고 닫기', async () => {
    const { container } = render({
      setup: () => ({ open: ref(false) }),
      template: `
        <div style="width: 100%; height: 1000px;">
          <KrdsPanel v-model="open">
          </KrdsPanel>
        </div>
      `
    })
    await openPanel(container)

    await userEvent.click(container.querySelector('.btn-help-panel.fold') as HTMLElement)
    await waitFor(() => {
      expect(container.querySelector('.krds-help-panel.expand')).toBeFalsy()
    })
    await expectNoA11yViolations(a11yRules)
  })

  it('도움 패널: 패널 내부 탭 전환', async () => {
    const { container } = render({
      setup: () => ({ open: ref(false), tabs }),
      template: `
        <div style="width: 100%; height: 1000px;">
          <KrdsPanel v-model="open">
            <KrdsTabs :tabs="tabs">
              <template #help>${helpContent}</template>
              <template #tutorial>${tutorialContent}</template>
            </KrdsTabs>
          </KrdsPanel>
        </div>
      `
    })
    await openPanel(container)

    // 패널 내부 탭 전환 (도움 → 따라하기)
    const [helpTab, tutorialTab] = Array.from(container.querySelectorAll('[role="tab"]'))
    expect(helpTab).toHaveAttribute('aria-selected', 'true')

    await userEvent.click(tutorialTab.querySelector('button')!)
    expect(tutorialTab).toHaveAttribute('aria-selected', 'true')
    expect(container.querySelector('.coach-help-process')?.closest('.tab-conts')).toHaveClass('active')
    await expectNoA11yViolations(a11yRules)
  })

  it('따라하기 패널', async () => {
    render({
      setup: () => ({ open: ref(false), activeTab: ref('tutorial'), tabs }),
      template: `
        <div style="width: 100%; height: 1000px">
          <KrdsPanel v-model="open">
            <KrdsTabs :tabs="tabs" v-model="activeTab">
              <template #help>${helpContent}</template>
              <template #tutorial>${tutorialContent}</template>
            </KrdsTabs>
            <button type="button" class="krds-btn small tertiary btn-help-panel fold">
              <span class="sr-only">도움말</span> 접어두기 <i class="svg-icon ico-angle right"></i>
            </button>
          </KrdsPanel>
        </div>
      `
    })
    await expectNoA11yViolations(a11yRules)
  })

  it('공식 배너·헤더가 보이면 그 높이만큼 버튼과 패널 내용을 내리고, 헤더가 숨으면 원위치', async () => {
    const { container } = render({
      template: `
        <div id="wrap">
          <div id="krds-masthead" style="height: 40px"></div>
          <div id="krds-header"><div class="header-in" style="height: 100px"></div></div>
          <KrdsPanel />
          <div style="height: 3000px"></div>
        </div>
      `
    })
    const expand = screen.getByRole('button', { name: '도움말' })
    const wrap = container.querySelector('.help-panel-wrap') as HTMLElement
    await waitFor(() => expect(expand.style.marginTop).toBe('140px'))
    expect(wrap.style.paddingTop).toBe('140px')
    // 콘텐츠 내 탐색이 버튼 아래에 서도록 버튼 아래쪽 끝(top 4rem + 140px + 버튼 높이)을 알린다
    const bottom = () => parseFloat(document.documentElement.style.getPropertyValue('--krds-help-panel--button-bottom'))
    expect(bottom()).toBe(40 + 140 + expand.offsetHeight)

    // 공식 배너가 지나가고 헤더가 숨은 상태(scroll-down)
    container.querySelector('#wrap')!.classList.add('scroll-down')
    window.scrollTo({ top: 500, behavior: 'instant' })
    await waitFor(() => expect(expand.style.marginTop).toBe('0px'))
  })
})
