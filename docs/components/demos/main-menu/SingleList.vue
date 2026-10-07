<script setup lang="ts">
  import { KrdsMainMenu, type MainMenuItem } from '@krds.ui/vue'

  const items: MainMenuItem[] = [
    {
      text: '알림소식',
      title: '알림소식',
      layout: 'between',
      items: [
        { text: '공지사항', href: '#' },
        { text: '보도자료', href: '#' },
        { text: '행사안내', href: '#' },
        { text: '채용정보', href: '#' },
        { text: '입찰공고', href: '#' },
        { text: '고시공고', href: '#' }
      ]
    },
    { text: '기관소개', href: '#' }
  ]
</script>

<template>
  <KrdsMainMenu :items="items" :backdrop="false" aria-label="주요 메뉴" />
</template>
