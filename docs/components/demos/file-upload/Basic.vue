<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFileUpload } from '@krds.ui/vue'
  import type { FileInfo } from '@krds.ui/vue'

  const files = ref<FileInfo[]>([])
</script>

<template>
  <KrdsFileUpload v-model="files" title="타이틀영역" description="컨텐츠 영역" />
</template>
