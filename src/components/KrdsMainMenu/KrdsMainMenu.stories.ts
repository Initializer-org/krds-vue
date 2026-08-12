import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
import { ref } from 'vue'
import KrdsMainMenu from './KrdsMainMenu'
import type { MainMenuItem } from './KrdsMainMenu'

const meta: Meta<typeof KrdsMainMenu> = {
  title: 'Components/Navigation/KrdsMainMenu',
  component: KrdsMainMenu,
  parameters: {
    docs: {
      description: {
        component:
          '메인 메뉴는 서비스 전체의 구조를 보여주고 주요 화면으로 이동할 수 있게 하는 메뉴이다. 일반적으로 헤더 영역에 위치하며, 데스크탑에서는 메가 메뉴 형태로, 모바일에서는 드로어 형태로 제공된다. `variant` 속성으로 두 형태를 전환한다.'
      }
    }
  },
  argTypes: {
    items: {
      control: 'object',
      description: '메뉴 아이템 배열 (1depth ~ 4depth 중첩 구조)'
    },
    variant: {
      control: 'select',
      options: ['pc', 'mobile'],
      description: '렌더링 방식 (pc: 메가 메뉴 / mobile: 드로어 메뉴)'
    },
    ariaLabel: {
      control: 'text',
      description: '메뉴 영역 레이블'
    },
    open: {
      control: 'boolean',
      description: '모바일 드로어 열림 상태 (v-model:open)'
    },
    mobileId: {
      control: 'text',
      description: '모바일 드로어 요소 id (외부 트리거의 aria-controls 대상)'
    },
    backdrop: {
      control: 'boolean',
      description: 'PC 메가 패널 배경 딤 사용 여부'
    },
    closeLabel: {
      control: 'text',
      description: '모바일 드로어 닫기 버튼 레이블'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

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
            description: '메뉴명과 메뉴에 관한 간략한 설명이 표시되는 스타일입니다.'
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

export const Default: Story = {
  name: 'PC 메가 메뉴',
  args: {
    items: pcItems,
    variant: 'pc'
  },
  render: args => ({
    components: { KrdsMainMenu },
    setup() {
      return { args }
    },
    template: `
      <KrdsMainMenu v-bind="args">
        <template #banner>
          <span class="krds-badge bg-secondary">신규 서비스</span>
          <button type="button" class="krds-btn medium text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
        </template>
      </KrdsMainMenu>
    `
  }),
  play: async ({ canvasElement, canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: '정보서비스' })

    // 초기 상태는 닫힘
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // 메인 트리거 클릭 → 메가 패널 열림
    await userEvent.click(trigger)
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })
    await expect(trigger).toHaveClass(/active/)

    const panelId = trigger.getAttribute('aria-controls') as string
    const panel = canvasElement.querySelector(`#${panelId}`) as HTMLElement
    await expect(panel).toHaveClass(/is-open/)

    // 첫 번째 2depth가 기본 활성화되어 서브 패널이 노출됨
    const subTriggers = canvasElement.querySelectorAll(`#${panelId} .gnb-sub-trigger:not(.is-link)`)
    await expect(subTriggers[0]).toHaveAttribute('aria-expanded', 'true')
    await expect(subTriggers[0].nextElementSibling).toHaveClass(/active/)

    // 다른 2depth 선택 → 활성 서브 패널 전환
    await userEvent.click(subTriggers[1] as HTMLElement)
    await waitFor(() => {
      expect(subTriggers[1]).toHaveAttribute('aria-expanded', 'true')
      expect(subTriggers[0]).toHaveAttribute('aria-expanded', 'false')
    })

    // backdrop 노출 확인
    await expect(document.querySelector('.gnb-backdrop')).toBeInTheDocument()

    // ESC로 닫기
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
    await expect(document.querySelector('.gnb-backdrop')).not.toBeInTheDocument()
  }
}

export const SingleList: Story = {
  name: 'PC 2depth 없는 메뉴',
  args: {
    items: [pcItems[2], pcItems[3]],
    variant: 'pc'
  },
  parameters: {
    docs: {
      description: {
        story: '2depth 목록 없이 마지막 뎁스 링크만 나열하는 경우 `single-list` 레이아웃으로 렌더링된다. `items`만 지정하면 된다.'
      }
    }
  }
}

export const Mobile: Story = {
  name: '모바일 드로어 메뉴',
  args: {
    items: mobileItems,
    variant: 'mobile',
    open: false
  },
  parameters: {
    docs: {
      description: {
        story:
          '모바일 드로어는 `v-model:open`으로 제어한다. 외부 트리거 버튼에 `aria-controls`로 `mobileId`를 연결하고 `aria-expanded`를 함께 관리한다. 2depth의 `items`는 3depth로, 3depth의 `items`는 전체 화면 4depth 패널로 렌더링된다.'
      }
    }
  },
  render: args => ({
    components: { KrdsMainMenu },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
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
  }),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const openButton = canvas.getByRole('button', { name: '전체메뉴 열기' })
    await userEvent.click(openButton)

    const drawer = canvasElement.querySelector('#mobile-nav') as HTMLElement
    await waitFor(() => {
      expect(drawer).toHaveClass(/is-open/)
    })
    await expect(openButton).toHaveAttribute('aria-expanded', 'true')

    // 3depth 토글
    const depth3Trigger = canvasElement.querySelector('.gnb-sub-trigger.has-depth3') as HTMLElement
    await expect(depth3Trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(depth3Trigger)
    await waitFor(() => {
      expect(depth3Trigger).toHaveAttribute('aria-expanded', 'true')
      expect(depth3Trigger.nextElementSibling).toHaveClass(/is-open/)
    })

    // 4depth 패널 열기
    const depth4Trigger = canvasElement.querySelector('.depth3-trigger.has-depth4') as HTMLElement
    await userEvent.click(depth4Trigger)
    await waitFor(() => {
      expect(depth4Trigger.nextElementSibling).toHaveClass(/is-open/)
    })

    // 이전화면 버튼으로 4depth 닫기
    const prevButton = canvasElement.querySelector('.depth4-wrap .trigger-prev') as HTMLElement
    await userEvent.click(prevButton)
    await waitFor(() => {
      expect(depth4Trigger.nextElementSibling).not.toHaveClass(/is-open/)
    })

    // 닫기 버튼으로 드로어 닫기
    const closeButton = canvasElement.querySelector('#close-nav') as HTMLElement
    await userEvent.click(closeButton)
    await waitFor(() => {
      expect(drawer).not.toHaveClass(/is-open/)
    })
  }
}
