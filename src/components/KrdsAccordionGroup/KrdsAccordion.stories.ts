import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsAccordionGroup from './KrdsAccordionGroup'
import { KrdsAccordionItem } from '../KrdsAccordionItem'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Components/Layout/KrdsAccordion',
  parameters: {
    docs: {
      description: {
        component:
          '아코디언은 한 페이지에서 관련 있는 여러 콘텐츠 섹션을 확인할 수 있도록 하는 컴포넌트로 콘텐츠 섹션의 헤더 목록이 수직으로 쌓여 있는 형태로 표현된다. 일반적으로 헤더 목록은 컨트롤 요소로 활용되며 사용자는 필요에 따라 헤더를 선택하여 하위 콘텐츠 섹션을 표시하거나 숨길 수 있다.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {},
  render: () => ({
    components: { KrdsAccordionGroup, KrdsAccordionItem },
    setup() {
      const openItem = ref(undefined)
      const handleToggle = (id: string) => {
        openItem.value = openItem.value === id ? undefined : id
      }
      return { openItem, handleToggle }
    },
    template: `
      <KrdsAccordionGroup>
        <KrdsAccordionItem id="1" :open-item="openItem" title="title1" content="content1" @toggle="handleToggle" />
        <KrdsAccordionItem id="2" :open-item="openItem" title="title2" content="content2" @toggle="handleToggle" />
      </KrdsAccordionGroup>`
  })
}

export const Line: Story = {
  name: '라인',
  args: {},
  render: () => ({
    components: { KrdsAccordionGroup, KrdsAccordionItem },
    setup() {
      const openItem = ref(undefined)
      const handleToggle = (id: string) => {
        openItem.value = openItem.value === id ? undefined : id
      }
      return { openItem, handleToggle }
    },
    template: `
      <KrdsAccordionGroup type-line>
        <KrdsAccordionItem id="1" :open-item="openItem" @toggle="handleToggle">
          <template #title>title1</template>
          <template #content>content1</template>/>
        </KrdsAccordionItem>
        <KrdsAccordionItem id="2" :open-item="openItem" @toggle="handleToggle">
          <template #title>title2</template>
          <template #content>content2</template>/>
        </KrdsAccordionItem>
      </KrdsAccordionGroup>`
  })
}
