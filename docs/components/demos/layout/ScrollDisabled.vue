<script setup lang="ts">
  import { KrdsLayout } from '@krds.ui/vue'
</script>

<template>
  <KrdsLayout :enable-scroll-detection="false">
    <div id="container" style="height: 200px; padding: 2rem">
      <p>스크롤 감지가 비활성화된 레이아웃</p>
    </div>
  </KrdsLayout>
</template>
