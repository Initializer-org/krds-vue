import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
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
    // Custom domain doesn't need base path
    return config
  }
}
export default config
