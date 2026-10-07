<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsTag, KrdsTagGroup } from '@krds.ui/vue'

  const tags = ref(['커스텀 내용 1', '커스텀 내용 2'])

  const handleRemove = (tag: string) => {
    tags.value = tags.value.filter(t => t !== tag)
  }
</script>

<template>
  <KrdsTagGroup size="medium">
    <KrdsTag v-for="tag in tags" :key="tag" @remove="handleRemove(tag)">{{ tag }}</KrdsTag>
    <KrdsTag link href="#">링크 태그</KrdsTag>
  </KrdsTagGroup>
</template>
