<template>
  <div :id="id" class="accordion-item" :class="{ active: isOpen }">
    <h5 class="accordion-header">
      <button
        :id="`accordion-header-${id}`"
        type="button"
        class="btn-accordion"
        :aria-expanded="isOpen"
        :aria-controls="`accordion-collapse-${id}`"
        @click="openToggle(id)"
      >
        <slot name="title">{{ title }}</slot>
      </button>
    </h5>
    <div :id="`accordion-collapse-${id}`" class="accordion-collapse collapse" :aria-labelledby="`accordion-header-${id}`">
      <div class="accordion-body">
        <slot name="content">{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  export interface KrdsAccordionItemProps {
    id: string
    openItem?: string
    title?: string
    content?: string
  }

  export interface KrdsAccordionItemEmits {
    (e: 'toggle', id: string): void
  }

  const props = defineProps<KrdsAccordionItemProps>()
  const emit = defineEmits<KrdsAccordionItemEmits>()

  const isOpen = computed(() => props.openItem === props.id)

  const openToggle = (id: string): void => {
    emit('toggle', id)
  }
</script>
<style scoped></style>
