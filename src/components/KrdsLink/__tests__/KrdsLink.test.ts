import { describe, it } from 'vitest'
import { expectNoA11yViolations, render } from '@/test/utils'

describe('KrdsLink', () => {
  it('기본', async () => {
    render({
      template: `
        <KrdsLink href="https://www.site_name.com/" size="small" target="_blank" title="새 창 열림">
          <span class="underline">기본 링크</span> <i class="svg-icon ico-go"></i>
        </KrdsLink>
      `
    })
    await expectNoA11yViolations()
  })

  it('모든 링크 변형', async () => {
    render({
      template: `
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <KrdsLink href="#!" size="medium" pure>
            <span class="underline">가상클래스 상태 시 컬러 유지</span>
          </KrdsLink>

          <KrdsLink href="#!" size="large" basic target="_blank" title="새 창 열림">
            <span class="underline">본문 텍스트 컬러 링크</span> <i class="svg-icon ico-go"></i>
          </KrdsLink>

          <KrdsLink href="#!" size="large" basic>
            <span class="underline hidden-underline">가상클래스 상태 시 밑줄</span>
          </KrdsLink>

          <KrdsLink href="#!" size="large" basic>
            <span>밑줄 없음</span>
          </KrdsLink>
        </div>
      `
    })
    await expectNoA11yViolations()
  })
})
