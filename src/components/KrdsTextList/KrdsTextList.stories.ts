import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
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
  }),
  play: async ({ canvas }) => {
    const [outer, inner] = canvas.getAllByRole('list')

    // KRDS 구조: ul.krds-info-list.<variant>
    await expect(outer.tagName).toBe('UL')
    await expect(outer).toHaveClass('krds-info-list', 'dash')
    await expect(outer.children).toHaveLength(3)

    // 중첩 목록은 상위 항목(li) 안에 위치
    await expect(inner.tagName).toBe('UL')
    await expect(inner).toHaveClass('krds-info-list', 'hollow')
    await expect(inner.parentElement).toBe(outer.children[1])
    await expect(inner.children).toHaveLength(2)
  }
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
  }),
  play: async ({ canvas }) => {
    const lists = canvas.getAllByRole('list')

    // type="ol" + ordered: 3단계 중첩 ol.krds-info-list.ordered
    const [level1, level2, level3] = lists
    for (const list of [level1, level2, level3]) {
      await expect(list.tagName).toBe('OL')
      await expect(list).toHaveClass('krds-info-list', 'ordered')
    }
    await expect(level2.closest('li')!.parentElement).toBe(level1)
    await expect(level3.closest('li')!.parentElement).toBe(level2)

    // ul/ol 혼합 중첩: ul.decimal > ul.dash > ol.ordered
    const decimal = lists.find(list => list.classList.contains('decimal'))!
    await expect(decimal.tagName).toBe('UL')
    const dash = decimal.querySelector(':scope > li > .krds-info-list')!
    await expect(dash.tagName).toBe('UL')
    await expect(dash).toHaveClass('dash')
    const ordered = dash.querySelector(':scope > li > .krds-info-list')!
    await expect(ordered.tagName).toBe('OL')
    await expect(ordered).toHaveClass('ordered')
  }
}
