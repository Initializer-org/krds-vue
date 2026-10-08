<script setup lang="ts">
  import { onBeforeUnmount, ref } from 'vue'
  import {
    KrdsBreadcrumb,
    KrdsCarousel,
    KrdsFloatingButton,
    KrdsFooter,
    KrdsHeader,
    KrdsIdentifier,
    KrdsLanguageSwitcher,
    KrdsLayout,
    KrdsMainMenu,
    KrdsMasthead,
    KrdsPanel,
    KrdsResize,
    KrdsSideNavigation,
    KrdsSkipLink,
    KrdsInPageNavigation,
    KrdsTts
  } from '@krds.ui/vue'
  import type { KrdsFloatingButtonItem } from '@krds.ui/vue'
  import { mainMenuItems, sideNavItems } from './menu'
  import ContentSection from './ContentSection.vue'
  import FeedbackSection from './FeedbackSection.vue'
  import FormSection from './FormSection.vue'
  import HelpSection from './HelpSection.vue'
  import NavigationSection from './NavigationSection.vue'

  /** KRDS Vue 컴포넌트로 만든 예시 누리집 (docs/playground.md, layout: false) */

  const mobileMenuOpen = ref(false)
  const sideItems = ref(sideNavItems())
  const language = ref('ko')
  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English (영어)' },
    { code: 'zh', name: '中文 (중국어)' },
    { code: 'ja', name: '日本語 (일본어)' }
  ]
  const helpOpen = ref(false)

  const slides = [
    { category: '안내', title: '이 페이지의 모든 화면 요소는 KRDS Vue 컴포넌트입니다' },
    { category: '문서', title: '컴포넌트마다 예제, 코드, API 레퍼런스를 제공합니다' },
    { category: '오픈소스', title: 'GitHub에서 이슈와 기여를 환영합니다' }
  ]

  const sections = [
    { id: 'pg-form', label: '입력·선택', component: FormSection },
    { id: 'pg-feedback', label: '피드백', component: FeedbackSection },
    { id: 'pg-help', label: '도움', component: HelpSection },
    { id: 'pg-content', label: '레이아웃 및 표현', component: ContentSection },
    { id: 'pg-navigation', label: '탐색·액션', component: NavigationSection }
  ]
  const floatingItems: KrdsFloatingButtonItem[] = [
    { label: '맨 위로', icon: 'ico-go-top' },
    { label: '문의 및 건의', icon: 'ico-faq', href: 'https://github.com/Initializer-org/krds-vue/issues' }
  ]
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // 화면크기(KrdsResize)는 body 확대를 바꾸므로, 문서 사이트(SPA)로 돌아갈 때 되돌린다
  onBeforeUnmount(() => {
    document.body.style.zoom = ''
  })

  const pageNavItems = sections.map(section => ({ href: `#${section.id}`, text: section.label }))

  const intro =
    'KRDS Vue 컴포넌트를 실제 공공 누리집처럼 조합한 페이지입니다. 메뉴, 입력, 도움말, 모달 등을 직접 조작해 보세요. 상단의 화면크기 메뉴로 글자 크기를, 문서 사이트의 화면 모드 버튼으로 선명하게(어두운 배경) 모드를 확인할 수 있습니다.'
</script>

<template>
  <KrdsLayout class="playground">
    <KrdsSkipLink href="#container">본문 바로가기</KrdsSkipLink>
    <KrdsMasthead>이 누리집은 KRDS Vue 컴포넌트로 만든 예시 누리집입니다.</KrdsMasthead>

    <KrdsHeader>
      <template #utility>
        <ul class="utility-list">
          <li><a href="/" class="krds-btn small text">KRDS Vue 문서로 돌아가기</a></li>
          <li>
            <KrdsLanguageSwitcher v-model="language" :language-list="languages">Language</KrdsLanguageSwitcher>
          </li>
          <li><KrdsResize /></li>
        </ul>
      </template>

      <template #branding>
        <h2 class="logo">
          <a href="/playground">
            <span class="sr-only">KRDS Vue 예시 누리집</span>
          </a>
        </h2>
        <div class="header-actions">
          <a href="/components/" class="btn-navi sch">컴포넌트 찾기</a>
          <a href="/guide/getting-started" class="btn-navi login">시작하기</a>
          <button
            type="button"
            class="btn-navi all"
            aria-controls="mobile-nav"
            :aria-expanded="String(mobileMenuOpen)"
            @click="mobileMenuOpen = true"
          >
            전체메뉴
          </button>
        </div>
      </template>

      <template #navigation>
        <KrdsMainMenu :items="mainMenuItems" />
      </template>

      <template #mobileNavigation>
        <KrdsMainMenu v-model:open="mobileMenuOpen" variant="mobile" :items="mainMenuItems" />
      </template>
    </KrdsHeader>

    <main id="container" class="krds-in-page-navigation-type">
      <div class="inner in-between">
        <KrdsSideNavigation v-model="sideItems" title="컴포넌트" aria-label="컴포넌트 분류" />

        <div class="contents">
          <KrdsBreadcrumb :items="[{ text: '홈', href: '/' }, { text: '플레이그라운드' }]" />
          <div class="pg-title">
            <h1>컴포넌트 플레이그라운드</h1>
            <KrdsTts :text="intro" label="듣기" size="medium" icon="volume" />
          </div>
          <p class="pg-intro">{{ intro }}</p>

          <KrdsCarousel variant="banner" aria-label="KRDS Vue 안내" more-href="/components/carousel" class="pg-banner">
            <div v-for="slide in slides" :key="slide.title" class="in">
              <div class="text">
                <p class="cate">{{ slide.category }}</p>
                <p class="tit">{{ slide.title }}</p>
              </div>
              <div class="im">
                <svg class="pg-banner-im" viewBox="0 0 243 178" aria-hidden="true">
                  <rect width="243" height="178" rx="16" fill="#ffffff" />
                  <rect x="24" y="28" width="120" height="14" rx="7" fill="#256ef4" />
                  <rect x="24" y="58" width="195" height="10" rx="5" fill="#cdd1d5" />
                  <rect x="24" y="78" width="160" height="10" rx="5" fill="#cdd1d5" />
                  <rect x="24" y="118" width="80" height="32" rx="8" fill="#256ef4" />
                </svg>
              </div>
            </div>
          </KrdsCarousel>

          <!-- VitePress 라우터가 같은 페이지 #링크를 가로채 스크롤하지 않도록(.vp-raw 안의 링크는 제외) 감싼다 -->
          <div class="vp-raw">
            <KrdsInPageNavigation title="컴포넌트 플레이그라운드" caption="이 페이지의 구성" :items="pageNavItems">
              <template #action>
                <a href="/components/" class="krds-btn medium">전체 컴포넌트 보기</a>
              </template>
            </KrdsInPageNavigation>
          </div>

          <section v-for="section in sections" :id="section.id" :key="section.id" class="pg-part" :aria-labelledby="`${section.id}-title`">
            <h2 :id="`${section.id}-title`" class="pg-part-title">{{ section.label }}</h2>
            <component :is="section.component" />
          </section>
        </div>
      </div>
    </main>

    <KrdsPanel v-model="helpOpen">
      <div class="help-conts-area-inner">
        <div class="conts-area help-conts">
          <div class="conts-wrap">
            <h3 class="help-title">도움 패널</h3>
            <div class="conts-desc">
              <p>화면 오른쪽에 고정되는 도움 패널(KrdsPanel)입니다. 페이지에 대한 설명이나 관련 링크를 제공할 때 씁니다.</p>
            </div>
            <ul class="link-list">
              <li>
                <a href="/components/panel" class="krds-btn xsmall link basic">패널 문서 보기 <i class="svg-icon ico-angle right"></i></a>
              </li>
              <li>
                <a href="/components/" class="krds-btn xsmall link basic">전체 컴포넌트 <i class="svg-icon ico-angle right"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </KrdsPanel>

    <KrdsFooter>
      <template #logo>
        <span class="sr-only">KRDS Vue</span>
      </template>

      <template #content>
        <div class="f-info">
          <ul class="info-cs">
            <li><strong class="strong">패키지 @krds.ui/vue</strong><span class="span">(Vue 3 + TypeScript)</span></li>
            <li><strong class="strong">라이선스 MIT</strong><span class="span">(오픈소스)</span></li>
          </ul>
        </div>
        <div class="f-link">
          <div class="link-go">
            <a href="https://github.com/Initializer-org/krds-vue/issues" class="krds-btn medium text">
              문의 및 건의 <i class="svg-icon ico-angle right"></i>
            </a>
            <a
              href="https://github.com/Initializer-org/krds-vue"
              class="krds-btn medium text"
              target="_blank"
              rel="noopener"
              title="새 창 열림"
            >
              GitHub <i class="svg-icon ico-go"></i>
            </a>
            <a
              href="https://www.npmjs.com/package/@krds.ui/vue"
              class="krds-btn medium text"
              target="_blank"
              rel="noopener"
              title="새 창 열림"
            >
              npm <i class="svg-icon ico-go"></i>
            </a>
          </div>
        </div>
      </template>

      <template #bottom>
        <div class="f-btm-text">
          <div class="f-menu">
            <a href="/">KRDS Vue 소개</a>
            <a href="/guide/getting-started">시작하기</a>
            <a href="https://github.com/Initializer-org/krds-vue/blob/main/LICENSE">라이선스</a>
          </div>
          <p class="f-copy">© 2026 Initializer Team. All rights reserved.</p>
        </div>
        <KrdsIdentifier>이 누리집은 KRDS Vue 예시 누리집입니다.</KrdsIdentifier>
      </template>
    </KrdsFooter>

    <KrdsFloatingButton label="빠른 메뉴" :items="floatingItems" @select="scrollToTop" />
  </KrdsLayout>
</template>

<style>
  /* KRDS 레이아웃(.in-between)은 flex라 탭 목록처럼 줄바꿈되지 않는 내용이 본문 폭을 화면 밖으로 밀어내지 않게 한다 */
  .playground #container .contents {
    min-width: 0;
  }

  /* 도움말 버튼은 헤더 아래로 내려오므로(KrdsPanel), 같은 오른쪽에 있는 콘텐츠 내 탐색을 버튼 아래에 둔다 */
  .playground:not(.scroll-down) #container .krds-in-page-navigation-area {
    top: 32rem;
  }
  .playground.scroll-down #container .krds-in-page-navigation-area {
    top: 10rem;
  }

  /* 배너 캐러셀은 높이를 부모의 100%로 잡는데, 본문(flex 항목)은 사이드 메뉴 높이에 맞춰 늘어나므로 내용 높이를 따르게 한다 */
  .playground #container .pg-banner,
  .playground #container .pg-banner .swiper {
    height: auto;
  }

  .pg-banner {
    margin-bottom: 4rem;
  }

  .pg-banner-im {
    width: auto;
    height: 16rem;
  }

  .pg-title {
    display: flex;
    flex-wrap: wrap;
    gap: 1.6rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 2.4rem;
  }

  .pg-title h1 {
    font-size: 4rem;
    font-weight: 700;
  }

  .pg-intro {
    margin: 1.6rem 0 4rem;
    font-size: 1.9rem;
  }

  .pg-part + .pg-part {
    margin-top: 8rem;
  }

  .pg-part:last-of-type {
    margin-bottom: 12rem;
  }

  .pg-part-title {
    padding-bottom: 1.6rem;
    border-bottom: 2px solid var(--krds-light-color-border-gray-dark);
    font-size: 3.2rem;
    font-weight: 700;
  }

  [data-krds-mode='high-contrast'] .pg-part-title {
    border-bottom-color: var(--krds-high-contrast-color-border-gray-dark);
  }

  /* 탭 목록이 본문 폭을 넘지 않고 KRDS 원래 동작대로 가로 스크롤되게 */
  .playground #container .krds-tab-area > .tab {
    max-width: 100%;
  }

  .pg-section {
    margin-top: 4rem;
  }

  .pg-section > h3 {
    margin-bottom: 0.8rem;
    font-size: 2.4rem;
    font-weight: 700;
  }

  .pg-section > p {
    margin-bottom: 2.4rem;
  }

  .pg-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    align-items: center;
  }

  .pg-stack {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .pg-gap-top {
    margin-top: 1.6rem;
  }

  .pg-legend {
    margin-bottom: 0.8rem;
    font-size: 1.7rem;
    font-weight: 700;
  }

  .pg-loading-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 12rem;
    border: 1px solid var(--krds-light-color-border-gray-light);
    border-radius: 0.8rem;
  }

  [data-krds-mode='high-contrast'] .pg-loading-box {
    border-color: var(--krds-high-contrast-color-border-gray-light);
  }

  .pg-coach {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    max-width: 56rem;
    padding-top: 16rem;
  }

  .pg-coach-end {
    display: flex;
    justify-content: flex-end;
  }

  .pg-notice {
    display: flex;
    flex-wrap: wrap;
    gap: 1.6rem;
    align-items: center;
    justify-content: space-between;
  }

  .pg-board {
    margin-bottom: 2.4rem;
    border-top: 2px solid var(--krds-light-color-border-gray-dark);
  }

  .pg-board li {
    display: flex;
    gap: 1.6rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 0.8rem;
    border-bottom: 1px solid var(--krds-light-color-border-gray-light);
  }

  [data-krds-mode='high-contrast'] .pg-board {
    border-top-color: var(--krds-high-contrast-color-border-gray-dark);
  }

  [data-krds-mode='high-contrast'] .pg-board li {
    border-bottom-color: var(--krds-high-contrast-color-border-gray-light);
  }

  .pg-board-date {
    flex-shrink: 0;
    font-size: 1.5rem;
  }

  .pg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
    gap: 2.4rem;
  }
</style>
