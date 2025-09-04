import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsFormInput from './KrdsFormInput'
import KrdsFormGroup from '../KrdsFormGroup/KrdsFormGroup'
import KrdsFormHint from '../KrdsFormHint/KrdsFormHint'
import KrdsFormLabel from '../KrdsFormLabel/KrdsFormLabel'

const meta: Meta<typeof KrdsFormInput> = {
  title: 'Components/KrdsFormInput',
  component: KrdsFormInput,
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: '입력값'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: '입력 타입'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력 크기'
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'information'],
      description: '입력 상태'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 여부'
    },
    autofocus: {
      control: { type: 'boolean' },
      description: '자동 포커스 여부'
    },
    maxlength: {
      control: { type: 'number' },
      description: '최대 글자 수'
    },
    minlength: {
      control: { type: 'number' },
      description: '최소 글자 수'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsFormInput, KrdsFormHint },
    template: `
      <div class="fieldset">
        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name" placeholder="플레이스홀더" />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>

        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name2">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name2" placeholder="플레이스홀더" modelValue="readonly" readonly />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>

        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name3">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name3" placeholder="플레이스홀더" modelValue="disabled" disabled />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>
      </div>
    `
  })
}

// 2. 상태
export const States: Story = {
  name: '상태',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsFormInput, KrdsFormHint },
    template: `
      <div class="fieldset">
        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name21">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name21" placeholder="플레이스홀더" modelValue="에러" state="error" />
          <KrdsFormHint type="error">에러 메시지</KrdsFormHint>
        </KrdsFormGroup>

        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name22">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name22" placeholder="플레이스홀더" modelValue="성공" state="success" />
          <KrdsFormHint type="success">성공 메시지</KrdsFormHint>
        </KrdsFormGroup>

        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name23">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name23" placeholder="플레이스홀더" modelValue="정보" state="information" />
          <KrdsFormHint type="information">정보 메시지</KrdsFormHint>
        </KrdsFormGroup>
      </div>
    `
  })
}

// 3. 사이즈
export const Sizes: Story = {
  name: '사이즈',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsFormInput, KrdsFormHint },
    template: `
      <div class="fieldset">
        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name31">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name31" placeholder="플레이스홀더" size="small" />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>

        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name32">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name32" placeholder="플레이스홀더" size="medium" />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>

        <KrdsFormGroup>
          <KrdsFormLabel for="consult_name33">레이블</KrdsFormLabel>
          <KrdsFormInput id="consult_name33" placeholder="플레이스홀더" size="large" />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>
      </div>
    `
  })
}

// 4. 아이콘 버튼
export const WithIconButtons: Story = {
  name: '아이콘 버튼',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsFormInput, KrdsFormHint },
    template: `
      <div class="fieldset">
        <!-- 패스워드 보기 버튼 (숨김) -->
        <KrdsFormGroup>
          <KrdsFormLabel for="login_pw">레이블</KrdsFormLabel>
          <div class="form-conts btn-ico-wrap">
            <input type="password" id="login_pw" class="krds-input" placeholder="8-12자의 영문자, 숫자, 특수문자 조합" value="1234567890">
            <button type="button" class="krds-btn medium icon">
              <span class="sr-only">입력한 비밀번호 보기</span>
              <i class="svg-icon ico-pw-visible"></i>
            </button>
          </div>
        </KrdsFormGroup>

        <!-- 패스워드 보기 버튼 (보임) -->
        <KrdsFormGroup>
          <KrdsFormLabel for="login_pw2">레이블</KrdsFormLabel>
          <div class="form-conts btn-ico-wrap">
            <input type="text" id="login_pw2" class="krds-input" placeholder="8-12자의 영문자, 숫자, 특수문자 조합" value="1234567890">
            <button type="button" class="krds-btn medium icon">
              <span class="sr-only">입력한 비밀번호 가리기</span>
              <i class="svg-icon ico-pw-visible-on"></i>
            </button>
          </div>
        </KrdsFormGroup>

        <!-- 삭제 버튼 -->
        <KrdsFormGroup>
          <KrdsFormLabel for="form_delete">레이블</KrdsFormLabel>
          <div class="form-conts btn-ico-wrap" data-delete="true">
            <input type="text" id="form_delete" class="krds-input" placeholder="내용을 입력하세요">
            <button type="button" class="krds-btn medium icon pure btn-delete-input">
              <span class="sr-only">내용 삭제</span>
              <i class="svg-icon ico-delete-fill"></i>
            </button>
          </div>
        </KrdsFormGroup>

        <!-- 다중 버튼 -->
        <KrdsFormGroup>
          <KrdsFormLabel for="form_btn_multiple">레이블</KrdsFormLabel>
          <div class="form-conts btn-ico-wrap" data-delete="true">
            <input type="password" id="form_btn_multiple" class="krds-input" placeholder="8-12자의 영문자, 숫자, 특수문자 조합" value="1234567890">
            <div class="btn-group">
              <button type="button" class="krds-btn medium icon pure btn-delete-input">
                <span class="sr-only">내용 삭제</span>
                <i class="svg-icon ico-delete-fill"></i>
              </button>
              <button type="button" class="krds-btn medium icon">
                <span class="sr-only">입력한 비밀번호 보기</span>
                <i class="svg-icon ico-pw-visible"></i>
              </button>
            </div>
          </div>
        </KrdsFormGroup>
      </div>
    `
  })
}
