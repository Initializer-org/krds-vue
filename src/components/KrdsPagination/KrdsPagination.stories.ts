import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import KrdsPagination from './KrdsPagination.vue'

const meta = {
  title: 'Components/Navigation/KrdsPagination',
  component: KrdsPagination,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지 번호 (v-model)'
    },
    min: {
      control: { type: 'number', min: 1 },
      description: '최소 페이지 번호'
    },
    max: {
      control: { type: 'number', min: 1 },
      description: '최대 페이지 번호 (전체 페이지 수)'
    },
    pageRange: {
      control: { type: 'number', min: 1 },
      description: '표시할 페이지 범위'
    }
  }
} satisfies Meta<typeof KrdsPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: 4,
    max: 99,
    pageRange: 8
  },
  render: args => ({
    components: { KrdsPagination },
    setup() {
      const currentPage = ref(args.modelValue)
      return { args, currentPage }
    },
    template: `
      <div style="width: 100%; max-width: 800px; padding: 20px;">
        <KrdsPagination 
          v-model="currentPage"
          :min="args.min"
          :max="args.max"
          :page-range="args.pageRange"
        />
      </div>
    `
  })
}
