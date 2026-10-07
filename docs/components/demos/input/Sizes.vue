<script setup lang="ts">
  import { KrdsFormGroup, KrdsFormHint, KrdsFormLabel, KrdsInput } from '@krds.ui/vue'
</script>

<template>
  <div class="fieldset">
    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name31">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name31" placeholder="플레이스홀더" size="small" />
      <KrdsFormHint>도움말</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name32">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name32" placeholder="플레이스홀더" size="medium" />
      <KrdsFormHint>도움말</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name33">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name33" placeholder="플레이스홀더" size="large" />
      <KrdsFormHint>도움말</KrdsFormHint>
    </KrdsFormGroup>
  </div>
</template>
