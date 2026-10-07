<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsModal } from '@krds.ui/vue'

  const isOpen = ref(false)
</script>

<template>
  <KrdsButton size="large" variant="secondary" @click="isOpen = true">배경 없는 모달 열기</KrdsButton>
  <KrdsModal v-model="isOpen" :backdrop="false" modal-id="modal_no_backdrop">
    <template #title>배경 없는 모달</template>
    <p>배경 딤 처리 없이 모달만 표시됩니다.</p>
    <template #footer>
      <KrdsButton size="medium" variant="primary" @click="isOpen = false">확인</KrdsButton>
    </template>
  </KrdsModal>
</template>
