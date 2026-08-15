import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsTagGroup from './KrdsTagGroup'
import { KrdsTag } from '../KrdsTag'

const meta: Meta<typeof KrdsTagGroup> = {
  title: 'Components/Selection/KrdsTagGroup',
  component: KrdsTagGroup,
  parameters: {
    docs: {
      description: {
        component: '태그 그룹은 여러 개의 태그를 나란히 배치하는 래퍼 컴포넌트이다. size 속성으로 그룹 내 태그 크기를 지정한다.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsTagGroup, KrdsTag },
    template: `
      <KrdsTagGroup>
        <KrdsTag>태그 1</KrdsTag>
        <KrdsTag>태그 2</KrdsTag>
        <KrdsTag>태그 3</KrdsTag>
      </KrdsTagGroup>`
  }),
  play: async ({ canvasElement }) => {
    const group = canvasElement.querySelector('.krds-tag-wrap')
    await expect(group).toHaveClass('medium')
    await expect(group!.querySelectorAll('.krds-btn-tag').length).toBe(3)
  }
}

// 2. 크기
export const Sizes: Story = {
  name: '크기',
  render: () => ({
    components: { KrdsTagGroup, KrdsTag },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.6rem;">
        <KrdsTagGroup size="small">
          <KrdsTag>스몰</KrdsTag>
          <KrdsTag>태그</KrdsTag>
        </KrdsTagGroup>
        <KrdsTagGroup size="medium">
          <KrdsTag>미디엄</KrdsTag>
          <KrdsTag>태그</KrdsTag>
        </KrdsTagGroup>
        <KrdsTagGroup size="large">
          <KrdsTag>라지</KrdsTag>
          <KrdsTag>태그</KrdsTag>
        </KrdsTagGroup>
      </div>`
  })
}
