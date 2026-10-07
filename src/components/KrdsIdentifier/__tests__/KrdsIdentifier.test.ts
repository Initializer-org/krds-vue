import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, userEvent } from '@/test/utils'

describe('KrdsIdentifier', () => {
  it('기본', async () => {
    const { container } = render({
      template: '<KrdsIdentifier>이 누리집은 보건복지부 누리집입니다.</KrdsIdentifier>'
    })
    const identifier = container.querySelector('.krds-identifier') as HTMLElement
    expect(identifier).toBeTruthy()
    await userEvent.click(identifier)
    await expectNoA11yViolations()
  })
})
