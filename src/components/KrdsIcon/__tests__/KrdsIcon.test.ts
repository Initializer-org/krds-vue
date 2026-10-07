import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render } from '@/test/utils'
import KrdsIcon from '../KrdsIcon'

describe('KrdsIcon', () => {
  it('기본: .svg-icon에 name 클래스 적용', async () => {
    const { container } = render(KrdsIcon, { props: { name: 'ico-help' } })
    const icon = container.querySelector('.svg-icon')
    expect(icon).toBeTruthy()
    expect(icon).toHaveClass('ico-help')
    await expectNoA11yViolations()
  })

  it('아이콘 목록', async () => {
    render({
      setup: () => ({
        icons: [
          'ico-angle',
          'ico-calendar',
          'ico-call',
          'ico-del',
          'ico-email',
          'ico-faq',
          'ico-file',
          'ico-filter',
          'ico-global',
          'ico-go',
          'ico-help',
          'ico-like'
        ]
      }),
      template: `
        <ul style="display: flex; flex-wrap: wrap; gap: 1.6rem; list-style: none; padding: 0;">
          <li v-for="icon in icons" :key="icon" style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem; width: 8rem;">
            <KrdsIcon :name="icon" />
            <code style="font-size: 1.2rem;">{{ icon }}</code>
          </li>
        </ul>`
    })
    await expectNoA11yViolations()
  })
})
