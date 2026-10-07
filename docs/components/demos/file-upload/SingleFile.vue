<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFileUpload } from '@krds.ui/vue'
  import type { FileInfo } from '@krds.ui/vue'

  const files = ref<FileInfo[]>([])
</script>

<template>
  <KrdsFileUpload v-model="files" :multiple="false" title="단일 파일 업로드" description="하나의 파일만 업로드할 수 있습니다." />
</template>
