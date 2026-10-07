<script setup lang="ts">
  import { KrdsBadge, KrdsStructuredList } from '@krds.ui/vue'
</script>

<template>
  <KrdsStructuredList>
    <template #cardTop>
      <KrdsBadge type="bg-light" color="success">성공</KrdsBadge>
    </template>
    <template #cardBody>
      <div class="c-text">
        <p class="c-tit"><span class="span">간단한 제목</span></p>
      </div>
    </template>
  </KrdsStructuredList>
</template>
