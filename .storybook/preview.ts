import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import '../src/styles/main.scss'

// KRDS Vue 플러그인 설정
setup(app => {
  // 전역 속성 설정
  app.config.globalProperties.$krds = {
    version: '1.0.0',
    locale: 'ko'
  }
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  tags: ['autodocs'],
}

export default preview
