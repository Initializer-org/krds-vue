<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsModal } from '@krds.ui/vue'

  const size = ref<'small' | 'large'>('small')
  const isOpen = ref(false)

  const open = (value: 'small' | 'large') => {
    size.value = value
    isOpen.value = true
  }
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 1rem">
    <KrdsButton size="large" variant="secondary" @click="open('small')">Small 모달 열기</KrdsButton>
    <KrdsButton size="large" variant="secondary" @click="open('large')">Large 모달 열기</KrdsButton>
  </div>
  <KrdsModal v-model="isOpen" :size="size" modal-id="modal_sizes">
    <template #title>{{ size === 'small' ? 'Small' : 'Large' }} 모달</template>
    <p>{{ size === 'small' ? '작은' : '큰' }} 크기의 모달입니다.</p>
    <template #footer>
      <KrdsButton size="medium" variant="primary" @click="isOpen = false">확인</KrdsButton>
    </template>
  </KrdsModal>
</template>
