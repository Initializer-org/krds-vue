import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsDisclosure from './KrdsDisclosure'

const meta: Meta<typeof KrdsDisclosure> = {
  title: 'Components/Layout/KrdsDisclosure',
  component: KrdsDisclosure,
  parameters: {
    docs: {
      description: {
        component:
          '디스클로저는 특정한 정보/컨트롤/섹션에 관련된 부가적인 정보를 표시하거나 숨기는 데 사용되는 요소이다. 디스클로저 하위 콘텐츠 섹션은 기본으로 축소된 상태로 제공되며 사용자가 요청하는 경우에 확장되어 자세한 정보가 표시된다. 이는 사용자의 인지적 부담을 감소시키고 정보를 빠르게 훑어보는 데 도움이 된다.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: '디스클로저 제목'
    },
    modelValue: {
      control: 'boolean',
      description: '확장 상태 (v-model)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {
    title: '신청 서비스안내',
    modelValue: false
  },
  render: args => ({
    components: { KrdsDisclosure },
    setup() {
      return { args }
    },
    template: `
      <KrdsDisclosure v-model="args.modelValue" :title="args.title">
        <ul class="krds-info-list dash">
          <li>하나의 아이디로 안전하고 편리하게 여러 전자정부 서비스를 이용할 수 있는 서비스입니다.</li>
          <li>디지털원패스 이용문의 : 1533-3713 (평일9~18시, 공휴일제외)</li>
        </ul>
      </KrdsDisclosure>
    `
  })
}
