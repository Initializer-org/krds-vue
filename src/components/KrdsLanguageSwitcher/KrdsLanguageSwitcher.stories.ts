import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsLanguageSwitcher, { LanguageData } from './KrdsLanguageSwitcher.vue'
import { ref, computed } from 'vue'

const meta: Meta<typeof KrdsLanguageSwitcher> = {
  title: 'Components/Setting/KrdsLanguageSwitcher',
  component: KrdsLanguageSwitcher,
  parameters: {
    docs: {
      description: {
        component:
          '언어 변경은 서비스의 콘텐츠를 표시할 언어를 변경하거나 별도의 외국어 서비스로 이동하는 데 사용되는 요소이다. 한국어가 익숙하지 않은 사용자가 콘텐츠 표시 언어를 변경할 수 있는 수단을 발견하지 못한다면 서비스를 이용할 수 없게 되므로, 디지털 정부서비스로 직관적이고 일관된 방식으로 언어 변경을 제공하는 것이 매우 중요하다.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const languages: LanguageData[] = [
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English (영어)' },
  { code: 'zh', name: '中文 (중국어)' },
  { code: 'ja', name: '日本語 (일본어)' },
  { code: 'fr', name: 'français (프랑스어)' }
]

const externalLanguages: LanguageData[] = [
  { code: 'ko', name: '한국어', url: 'https://example.com/ko' },
  { code: 'en', name: 'English (영어)', url: 'https://example.com/en' },
  { code: 'zh', name: '中文 (중국어)', url: 'https://example.com/zh' },
  { code: 'ja', name: '日本語 (일본어)', url: 'https://example.com/ja' },
  { code: 'fr', name: 'français (프랑스어)', url: 'https://example.com/fr' }
]

// 1. 기본
export const Default: Story = {
  name: '기본',
  args: {
    languageList: languages,
    modelValue: ''
  },
  render: args => ({
    components: { KrdsLanguageSwitcher },
    setup() {
      const selectedLanguage = ref('')
      const handleClose = () => {}

      const currentLanguageName = computed(() => {
        const lang = languages.find(lang => lang.code === selectedLanguage.value)
        return lang?.name || '선택해주세요'
      })

      return {
        args,
        selectedLanguage,
        handleClose,
        currentLanguageName
      }
    },
    template: `
      <div style="height: 400px; padding: 50px">
        <KrdsLanguageSwitcher
          v-model="selectedLanguage"
          :language-list="args.languageList"
          @close="handleClose"
        >
          언어변경
          <template #prev-item>
            <p class="current-laguage">
              <span>현재 언어</span>
              <strong>{{ currentLanguageName }}</strong>
            </p>
          </template>
        </KrdsLanguageSwitcher>
        <p style="margin-top: 20px;">선택된 언어: {{ selectedLanguage }}</p>
      </div>`
  })
}

// 2. 외부 페이지 이동
export const External: Story = {
  name: '외부 페이지 이동',
  args: {
    languageList: externalLanguages,
    modelValue: '',
    type: 'external'
  },
  render: args => ({
    components: { KrdsLanguageSwitcher },
    setup() {
      const selectedLanguage = ref('')
      const handleClose = () => {}

      return {
        args,
        selectedLanguage,
        handleClose
      }
    },
    template: `
      <div style="height: 400px; padding: 50px">
        <KrdsLanguageSwitcher
          v-model="selectedLanguage"
          :language-list="args.languageList"
          :type="args.type"
          @close="handleClose"
        >
          언어변경
        </KrdsLanguageSwitcher>
        <p style="margin-top: 20px;">외부 페이지로 이동하는 타입입니다.</p>
      </div>`
  })
}
