import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

// 원본 KRDS 마크업(li[role=tab] > button)을 따르므로 탭 요소만 제외한다
const a11yRules = [{ id: 'nested-interactive', selector: '*:not([role="tab"])' }]

const defaultTabs = [
  { id: 'tab1', label: '타이틀 1' },
  { id: 'tab2', label: '타이틀 2' },
  { id: 'tab3', label: '타이틀 3' }
]

describe('KrdsTabs', () => {
  it('기본: ARIA 연결, 클릭 전환, 방향키 초점 이동', async () => {
    const { container } = render({
      setup: () => ({ tabs: defaultTabs }),
      template: `
        <KrdsTabs :tabs="tabs">
          <template #tab1>탭 1 영역</template>
          <template #tab2>탭 2 영역</template>
          <template #tab3>탭 3 영역</template>
        </KrdsTabs>`
    })
    const [firstTab, secondTab] = screen.getAllByRole('tab')
    const firstButton = firstTab.querySelector('button')!
    const secondButton = secondTab.querySelector('button')!

    // 초기 상태: 첫 번째 탭 활성 + ARIA 연결
    expect(firstTab).toHaveAttribute('aria-selected', 'true')
    expect(firstTab).toHaveClass('active')
    const firstPanel = container.querySelector(`#${CSS.escape(firstTab.getAttribute('aria-controls')!)}`)
    expect(firstPanel).toHaveAttribute('role', 'tabpanel')
    expect(firstPanel).toHaveAttribute('aria-labelledby', firstTab.id)
    expect(firstPanel).toHaveClass('active')
    // 초점이 버튼에 있으므로 aria-selected 대신 sr-only 대체 텍스트 제공 (원본 krds_tab 동작)
    expect(firstButton.querySelector('.sr-only')).toHaveTextContent('선택됨')

    // 클릭 시 탭 전환
    await userEvent.click(secondButton)
    expect(secondTab).toHaveAttribute('aria-selected', 'true')
    expect(firstTab).toHaveAttribute('aria-selected', 'false')
    const secondPanel = container.querySelector(`#${CSS.escape(secondTab.getAttribute('aria-controls')!)}`)
    expect(secondPanel).toHaveClass('active')
    expect(firstPanel).not.toHaveClass('active')
    expect(firstButton.querySelector('.sr-only')).toBeNull()

    // 좌우 방향키로 초점 이동
    secondButton.focus()
    await userEvent.keyboard('{ArrowLeft}')
    expect(firstButton).toHaveFocus()
    await userEvent.keyboard('{ArrowRight}')
    expect(secondButton).toHaveFocus()
    await expectNoA11yViolations(a11yRules)
  })

  it('버튼형', async () => {
    render({
      setup: () => ({ tabs: defaultTabs }),
      template: `
        <KrdsTabs :tabs="tabs" variant="fill">
          <template #tab1>탭 1 영역</template>
          <template #tab2>탭 2 영역</template>
          <template #tab3>탭 3 영역</template>
        </KrdsTabs>`
    })
    await expectNoA11yViolations(a11yRules)
  })

  it('풀사이즈', async () => {
    render({
      setup: () => ({
        tabs: [
          { id: 'tab1', label: '타이틀 1' },
          { id: 'tab2', label: '타이틀 2' }
        ]
      }),
      template: `
        <div style="display: flex; flex-direction: column; gap: 4rem;">
          <KrdsTabs :tabs="tabs" full>
            <template #tab1>라인형 풀사이즈 탭 1 영역</template>
            <template #tab2>라인형 풀사이즈 탭 2 영역</template>
          </KrdsTabs>
          <KrdsTabs :tabs="tabs" variant="fill" full>
            <template #tab1>버튼형 풀사이즈 탭 1 영역</template>
            <template #tab2>버튼형 풀사이즈 탭 2 영역</template>
          </KrdsTabs>
        </div>`
    })
    await expectNoA11yViolations(a11yRules)
  })

  it('비활성화: 비활성 탭은 클릭해도 전환되지 않음', async () => {
    render({
      setup: () => ({
        tabs: [
          { id: 'tab1', label: '타이틀 1' },
          { id: 'tab2', label: '타이틀 2', disabled: true },
          { id: 'tab3', label: '타이틀 3' }
        ]
      }),
      template: `
        <KrdsTabs :tabs="tabs">
          <template #tab1>탭 1 영역</template>
          <template #tab2>탭 2 영역</template>
          <template #tab3>탭 3 영역</template>
        </KrdsTabs>`
    })
    const [firstTab, secondTab] = screen.getAllByRole('tab')
    const secondButton = secondTab.querySelector('button')!

    expect(secondButton).toBeDisabled()

    await userEvent.click(secondButton)
    expect(secondTab).toHaveAttribute('aria-selected', 'false')
    expect(firstTab).toHaveAttribute('aria-selected', 'true')
    await expectNoA11yViolations(a11yRules)
  })

  it('외부 제어: v-model 초기값 반영과 갱신', async () => {
    render({
      setup: () => ({ tabs: defaultTabs, activeTab: ref('tab2') }),
      template: `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <p data-testid="active-tab">현재 탭: {{ activeTab }}</p>
          <KrdsTabs :tabs="tabs" v-model="activeTab">
            <template #tab1>탭 1 영역</template>
            <template #tab2>탭 2 영역</template>
            <template #tab3>탭 3 영역</template>
          </KrdsTabs>
        </div>`
    })
    const [firstTab, secondTab] = screen.getAllByRole('tab')

    // 초기 modelValue가 반영된다
    expect(secondTab).toHaveAttribute('aria-selected', 'true')

    // 탭 전환 시 modelValue가 갱신된다
    await userEvent.click(firstTab.querySelector('button')!)
    expect(firstTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByTestId('active-tab')).toHaveTextContent('현재 탭: tab1')
    await expectNoA11yViolations(a11yRules)
  })
})
