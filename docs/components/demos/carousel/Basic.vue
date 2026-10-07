<script setup lang="ts">
  import { KrdsCarousel } from '@krds.ui/vue'
</script>

<template>
  <div style="background-color: #d8e4f2">
    <KrdsCarousel variant="visual" aria-label="주요 서비스 안내" more-href="#">
      <div v-for="index in 4" :key="index" class="in">
        <div class="text">
          <p class="tit">타이틀 영역 {{ index }}</p>
          <p class="txt">컨텐츠 영역 컨텐츠 영역 {{ index }}</p>
          <a href="#" class="krds-btn primary">버튼 영역</a>
        </div>
        <div class="im">
          <svg width="243" height="178" viewBox="0 0 243 178" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="예시">
            <rect width="243" height="178" fill="#E6E8EA" />
          </svg>
        </div>
      </div>
    </KrdsCarousel>
  </div>
</template>
