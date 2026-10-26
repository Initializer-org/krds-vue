import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

const help = (label: string, attrs = '') => `
  <div style="display: flex; align-items: center; gap: 8px">
    <p>${label}</p>
    <KrdsContextualHelp ${attrs}>
      <p>컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움 아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에
        표시된다.</p>
      <div class="btn-wrap">
        <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
      </div>
    </KrdsContextualHelp>
  </div>
`

const column = (height: number, content: string) => ({
  template: `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: ${height}px">
      ${content}
    </div>
  `
})

describe('KrdsContextualHelp', () => {
  it('기본: 도움말 버튼으로 열고 닫기 버튼으로 닫힘', async () => {
    render(column(500, help('예시이미지(상단 왼쪽)')))
    const tooltipBtn = screen.getByRole('button', { name: '도움말' })
    await userEvent.click(tooltipBtn)

    await waitFor(() => {
      expect(tooltipBtn).toHaveAttribute('aria-expanded', 'true')
    })

    // 안에 링크·버튼이 있으므로 제목으로 이름 붙인 대화 상자이고, 버튼이 aria-controls로 가리킨다
    const dialog = screen.getByRole('dialog', { name: '도움말 제목' })
    expect(tooltipBtn).toHaveAttribute('aria-controls', dialog.id)
    await expectNoA11yViolations()

    // 닫기 버튼으로 닫으면 도움말 버튼으로 초점
    const closeBtn = screen.getByRole('button', { name: '닫기' })
    await userEvent.click(closeBtn)

    await waitFor(() => {
      expect(tooltipBtn).toHaveAttribute('aria-expanded', 'false')
    })
    expect(tooltipBtn).toHaveFocus()

    // Esc로 닫아도 도움말 버튼으로 초점 (열면 첫 링크로 초점이 가 있음)
    await userEvent.click(tooltipBtn)
    await waitFor(() => expect(screen.getByRole('link', { name: '바로가기' })).toHaveFocus())
    await userEvent.keyboard('{Escape}')
    expect(tooltipBtn).toHaveAttribute('aria-expanded', 'false')
    expect(tooltipBtn).toHaveFocus()
    await expectNoA11yViolations()
  })

  it('위치', async () => {
    render(
      column(
        800,
        [
          help('예시이미지(상단 왼쪽)', 'title="도움말 제목"'),
          help('예시이미지(상단 중앙)', 'title="도움말 제목" position="top center"'),
          help('예시이미지(상단 오른쪽)', 'title="도움말 제목" position="top right"'),
          help('예시이미지(하단 왼쪽)', 'title="도움말 제목" position="bottom left"'),
          help('예시이미지(하단 중앙)', 'title="도움말 제목" position="bottom center"'),
          help('예시이미지(하단 오른쪽)', 'title="도움말 제목" position="bottom right"')
        ].join('')
      )
    )
    await expectNoA11yViolations()
  })

  it('도움말 아이콘', async () => {
    render(column(500, help('예시이미지(상단 왼쪽)', 'title="도움말 제목" help-icon')))
    await expectNoA11yViolations()
  })
})
