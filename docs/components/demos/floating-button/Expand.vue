<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFloatingButton } from '@krds.ui/vue'
  import type { KrdsFloatingButtonItem } from '@krds.ui/vue'

  const items: KrdsFloatingButtonItem[] = [
    { label: '자주 묻는 질문', icon: 'ico-faq' },
    { label: '전화 상담', icon: 'ico-call', href: 'tel:1555-6365' },
    { label: '이메일 문의', icon: 'ico-email', href: 'mailto:krds@nia.or.kr' }
  ]
  const selected = ref('')
</script>

<template>
  <div>
    <p>오른쪽 아래 + 버튼으로 항목을 펼치세요. 선택한 항목: {{ selected || '없음' }}</p>
    <KrdsFloatingButton label="상담 메뉴" :items="items" @select="item => (selected = item.label)" />
  </div>
</template>
