<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsDateInput, KrdsFormGroup, KrdsFormLabel } from '@krds.ui/vue'

  const dateValue = ref('2025.03.10')
</script>

<template>
  <KrdsFormGroup>
    <KrdsFormLabel for="date-input-disabled">날짜 선택</KrdsFormLabel>
    <KrdsDateInput id="date-input-disabled" v-model="dateValue" disabled />
  </KrdsFormGroup>
</template>
