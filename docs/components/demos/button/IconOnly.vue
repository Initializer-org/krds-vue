<script setup lang="ts">
  import { KrdsButton } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
    <KrdsButton icon>
      <span class="sr-only">검색</span>
      <i class="svg-icon ico-sch"></i>
    </KrdsButton>
    <KrdsButton icon size="medium">
      <span class="sr-only">입력한 비밀번호 보기</span>
      <i class="svg-icon ico-pw-visible"></i>
    </KrdsButton>
    <KrdsButton icon border size="large">
      <span class="sr-only">새로고침</span>
      <i class="svg-icon ico-refresh"></i>
    </KrdsButton>
    <KrdsButton icon border size="large" disabled>
      <span class="sr-only">열기</span>
      <i class="svg-icon ico-angle down"></i>
    </KrdsButton>
  </div>
</template>
