<script setup lang="ts">
  import { KrdsFormGroup, KrdsFormHint, KrdsFormLabel, KrdsInput } from '@krds.ui/vue'
</script>

<template>
  <div class="fieldset">
    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name21">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name21" placeholder="플레이스홀더" model-value="에러" state="error" />
      <KrdsFormHint type="error">에러 메시지</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name22">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name22" placeholder="플레이스홀더" model-value="성공" state="success" />
      <KrdsFormHint type="success">성공 메시지</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name23">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name23" placeholder="플레이스홀더" model-value="정보" state="information" />
      <KrdsFormHint type="information">정보 메시지</KrdsFormHint>
    </KrdsFormGroup>
  </div>
</template>
