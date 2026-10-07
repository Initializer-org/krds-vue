<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsPagination } from '@krds.ui/vue'

  const currentPage = ref(4)
</script>

<template>
  <KrdsPagination v-model="currentPage" :max="99" :page-range="8" />
</template>
