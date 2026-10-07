import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

// 스토리 '기본 전체'와 '사이즈'의 마크업 (두 스토리가 동일)
const allBadges = `
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; gap: 1rem; align-items: center;">
      <KrdsBadge type="outline" color="primary" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="secondary" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="gray" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="point" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="danger" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="warning" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="success" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="information" size="large">label</KrdsBadge>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <KrdsBadge type="bg" color="primary" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="secondary" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="gray" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="point" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="danger" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="warning" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="success" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="information" size="medium">label</KrdsBadge>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <KrdsBadge type="bg-light" color="primary" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="secondary" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="gray" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="point" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="danger" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="warning" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="success" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="information" size="small">label</KrdsBadge>
    </div>
  </div>
`

describe('KrdsBadge', () => {
  it('기본', async () => {
    render({ template: '<KrdsBadge class="custom-badge">label</KrdsBadge>' })
    const badge = screen.getByText('label')
    expect(badge).toBeTruthy()
    await userEvent.click(badge)
    await expectNoA11yViolations()
  })

  it('기본 전체', async () => {
    render({ template: allBadges })
    await expectNoA11yViolations()
  })

  it('넘버 배지', async () => {
    render({
      template: `
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsBadge type="bg" color="primary" number>1234</KrdsBadge>
          <KrdsBadge type="bg" color="point" number>1234</KrdsBadge>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('사이즈', async () => {
    render({ template: allBadges })
    await expectNoA11yViolations()
  })
})
