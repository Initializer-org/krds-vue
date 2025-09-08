import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsInput from './KrdsInput'
import KrdsFormGroup from '../KrdsFormGroup/KrdsFormGroup'
import KrdsFormHint from '../KrdsFormHint/KrdsFormHint'
import KrdsFormLabel from '../KrdsFormLabel/KrdsFormLabel'
import KrdsButton from '../KrdsButton/KrdsButton'
import KrdsButtonGroup from '../KrdsButtonGroup/KrdsButtonGroup'
import KrdsIcon from '../KrdsIcon/KrdsIcon'

const meta: Meta<typeof KrdsInput> = {
  title: 'Components/Input/KrdsInput',
  component: KrdsInput,
  parameters: {
    docs: {
      description: {
        component:
          '텍스트 입력 필드는 사용자가 키보드로 글자, 숫자, 기호 등이 조합된 한 줄의 짧은 텍스트를 입력하는 경우에 사용하는 요소이다.'
      }
    }
  },
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
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본
export const Default: Story = {
  name: '기본',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsInput, KrdsFormHint },
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
}

// 2. 상태
export const States: Story = {
  name: '상태',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsInput, KrdsFormHint },
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
}

// 3. 사이즈
export const Sizes: Story = {
  name: '사이즈',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsInput, KrdsFormHint },
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
}

// 4. 로딩
export const Loading: Story = {
  name: '로딩',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsInput, KrdsFormHint },
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
}

// 5. 아이콘 버튼
export const WithIconButtons: Story = {
  name: '아이콘 버튼',
  render: () => ({
    components: { KrdsFormGroup, KrdsFormLabel, KrdsInput, KrdsFormHint, KrdsButton, KrdsIcon, KrdsButtonGroup },
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
}
