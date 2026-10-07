<script setup lang="ts">
  import { KrdsTabs } from '@krds.ui/vue'

  const tabs = [
    { id: 'tab1', label: '타이틀 1' },
    { id: 'tab2', label: '타이틀 2' },
    { id: 'tab3', label: '타이틀 3' }
  ]
</script>

<template>
  <KrdsTabs :tabs="tabs" variant="fill">
    <template #tab1>탭 1 영역</template>
    <template #tab2>탭 2 영역</template>
    <template #tab3>탭 3 영역</template>
  </KrdsTabs>
</template>
