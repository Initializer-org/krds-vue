<script setup lang="ts">
  import { KrdsButton, KrdsButtonGroup, KrdsFormGroup, KrdsFormLabel, KrdsIcon, KrdsInput } from '@krds.ui/vue'
</script>

<template>
  <div class="fieldset">
    <!-- 패스워드 보기 버튼 (숨김) -->
    <KrdsFormGroup>
      <KrdsFormLabel for="login_pw">레이블</KrdsFormLabel>
      <KrdsInput id="login_pw" type="password" placeholder="8-12자의 영문자, 숫자, 특수문자 조합" model-value="1234567890" icon>
        <KrdsButton type="button" size="medium" icon>
          <span class="sr-only">입력한 비밀번호 보기</span>
          <KrdsIcon name="ico-pw-visible" />
        </KrdsButton>
      </KrdsInput>
    </KrdsFormGroup>

    <!-- 패스워드 보기 버튼 (보임) -->
    <KrdsFormGroup>
      <KrdsFormLabel for="login_pw2">레이블</KrdsFormLabel>
      <KrdsInput id="login_pw2" type="text" placeholder="8-12자의 영문자, 숫자, 특수문자 조합" model-value="1234567890" icon>
        <KrdsButton type="button" size="medium" icon>
          <span class="sr-only">입력한 비밀번호 가리기</span>
          <KrdsIcon name="ico-pw-visible-on" />
        </KrdsButton>
      </KrdsInput>
    </KrdsFormGroup>

    <!-- 삭제 버튼 -->
    <KrdsFormGroup>
      <KrdsFormLabel for="form_delete">레이블</KrdsFormLabel>
      <KrdsInput id="form_delete" placeholder="내용을 입력하세요" icon data-delete="true">
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
        model-value="1234567890"
        icon
        data-delete="true"
      >
        <KrdsButtonGroup>
          <KrdsButton type="button" size="medium" icon pure class="btn-delete-input">
            <span class="sr-only">내용 삭제</span>
            <KrdsIcon name="ico-delete-fill" />
          </KrdsButton>
          <KrdsButton type="button" size="medium" icon>
            <span class="sr-only">입력한 비밀번호 보기</span>
            <KrdsIcon name="ico-pw-visible" />
          </KrdsButton>
        </KrdsButtonGroup>
      </KrdsInput>
    </KrdsFormGroup>
  </div>
</template>
