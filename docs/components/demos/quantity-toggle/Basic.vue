<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsQuantityToggle } from '@krds.ui/vue'

  const count = ref(1)
</script>

<template>
  <KrdsQuantityToggle v-model="count" label="관람 인원" :min="1" :max="4" />
</template>
