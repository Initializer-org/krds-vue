<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFileUpload } from '@krds.ui/vue'
  import type { FileInfo } from '@krds.ui/vue'

  const files = ref<FileInfo[]>([])
</script>

<template>
  <KrdsFileUpload
    v-model="files"
    title="파일 업로드"
    description="파일을 선택하거나 드래그하여 업로드하세요."
    :max-file-size="20 * 1024 * 1024"
  />
</template>
