import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen } from '@/test/utils'

describe('KrdsTextList', () => {
  it('기본 (대시): ul.krds-info-list.dash, 중첩 목록은 상위 li 안에 위치', async () => {
    render({
      setup: () => ({ args: { type: 'ul', variant: 'dash' } }),
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
    const [outer, inner] = screen.getAllByRole('list')

    // KRDS 구조: ul.krds-info-list.<variant>
    expect(outer.tagName).toBe('UL')
    expect(outer).toHaveClass('krds-info-list', 'dash')
    expect(outer.children).toHaveLength(3)

    // 중첩 목록은 상위 항목(li) 안에 위치
    expect(inner.tagName).toBe('UL')
    expect(inner).toHaveClass('krds-info-list', 'hollow')
    expect(inner.parentElement).toBe(outer.children[1])
    expect(inner.children).toHaveLength(2)

    await expectNoA11yViolations()
  })

  it('순서 있는 목록: ol 3단계 중첩, ul/ol 혼합 중첩', async () => {
    render({
      setup: () => ({ args: { type: 'ol', variant: 'ordered' } }),
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
    const lists = screen.getAllByRole('list')

    // type="ol" + ordered: 3단계 중첩 ol.krds-info-list.ordered
    const [level1, level2, level3] = lists
    for (const list of [level1, level2, level3]) {
      expect(list.tagName).toBe('OL')
      expect(list).toHaveClass('krds-info-list', 'ordered')
    }
    expect(level2.closest('li')!.parentElement).toBe(level1)
    expect(level3.closest('li')!.parentElement).toBe(level2)

    // ul/ol 혼합 중첩: ul.decimal > ul.dash > ol.ordered
    const decimal = lists.find(list => list.classList.contains('decimal'))!
    expect(decimal.tagName).toBe('UL')
    const dash = decimal.querySelector(':scope > li > .krds-info-list')!
    expect(dash.tagName).toBe('UL')
    expect(dash).toHaveClass('dash')
    const ordered = dash.querySelector(':scope > li > .krds-info-list')!
    expect(ordered.tagName).toBe('OL')
    expect(ordered).toHaveClass('ordered')

    await expectNoA11yViolations()
  })
})
