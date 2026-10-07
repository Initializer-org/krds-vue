<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsToggleSwitch } from '@krds.ui/vue'

  const checked = ref(false)
</script>

<template>
  <div>
    <KrdsToggleSwitch v-model="checked" label="switch : default" />
    <p style="margin-top: 1rem">현재 상태: {{ checked ? '켜짐' : '꺼짐' }}</p>
  </div>
</template>
