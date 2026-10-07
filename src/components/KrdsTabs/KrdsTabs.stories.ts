import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsTabs from './KrdsTabs'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Components/Layout/KrdsTabs',
  component: KrdsTabs,
  parameters: {
    a11y: {
      // 원본 KRDS 마크업(li[role=tab] > button)을 따르므로 탭 요소만 제외한다
      config: { rules: [{ id: 'nested-interactive', selector: '*:not([role="tab"])' }] }
    },
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
  })
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
  })
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
        <p>현재 탭: {{ activeTab }}</p>
        <KrdsTabs :tabs="tabs" v-model="activeTab">
          <template #tab1>탭 1 영역</template>
          <template #tab2>탭 2 영역</template>
          <template #tab3>탭 3 영역</template>
        </KrdsTabs>
      </div>`
  })
}
