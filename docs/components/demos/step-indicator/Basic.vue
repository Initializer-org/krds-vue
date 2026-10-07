<script setup lang="ts">
  import { KrdsStep, KrdsStepIndicator } from '@krds.ui/vue'
</script>

<template>
  <KrdsStepIndicator :model-value="3">
    <KrdsStep step="1단계" title="단계 레이블" />
    <KrdsStep step="2단계" title="단계 레이블" />
    <KrdsStep step="3단계" title="단계 레이블" />
    <KrdsStep step="4단계" title="단계 레이블" />
    <KrdsStep step="5단계" title="단계 레이블" />
  </KrdsStepIndicator>
</template>
