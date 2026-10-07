<script setup lang="ts">
  import { withBase } from 'vitepress'

  /** 고정 위치·창 스크롤에 의존하는 예제를 별도 페이지(docs/frame, layout: false)로 띄운다 */
  defineProps<{ src: string; title: string; height?: number }>()
</script>

<template>
  <div class="demo-frame">
    <iframe :src="withBase(src)" :title="title" :style="{ height: `${height ?? 480}px` }"></iframe>
    <a :href="withBase(src)" target="_blank" rel="noreferrer">새 창에서 보기</a>
  </div>
</template>
