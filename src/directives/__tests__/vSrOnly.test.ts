import { describe, it } from 'vitest'
import { expectNoA11yViolations, render } from '@/test/utils'

describe('v-sr-only', () => {
  it('기본', async () => {
    render({
      template: `
        <div>
          <p>일반 텍스트입니다.</p>
          <span v-sr-only>스크린 리더 전용 텍스트입니다.</span>
          <p>다시 일반 텍스트입니다.</p>
        </div>
      `
    })
    await expectNoA11yViolations()
  })
})
