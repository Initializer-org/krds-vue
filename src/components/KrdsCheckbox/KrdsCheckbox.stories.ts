import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import KrdsCheckbox from './KrdsCheckbox'
import KrdsCheckArea from '../KrdsCheckArea/KrdsCheckArea'

const meta: Meta<typeof KrdsCheckbox> = {
  title: 'Components/Selection/KrdsCheckbox',
  component: KrdsCheckbox,
  parameters: {
    docs: {
      description: {
        component:
          '체크박스는 사용자가 여러 개의 옵션 중 한 개 이상의 값을 선택할 수 있도록 하는 경우에 사용한다. 즉, 체크박스 옵션의 선택은 상호배타적이므로 한 개의 옵션을 선택하는 것은 다른 옵션의 선택에 영향을 미치지 않는다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '선택 상태 (v-model)'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: '체크박스 크기'
    },
    chip: {
      control: 'boolean',
      description: 'Chip 스타일 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsCheckbox, KrdsCheckArea },
    setup() {
      const basic = ref(false)
      const selected = ref(true)
      const disabled = ref(false)
      const disabledSelected = ref(true)

      return { basic, selected, disabled, disabledSelected }
    },
    template: `
      <div>
        <div style="margin-bottom: 2rem;">
          <KrdsCheckArea>
            <KrdsCheckbox v-model="basic">기본</KrdsCheckbox>
            <KrdsCheckbox v-model="selected">선택됨</KrdsCheckbox>
            <KrdsCheckbox v-model="disabled" disabled>비활성화</KrdsCheckbox>
            <KrdsCheckbox v-model="disabledSelected" disabled>선택된 비활성화</KrdsCheckbox>
          </KrdsCheckArea>
        </div>

        <div style="margin-bottom: 2rem;">
          <KrdsCheckArea column>
            <KrdsCheckbox>
              체크박스
              <template #description>
                부가적인 설명이 들어갑니다.
              </template>
            </KrdsCheckbox>
 
            <KrdsCheckbox>
              체크박스
              <template #description>
                부가적인 설명이 들어갑니다.
              </template>
            </KrdsCheckbox>
          </KrdsCheckArea>
        </div>
      </div>
    `
  })
}

export const Sizes: Story = {
  name: '사이즈',
  render: () => ({
    components: { KrdsCheckbox, KrdsCheckArea },
    setup() {
      const mediumChecked = ref(false)
      const largeChecked = ref(false)

      return { mediumChecked, largeChecked }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <KrdsCheckArea>
          <KrdsCheckbox v-model="mediumChecked" size="medium">Medium 크기 체크박스</KrdsCheckbox>
        </KrdsCheckArea>
        
        <KrdsCheckArea>
          <KrdsCheckbox v-model="largeChecked" size="large">Large 크기 체크박스</KrdsCheckbox>
        </KrdsCheckArea>
      </div>
    `
  })
}

export const ChipVariant: Story = {
  name: 'Chip',
  render: () => ({
    components: { KrdsCheckbox, KrdsCheckArea },
    setup() {
      const checked1 = ref(false)
      const checked2 = ref(true)
      const checked3 = ref(false)

      return { checked1, checked2, checked3 }
    },
    template: `
      <KrdsCheckArea>
        <KrdsCheckbox v-model="checked1" chip>Chip 체크박스 1</KrdsCheckbox>
        <KrdsCheckbox v-model="checked2" chip>Chip 체크박스 2 (선택됨)</KrdsCheckbox>
        <KrdsCheckbox v-model="checked3" chip disabled>Chip 체크박스 3</KrdsCheckbox>
      </KrdsCheckArea>
    `
  })
}
