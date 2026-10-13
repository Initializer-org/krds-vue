<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsRangeSlider } from '@krds.ui/vue'

  const volume = ref(50)
</script>

<template>
  <KrdsRangeSlider v-model="volume" label="음량" :step="10" :value-text="v => `${v}%`" value-position="end" />
</template>
