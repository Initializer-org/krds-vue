<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFormGroup, KrdsFormHint, KrdsFormLabel, KrdsSelect } from '@krds.ui/vue'

  const selected = ref('')
  const options = [
    { value: 'item1', label: '항목1' },
    { value: 'item2', label: '항목2' },
    { value: 'item3', label: '항목3' }
  ]
</script>

<template>
  <div style="max-width: 400px">
    <KrdsFormGroup>
      <KrdsFormLabel for="select-error">신청 유형</KrdsFormLabel>
      <KrdsSelect id="select-error" v-model="selected" state="error" :options="options" placeholder="선택" />
      <KrdsFormHint type="error">신청 유형을 선택해 주세요</KrdsFormHint>
    </KrdsFormGroup>
  </div>
</template>
