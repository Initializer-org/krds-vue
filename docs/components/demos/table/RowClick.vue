<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsTable, type TableRow } from '@krds.ui/vue'

  const columns = [
    { name: 'name', label: '이름', field: 'name' },
    { name: 'score', label: '점수', field: 'score' }
  ]
  const rows = [
    { name: '김철수', score: 95 },
    { name: '이영희', score: 78 },
    { name: '박민수', score: 88 }
  ]
  const selected = ref('없음')

  const onRowClick = (row: TableRow, index: number) => {
    selected.value = `${row.name} (${index})`
  }
</script>

<template>
  <KrdsTable
    caption="행을 클릭하거나 Enter·Space로 선택하는 테이블"
    class="col data"
    :columns="columns"
    :rows="rows"
    @row-click="onRowClick"
  />
  <p style="margin-top: 1.6rem">선택된 행: {{ selected }}</p>
</template>
