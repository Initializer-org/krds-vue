<script setup lang="ts">
  import { KrdsFormGroup, KrdsFormHint, KrdsFormLabel, KrdsInput } from '@krds.ui/vue'
</script>

<template>
  <div class="fieldset">
    <KrdsFormGroup>
      <KrdsFormLabel for="form-group-hint">레이블</KrdsFormLabel>
      <KrdsInput id="form-group-hint" placeholder="플레이스홀더" />
      <KrdsFormHint>도움말</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="form-group-error">레이블</KrdsFormLabel>
      <KrdsInput id="form-group-error" model-value="에러" state="error" />
      <KrdsFormHint type="error">에러 메시지</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="form-group-success">레이블</KrdsFormLabel>
      <KrdsInput id="form-group-success" model-value="성공" state="success" />
      <KrdsFormHint type="success">성공 메시지</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="form-group-information">레이블</KrdsFormLabel>
      <KrdsInput id="form-group-information" model-value="정보" state="information" />
      <KrdsFormHint type="information">정보 메시지</KrdsFormHint>
    </KrdsFormGroup>
  </div>
</template>
