<script setup lang="ts">
  import { KrdsTag, KrdsTagGroup } from '@krds.ui/vue'
</script>

<template>
  <div>
    <KrdsTagGroup size="large" style="margin-bottom: 1rem">
      <KrdsTag link href="#">카테고리</KrdsTag>
      <KrdsTag link href="https://example.com" target="_blank" rel="noopener">외부 링크</KrdsTag>
      <KrdsTag link href="#">필터 태그</KrdsTag>
    </KrdsTagGroup>

    <KrdsTagGroup size="medium" style="margin-bottom: 1rem">
      <KrdsTag link href="#">카테고리</KrdsTag>
      <KrdsTag link href="https://example.com" target="_blank" rel="noopener">외부 링크</KrdsTag>
      <KrdsTag link href="#">필터 태그</KrdsTag>
    </KrdsTagGroup>

    <KrdsTagGroup size="small">
      <KrdsTag link href="#">카테고리</KrdsTag>
      <KrdsTag link href="https://example.com" target="_blank" rel="noopener">외부 링크</KrdsTag>
      <KrdsTag link href="#">필터 태그</KrdsTag>
    </KrdsTagGroup>
  </div>
</template>
