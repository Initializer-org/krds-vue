<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsAccordionGroup, KrdsAccordionItem } from '@krds.ui/vue'

  const openItem = ref<string>()
  const handleToggle = (id: string) => {
    openItem.value = openItem.value === id ? undefined : id
  }
</script>

<template>
  <KrdsAccordionGroup>
    <KrdsAccordionItem id="basic-1" :open-item="openItem" title="title1" content="content1" @toggle="handleToggle" />
    <KrdsAccordionItem id="basic-2" :open-item="openItem" title="title2" content="content2" @toggle="handleToggle" />
  </KrdsAccordionGroup>
</template>
