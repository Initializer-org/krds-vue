<script setup lang="ts">
  import { KrdsMedia } from '@krds.ui/vue'
</script>

<template>
  <KrdsMedia src="/demo/steps.m4a" title="알림음 예시 음성" audio>
    <template #transcript>
      <p>[알림음] 세 번이 약 3초 간격으로 울린 뒤, [더 높은 완료 알림음] 두 번이 짧게 이어집니다.</p>
    </template>
  </KrdsMedia>
</template>
