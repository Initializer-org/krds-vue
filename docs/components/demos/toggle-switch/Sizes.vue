<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsToggleSwitch } from '@krds.ui/vue'

  const mediumChecked = ref(false)
  const largeChecked = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem">
    <KrdsToggleSwitch v-model="mediumChecked" size="medium" label="Medium 크기 스위치 (기본)" />
    <KrdsToggleSwitch v-model="largeChecked" size="large" label="Large 크기 스위치" />
  </div>
</template>
