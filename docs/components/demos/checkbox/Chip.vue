<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsCheckArea, KrdsCheckbox } from '@krds.ui/vue'

  const checked1 = ref(false)
  const checked2 = ref(true)
  const checked3 = ref(false)
</script>

<template>
  <KrdsCheckArea>
    <KrdsCheckbox v-model="checked1" chip>Chip 체크박스 1</KrdsCheckbox>
    <KrdsCheckbox v-model="checked2" chip>Chip 체크박스 2 (선택됨)</KrdsCheckbox>
    <KrdsCheckbox v-model="checked3" chip disabled>Chip 체크박스 3</KrdsCheckbox>
  </KrdsCheckArea>
</template>
