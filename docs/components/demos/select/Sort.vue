<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsSelect } from '@krds.ui/vue'

  const sort = ref('latest')
  const options = [
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'name', label: '이름순' }
  ]
</script>

<template>
  <KrdsSelect id="select-sort" v-model="sort" sort :options="options" title="정렬 기준" />
</template>
