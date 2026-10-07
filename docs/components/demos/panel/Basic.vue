<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsPanel } from '@krds.ui/vue'

  const open = ref(false)
</script>

<template>
  <KrdsPanel v-model="open"></KrdsPanel>
</template>
