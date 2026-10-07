<script setup lang="ts">
  import { KrdsIcon } from '@krds.ui/vue'

  const icons = [
    'ico-angle',
    'ico-calendar',
    'ico-call',
    'ico-del',
    'ico-email',
    'ico-faq',
    'ico-file',
    'ico-filter',
    'ico-global',
    'ico-go',
    'ico-help',
    'ico-like'
  ]
</script>

<template>
  <ul style="display: flex; flex-wrap: wrap; gap: 1.6rem; list-style: none; padding: 0">
    <li v-for="icon in icons" :key="icon" style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem; width: 8rem">
      <KrdsIcon :name="icon" />
      <code style="font-size: 1.2rem">{{ icon }}</code>
    </li>
  </ul>
</template>
