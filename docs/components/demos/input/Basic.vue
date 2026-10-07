<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFormGroup, KrdsFormHint, KrdsFormLabel, KrdsInput } from '@krds.ui/vue'

  const name = ref('')
</script>

<template>
  <div class="fieldset">
    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name" v-model="name" placeholder="플레이스홀더" />
      <KrdsFormHint>도움말</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name2">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name2" placeholder="플레이스홀더" model-value="readonly" readonly />
      <KrdsFormHint>도움말</KrdsFormHint>
    </KrdsFormGroup>

    <KrdsFormGroup>
      <KrdsFormLabel for="consult_name3">레이블</KrdsFormLabel>
      <KrdsInput id="consult_name3" placeholder="플레이스홀더" model-value="disabled" disabled />
      <KrdsFormHint>도움말</KrdsFormHint>
    </KrdsFormGroup>
  </div>
</template>
