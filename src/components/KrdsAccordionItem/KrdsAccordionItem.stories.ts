import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsAccordionItem from './KrdsAccordionItem'
import { KrdsAccordionGroup } from '../KrdsAccordionGroup'
import { ref } from 'vue'

const meta: Meta<typeof KrdsAccordionItem> = {
  title: 'Components/Layout/KrdsAccordionItem',
  component: KrdsAccordionItem,
  parameters: {
    docs: {
      description: {
        component:
          '아코디언의 개별 항목 컴포넌트이다. KrdsAccordionGroup 내부에서 사용하며, openItem 속성과 toggle 이벤트로 열림 상태를 부모에서 제어한다. 제목과 본문은 title/content 속성 또는 동명의 슬롯으로 지정한다.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsAccordionGroup, KrdsAccordionItem },
    setup() {
      const openItem = ref<string | undefined>('item1')
      const handleToggle = (id: string) => {
        openItem.value = openItem.value === id ? undefined : id
      }
      return { openItem, handleToggle }
    },
    template: `
      <KrdsAccordionGroup>
        <KrdsAccordionItem id="item1" :open-item="openItem" title="항목 제목" content="항목 본문" @toggle="handleToggle" />
      </KrdsAccordionGroup>`
  }),
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: '항목 제목' })

    // openItem과 id가 일치하면 열림 상태
    await expect(button).toHaveAttribute('aria-expanded', 'true')

    // toggle 이벤트로 닫기
    await userEvent.click(button)
    await expect(button).toHaveAttribute('aria-expanded', 'false')
  }
}

// 2. 슬롯 사용
export const WithSlots: Story = {
  name: '슬롯 사용',
  render: () => ({
    components: { KrdsAccordionGroup, KrdsAccordionItem },
    setup() {
      const openItem = ref<string | undefined>(undefined)
      const handleToggle = (id: string) => {
        openItem.value = openItem.value === id ? undefined : id
      }
      return { openItem, handleToggle }
    },
    template: `
      <KrdsAccordionGroup>
        <KrdsAccordionItem id="item1" :open-item="openItem" @toggle="handleToggle">
          <template #title>슬롯 제목 <strong>강조</strong></template>
          <template #content>슬롯 본문 콘텐츠</template>
        </KrdsAccordionItem>
      </KrdsAccordionGroup>`
  })
}
