<script setup lang="ts">
  import { KrdsTts } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center">
    <KrdsTts text="비활성화 상태입니다." label="듣기" disabled />
    <KrdsTts text="비활성화 상태입니다." aria-label="듣기" disabled />
    <KrdsTts text="비활성화 상태입니다." label="듣기" icon="play" disabled />
  </div>
</template>
