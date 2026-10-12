<script setup lang="ts">
  import { KrdsBadge, KrdsButton, KrdsTable } from '@krds.ui/vue'

  const columns = [
    { name: 'title', label: '민원명', field: 'title', headerStyle: 'width: 40%' },
    { name: 'status', label: '처리 상태', field: 'status' },
    { name: 'date', label: '신청일', field: 'date' },
    // 슬롯으로만 그리는 열은 field를 생략한다
    { name: 'action', label: '관리' }
  ]
  const rows = [
    { id: 1, title: '주민등록표 등본 발급', status: '완료', date: '2026.10.02' },
    { id: 2, title: '전입 신고', status: '처리 중', date: '2026.10.05' },
    { id: 3, title: '여권 재발급', status: '반려', date: '2026.10.07' }
  ]
  const badgeColor = { 완료: 'success', '처리 중': 'information', 반려: 'danger' } as const
</script>

<template>
  <KrdsTable caption="민원 신청 내역: 민원명, 처리 상태, 신청일, 관리로 구성" class="col data" :columns="columns" :rows="rows">
    <template #cell-status="{ value }">
      <KrdsBadge type="bg-light" :color="badgeColor[value as keyof typeof badgeColor]">{{ value }}</KrdsBadge>
    </template>
    <template #header-action><span class="sr-only">관리</span></template>
    <template #cell-action="{ row }">
      <KrdsButton text size="small"
        >상세 보기<span class="sr-only">: {{ row.title }}</span></KrdsButton
      >
    </template>
  </KrdsTable>
</template>
