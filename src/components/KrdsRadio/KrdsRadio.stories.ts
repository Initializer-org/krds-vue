import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import KrdsRadio from './KrdsRadio'
import KrdsCheckArea from '../KrdsCheckArea/KrdsCheckArea'

const meta: Meta<typeof KrdsRadio> = {
  title: 'Components/Selection/KrdsRadio',
  component: KrdsRadio,
  parameters: {
    docs: {
      description: {
        component:
          '라디오 버튼은 사용자가 여러 개의 옵션 중 하나만 선택할 수 있도록 하는 경우에 사용한다. 즉, 라디오 버튼 옵션의 선택은 상호배타적이므로 한 개의 옵션을 선택하면 다른 옵션은 자동으로 선택 해제된다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: '선택된 값 (v-model)'
    },
    value: {
      control: 'text',
      description: '라디오 버튼의 값'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: '라디오 버튼 크기'
    },
    chip: {
      control: 'boolean',
      description: 'Chip 스타일 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Radio: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsRadio, KrdsCheckArea },
    setup() {
      const selectedValue = ref('option2')
      const selectedValue2 = ref('option4')
      const selectedWithDescription = ref('option1')

      return { selectedValue, selectedValue2, selectedWithDescription }
    },
    template: `
      <div>
        <div style="margin-bottom: 2rem;">
          <KrdsCheckArea>
            <KrdsRadio v-model="selectedValue" value="option1" name="basic1">기본</KrdsRadio>
            <KrdsRadio v-model="selectedValue" value="option2" name="basic2">선택됨</KrdsRadio>
            <KrdsRadio v-model="selectedValue" value="option3" name="basic3" disabled>비활성화</KrdsRadio>
            <KrdsRadio v-model="selectedValue2" value="option4" name="basic4" disabled>선택된 비활성화</KrdsRadio>
          </KrdsCheckArea>
        </div>

        <div style="margin-bottom: 2rem;">
          <KrdsCheckArea column>
            <KrdsRadio v-model="selectedWithDescription" value="option1" name="withDesc">
              라디오버튼
              <template #description>
                부가적인 설명이 들어갑니다.
              </template>
            </KrdsRadio>
            <KrdsRadio v-model="selectedWithDescription" value="option2" name="withDesc">
              라디오버튼
              <template #description>
                부가적인 설명이 들어갑니다.
              </template>
            </KrdsRadio>
          </KrdsCheckArea>
        </div>
      </div>
    `
  })
}
