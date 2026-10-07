<script setup lang="ts">
  import { KrdsBreadcrumb, type BreadcrumbItem } from '@krds.ui/vue'

  const items: BreadcrumbItem[] = [
    { text: '홈', href: '#', onClick: e => e.preventDefault() },
    { text: '서비스 신청', href: '#', onClick: e => e.preventDefault() },
    { text: '서비스 신청2' }
  ]
</script>

<template>
  <KrdsBreadcrumb :items="items" />
</template>
