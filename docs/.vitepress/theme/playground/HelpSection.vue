<script setup lang="ts">
  import { ref } from 'vue'
  import {
    KrdsButton,
    KrdsCoachMark,
    KrdsContextualHelp,
    KrdsFormGroup,
    KrdsFormLabel,
    KrdsInput,
    KrdsModal,
    KrdsTooltip,
    KrdsTts
  } from '@krds.ui/vue'

  const coachStep = ref<number | null>(null)
  const coachSteps = [
    { id: 1, title: '이전 주소 입력', description: '이전에 살던 곳의 주소를 입력합니다.' },
    { id: 2, title: '신고 완료', description: '입력한 내용을 확인한 뒤 신고를 완료합니다.' }
  ]

  const privacyOpen = ref(false)

  const notice = '전입신고는 새로운 거주지로 이사한 날부터 14일 이내에 해야 합니다. 기간 내에 신고하지 않으면 과태료가 부과될 수 있습니다.'
</script>

<template>
  <section class="pg-section" aria-labelledby="pg-tooltip-title">
    <h3 id="pg-tooltip-title">툴팁과 맥락적 도움말</h3>
    <p>입력 항목 옆에서 짧은 설명(툴팁)이나 조금 긴 안내(맥락적 도움말)를 제공합니다.</p>
    <div class="pg-stack">
      <div class="pg-row">
        <span>주민등록번호 앞자리</span>
        <KrdsTooltip type="icon" tooltip-content="생년월일 6자리를 입력합니다.">
          <span class="sr-only">주민등록번호 앞자리 도움말</span>
          <i class="svg-icon ico-help"></i>
        </KrdsTooltip>
      </div>
      <div class="pg-row">
        <span>건강보험료 산정 기준</span>
        <KrdsContextualHelp tooltip-title="건강보험료 산정 기준">
          <p>직장가입자는 보수월액에, 지역가입자는 소득과 재산에 보험료율을 곱해 산정합니다.</p>
          <div class="btn-wrap">
            <a href="/components/contextual-help" class="krds-btn xsmall link basic"
              >맥락적 도움말 문서 <i class="svg-icon ico-angle right"></i
            ></a>
          </div>
        </KrdsContextualHelp>
      </div>
    </div>
  </section>

  <section class="pg-section" aria-labelledby="pg-coach-title">
    <h3 id="pg-coach-title">전입신고 따라하기</h3>
    <p>코치마크로 처음 쓰는 사람에게 화면의 순서를 안내합니다.</p>
    <KrdsButton variant="tertiary" size="small" @click="coachStep = 1">따라하기 시작</KrdsButton>
    <div class="pg-coach">
      <KrdsCoachMark
        v-model="coachStep"
        :active-step="1"
        :steps-data="coachSteps"
        :coach-mark-class="[coachStep === 1 ? 'txt-box' : '']"
        @close="coachStep = null"
      >
        <template #coach-mark-content>
          <KrdsFormGroup>
            <KrdsFormLabel for="pg-prev-address">이전 주소</KrdsFormLabel>
            <KrdsInput id="pg-prev-address" placeholder="예: 서울특별시 종로구 세종대로 209" />
          </KrdsFormGroup>
        </template>
      </KrdsCoachMark>
      <KrdsCoachMark v-model="coachStep" :active-step="2" :steps-data="coachSteps" class="pg-coach-end" @close="coachStep = null">
        <template #coach-mark-content>
          <KrdsButton :class="[coachStep === 2 ? 'coach-btn' : '']">전입신고 완료</KrdsButton>
        </template>
      </KrdsCoachMark>
    </div>
  </section>

  <section class="pg-section" aria-labelledby="pg-tts-title">
    <h3 id="pg-tts-title">음성 지원</h3>
    <p>안내문을 음성으로 읽어 줍니다.</p>
    <div class="pg-notice">
      <p>{{ notice }}</p>
      <KrdsTts :text="notice" label="안내문 듣기" size="small" icon="volume" />
    </div>
  </section>

  <section class="pg-section" aria-labelledby="pg-modal-title">
    <h3 id="pg-modal-title">모달과 도움 패널</h3>
    <p>모달로 약관 같은 긴 내용을 보여 주고, 화면 오른쪽의 도움말 버튼으로 도움 패널을 엽니다.</p>
    <KrdsButton variant="secondary" size="medium" @click="privacyOpen = true">개인정보 처리방침 보기</KrdsButton>
    <KrdsModal v-model="privacyOpen" modal-id="pg-privacy-modal">
      <template #title>개인정보 처리방침</template>
      <p>KRDS Vue 예시 누리집은 입력한 정보를 저장하거나 전송하지 않습니다. 이 창은 모달 컴포넌트 예시입니다.</p>
      <template #footer>
        <KrdsButton variant="primary" size="medium" @click="privacyOpen = false">확인</KrdsButton>
      </template>
    </KrdsModal>
  </section>
</template>
