import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { readFileSync } from 'node:fs'
import { resolve } from 'path'

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as { version: string }

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
      '@': resolve(__dirname, 'src')
    }
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: '.storybook',
            storybookScript: 'pnpm storybook --no-open'
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }]
          }
        }
      }
    ]
  }
})
