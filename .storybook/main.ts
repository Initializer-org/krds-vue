import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  "staticDirs": ["../public"],
  viteFinal: async (config) => {
    // GitHub Pages 배포 시 base path 설정
    if (process.env.NODE_ENV === 'production') {
      config.base = '/krds-vue/';
    }
    return config;
  }
};
export default config;