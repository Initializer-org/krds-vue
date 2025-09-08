import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsTag from './KrdsTag'
import KrdsTagGroup from '../KrdsTagGroup/KrdsTagGroup'

const meta: Meta<typeof KrdsTag> = {
  title: 'Components/Selection/KrdsTag',
  component: KrdsTag,
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
  })
}

// 1. 사이즈별 태그 그룹
export const Sizes: Story = {
  name: '사이즈',
  render: () => ({
    components: { KrdsTag, KrdsTagGroup },
    setup() {
      const handleRemove = (_event: MouseEvent) => {
        // console.log('태그 삭제:', event)
      }
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
  })
}

// 3. 슬롯 사용
export const WithSlot: Story = {
  name: '슬롯 사용',
  render: () => ({
    components: { KrdsTag, KrdsTagGroup },
    setup() {
      const handleRemove = (_event: MouseEvent) => {
        // console.log('태그 삭제:', event)
      }
      return { handleRemove }
    },
    template: `
      <KrdsTagGroup size="medium">
        <KrdsTag @remove="handleRemove">커스텀 내용 1</KrdsTag>
        <KrdsTag link href="/custom-page">링크 태그</KrdsTag>
        <KrdsTag @remove="handleRemove">커스텀 내용 2</KrdsTag>
      </KrdsTagGroup>
    `
  })
}
