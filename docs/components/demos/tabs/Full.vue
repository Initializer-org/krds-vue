<script setup lang="ts">
  import { KrdsTabs } from '@krds.ui/vue'

  const tabs = [
    { id: 'tab1', label: '타이틀 1' },
    { id: 'tab2', label: '타이틀 2' }
  ]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 4rem">
    <KrdsTabs :tabs="tabs" full>
      <template #tab1>라인형 풀사이즈 탭 1 영역</template>
      <template #tab2>라인형 풀사이즈 탭 2 영역</template>
    </KrdsTabs>
    <KrdsTabs :tabs="tabs" variant="fill" full>
      <template #tab1>버튼형 풀사이즈 탭 1 영역</template>
      <template #tab2>버튼형 풀사이즈 탭 2 영역</template>
    </KrdsTabs>
  </div>
</template>
