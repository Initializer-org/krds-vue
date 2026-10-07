<script setup lang="ts">
  import { KrdsTable, type TableColumn, type TableRow } from '@krds.ui/vue'

  const columns: TableColumn[] = [
    {
      name: 'id',
      label: 'ID',
      field: 'id',
      headerStyle: 'width: 80px',
      headerClasses: 'bg-gray-100 text-center font-bold',
      style: 'width: 80px',
      classes: 'text-center',
      align: 'center'
    },
    {
      name: 'name',
      label: '이름',
      field: 'name',
      headerStyle: 'width: 150px; color: #333',
      classes: 'font-medium'
    },
    {
      name: 'score',
      label: '점수',
      field: 'score',
      headerStyle: 'width: 100px',
      headerClasses: 'text-right',
      classes: (row: TableRow) => ((row.score as number) >= 80 ? 'score-high text-right' : 'score-low text-right'),
      align: 'right'
    },
    {
      name: 'status',
      label: '상태',
      field: 'status',
      headerClasses: 'text-center',
      classes: (row: TableRow) => `status-${(row.status as string).toLowerCase()} text-center`,
      align: 'center'
    }
  ]
  const rows = [
    { id: 1, name: '김철수', score: 95, status: 'PASS' },
    { id: 2, name: '이영희', score: 78, status: 'FAIL' },
    { id: 3, name: '박민수', score: 88, status: 'PASS' },
    { id: 4, name: '정수진', score: 92, status: 'PASS' }
  ]
</script>

<template>
  <KrdsTable caption="헤더와 바디에 스타일/클래스가 적용된 테이블" class="col data" :columns="columns" :rows="rows" />
</template>
