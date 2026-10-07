<script setup lang="ts">
  import { KrdsCriticalAlerts } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <KrdsCriticalAlerts type="danger" message="긴급 공지 내용 표시" link-href="#" />
    <KrdsCriticalAlerts type="ok" message="안전 공지 내용 표시" link-href="#" />
    <KrdsCriticalAlerts type="info" message="안내 공지 내용 표시" />
  </div>
</template>
