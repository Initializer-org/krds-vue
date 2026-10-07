<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsAccordionGroup, KrdsAccordionItem } from '@krds.ui/vue'

  const openItem = ref<string>()
  const handleToggle = (id: string) => {
    openItem.value = openItem.value === id ? undefined : id
  }
</script>

<template>
  <KrdsAccordionGroup type-line>
    <KrdsAccordionItem id="line-1" :open-item="openItem" @toggle="handleToggle">
      <template #title>title1</template>
      <template #content>content1</template>
    </KrdsAccordionItem>
    <KrdsAccordionItem id="line-2" :open-item="openItem" @toggle="handleToggle">
      <template #title>title2</template>
      <template #content>content2</template>
    </KrdsAccordionItem>
  </KrdsAccordionGroup>
</template>
