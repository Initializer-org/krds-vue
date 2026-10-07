<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsCheckArea, KrdsRadio } from '@krds.ui/vue'

  const selectedValue = ref('option2')
  const selectedValue2 = ref('option4')
  const selectedWithDescription = ref('option1')
</script>

<template>
  <div>
    <div style="margin-bottom: 2rem">
      <KrdsCheckArea>
        <KrdsRadio v-model="selectedValue" value="option1" name="basic">기본</KrdsRadio>
        <KrdsRadio v-model="selectedValue" value="option2" name="basic">선택됨</KrdsRadio>
        <KrdsRadio v-model="selectedValue" value="option3" name="basic" disabled>비활성화</KrdsRadio>
        <KrdsRadio v-model="selectedValue2" value="option4" name="basic2" disabled>선택된 비활성화</KrdsRadio>
      </KrdsCheckArea>
    </div>

    <div>
      <KrdsCheckArea column>
        <KrdsRadio v-model="selectedWithDescription" value="option1" name="withDesc">
          라디오버튼
          <template #description>부가적인 설명이 들어갑니다.</template>
        </KrdsRadio>
        <KrdsRadio v-model="selectedWithDescription" value="option2" name="withDesc">
          라디오버튼
          <template #description>부가적인 설명이 들어갑니다.</template>
        </KrdsRadio>
      </KrdsCheckArea>
    </div>
  </div>
</template>
