import { describe, it } from 'vitest'
import { expectNoA11yViolations, render } from '@/test/utils'

describe('KrdsSpinner', () => {
  it('기본', async () => {
    render({ template: '<div style="position: relative; height: 200px;"><KrdsSpinner /></div>' })
    await expectNoA11yViolations()
  })

  it('라벨 포함', async () => {
    render({ template: '<div style="position: relative; height: 200px;"><KrdsSpinner label="Loading data.." /></div>' })
    await expectNoA11yViolations()
  })

  it('입력 필드 로딩', async () => {
    render({
      template: `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div class="form-group">
            <div class="form-tit">
              <label for="loading_example1">Label</label>
            </div>
            <div class="form-conts">
              <div class="form-spinner">
                <input type="text" id="loading_example1" class="krds-input" placeholder="placeholder">
                <KrdsSpinner />
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-tit">
              <label for="loading_example2">검증 중</label>
            </div>
            <div class="form-conts">
              <div class="form-spinner">
                <input type="text" id="loading_example2" class="krds-input" value="입력된 값" placeholder="placeholder">
                <KrdsSpinner />
              </div>
            </div>
          </div>
        </div>
      `
    })
    await expectNoA11yViolations()
  })
})
