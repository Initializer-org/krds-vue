<script setup lang="ts">
  import { KrdsStep, KrdsStepIndicator } from '@krds.ui/vue'
</script>

<template>
  <div class="page-title-wrap between">
    <h2 class="h-tit">타이틀</h2>
    <KrdsStepIndicator :model-value="2">
      <KrdsStep step="1단계" title="유의 사항 확인" />
      <KrdsStep step="2단계" title="신청인 정보" />
      <KrdsStep step="3단계" title="이사 전 살던 곳" />
      <KrdsStep step="4단계" title="이사 온 곳" />
    </KrdsStepIndicator>
  </div>
</template>
