<script setup lang="ts">
  import { KrdsTextList } from '@krds.ui/vue'
</script>

<template>
  <KrdsTextList type="ul" variant="dash">
    <li>텍스트 목록 레벨1</li>
    <li>
      텍스트 목록 레벨1
      <KrdsTextList type="ul" variant="hollow">
        <li>텍스트 목록 레벨2</li>
        <li>텍스트 목록 레벨2</li>
      </KrdsTextList>
    </li>
    <li>텍스트 목록 레벨1</li>
  </KrdsTextList>
</template>
