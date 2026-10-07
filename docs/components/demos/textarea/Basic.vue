<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFormGroup, KrdsFormLabel, KrdsTextarea } from '@krds.ui/vue'

  const content = ref('')
</script>

<template>
  <div class="fieldset">
    <KrdsFormGroup>
      <KrdsFormLabel for="textarea1">레이블</KrdsFormLabel>
      <KrdsTextarea id="textarea1" v-model="content" placeholder="내용을 입력하세요" />
    </KrdsFormGroup>
  </div>
</template>
