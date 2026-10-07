<script setup lang="ts">
  import { KrdsFormGroup, KrdsFormHint, KrdsFormLabel, KrdsInput } from '@krds.ui/vue'
</script>

<template>
  <div class="fieldset">
    <KrdsFormGroup>
      <KrdsFormLabel for="loading_input">레이블</KrdsFormLabel>
      <KrdsInput id="loading_input" placeholder="플레이스홀더" loading />
      <KrdsFormHint>데이터를 불러오는 중입니다</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="loading_input2">레이블</KrdsFormLabel>
      <KrdsInput id="loading_input2" placeholder="플레이스홀더" model-value="입력된 값" loading />
      <KrdsFormHint>검증 중입니다</KrdsFormHint>
    </KrdsFormGroup>
  </div>
</template>
