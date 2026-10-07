import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsInput', () => {
  it('기본: 포커스·입력·블러', async () => {
    render({
      template: `
        <div class="fieldset">
          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name" placeholder="플레이스홀더" />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>

          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name2">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name2" placeholder="플레이스홀더" modelValue="readonly" readonly />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>

          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name3">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name3" placeholder="플레이스홀더" modelValue="disabled" disabled />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>
        </div>
      `
    })
    const input = screen.getAllByRole('textbox')[0]

    await userEvent.click(input)
    expect(input).toHaveFocus()

    await userEvent.type(input, 'Hello')
    expect(input).toHaveValue('Hello')

    await userEvent.tab()
    expect(input).not.toHaveFocus()
    await expectNoA11yViolations()
  })

  it('상태: 힌트 type별 클래스', async () => {
    const { container } = render({
      template: `
        <div class="fieldset">
          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name21">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name21" placeholder="플레이스홀더" modelValue="에러" state="error" />
            <KrdsFormHint type="error">에러 메시지</KrdsFormHint>
          </KrdsFormGroup>

          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name22">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name22" placeholder="플레이스홀더" modelValue="성공" state="success" />
            <KrdsFormHint type="success">성공 메시지</KrdsFormHint>
          </KrdsFormGroup>

          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name23">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name23" placeholder="플레이스홀더" modelValue="정보" state="information" />
            <KrdsFormHint type="information">정보 메시지</KrdsFormHint>
          </KrdsFormGroup>
        </div>
      `
    })
    // KrdsFormHint type별 클래스 매핑
    expect(container.querySelector('.form-hint-invalid')).toHaveTextContent('에러 메시지')
    expect(container.querySelector('.form-hint-success')).toHaveTextContent('성공 메시지')
    expect(container.querySelector('.form-hint-information')).toHaveTextContent('정보 메시지')
    await expectNoA11yViolations()
  })

  it('사이즈', async () => {
    render({
      template: `
        <div class="fieldset">
          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name31">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name31" placeholder="플레이스홀더" size="small" />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>

          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name32">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name32" placeholder="플레이스홀더" size="medium" />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>

          <KrdsFormGroup>
            <KrdsFormLabel for="consult_name33">레이블</KrdsFormLabel>
            <KrdsInput id="consult_name33" placeholder="플레이스홀더" size="large" />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('로딩', async () => {
    render({
      template: `
        <div class="fieldset">
          <KrdsFormGroup>
            <KrdsFormLabel for="loading_input">레이블</KrdsFormLabel>
            <KrdsInput id="loading_input" placeholder="플레이스홀더" loading />
            <KrdsFormHint>데이터를 불러오는 중입니다</KrdsFormHint>
          </KrdsFormGroup>

          <KrdsFormGroup>
            <KrdsFormLabel for="loading_input2">레이블</KrdsFormLabel>
            <KrdsInput id="loading_input2" placeholder="플레이스홀더" modelValue="입력된 값" loading />
            <KrdsFormHint>검증 중입니다</KrdsFormHint>
          </KrdsFormGroup>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('아이콘 버튼', async () => {
    render({
      template: `
        <div class="fieldset">
          <!-- 패스워드 보기 버튼 (숨김) -->
          <KrdsFormGroup>
            <KrdsFormLabel for="login_pw">레이블</KrdsFormLabel>
            <KrdsInput
              id="login_pw"
              type="password"
              placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
              modelValue="1234567890"
              icon
            >
              <KrdsButton type="button" size="medium" icon>
                <span class="sr-only">입력한 비밀번호 보기</span>
                <KrdsIcon name="ico-pw-visible" />
              </KrdsButton>
            </KrdsInput>
          </KrdsFormGroup>

          <!-- 패스워드 보기 버튼 (보임) -->
          <KrdsFormGroup>
            <KrdsFormLabel for="login_pw2">레이블</KrdsFormLabel>
            <KrdsInput
              id="login_pw2"
              type="text"
              placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
              modelValue="1234567890"
              icon
            >
              <KrdsButton type="button" size="medium" icon>
                <span class="sr-only">입력한 비밀번호 가리기</span>
                <KrdsIcon name="ico-pw-visible-on" />
              </KrdsButton>
            </KrdsInput>
          </KrdsFormGroup>

          <!-- 삭제 버튼 -->
          <KrdsFormGroup>
            <KrdsFormLabel for="form_delete">레이블</KrdsFormLabel>
            <KrdsInput
              id="form_delete"
              placeholder="내용을 입력하세요"
              icon
              data-delete="true"
            >
              <KrdsButton type="button" size="medium" icon pure class="btn-delete-input">
                <span class="sr-only">내용 삭제</span>
                <KrdsIcon name="ico-delete-fill" />
              </KrdsButton>
            </KrdsInput>
          </KrdsFormGroup>

          <!-- 다중 버튼 -->
          <KrdsFormGroup>
            <KrdsFormLabel for="form_btn_multiple">레이블</KrdsFormLabel>
            <KrdsInput
              id="form_btn_multiple"
              type="password"
              placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
              modelValue="1234567890"
              icon
              data-delete="true"
            >
              <KrdsButtonGroup>
                <KrdsButton type="button" size="medium" icon pure class="btn-delete-input">
                  <span class="sr-only">내용 삭제</span>
                  <KrdsIcon name="ico-delete-fill" />
                </KrdsButton>
                <KrdsButton type="button" size="medium" icon>
                  <span class="sr-only">입력한 비밀버호 보기</span>
                  <KrdsIcon name="ico-pw-visible" />
                </KrdsButton>
              </KrdsButtonGroup>
            </KrdsInput>
          </KrdsFormGroup>
        </div>
      `
    })
    await expectNoA11yViolations()
  })
})
