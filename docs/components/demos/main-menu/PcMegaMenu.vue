<script setup lang="ts">
  import { KrdsMainMenu, type MainMenuItem } from '@krds.ui/vue'

  const items: MainMenuItem[] = [
    {
      text: '정보서비스',
      subItems: [
        {
          text: '민원신청',
          title: '민원신청',
          titleLink: { href: '#', text: '바로가기' },
          layout: 'between',
          banner: true,
          items: [
            { text: '증명서 발급', href: '#' },
            { text: '전입신고', href: '#' },
            { text: '여권 재발급', href: '#' },
            { text: '주민등록 등본', href: '#', selected: true }
          ]
        },
        {
          text: '생활지원',
          title: '생활지원',
          items: [
            { text: '주거 지원', href: '#' },
            { text: '교육 지원', href: '#' },
            { text: '의료 지원', href: '#' }
          ]
        },
        {
          text: '고용정보',
          title: '고용정보',
          items: [
            {
              text: '채용 공고',
              href: '#',
              description: '메뉴명과 메뉴에 관한 간략한 설명이 표시되는 스타일입니다.',
              external: true
            },
            {
              text: '직업 훈련',
              href: '#',
              description: '메뉴명과 메뉴에 관한 간략한 설명이 표시되는 스타일입니다.',
              selected: true
            }
          ]
        },
        { text: '통합검색 바로가기', href: '#' },
        { text: '외부 서비스', href: 'https://www.krds.go.kr', external: true }
      ]
    },
    {
      text: '정책정보',
      subItems: [
        {
          text: '정책자료',
          title: '정책자료',
          layout: 'between',
          items: [
            { text: '보도자료', href: '#' },
            { text: '입법예고', href: '#' },
            { text: '연구보고서', href: '#' }
          ]
        },
        {
          text: '통계정보',
          title: '통계정보',
          items: [
            { text: '국가통계', href: '#' },
            { text: '지역통계', href: '#' }
          ]
        }
      ]
    },
    {
      text: '알림소식',
      title: '알림소식',
      layout: 'between',
      items: [
        { text: '공지사항', href: '#' },
        { text: '보도자료', href: '#' },
        { text: '행사안내', href: '#' },
        { text: '채용정보', href: '#' },
        { text: '입찰공고', href: '#' },
        { text: '고시공고', href: '#' }
      ]
    },
    { text: '기관소개', href: '#' }
  ]
</script>

<template>
  <KrdsMainMenu :items="items" :backdrop="false">
    <template #banner>
      <span class="krds-badge bg-secondary">신규 서비스</span>
      <button type="button" class="krds-btn medium text">메뉴명 <i class="svg-icon ico-angle right"></i></button>
    </template>
  </KrdsMainMenu>
</template>
