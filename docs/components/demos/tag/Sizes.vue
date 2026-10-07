<script setup lang="ts">
  import { KrdsTag, KrdsTagGroup } from '@krds.ui/vue'
</script>

<template>
  <div>
    <KrdsTagGroup size="large" style="margin-bottom: 1rem">
      <KrdsTag>태그</KrdsTag>
      <KrdsTag>태그</KrdsTag>
      <KrdsTag>태그</KrdsTag>
    </KrdsTagGroup>

    <KrdsTagGroup size="medium" style="margin-bottom: 1rem">
      <KrdsTag>태그</KrdsTag>
      <KrdsTag>태그</KrdsTag>
      <KrdsTag>태그</KrdsTag>
    </KrdsTagGroup>

    <KrdsTagGroup size="small">
      <KrdsTag>태그</KrdsTag>
      <KrdsTag>태그</KrdsTag>
      <KrdsTag>태그</KrdsTag>
    </KrdsTagGroup>
  </div>
</template>
