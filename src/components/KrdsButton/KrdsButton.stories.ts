import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsButton from './KrdsButton'

const meta: Meta<typeof KrdsButton> = {
  title: 'Components/KrdsButton',
  component: KrdsButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge']
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset']
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {
    variant: 'primary'
  },
  render: args => ({
    components: { KrdsButton },
    setup() {
      return { args }
    },
    template: '<KrdsButton v-bind="args">버튼</KrdsButton>'
  })
}

// 2. 계층
export const Hierarchy: Story = {
  name: '계층',
  render: () => ({
    components: { KrdsButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <KrdsButton variant="primary">버튼 : primary</KrdsButton>
        <KrdsButton variant="secondary">버튼 : secondary</KrdsButton>
        <KrdsButton variant="tertiary">버튼 : tertiary</KrdsButton>
      </div>
    `
  })
}

// 3. 사이즈
export const Sizes: Story = {
  name: '사이즈',
  render: () => ({
    components: { KrdsButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <KrdsButton size="xsmall">x-small 버튼</KrdsButton>
        <KrdsButton size="small">small 버튼</KrdsButton>
        <KrdsButton size="medium">medium 버튼</KrdsButton>
        <KrdsButton size="large">large 버튼</KrdsButton>
        <KrdsButton size="xlarge">x-large 버튼</KrdsButton>
      </div>
    `
  })
}

// 4. 기본 아이콘 버튼
export const WithIcon: Story = {
  name: '기본 아이콘 버튼',
  render: () => ({
    components: { KrdsButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <KrdsButton size="xsmall">
          x-small 버튼
          <i class="svg-icon ico-sch"></i>
        </KrdsButton>
        <KrdsButton size="small">
          small 버튼
          <i class="svg-icon ico-sch"></i>
        </KrdsButton>
        <KrdsButton size="medium">
          medium 버튼
          <i class="svg-icon ico-sch"></i>
        </KrdsButton>
        <KrdsButton size="large">
          large 버튼
          <i class="svg-icon ico-sch"></i>
        </KrdsButton>
        <KrdsButton size="xlarge">
          <i class="svg-icon ico-sch"></i>
          x-large 버튼
        </KrdsButton>
      </div>
    `
  })
}

// 5. 텍스트
export const TextButton: Story = {
  name: '텍스트',
  render: () => ({
    components: { KrdsButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <KrdsButton size="small" class="text">텍스트 버튼</KrdsButton>
        <KrdsButton size="xsmall" class="text">
          찜하기 <i class="svg-icon ico-like"></i>
        </KrdsButton>
        <KrdsButton size="small" class="text">
          주민등록표초본 <i class="svg-icon ico-angle right"></i>
        </KrdsButton>
        <KrdsButton size="medium" class="text">
          검색 <i class="svg-icon ico-sch"></i>
        </KrdsButton>
        <KrdsButton size="xlarge" class="text">
          자세히 보기 <i class="svg-icon ico-more"></i>
        </KrdsButton>
        <KrdsButton class="text">
          파일다운로드 <i class="svg-icon ico-down"></i>
        </KrdsButton>
        <KrdsButton class="text" disabled>
          필터 <i class="svg-icon ico-filter"></i>
        </KrdsButton>
      </div>
    `
  })
}

// 6. 아이콘만 있는 버튼
export const IconOnly: Story = {
  name: '아이콘만 있는 버튼',
  render: () => ({
    components: { KrdsButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <KrdsButton icon>
          <span class="sr-only">검색</span>
          <i class="svg-icon ico-sch"></i>
        </KrdsButton>
        <KrdsButton icon size="medium">
          <span class="sr-only">입력한 비밀번호 보기</span>
          <i class="svg-icon ico-pw-visible"></i>
        </KrdsButton>
        <KrdsButton icon size="medium" class="btn-help-exec">
          <span class="sr-only">도움말</span>
          <i class="svg-icon ico-help"></i>
        </KrdsButton>
        <KrdsButton icon border size="large">
          <span class="sr-only">새로고침</span>
          <i class="svg-icon ico-refresh"></i>
        </KrdsButton>
        <KrdsButton icon border size="large" disabled>
          <span class="sr-only">열기</span>
          <i class="svg-icon ico-angle down"></i>
        </KrdsButton>
      </div>
    `
  })
}
