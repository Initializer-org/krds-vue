<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsLanguageSwitcher } from '@krds.ui/vue'

  const languages = [
    { code: 'ko', name: '한국어', url: 'https://example.com/ko' },
    { code: 'en', name: 'English (영어)', url: 'https://example.com/en' },
    { code: 'zh', name: '中文 (중국어)', url: 'https://example.com/zh' },
    { code: 'ja', name: '日本語 (일본어)', url: 'https://example.com/ja' },
    { code: 'fr', name: 'français (프랑스어)', url: 'https://example.com/fr' }
  ]

  const selectedLanguage = ref('')
</script>

<template>
  <div style="height: 400px; padding: 50px">
    <KrdsLanguageSwitcher v-model="selectedLanguage" :language-list="languages" type="external"> 언어변경 </KrdsLanguageSwitcher>
  </div>
</template>
