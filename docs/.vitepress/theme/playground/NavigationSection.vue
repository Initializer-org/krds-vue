<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { KrdsButton, KrdsLink, KrdsPagination, KrdsTabs } from '@krds.ui/vue'

  const notices = Array.from({ length: 23 }, (_, index) => ({
    id: 23 - index,
    title: `${23 - index}번째 공지사항: 민원 서비스 이용 안내`,
    date: `2026.10.${String(Math.max(1, 23 - index)).padStart(2, '0')}`
  }))
  const perPage = 5
  const page = ref(1)
  const pageCount = Math.ceil(notices.length / perPage)
  const pageNotices = computed(() => notices.slice((page.value - 1) * perPage, page.value * perPage))

  const boardTabs = [
    { id: 'notice', label: '공지사항' },
    { id: 'press', label: '보도자료' }
  ]
  const pressReleases = [
    { title: '디지털 정부 서비스 접근성 개선 계획 발표', date: '2026.10.06' },
    { title: '공공 누리집 디자인 시스템 적용 확대', date: '2026.09.30' }
  ]
</script>

<template>
  <section class="pg-section" aria-labelledby="pg-board-title">
    <h3 id="pg-board-title">알림 게시판</h3>
    <p>탭으로 게시판을 나누고, 페이지네이션으로 목록을 나눠 보여 줍니다.</p>
    <KrdsTabs :tabs="boardTabs">
      <template #notice>
        <ul class="pg-board">
          <li v-for="notice in pageNotices" :key="notice.id">
            <KrdsLink href="/components/pagination" size="medium" basic>
              <span class="underline hidden-underline">{{ notice.title }}</span>
            </KrdsLink>
            <span class="pg-board-date">{{ notice.date }}</span>
          </li>
        </ul>
        <KrdsPagination v-model="page" :max="pageCount" :page-range="5" />
      </template>
      <template #press>
        <ul class="pg-board">
          <li v-for="item in pressReleases" :key="item.title">
            <KrdsLink href="/components/tabs" size="medium" basic>
              <span class="underline hidden-underline">{{ item.title }}</span>
            </KrdsLink>
            <span class="pg-board-date">{{ item.date }}</span>
          </li>
        </ul>
      </template>
    </KrdsTabs>
  </section>

  <section class="pg-section" aria-labelledby="pg-buttons-title">
    <h3 id="pg-buttons-title">버튼</h3>
    <p>화면의 주요 행동에는 primary를 한 번만 쓰고, 나머지는 secondary·tertiary로 위계를 나눕니다.</p>
    <div class="pg-stack">
      <div class="pg-row">
        <KrdsButton variant="primary">신청하기</KrdsButton>
        <KrdsButton variant="secondary">임시 저장</KrdsButton>
        <KrdsButton variant="tertiary">취소</KrdsButton>
      </div>
      <div class="pg-row">
        <KrdsButton size="small">small</KrdsButton>
        <KrdsButton size="medium">medium</KrdsButton>
        <KrdsButton size="large">large</KrdsButton>
        <KrdsButton size="medium" text>더보기 <i class="svg-icon ico-angle right"></i></KrdsButton>
      </div>
    </div>
  </section>

  <section class="pg-section" aria-labelledby="pg-links-title">
    <h3 id="pg-links-title">링크</h3>
    <p>본문 안 링크와 새 창 링크를 구분해 표시합니다.</p>
    <div class="pg-stack">
      <KrdsLink href="/components/link" size="large" basic>
        <span class="underline">링크 문서 보기</span>
      </KrdsLink>
      <KrdsLink href="https://www.krds.go.kr/html/site/index.html" size="large" basic target="_blank" title="새 창 열림">
        <span class="underline">KRDS 공식 누리집</span> <i class="svg-icon ico-go"></i>
      </KrdsLink>
    </div>
  </section>
</template>
