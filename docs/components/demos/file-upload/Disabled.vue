<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFileUpload } from '@krds.ui/vue'
  import type { FileInfo } from '@krds.ui/vue'

  const files = ref<FileInfo[]>([
    {
      id: '3',
      file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
      name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
      size: 17 * 1024,
      type: 'application/x-hwp',
      status: 'pending'
    }
  ])
</script>

<template>
  <KrdsFileUpload v-model="files" disabled title="비활성화 상태" description="파일 업로드가 비활성화된 상태입니다." />
</template>
