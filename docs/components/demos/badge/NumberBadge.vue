<script setup lang="ts">
  import { KrdsBadge } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center">
    <KrdsBadge type="bg" color="primary" number>1234</KrdsBadge>
    <KrdsBadge type="bg" color="point" number>1234</KrdsBadge>
  </div>
</template>
