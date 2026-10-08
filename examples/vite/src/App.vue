<script setup lang="ts">
  import { ref } from 'vue'
  import type { KrdsFloatingButtonItem, KrdsResizeScale, MainMenuItem } from '@krds.ui/vue'

  // 컴포넌트는 main.ts에서 플러그인으로 전역 등록했고, 템플릿 타입은 tsconfig의 @krds.ui/vue/global이 제공한다.
  // 구성은 KRDS 공식 누리집(https://www.krds.go.kr/html/site/index.html)의 기본 레이아웃을 따른다
  const language = ref('ko')
  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English (영어)' }
  ]
  const size = ref<KrdsResizeScale>('md')
  const mobileMenuOpen = ref(false)

  const menu: MainMenuItem[] = [
    {
      text: '민원 안내',
      items: [
        { text: '민원 신청 방법', href: '#' },
        { text: '처리 기간', href: '#' }
      ]
    },
    {
      text: '민원 신청',
      items: [
        { text: '온라인 신청', href: '#' },
        { text: '신청 내역 조회', href: '#' }
      ]
    },
    { text: '알림', href: '#' }
  ]

  const name = ref('')
  const submitted = ref(false)

  const quickMenu: KrdsFloatingButtonItem[] = [
    { label: '자주 묻는 질문', icon: 'ico-faq' },
    { label: 'KRDS Vue 문서', icon: 'ico-go', href: 'https://krds.initializer.org/', external: true }
  ]
</script>

<template>
  <KrdsLayout>
    <KrdsSkipLink href="#container">본문 바로가기</KrdsSkipLink>
    <KrdsMasthead>이 누리집은 KRDS Vue 예제 누리집입니다.</KrdsMasthead>

    <KrdsHeader>
      <template #utility>
        <ul class="utility-list">
          <li>
            <KrdsLanguageSwitcher v-model="language" :language-list="languages">Language</KrdsLanguageSwitcher>
          </li>
          <li><KrdsResize v-model="size" /></li>
        </ul>
      </template>

      <template #branding>
        <h2 class="logo">
          <a href="/"><span class="sr-only">KRDS Vue 예제 누리집</span></a>
        </h2>
        <div class="header-actions">
          <button type="button" class="btn-navi sch">통합검색</button>
          <a href="#" class="btn-navi login">로그인</a>
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

    <main id="container">
      <div class="inner example">
        <KrdsBreadcrumb :items="[{ text: '홈', href: '/' }, { text: '민원 신청' }]" />
        <h1 class="example-title">민원 신청</h1>
        <p>KRDS Vue 컴포넌트로 만든 예제입니다. 화면 크기: {{ size }}</p>

        <KrdsFormGroup>
          <KrdsFormLabel for="example-name">이름</KrdsFormLabel>
          <KrdsInput id="example-name" v-model="name" placeholder="이름을 입력하세요" />
          <KrdsFormHint>실명을 입력합니다.</KrdsFormHint>
        </KrdsFormGroup>

        <KrdsButton variant="primary" size="large" :disabled="!name" @click="submitted = true">신청하기</KrdsButton>
      </div>
    </main>

    <KrdsModal v-model="submitted" modal-id="example-done">
      <template #title>신청 완료</template>
      <p>{{ name }}님의 신청이 접수되었습니다.</p>
      <template #footer>
        <KrdsButton size="medium" variant="primary" @click="submitted = false">확인</KrdsButton>
      </template>
    </KrdsModal>

    <!-- 푸터 내용은 예시 값이다 -->
    <KrdsFooter>
      <template #logo>
        <span class="sr-only">KRDS Vue 예제 누리집</span>
      </template>

      <template #content>
        <div class="f-info">
          <ul class="info-cs">
            <li><strong class="strong">대표전화 0000-0000</strong><span class="span">(평일 09:00 ~ 18:00)</span></li>
            <li><strong class="strong">대표이메일 help@example.go.kr</strong></li>
          </ul>
        </div>
        <div class="f-link">
          <div class="link-go">
            <a href="#" class="krds-btn medium text">문의 및 건의 <i class="svg-icon ico-angle right"></i></a>
            <a href="https://krds.initializer.org/" class="krds-btn medium text" target="_blank" rel="noopener" title="새 창 열림">
              KRDS Vue 문서 <i class="svg-icon ico-go"></i>
            </a>
          </div>
        </div>
      </template>

      <template #bottom>
        <div class="f-btm-text">
          <div class="f-menu">
            <a href="#" class="point">개인정보처리방침</a>
            <a href="#">이용약관</a>
            <a href="#">저작권정책</a>
          </div>
          <p class="f-copy">© 2026 KRDS Vue. All rights reserved.</p>
        </div>
        <KrdsIdentifier>이 누리집은 KRDS Vue 예제 누리집입니다.</KrdsIdentifier>
      </template>
    </KrdsFooter>

    <KrdsFloatingButton label="빠른 메뉴" :items="quickMenu" />
  </KrdsLayout>
</template>

<style>
  .example {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
    padding-bottom: 8rem;
  }

  .example .form-group {
    width: 100%;
  }

  .example-title {
    margin-top: 1.6rem;
    font-size: 4rem;
    font-weight: 700;
  }
</style>
