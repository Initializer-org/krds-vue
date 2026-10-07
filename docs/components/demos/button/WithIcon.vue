<script setup lang="ts">
  import { KrdsButton } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
    <KrdsButton size="small">small 버튼 <i class="svg-icon ico-sch"></i></KrdsButton>
    <KrdsButton size="medium">medium 버튼 <i class="svg-icon ico-sch"></i></KrdsButton>
    <KrdsButton size="large"><i class="svg-icon ico-sch"></i> large 버튼</KrdsButton>
  </div>
</template>
