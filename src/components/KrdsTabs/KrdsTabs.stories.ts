import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsTabs from './KrdsTabs'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Components/Layout/KrdsTabs',
  component: KrdsTabs,
  parameters: {
    docs: {
      description: {
        component:
          '탭은 버튼을 눌러 상호배타적인 여러 개의 콘텐츠 섹션을 전환할 수 있는 컴포넌트이다. 탭 버튼 목록과 콘텐츠 패널이 수직으로 쌓여 있는 형태로 표현되며, 사용자는 탭을 선택하여 해당 콘텐츠 섹션을 표시할 수 있다.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'fill']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const defaultTabs = [
  { id: 'tab1', label: '타이틀 1' },
  { id: 'tab2', label: '타이틀 2' },
  { id: 'tab3', label: '타이틀 3' }
]

// 1. 기본 (라인형)
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsTabs },
    setup() {
      return { tabs: defaultTabs }
    },
    template: `
      <KrdsTabs :tabs="tabs">
        <template #tab1>탭 1 영역</template>
        <template #tab2>탭 2 영역</template>
        <template #tab3>탭 3 영역</template>
      </KrdsTabs>`
  }),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const [firstTab, secondTab] = canvas.getAllByRole('tab')
    const firstButton = firstTab.querySelector('button')!
    const secondButton = secondTab.querySelector('button')!

    // 초기 상태: 첫 번째 탭 활성 + ARIA 연결
    await expect(firstTab).toHaveAttribute('aria-selected', 'true')
    await expect(firstTab).toHaveClass('active')
    const firstPanel = canvasElement.querySelector(`#${CSS.escape(firstTab.getAttribute('aria-controls')!)}`)
    await expect(firstPanel).toHaveAttribute('role', 'tabpanel')
    await expect(firstPanel).toHaveAttribute('aria-labelledby', firstTab.id)
    await expect(firstPanel).toHaveClass('active')
    // 초점이 버튼에 있으므로 aria-selected 대신 sr-only 대체 텍스트 제공 (원본 krds_tab 동작)
    await expect(firstButton.querySelector('.sr-only')).toHaveTextContent('선택됨')

    // 클릭 시 탭 전환
    await userEvent.click(secondButton)
    await expect(secondTab).toHaveAttribute('aria-selected', 'true')
    await expect(firstTab).toHaveAttribute('aria-selected', 'false')
    const secondPanel = canvasElement.querySelector(`#${CSS.escape(secondTab.getAttribute('aria-controls')!)}`)
    await expect(secondPanel).toHaveClass('active')
    await expect(firstPanel).not.toHaveClass('active')
    await expect(firstButton.querySelector('.sr-only')).toBeNull()

    // 좌우 방향키로 초점 이동
    secondButton.focus()
    await userEvent.keyboard('{ArrowLeft}')
    await expect(firstButton).toHaveFocus()
    await userEvent.keyboard('{ArrowRight}')
    await expect(secondButton).toHaveFocus()
  }
}

// 2. 버튼형 (fill)
export const Fill: Story = {
  name: '버튼형',
  render: () => ({
    components: { KrdsTabs },
    setup() {
      return { tabs: defaultTabs }
    },
    template: `
      <KrdsTabs :tabs="tabs" variant="fill">
        <template #tab1>탭 1 영역</template>
        <template #tab2>탭 2 영역</template>
        <template #tab3>탭 3 영역</template>
      </KrdsTabs>`
  })
}

// 3. 풀사이즈
export const Full: Story = {
  name: '풀사이즈',
  render: () => ({
    components: { KrdsTabs },
    setup() {
      const tabs = [
        { id: 'tab1', label: '타이틀 1' },
        { id: 'tab2', label: '타이틀 2' }
      ]
      return { tabs }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 4rem;">
        <KrdsTabs :tabs="tabs" full>
          <template #tab1>라인형 풀사이즈 탭 1 영역</template>
          <template #tab2>라인형 풀사이즈 탭 2 영역</template>
        </KrdsTabs>
        <KrdsTabs :tabs="tabs" variant="fill" full>
          <template #tab1>버튼형 풀사이즈 탭 1 영역</template>
          <template #tab2>버튼형 풀사이즈 탭 2 영역</template>
        </KrdsTabs>
      </div>`
  })
}

// 4. 비활성화
export const Disabled: Story = {
  name: '비활성화',
  render: () => ({
    components: { KrdsTabs },
    setup() {
      const tabs = [
        { id: 'tab1', label: '타이틀 1' },
        { id: 'tab2', label: '타이틀 2', disabled: true },
        { id: 'tab3', label: '타이틀 3' }
      ]
      return { tabs }
    },
    template: `
      <KrdsTabs :tabs="tabs">
        <template #tab1>탭 1 영역</template>
        <template #tab2>탭 2 영역</template>
        <template #tab3>탭 3 영역</template>
      </KrdsTabs>`
  }),
  play: async ({ canvas, userEvent }) => {
    const [firstTab, secondTab] = canvas.getAllByRole('tab')
    const secondButton = secondTab.querySelector('button')!

    await expect(secondButton).toBeDisabled()

    // 비활성화된 탭은 클릭해도 전환되지 않는다
    await userEvent.click(secondButton)
    await expect(secondTab).toHaveAttribute('aria-selected', 'false')
    await expect(firstTab).toHaveAttribute('aria-selected', 'true')
  }
}

// 5. v-model 제어
export const Controlled: Story = {
  name: '외부 제어',
  render: () => ({
    components: { KrdsTabs },
    setup() {
      const activeTab = ref('tab2')
      return { tabs: defaultTabs, activeTab }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <p data-testid="active-tab">현재 탭: {{ activeTab }}</p>
        <KrdsTabs :tabs="tabs" v-model="activeTab">
          <template #tab1>탭 1 영역</template>
          <template #tab2>탭 2 영역</template>
          <template #tab3>탭 3 영역</template>
        </KrdsTabs>
      </div>`
  }),
  play: async ({ canvas, userEvent }) => {
    const [firstTab, secondTab] = canvas.getAllByRole('tab')

    // 초기 modelValue가 반영된다
    await expect(secondTab).toHaveAttribute('aria-selected', 'true')

    // 탭 전환 시 modelValue가 갱신된다
    await userEvent.click(firstTab.querySelector('button')!)
    await expect(firstTab).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByTestId('active-tab')).toHaveTextContent('현재 탭: tab1')
  }
}
