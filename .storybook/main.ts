import type { StorybookConfig } from '@storybook/vue3-vite'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(readFileSync(path.resolve(dirname, '../package.json'), 'utf-8')) as { version: string }

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  staticDirs: [
    {
      from: '../public',
      to: '/assets'
    }
  ],
  viteFinal: async config => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(dirname, '../src')
    }
    config.define = {
      ...config.define,
      __KRDS_VERSION__: JSON.stringify(packageJson.version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development')
    }
    config.css = {
      ...config.css,
      preprocessorOptions: {
        ...config.css?.preprocessorOptions,
        scss: {
          ...config.css?.preprocessorOptions?.scss,
          quietDeps: true,
          silenceDeprecations: ['import']
        }
      }
    }
    return config
  }
}
export default config
