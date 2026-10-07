<script setup lang="ts">
  import { KrdsTable } from '@krds.ui/vue'

  const columns = [
    { name: 'id', label: 'ID', field: 'id' },
    { name: 'name', label: '이름', field: 'name' },
    { name: 'email', label: '이메일', field: 'email' }
  ]
</script>

<template>
  <KrdsTable caption="커스텀 no-data 슬롯이 있는 테이블" class="col data" :columns="columns" :rows="[]">
    <template #no-data>
      <div style="padding: 2rem; text-align: center; color: #666">
        <div style="font-size: 1.2rem; margin-bottom: 0.5rem">데이터를 찾을 수 없습니다</div>
        <div style="font-size: 0.9rem">새로운 데이터를 추가해보세요</div>
      </div>
    </template>
  </KrdsTable>
</template>
