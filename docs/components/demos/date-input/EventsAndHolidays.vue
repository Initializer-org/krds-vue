<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsDateInput, KrdsFormGroup, KrdsFormLabel } from '@krds.ui/vue'

  const dateValue = ref('')
</script>

<template>
  <KrdsFormGroup>
    <KrdsFormLabel for="date-input-events">날짜 선택</KrdsFormLabel>
    <KrdsDateInput
      id="date-input-events"
      v-model="dateValue"
      :initial-year="2025"
      :initial-month="5"
      :holidays="['2025.05.05', '2025.05.06']"
      :event-dates="['2025.05.15']"
    />
  </KrdsFormGroup>
</template>
