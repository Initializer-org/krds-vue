<script setup lang="ts">
  import { KrdsButton } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
    <KrdsButton size="small" text>텍스트 버튼</KrdsButton>
    <KrdsButton size="small" text>주민등록표초본 <i class="svg-icon ico-angle right"></i></KrdsButton>
    <KrdsButton size="medium" text>검색 <i class="svg-icon ico-sch"></i></KrdsButton>
    <KrdsButton text>파일다운로드 <i class="svg-icon ico-down"></i></KrdsButton>
    <KrdsButton text disabled>필터 <i class="svg-icon ico-filter"></i></KrdsButton>
  </div>
</template>
