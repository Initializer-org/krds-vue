import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

describe('KrdsSkipLink', () => {
  it('기본: 첫 Tab에 초점을 받으면 화면에 노출', async () => {
    const { container } = render({
      template: `
        <div>
          <KrdsSkipLink href="#main-content">본문 바로가기</KrdsSkipLink>
          <div style="margin-top: 20px; padding: 20px; border: 1px dashed #ccc;">
            <p><strong>사용법:</strong> Tab 키를 눌러 건너뛰기 링크에 포커스를 맞춰보세요.</p>
            <p>실제 사용 시에는 페이지 최상단에 배치하고, 포커스를 받기 전까지는 화면에서 숨겨집니다.</p>
          </div>
          <div id="main-content" style="margin-top: 100px; padding: 20px; background: #f5f5f5;">
            <h2>주요 콘텐츠 영역</h2>
            <p>이곳이 건너뛰기 링크의 대상이 되는 주요 콘텐츠 영역입니다.</p>
          </div>
        </div>
      `
    })
    const link = screen.getByRole('link', { name: '본문 바로가기' })

    // KRDS 구조: #krds-skip-link > a, href는 본문 영역을 가리킴
    expect(link.parentElement).toHaveAttribute('id', 'krds-skip-link')
    expect(link).toHaveAttribute('href', '#main-content')
    expect(container.querySelector('#main-content')).toBeInTheDocument()

    // 초점 전에는 화면에서 숨김(sr-only)
    expect(link.getBoundingClientRect().height).toBeLessThanOrEqual(1)

    // 첫 Tab에 초점을 받고 화면에 노출 (전역 transition이 있어 대기)
    await userEvent.tab()
    expect(link).toHaveFocus()
    await waitFor(() => expect(link.getBoundingClientRect().height).toBeGreaterThan(1))
    await expectNoA11yViolations()
  })

  it('여러 링크: 래퍼 하나에 Tab 순서대로 이동', async () => {
    const { container } = render({
      template: `
        <div>
          <KrdsSkipLink :links="links" />
          <nav id="gnb" aria-label="메인메뉴" style="padding: 20px; border: 1px dashed #ccc;">메인메뉴 영역</nav>
          <div id="main-content" style="margin-top: 20px; padding: 20px; background: #f5f5f5;">
            <h2>주요 콘텐츠 영역</h2>
          </div>
        </div>
      `,
      setup: () => ({
        links: [
          { href: '#main-content', label: '본문 바로가기' },
          { href: '#gnb', label: '메인메뉴 바로가기' }
        ]
      })
    })
    // 링크가 여러 개여도 #krds-skip-link 래퍼는 하나
    const wrappers = container.querySelectorAll('#krds-skip-link')
    expect(wrappers).toHaveLength(1)
    const links = Array.from(wrappers[0].querySelectorAll('a'))
    expect(links.map(a => a.getAttribute('href'))).toEqual(['#main-content', '#gnb'])
    expect(screen.getByRole('link', { name: '메인메뉴 바로가기' })).toBe(links[1])

    // 첫 Tab은 첫 링크, 다음 Tab은 두 번째 링크
    await userEvent.tab()
    expect(links[0]).toHaveFocus()
    expect(links[0]).toHaveTextContent('본문 바로가기')
    await userEvent.tab()
    expect(links[1]).toHaveFocus()
    await expectNoA11yViolations()
  })
})
