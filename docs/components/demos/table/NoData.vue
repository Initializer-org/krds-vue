<script setup lang="ts">
  import { KrdsTable } from '@krds.ui/vue'

  const columns = [
    { name: 'id', label: 'ID', field: 'id' },
    { name: 'name', label: '이름', field: 'name' },
    { name: 'email', label: '이메일', field: 'email' }
  ]
</script>

<template>
  <KrdsTable caption="데이터가 없는 테이블" class="col data" :columns="columns" :rows="[]" />
</template>
