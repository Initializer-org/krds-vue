<script setup lang="ts">
  import { data } from './component-list.data'
</script>

<template>
  <template v-for="group in data" :key="group.text">
    <h2 :id="group.text.replace(/\s+/g, '-')">{{ group.text }}</h2>
    <ul>
      <li v-for="page in group.pages" :key="page.link">
        <a :href="page.link">{{ page.name }}</a>
        <template v-if="page.description"> - {{ page.description }}</template>
      </li>
    </ul>
  </template>
</template>
