import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, userEvent } from '@/test/utils'
import KrdsBreadcrumb from '../KrdsBreadcrumb'
import type { BreadcrumbItem } from '../KrdsBreadcrumb'

const defaultItems: BreadcrumbItem[] = [
  { text: '홈', href: '#', onClick: e => e.preventDefault() },
  { text: '서비스 신청', href: '#', onClick: e => e.preventDefault() },
  { text: '서비스 신청2' }
]

describe('KrdsBreadcrumb', () => {
  it('기본', async () => {
    const { container } = render(KrdsBreadcrumb, {
      props: { items: defaultItems, ariaLabel: '현재 경로', showHomeIcon: true }
    })

    const links = container.querySelectorAll('.breadcrumb a.txt')
    expect(links.length).toBeGreaterThan(0)

    // 두 번째 항목(서비스 신청) 클릭
    if (links.length > 1) {
      await userEvent.click(links[1] as HTMLElement)
    }
    await expectNoA11yViolations()
  })
})
