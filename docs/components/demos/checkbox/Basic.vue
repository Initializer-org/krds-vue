<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsCheckArea, KrdsCheckbox } from '@krds.ui/vue'

  const basic = ref(false)
  const selected = ref(true)
  const disabled = ref(false)
  const disabledSelected = ref(true)
  const description1 = ref(false)
  const description2 = ref(false)
</script>

<template>
  <div>
    <div style="margin-bottom: 2rem">
      <KrdsCheckArea>
        <KrdsCheckbox v-model="basic">기본</KrdsCheckbox>
        <KrdsCheckbox v-model="selected">선택됨</KrdsCheckbox>
        <KrdsCheckbox v-model="disabled" disabled>비활성화</KrdsCheckbox>
        <KrdsCheckbox v-model="disabledSelected" disabled>선택된 비활성화</KrdsCheckbox>
      </KrdsCheckArea>
    </div>

    <div>
      <KrdsCheckArea column>
        <KrdsCheckbox v-model="description1">
          체크박스
          <template #description>부가적인 설명이 들어갑니다.</template>
        </KrdsCheckbox>
        <KrdsCheckbox v-model="description2">
          체크박스
          <template #description>부가적인 설명이 들어갑니다.</template>
        </KrdsCheckbox>
      </KrdsCheckArea>
    </div>
  </div>
</template>
