<script setup lang="ts">
  import { KrdsMedia } from '@krds.ui/vue'
</script>

<template>
  <KrdsMedia
    src="/demo/steps.mp4"
    title="단계 진행 표시 예시 영상"
    captions="/demo/steps.ko.vtt"
    poster="/demo/steps-poster.jpg"
    width="640"
    height="360"
  >
    <template #transcript>
      <p>연한 회색 화면 가운데에 회색 테두리의 네모 칸 세 개가 가로로 놓여 있습니다.</p>
      <p>[알림음] 왼쪽 칸이 파란색으로 채워집니다.</p>
      <p>[알림음] 가운데 칸이 파란색으로 채워집니다.</p>
      <p>[알림음] 오른쪽 칸이 파란색으로 채워집니다.</p>
      <p>[완료 알림음 두 번] 세 칸 아래에 초록색 막대가 나타납니다.</p>
    </template>
  </KrdsMedia>
</template>
