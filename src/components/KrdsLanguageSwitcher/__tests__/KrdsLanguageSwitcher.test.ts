import { describe, expect, it } from 'vitest'
import { computed, ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'
import type { LanguageData } from '../KrdsLanguageSwitcher'

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

describe('KrdsLanguageSwitcher', () => {
  it('기본: 언어 선택·Escape로 드롭다운 닫힘', async () => {
    render({
      setup() {
        const selectedLanguage = ref('')
        const currentLanguageName = computed(() => {
          const lang = languages.find(lang => lang.code === selectedLanguage.value)
          return lang?.name || '선택해주세요'
        })
        return { languages, selectedLanguage, currentLanguageName }
      },
      template: `
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
          <p style="margin-top: 20px;">선택된 언어: {{ selectedLanguage }}</p>
        </div>
      `
    })
    const dropdownBtn = screen.getByRole('button')
    await userEvent.click(dropdownBtn)

    await waitFor(() => {
      expect(dropdownBtn).toHaveAttribute('aria-expanded', 'true')
    })

    await userEvent.click(screen.getByText('English (영어)'))

    await waitFor(() => {
      expect(dropdownBtn).toHaveAttribute('aria-expanded', 'false')
    })

    await userEvent.click(dropdownBtn)
    await waitFor(() => {
      expect(dropdownBtn).toHaveAttribute('aria-expanded', 'true')
    })
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(dropdownBtn).toHaveAttribute('aria-expanded', 'false')
    })
    await expectNoA11yViolations()
  })

  it('외부 페이지 이동', async () => {
    render({
      setup: () => ({ externalLanguages, selectedLanguage: ref('') }),
      template: `
        <div style="height: 400px; padding: 50px">
          <KrdsLanguageSwitcher v-model="selectedLanguage" :language-list="externalLanguages" type="external">
            언어변경
          </KrdsLanguageSwitcher>
          <p style="margin-top: 20px;">외부 페이지로 이동하는 타입입니다.</p>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('열린 목록: 현재 언어는 aria-current로 알리고 접근성 위반이 없다', async () => {
    render({
      setup: () => ({ languages, selected: ref('en') }),
      template: `<div style="height: 400px; padding: 50px"><KrdsLanguageSwitcher v-model="selected" :language-list="languages">언어변경</KrdsLanguageSwitcher></div>`
    })
    await userEvent.click(screen.getByRole('button'))
    const current = screen.getByRole('link', { name: /English/ })
    expect(current).toHaveAttribute('aria-current', 'true')
    expect(current).not.toHaveAttribute('aria-selected')
    expect(screen.getByRole('link', { name: /한국어/ })).not.toHaveAttribute('aria-current')
    await expectNoA11yViolations()
  })
})
