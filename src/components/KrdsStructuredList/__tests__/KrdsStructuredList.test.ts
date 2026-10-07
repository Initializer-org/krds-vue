import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen } from '@/test/utils'

describe('KrdsStructuredList', () => {
  it('기본: 슬롯이 .in 안에 card-top·card-body·card-btm·card-btn 순서로 감싸짐', async () => {
    render({
      setup: () => ({ args: { full: true } }),
      template: `
        <KrdsStructuredList v-bind="args">
          <template #cardTop>
            <KrdsBadge type="bg-light" color="primary">뱃지</KrdsBadge>
          </template>
          <template #cardBody>
            <a href="#" class="c-text">
              <p class="c-tit"><span class="span">타이틀 영역</span></p>
              <p class="c-txt">
                간단한 설명이 들어가는 영역입니다. 최대 3줄까지 작성합니다. 간단한 설명이 들어가는 영역입니다. 간단한 설명이 들어가는 영역입니다.
              </p>
              <p class="c-date">
                <strong class="key">신청 기간</strong>
                <span class="value">2023.00.00-2024.00.00</span>
              </p>
            </a>
            <div class="c-btn">
              <KrdsButton variant="secondary" size="medium">신청하기</KrdsButton>
            </div>
          </template>
          <template #cardBtm>
            <span class="tag">태그</span>
            <span class="tag">태그</span>
          </template>
          <template #cardBtn>
            <KrdsButton variant="tertiary" size="medium" class="text">
              <KrdsIcon name="ico-share" /> 공유하기
            </KrdsButton>
            <KrdsButton variant="tertiary" size="medium" class="text">
              <KrdsIcon name="ico-like" /> 찜하기
            </KrdsButton>
          </template>
        </KrdsStructuredList>
      `
    })

    // ul.krds-structured-list.type-full > li.structured-item 단일 항목
    const list = screen.getByRole('list')
    expect(list).toHaveClass('krds-structured-list', 'type-full')
    const [item] = screen.getAllByRole('listitem')
    expect(item).toHaveClass('structured-item')

    // 슬롯이 .in 안에 card-top·card-body·card-btm·card-btn 순서로 감싸짐
    const inner = item.querySelector(':scope > .in')!
    expect(Array.from(inner.children, el => el.className)).toEqual(['card-top', 'card-body', 'card-btm', 'card-btn'])
    expect(inner.querySelector('.card-body')).toContainElement(screen.getByRole('link', { name: /타이틀 영역/ }))
    expect(inner.querySelector('.card-btn')).toContainElement(screen.getByRole('button', { name: /공유하기/ }))

    await expectNoA11yViolations()
  })

  it('뱃지만 있는 구조: 전달하지 않은 슬롯 영역은 렌더링하지 않음', async () => {
    const { container } = render({
      setup: () => ({ args: { full: true } }),
      template: `
        <KrdsStructuredList v-bind="args">
          <template #cardTop>
            <KrdsBadge type="bg-light" color="success">성공</KrdsBadge>
          </template>
          <template #cardBody>
            <div class="c-text">
              <p class="c-tit"><span class="span">간단한 제목</span></p>
            </div>
          </template>
        </KrdsStructuredList>
      `
    })

    // 전달하지 않은 슬롯 영역은 렌더링하지 않음
    const inner = container.querySelector('.structured-item > .in')!
    expect(Array.from(inner.children, el => el.className)).toEqual(['card-top', 'card-body'])

    await expectNoA11yViolations()
  })
})
