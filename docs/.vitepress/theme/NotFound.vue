<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'

  // 정적 404의 noindex를 인계받고, SPA로 정상 문서에 돌아가면 제거한다.
  let robots: HTMLMetaElement | undefined
  onMounted(() => {
    robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]') ?? document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, follow'
    document.head.appendChild(robots)
  })
  onUnmounted(() => robots?.remove())
</script>

<template>
  <div class="not-found">
    <p class="not-found-code">404</p>
    <h1>페이지를 찾을 수 없습니다</h1>
    <p>주소가 바뀌었거나 없는 페이지입니다.</p>
    <p class="not-found-actions">
      <a href="/components/">컴포넌트 목록</a>
      <a href="/">처음으로</a>
    </p>
  </div>
</template>

<style scoped>
  .not-found {
    max-width: 640px;
    margin: 0 auto;
    padding: 96px 24px;
    text-align: center;
  }
  .not-found .not-found-code {
    font-size: 64px;
    font-weight: 700;
    color: var(--vp-c-brand-1);
  }
  .not-found h1 {
    margin-top: 16px;
    font-size: 24px;
    font-weight: 700;
  }
  .not-found p {
    margin-top: 16px;
    color: var(--vp-c-text-2);
  }
  .not-found-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }
  .not-found-actions a {
    padding: 6px 16px;
    border: 1px solid var(--vp-c-brand-1);
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
  }
</style>
