<script setup lang="ts">
  import { KrdsTts } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center">
    <KrdsTts text="볼륨 아이콘 타입입니다." icon="volume" aria-label="듣기" />
    <KrdsTts text="재생 아이콘 타입입니다." icon="play" aria-label="듣기" />
  </div>
</template>
