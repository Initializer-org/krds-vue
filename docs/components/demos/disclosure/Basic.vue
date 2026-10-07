<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsDisclosure } from '@krds.ui/vue'

  const expanded = ref(false)
</script>

<template>
  <KrdsDisclosure v-model="expanded" title="신청 서비스안내">
    <ul class="krds-info-list dash">
      <li>하나의 아이디로 안전하고 편리하게 여러 전자정부 서비스를 이용할 수 있는 서비스입니다.</li>
      <li>디지털원패스 이용문의 : 1533-3713 (평일9~18시, 공휴일제외)</li>
    </ul>
  </KrdsDisclosure>
</template>
