import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

const renderToggle = (props = '', initial = 1) =>
  render({
    setup: () => ({ count: ref(initial) }),
    template: `<KrdsQuantityToggle v-model="count" label="관람 인원" ${props} />`
  })

describe('KrdsQuantityToggle', () => {
  it('기본: 버튼으로 증감하고 끝값에서 버튼 비활성화, 누른 뒤 초점은 수량 값', async () => {
    renderToggle(':min="1" :max="3"')
    const value = screen.getByRole('spinbutton', { name: '관람 인원' })
    const minus = screen.getByRole('button', { name: '관람 인원 감소' })
    const plus = screen.getByRole('button', { name: '관람 인원 증가' })

    expect(value).toHaveAttribute('aria-valuenow', '1')
    expect(minus).toBeDisabled()

    await userEvent.click(plus)
    await userEvent.click(plus)
    expect(value).toHaveTextContent('3')
    expect(plus).toBeDisabled()
    expect(value).toHaveFocus()

    await userEvent.click(minus)
    expect(value).toHaveAttribute('aria-valuenow', '2')
    await expectNoA11yViolations()
  })

  it('키보드: ↑/↓ 1씩, Home/End 최솟값/최댓값, 범위 밖으로는 안 바뀜', async () => {
    renderToggle(':min="0" :max="5"', 0)
    const value = screen.getByRole('spinbutton')

    await userEvent.tab()
    expect(value).toHaveFocus()
    await userEvent.keyboard('{ArrowDown}')
    expect(value).toHaveAttribute('aria-valuenow', '0')
    await userEvent.keyboard('{ArrowUp}{ArrowUp}')
    expect(value).toHaveAttribute('aria-valuenow', '2')
    await userEvent.keyboard('{End}')
    expect(value).toHaveAttribute('aria-valuenow', '5')
    await userEvent.keyboard('{ArrowUp}')
    expect(value).toHaveAttribute('aria-valuenow', '5')
    await userEvent.keyboard('{Home}')
    expect(value).toHaveAttribute('aria-valuenow', '0')
  })

  it('세로형: + 버튼이 위, 레이블 숨김', async () => {
    renderToggle('vertical hide-label')
    const [first, last] = screen.getAllByRole('button')
    expect(first).toHaveAccessibleName('관람 인원 증가')
    expect(last).toHaveAccessibleName('관람 인원 감소')
    expect(screen.getByRole('spinbutton', { name: '관람 인원' })).toBeInTheDocument()
    await expectNoA11yViolations()
  })

  it('비활성화: 버튼·키보드 모두 막힘', async () => {
    renderToggle('disabled', 2)
    const value = screen.getByRole('spinbutton')
    screen.getAllByRole('button').forEach(button => expect(button).toBeDisabled())
    expect(value).toHaveAttribute('aria-disabled', 'true')

    value.focus()
    await userEvent.keyboard('{ArrowUp}')
    expect(value).toHaveAttribute('aria-valuenow', '2')
    await expectNoA11yViolations()
  })
})
