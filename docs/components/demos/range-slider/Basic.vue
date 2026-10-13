<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsRangeSlider } from '@krds.ui/vue'

  const sizes = ['작게', '보통', '조금 크게', '크게', '아주 크게']
  const size = ref(2)
</script>

<template>
  <KrdsRangeSlider v-model="size" label="글자 크기" :max="sizes.length - 1" :value-text="v => sizes[v]" />
</template>
