<template>
  <div class="inner help-panel-flexible">
    <button type="button" class="krds-btn small tertiary btn-help-panel expand btn-help-exec" @click="handleOpen">
      <i class="svg-icon ico-fold"></i>
      도움말
    </button>
    <div class="krds-help-panel" :class="{ expand: open }">
      <div class="help-panel-wrap">
        <div class="help-conts-area">
          <slot />
          <button type="button" class="krds-btn small tertiary btn-help-panel fold" @click="handleClose">
            <span class="sr-only">도움말</span>
            접어두기
            <i class="svg-icon ico-angle right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  interface Props {
    modelValue?: boolean
  }

  interface Emits {
    (e: 'update:modelValue', value: boolean): void
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false
  })

  const emit = defineEmits<Emits>()

  const open = ref(props.modelValue)

  watch(
    () => props.modelValue,
    newValue => {
      open.value = newValue
    }
  )

  watch(open, newValue => {
    emit('update:modelValue', newValue)
  })

  const handleOpen = () => {
    open.value = true
  }
  const handleClose = () => {
    open.value = false
  }
</script>

<style scoped></style>
