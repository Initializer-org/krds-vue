// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import configPrettier from '@vue/eslint-config-prettier'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue,ts,tsx}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.storybook/**', '**/storybook-static/**', '**/bundlewatch.config.js']
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // 최신 API 사용 - vueTsConfigs
  vueTsConfigs.recommended,

  {
    name: 'app/vue-rules',
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    rules: {
      // Vue 특화 규칙
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off'
    }
  },

  {
    name: 'app/typescript-rules',
    files: ['**/*.{ts,tsx}'],
    rules: {
      // TypeScript 특화 규칙
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },

  {
    name: 'app/general-rules',
    rules: {
      // 일반 규칙
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'off', // TypeScript에서 처리
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },

  configPrettier
)
