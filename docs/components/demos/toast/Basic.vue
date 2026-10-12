<script setup lang="ts">
  import { KrdsButton, KrdsToast, useToast } from '@krds.ui/vue'

  // 실제 앱에서는 <KrdsToast />를 App.vue에 한 번만 두고 각 화면에서 useToast()로 띄웁니다
  const toast = useToast()
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
    <KrdsButton variant="primary" @click="toast.show('저장되었습니다.')">저장</KrdsButton>
    <KrdsButton variant="secondary" @click="toast.warning('파일 업로드에 실패했습니다.')">업로드 실패</KrdsButton>
    <KrdsToast />
  </div>
</template>
