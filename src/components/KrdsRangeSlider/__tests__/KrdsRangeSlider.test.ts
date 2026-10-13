import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { userEvent } from 'vitest/browser'
import { expectNoA11yViolations, render, screen } from '@/test/utils'

const sizes = ['작게', '보통', '조금 크게', '크게', '아주 크게']

describe('KrdsRangeSlider', () => {
  it('기본: 레이블, 키보드로 값 변경, 값 글자는 화면과 aria-valuetext에', async () => {
    const changes: number[] = []
    const { container } = render({
      setup: () => ({ size: ref(2), sizes, changes }),
      template: `<KrdsRangeSlider v-model="size" label="글자 크기" :max="4" :value-text="v => sizes[v]" @change="v => changes.push(v)" />`
    })
    const slider = screen.getByRole('slider', { name: '글자 크기' })
    expect(slider).toHaveAttribute('aria-valuetext', '조금 크게')
    expect(container.querySelector('.range-value')).toHaveTextContent('조금 크게')
    expect(container.querySelector('.range-limits')).toHaveTextContent('작게아주 크게')
    // 양 끝을 뺀 단계 눈금 3개
    expect(container.querySelectorAll('.range-tick')).toHaveLength(3)

    // 방향키로 값이 바뀌는 것은 브라우저 기본 동작이라 실제 키 입력(Playwright)으로 확인
    slider.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(slider).toHaveAttribute('aria-valuetext', '크게')
    expect(container.querySelector('.range-value')).toHaveTextContent('크게')
    await userEvent.keyboard('{Home}')
    expect(slider).toHaveValue('0')
    expect(changes).toEqual([3, 0])
    await expectNoA11yViolations()
  })

  it('선택 값을 슬라이더 끝에, 단계가 많으면 눈금 없음', async () => {
    const { container } = render({
      setup: () => ({ volume: ref(50) }),
      template: `<KrdsRangeSlider v-model="volume" label="음량" value-position="end" :value-text="v => v + '%'" />`
    })
    expect(container.querySelector('.range-body > .range-value')).toHaveTextContent('50%')
    expect(container.querySelector('.range-field .range-value')).toBeNull()
    expect(container.querySelectorAll('.range-tick')).toHaveLength(0)
    expect(screen.getByRole('slider', { name: '음량' })).toHaveAttribute('aria-valuetext', '50%')
    await expectNoA11yViolations()
  })
})
