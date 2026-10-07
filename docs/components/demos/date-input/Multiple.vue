<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsDateInput, KrdsFormGroup, KrdsFormLabel } from '@krds.ui/vue'

  const start = ref('')
  const end = ref('')
</script>

<template>
  <div class="fieldset">
    <KrdsFormGroup>
      <KrdsFormLabel for="date-input-start">시작일</KrdsFormLabel>
      <KrdsDateInput id="date-input-start" v-model="start" />
    </KrdsFormGroup>
    <KrdsFormGroup>
      <KrdsFormLabel for="date-input-end">종료일</KrdsFormLabel>
      <KrdsDateInput id="date-input-end" v-model="end" />
    </KrdsFormGroup>
  </div>
</template>
