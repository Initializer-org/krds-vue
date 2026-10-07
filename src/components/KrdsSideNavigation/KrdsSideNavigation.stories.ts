import type { Meta, StoryObj } from '@storybook/vue3-vite'
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
  })
}

export const TwoDepthLink: Story = {
  name: '2Depth 링크',
  args: {
    title: '1Depth-title'
  },
  render: args => ({
    components: { KrdsSideNavigation },
    setup() {
      const menuData = ref<SideNavItem[]>([
        { text: '2Depth-link', href: '#lnb-link' },
        { text: '2Depth-action', onClick: event => event.preventDefault() },
        defaultMenuItems[1]
      ])
      return { title: args.title, menuData }
    },
    template: '<KrdsSideNavigation :title="title" v-model="menuData" />'
  })
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
  })
}
