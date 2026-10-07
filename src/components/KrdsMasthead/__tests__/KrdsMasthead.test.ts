import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, userEvent } from '@/test/utils'

describe('KrdsMasthead', () => {
  it('기본', async () => {
    const { container } = render({
      template: '<KrdsMasthead>이 누리집은 대한민국 공식 전자정부 누리집입니다.</KrdsMasthead>'
    })
    const masthead = container.querySelector('#krds-masthead') as HTMLElement
    expect(masthead).toBeTruthy()
    await userEvent.click(masthead)
    await expectNoA11yViolations()
  })
})
