<script setup lang="ts">
  import { KrdsTts } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem">
    <div style="display: flex; gap: 1rem; align-items: center">
      <KrdsTts text="xsmall 크기입니다." label="듣기" size="xsmall" />
      <KrdsTts text="small 크기입니다." label="듣기" size="small" />
      <KrdsTts text="medium 크기입니다." label="듣기" size="medium" />
    </div>
    <div style="display: flex; gap: 1rem; align-items: center">
      <KrdsTts text="xsmall 크기입니다." size="xsmall" aria-label="듣기" />
      <KrdsTts text="small 크기입니다." size="small" aria-label="듣기" />
      <KrdsTts text="medium 크기입니다." size="medium" aria-label="듣기" />
    </div>
  </div>
</template>
