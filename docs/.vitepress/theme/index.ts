import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@/styles/main.scss'
import ComponentApi from './ComponentApi.vue'
import DemoFrame from './DemoFrame.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentApi', ComponentApi)
    app.component('DemoFrame', DemoFrame)
  }
} satisfies Theme
