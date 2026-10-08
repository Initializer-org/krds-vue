<script setup lang="ts">
  import { computed, ref } from 'vue'
  import {
    KrdsButton,
    KrdsCheckArea,
    KrdsCheckbox,
    KrdsDateInput,
    KrdsFileUpload,
    KrdsFormGroup,
    KrdsFormHint,
    KrdsFormLabel,
    KrdsInput,
    KrdsModal,
    KrdsRadio,
    KrdsSelect,
    KrdsTextarea,
    KrdsToggleSwitch
  } from '@krds.ui/vue'
  import type { FileInfo } from '@krds.ui/vue'

  const form = ref({ name: '', phone: '', type: '', date: '', content: '', receive: 'online', agree: false, notify: true })
  const files = ref<FileInfo[]>([])
  const submitted = ref(false)
  const done = ref(false)

  const types = [
    { value: 'certificate', label: '증명서 발급' },
    { value: 'report', label: '신고' },
    { value: 'proposal', label: '제안·건의' }
  ]

  const errors = computed(() => ({
    name: submitted.value && !form.value.name ? '이름을 입력해 주세요.' : '',
    type: submitted.value && !form.value.type ? '신청 유형을 선택해 주세요.' : '',
    agree: submitted.value && !form.value.agree ? '개인정보 수집·이용에 동의해 주세요.' : ''
  }))

  const submit = () => {
    submitted.value = true
    if (!Object.values(errors.value).some(Boolean)) done.value = true
  }

  const reset = () => {
    form.value = { name: '', phone: '', type: '', date: '', content: '', receive: 'online', agree: false, notify: true }
    files.value = []
    submitted.value = false
  }
</script>

<template>
  <section class="pg-section" aria-labelledby="pg-apply-title">
    <h3 id="pg-apply-title">민원 신청서</h3>
    <p>
      텍스트 입력 필드, 셀렉트, 날짜 입력 필드, 텍스트 영역, 라디오 버튼, 파일 업로드, 체크박스, 토글 스위치로 만든 신청서입니다. 비워 둔 채
      신청하면 오류 상태를 볼 수 있습니다.
    </p>

    <form class="pg-stack" novalidate @submit.prevent="submit">
      <KrdsFormGroup>
        <KrdsFormLabel for="pg-name">이름 (필수)</KrdsFormLabel>
        <KrdsInput id="pg-name" v-model="form.name" placeholder="홍길동" :state="errors.name ? 'error' : 'default'" />
        <KrdsFormHint v-if="errors.name" type="error">{{ errors.name }}</KrdsFormHint>
      </KrdsFormGroup>

      <KrdsFormGroup>
        <KrdsFormLabel for="pg-phone">연락처</KrdsFormLabel>
        <KrdsInput id="pg-phone" v-model="form.phone" type="tel" placeholder="010-0000-0000" />
        <KrdsFormHint>처리 결과를 안내받을 번호를 입력해 주세요.</KrdsFormHint>
      </KrdsFormGroup>

      <KrdsFormGroup>
        <KrdsFormLabel for="pg-type">신청 유형 (필수)</KrdsFormLabel>
        <KrdsSelect id="pg-type" v-model="form.type" :options="types" placeholder="선택" :state="errors.type ? 'error' : 'default'" />
        <KrdsFormHint v-if="errors.type" type="error">{{ errors.type }}</KrdsFormHint>
      </KrdsFormGroup>

      <KrdsFormGroup>
        <KrdsFormLabel for="pg-date">희망 처리일</KrdsFormLabel>
        <KrdsDateInput id="pg-date" v-model="form.date" />
      </KrdsFormGroup>

      <KrdsFormGroup>
        <KrdsFormLabel for="pg-apply-content">신청 내용</KrdsFormLabel>
        <KrdsTextarea id="pg-apply-content" v-model="form.content" placeholder="신청 내용을 입력해 주세요" :maxlength="500" show-count />
      </KrdsFormGroup>

      <fieldset>
        <legend class="pg-legend">수령 방법</legend>
        <KrdsCheckArea>
          <KrdsRadio v-model="form.receive" value="online" name="pg-receive">온라인</KrdsRadio>
          <KrdsRadio v-model="form.receive" value="post" name="pg-receive">우편</KrdsRadio>
          <KrdsRadio v-model="form.receive" value="visit" name="pg-receive">방문</KrdsRadio>
        </KrdsCheckArea>
      </fieldset>

      <KrdsFileUpload
        v-model="files"
        title="증빙 서류"
        description="PDF, JPG, PNG · 10MB 이하"
        accept=".pdf,.jpg,.png"
        :max-file-size="10 * 1024 * 1024"
      />

      <div>
        <KrdsCheckbox v-model="form.agree">
          [필수] 개인정보 수집·이용에 동의합니다.
          <template #description>수집 항목: 이름, 연락처 · 보유 기간: 처리 완료 후 1년</template>
        </KrdsCheckbox>
        <KrdsFormHint v-if="errors.agree" type="error">{{ errors.agree }}</KrdsFormHint>
      </div>

      <KrdsToggleSwitch v-model="form.notify" label="처리 결과 문자 알림 받기" />

      <div class="pg-row">
        <KrdsButton type="button" variant="secondary" size="large" @click="reset">다시 작성</KrdsButton>
        <KrdsButton type="submit" variant="primary" size="large">신청하기</KrdsButton>
      </div>
    </form>

    <KrdsModal v-model="done" modal-id="pg-done-modal">
      <template #title>신청이 접수되었습니다</template>
      <p>{{ form.name }}님의 민원 신청이 접수되었습니다. (예시 화면이며 실제로 전송되지 않습니다.)</p>
      <template #footer>
        <KrdsButton variant="primary" size="medium" @click="done = false">확인</KrdsButton>
      </template>
    </KrdsModal>
  </section>
</template>
