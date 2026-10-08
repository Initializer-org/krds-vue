<script setup lang="ts">
  import { ref } from 'vue'
  import type { KrdsFloatingButtonItem, KrdsResizeScale } from '@krds.ui/vue'

  // 컴포넌트는 main.ts에서 플러그인으로 전역 등록했고, 템플릿 타입은 tsconfig의 @krds.ui/vue/global이 제공한다
  const name = ref('')
  const size = ref<KrdsResizeScale>('md')
  const submitted = ref(false)

  const quickMenu: KrdsFloatingButtonItem[] = [
    { label: '자주 묻는 질문', icon: 'ico-faq' },
    { label: 'KRDS Vue 문서', icon: 'ico-go', href: 'https://krds.initializer.org/', external: true }
  ]
</script>

<template>
  <KrdsSkipLink href="#main">본문 바로가기</KrdsSkipLink>
  <main id="main" class="inner example">
    <div class="example-title">
      <h1>민원 신청</h1>
      <KrdsResize v-model="size" />
    </div>
    <p>KRDS Vue 컴포넌트로 만든 예제입니다. 화면 크기: {{ size }}</p>

    <KrdsFormGroup>
      <KrdsFormLabel for="example-name">이름</KrdsFormLabel>
      <KrdsInput id="example-name" v-model="name" placeholder="이름을 입력하세요" />
      <KrdsFormHint>실명을 입력합니다.</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsButton variant="primary" size="large" :disabled="!name" @click="submitted = true">신청하기</KrdsButton>

    <KrdsModal v-model="submitted" modal-id="example-done">
      <template #title>신청 완료</template>
      <p>{{ name }}님의 신청이 접수되었습니다.</p>
      <template #footer>
        <KrdsButton size="medium" variant="primary" @click="submitted = false">확인</KrdsButton>
      </template>
    </KrdsModal>

    <KrdsFloatingButton label="빠른 메뉴" :items="quickMenu" />
  </main>
</template>

<style>
  .example {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .example-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .example-title h1 {
    font-size: 3.2rem;
    font-weight: 700;
  }
</style>
