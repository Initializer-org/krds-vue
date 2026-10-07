<script setup lang="ts">
  import { KrdsCarousel } from '@krds.ui/vue'
</script>

<template>
  <KrdsCarousel variant="banner" aria-label="자동 재생 캐러셀 예제" autoplay :autoplay-delay="3000" more-href="#">
    <div v-for="index in 3" :key="index" class="in">
      <div class="text">
        <p class="cate">서브타이틀 {{ index }}</p>
        <p class="tit">타이틀 {{ index }}</p>
      </div>
      <div class="im">
        <svg width="243" height="178" viewBox="0 0 243 178" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="예시">
          <rect width="243" height="178" fill="#E6E8EA" />
        </svg>
      </div>
    </div>
  </KrdsCarousel>
</template>
