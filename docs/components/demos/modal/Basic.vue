<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsModal } from '@krds.ui/vue'

  const isOpen = ref(false)
</script>

<template>
  <KrdsButton size="large" variant="secondary" @click="isOpen = true">모달 열기</KrdsButton>
  <KrdsModal v-model="isOpen" modal-id="modal_basic">
    <template #title>모달 제목</template>
    <p>대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다.</p>
    <template #footer>
      <KrdsButton size="medium" variant="tertiary" @click="isOpen = false">아니요</KrdsButton>
      <KrdsButton size="medium" variant="primary" @click="isOpen = false">예</KrdsButton>
    </template>
  </KrdsModal>
</template>
