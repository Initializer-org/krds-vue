import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor, within } from 'storybook/test'
import { ref } from 'vue'
import KrdsHeader from './KrdsHeader'
import KrdsMainMenu from '../KrdsMainMenu'
import type { MainMenuItem } from '../KrdsMainMenu'

const meta: Meta<typeof KrdsHeader> = {
  title: 'Components/Identity/KrdsHeader',
  component: KrdsHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `헤더는 웹사이트의 상단 헤더 영역을 구성하는 컴포넌트이다.
        유틸리티 메뉴, 브랜딩 영역, 네비게이션 메뉴를 슬롯을 통해 유연하게 구성할 수 있다.
        네비게이션 슬롯에는 KrdsMainMenu 등 완성된 메뉴 컴포넌트를 그대로 전달한다.`
      }
    }
  },
  argTypes: {
    id: {
      control: 'text',
      description: '헤더 ID',
      defaultValue: 'krds-header'
    },
    class: {
      control: 'text',
      description: '추가 CSS 클래스'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const menuItems: MainMenuItem[] = [
  {
    text: '1Depth',
    subItems: [
      {
        text: '2Depth-menu',
        items: [
          { text: '3Depth-menu', href: '#' },
          { text: '3Depth-menu', href: '#' }
        ]
      },
      {
        text: '2Depth-menu',
        items: [
          { text: '3Depth-menu', href: '#' },
          { text: '3Depth-menu', href: '#' }
        ]
      }
    ]
  },
  {
    text: '1Depth',
    subItems: [
      {
        text: '2Depth-menu',
        items: [
          { text: '3Depth-menu', href: '#' },
          { text: '3Depth-menu', href: '#' }
        ]
      }
    ]
  },
  { text: '링크(anchor)', href: '#' }
]

/**
 * 기본 헤더 — 네비게이션 슬롯에 KrdsMainMenu 사용
 */
export const Default: Story = {
  name: '기본',
  render: args => ({
    components: { KrdsHeader, KrdsMainMenu },
    setup() {
      const mobileOpen = ref(false)
      return { args, menuItems, mobileOpen }
    },
    template: `
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
            <button type="button" class="btn-navi all" aria-controls="mobile-nav" :aria-expanded="String(mobileOpen)" @click="mobileOpen = true">전체메뉴</button>
          </div>
        </template>

        <template #navigation>
          <KrdsMainMenu :items="menuItems" />
        </template>

        <template #mobileNavigation>
          <KrdsMainMenu variant="mobile" :items="menuItems" v-model:open="mobileOpen" />
        </template>
      </KrdsHeader>
    `
  }),
  play: async ({ canvas }) => {
    // banner 랜드마크 + 기본 id
    const header = canvas.getByRole('banner')
    await expect(header).toHaveAttribute('id', 'krds-header')

    // utility·branding은 header-container > inner, 네비게이션은 header-in 직속
    const headerIn = header.querySelector(':scope > .header-in')!
    const inner = headerIn.querySelector(':scope > .header-container > .inner')!
    await expect(Array.from(inner.children, el => el.className)).toEqual(['header-utility', 'header-branding'])
    await expect(headerIn.querySelector(':scope > .krds-main-menu')).toBeInTheDocument()

    // 모바일 드로어는 header-in 밖, header 직속
    await expect(header.querySelector(':scope > .krds-main-menu-mobile')).toBeInTheDocument()
  }
}

/**
 * 모바일 — 전체메뉴 버튼으로 KrdsMainMenu(variant="mobile") 드로어 열기
 */
export const Mobile: Story = {
  ...Default,
  name: '모바일',
  globals: { viewport: { value: 'mobile2', isRotated: false } },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const allMenu = canvas.getByRole('button', { name: '전체메뉴' })
    const drawer = canvasElement.querySelector<HTMLElement>(`#${allMenu.getAttribute('aria-controls')}`)!
    await expect(drawer).toHaveClass('krds-main-menu-mobile')
    await expect(drawer).not.toHaveClass('is-open')
    await expect(allMenu).toHaveAttribute('aria-expanded', 'false')

    // 전체메뉴 클릭 → aria-controls 대상 드로어 열림
    await userEvent.click(allMenu)
    await waitFor(() => expect(drawer).toHaveClass('is-open'))
    await expect(allMenu).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(drawer).toBeVisible())

    // 닫기 버튼으로 닫기
    await userEvent.click(within(drawer).getByRole('button', { name: '전체메뉴 닫기' }))
    await waitFor(() => expect(drawer).not.toBeVisible())
    await expect(drawer).not.toHaveClass('is-open')
    await expect(allMenu).toHaveAttribute('aria-expanded', 'false')
  }
}
