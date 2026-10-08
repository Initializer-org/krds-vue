<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFloatingButton } from '@krds.ui/vue'

  const count = ref(0)
</script>

<template>
  <div>
    <p>오른쪽 아래 버튼을 눌러 보세요. 누른 횟수: {{ count }}</p>
    <KrdsFloatingButton label="채팅 상담" icon="ico-faq" @click="count++" />
  </div>
</template>
