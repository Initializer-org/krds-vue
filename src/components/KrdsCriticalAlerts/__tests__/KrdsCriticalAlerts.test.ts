import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsCriticalAlerts', () => {
  it('기본: 배지·메시지·링크 구조, 클릭·Enter 모두 link-click 전달', async () => {
    const { container } = render({
      setup: () => ({ clickCount: ref(0) }),
      template: `
        <KrdsCriticalAlerts type="danger" message="긴급 공지 내용 표시" link-href="#" link-text="자세히 보기" @link-click="clickCount++" />
        <p data-testid="click-count">링크 클릭: {{ clickCount }}회</p>
      `
    })
    // <a href="#"> 이동 차단
    container.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).closest('a')) e.preventDefault()
    })

    // KRDS 구조: ul.krds-critical-alerts > li > .critical-ban
    const banner = container.querySelector('ul.krds-critical-alerts > li > .critical-ban')!
    expect(banner).toBeInTheDocument()

    // 타입별 배지 클래스·텍스트
    const badge = banner.querySelector('.critical-badge')
    expect(badge).toHaveClass('danger')
    expect(badge).toHaveTextContent('긴급')
    expect(banner.querySelector('.critical-txt')).toHaveTextContent('긴급 공지 내용 표시')

    // 링크
    const link = screen.getByRole('link', { name: '자세히 보기' })
    expect(link).toHaveAttribute('href', '#')
    expect(link).toHaveClass('krds-btn', 'medium', 'link', 'basic')

    // 클릭·Enter 모두 link-click 이벤트 전달
    await userEvent.click(link)
    expect(screen.getByTestId('click-count')).toHaveTextContent('링크 클릭: 1회')
    link.focus()
    await userEvent.keyboard('{Enter}')
    expect(screen.getByTestId('click-count')).toHaveTextContent('링크 클릭: 2회')
    await expectNoA11yViolations()
  })

  it('타입: 타입별 배지, linkHref 없으면 링크 미표시', async () => {
    const { container } = render({
      template: `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <KrdsCriticalAlerts type="danger" message="긴급 공지 내용 표시" link-href="#" />
          <KrdsCriticalAlerts type="ok" message="안전 공지 내용 표시" link-href="#" />
          <KrdsCriticalAlerts type="info" message="안내 공지 내용 표시" />
        </div>
      `
    })
    // 타입별 배지 텍스트
    const badges = container.querySelectorAll('.critical-badge')
    expect(badges[0]).toHaveClass('danger')
    expect(badges[0]).toHaveTextContent('긴급')
    expect(badges[1]).toHaveClass('ok')
    expect(badges[1]).toHaveTextContent('안전')
    expect(badges[2]).toHaveClass('info')
    expect(badges[2]).toHaveTextContent('안내')

    // linkHref가 없으면 링크 미표시, linkText 기본값은 '자세히 보기'
    expect(screen.getAllByRole('link', { name: '자세히 보기' })).toHaveLength(2)
    const infoBanner = badges[2].closest('.critical-ban')!
    expect(infoBanner.querySelector('a')).toBeNull()
    await expectNoA11yViolations()
  })
})
