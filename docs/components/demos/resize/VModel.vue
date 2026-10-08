<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsResize } from '@krds.ui/vue'
  import type { KrdsResizeScale } from '@krds.ui/vue'

  // '조금 크게'로 시작한다. 고른 값을 저장해 두었다가 다음 방문 때 넘기면 사용자가 고른 크기를 유지할 수 있다
  const size = ref<KrdsResizeScale>('lg')
</script>

<template>
  <div style="height: 400px; padding: 20px">
    <KrdsResize v-model="size" />
    <p>선택한 크기: {{ size }}</p>
  </div>
</template>
