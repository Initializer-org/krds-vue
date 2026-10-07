import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { readFileSync } from 'node:fs'
import { resolve } from 'path'

const packageJson = JSON.parse(readFileSync(resolve(import.meta.dirname, 'package.json'), 'utf-8')) as { version: string }

export default defineConfig({
  plugins: [vue()],
  define: {
    __KRDS_VERSION__: JSON.stringify(packageJson.version),
    'process.env.NODE_ENV': JSON.stringify('test')
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['import']
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src')
    }
  },
  test: {
    // 테스트 템플릿 문자열을 런타임에 컴파일하므로 컴파일러 포함 빌드 사용
    alias: { vue: 'vue/dist/vue.esm-bundler.js' },
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/test/setup.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      viewport: { width: 1200, height: 900 }
    }
  }
})
