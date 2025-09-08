import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsMasthead from './KrdsMasthead'

const meta: Meta<typeof KrdsMasthead> = {
  title: 'Components/Identity/KrdsMasthead',
  component: KrdsMasthead,
  parameters: {
    docs: {
      description: {
        component:
          '공식 배너는 사용자가 대한민국 정부 조직 및 관련 기관에서 운영 및 관리하는 디지털 정부서비스임을 식별할 수 있도록 제공하는 정보 배너이다.'
      }
    }
  },
  argTypes: {}
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {},
  render: args => ({
    components: { KrdsMasthead },
    setup() {
      return { args }
    },
    template: '<KrdsMasthead v-bind="args">이 누리집은 대한민국 공식 전자정부 누리집입니다.</KrdsMasthead>'
  })
}
