<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFileUpload } from '@krds.ui/vue'
  import type { FileInfo } from '@krds.ui/vue'

  const files = ref<FileInfo[]>([
    {
      id: '1',
      file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
      name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
      size: 17 * 1024,
      type: 'application/x-hwp',
      status: 'uploading'
    },
    {
      id: '2',
      file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
      name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
      size: 17 * 1024,
      type: 'application/x-hwp',
      status: 'completed'
    },
    {
      id: '3',
      file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
      name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
      size: 17 * 1024,
      type: 'application/x-hwp',
      status: 'pending'
    },
    {
      id: '4',
      file: new File([''], '전입재등록신고서 [주민등록법 시행령 별지서식 15, 15호의2호].hwp'),
      name: '전입재등록신고서 [주민등록법 시행령 별지서식 15, 15호의2호].hwp',
      size: 25 * 1024 * 1024,
      type: 'application/x-hwp',
      status: 'error',
      errorMessage: '등록 가능한 파일 용량을 초과하였습니다.\n20MB 미만의 파일만 등록할 수 있습니다.'
    },
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
  <KrdsFileUpload v-model="files" title="타이틀영역" description="컨텐츠 영역" />
</template>
