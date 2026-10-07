import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, within } from '@/test/utils'

const tagGroups = (tags: string) => `
  <div>
    <KrdsTagGroup size="large" style="margin-bottom: 1rem;">${tags}</KrdsTagGroup>
    <KrdsTagGroup size="medium" style="margin-bottom: 1rem;">${tags}</KrdsTagGroup>
    <KrdsTagGroup size="small">${tags}</KrdsTagGroup>
  </div>
`

describe('KrdsTag', () => {
  it('기본: .krds-tag-wrap > span.krds-btn-tag > button.btn-delete', async () => {
    render({
      template: `
        <KrdsTagGroup>
          <KrdsTag>버튼</KrdsTag>
        </KrdsTagGroup>
      `
    })

    // KRDS 구조: .krds-tag-wrap > span.krds-btn-tag > button.btn-delete
    const deleteBtn = screen.getByRole('button', { name: '삭제' })
    expect(deleteBtn).toHaveClass('btn-delete')
    expect(deleteBtn).toHaveAttribute('type', 'button')
    const tag = deleteBtn.closest('.krds-btn-tag')!
    expect(tag.tagName).toBe('SPAN')
    expect(tag).not.toHaveClass('link')
    expect(tag).toHaveTextContent('버튼')
    expect(tag.parentElement).toHaveClass('krds-tag-wrap', 'medium')

    await expectNoA11yViolations()
  })

  it('사이즈', async () => {
    render({
      setup: () => ({ handleRemove: (_event: MouseEvent) => {} }),
      template: tagGroups(`
        <KrdsTag @remove="handleRemove">태그</KrdsTag>
        <KrdsTag @remove="handleRemove">태그</KrdsTag>
        <KrdsTag @remove="handleRemove">태그</KrdsTag>`)
    })
    await expectNoA11yViolations()
  })

  it('링크 태그: a.krds-btn-tag.link, target·rel은 지정한 경우에만, 삭제 버튼 없음', async () => {
    render({
      template: tagGroups(`
        <KrdsTag link href="/category1">카테고리</KrdsTag>
        <KrdsTag link href="https://example.com" target="_blank" rel="noopener">외부 링크</KrdsTag>
        <KrdsTag link href="/filter/tag">필터 태그</KrdsTag>`)
    })

    // 링크 태그는 a.krds-btn-tag.link로 렌더링
    const [category] = screen.getAllByRole('link', { name: '카테고리' })
    expect(category).toHaveClass('krds-btn-tag', 'link')
    expect(category).toHaveAttribute('href', '/category1')
    // target·rel은 지정한 경우에만 출력
    expect(category).not.toHaveAttribute('target')
    expect(category).not.toHaveAttribute('rel')
    const [external] = screen.getAllByRole('link', { name: '외부 링크' })
    expect(external).toHaveAttribute('target', '_blank')
    expect(external).toHaveAttribute('rel', 'noopener')

    // 링크 태그에는 삭제 버튼 없음
    expect(screen.getAllByRole('link')).toHaveLength(9)
    expect(screen.queryByRole('button')).toBeNull()

    await expectNoA11yViolations()
  })

  it('슬롯 사용: 삭제 버튼 클릭·Enter로 remove, 링크 태그는 유지', async () => {
    render({
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
    })
    const tagOf = (text: string) => screen.getByText(text).closest('.krds-btn-tag') as HTMLElement

    // 삭제 버튼 클릭 시 remove 이벤트로 태그 제거
    await userEvent.click(within(tagOf('커스텀 내용 1')).getByRole('button', { name: '삭제' }))
    expect(screen.queryByText('커스텀 내용 1')).toBeNull()

    // 키보드(Enter)로도 삭제
    within(tagOf('커스텀 내용 2')).getByRole('button', { name: '삭제' }).focus()
    await userEvent.keyboard('{Enter}')
    expect(screen.queryByText('커스텀 내용 2')).toBeNull()

    // 링크 태그는 그대로 유지
    expect(screen.getByRole('link', { name: '링크 태그' })).toBeInTheDocument()

    await expectNoA11yViolations()
  })
})
