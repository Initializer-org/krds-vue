<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsTabs } from '@krds.ui/vue'

  const tabs = [
    { id: 'tab1', label: '타이틀 1' },
    { id: 'tab2', label: '타이틀 2' },
    { id: 'tab3', label: '타이틀 3' }
  ]
  const activeTab = ref('tab2')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 2rem">
    <p>현재 탭: {{ activeTab }}</p>
    <KrdsTabs v-model="activeTab" :tabs="tabs">
      <template #tab1>탭 1 영역</template>
      <template #tab2>탭 2 영역</template>
      <template #tab3>탭 3 영역</template>
    </KrdsTabs>
  </div>
</template>
