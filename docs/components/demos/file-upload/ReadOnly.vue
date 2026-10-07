<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFileUpload } from '@krds.ui/vue'
  import type { FileInfo } from '@krds.ui/vue'

  const files = ref<FileInfo[]>([
    {
      id: '5',
      file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
      name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
      size: 17 * 1024,
      type: 'application/x-hwp',
      status: 'completed',
      downloadUrl: '/files/sample.hwp'
    }
  ])
</script>

<template>
  <KrdsFileUpload v-model="files" readonly title="읽기 전용" description="업로드된 파일만 확인할 수 있습니다." />
</template>
