<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsCoachMark, KrdsFormLabel, KrdsInput } from '@krds.ui/vue'

  const currentStep = ref<number | null>(null)
  const stepsData = [
    { id: 1, title: '첫번째 단계', description: '첫번째 단계의 내용임' },
    { id: 2, title: '두번째 단계', description: '두번째 단계의 내용임' },
    { id: 3, title: '세번째 단계', description: '세번째 단계의 내용임' }
  ]
</script>

<template>
  <KrdsButton variant="tertiary" size="xsmall" @click="currentStep = 1">코치마크 보기</KrdsButton>
  <div style="display: flex; flex-direction: column; gap: 40px; padding: 150px 40px 40px">
    <KrdsCoachMark
      v-model="currentStep"
      :active-step="1"
      :steps-data="stepsData"
      :coach-mark-class="[currentStep === 1 ? 'txt-box' : '']"
      style="max-width: 500px"
      @close="currentStep = null"
    >
      <template #coach-mark-content>
        <div style="display: flex; flex-direction: column; gap: 20px">
          <h3>1. 이전 살던 곳 작성</h3>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <KrdsFormLabel for="coach-prev-address">이전 살던 곳</KrdsFormLabel>
            <div style="display: flex; gap: 8px">
              <KrdsInput id="coach-prev-address" style="width: 100%" />
              <KrdsButton variant="secondary">주소 조회</KrdsButton>
            </div>
          </div>
        </div>
      </template>
    </KrdsCoachMark>
    <div style="border-top: 1px solid lightgray" />
    <KrdsCoachMark
      v-model="currentStep"
      :active-step="2"
      :steps-data="stepsData"
      style="max-width: 500px"
      :coach-mark-class="[currentStep === 2 ? 'txt-box' : '']"
      @close="currentStep = null"
    >
      <template #coach-mark-content>
        <div style="display: flex; flex-direction: column; gap: 20px">
          <h3>2. 현재 사는 곳 작성</h3>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <KrdsFormLabel for="coach-current-address">현재 사는 곳</KrdsFormLabel>
            <div style="display: flex; gap: 8px">
              <KrdsInput id="coach-current-address" style="width: 100%" />
              <KrdsButton variant="secondary">주소 조회</KrdsButton>
            </div>
          </div>
        </div>
      </template>
    </KrdsCoachMark>
    <div style="border-top: 1px solid lightgray" />
    <KrdsCoachMark
      v-model="currentStep"
      :active-step="3"
      :steps-data="stepsData"
      style="display: flex; justify-content: flex-end"
      @close="currentStep = null"
    >
      <template #coach-mark-content>
        <KrdsButton :class="[currentStep === 3 ? 'coach-btn' : '']">주소 이전 신청 완료</KrdsButton>
      </template>
    </KrdsCoachMark>
  </div>
</template>
