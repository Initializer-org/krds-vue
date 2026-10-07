import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, within } from 'storybook/test'
import { ref } from 'vue'
import KrdsTag from './KrdsTag'
import KrdsTagGroup from '../KrdsTagGroup/KrdsTagGroup'

const meta: Meta<typeof KrdsTag> = {
  title: 'Components/Selection/KrdsTag',
  component: KrdsTag,
  subcomponents: { KrdsTagGroup },
  parameters: {
    docs: {
      description: {
        component:
          '태그는 키워드 또는 레이블을 사용하여 콘텐츠를 분류하는 수단이다. 콘텐츠 항목에 직접 관련 분류 체계, 데이터 속성을 표시하거나, 목록에서 특정 분류 체계, 데이터 속성을 가진 항목이 선택되었음을 보여주기 위한 태그 그룹으로 사용된다.'
      }
    }
  },
  argTypes: {
    link: {
      control: 'boolean',
      description: '링크 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: '기본',
  render: args => ({
    components: { KrdsTag, KrdsTagGroup },
    setup() {
      return { args }
    },
    template: `
      <KrdsTagGroup>
        <KrdsTag v-bind="args">버튼</KrdsTag>
      </KrdsTagGroup>
    `
  }),
  play: async ({ canvas }) => {
    // KRDS 구조: .krds-tag-wrap > span.krds-btn-tag > button.btn-delete
    const deleteBtn = canvas.getByRole('button', { name: '삭제' })
    await expect(deleteBtn).toHaveClass('btn-delete')
    await expect(deleteBtn).toHaveAttribute('type', 'button')
    const tag = deleteBtn.closest('.krds-btn-tag')!
    await expect(tag.tagName).toBe('SPAN')
    await expect(tag).not.toHaveClass('link')
    await expect(tag).toHaveTextContent('버튼')
    await expect(tag.parentElement).toHaveClass('krds-tag-wrap', 'medium')
  }
}

// 1. 사이즈별 태그 그룹
export const Sizes: Story = {
  name: '사이즈',
  render: () => ({
    components: { KrdsTag, KrdsTagGroup },
    setup() {
      const handleRemove = (_event: MouseEvent) => {}
      return { handleRemove }
    },
    template: `
      <div>
        <!-- Large 크기 그룹 -->
        <KrdsTagGroup size="large" style="margin-bottom: 1rem;">
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
        </KrdsTagGroup>
        
        <!-- Medium 크기 그룹 -->
        <KrdsTagGroup size="medium" style="margin-bottom: 1rem;">
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
        </KrdsTagGroup>
        
        <!-- Small 크기 그룹 -->
        <KrdsTagGroup size="small">
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
          <KrdsTag @remove="handleRemove">태그</KrdsTag>
        </KrdsTagGroup>
      </div>
    `
  })
}

// 2. 링크 태그
export const LinkTag: Story = {
  name: '링크 태그',
  render: () => ({
    components: { KrdsTag, KrdsTagGroup },
    template: `
      <div>
        <!-- Large 크기 그룹 -->
        <KrdsTagGroup size="large" style="margin-bottom: 1rem;">
          <KrdsTag link href="/category1">카테고리</KrdsTag>
          <KrdsTag link href="https://example.com" target="_blank" rel="noopener">외부 링크</KrdsTag>
          <KrdsTag link href="/filter/tag">필터 태그</KrdsTag>
        </KrdsTagGroup>
        
        <!-- Medium 크기 그룹 -->
        <KrdsTagGroup size="medium" style="margin-bottom: 1rem;">
          <KrdsTag link href="/category1">카테고리</KrdsTag>
          <KrdsTag link href="https://example.com" target="_blank" rel="noopener">외부 링크</KrdsTag>
          <KrdsTag link href="/filter/tag">필터 태그</KrdsTag>
        </KrdsTagGroup>
        
        <!-- Small 크기 그룹 -->
        <KrdsTagGroup size="small">
          <KrdsTag link href="/category1">카테고리</KrdsTag>
          <KrdsTag link href="https://example.com" target="_blank" rel="noopener">외부 링크</KrdsTag>
          <KrdsTag link href="/filter/tag">필터 태그</KrdsTag>
        </KrdsTagGroup>
      </div>
    `
  }),
  play: async ({ canvas }) => {
    // 링크 태그는 a.krds-btn-tag.link로 렌더링
    const [category] = canvas.getAllByRole('link', { name: '카테고리' })
    await expect(category).toHaveClass('krds-btn-tag', 'link')
    await expect(category).toHaveAttribute('href', '/category1')
    // target·rel은 지정한 경우에만 출력
    await expect(category).not.toHaveAttribute('target')
    await expect(category).not.toHaveAttribute('rel')
    const [external] = canvas.getAllByRole('link', { name: '외부 링크' })
    await expect(external).toHaveAttribute('target', '_blank')
    await expect(external).toHaveAttribute('rel', 'noopener')

    // 링크 태그에는 삭제 버튼 없음
    await expect(canvas.getAllByRole('link')).toHaveLength(9)
    await expect(canvas.queryByRole('button')).toBeNull()
  }
}

// 3. 슬롯 사용
export const WithSlot: Story = {
  name: '슬롯 사용',
  render: () => ({
    components: { KrdsTag, KrdsTagGroup },
    setup() {
      const tags = ref(['커스텀 내용 1', '커스텀 내용 2'])
      const handleRemove = (tag: string) => {
        tags.value = tags.value.filter(t => t !== tag)
      }
      return { tags, handleRemove }
    },
    template: `
      <KrdsTagGroup size="medium">
        <KrdsTag v-for="tag in tags" :key="tag" @remove="handleRemove(tag)">{{ tag }}</KrdsTag>
        <KrdsTag link href="/custom-page">링크 태그</KrdsTag>
      </KrdsTagGroup>
    `
  }),
  play: async ({ canvas, userEvent }) => {
    const tagOf = (text: string) => canvas.getByText(text).closest('.krds-btn-tag') as HTMLElement

    // 삭제 버튼 클릭 시 remove 이벤트로 태그 제거
    await userEvent.click(within(tagOf('커스텀 내용 1')).getByRole('button', { name: '삭제' }))
    await expect(canvas.queryByText('커스텀 내용 1')).toBeNull()

    // 키보드(Enter)로도 삭제
    within(tagOf('커스텀 내용 2')).getByRole('button', { name: '삭제' }).focus()
    await userEvent.keyboard('{Enter}')
    await expect(canvas.queryByText('커스텀 내용 2')).toBeNull()

    // 링크 태그는 그대로 유지
    await expect(canvas.getByRole('link', { name: '링크 태그' })).toBeInTheDocument()
  }
}
