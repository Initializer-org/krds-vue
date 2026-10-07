<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { KrdsLanguageSwitcher } from '@krds.ui/vue'

  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English (영어)' },
    { code: 'zh', name: '中文 (중국어)' },
    { code: 'ja', name: '日本語 (일본어)' },
    { code: 'fr', name: 'français (프랑스어)' }
  ]

  const selectedLanguage = ref('')
  const currentLanguageName = computed(() => languages.find(lang => lang.code === selectedLanguage.value)?.name || '선택해주세요')
</script>

<template>
  <div style="height: 400px; padding: 50px">
    <KrdsLanguageSwitcher v-model="selectedLanguage" :language-list="languages">
      언어변경
      <template #prev-item>
        <p class="current-laguage">
          <span>현재 언어</span>
          <strong>{{ currentLanguageName }}</strong>
        </p>
      </template>
    </KrdsLanguageSwitcher>
    <p style="margin-top: 20px">선택된 언어: {{ selectedLanguage }}</p>
  </div>
</template>
