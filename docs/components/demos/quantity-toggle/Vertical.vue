<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsQuantityToggle } from '@krds.ui/vue'

  const count = ref(0)
</script>

<template>
  <KrdsQuantityToggle v-model="count" label="증명서 발급 수" :max="5" vertical />
</template>
