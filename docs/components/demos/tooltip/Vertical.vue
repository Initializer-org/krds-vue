<script setup lang="ts">
  import { KrdsTooltip } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; align-items: flex-start; gap: 10px">
    <KrdsTooltip vertical tooltip-content="툴팁의 기본 설정입니다">
      tooltip-horizontal <i class="svg-icon ico-angle right"></i>
    </KrdsTooltip>
    <KrdsTooltip vertical type="icon" tooltip-content="아이콘 버튼에 제공되는 툴팁">
      <span class="sr-only">도움말</span>
      <i class="svg-icon ico-help"></i>
    </KrdsTooltip>
    <KrdsTooltip vertical type="button" tooltip-content="버튼에 제공되는 툴팁"> 도움말 </KrdsTooltip>
  </div>
</template>
