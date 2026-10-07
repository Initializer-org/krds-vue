<script setup lang="ts">
  import { KrdsContextualHelp } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 500px">
    <div style="display: flex; align-items: center; gap: 8px">
      <p>예시이미지(상단 왼쪽)</p>
      <KrdsContextualHelp>
        <p>
          컴포넌트 주변에 배치되어 해당 컴포넌트의 상태나 관련된 상세 정보를 제공하는 컴포넌트이다. 맥락적 도움말은 정보 아이콘이나 도움
          아이콘 버튼을 통해 사용자가 요청하는 경우에만 화면에 표시된다.
        </p>
        <div class="btn-wrap">
          <a href="#;" class="krds-btn xsmall link basic">바로가기 <i class="svg-icon ico-angle right"></i></a>
        </div>
      </KrdsContextualHelp>
    </div>
  </div>
</template>
