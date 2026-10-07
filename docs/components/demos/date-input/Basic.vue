<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsDateInput, KrdsFormGroup, KrdsFormHint, KrdsFormLabel } from '@krds.ui/vue'

  const dateValue = ref('')
</script>

<template>
  <KrdsFormGroup>
    <KrdsFormLabel for="date-input">날짜 선택</KrdsFormLabel>
    <KrdsDateInput id="date-input" v-model="dateValue" placeholder="YYYY.MM.DD" />
    <KrdsFormHint>도움말</KrdsFormHint>
  </KrdsFormGroup>
</template>
