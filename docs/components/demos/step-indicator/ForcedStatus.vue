<script setup lang="ts">
  import { KrdsStep, KrdsStepIndicator } from '@krds.ui/vue'
</script>

<template>
  <KrdsStepIndicator>
    <KrdsStep step="1단계" title="약관 동의" status="done" />
    <KrdsStep step="2단계" title="정보 입력" status="active" />
    <KrdsStep step="3단계" title="신청 완료" status="pending" />
  </KrdsStepIndicator>
</template>
