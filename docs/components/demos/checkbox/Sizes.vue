<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsCheckArea, KrdsCheckbox } from '@krds.ui/vue'

  const mediumChecked = ref(false)
  const largeChecked = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem">
    <KrdsCheckArea>
      <KrdsCheckbox v-model="mediumChecked" size="medium">Medium 크기 체크박스</KrdsCheckbox>
    </KrdsCheckArea>

    <KrdsCheckArea>
      <KrdsCheckbox v-model="largeChecked" size="large">Large 크기 체크박스</KrdsCheckbox>
    </KrdsCheckArea>
  </div>
</template>
