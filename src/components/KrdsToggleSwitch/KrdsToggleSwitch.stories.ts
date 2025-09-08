import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import KrdsToggleSwitch from './KrdsToggleSwitch'

const meta: Meta<typeof KrdsToggleSwitch> = {
  title: 'Components/Selection/KrdsToggleSwitch',
  component: KrdsToggleSwitch,
  parameters: {
    docs: {
      description: {
        component: '토글은 상호 배타적인 두 가지 상태를 전환하는 데 사용되는 요소이다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '스위치 상태 (v-model)'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    label: {
      control: 'text',
      description: '스위치 라벨'
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: '스위치 크기'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: '기본',
  render: args => ({
    components: { KrdsToggleSwitch },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div>
        <KrdsToggleSwitch v-model="checked" v-bind="args" />
        <p style="margin-top: 1rem;">현재 상태: {{ checked ? '켜짐' : '꺼짐' }}</p>
      </div>
    `
  }),
  args: {
    label: 'switch : default'
  }
}

export const Sizes: Story = {
  name: '크기',
  render: () => ({
    components: { KrdsToggleSwitch },
    setup() {
      const mediumChecked = ref(false)
      const largeChecked = ref(false)
      return { mediumChecked, largeChecked }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <KrdsToggleSwitch v-model="mediumChecked" size="medium" label="Medium 크기 스위치 (기본)" />
        <KrdsToggleSwitch v-model="largeChecked" size="large" label="Large 크기 스위치" />
      </div>
    `
  })
}
