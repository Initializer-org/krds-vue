<script setup lang="ts">
  import { ref } from 'vue'
  import {
    KrdsAccordionGroup,
    KrdsAccordionItem,
    KrdsBadge,
    KrdsButton,
    KrdsDisclosure,
    KrdsStructuredList,
    KrdsTable,
    KrdsTextList
  } from '@krds.ui/vue'

  const services = [
    {
      badge: '신청 중',
      color: 'primary',
      title: '청년 월세 지원',
      text: '만 19~34세 무주택 청년에게 월세를 지원합니다.',
      period: '2026.09.01~2026.12.31'
    },
    {
      badge: '마감 임박',
      color: 'danger',
      title: '에너지 바우처',
      text: '냉난방비 부담을 덜 수 있도록 에너지 이용권을 지급합니다.',
      period: '2026.05.01~2026.10.31'
    }
  ] as const

  const columns = [
    { name: 'title', label: '민원명', field: 'title' },
    { name: 'date', label: '신청일', field: 'date', headerStyle: 'width: 25%' },
    { name: 'status', label: '처리 상태', field: 'status', headerStyle: 'width: 20%' }
  ]
  const rows = [
    { title: '주민등록표 등본 발급', date: '2026.10.02', status: '완료' },
    { title: '전입신고', date: '2026.10.05', status: '처리 중' },
    { title: '여권 재발급', date: '2026.10.07', status: '접수' }
  ]

  const openFaq = ref<string>()
  const toggleFaq = (id: string) => (openFaq.value = openFaq.value === id ? undefined : id)

  const guideOpen = ref(false)
</script>

<template>
  <section class="pg-section" aria-labelledby="pg-cards-title">
    <h3 id="pg-cards-title">맞춤 서비스</h3>
    <p>구조화 목록으로 서비스를 카드 형태로 보여 줍니다.</p>
    <div class="pg-grid">
      <KrdsStructuredList v-for="service in services" :key="service.title">
        <template #cardTop>
          <KrdsBadge type="bg-light" :color="service.color">{{ service.badge }}</KrdsBadge>
        </template>
        <template #cardBody>
          <a href="/components/structured-list" class="c-text">
            <p class="c-tit">
              <span class="span">{{ service.title }}</span>
            </p>
            <p class="c-txt">{{ service.text }}</p>
            <p class="c-date">
              <strong class="key">신청 기간</strong>
              <span class="value">{{ service.period }}</span>
            </p>
          </a>
          <div class="c-btn">
            <KrdsButton variant="secondary" size="medium">신청하기</KrdsButton>
          </div>
        </template>
      </KrdsStructuredList>
    </div>
  </section>

  <section class="pg-section" aria-labelledby="pg-table-title">
    <h3 id="pg-table-title">민원 처리 현황</h3>
    <p>표로 여러 건의 정보를 비교해 보여 줍니다.</p>
    <KrdsTable caption="민원 처리 현황: 민원명, 신청일, 처리 상태" class="col data" :columns="columns" :rows="rows" />
  </section>

  <section class="pg-section" aria-labelledby="pg-faq-title">
    <h3 id="pg-faq-title">자주 묻는 질문</h3>
    <p>아코디언으로 질문을 눌렀을 때만 답변을 펼칩니다.</p>
    <KrdsAccordionGroup>
      <KrdsAccordionItem
        id="pg-faq-1"
        :open-item="openFaq"
        title="전입신고는 언제까지 해야 하나요?"
        content="새로운 거주지로 이사한 날부터 14일 이내에 신고해야 합니다."
        @toggle="toggleFaq"
      />
      <KrdsAccordionItem
        id="pg-faq-2"
        :open-item="openFaq"
        title="온라인으로 신청할 수 있나요?"
        content="정부24에서 공동인증서나 간편인증으로 로그인한 뒤 신청할 수 있습니다."
        @toggle="toggleFaq"
      />
    </KrdsAccordionGroup>
  </section>

  <section class="pg-section" aria-labelledby="pg-docs-title">
    <h3 id="pg-docs-title">구비 서류</h3>
    <p>디스클로저로 부가 안내를 접어 두고, 텍스트 목록으로 항목을 나열합니다.</p>
    <KrdsTextList type="ol" variant="ordered">
      <li><span class="num">1. </span>신분증 (주민등록증, 운전면허증, 여권 중 1개)</li>
      <li>
        <span class="num">2. </span>임대차 계약서 사본
        <KrdsTextList type="ul" variant="hollow">
          <li>확정일자를 받은 경우 함께 제출</li>
        </KrdsTextList>
      </li>
      <li><span class="num">3. </span>위임장 (대리인이 신청하는 경우)</li>
    </KrdsTextList>
    <KrdsDisclosure v-model="guideOpen" title="대리인 신청 안내" class="pg-gap-top">
      <ul class="krds-info-list dash">
        <li>대리인은 위임자의 신분증 사본과 위임장을 함께 제출해야 합니다.</li>
        <li>세대주가 아닌 세대원은 세대주의 확인이 필요합니다.</li>
      </ul>
    </KrdsDisclosure>
  </section>
</template>
