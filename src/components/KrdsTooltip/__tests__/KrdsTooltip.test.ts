import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

const tooltips = (modifier = '', height = 300) => ({
  template: `
    <div style="height: ${height}px;">
      <div style="display: flex; align-items: flex-start; gap: 10px">
        <KrdsTooltip ${modifier} tooltip-content="툴팁의 기본 설정입니다">
          tooltip-horizontal <i class="svg-icon ico-angle right"></i>
        </KrdsTooltip>
        <KrdsTooltip ${modifier} type="icon" tooltip-content="아이콘 버튼에 제공되는 툴팁">
          <span class="sr-only">도움말</span>
          <i class="svg-icon ico-help"></i>
        </KrdsTooltip>
        <KrdsTooltip ${modifier} type="button" tooltip-content="버튼에 제공되는 툴팁">
          도움말
        </KrdsTooltip>
      </div>
    </div>
  `
})

describe('KrdsTooltip', () => {
  it('기본: hover 시 툴팁 표시, unhover 시 숨김', async () => {
    render(tooltips())
    const firstBtn = screen.getAllByRole('button')[0]

    await userEvent.hover(firstBtn)
    await waitFor(() => {
      expect(screen.getByText('툴팁의 기본 설정입니다')).toBeVisible()
    })

    await userEvent.unhover(firstBtn)
    await waitFor(() => {
      expect(screen.getByText('툴팁의 기본 설정입니다')).not.toBeVisible()
    })
    await expectNoA11yViolations()
  })

  it('tooltipVertical', async () => {
    render(tooltips('vertical'))
    await expectNoA11yViolations()
  })

  it('tooltipBox', async () => {
    render(tooltips('box', 500))
    await expectNoA11yViolations()
  })
})
