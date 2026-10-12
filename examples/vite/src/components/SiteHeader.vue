<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { KrdsResizeScale } from '@krds.ui/vue'
  import { menu } from '../menu'

  // 공식 배너·헤더·메인 메뉴 (PC·모바일)
  const props = defineProps<{ page: string }>()
  const size = defineModel<KrdsResizeScale>('size', { required: true })

  const language = ref('ko')
  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English (영어)' }
  ]
  const mobileMenuOpen = ref(false)
  // 화면이 바뀌면 모바일 전체메뉴를 닫는다
  watch(
    () => props.page,
    () => (mobileMenuOpen.value = false)
  )
</script>

<template>
  <KrdsSkipLink href="#container">본문 바로가기</KrdsSkipLink>
  <KrdsMasthead>이 누리집은 KRDS Vue 예제 누리집입니다.</KrdsMasthead>

  <KrdsHeader>
    <template #utility>
      <ul class="utility-list">
        <li>
          <KrdsLanguageSwitcher v-model="language" :language-list="languages">English</KrdsLanguageSwitcher>
        </li>
        <li><KrdsResize v-model="size" /></li>
      </ul>
    </template>

    <template #branding>
      <!-- 원본 로고는 정부 상징이 들어간 KRDS 로고라 글자 로고로 바꿨다 -->
      <h2 class="logo example-logo">
        <a href="#/">KRDS Vue <span>예제 누리집</span></a>
      </h2>
      <div class="header-actions">
        <button type="button" class="btn-navi sch">통합검색</button>
        <button
          type="button"
          class="btn-navi all"
          aria-controls="mobile-nav"
          :aria-expanded="mobileMenuOpen"
          @click="mobileMenuOpen = true"
        >
          전체메뉴
        </button>
      </div>
    </template>

    <template #navigation>
      <KrdsMainMenu :items="menu" />
    </template>

    <template #mobileNavigation>
      <KrdsMainMenu v-model:open="mobileMenuOpen" variant="mobile" :items="menu" />
    </template>
  </KrdsHeader>
</template>

<style>
  /* 글자 로고: KRDS 헤더·푸터의 기본 로고 이미지 대신 */
  .example-logo {
    width: auto !important;
  }
  .example-logo a,
  .f-logo:has(.example-logo) {
    background-image: none !important;
  }
  .example-logo,
  .example-logo a {
    display: inline-flex;
    align-items: baseline;
    gap: 0.6rem;
    color: var(--krds-light-color-text-bolder);
    font-size: 2.4rem;
    font-weight: 700;
    white-space: nowrap;
  }
  .example-logo span {
    color: var(--krds-light-color-text-subtle);
    font-size: 1.5rem;
    font-weight: 400;
  }
</style>
