<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsDateInput, KrdsFormGroup, KrdsFormLabel } from '@krds.ui/vue'

  const dateValue = ref('')
</script>

<template>
  <div style="height: 120px; overflow: auto; padding: 1.6rem; border: 1px dashed #b1b8be">
    <KrdsFormGroup>
      <KrdsFormLabel for="date-input-teleport">날짜 선택</KrdsFormLabel>
      <KrdsDateInput id="date-input-teleport" v-model="dateValue" teleport />
    </KrdsFormGroup>
  </div>
</template>
