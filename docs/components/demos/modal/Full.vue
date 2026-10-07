<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsModal } from '@krds.ui/vue'

  const isOpen = ref(false)
</script>

<template>
  <KrdsButton size="large" variant="secondary" @click="isOpen = true">풀팝업 열기</KrdsButton>
  <KrdsModal v-model="isOpen" full modal-id="modal_full">
    <template #title>풀팝업</template>
    <p>전체 화면을 차지하는 풀팝업입니다.</p>
    <template #footer>
      <KrdsButton size="medium" variant="primary" @click="isOpen = false">확인</KrdsButton>
    </template>
  </KrdsModal>
</template>
