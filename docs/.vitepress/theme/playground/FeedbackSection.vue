<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsBadge, KrdsButton, KrdsCriticalAlerts, KrdsSpinner, KrdsStep, KrdsStepIndicator, KrdsTag, KrdsTagGroup } from '@krds.ui/vue'

  const steps = ['신청', '서류 검토', '처리', '완료']
  const current = ref(1)

  const filters = ref(['서울특별시', '복지', '청년'])

  const loading = ref(false)
  const load = () => {
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }
</script>

<template>
  <section class="pg-section" aria-labelledby="pg-alerts-title">
    <h3 id="pg-alerts-title">긴급 공지</h3>
    <p>재난·장애처럼 반드시 알려야 하는 소식을 페이지 상단에 표시합니다.</p>
    <div class="pg-stack">
      <KrdsCriticalAlerts
        type="danger"
        message="호우 경보가 발령되었습니다. 외출을 자제해 주세요."
        link-href="/components/critical-alerts"
        link-text="자세히 보기"
      />
      <KrdsCriticalAlerts type="info" message="10월 12일 02:00~06:00 시스템 점검으로 일부 서비스가 중단됩니다." />
    </div>
  </section>

  <section class="pg-section" aria-labelledby="pg-steps-title">
    <h3 id="pg-steps-title">신청 진행 단계</h3>
    <p>단계 표시기로 신청 절차의 현재 위치를 알려 줍니다.</p>
    <KrdsStepIndicator :model-value="current">
      <KrdsStep v-for="(step, index) in steps" :key="step" :step="`${index + 1}단계`" :title="step" />
    </KrdsStepIndicator>
    <div class="pg-row pg-gap-top">
      <KrdsButton variant="secondary" size="medium" :disabled="current === 0" @click="current--">이전 단계</KrdsButton>
      <KrdsButton variant="primary" size="medium" :disabled="current === steps.length - 1" @click="current++">다음 단계</KrdsButton>
    </div>
  </section>

  <section class="pg-section" aria-labelledby="pg-status-title">
    <h3 id="pg-status-title">처리 상태와 검색 조건</h3>
    <p>배지로 상태를, 태그로 선택한 검색 조건을 보여 줍니다. 태그의 삭제 버튼으로 조건을 지울 수 있습니다.</p>
    <div class="pg-row">
      <KrdsBadge type="bg-light" color="gray" size="medium">접수</KrdsBadge>
      <KrdsBadge type="bg-light" color="information" size="medium">처리 중</KrdsBadge>
      <KrdsBadge type="bg-light" color="success" size="medium">완료</KrdsBadge>
      <KrdsBadge type="bg-light" color="danger" size="medium">반려</KrdsBadge>
    </div>
    <KrdsTagGroup class="pg-gap-top">
      <KrdsTag v-for="filter in filters" :key="filter" @remove="filters = filters.filter(item => item !== filter)">{{ filter }}</KrdsTag>
    </KrdsTagGroup>
    <p v-if="!filters.length" class="pg-gap-top">선택한 조건이 없습니다.</p>
  </section>

  <section class="pg-section" aria-labelledby="pg-loading-title">
    <h3 id="pg-loading-title">불러오는 중</h3>
    <p>스피너로 처리 중임을 알립니다.</p>
    <KrdsButton variant="secondary" size="medium" :disabled="loading" @click="load">민원 목록 불러오기</KrdsButton>
    <div class="pg-loading-box pg-gap-top">
      <KrdsSpinner v-if="loading" />
      <p v-else>버튼을 누르면 2초 동안 불러오는 상태를 보여 줍니다.</p>
    </div>
  </section>
</template>
