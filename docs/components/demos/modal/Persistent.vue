<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsModal } from '@krds.ui/vue'

  const isOpen = ref(false)
</script>

<template>
  <KrdsButton size="large" variant="secondary" @click="isOpen = true">Persistent 모달 열기</KrdsButton>
  <KrdsModal v-model="isOpen" persistent modal-id="modal_persistent">
    <template #title>Persistent 모달</template>
    <p>배경을 클릭하거나 Esc 키를 눌러도 닫히지 않습니다. 버튼으로만 닫을 수 있습니다.</p>
    <template #footer>
      <KrdsButton size="medium" variant="primary" @click="isOpen = false">확인</KrdsButton>
    </template>
  </KrdsModal>
</template>
