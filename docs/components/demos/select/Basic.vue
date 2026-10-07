<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFormGroup, KrdsFormHint, KrdsFormLabel, KrdsSelect } from '@krds.ui/vue'

  const selected = ref('')
  const options = [
    { value: 'seoul', label: '서울특별시' },
    { value: 'busan', label: '부산광역시' },
    { value: 'daegu', label: '대구광역시' },
    { value: 'incheon', label: '인천광역시' },
    { value: 'gwangju', label: '광주광역시' },
    { value: 'daejeon', label: '대전광역시' },
    { value: 'ulsan', label: '울산광역시' },
    { value: 'sejong', label: '세종특별자치시' }
  ]
</script>

<template>
  <div style="max-width: 400px">
    <KrdsFormGroup>
      <KrdsFormLabel for="city-select">거주 지역</KrdsFormLabel>
      <KrdsSelect id="city-select" v-model="selected" :options="options" placeholder="선택" />
      <KrdsFormHint>현재 거주하고 있는 지역을 선택해 주세요</KrdsFormHint>
    </KrdsFormGroup>
  </div>
</template>
