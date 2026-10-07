import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsTextList from './KrdsTextList'

const meta: Meta<typeof KrdsTextList> = {
  title: 'Components/Layout/KrdsTextList',
  component: KrdsTextList,
  parameters: {
    docs: {
      description: {
        component: '텍스트 목록은 계층 구조가 있는 텍스트 블록을 읽기 쉽게 구성한 것이다.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['ul', 'ol'],
      description: '리스트 타입'
    },
    variant: {
      control: 'select',
      options: ['decimal', 'dash', 'hollow', 'ordered'],
      description: '스타일 변형'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본 (대시)
export const Default: Story = {
  name: '기본 (대시)',
  args: {
    type: 'ul',
    variant: 'dash'
  },
  render: args => ({
    components: { KrdsTextList },
    setup() {
      return { args }
    },
    template: `
      <KrdsTextList v-bind="args">
        <li>텍스트 목록 레벨1</li>
        <li>
          텍스트 목록 레벨1
          <KrdsTextList type="ul" variant="hollow">
            <li>텍스트 목록 레벨2</li>
            <li>텍스트 목록 레벨2</li>
          </KrdsTextList>
        </li>
        <li>텍스트 목록 레벨1</li>
      </KrdsTextList>
    `
  })
}

export const Ordered: Story = {
  name: '순서 있는 목록',
  args: {
    type: 'ol',
    variant: 'ordered'
  },
  render: args => ({
    components: { KrdsTextList },
    setup() {
      return { args }
    },
    template: `
      <KrdsTextList v-bind="args">
        <li><span class="num">1. </span>텍스트 목록 레벨1</li>
        <li>
          <span class="num">2. </span>텍스트 목록 레벨1
          <KrdsTextList type="ol" variant="ordered">
            <li><span class="num">a. </span>텍스트 목록 레벨2</li>
            <li>
              <span class="num">b. </span>텍스트 목록 레벨2
              <KrdsTextList type="ol" variant="ordered">
                <li><span class="num">①</span>텍스트 목록 레벨3</li>
                <li><span class="num">②</span>텍스트 목록 레벨3</li>
              </KrdsTextList>
            </li>
            <li><span class="num">c. </span>텍스트 목록 레벨2</li>
          </KrdsTextList>
        </li>
        <li><span class="num">3. </span>텍스트 목록 레벨1</li>
      </KrdsTextList>
      <br>
      <KrdsTextList type="ul" variant="decimal">
        <li>
          텍스트 목록 레벨1
          <KrdsTextList type="ul" variant="dash">
            <li>
              텍스트 목록 레벨2
              <KrdsTextList type="ol" variant="ordered">
                <li><span class="num">①</span>텍스트 목록 레벨3</li>
                <li><span class="num">②</span>텍스트 목록 레벨3</li>
              </KrdsTextList>
            </li>
          </KrdsTextList>
        </li>
        <li>
          텍스트 목록 레벨1
          <KrdsTextList type="ol" variant="ordered">
            <li>
              <span class="num">a. </span>텍스트 목록 레벨2
              <KrdsTextList type="ul" variant="hollow">
                <li>텍스트 목록 레벨3</li>
                <li>텍스트 목록 레벨3</li>
              </KrdsTextList>
            </li>
          </KrdsTextList>
        </li>
      </KrdsTextList>
      
    `
  })
}
