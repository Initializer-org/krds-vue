import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { page } from 'vitest/browser'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'
import type { MainMenuItem } from '../KrdsMainMenu'

/** PC 메가 메뉴 데이터 (2depth 컬럼 + 마지막 뎁스) */
const pcItems: MainMenuItem[] = [
  {
    text: '정보서비스',
    subItems: [
      {
        text: '민원신청',
        title: '민원신청',
        titleLink: { href: '#', text: '바로가기' },
        layout: 'between',
        banner: true,
        items: [
          { text: '증명서 발급', href: '#' },
          { text: '전입신고', href: '#' },
          { text: '여권 재발급', href: '#' },
          { text: '주민등록 등본', href: '#', selected: true }
        ]
      },
      {
        text: '생활지원',
        title: '생활지원',
        items: [
          { text: '주거 지원', href: '#' },
          { text: '교육 지원', href: '#' },
          { text: '의료 지원', href: '#' }
        ]
      },
      {
        text: '고용정보',
        title: '고용정보',
        items: [
          {
            text: '채용 공고',
            href: '#',
            description: '메뉴명과 메뉴에 관한 간략한 설명이 표시되는 스타일입니다.',
            external: true
          },
          {
            text: '직업 훈련',
            href: '#',
            description: '메뉴명과 메뉴에 관한 간략한 설명이 표시되는 스타일입니다.',
            selected: true
          }
        ]
      },
      { text: '통합검색 바로가기', href: '#' },
      { text: '외부 서비스', href: 'https://www.krds.go.kr', external: true }
    ]
  },
  {
    text: '정책정보',
    subItems: [
      {
        text: '정책자료',
        title: '정책자료',
        layout: 'between',
        items: [
          { text: '보도자료', href: '#' },
          { text: '입법예고', href: '#' },
          { text: '연구보고서', href: '#' }
        ]
      },
      {
        text: '통계정보',
        title: '통계정보',
        items: [
          { text: '국가통계', href: '#' },
          { text: '지역통계', href: '#' }
        ]
      }
    ]
  },
  {
    text: '알림소식',
    title: '알림소식',
    layout: 'between',
    items: [
      { text: '공지사항', href: '#' },
      { text: '보도자료', href: '#' },
      { text: '행사안내', href: '#' },
      { text: '채용정보', href: '#' },
      { text: '입찰공고', href: '#' },
      { text: '고시공고', href: '#' }
    ]
  },
  { text: '기관소개', href: '#' }
]

/** 모바일 드로어 데이터 (3depth, 4depth 포함) */
const mobileItems: MainMenuItem[] = [
  {
    text: '정보서비스',
    subItems: [
      { text: '민원신청', href: '#' },
      { text: '생활지원', href: '#', selected: true },
      {
        text: '고용정보',
        items: [
          { text: '채용 공고', href: '#' },
          {
            text: '직업 훈련',
            href: '#',
            panelTitle: '직업 훈련',
            items: [
              { text: '국비 지원 과정', href: '#' },
              { text: '재직자 과정', href: '#' },
              { text: '온라인 과정', href: '#' }
            ]
          },
          { text: '고용 통계', href: '#' }
        ]
      }
    ]
  },
  {
    text: '정책정보',
    subItems: [
      { text: '정책자료', href: '#' },
      { text: '통계정보', href: '#' }
    ]
  },
  {
    text: '알림소식',
    subItems: [
      { text: '공지사항', href: '#' },
      { text: '보도자료', href: '#' }
    ]
  },
  {
    text: '기관소개',
    subItems: [
      { text: '인사말', href: '#' },
      { text: '조직도', href: '#' }
    ]
  }
]

/** aria-controls로 연결된 요소 */
const controlledBy = (el: Element) => document.getElementById(el.getAttribute('aria-controls') ?? '')

/** 스토리 decorator와 같이 PC 메가 메뉴를 헤더(#krds-header)로 감싼다 (배경 딤 위에 메뉴 표시) */
const inHeader = (template: string) => `<div><header id="krds-header">${template}</header></div>`

const mobileArgs = { items: mobileItems, variant: 'mobile', open: false }

/** 모바일 드로어 메뉴 스토리 */
const mobileMenu = {
  setup: () => ({ args: mobileArgs, isOpen: ref(false) }),
  template: `
    <div>
      <button
        type="button"
        class="krds-btn medium primary"
        :aria-controls="args.mobileId || 'mobile-nav'"
        :aria-expanded="String(isOpen)"
        @click="isOpen = true"
      >
        전체메뉴 열기
      </button>
      <KrdsMainMenu v-bind="args" v-model:open="isOpen">
        <template #header>
          <div class="gnb-login">
            <button type="button" class="krds-btn large text">로그인을 해주세요</button>
          </div>
        </template>
        <template #bottom>
          <a href="#" class="krds-btn small text">개인정보처리방침</a>
        </template>
      </KrdsMainMenu>
    </div>
  `
}

describe('KrdsMainMenu', () => {
  it('PC 메가 메뉴', async () => {
    render({
      setup: () => ({ args: { items: pcItems, variant: 'pc' } }),
      template: inHeader(`
        <KrdsMainMenu v-bind="args">
          <template #banner>
            <span class="krds-badge bg-secondary">신규 서비스</span>
            <button type="button" class="krds-btn medium text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
          </template>
        </KrdsMainMenu>
      `)
    })
    await expectNoA11yViolations()
  })

  it('PC 2depth 없는 메뉴', async () => {
    render({
      setup: () => ({
        args: { items: [pcItems[2], pcItems[3]], variant: 'pc' }
      }),
      template: inHeader('<KrdsMainMenu v-bind="args" />')
    })
    await expectNoA11yViolations()
  })

  it('모바일 드로어 메뉴', async () => {
    await page.viewport(414, 896)
    render(mobileMenu)
    await expectNoA11yViolations()
  })

  it('PC 메가 메뉴 동작: 패널 토글, 방향키 이동, ESC·배경 클릭으로 닫힘', async () => {
    render({
      setup() {
        const args = { items: pcItems, variant: 'pc' }
        // menu-toggle 이벤트로 추적한 열린 패널 인덱스
        const openPanels = ref<number[]>([])
        const onMenuToggle = (index: number, expanded: boolean) => {
          openPanels.value = expanded ? [...openPanels.value, index] : openPanels.value.filter(i => i !== index)
        }
        return { args, openPanels, onMenuToggle }
      },
      template: inHeader(`
        <div>
          <KrdsMainMenu v-bind="args" @menu-toggle="onMenuToggle">
            <template #banner>
              <span class="krds-badge bg-secondary">신규 서비스</span>
              <button type="button" class="krds-btn medium text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
            </template>
          </KrdsMainMenu>
          <p data-testid="open-panels">열린 패널: {{ openPanels.join(', ') || '없음' }}</p>
        </div>
      `)
    })
    const trigger = screen.getByRole('button', { name: '정보서비스' })
    const policyTrigger = screen.getByRole('button', { name: '정책정보' })
    const noticeTrigger = screen.getByRole('button', { name: '알림소식' })
    const aboutLink = screen.getByRole('link', { name: '기관소개' })
    const openPanels = screen.getByTestId('open-panels')
    const panel = controlledBy(trigger)

    // 초기 상태는 닫힘, 하위 메뉴 없는 1depth는 단순 링크
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-haspopup', 'true')
    expect(panel).not.toBeVisible()
    expect(aboutLink).not.toHaveAttribute('aria-expanded')
    expect(aboutLink).not.toHaveAttribute('aria-controls')

    // 메인 트리거 클릭 → 메가 패널 열림 + backdrop
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveClass('active')
    expect(panel).toBeVisible()
    expect(document.body).toHaveClass('is-gnb-web')
    expect(document.querySelector('.gnb-backdrop')).toBeInTheDocument()
    expect(openPanels).toHaveTextContent('열린 패널: 0')

    // 링크가 아닌 첫 번째 2depth가 기본 활성화되어 서브 패널이 노출됨
    const applyTrigger = screen.getByRole('button', { name: '민원신청' })
    const supportTrigger = screen.getByRole('button', { name: '생활지원' })
    const jobTrigger = screen.getByRole('button', { name: '고용정보' })
    expect(applyTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(controlledBy(applyTrigger)).toBeVisible()
    expect(supportTrigger).toHaveAttribute('aria-expanded', 'false')
    expect(controlledBy(supportTrigger)).not.toBeVisible()

    // 하위 항목 없는 2depth는 바로가기 링크
    const searchLink = screen.getByRole('link', { name: '통합검색 바로가기' })
    expect(searchLink).not.toHaveAttribute('aria-expanded')
    expect(screen.getByRole('link', { name: '외부 서비스' })).toHaveAttribute('title', '새 창 열림')

    // 다른 2depth 선택 → 활성 서브 패널 전환
    await userEvent.click(supportTrigger)
    expect(supportTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(applyTrigger).toHaveAttribute('aria-expanded', 'false')
    expect(controlledBy(supportTrigger)).toBeVisible()
    expect(controlledBy(applyTrigger)).not.toBeVisible()

    // 2depth 사이 방향키 이동 (포커스만 이동, 활성 상태 유지)
    await userEvent.keyboard('{ArrowDown}')
    expect(jobTrigger).toHaveFocus()
    await userEvent.keyboard('{ArrowRight}')
    expect(searchLink).toHaveFocus()
    await userEvent.keyboard('{ArrowUp}')
    expect(jobTrigger).toHaveFocus()
    await userEvent.keyboard('{ArrowLeft}')
    expect(supportTrigger).toHaveFocus()
    expect(jobTrigger).toHaveAttribute('aria-expanded', 'false')

    // 설명형 링크도 selected면 강조
    await userEvent.click(jobTrigger)
    expect(screen.getByRole('link', { name: '직업 훈련' })).toHaveClass('active')

    // ESC로 닫으면 1depth 트리거로 포커스 복귀
    await userEvent.keyboard('{Escape}')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveFocus()
    expect(panel).not.toBeVisible()
    expect(document.body).not.toHaveClass('is-gnb-web')
    expect(document.querySelector('.gnb-backdrop')).not.toBeInTheDocument()
    expect(openPanels).toHaveTextContent('열린 패널: 없음')

    // 1depth 방향키·Home·End 이동
    await userEvent.keyboard('{ArrowRight}')
    expect(policyTrigger).toHaveFocus()
    await userEvent.keyboard('{ArrowDown}')
    expect(noticeTrigger).toHaveFocus()
    await userEvent.keyboard('{ArrowLeft}')
    expect(policyTrigger).toHaveFocus()
    await userEvent.keyboard('{ArrowUp}')
    expect(trigger).toHaveFocus()
    await userEvent.keyboard('{End}')
    expect(aboutLink).toHaveFocus()
    await userEvent.keyboard('{Home}')
    expect(trigger).toHaveFocus()

    // Enter로 열고 다시 Enter로 닫기
    await userEvent.keyboard('{Enter}')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await userEvent.keyboard('{Enter}')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // 열린 상태에서 다른 1depth 클릭 → 패널 전환
    await userEvent.click(trigger)
    await userEvent.click(policyTrigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(panel).not.toBeVisible()
    expect(policyTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(controlledBy(policyTrigger)).toBeVisible()
    // 이전 패널의 닫힘도 menu-toggle로 전달
    expect(openPanels).toHaveTextContent('열린 패널: 1')

    // backdrop(메뉴 바깥) 클릭 시 닫힘
    await userEvent.click(document.querySelector('.gnb-backdrop') as HTMLElement)
    expect(policyTrigger).toHaveAttribute('aria-expanded', 'false')
    expect(document.body).not.toHaveClass('is-gnb-web')
    expect(openPanels).toHaveTextContent('열린 패널: 없음')
    await expectNoA11yViolations()
  })

  it('PC 2depth 없는 메뉴 동작: Tab으로 메뉴를 벗어나면 닫힘', async () => {
    render({
      setup: () => ({
        args: { items: [pcItems[2], pcItems[3]], variant: 'pc' }
      }),
      template: inHeader(`
        <div>
          <KrdsMainMenu v-bind="args" />
          <a href="#" class="krds-btn small text">본문 링크</a>
        </div>
      `)
    })
    const trigger = screen.getByRole('button', { name: '알림소식' })
    const panel = controlledBy(trigger)

    // single-list 패널도 aria-controls로 연결되어 토글
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(panel).toBeVisible()

    // Tab으로 패널 내부를 이동하는 동안은 열림 유지
    await userEvent.keyboard('{Tab}')
    expect(screen.getByRole('link', { name: '공지사항' })).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // 메뉴 안의 다른 1depth로 이동해도 열림 유지
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    expect(trigger).toHaveFocus()
    await userEvent.keyboard('{End}')
    expect(screen.getByRole('link', { name: '기관소개' })).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // Tab으로 메뉴를 벗어나면 닫힘
    await userEvent.keyboard('{Tab}')
    expect(screen.getByRole('link', { name: '본문 링크' })).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(panel).not.toBeVisible()
    await expectNoA11yViolations()
  })

  it('모바일 드로어 메뉴 동작: 포커스 트랩, 3·4depth, ESC·닫기 버튼', async () => {
    await page.viewport(414, 896)
    const { container } = render(mobileMenu)
    const openButton = screen.getByRole('button', { name: '전체메뉴 열기' })
    const drawer = container.querySelector('#mobile-nav') as HTMLElement
    const closeButton = drawer.querySelector('#close-nav') as HTMLElement
    const gnbWrap = drawer.querySelector('.gnb-wrap') as HTMLElement

    // 초기 상태는 숨김
    expect(drawer).not.toBeVisible()

    await userEvent.click(openButton)
    await waitFor(() => expect(drawer).toBeVisible())
    expect(drawer).toHaveClass('is-open')
    expect(document.body).toHaveClass('is-gnb-mobile')
    expect(openButton).toHaveAttribute('aria-expanded', 'true')

    // 열리면 드로어로 포커스 이동
    await waitFor(() => expect(gnbWrap).toHaveFocus())

    // 포커스 트랩: 처음과 끝에서 순환
    const loginButton = screen.getByRole('button', {
      name: '로그인을 해주세요'
    })
    await userEvent.keyboard('{Tab}')
    expect(loginButton).toHaveFocus()
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    expect(closeButton).toHaveFocus()
    await userEvent.keyboard('{Tab}')
    expect(loginButton).toHaveFocus()

    // 1depth 탭과 패널의 ARIA 연결
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    expect(controlledBy(tabs[0])).toHaveAttribute('role', 'tabpanel')
    expect(controlledBy(tabs[0])).toHaveAttribute('aria-labelledby', tabs[0].id)

    // 3depth: Enter로 펼침
    const depth3Trigger = screen.getByRole('link', { name: '고용정보' })
    const depth3Wrap = depth3Trigger.nextElementSibling as HTMLElement
    expect(depth3Trigger).toHaveAttribute('aria-expanded', 'false')
    expect(depth3Wrap).not.toBeVisible()
    depth3Trigger.focus()
    await userEvent.keyboard('{Enter}')
    expect(depth3Trigger).toHaveAttribute('aria-expanded', 'true')
    expect(controlledBy(depth3Trigger)).toBe(depth3Wrap)
    await waitFor(() => expect(depth3Wrap).toBeVisible())

    // 4depth: 열면 이전화면 버튼으로 포커스 이동
    const depth4Trigger = screen.getByRole('link', { name: '직업 훈련' })
    const depth4Wrap = depth4Trigger.nextElementSibling as HTMLElement
    const prevButton = depth4Wrap.querySelector('.trigger-prev') as HTMLElement
    expect(depth4Trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(depth4Trigger)
    await waitFor(() => expect(prevButton).toHaveFocus())
    expect(depth4Wrap).toHaveClass('is-open')
    expect(depth4Trigger).toHaveAttribute('aria-expanded', 'true')

    // 4depth 패널 안에서 포커스 트랩
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    expect(screen.getByRole('link', { name: '온라인 과정' })).toHaveFocus()
    await userEvent.keyboard('{Tab}')
    expect(prevButton).toHaveFocus()

    // ESC는 4depth만 닫고 트리거로 포커스 복귀
    await userEvent.keyboard('{Escape}')
    expect(depth4Wrap).not.toHaveClass('is-open')
    expect(depth4Trigger).toHaveAttribute('aria-expanded', 'false')
    expect(depth4Trigger).toHaveFocus()
    expect(drawer).toHaveClass('is-open')

    // Enter로 다시 열고 이전화면 버튼으로 닫기
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(prevButton).toHaveFocus())
    await userEvent.click(prevButton)
    expect(depth4Wrap).not.toHaveClass('is-open')
    expect(depth4Trigger).toHaveFocus()

    // 3depth 다시 클릭 시 접힘
    await userEvent.click(depth3Trigger)
    expect(depth3Trigger).toHaveAttribute('aria-expanded', 'false')
    expect(depth3Wrap).not.toHaveClass('is-open')

    // 탭 클릭 시 해당 탭 선택
    await userEvent.click(tabs[3])
    await waitFor(() => {
      expect(tabs[3]).toHaveAttribute('aria-selected', 'true')
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    })

    // ESC로 드로어 닫기 → 연 버튼으로 포커스 복귀
    await userEvent.keyboard('{Escape}')
    expect(drawer).not.toHaveClass('is-open')
    expect(openButton).toHaveAttribute('aria-expanded', 'false')
    expect(openButton).toHaveFocus()
    await waitFor(() => {
      expect(drawer).not.toBeVisible()
      expect(document.body).not.toHaveClass('is-gnb-mobile')
    })

    // 다시 열고 닫기 버튼으로 닫기 → 포커스 복귀
    await userEvent.click(openButton)
    await waitFor(() => expect(gnbWrap).toHaveFocus())
    await userEvent.click(closeButton)
    expect(drawer).not.toHaveClass('is-open')
    expect(openButton).toHaveAttribute('aria-expanded', 'false')
    expect(openButton).toHaveFocus()

    // 전환이 없어도(transition: none) transitionend를 기다리지 않고 드로어로 포커스 이동
    const noTransition = document.createElement('style')
    noTransition.textContent = '#mobile-nav, #mobile-nav *, #mobile-nav::after { transition: none !important; }'
    document.head.append(noTransition)
    await userEvent.click(openButton)
    await waitFor(() => expect(gnbWrap).toHaveFocus())
    await userEvent.click(closeButton)
    noTransition.remove()

    // 2depth를 펼친 채로 끝내 aria-controls 대상을 a11y 검사로도 확인
    await userEvent.click(openButton)
    await waitFor(() => expect(gnbWrap).toHaveFocus())
    await userEvent.click(depth3Trigger)
    expect(depth3Trigger).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(controlledBy(depth3Trigger)).toBeVisible())
    await expectNoA11yViolations()
  })
})
