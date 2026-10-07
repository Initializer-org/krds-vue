<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFormGroup, KrdsFormHint, KrdsFormLabel, KrdsInput } from '@krds.ui/vue'

  const email = ref('')
</script>

<template>
  <KrdsFormGroup>
    <KrdsFormLabel for="form-group-email">이메일</KrdsFormLabel>
    <KrdsInput id="form-group-email" v-model="email" type="email" placeholder="example@korea.kr" />
    <KrdsFormHint>알림을 받을 이메일 주소를 입력해 주세요</KrdsFormHint>
  </KrdsFormGroup>
</template>
