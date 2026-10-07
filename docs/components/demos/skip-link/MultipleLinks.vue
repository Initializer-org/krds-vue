<script setup lang="ts">
  import { KrdsSkipLink } from '@krds.ui/vue'

  const links = [
    { href: '#main-content', label: '본문 바로가기' },
    { href: '#gnb', label: '메인메뉴 바로가기' }
  ]
</script>

<template>
  <div>
    <KrdsSkipLink :links="links" />
    <nav id="gnb" aria-label="메인메뉴" style="padding: 20px; border: 1px dashed #ccc">메인메뉴 영역</nav>
    <div id="main-content" style="margin-top: 20px; padding: 20px; background: #f5f5f5">
      <h2>주요 콘텐츠 영역</h2>
    </div>
  </div>
</template>
