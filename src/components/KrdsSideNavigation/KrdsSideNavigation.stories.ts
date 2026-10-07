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

    // Enter로 다시 열고, Tab으로 팝업을 벗어나면 닫힘
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(popupTitle).toHaveFocus())
    await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}')
    await expect(popupBtn).toHaveAttribute('aria-expanded', 'false')

    // 팝업이 열린 채로 2Depth를 접으면 하위 팝업도 닫힘
    await userEvent.click(popupBtn)
    await expect(popupBtn).toHaveAttribute('aria-expanded', 'true')
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
  }
}
