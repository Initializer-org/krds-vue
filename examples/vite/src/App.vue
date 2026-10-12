<script setup lang="ts">
  import { onBeforeUnmount, ref } from 'vue'
  import type { KrdsResizeScale } from '@krds.ui/vue'
  import SiteHeader from './components/SiteHeader.vue'
  import SiteFooter from './components/SiteFooter.vue'
  import HomePage from './pages/home/HomePage.vue'
  import ApplyPage from './pages/apply/ApplyPage.vue'

  // 컴포넌트는 main.ts에서 플러그인으로 전역 등록했고, 템플릿 타입은 tsconfig의 @krds.ui/vue/global이 제공한다.
  // 구성은 KRDS 공식 누리집(https://www.krds.go.kr/html/site/index.html)을 따르고, 기관명·연락처 같은 값은 예시로 바꿨다
  const size = ref<KrdsResizeScale>('md')

  // 화면 전환: 라우터 없이 주소의 #/apply로 신청 화면을 연다. #/로 시작하지 않는 주소(본문 바로가기의 #container, 예시 링크의 #)는 화면을 바꾸지 않는다
  const page = ref(location.hash.startsWith('#/') ? location.hash : '#/')
  const onHashChange = () => {
    if (!location.hash.startsWith('#/')) return
    page.value = location.hash
    window.scrollTo(0, 0)
  }
  window.addEventListener('hashchange', onHashChange)
  onBeforeUnmount(() => window.removeEventListener('hashchange', onHashChange))

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <KrdsLayout>
    <SiteHeader v-model:size="size" :page="page" />

    <main id="container">
      <ApplyPage v-if="page === '#/apply'" :size="size" />
      <HomePage v-else />
    </main>

    <SiteFooter />

    <KrdsFloatingButton label="페이지 상단으로 이동" icon="ico-go-top" hide-label @click="scrollToTop" />
  </KrdsLayout>
</template>
