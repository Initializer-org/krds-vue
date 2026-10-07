<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsModal } from '@krds.ui/vue'

  const isOpen = ref(false)
</script>

<template>
  <KrdsButton size="large" variant="secondary" @click="isOpen = true">바텀시트 열기</KrdsButton>
  <KrdsModal v-model="isOpen" bottom-sheet modal-id="modal_bottom_sheet">
    <template #title>바텀시트</template>
    <p>하단에서 올라오는 바텀시트입니다.</p>
    <template #footer>
      <KrdsButton size="medium" variant="primary" @click="isOpen = false">확인</KrdsButton>
    </template>
  </KrdsModal>
</template>
