<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsFormGroup, KrdsFormLabel, KrdsSelect } from '@krds.ui/vue'

  const large = ref('large')
  const medium = ref('medium')
  const small = ref('small')
  const options = [
    { value: 'large', label: 'large' },
    { value: 'medium', label: 'medium' },
    { value: 'small', label: 'small' }
  ]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px">
    <KrdsFormGroup>
      <KrdsFormLabel for="select-large">Large</KrdsFormLabel>
      <KrdsSelect id="select-large" v-model="large" size="large" :options="options" />
    </KrdsFormGroup>
    <KrdsFormGroup>
      <KrdsFormLabel for="select-medium">Medium</KrdsFormLabel>
      <KrdsSelect id="select-medium" v-model="medium" size="medium" :options="options" />
    </KrdsFormGroup>
    <KrdsFormGroup>
      <KrdsFormLabel for="select-small">Small</KrdsFormLabel>
      <KrdsSelect id="select-small" v-model="small" size="small" :options="options" />
    </KrdsFormGroup>
  </div>
</template>
