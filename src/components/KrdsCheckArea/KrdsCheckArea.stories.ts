import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsCheckArea from './KrdsCheckArea'
import { KrdsCheckbox } from '../KrdsCheckbox'
import { ref } from 'vue'

const meta: Meta<typeof KrdsCheckArea> = {
  title: 'Components/Selection/KrdsCheckArea',
  component: KrdsCheckArea,
  parameters: {
    docs: {
      description: {
        component:
          '체크 영역은 체크박스·라디오 버튼 묶음을 배치하는 래퍼 컴포넌트이다. 기본은 가로 배치이며 column 속성으로 세로 배치로 전환할 수 있다.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본 (가로 배치)
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsCheckArea, KrdsCheckbox },
    setup() {
      const first = ref(true)
      const second = ref(false)
      return { first, second }
    },
    template: `
      <KrdsCheckArea>
        <KrdsCheckbox v-model="first">선택 1</KrdsCheckbox>
        <KrdsCheckbox v-model="second">선택 2</KrdsCheckbox>
      </KrdsCheckArea>`
  }),
  play: async ({ canvasElement }) => {
    const area = canvasElement.querySelector('.krds-check-area')
    await expect(area).toBeTruthy()
    await expect(area).not.toHaveClass('chk-column')
  }
}

// 2. 세로 배치
export const Column: Story = {
  name: '세로 배치',
  render: () => ({
    components: { KrdsCheckArea, KrdsCheckbox },
    setup() {
      const first = ref(false)
      const second = ref(false)
      return { first, second }
    },
    template: `
      <KrdsCheckArea column>
        <KrdsCheckbox v-model="first">선택 1</KrdsCheckbox>
        <KrdsCheckbox v-model="second">선택 2</KrdsCheckbox>
      </KrdsCheckArea>`
  }),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.krds-check-area')).toHaveClass('chk-column')
  }
}
