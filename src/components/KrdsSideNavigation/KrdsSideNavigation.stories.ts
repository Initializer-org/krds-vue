import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor, within } from 'storybook/test'
import KrdsSideNavigation from './KrdsSideNavigation'
import type { SideNavItem } from './KrdsSideNavigation'
import { ref } from 'vue'

const meta: Meta<typeof KrdsSideNavigation> = {
  title: 'Components/Navigation/KrdsSideNavigation',
  component: KrdsSideNavigation,
  parameters: {
    docs: {
      description: {
        component:
          '사이드 메뉴는 서브 화면 내에서의 이동을 위해 사용하는 메뉴이다. 일반적으로 본문 영역의 좌측에 사이드바 형태로 제공된다. 메인 메뉴보다 훨씬 좁고 깊은 페이지 구조 탐색에 사용되기 때문에 링크의 개수가 많고 복잡하게 표현되기 쉽다.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: '네비게이션 제목 (1Depth)'
    },
    modelValue: {
      control: 'object',
      description: '메뉴 아이템 배열 (v-model)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const defaultMenuItems: SideNavItem[] = [
  {
    text: '2Depth-menu',
    expanded: true,
    subItems: [
      {
        text: '3Depth-menu',
        expanded: false,
        popupTitle: '3Depth-title',
        subItems: [
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' }
        ]
      },
      { text: '3Depth-link', href: '#' },
      { text: '3Depth-link', href: '#' }
    ]
  },
  {
    text: '2Depth-menu',
    expanded: false,
    subItems: [
      {
        text: '3Depth-menu',
        expanded: false,
        popupTitle: '3Depth-title',
        subItems: [
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' }
        ]
      },
      { text: '3Depth-link', href: '#' },
      { text: '3Depth-link', href: '#' }
    ]
  },
  {
    text: '2Depth-menu',
    expanded: false,
    subItems: [
      {
        text: '3Depth-menu',
        expanded: false,
        popupTitle: '3Depth-title',
        subItems: [
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' },
          { text: '4Depth', href: '#' }
        ]
      },
      { text: '3Depth-link', href: '#' },
      { text: '3Depth-link', href: '#' }
    ]
  }
]

export const Default: Story = {
  name: '기본',
  parameters: {
    a11y: {
      // 원본 KRDS 마크업(role=menu 팝업 안의 제목 버튼·역할 없는 ul)을 따르므로 열린 팝업 요소만 제외한다
      config: {
        rules: [
          { id: 'aria-required-children', selector: '[role]:not(.lnb-submenu-lv2)' },
          { id: 'aria-required-parent', selector: '[role]:not(.lnb-submenu-lv2 a)' },
          { id: 'list', selector: 'ul:not(.lnb-submenu-lv2 > ul), ol' }
        ]
      }
    }
  },
  args: {
    title: '1Depth-title',
    modelValue: defaultMenuItems
  },
  render: args => ({
    components: { KrdsSideNavigation },
    setup() {
      const menuData = ref([...args.modelValue])
      return {
        title: args.title,
        menuData
      }
    },
    template: '<KrdsSideNavigation :title="title" v-model="menuData" />'
  }),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const controlled = (el: HTMLElement) => canvasElement.querySelector<HTMLElement>(`#${CSS.escape(el.getAttribute('aria-controls')!)}`)!
    const toggles = canvas.getAllByRole('menuitem', { name: '2Depth-menu' })

    // 2Depth 토글: aria-expanded + aria-controls로 하위 메뉴(role=menu) 연결
    await expect(canvas.getByRole('menubar')).toBeInTheDocument()
    await expect(toggles[0]).toHaveAttribute('aria-expanded', 'true')
    await expect(toggles[0].closest('li')).toHaveClass('active')
    await expect(toggles[1]).toHaveAttribute('aria-expanded', 'false')
    await expect(controlled(toggles[0])).toHaveAttribute('role', 'menu')

    // 3Depth 팝업 버튼: aria-haspopup, 닫힌 상태로 시작
    const popupBtn = canvas.getByRole('menuitem', { name: '3Depth-menu' })
    const popup = controlled(popupBtn)
    await expect(popupBtn).toHaveAttribute('aria-haspopup', 'true')
    await expect(popupBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(popup).toHaveAttribute('role', 'menu')
    await expect(popup).not.toHaveClass('active')

    // 클릭으로 열면 전환이 끝난 뒤 팝업 제목으로 초점 이동
    await userEvent.click(popupBtn)
    await expect(popupBtn).toHaveAttribute('aria-expanded', 'true')
    await expect(popup).toHaveClass('active')
    const popupTitle = await within(popup).findByRole('button', { name: '3Depth-title' })
    await waitFor(() => expect(popupTitle).toHaveFocus())
    await expect(within(popup).getAllByRole('menuitem', { name: '4Depth' })).toHaveLength(3)

    // 제목 버튼(Enter)으로 닫으면 초점이 팝업 버튼으로 복귀
    await userEvent.keyboard('{Enter}')
    await expect(popupBtn).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(popupBtn).toHaveFocus())

    // Enter로 다시 열고, Tab으로 팝업을 벗어나면 닫히고 팝업 버튼으로 초점 복귀 (원본 KRDS 동작)
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(popupTitle).toHaveFocus())
    await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}')
    await expect(popupBtn).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(popupBtn).toHaveFocus())

    // 팝업이 열린 채로 2Depth를 접으면 하위 팝업도 닫힘
    await userEvent.click(popupBtn)
    await expect(popupBtn).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(popupTitle).toHaveFocus())
    await userEvent.click(toggles[0])
    await expect(toggles[0]).toHaveAttribute('aria-expanded', 'false')
    await expect(toggles[0].closest('li')).not.toHaveClass('active')
    await userEvent.click(toggles[0])
    await expect(toggles[0]).toHaveAttribute('aria-expanded', 'true')
    await expect(popupBtn).toHaveAttribute('aria-expanded', 'false')

    // 2Depth 토글은 키보드(Space)로도 펼침
    toggles[1].focus()
    await userEvent.keyboard('[Space]')
    await expect(toggles[1]).toHaveAttribute('aria-expanded', 'true')
    await expect(toggles[1].closest('li')).toHaveClass('active')

    // 전환이 없어도(transition: none) 팝업 제목으로 초점 이동 (열린 팝업 상태로 접근성 검사)
    for (const el of [popup, ...popup.querySelectorAll<HTMLElement>('*')]) el.style.transition = 'none'
    await userEvent.click(popupBtn)
    await waitFor(() => expect(popupTitle).toHaveFocus())
  }
}

export const TwoDepthLink: Story = {
  name: '2Depth 링크',
  args: {
    title: '1Depth-title'
  },
  render: args => ({
    components: { KrdsSideNavigation },
    setup() {
      const clicked = ref(0)
      const menuData = ref<SideNavItem[]>([
        { text: '2Depth-link', href: '#lnb-link' },
        {
          text: '2Depth-action',
          onClick: event => {
            event.preventDefault()
            clicked.value++
          }
        },
        defaultMenuItems[1]
      ])
      return { title: args.title, menuData, clicked }
    },
    template: '<KrdsSideNavigation :title="title" v-model="menuData" /><p>2Depth-action 클릭: {{ clicked }}회</p>'
  }),
  play: async ({ canvas, userEvent }) => {
    // 하위 메뉴가 없는 2Depth는 href를 가진 링크, 토글 속성(aria-controls/expanded) 없음
    const link = canvas.getByRole('menuitem', { name: '2Depth-link' })
    await expect(link.tagName).toBe('A')
    await expect(link).toHaveAttribute('href', '#lnb-link')
    await expect(link).not.toHaveAttribute('aria-controls')
    await expect(link).not.toHaveAttribute('aria-expanded')

    // onClick 호출
    await userEvent.click(canvas.getByRole('menuitem', { name: '2Depth-action' }))
    await expect(canvas.getByText('2Depth-action 클릭: 1회')).toBeInTheDocument()

    // 하위 메뉴가 있는 2Depth는 그대로 토글
    const toggle = canvas.getByRole('menuitem', { name: '2Depth-menu' })
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  }
}

export const Multiple: Story = {
  name: '여러 개 배치',
  args: {
    title: '1Depth-title',
    modelValue: defaultMenuItems
  },
  render: args => ({
    components: { KrdsSideNavigation },
    setup() {
      const first = ref([...args.modelValue])
      const second = ref([...args.modelValue])
      return { title: args.title, first, second }
    },
    template: `
      <div style="display: flex; gap: 2rem;">
        <KrdsSideNavigation :title="title" v-model="first" aria-label="첫 번째 사이드 메뉴" style="flex: 1;" />
        <KrdsSideNavigation :title="title" v-model="second" aria-label="두 번째 사이드 메뉴" style="flex: 1;" />
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    // 한 페이지에 두 개를 두어도 id가 겹치지 않고, aria-controls는 자기 내비게이션 안을 가리킴
    const ids = [...canvasElement.querySelectorAll('[id]')].map(el => el.id)
    await expect(ids.length).toBeGreaterThan(0)
    await expect(new Set(ids).size).toBe(ids.length)
    for (const nav of canvasElement.querySelectorAll('nav')) {
      for (const control of nav.querySelectorAll('[aria-controls]')) {
        await expect(nav.querySelector(`#${CSS.escape(control.getAttribute('aria-controls')!)}`)).not.toBeNull()
      }
    }
  }
}
