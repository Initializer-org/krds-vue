<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsMainMenu, type MainMenuItem } from '@krds.ui/vue'

  const items: MainMenuItem[] = [
    {
      text: '정보서비스',
      subItems: [
        { text: '민원신청', href: '#' },
        { text: '생활지원', href: '#', selected: true },
        {
          text: '고용정보',
          items: [
            { text: '채용 공고', href: '#' },
            {
              text: '직업 훈련',
              href: '#',
              panelTitle: '직업 훈련',
              items: [
                { text: '국비 지원 과정', href: '#' },
                { text: '재직자 과정', href: '#' },
                { text: '온라인 과정', href: '#' }
              ]
            },
            { text: '고용 통계', href: '#' }
          ]
        }
      ]
    },
    {
      text: '정책정보',
      subItems: [
        { text: '정책자료', href: '#' },
        { text: '통계정보', href: '#' }
      ]
    },
    {
      text: '알림소식',
      subItems: [
        { text: '공지사항', href: '#' },
        { text: '보도자료', href: '#' }
      ]
    },
    {
      text: '기관소개',
      subItems: [
        { text: '인사말', href: '#' },
        { text: '조직도', href: '#' }
      ]
    }
  ]

  const isOpen = ref(false)
</script>

<template>
  <div>
    <button type="button" class="krds-btn medium primary" aria-controls="mobile-nav" :aria-expanded="String(isOpen)" @click="isOpen = true">
      전체메뉴 열기
    </button>
    <KrdsMainMenu v-model:open="isOpen" variant="mobile" :items="items">
      <template #header>
        <div class="gnb-login">
          <button type="button" class="krds-btn large text">로그인을 해주세요</button>
        </div>
      </template>
      <template #bottom>
        <a href="#" class="krds-btn small text">개인정보처리방침</a>
      </template>
    </KrdsMainMenu>
  </div>
</template>
